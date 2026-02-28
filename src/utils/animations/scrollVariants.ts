import { type Variants } from 'framer-motion';

/* ───────────────────────────────────────────────────────────
 * Reusable scroll-triggered animation variants for framer-motion.
 * Usage:  <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{once:true}} />
 * ─────────────────────────────────────────────────────────── */

/** Fade up (default — gentle rise) */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Fade down */
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Slide in from left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Slide in from right */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Scale up from center */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Rotate in from below */
export const rotateIn: Variants = {
  hidden: { opacity: 0, y: 40, rotate: -5 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

/** Blur fade in */
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 20 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

/** Pop — spring-based bounce from scale 0 */
export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 18 },
  },
};

/** Stagger container — wraps children that each have their own variant.
 *  Usage:  <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" />
 *          children: <motion.div variants={fadeUp} />
 */
export const staggerContainer = (
  staggerDelay = 0.12,
  delayChildren = 0.1,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

/** Stagger-aware fade up (used inside staggerContainer) */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Stagger-aware slide-in from left */
export const staggerSlideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Stagger-aware scale up */
export const staggerScaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Draw-line — for SVG path animations */
export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: 'easeInOut' },
  },
};

/** Flip in from Y axis (3D) */
export const flipInY: Variants = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};
