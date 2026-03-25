/**
 * Meteors Effect — Aceternity UI Pattern
 * Animated diagonal light beams that streak across the background like meteors.
 * Adapted for the Algorithmic Atelier design system (purple/mint palette).
 *
 * Usage: Place inside a container with `relative overflow-hidden`.
 */
import { useMemo } from 'react';
import { cn } from '@utils/core/cn';

interface MeteorsProps {
  /** Number of meteor streaks (default: 20) */
  number?: number;
  className?: string;
}

export const Meteors = ({ number = 20, className }: MeteorsProps) => {
  // Generate meteor positions/timings once and memoize
  const meteors = useMemo(
    () =>
      Array.from({ length: number }, (_, i) => ({
        id: i,
        left: Math.floor(Math.random() * 800 - 400),
        delay: Math.random() * 0.6 + 0.2,
        duration: Math.floor(Math.random() * 8 + 2),
      })),
    [number],
  );

  return (
    <>
      {meteors.map((m) => (
        <span
          key={`meteor-${m.id}`}
          className={cn(
            'pointer-events-none absolute top-0 left-1/2 h-0.5 w-0.5 rounded-full rotate-[215deg]',
            'bg-primary-main/60 shadow-[0_0_0_1px_rgba(208,188,255,0.08)]',
            "before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2",
            'before:w-[50px] before:h-[1px]',
            'before:bg-gradient-to-r before:from-primary-main/50 before:to-transparent',
            'animate-meteor',
            className,
          )}
          style={{
            left: `calc(50% + ${m.left}px)`,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        />
      ))}
    </>
  );
};
