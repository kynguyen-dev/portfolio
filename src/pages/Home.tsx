import { lazy, Suspense } from 'react';
import { motion, type Variants } from 'motion/react';
import { Intro } from '@components/pages/Intro/Intro.tsx';
import { PFAppBar } from '@components/core/header';
import { ScrollProgressBar } from '@components/core/scroll-progress/ScrollProgressBar';
import { BackToTop } from '@components/core/back-to-top/BackToTop';
import {
  fadeUp,
  slideInLeft,
  blurIn,
  scaleUp,
} from '@utils/animations/scrollVariants';

/* Below-the-fold sections — lazy loaded for faster initial paint */
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
const MyProject = lazy(() =>
  import('@components/pages/project/MyProject.tsx').then(m => ({
    default: m.MyProject,
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
const Tools = lazy(() =>
  import('@components/pages/tools/Tools.tsx').then(m => ({
    default: m.Tools,
  }))
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
      <div className='w-10 h-10 rounded-full border-3 border-ct-primary-container/30 border-t-ct-primary-container animate-spin' />
    </div>
  );
};

const HomePage = () => {
  return (
    <div className='bg-ct-bg min-h-screen'>
      <ScrollProgressBar />
      {/* Skip-to-content for keyboard / screen-reader users */}
      <a
        href='#main-content'
        className='absolute left-[-9999px] top-auto w-1 h-1 overflow-hidden z-[9999] focus:fixed focus:left-4 focus:top-4 focus:w-auto focus:h-auto focus:p-3 focus:px-6 focus:bg-ct-surface focus:text-ct-primary-container focus:rounded-lg focus:text-base focus:no-underline'
      >
        Skip to content
      </a>
      <PFAppBar />
      <main id='main-content' className='vanta-bg'>
        <div className='flex flex-col'>
          <Intro />
          <Suspense fallback={<SectionSkeleton />}>
            <Section variants={slideInLeft}>
              <WorkExperience />
            </Section>
            <Section variants={fadeUp}>
              <Skills />
            </Section>
            <Section variants={scaleUp}>
              <div className='max-w-[1400px] mx-auto px-8 py-24 md:py-32'>
                <MyProject />
              </div>
            </Section>
            <Tools />
            <Section variants={blurIn}>
              <Testimonials />
            </Section>
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
    </div>
  );
};

export default HomePage;
