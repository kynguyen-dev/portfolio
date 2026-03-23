import { ReactNode, ElementType } from 'react';
import { motion } from 'framer-motion';
import {
  APP_THEMES,
  APP_TYPOGRAPHIES_ANIMATION,
  TYPEWRITER_SPEED,
} from '@constants';
import { TypewriterEffect } from '@components/core/typography/TypewriterEffect.tsx';
import { OutlineToSolidEffect } from '@components/core/typography/OutlineToSolidEffect.tsx';
import { cn } from '@utils/core/cn';

export interface PFGradientTypographyProps {
  children: string;
  theme?: APP_THEMES;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | string;
  component?: ElementType;
  colors?: string[];
  animations?: APP_TYPOGRAPHIES_ANIMATION[];
  speed?: number; // typewriter speed
  className?: string;
  fontWeight?: string | number;
}

export const PFGradientTypography = ({
  children,
  theme = APP_THEMES.LIGHT,
  variant = 'h1',
  component,
  colors,
  animations = [],
  speed = TYPEWRITER_SPEED,
  className,
  fontWeight,
}: PFGradientTypographyProps) => {
  const defaultColors =
    theme === APP_THEMES.LIGHT
      ? ['#FFF8F0', '#F0D080', '#E8C060']
      : ['#8B6914', '#D4A843', '#C75B39'];

  const gradientColors = colors || defaultColors;
  let animatedText: ReactNode = children;

  /** ⌨️ Typewriter Effect */
  if (animations.includes(APP_TYPOGRAPHIES_ANIMATION.TYPEWRITER)) {
    animatedText = <TypewriterEffect text={children} speed={speed} />;
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
  };

  const Tag =
    component || ((variant?.startsWith('h') ? variant : 'p') as ElementType);

  const content = (
    <Tag
      className={cn(variantClasses[variant] || '', className)}
      style={{
        fontWeight,
        backgroundImage: `linear-gradient(45deg, ${gradientColors.join(', ')})`,
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {animatedText}
    </Tag>
  );

  /** ✨ Outline to Solid Effect */
  if (animations.includes(APP_TYPOGRAPHIES_ANIMATION.OUTLINE_TO_SOLID)) {
    return (
      <OutlineToSolidEffect
        style={{
          backgroundImage: `linear-gradient(45deg, ${gradientColors.join(', ')})`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
      >
        {content}
      </OutlineToSolidEffect>
    );
  }

  return (
    <motion.div
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      }}
      className='inline-block'
    >
      {content}
    </motion.div>
  );
};
