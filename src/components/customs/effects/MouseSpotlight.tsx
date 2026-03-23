import { useEffect, useRef, useCallback, useState } from 'react';

/**
 * A glowing spotlight that lazily follows the mouse cursor.
 * Disabled on mobile / touch devices and when prefers-reduced-motion is set.
 * Uses a ref-based approach to avoid React re-renders every frame.
 */
export const MouseSpotlight = () => {
  const [enabled, setEnabled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (ref.current) {
      ref.current.style.left = `${e.clientX}px`;
      ref.current.style.top = `${e.clientY}px`;
    }
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isMobile = window.matchMedia('(max-width:768px)').matches;

    if (prefersReduced || isMobile) {
      setEnabled(false);
      return;
    }

    setEnabled(true);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className='fixed pointer-events-none z-[9998] w-80 h-80 rounded-full bg-[radial-gradient(circle,var(--color-primary-main)_15%,var(--color-primary-main)_8%,transparent_70%)] opacity-10 -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-150 ease-out blur-[2px] -left-[200px] -top-[200px]'
    />
  );
};
