import { ReactNode } from 'react';
import { Typography, TypographyProps, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import {
  APP_THEMES,
  APP_TYPOGRAPHIES_ANIMATION,
  TYPEWRITER_SPEED,
} from '@constants';
import { TypewriterEffect } from '@components/core/typography/TypewriterEffect.tsx';
import { OutlineToSolidEffect } from '@components/core/typography/OutlineToSolidEffect.tsx';

interface GradientTypographyProps extends Omit<TypographyProps, 'theme'> {
  children: string;
  theme?: APP_THEMES;
  colors?: string[];
  animations?: APP_TYPOGRAPHIES_ANIMATION[];
  speed?: number; // typewriter speed
}

const gradientTextSx = {
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% 200%',
} as const;

export const PFGradientTypography = ({
  children,
  theme = APP_THEMES.LIGHT,
  variant,
  colors,
  animations = [],
  speed = TYPEWRITER_SPEED,
  ...props
}: GradientTypographyProps) => {
  const { palette } = useTheme();
  const defaultColors =
    theme === APP_THEMES.LIGHT
      ? [palette.primary.contrastText, '#F0D080', '#E8C060']
      : [palette.primary.dark, '#D4A843', '#C75B39'];

  const gradientColors = colors || defaultColors;
  let animatedText: ReactNode = children;

  /** ⌨️ Typewriter Effect */
  if (animations.includes(APP_TYPOGRAPHIES_ANIMATION.TYPEWRITER)) {
    animatedText = <TypewriterEffect text={children} speed={speed} />;
  }

  /** ✨ Outline to Solid Effect */
  if (animations.includes(APP_TYPOGRAPHIES_ANIMATION.OUTLINE_TO_SOLID)) {
    animatedText = (
      <OutlineToSolidEffect
        style={{
          backgroundImage: `linear-gradient(45deg, ${gradientColors.join(', ')})`,
          WebkitBackgroundClip: 'text',
        }}
      >
        <Typography
          variant={variant}
          sx={gradientTextSx}
          {...props}
        >
          {animatedText}
        </Typography>
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
      style={{
        backgroundImage: `linear-gradient(45deg, ${gradientColors.join(', ')})`,
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
      }}
    >
      <Typography variant={variant} sx={gradientTextSx} {...props}>
        {animatedText}
      </Typography>
    </motion.div>
  );
};
