import { Palette, Typography, TypographyProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ReactNode } from 'react';

interface GradientTypographyProps extends TypographyProps {
  children: ReactNode;
}

const useStyles = makeStyles(
  (theme: {
    palette: { primary: { main: Palette }; secondary: { main: Palette } };
  }) => ({
    gradientText: {
      background: `-webkit-linear-gradient(${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    },
  })
);

export const PFGradientTypography = ({
  children,
  variant,
  ...props
}: GradientTypographyProps) => {
  const classes = useStyles();

  return (
    <Typography variant={variant} className={classes.gradientText} {...props}>
      {children}
    </Typography>
  );
};
