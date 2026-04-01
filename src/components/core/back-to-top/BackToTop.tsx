import { useState, useEffect } from 'react';
import { CaretUpIcon } from '@phosphor-icons/react';
import { animated, useSpring } from '@react-spring/web';

/**
 * Floating "back to top" button that appears after scrolling
 * past a threshold (default 400px).
 */
export const BackToTop = ({ threshold = 400 }: { threshold?: number }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  const spring = useSpring({
    opacity: visible ? 1 : 0,
    scale: visible ? 1 : 0.6,
    config: { tension: 300, friction: 20 },
  });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <animated.button
      onClick={scrollToTop}
      aria-label='Back to top'
      style={spring}
      className='fixed bottom-6 left-6 z-[1500] w-10 h-10 flex items-center justify-center rounded-full weaver-gradient text-white shadow-[0_4px_20px_rgba(208,188,255,0.4)] hover:shadow-[0_6px_28px_rgba(208,188,255,0.5)] transition-shadow cursor-pointer'
    >
      <CaretUpIcon size={20} weight='bold' />
    </animated.button>
  );
};
