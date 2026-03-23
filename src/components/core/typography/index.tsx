import { APP_TYPOGRAPHIES_ANIMATION, TYPEWRITER_SPEED } from '@constants';
import { TypewriterEffect } from '@components/core/typography/TypewriterEffect.tsx';
import { OutlineToSolidEffect } from '@components/core/typography/OutlineToSolidEffect.tsx';
import { ReactNode, ElementType } from 'react';
import { cn } from '@utils/core/cn';

export { PFGradientTypography } from './GradientTypography';

export interface PFTypographyProps {
  children: ReactNode;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'button'
    | string;
  component?: ElementType;
  animations?: APP_TYPOGRAPHIES_ANIMATION[];
  speed?: number; // typewriter speed
  className?: string;
  fontWeight?: string | number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}

export const PFTypography = ({
  children,
  variant = 'body1',
  component,
  animations = [],
  speed = TYPEWRITER_SPEED,
  className,
  fontWeight,
  textAlign,
}: PFTypographyProps) => {
  let animatedText: ReactNode = children;

  /** ⌨️ Typewriter Effect */
  if (animations.includes(APP_TYPOGRAPHIES_ANIMATION.TYPEWRITER)) {
    animatedText = (
      <TypewriterEffect text={children?.toString() ?? ''} speed={speed} />
    );
  }

  /** ✨ Outline to Solid Effect */
  if (animations.includes(APP_TYPOGRAPHIES_ANIMATION.OUTLINE_TO_SOLID)) {
    animatedText = <OutlineToSolidEffect>{animatedText}</OutlineToSolidEffect>;
  }

  const variantClasses: Record<string, string> = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-bold',
    h3: 'text-2xl md:text-3xl lg:text-4xl font-bold',
    h4: 'text-xl md:text-2xl lg:text-3xl font-bold',
    h5: 'text-lg md:text-xl lg:text-2xl font-bold',
    h6: 'text-base md:text-lg lg:text-xl font-bold',
    body1: 'text-base leading-relaxed',
    body2: 'text-sm leading-relaxed',
    caption: 'text-xs text-text-secondary',
    button: 'text-sm font-bold uppercase tracking-wider',
  };

  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const Tag =
    component || ((variant?.startsWith('h') ? variant : 'p') as ElementType);

  return (
    <Tag
      className={cn(
        variantClasses[variant] || '',
        textAlign && textAlignClasses[textAlign],
        className
      )}
      style={{ fontWeight }}
    >
      {animatedText}
    </Tag>
  );
};
