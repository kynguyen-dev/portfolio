import { useRef, type ReactNode } from 'react';
import { Box } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  /** Vertical shift in px – positive = moves up on scroll. Default 60 */
  offset?: number;
  /** Optional id for anchor navigation */
  id?: string;
}

/**
 * Wraps a section and gives it a subtle parallax depth shift as the user
 * scrolls. Uses framer-motion `useScroll` + `useTransform` so the effect
 * is purely GPU-accelerated and doesn't cause layout recalculations.
 */
export const ParallaxSection = ({
  children,
  offset = 60,
  id,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // 0 when section enters, 1 when it leaves
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <Box ref={ref} id={id} sx={{ overflow: 'hidden' }}>
      <motion.div style={{ y }}>{children}</motion.div>
    </Box>
  );
};
