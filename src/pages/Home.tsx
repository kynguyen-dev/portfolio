import { lazy, Suspense, ReactNode } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Intro } from '@components/pages/Intro/Intro.tsx';
import { PFAppBar } from '@components/core/header';
import { ScrollProgressBar } from '@components/core/scroll-progress/ScrollProgressBar';
import { BackToTop } from '@components/core/back-to-top/BackToTop';
import { useInView } from '@utils/animations/springVariants';
import { Meteors } from '@components/customs/aceternity';

/* Below-the-fold sections — lazy loaded for faster initial paint */
const Footer = lazy(() =>
  import('@components/pages/footer/Footer.tsx').then(m => ({
    default: m.Footer,
  }))
);
const Skills = lazy(() =>
  import('@components/pages/skills/Skills.tsx').then(m => ({
    default: m.Skills,
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

/** Animated scroll-reveal wrapper using react-spring */
const Section = ({
  children,
  variant = 'fadeUp',
}: {
  children: ReactNode;
  variant?: 'fadeUp' | 'slideInLeft' | 'blurIn' | 'scaleUp';
}) => {
  const { ref, inView } = useInView({ threshold: 0.15 });

  const configs: Record<string, Record<string, unknown>> = {
    fadeUp: {
      from: { opacity: 0, y: 60 },
      to: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 },
    },
    slideInLeft: {
      from: { opacity: 0, x: -80 },
      to: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 },
    },
    blurIn: {
      from: { opacity: 0, scale: 0.95 },
      to: inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 },
    },
    scaleUp: {
      from: { opacity: 0, scale: 0.85 },
      to: inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 },
    },
  };

  const spring = useSpring({
    ...configs[variant],
    config: { tension: 170, friction: 26 },
  });

  return (
    <animated.div ref={ref} style={spring}>
      {children}
    </animated.div>
  );
};

/** Lightweight placeholder shown while lazy sections load */
const SectionSkeleton = () => {
  return (
    <div className='flex justify-center items-center py-20 md:py-32 min-h-[200px]'>
      <div className='w-10 h-10 rounded-full border-3 border-primary-main/30 border-t-primary-main animate-spin' />
    </div>
  );
};

const HomePage = () => {
  return (
    <div className='bg-ct-surface-container-lowest min-h-screen relative'>
      {/* Global Meteor Effect — ambient background animation */}
      <div className='fixed inset-0 z-0 pointer-events-none overflow-hidden'>
        <Meteors number={15} />
      </div>
      <ScrollProgressBar />
      {/* Skip-to-content for keyboard / screen-reader users */}
      <a
        href='#main-content'
        className='absolute left-[-9999px] top-auto w-1 h-1 overflow-hidden z-[9999] focus:fixed focus:left-4 focus:top-4 focus:w-auto focus:h-auto focus:p-3 focus:px-6 focus:bg-ct-surface focus:text-primary-main focus:rounded-lg focus:text-base focus:no-underline'
      >
        Skip to content
      </a>
      <PFAppBar />
      <main id='main-content'>
        <div className='flex flex-col'>
          <Intro />
          <Suspense fallback={<SectionSkeleton />}>
            <Section variant='fadeUp'>
              <Skills />
            </Section>
            <Section variant='scaleUp'>
              <Tools />
            </Section>
            <Section variant='blurIn'>
              <Testimonials />
            </Section>
            <Section variant='scaleUp'>
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
