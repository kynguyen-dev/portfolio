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
  const isLight = palette.mode === 'light';

  return (
    <Paper
      component={motion.div}
      whileHover={{ scale: 1.03, rotateX: 5, rotateY: 5 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      elevation={6}
      sx={{
        background: isLight
          ? 'linear-gradient(160deg, rgba(255,248,240,0.95) 0%, rgba(250,232,176,0.85) 50%, rgba(255,248,240,0.95) 100%)'
          : 'linear-gradient(160deg, rgba(11,13,46,0.85) 0%, rgba(75,25,66,0.75) 50%, rgba(11,13,46,0.85) 100%)',
        backdropFilter: 'blur(16px)',
        border: isLight
          ? '1px solid rgba(184,137,31,0.3)'
          : '1px solid rgba(245,208,96,0.25)',
        boxShadow: isLight
          ? '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(212,168,67,0.2)'
          : '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(232,168,56,0.15)',
        p: 4,
        borderRadius: 3,
        textAlign: 'center',
        color: palette.text.primary,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};
