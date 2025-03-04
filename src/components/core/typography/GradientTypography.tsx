import { Typography, TypographyProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GradientTypographyProps extends TypographyProps {
  children: ReactNode;
  theme?: 'light' | 'dark';
  colors?: string[];
}

const useStyles = makeStyles(() => ({
  gradientText: {
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 200%',
  },
}));

export const PFGradientTypography = ({
  children,
  theme = 'light',
  variant,
  colors,
  ...props
}: GradientTypographyProps) => {
  const defaultColors =
    theme === 'light'
      ? ['#ffffff', '#B0E0E6', '#87CEFA']
      : ['#1E3A8A', '#3B82F6', '#00D8FF'];

  const gradientColors = colors || defaultColors;

  const classes = useStyles();

  return (
    <motion.div
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        backgroundImage: `linear-gradient(45deg, ${gradientColors.join(', ')})`,
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
      }}
    >
      <Typography variant={variant} className={classes.gradientText} {...props}>
        {children}
      </Typography>
    </motion.div>
  );
};
