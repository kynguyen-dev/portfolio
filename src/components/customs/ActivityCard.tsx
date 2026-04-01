'use client';

import { animated, useSpring } from '@react-spring/web';
import {
  HeartbeatIcon,
  LightningIcon,
  ArrowUpIcon,
} from '@phosphor-icons/react';
import { cn } from '@utils/core/cn';

interface ActivityRingProps {
  progress: number;
  color: string;
  size: number;
  strokeWidth: number;
  delay?: number;
}

const ActivityRing = ({
  progress,
  color,
  size,
  strokeWidth,
  delay = 0,
}: ActivityRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const spring = useSpring({
    from: { strokeDashoffset: circumference },
    to: { strokeDashoffset: offset },
    delay: delay * 1000,
    config: { duration: 1500 },
  });

  return (
    <svg width={size} height={size} className='rotate-[-90deg]'>
      {/* Background Ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke='currentColor'
        strokeWidth={strokeWidth}
        fill='transparent'
        className='text-white/5'
      />
      {/* Progress Ring */}
      <animated.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill='transparent'
        strokeDasharray={circumference}
        strokeDashoffset={spring.strokeDashoffset}
        strokeLinecap='round'
      />
    </svg>
  );
};

export default function ActivityCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full max-w-xs p-6 rounded-3xl bg-background-paper border border-white/5 shadow-2xl',
        className
      )}
    >
      <div className='flex items-center justify-between mb-8'>
        <h3 className='text-text-secondary font-medium'>Activity</h3>
        <div className='p-2 rounded-full bg-white/5'>
          <HeartbeatIcon className='w-4 h-4 text-primary-main' />
        </div>
      </div>

      <div className='relative flex items-center justify-center mb-8'>
        {/* Outer Ring (Power) */}
        <ActivityRing
          progress={85}
          color='var(--color-primary-main)'
          size={160}
          strokeWidth={16}
        />

        {/* Middle Ring (Intelligence) */}
        <div className='absolute'>
          <ActivityRing
            progress={65}
            color='var(--color-secondary-main)'
            size={124}
            strokeWidth={16}
            delay={0.2}
          />
        </div>

        {/* Inner Ring (Charisma) */}
        <div className='absolute'>
          <ActivityRing
            progress={45}
            color='#06b6d4'
            size={88}
            strokeWidth={16}
            delay={0.4}
          />
        </div>
      </div>

      <div className='space-y-4'>
        <div className='flex items-center gap-3'>
          <div className='p-1.5 rounded-lg bg-primary-main/10'>
            <ArrowUpIcon className='w-4 h-4 text-primary-main' />
          </div>
          <div>
            <p className='text-[10px] text-text-disabled uppercase tracking-widest'>
              Power
            </p>
            <p className='text-lg font-semibold text-text-primary'>
              85{' '}
              <span className='text-text-disabled text-xs font-normal'>
                / 100
              </span>
            </p>
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <div className='p-1.5 rounded-lg bg-secondary-main/10'>
            <LightningIcon className='w-4 h-4 text-secondary-main' />
          </div>
          <div>
            <p className='text-[10px] text-text-disabled uppercase tracking-widest'>
              Intelligence
            </p>
            <p className='text-lg font-semibold text-text-primary'>
              65{' '}
              <span className='text-text-disabled text-xs font-normal'>
                / 100
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
