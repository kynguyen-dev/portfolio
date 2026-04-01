import {
  useRef,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { animated, useSpring } from '@react-spring/web';

interface ParallaxSectionProps {
  children: ReactNode;
  /** Vertical shift in px – positive = moves up on scroll. Default 60 */
  offset?: number;
  /** Optional id for anchor navigation */
  id?: string;
}

/**
 * Wraps a section and gives it a subtle parallax depth shift as the user
 * scrolls. Uses react-spring for smooth GPU-accelerated animation.
 */
export const ParallaxSection = ({
  children,
  offset = 60,
  id,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;
    const progress = Math.max(
      0,
      Math.min(1, (windowH - rect.top) / (windowH + rect.height))
    );
    setScrollY(offset - progress * offset * 2);
  }, [offset]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const spring = useSpring({
    y: scrollY,
    config: { tension: 120, friction: 14 },
  });

  return (
    <div ref={ref} id={id} className='overflow-hidden'>
      <animated.div
        style={{ transform: spring.y.to(v => `translateY(${v}px)`) }}
      >
        {children}
      </animated.div>
    </div>
  );
};
