import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@utils/core/cn';

export interface PFCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'outline';
}

export const PFCard = ({
  children,
  variant = 'default',
  className,
  ...props
}: PFCardProps) => {
  const variants = {
    default: 'bg-background-paper shadow-lg border border-white/5',
    glass: 'bg-background-paper/60 backdrop-blur-md border border-white/10',
    outline: 'bg-transparent border-2 border-primary-main',
  };

  return (
    <div
      className={cn(
        'rounded-xl p-4 overflow-hidden transition-all duration-300',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
