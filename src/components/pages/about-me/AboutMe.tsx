import { PFGradientTypography, PFTypography } from '@components/core';
import { animated, useTrail, useSpring } from '@react-spring/web';
import { useTranslation } from 'react-i18next';
import { APP_THEMES, APP_TYPOGRAPHIES, APP_INFORMATION } from '@constants';
import { useInView } from '@utils/animations/springVariants';
import { getYearsOfExperience } from '@utils/core/career';

export const AboutMe = () => {
  const { t } = useTranslation();
  const years = getYearsOfExperience();
  const { ref, inView } = useInView({ threshold: 0.2 });

  const paragraphs = [
    t('aboutMe.p1', { years }),
    t('aboutMe.p2'),
    t('aboutMe.p3'),
    t('aboutMe.p4'),
  ];

  const trail = useTrail(paragraphs.length, {
    from: { opacity: 0, y: 40 },
    to: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    config: { tension: 170, friction: 26 },
  });

  const linkSpring = useSpring({
    from: { opacity: 0, filter: 'blur(12px)', y: 20 },
    to: inView
      ? { opacity: 1, filter: 'blur(0px)', y: 0 }
      : { opacity: 0, filter: 'blur(12px)', y: 20 },
    delay: 600,
    config: { duration: 800 },
  });

  return (
    <section
      id='about'
      aria-label={t('aboutMe.heading')}
      className='px-4 md:px-12 py-16 md:py-24 max-w-5xl mx-auto'
    >
      <div ref={ref} className='flex flex-col items-center gap-10'>
        <PFGradientTypography
          variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
          theme={APP_THEMES.DARK}
          fontWeight='bold'
        >
          {t('aboutMe.heading')}
        </PFGradientTypography>

        <div className='flex flex-col gap-6 max-w-2xl text-center'>
          {trail.map((style, i) => (
            <animated.div key={i} style={style}>
              <PFTypography
                variant='body1'
                className='text-text-primary leading-loose'
              >
                {paragraphs[i]}
              </PFTypography>
            </animated.div>
          ))}
          <animated.div style={linkSpring}>
            <div className='flex flex-row gap-6 justify-center mt-4'>
              <a
                href={APP_INFORMATION.GITHUB_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary-light font-semibold no-underline hover:underline transition-all'
              >
                {t('aboutMe.github')}
              </a>
              <a
                href={APP_INFORMATION.LINKEDIN_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary-light font-semibold no-underline hover:underline transition-all'
              >
                {t('aboutMe.linkedin')}
              </a>
            </div>
          </animated.div>
        </div>
      </div>
    </section>
  );
};
