import { ReactNode } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { motion } from 'framer-motion';
import { makeStyles } from '@mui/styles';
import {
  APP_THEMES,
  APP_TYPOGRAPHIES_ANIMATION,
  TYPEWRITER_SPEED,
} from '@constants';
import { TypewriterEffect } from '@components/core/typography/TypewriterEffect.tsx';
import { OutlineToSolidEffect } from '@components/core/typography/OutlineToSolidEffect.tsx';

interface GradientTypographyProps extends TypographyProps {
  children: string;
  theme?: APP_THEMES;
  colors?: string[];
  animations?: APP_TYPOGRAPHIES_ANIMATION[];
  speed?: number; // typewriter speed
}

const useStyles = makeStyles(() => ({
  gradientText: {
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 200%',
  },
}));

export const PFGradientTypography = ({
  children,
  theme = APP_THEMES.LIGHT,
  variant,
  colors,
  animations = [],
  speed = TYPEWRITER_SPEED,
  ...props
}: GradientTypographyProps) => {
  const defaultColors =
    theme === APP_THEMES.LIGHT
      ? ['#ffffff', '#B0E0E6', '#87CEFA']
      : ['#1E3A8A', '#3B82F6', '#00D8FF'];

  const gradientColors = colors || defaultColors;
  const classes = useStyles();
  let animatedText: ReactNode = children;

  /** ⌨️ Typewriter Effect */
  if (animations.includes(APP_TYPOGRAPHIES_ANIMATION.TYPEWRITER)) {
    animatedText = <TypewriterEffect text={children} speed={speed} />;
  }

  /** ✨ Outline to Solid Effect */
  if (animations.includes(APP_TYPOGRAPHIES_ANIMATION.OUTlINE_TO_SOLID)) {
    animatedText = (
      <OutlineToSolidEffect
        style={{
          backgroundImage: `linear-gradient(45deg, ${gradientColors.join(', ')})`,
          WebkitBackgroundClip: 'text',
        }}
      >
        <Typography
          variant={variant}
          className={classes.gradientText}
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
      <Typography variant={variant} className={classes.gradientText} {...props}>
        {animatedText}
      </Typography>
    </motion.div>
  );
};
