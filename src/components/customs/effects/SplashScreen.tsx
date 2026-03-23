import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '@contexts/theme-mode';
import { cn } from '@utils/core/cn';

const SPLASH_STORAGE_KEY = 'portfolio_splash_seen';
const SPLASH_DURATION = 1800;

/**
 * Full-screen animated splash screen displayed on initial page load.
 * Shows a greeting, the developer's name and role, then fades away.
 */
export const SplashScreen = () => {
  const { mode } = useThemeMode();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem(SPLASH_STORAGE_KEY);
    } catch {
      return true;
    }
  });

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      sessionStorage.setItem(SPLASH_STORAGE_KEY, '1');
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(dismiss, SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, [visible, dismiss]);

  return (
    <AnimatePresence mode='wait'>
      {visible && (
        <motion.div
          key='splash'
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          onClick={dismiss}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape')
              dismiss();
          }}
          role='button'
          tabIndex={0}
          aria-label={t('common.skipSplash')}
          className={cn(
            'fixed inset-0 z-[100000] flex flex-col items-center justify-center cursor-pointer',
            mode === 'dark'
              ? 'bg-[linear-gradient(135deg,#1A1410_0%,#2D1F10_50%,#1A1410_100%)]'
              : 'bg-[linear-gradient(135deg,#FBF6EE_0%,#F5E6D0_50%,#FBF6EE_100%)]'
          )}
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className='text-base md:text-xl font-normal tracking-[0.4em] uppercase text-text-secondary text-center select-none mb-2'
          >
            {t('splash.greeting')}
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className='text-4xl md:text-6xl font-extrabold tracking-wider text-center select-none bg-gradient-to-br from-primary-light via-primary-main to-secondary-main bg-clip-text text-transparent'
          >
            {t('splash.name')}
          </motion.div>

          {/* Animated line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 140 }}
            transition={{ duration: 1.0, delay: 0.8, ease: 'easeInOut' }}
            className='h-[2px] rounded-full mt-3 bg-gradient-to-r from-primary-light to-primary-main'
          />

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}
            className='text-sm md:text-lg font-medium tracking-[0.2em] text-text-secondary text-center select-none mt-4'
          >
            {t('splash.role')}
          </motion.div>

          {/* Pulsing dot loader */}
          <div className='flex gap-2 mt-12'>
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
                className='w-2 h-2 rounded-full bg-primary-main'
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
