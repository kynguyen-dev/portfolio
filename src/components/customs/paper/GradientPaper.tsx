import { ReactNode } from 'react';
import { Paper, PaperProps, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

interface GradientPaperProps extends PaperProps {
  children?: ReactNode;
}

export const GradientPaper = ({
  children,
  sx,
  ...props
}: GradientPaperProps) => {
  const { palette } = useTheme();

  return (
    <Paper
      component={motion.div}
      whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      elevation={3}
      sx={{
        background: `linear-gradient(to right bottom, ${palette.primary.light}, ${palette.primary.main})`,
        p: 4,
        borderRadius: 3,
        textAlign: 'center',
        transition: '0.3s',
        '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};
