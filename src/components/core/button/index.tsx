import { ButtonHTMLAttributes, ReactNode, useRef, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { cn } from '@utils/core/cn';

export interface PFButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'solid' | 'white' | 'stroke' | 'ghost' | 'mint';
  magnet?: boolean;
  size?: 'small' | 'medium' | 'large';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const PFButton = ({
  children,
  variant = 'solid',
  magnet = false,
  size = 'medium',
  startIcon,
  endIcon,
  className,
  ...props
}: PFButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

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
    setHovered(false);
  };

  /* Physics-based interactions: squish on press (0.98), float on hover (1.05) */
  const interactionSpring = useSpring({
    x: position.x,
    y: position.y,
    scale: pressed ? 0.98 : hovered ? 1.05 : 1,
    config: { tension: 300, friction: 15, mass: 0.1 },
  });

  const sizeClasses = {
    small: 'px-4 py-1.5 text-xs gap-1.5',
    medium: 'px-6 py-2.5 text-sm gap-2',
    large: 'px-8 py-3.5 text-base gap-2.5',
  };

  const variants = {
    /* Purple Glow — primary CTA with gradient soul */
    solid: cn(
      'bg-gradient-to-r from-primary-main to-primary-container text-ct-on-primary',
      'shadow-[0_0_24px_rgba(208,188,255,0.2)]',
      'hover:shadow-[0_0_36px_rgba(208,188,255,0.3)]'
    ),
    /* Mint Logic — ghost border, mint text, subtle fill on hover */
    mint: cn(
      'border border-ct-outline-variant/15 text-secondary-main',
      'hover:bg-secondary-main/5'
    ),
    /* White on dark */
    white: 'bg-ct-on-surface text-ct-bg hover:bg-ct-on-surface/90',
    /* Stroke — purple outline */
    stroke: cn(
      'border border-ct-outline-variant/15 text-primary-main',
      'hover:bg-primary-main/5'
    ),
    /* Ghost — no container */
    ghost: 'bg-transparent text-primary-light hover:bg-primary-main/10',
  };

  const buttonClasses = cn(
    'inline-flex items-center justify-center rounded-lg font-bold font-label-grotesk transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
    sizeClasses[size],
    variants[variant],
    className
  );

  const inner = (
    <>
      {startIcon && <span className='flex-shrink-0'>{startIcon}</span>}
      {children}
      {endIcon && <span className='flex-shrink-0'>{endIcon}</span>}
    </>
  );

  if (magnet) {
    return (
      <animated.button
        ref={ref as React.RefObject<HTMLButtonElement>}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        style={interactionSpring}
        className={buttonClasses}
        {...props}
      >
        {inner}
      </animated.button>
    );
  }

  return (
    <animated.button
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={interactionSpring}
      className={buttonClasses}
      {...props}
    >
      {inner}
    </animated.button>
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
      'bg-gradient-to-r from-primary-dark to-primary-main text-ct-on-primary',
      className
    )}
    {...props}
  />
);
