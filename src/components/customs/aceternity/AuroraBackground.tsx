'use client';
import { cn } from '@utils/core/cn';
import { ReactNode } from 'react';

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        'transition-bg relative flex flex-col items-center justify-center',
        className
      )}
      {...props}
    >
      <div
        className='absolute inset-0 overflow-hidden'
        style={
          {
            '--aurora':
              'repeating-linear-gradient(100deg,#d0bcff_10%,#a078ff_15%,#4edea3_20%,#6ffbbe_25%,#d0bcff_30%)',
            '--dark-gradient':
              'repeating-linear-gradient(100deg,var(--sys-bg)_0%,var(--sys-bg)_7%,transparent_10%,transparent_12%,var(--sys-bg)_16%)',
            '--white-gradient':
              'repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)',
            '--transparent': 'transparent',
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,#d0bcff_10%,#a078ff_15%,#4edea3_20%,#6ffbbe_25%,#d0bcff_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--sys-bg,#10141a)_0%,var(--sys-bg,#10141a)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--sys-bg,#10141a)_16%)] [--white-gradient:repeating-linear-gradient(100deg,#fff_0%,#fff_7%,var(--transparent)_10%,var(--transparent)_12%,#fff_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};
