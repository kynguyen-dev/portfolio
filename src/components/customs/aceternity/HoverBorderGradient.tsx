// Aceternity UI — HoverBorderGradient component
// Adapted for Algorithmic Atelier design system
// Source: https://ui.aceternity.com/components/hover-border-gradient

'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { cn } from '@utils/core/cn';

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = 'button',
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>('TOP');

  const rotateDirection = useCallback(
    (currentDirection: Direction): Direction => {
      const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];
      const currentIndex = directions.indexOf(currentDirection);
      const nextIndex = clockwise
        ? (currentIndex - 1 + directions.length) % directions.length
        : (currentIndex + 1) % directions.length;
      return directions[nextIndex];
    },
    [clockwise],
  );

  // Wide, bright gradients — mint sweeps the border visibly
  const movingMap: Record<Direction, string> = {
    TOP: 'radial-gradient(50% 80% at 50% 0%, #4edea3 0%, rgba(78,222,163,0.3) 40%, transparent 100%)',
    LEFT: 'radial-gradient(40% 80% at 0% 50%, #4edea3 0%, rgba(78,222,163,0.3) 40%, transparent 100%)',
    BOTTOM:
      'radial-gradient(50% 80% at 50% 100%, #4edea3 0%, rgba(78,222,163,0.3) 40%, transparent 100%)',
    RIGHT:
      'radial-gradient(40% 80% at 100% 50%, #4edea3 0%, rgba(78,222,163,0.3) 40%, transparent 100%)',
  };

  // On hover: full purple + mint glow fills the border
  const highlight =
    'conic-gradient(from 0deg, #4edea3, #d0bcff, #4edea3, #d0bcff, #4edea3)';

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, rotateDirection]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex rounded-full content-center transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-[2px] decoration-clone w-fit cursor-pointer',
        containerClassName,
      )}
      {...props}
    >
      {/* Content layer — sits on top */}
      <div
        className={cn(
          'w-auto z-10 rounded-[inherit] px-6 py-2.5',
          className,
        )}
      >
        {children}
      </div>

      {/* Animated gradient border — the visible rotating glow ring */}
      <motion.div
        className='flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]'
        style={{
          filter: 'blur(2px)',
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration: duration ?? 1 }}
      />

      {/* Outer ambient glow — soft halo behind the button */}
      <motion.div
        className='flex-none absolute z-[-1] rounded-[inherit] pointer-events-none'
        style={{
          filter: 'blur(12px)',
          position: 'absolute',
          width: 'calc(100% + 12px)',
          height: 'calc(100% + 12px)',
          top: '-6px',
          left: '-6px',
        }}
        initial={{ background: movingMap[direction], opacity: 0.25 }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
          opacity: hovered ? 0.6 : 0.25,
        }}
        transition={{ ease: 'linear', duration: duration ?? 1 }}
      />

      {/* Inner mask — same as card surface so button blends in, exposing only the gradient border */}
      <div className='absolute z-1 flex-none inset-[2px] rounded-[100px] bg-ct-surface-container dark:bg-ct-surface-container' />
    </Tag>
  );
}
