import { muiButtonTheme } from '@components/core/button/index.theme.tsx';
import { Components, Theme } from '@mui/material';

export const getThemeComponents = (
  theme: Theme
): Components<Omit<Theme, 'components'>> => ({
  ...muiButtonTheme(theme),
});
