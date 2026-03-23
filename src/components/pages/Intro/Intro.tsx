import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { PFGradientTypography, PFTypography } from '@components/core';
import { StyledButton } from '@components/core/button';
import { useTranslation } from 'react-i18next';
import {
  APP_PAGES,
  APP_THEMES,
  APP_TYPOGRAPHIES,
  APP_TYPOGRAPHIES_ANIMATION,
} from '@constants';
import {
  staggerContainer,
  staggerItem,
  pop,
} from '@utils/animations/scrollVariants';
import { getYearsOfExperience } from '@utils/core/career';
import { cn } from '@utils/core/cn';

export const Intro = () => {
  const { t } = useTranslation();
  const years = getYearsOfExperience();

  const statBadges = [
    { label: t('intro.yearsExperience', { years }) },
    { label: t('intro.productionApps') },
    { label: t('intro.techStack') },
  ];

  return (
    <section
      id={APP_PAGES.HOME.toLowerCase()}
      aria-label={t('intro.title')}
      className='flex justify-center items-center px-6 md:px-0 min-h-screen pt-24 md:pt-32 pb-10 md:pb-16'
    >
      <div className='flex flex-col items-center justify-center gap-10 text-center md:text-left'>
        <PFGradientTypography
          variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
          theme={APP_THEMES.DARK}
          fontWeight='bold'
          animations={[
            APP_TYPOGRAPHIES_ANIMATION.TYPEWRITER,
            APP_TYPOGRAPHIES_ANIMATION.OUTLINE_TO_SOLID,
          ]}
        >
          {t('intro.title')}
        </PFGradientTypography>
        <PFTypography
          variant={APP_TYPOGRAPHIES.SUBTITLE_PRIMARY}
          className='text-text-disabled'
        >
          {t('intro.description')}
        </PFTypography>

        {/* CTA Buttons */}
        <motion.div
          variants={staggerContainer(0.15, 0.3)}
          initial='hidden'
          animate='visible'
        >
          <div className='flex flex-col sm:flex-row gap-4 items-center'>
            <motion.div variants={staggerItem}>
              <StyledButton
                onClick={() => {
                  const el = document.getElementById(
                    APP_PAGES.PROJECTS.toLowerCase()
                  );
                  if (el)
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                magnet
              >
                {t('intro.viewMyWork')}
              </StyledButton>
            </motion.div>
            <motion.div variants={staggerItem}>
              <StyledButton
                variant='stroke'
                onClick={() => {
                  window.open(
                    '/resume/NGUYEN_TRUONG_KY_FULL_STACK_DEVELOPER_CV.pdf',
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
                magnet
              >
                {t('intro.downloadCV')}
              </StyledButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Stat Badges */}
        <motion.div
          variants={staggerContainer(0.1, 0.6)}
          initial='hidden'
          animate='visible'
          className='flex flex-row flex-wrap justify-center gap-4'
        >
          {statBadges.map(badge => (
            <motion.div key={badge.label} variants={pop}>
              <div className='px-4 py-1.5 rounded-full bg-primary-light/10 border border-primary-light/30 text-primary-light font-semibold text-xs sm:text-sm backdrop-blur-sm'>
                {badge.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 80,
            damping: 15,
            delay: 0.3,
          }}
          whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
          className='relative inline-flex items-center justify-center'
        >
          {/* Outer rotating dashed ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className='absolute w-[155px] h-[155px] md:w-[220px] md:h-[220px] rounded-full border-2 border-dashed border-primary-light/20'
          />
          {/* Middle pulsing glow ring */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(212, 168, 67, 0.2)',
                '0 0 40px rgba(212, 168, 67, 0.4)',
                '0 0 20px rgba(212, 168, 67, 0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className='absolute w-[140px] h-[140px] md:w-[200px] md:h-[200px] rounded-full border-2 border-primary-light/30'
          />
          {/* Floating orbital dots */}
          {[0, 1, 2, 3].map(i => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.5,
              }}
              className={cn(
                'absolute',
                i === 0 && 'w-[148px] h-[148px] md:w-[210px] md:h-[210px]',
                i === 1 && 'w-[154px] h-[154px] md:w-[218px] md:h-[218px]',
                i === 2 && 'w-[160px] h-[160px] md:w-[226px] md:h-[226px]',
                i === 3 && 'w-[166px] h-[166px] md:w-[234px] md:h-[234px]'
              )}
            >
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                className={cn(
                  'absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shadow-lg',
                  i % 2 === 0
                    ? 'bg-primary-light shadow-primary-light'
                    : 'bg-secondary-light shadow-secondary-light'
                )}
              />
            </motion.div>
          ))}
          {/* Avatar image */}
          <div className='w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden border-[3px] border-primary-light shadow-2xl relative z-10'>
            <img
              src='/images/avatar.jpg'
              alt="Ky Nguyen's avatar"
              className='w-full h-full object-cover'
            />
          </div>
        </motion.div>

        <motion.img
          src='/images/home.svg'
          alt='Home illustration'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='w-full md:w-[800px] h-auto pt-12'
        />

        {/* Scroll-down indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className='mt-4 cursor-pointer opacity-60'
          onClick={() => {
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          <ChevronDown className='w-10 h-10 text-primary-light' />
        </motion.div>
      </div>
    </section>
  );
};
