import { motion, useScroll, useSpring } from 'motion/react';

/**
 * Thin progress bar fixed at the very top of the viewport.
 * Shows how far the user has scrolled the page.
 */
export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className='fixed top-0 left-0 right-0 h-[3px] z-[2000] bg-gradient-to-r from-[var(--color-primary-light)] via-[var(--color-primary-main)] to-[var(--color-secondary-main)]'
    />
  );
};
