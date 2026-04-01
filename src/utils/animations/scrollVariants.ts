/* ───────────────────────────────────────────────────────────
 * Reusable scroll-triggered animation configs for react-spring.
 * These are plain config objects consumed by the spring hooks
 * in springVariants.ts.
 * ─────────────────────────────────────────────────────────── */

export interface ScrollAnimationConfig {
  from: Record<string, number | string>;
  to: Record<string, number | string>;
  config?: { tension?: number; friction?: number; duration?: number };
}

/** Fade up (default — gentle rise) */
export const fadeUp: ScrollAnimationConfig = {
  from: { opacity: 0, y: 60 },
  to: { opacity: 1, y: 0 },
  config: { tension: 170, friction: 26 },
};

/** Fade down */
export const fadeDown: ScrollAnimationConfig = {
  from: { opacity: 0, y: -50 },
  to: { opacity: 1, y: 0 },
  config: { tension: 170, friction: 26 },
};

/** Slide in from left */
export const slideInLeft: ScrollAnimationConfig = {
  from: { opacity: 0, x: -80 },
  to: { opacity: 1, x: 0 },
  config: { tension: 170, friction: 26 },
};

/** Slide in from right */
export const slideInRight: ScrollAnimationConfig = {
  from: { opacity: 0, x: 80 },
  to: { opacity: 1, x: 0 },
  config: { tension: 170, friction: 26 },
};

/** Scale up from center */
export const scaleUp: ScrollAnimationConfig = {
  from: { opacity: 0, scale: 0.8 },
  to: { opacity: 1, scale: 1 },
  config: { tension: 170, friction: 26 },
};

/** Blur fade in */
export const blurIn: ScrollAnimationConfig = {
  from: { opacity: 0, y: 20 },
  to: { opacity: 1, y: 0 },
  config: { duration: 800 },
};

/** Pop — spring-based bounce from scale 0 */
export const pop: ScrollAnimationConfig = {
  from: { opacity: 0, scale: 0.5 },
  to: { opacity: 1, scale: 1 },
  config: { tension: 260, friction: 18 },
};
