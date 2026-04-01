import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@utils/core/cn';

export interface PFCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'outline';
  elevation?: number;
}

/**
 * Card component following the Algorithmic Atelier tonal layering system.
 *
 * - **default**: surface-container-low → surface-container-high on hover (300ms)
 * - **glass**: Frosted obsidian pane with 60% opacity + blur(20px)
 * - **outline**: Ghost-border style with 15% opacity outline-variant
 *
 * The "No-Line" Rule: borders are felt, not seen — via tonal shift, not solid lines.
 */
export const PFCard = ({
  children,
  variant = 'default',
  className,
  ...props
}: PFCardProps) => {
  const variants = {
    /* Tonal layering: surface-container-low → surface-container-high on hover */
    default: cn(
      'bg-ct-surface-container-low',
      'hover:bg-ct-surface-container-high',
      'border border-ct-outline-variant/[.08]'
    ),
    /* Glassmorphism: 60% opacity + blur(20px) */
    glass: cn(
      'bg-ct-surface-container/60 backdrop-blur-[20px]',
      'border border-ct-outline-variant/[.12]'
    ),
    /* Ghost border with outline-variant at 15% */
    outline: cn(
      'bg-transparent',
      'border border-ct-outline-variant/[.15]',
      'hover:border-ct-outline-variant/[.30]'
    ),
  };

  return (
    <div
      className={cn(
        'rounded-2xl p-6 overflow-hidden transition-all duration-300',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
