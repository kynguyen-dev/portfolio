/**
 * Shared glassmorphic card styles used across multiple sections.
 * Centralises the background / blur / border / hover pattern so every card
 * stays visually consistent and can be updated in one place.
 */

export interface GlassCardOptions {
  /** Backdrop blur strength in px (default 12) */
  blur?: number;
  /** MUI border-radius token (default 3) */
  borderRadius?: number;
  /** Whether to apply a translateY on hover (default true) */
  hoverLift?: boolean;
  /** Custom box-shadow spread on hover in px (default 24) */
  hoverShadowSpread?: number;
}

export const glassCardSx = (
  isLight: boolean,
  options: GlassCardOptions = {},
) => {
  const {
    blur = 12,
    borderRadius = 3,
    hoverLift = true,
    hoverShadowSpread = 24,
  } = options;

  return {
    background: isLight
      ? 'rgba(255,248,240,0.85)'
      : 'rgba(11, 13, 46, 0.55)',
    backdropFilter: `blur(${blur}px)`,
    border: `1px solid ${
      isLight ? 'rgba(184,137,31,0.15)' : 'rgba(245, 208, 96, 0.15)'
    }`,
    borderRadius,
    transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.2s',
    '&:hover': {
      borderColor: isLight
        ? 'rgba(184,137,31,0.45)'
        : 'rgba(245, 208, 96, 0.45)',
      boxShadow: `0 0 ${hoverShadowSpread}px ${
        isLight ? 'rgba(184,137,31,0.08)' : 'rgba(245, 208, 96, 0.08)'
      }`,
      ...(hoverLift && { transform: 'translateY(-2px)' }),
    },
  } as const;
};
