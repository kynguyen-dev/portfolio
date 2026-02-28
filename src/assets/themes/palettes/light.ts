import { PaletteOptions } from '@mui/material';

/**
 * Light Mode — Earth Element (Mệnh Thổ)
 * Warm, sunlit palette complementing the dark Sunrise theme.
 * Retains gold/amber identity with light, breathable backgrounds.
 */
export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#B8891F',     // Deeper gold for contrast on light bg
    light: '#D4A843',    // Warm gold
    dark: '#8B6914',     // Deep bronze
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#C75B39',     // Terracotta stays vibrant
    light: '#E07850',
    dark: '#8B3A22',
  },
  error: {
    main: '#D44040',
    light: '#E06060',
    dark: '#A02828',
  },
  warning: {
    main: '#E8963A',
    light: '#F0B060',
    dark: '#B06A18',
  },
  info: {
    main: '#9A7520',
    light: '#C49A3C',
    dark: '#6E5410',
  },
  success: {
    main: '#5A7A30',
    light: '#6B8E3A',
    dark: '#3E5A18',
  },
  text: {
    primary: '#2A1E10',     // Dark warm brown
    secondary: '#5C4A32',   // Medium brown
    disabled: '#9E8A72',    // Muted warm grey
  },
  grey: {
    '50': '#FAF6F0',
    '100': '#F5EDE0',
    '200': '#E8DCC8',
    '300': '#D4C4A8',
    '400': '#B8A488',
    '500': '#9A8668',
    '600': '#7A6A52',
    '700': '#5C4E3A',
    '800': '#3E3428',
    '900': '#2A201A',
  },
  background: {
    default: '#FBF6EE',     // Warm ivory
    paper: '#FFF8F0',       // Light cream
  },
  earthAccent: {
    light: '#F0D080',       // Light sand (same)
    main: '#C8962A',        // Rich amber (same)
  },
};
