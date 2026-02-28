import { muiButtonTheme } from '@components/core/button/index.theme.tsx';
import { Components, Theme } from '@mui/material';

export const getThemeComponents = (
  theme: Theme
): Components<Omit<Theme, 'components'>> => ({
  ...muiButtonTheme(theme),
  MuiCssBaseline: {
    styleOverrides: {
      /* Global focus-visible ring for keyboard navigation */
      '*:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: '2px',
      },
    },
  },
});
