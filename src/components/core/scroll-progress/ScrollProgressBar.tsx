import { useState, useEffect, useCallback } from 'react';
import { animated, useSpring } from '@react-spring/web';

/**
 * Thin progress bar fixed at the very top of the viewport.
 * Shows how far the user has scrolled the page.
 */
export const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    setScrollProgress(Math.min(1, Math.max(0, progress)));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const spring = useSpring({
    scaleX: scrollProgress,
    config: { tension: 120, friction: 30 },
  });

  return (
    <animated.div
      style={{ ...spring, transformOrigin: '0%' }}
      className='fixed top-0 left-0 right-0 h-[2px] z-[2000] weaver-gradient'
    />
  );
};
