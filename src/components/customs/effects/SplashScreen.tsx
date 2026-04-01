import { useCallback, useEffect, useState } from 'react';
import { animated, useTransition, useSpring } from '@react-spring/web';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '@contexts/theme-mode';
import { cn } from '@utils/core/cn';

const SPLASH_STORAGE_KEY = 'portfolio_splash_seen';
const SPLASH_DURATION = 1800;

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

  const overlayTransition = useTransition(visible, {
    from: { opacity: 1, scale: 1 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 1.05 },
    config: { duration: 600 },
  });

  const greetingSpring = useSpring({
    from: { opacity: 0, y: -16 },
    to: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 },
    delay: 200,
    config: { duration: 600 },
  });

  const nameSpring = useSpring({
    from: { opacity: 0, scale: 0.6, y: 20 },
    to: visible
      ? { opacity: 1, scale: 1, y: 0 }
      : { opacity: 0, scale: 0.6, y: 20 },
    delay: 400,
    config: { duration: 800 },
  });

  const lineSpring = useSpring({
    from: { width: 0 },
    to: visible ? { width: 140 } : { width: 0 },
    delay: 800,
    config: { duration: 1000 },
  });

  const roleSpring = useSpring({
    from: { opacity: 0, y: 10 },
    to: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    delay: 1200,
    config: { duration: 600 },
  });

  return (
    <>
      {overlayTransition((style, show) =>
        show ? (
          <animated.div
            key='splash'
            style={style}
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
            <animated.div
              style={greetingSpring}
              className='text-base md:text-xl font-normal tracking-[0.4em] uppercase text-text-secondary text-center select-none mb-2'
            >
              {t('splash.greeting')}
            </animated.div>

            <animated.div
              style={nameSpring}
              className='text-4xl md:text-6xl font-extrabold tracking-wider text-center select-none bg-gradient-to-br from-primary-light via-primary-main to-secondary-main bg-clip-text text-transparent'
            >
              {t('splash.name')}
            </animated.div>

            <animated.div
              style={{ ...lineSpring, height: 2 }}
              className='rounded-full mt-3 bg-gradient-to-r from-primary-light to-primary-main'
            />

            <animated.div
              style={roleSpring}
              className='text-sm md:text-lg font-medium tracking-[0.2em] text-text-secondary text-center select-none mt-4'
            >
              {t('splash.role')}
            </animated.div>

            <div className='flex gap-2 mt-12'>
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className='w-2 h-2 rounded-full bg-primary-main animate-pulse'
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </animated.div>
        ) : null
      )}
    </>
  );
};
