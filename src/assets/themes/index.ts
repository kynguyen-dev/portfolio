import { PaletteColorOptions, ThemeOptions, createTheme } from '@mui/material';
import { palette } from './palettes';
import { lightPalette } from './palettes/light';
import { typography } from './typographies';
import { getThemeComponents } from './components';
import type { ThemeMode } from '@contexts/theme-mode';

function buildTheme(paletteOptions: typeof palette) {
  const initial = createTheme({
    palette: paletteOptions,
    typography: typography,
  });
  return createTheme(initial as ThemeOptions, {
    components: getThemeComponents(initial),
  });
}

export const darkTheme = buildTheme(palette);
export const lightTheme = buildTheme(lightPalette);

/** @deprecated – use darkTheme / lightTheme + getThemeByMode */
export const mainTheme = darkTheme;

export const getThemeByMode = (mode: ThemeMode) =>
  mode === 'light' ? lightTheme : darkTheme;

interface ExtendPalette {
  earthAccent: PaletteColorOptions;
}

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions extends Partial<ExtendPalette> {}
  interface Palette extends ExtendPalette {}
}
