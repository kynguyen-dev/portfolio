import { ButtonHTMLAttributes, ReactNode, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@utils/core/cn';

export interface PFButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'solid' | 'white' | 'stroke' | 'ghost';
  magnet?: boolean;
}

export const PFButton = ({
  children,
  variant = 'solid',
  magnet = false,
  className,
  ...props
}: PFButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnet) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    solid: 'bg-secondary-main text-white hover:bg-secondary-light',
    white: 'bg-primary-contrast text-background-default hover:bg-white',
    stroke:
      'border-2 border-secondary-main text-secondary-main hover:bg-secondary-main hover:text-white',
    ghost: 'bg-transparent text-primary-light hover:bg-primary-light/10',
  };

  const Component = magnet ? motion.button : 'button';

  return (
    <Component
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={magnet ? { x: position.x, y: position.y } : undefined}
      transition={
        magnet
          ? { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }
          : undefined
      }
      className={cn(
        'inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const PFSolidButton = (props: PFButtonProps) => (
  <PFButton variant='solid' {...props} />
);

export const PFWhiteButton = (props: PFButtonProps) => (
  <PFButton variant='white' {...props} />
);

export const PFStrokeButton = (props: PFButtonProps) => (
  <PFButton variant='stroke' {...props} />
);

export const StyledButton = ({ className, ...props }: PFButtonProps) => (
  <PFButton
    className={cn(
      'bg-primary-dark border-2 border-primary-main text-text-primary hover:bg-primary-main hover:scale-105',
      className
    )}
    {...props}
  />
);
