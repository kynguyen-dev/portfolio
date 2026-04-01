import { animated, useSpring } from '@react-spring/web';
import { GraduationCapIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { PFGradientTypography, PFTypography } from '@components/core';
import { APP_THEMES, APP_TYPOGRAPHIES } from '@constants';
import { useInView } from '@utils/animations/springVariants';

export const Education = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.3 });

  const slideSpring = useSpring({
    from: { opacity: 0, x: -80 },
    to: inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 },
    config: { tension: 170, friction: 26 },
  });

  const educationData = [
    {
      institution: 'FPT University',
      degree: t('education.degree'),
      period: t('education.period'),
      details: [
        t('education.major'),
        t('education.coursework'),
        t('education.languages'),
      ],
    },
  ];

  return (
    <section
      id='education'
      aria-label={t('education.heading')}
      className='px-4 md:px-12 py-16 md:py-24 max-w-[1100px] mx-auto'
    >
      <div className='flex flex-col items-center gap-10'>
        <PFGradientTypography
          variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
          theme={APP_THEMES.DARK}
          fontWeight='bold'
        >
          {t('education.heading')}
        </PFGradientTypography>

        {educationData.map(edu => (
          <animated.div key={edu.institution} ref={ref} style={slideSpring}>
            <div className='w-full max-w-[700px] glass rounded-2xl p-8 transition-transform duration-200 hover:scale-[1.02]'>
              <div className='flex flex-col sm:flex-row sm:items-center gap-4 mb-4 flex-wrap'>
                <GraduationCapIcon className='text-primary-light' size={36} />
                <div className='flex-1'>
                  <PFTypography
                    variant='h6'
                    className='text-ct-on-surface'
                    fontWeight={700}
                  >
                    {edu.degree}
                  </PFTypography>
                  <PFTypography
                    variant='subtitle2'
                    className='text-primary-main'
                    fontWeight={600}
                  >
                    {edu.institution}
                  </PFTypography>
                </div>
                <PFTypography
                  variant='caption'
                  className='text-primary-light'
                  fontWeight={600}
                  style={{ letterSpacing: '1px' }}
                >
                  {edu.period}
                </PFTypography>
              </div>

              <div className='flex flex-col gap-2 ml-1'>
                {edu.details.map(detail => (
                  <div key={detail} className='flex items-start gap-3'>
                    <div className='w-1.5 h-1.5 rounded-full bg-primary-light mt-2 flex-shrink-0' />
                    <PFTypography
                      variant='body2'
                      className='text-text-secondary leading-[1.7] opacity-90'
                    >
                      {detail}
                    </PFTypography>
                  </div>
                ))}
              </div>
            </div>
          </animated.div>
        ))}
      </div>
    </section>
  );
};
