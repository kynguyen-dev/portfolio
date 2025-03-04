import { ReactNode } from 'react';
import { CardProps, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { PFCard } from '@components/core';

interface GradientCardProps extends CardProps {
  children?: ReactNode;
  animated?: boolean;
}

export const GradientCard = ({
  children,
  animated = true,
}: GradientCardProps) => {
  const { palette } = useTheme();

  const card = (
    <PFCard
      variant='elevation'
      sx={{
        boxShadow: 3,
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(to right bottom, ${palette.primary.main}, ${palette.primary.dark})`,
      }}
    >
      {children}
    </PFCard>
  );

  return animated ? (
    <motion.div
      whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {card}
    </motion.div>
  ) : (
    card
  );
};
