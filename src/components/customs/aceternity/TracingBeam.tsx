'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { cn } from '@utils/core/cn';

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [beamTop, setBeamTop] = useState(false);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    setBeamTop(latest > 0);
  });

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    { stiffness: 500, damping: 90 }
  );

  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    { stiffness: 500, damping: 90 }
  );

  return (
    <motion.div ref={ref} className={cn('relative w-full', className)}>
      <div className='absolute -left-4 top-3'>
        {/* Dot indicator at the top */}
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{
            boxShadow: beamTop
              ? 'none'
              : '0 0 24px rgba(78, 222, 163, 0.35)',
          }}
          className='ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border border-ct-secondary/30 bg-ct-surface shadow-sm'
        >
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            animate={{
              backgroundColor: beamTop
                ? 'var(--color-ct-secondary)'
                : 'var(--color-primary-main)',
              borderColor: beamTop
                ? 'var(--color-ct-secondary)'
                : 'var(--color-primary-main)',
            }}
            className='h-2 w-2 rounded-full border border-ct-secondary bg-ct-secondary'
          />
        </motion.div>

        {/* SVG beam path */}
        {svgHeight > 0 && (
          <svg
            viewBox={`0 0 20 ${svgHeight}`}
            width='20'
            height={svgHeight}
            className='ml-4 block'
            aria-hidden='true'
          >
            {/* Background track */}
            <motion.path
              d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
              fill='none'
              stroke='#1a1f2e'
              strokeOpacity='0.16'
              transition={{ duration: 10 }}
            />
            {/* Gradient beam */}
            <motion.path
              d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
              fill='none'
              stroke='url(#tracing-beam-gradient)'
              strokeWidth='1.25'
              className='motion-reduce:hidden'
              transition={{ duration: 10 }}
            />
            <defs>
              <motion.linearGradient
                id='tracing-beam-gradient'
                gradientUnits='userSpaceOnUse'
                x1='0'
                x2='0'
                y1={y1}
                y2={y2}
              >
                <stop stopColor='#d0bcff' stopOpacity='0' />
                <stop stopColor='#d0bcff' />
                <stop offset='0.325' stopColor='#4edea3' />
                <stop offset='1' stopColor='#4edea3' stopOpacity='0' />
              </motion.linearGradient>
            </defs>
          </svg>
        )}
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
