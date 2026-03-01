import { useEffect, useRef, useCallback } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';

/**
 * Custom animated cursor — a small dot + trailing ring.
 * Disabled on touch devices and prefers-reduced-motion.
 * Uses a ref-based RAF loop so React doesn't re-render every frame.
 */
export const CustomCursor = () => {
  const { palette } = useTheme();
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isTouch = useMediaQuery('(pointer: coarse)');
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
    if (prefersReduced || isTouch) return;

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
        target.closest('a, button, [role="button"], input, textarea, [tabindex]')
      ) {
        hoveringRef.current = true;
      }
    };
    const onOut = () => { hoveringRef.current = false; };

    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [prefersReduced, isTouch, onMove]);

  if (prefersReduced || isTouch) return null;

  const color = palette.mode === 'light' ? palette.primary.dark : palette.primary.light;

  return (
    <>
      {/* Small dot */}
      <Box
        ref={dotRef}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: color,
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
        }}
      />
      {/* Trailing ring */}
      <Box
        ref={ringRef}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: `1.5px solid ${color}`,
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
};
