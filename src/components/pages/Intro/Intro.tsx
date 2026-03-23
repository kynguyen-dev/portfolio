import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { APP_PAGES } from '@constants';
import {
  staggerContainer,
  staggerItem,
} from '@utils/animations/scrollVariants';

export const Intro = () => {
  const { t } = useTranslation();

  const techBadges = t('intro.techBadges', { returnObjects: true }) as string[];

  return (
    <section
      id={APP_PAGES.HOME.toLowerCase()}
      aria-label={t('intro.title')}
      className='relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24'
    >
      {/* Background glow effects */}
      <div className='absolute inset-0 overflow-hidden -z-10'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-ct-secondary/5 blur-[120px] rounded-full' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-ct-primary-container/5 blur-[120px] rounded-full' />
      </div>

      {/* System status indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='mb-6 font-mono-code text-ct-primary-container tracking-[0.3em] text-xs uppercase animate-pulse'
      >
        {t('intro.systemStatus')}
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className='font-serif-display text-5xl md:text-8xl text-ct-secondary mb-8 max-w-5xl leading-tight'
      >
        {t('intro.heroTitle')}{' '}
        <span className='italic text-ct-on-surface'>
          {t('intro.heroTitleAccent')}
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className='max-w-2xl text-ct-on-surface-variant text-lg md:text-xl mb-12 leading-relaxed'
      >
        {t('intro.heroSubtitle')}
      </motion.p>

      {/* Tech Badges */}
      <motion.div
        variants={staggerContainer(0.1, 0.8)}
        initial='hidden'
        animate='visible'
        className='flex flex-wrap justify-center gap-3 max-w-3xl'
      >
        {Array.isArray(techBadges) &&
          techBadges.map(badge => (
            <motion.span
              key={badge}
              variants={staggerItem}
              className='px-4 py-1.5 rounded-full bg-ct-surface-container-high border border-ct-outline-variant/20 text-xs font-mono-code text-ct-primary-container flex items-center gap-2'
            >
              <span className='w-1.5 h-1.5 rounded-full bg-ct-primary-container' />
              {badge}
            </motion.span>
          ))}
      </motion.div>
    </section>
  );
};
