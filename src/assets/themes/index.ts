import { PaletteColorOptions, ThemeOptions, createTheme } from '@mui/material';
import { palette } from './palettes';
import { typography } from './typographies';
import { getThemeComponents } from './components';

const initialTheme = createTheme({
  palette: palette,
  typography: typography,
});

export const mainTheme = createTheme(initialTheme as ThemeOptions, {
  components: getThemeComponents(initialTheme),
});

interface ExtendPalette {
  branchBlue: PaletteColorOptions;
}

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions extends Partial<ExtendPalette> {}
  interface Palette extends ExtendPalette {}
}
