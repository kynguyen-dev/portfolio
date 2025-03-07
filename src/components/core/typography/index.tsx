import { Typography, TypographyProps } from '@mui/material';
import { APP_TYPOGRAPHIES_ANIMATION, TYPEWRITER_SPEED } from '@constants';
import { TypewriterEffect } from '@components/core/typography/TypewriterEffect.tsx';
import { OutlineToSolidEffect } from '@components/core/typography/OutlineToSolidEffect.tsx';
import { ReactNode } from 'react';

export interface PFTypographyProps extends TypographyProps {
  children: ReactNode;
  animations?: APP_TYPOGRAPHIES_ANIMATION[];
  speed?: number; // typewriter speed
}

export const PFTypography = ({
  children,
  variant,
  animations = [],
  speed = TYPEWRITER_SPEED,
  ...props
}: PFTypographyProps) => {
  let animatedText: ReactNode = children;

  /** ⌨️ Typewriter Effect */
  if (animations.includes(APP_TYPOGRAPHIES_ANIMATION.TYPEWRITER)) {
    animatedText = <TypewriterEffect text={children?.toString() ?? ''} speed={speed} />;
  }

  /** ✨ Outline to Solid Effect */
  if (animations.includes(APP_TYPOGRAPHIES_ANIMATION.OUTlINE_TO_SOLID)) {
    animatedText = <OutlineToSolidEffect>{animatedText}</OutlineToSolidEffect>;
  }

  return (
    <Typography variant={variant} {...props}>
      {animatedText}
    </Typography>
  );
};
