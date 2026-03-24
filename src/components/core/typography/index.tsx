import { APP_TYPOGRAPHIES_ANIMATION, TYPEWRITER_SPEED } from '@constants';
import { TypewriterEffect } from '@components/core/typography/TypewriterEffect.tsx';
import { OutlineToSolidEffect } from '@components/core/typography/OutlineToSolidEffect.tsx';
import { ReactNode, ElementType, CSSProperties } from 'react';
import { cn } from '@utils/core/cn';

export { PFGradientTypography } from './GradientTypography';

/* ─── Variant ↔ semantic mapping ─── */
type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline';

export interface PFTypographyProps {
  children: ReactNode;
  variant?: TypographyVariant | string;
  component?: ElementType;
  animations?: APP_TYPOGRAPHIES_ANIMATION[];
  speed?: number;
  className?: string;
  fontWeight?: string | number;
  fontSize?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  color?: string;
  /** Inline style object – supported for dynamic per-instance styling */
  style?: CSSProperties;
  /** MUI-compat sx shorthand – merged as inline styles for key properties */
  sx?: Record<string, unknown>;
  align?: string;
}

/**
 * Flatten a simple `sx` object into CSSProperties.
 * Supports common MUI shorthands: mt, mb, mx, my, px, py, ml, mr.
 */
function sxToStyle(sx: Record<string, unknown>): CSSProperties {
  const sxMap: Record<string, string> = {
    mt: 'marginTop',
    mb: 'marginBottom',
    ml: 'marginLeft',
    mr: 'marginRight',
    mx: 'marginInline',
    my: 'marginBlock',
    pt: 'paddingTop',
    pb: 'paddingBottom',
    px: 'paddingInline',
    py: 'paddingBlock',
  };

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(sx)) {
    const mapped = sxMap[key];
    if (mapped) {
      result[mapped] = typeof value === 'number' ? `${value * 8}px` : value;
    } else {
      result[key] = value;
    }
  }
  return result as CSSProperties;
}

export const PFTypography = ({
  children,
  variant = 'body1',
  component,
  animations = [],
  speed = TYPEWRITER_SPEED,
  className,
  fontWeight,
  fontSize,
  textAlign,
  color,
  style,
  sx,
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

  /* ─── Variant → Tailwind class mapping ─── */
  const variantClasses: Record<string, string> = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold font-serif-display tracking-tight',
    h2: 'text-3xl md:text-4xl lg:text-5xl font-bold font-serif-display tracking-tight',
    h3: 'text-2xl md:text-3xl lg:text-4xl font-bold font-serif-display',
    h4: 'text-xl md:text-2xl lg:text-3xl font-bold font-serif-display',
    h5: 'text-lg md:text-xl lg:text-2xl font-bold',
    h6: 'text-base md:text-lg lg:text-xl font-bold',
    subtitle1: 'text-lg font-medium',
    subtitle2: 'text-base font-medium',
    body1: 'text-base leading-relaxed',
    body2: 'text-sm leading-relaxed',
    caption: 'text-xs text-text-secondary',
    button: 'text-sm font-bold uppercase tracking-wider font-label-grotesk',
    overline:
      'text-xs uppercase tracking-[0.12em] font-label-grotesk text-text-secondary',
  };

  const textAlignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  const Tag =
    component || ((variant?.startsWith('h') ? variant : 'p') as ElementType);

  /* Merge style + sx + fontWeight + fontSize + color */
  const mergedStyle: CSSProperties = {
    ...(fontWeight ? { fontWeight } : {}),
    ...(fontSize ? { fontSize } : {}),
    ...(color ? { color } : {}),
    ...(sx ? sxToStyle(sx) : {}),
    ...style,
  };

  return (
    <Tag
      className={cn(
        variantClasses[variant] || '',
        textAlign && textAlignClasses[textAlign],
        className
      )}
      style={Object.keys(mergedStyle).length > 0 ? mergedStyle : undefined}
    >
      {animatedText}
    </Tag>
  );
};
