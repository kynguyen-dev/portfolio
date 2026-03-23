import { lazy, Suspense } from 'react';
import { motion, type Variants } from 'motion/react';
import { Intro } from '@components/pages/Intro/Intro.tsx';
import { AboutMe } from '@components/pages/about-me/AboutMe';
import { SunriseBackground } from '@components/customs/backgrounds/SunriseBackground';
import { PFAppBar } from '@components/core/header';
import { ScrollProgressBar } from '@components/core/scroll-progress/ScrollProgressBar';
import { BackToTop } from '@components/core/back-to-top/BackToTop';
import { ParallaxSection } from '@components/customs/effects/ParallaxSection';
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  scaleUp,
  blurIn,
  rotateIn,
} from '@utils/animations/scrollVariants';

/* Below-the-fold sections — lazy loaded for faster initial paint */
const Profile = lazy(() =>
  import('@components/pages/profile/Profile.tsx').then(m => ({
    default: m.Profile,
  }))
);
const Footer = lazy(() =>
  import('@components/pages/footer/Footer.tsx').then(m => ({
    default: m.Footer,
  }))
);
const WorkExperience = lazy(() =>
  import('@components/pages/work-experience/WorkExperience.tsx').then(m => ({
    default: m.WorkExperience,
  }))
);
const Skills = lazy(() =>
  import('@components/pages/skills/Skills.tsx').then(m => ({
    default: m.Skills,
  }))
);
const Education = lazy(() =>
  import('@components/pages/education/Education.tsx').then(m => ({
    default: m.Education,
  }))
);
const Testimonials = lazy(() =>
  import('@components/pages/testimonials/Testimonials.tsx').then(m => ({
    default: m.Testimonials,
  }))
);
const ContactForm = lazy(() =>
  import('@components/pages/contacts/ContactForm.tsx').then(m => ({
    default: m.ContactForm,
  }))
);
const Blog = lazy(() =>
  import('@components/pages/blog/Blog.tsx').then(m => ({ default: m.Blog }))
);
const Tools = lazy(() =>
  import('@components/pages/tools/Tools.tsx').then(m => ({ default: m.Tools }))
);
const SpeedDialCustom = lazy(() =>
  import('@components/customs/speed-dial').then(m => ({
    default: m.SpeedDialCustom,
  }))
);

/** Animated scroll-reveal wrapper — accepts a motion/react variant */
const Section = ({
  children,
  variants = fadeUp,
}: {
  children: React.ReactNode;
  variants?: Variants;
}) => (
  <motion.div
    variants={variants}
    initial='hidden'
    whileInView='visible'
    viewport={{ once: true, amount: 0.15 }}
  >
    {children}
  </motion.div>
);

/** Lightweight placeholder shown while lazy sections load */
const SectionSkeleton = () => {
  return (
    <div className='flex justify-center items-center py-20 md:py-32 min-h-[200px]'>
      <div className='w-10 h-10 rounded-full border-3 border-primary-light/30 border-t-primary-light animate-spin' />
    </div>
  );
};

const HomePage = () => {
  return (
    <SunriseBackground>
      <ScrollProgressBar />
      {/* Skip-to-content for keyboard / screen-reader users */}
      <a
        href='#main-content'
        className='absolute left-[-9999px] top-auto w-1 h-1 overflow-hidden z-[9999] focus:fixed focus:left-4 focus:top-4 focus:w-auto focus:h-auto focus:p-3 focus:px-6 focus:bg-[#0B0D2E] focus:text-[#F5D060] focus:rounded-lg focus:text-base focus:no-underline'
      >
        Skip to content
      </a>
      <PFAppBar />
      <main id='main-content'>
        <div className='flex flex-col'>
          <Intro />
          <ParallaxSection offset={40}>
            <Section variants={blurIn}>
              <AboutMe />
            </Section>
          </ParallaxSection>
          <Suspense fallback={<SectionSkeleton />}>
            <Section variants={scaleUp}>
              <Profile />
            </Section>
            <ParallaxSection offset={30}>
              <Section variants={slideInLeft}>
                <Education />
              </Section>
            </ParallaxSection>
            <Section variants={fadeUp}>
              <Skills />
            </Section>
            <ParallaxSection offset={50}>
              <Section variants={slideInRight}>
                <WorkExperience />
              </Section>
            </ParallaxSection>
            <Section variants={rotateIn}>
              <Blog />
            </Section>
            <ParallaxSection offset={35}>
              <Section variants={scaleUp}>
                <Tools />
              </Section>
            </ParallaxSection>
            <ParallaxSection offset={30}>
              <Section variants={blurIn}>
                <Testimonials />
              </Section>
            </ParallaxSection>
            <Section variants={scaleUp}>
              <ContactForm />
            </Section>
            <Footer />
          </Suspense>
        </div>
        <Suspense fallback={<SectionSkeleton />}>
          <SpeedDialCustom />
        </Suspense>
        <BackToTop />
      </main>
    </SunriseBackground>
  );
};

export default HomePage;
