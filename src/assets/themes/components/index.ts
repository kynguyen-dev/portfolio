import { muiButtonTheme } from '@components/core/button/PFButton.theme';
import { Components, Theme } from '@mui/material';

export const getThemeComponents = (
  theme: Theme
): Components<Omit<Theme, 'components'>> => ({
  ...muiButtonTheme(theme),
});
