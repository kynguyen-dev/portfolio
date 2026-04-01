import { useEffect, useRef, useCallback, useState } from 'react';

/**
 * Custom animated cursor — a small dot + trailing ring.
 * Disabled on touch devices and prefers-reduced-motion.
 * Uses a ref-based RAF loop so React doesn't re-render every frame.
 */
export const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef(0);
  const hoveringRef = useRef(false);

  const onMove = useCallback((e: MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReduced || isTouch) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px) scale(${hoveringRef.current ? 1.6 : 1})`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf.current = requestAnimationFrame(animate);

    /* Detect hoverable elements */
    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          'a, button, [role="button"], input, textarea, [tabindex]'
        )
      ) {
        hoveringRef.current = true;
      }
    };
    const onOut = () => {
      hoveringRef.current = false;
    };

    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [onMove]);

  if (!enabled) return null;

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        className='fixed top-0 left-0 w-2 h-2 rounded-full bg-primary-main pointer-events-none z-[99999] mix-blend-difference'
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className='fixed top-0 left-0 w-9 h-9 rounded-full border-[1.5px] border-primary-main pointer-events-none z-[99998] transition-[width,height,border-color] duration-200 mix-blend-difference'
      />
    </>
  );
};
