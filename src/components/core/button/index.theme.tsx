import { Components, Theme } from '@mui/material';

export const muiButtonTheme = ({}: Theme): Pick<
  Components<Omit<Theme, 'components'>>,
  'MuiButton'
> => ({
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: `32px`,
      },
    },
  },
});
