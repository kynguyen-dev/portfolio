import { PFGradientTypography, PFTypography } from '@components/core';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { APP_THEMES, APP_TYPOGRAPHIES, APP_INFORMATION } from '@constants';
import {
  staggerContainer,
  staggerItem,
  blurIn,
} from '@utils/animations/scrollVariants';
import { getYearsOfExperience } from '@utils/core/career';

export const AboutMe = () => {
  const { t } = useTranslation();
  const years = getYearsOfExperience();

  return (
    <section
      id='about'
      aria-label={t('aboutMe.heading')}
      className='px-4 md:px-12 py-16 md:py-24 max-w-5xl mx-auto'
    >
      <div className='flex flex-col items-center gap-10'>
        <PFGradientTypography
          variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
          theme={APP_THEMES.DARK}
          fontWeight='bold'
        >
          {t('aboutMe.heading')}
        </PFGradientTypography>

        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          className='flex flex-col gap-6 max-w-2xl text-center'
        >
          <motion.div variants={staggerItem}>
            <PFTypography
              variant='body1'
              className='text-text-primary leading-loose'
            >
              {t('aboutMe.p1', { years })}
            </PFTypography>
          </motion.div>
          <motion.div variants={staggerItem}>
            <PFTypography
              variant='body1'
              className='text-text-primary leading-loose'
            >
              {t('aboutMe.p2')}
            </PFTypography>
          </motion.div>
          <motion.div variants={staggerItem}>
            <PFTypography
              variant='body1'
              className='text-text-primary leading-loose'
            >
              {t('aboutMe.p3')}
            </PFTypography>
          </motion.div>
          <motion.div variants={staggerItem}>
            <PFTypography
              variant='body1'
              className='text-text-primary leading-loose'
            >
              {t('aboutMe.p4')}
            </PFTypography>
          </motion.div>
          <motion.div variants={blurIn}>
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
