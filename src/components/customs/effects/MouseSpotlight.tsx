import { useEffect, useRef, useCallback } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';

/**
 * A glowing spotlight that lazily follows the mouse cursor.
 * Disabled on mobile / touch devices and when prefers-reduced-motion is set.
 * Uses a ref-based approach to avoid React re-renders every frame.
 */
export const MouseSpotlight = () => {
  const { palette } = useTheme();
  const prefersReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isMobile = useMediaQuery('(max-width:768px)');
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (ref.current) {
      ref.current.style.left = `${e.clientX}px`;
      ref.current.style.top = `${e.clientY}px`;
    }
  }, []);

  useEffect(() => {
    if (prefersReduced || isMobile) return;
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReduced, isMobile, handleMouseMove]);

  if (prefersReduced || isMobile) return null;

  const color = palette.mode === 'light' ? palette.primary.main : palette.primary.light;

  return (
    <Box
      ref={ref}
      sx={{
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 9998,
        width: 320,
        height: 320,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}15, ${color}08, transparent 70%)`,
        transform: 'translate(-50%, -50%)',
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
        left: -200,
        top: -200,
        filter: 'blur(2px)',
      }}
    />
  );
};
