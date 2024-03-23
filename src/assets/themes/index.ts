import { ThemeOptions, createTheme } from '@mui/material';
import { palette } from './palettes/palette';
import { typography } from './typographies/typography';
import { getThemeComponents } from './components/component';

const initialTheme = createTheme({
  palette,
  typography,
});

export const mainTheme = createTheme(initialTheme as ThemeOptions, {
  components: getThemeComponents(initialTheme),
});
