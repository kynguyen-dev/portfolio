// Aceternity UI — Label component
// Adapted for Algorithmic Atelier design system
// Source: https://ui.aceternity.com/components/signup-form

'use client';
import * as React from 'react';
import { cn } from '@utils/core/cn';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium font-label-grotesk text-ct-on-surface leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className,
        )}
        {...props}
      />
    );
  },
);
Label.displayName = 'Label';

export { Label };
