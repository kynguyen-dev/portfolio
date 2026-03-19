import { Box, useTheme } from '@mui/material';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin progress bar fixed at the very top of the viewport.
 * Shows how far the user has scrolled the page.
 */
export const ScrollProgressBar = () => {
  const { palette } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Box
      component={motion.div}
      style={{ scaleX, transformOrigin: '0%' }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 2000,
        background: `linear-gradient(90deg, ${palette.primary.light}, ${palette.primary.main}, ${palette.secondary.main})`,
      }}
    />
  );
};
