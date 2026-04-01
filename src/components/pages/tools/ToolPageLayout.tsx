import { CaretLeftIcon } from '@phosphor-icons/react';
import { useNavigate } from '@tanstack/react-router';
import { PFTypography, PFGradientTypography } from '@components/core';
import { SunriseBackground } from '@components/customs/backgrounds/SunriseBackground';
import { animated, useSpring } from '@react-spring/web';
import { ReactNode, useEffect, useState } from 'react';

interface ToolPageLayoutProps {
  title: string;
  emoji: string;
  description: string;
  children?: ReactNode;
}

const ToolPageLayout = ({
  title,
  emoji,
  description,
  children,
}: ToolPageLayoutProps) => {
  const navigate = useNavigate();

  const fadeUpSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    config: { tension: 170, friction: 26 },
  });

  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setToggle(prev => !prev), 1000);
    return () => clearInterval(interval);
  }, []);
  const pulseSpring = useSpring({
    scale: toggle ? 1.05 : 1,
    config: { duration: 1000 },
  });

  return (
    <SunriseBackground>
      <main className='min-h-screen flex items-center justify-center px-4 md:px-8 py-20 md:py-24 w-full max-w-[100vw] box-border overflow-x-hidden'>
        {/* Back button */}
        <div className='fixed top-5 left-5 z-50'>
          <button
            onClick={() => navigate({ to: '/' })}
            aria-label='Back to portfolio'
            className='flex items-center justify-center w-10 h-10 rounded-full text-ct-on-surface glass-panel hover:bg-ct-surface-container-high/90 transition-all duration-300 cursor-pointer active:scale-95'
          >
            <CaretLeftIcon size={20} weight='bold' />
          </button>
        </div>

        <animated.div
          style={{ ...fadeUpSpring, width: '100%', maxWidth: '100%' }}
        >
          <div className='flex flex-col items-center gap-6 text-center w-full max-w-full px-0 sm:px-4 md:px-8 box-border'>
            <animated.div
              style={{ ...pulseSpring, fontSize: '4rem', lineHeight: 1 }}
              className='drop-shadow-2xl'
            >
              {emoji}
            </animated.div>

            <PFGradientTypography
              variant='h3'
              fontWeight={800}
              className='text-[clamp(1.75rem,4vw,3.5rem)] font-serif-display uppercase tracking-widest'
            >
              {title}
            </PFGradientTypography>

            <PFTypography
              variant='h6'
              className='text-ct-on-surface-variant font-normal leading-[1.6] text-[clamp(0.85rem,2vw,1.1rem)] max-w-2xl break-words px-2 sm:px-0 font-sans opacity-80'
            >
              {description}
            </PFTypography>

            <div className='w-full max-w-full box-border mt-8'>{children}</div>
          </div>
        </animated.div>
      </main>
    </SunriseBackground>
  );
};

export default ToolPageLayout;
