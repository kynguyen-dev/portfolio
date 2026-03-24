import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@lib/utils';

const variantClasses = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/80',
  outline:
    'border border-border bg-background hover:bg-ct-surface-container-high',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-ct-surface-container-high',
  destructive: 'bg-red-500/10 text-red-400 hover:bg-red-500/20',
  link: 'text-primary underline-offset-4 hover:underline',
} as const;

const sizeClasses = {
  default: 'h-8 px-2.5 gap-1.5',
  xs: 'h-6 px-2 text-xs gap-1',
  sm: 'h-7 px-2.5 text-sm gap-1',
  lg: 'h-9 px-3 gap-1.5',
  icon: 'size-8',
  'icon-xs': 'size-6',
  'icon-sm': 'size-7',
  'icon-lg': 'size-9',
} as const;

type ButtonVariant = keyof typeof variantClasses;
type ButtonSize = keyof typeof sizeClasses;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-slot='button'
        className={cn(
          'inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
