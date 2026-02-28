import { PaletteOptions } from '@mui/material';

/**
 * Earth Element (Mệnh Thổ) Color Palette
 * Primary: Warm golden / amber tones — symbolizing earth & stability
 * Secondary: Warm red-orange — Fire (Hỏa) supports Earth (tương sinh)
 * Background: Deep warm brown — grounded, professional dark theme
 */
export const palette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#D4A843',     // Warm gold — core earth tone
    light: '#E8C96A',    // Light gold
    dark: '#8B6914',     // Deep bronze
    contrastText: '#FFF8F0',
  },
  secondary: {
    main: '#C75B39',     // Terracotta — Hỏa sinh Thổ
    light: '#E07850',    // Light terracotta
    dark: '#8B3A22',     // Deep burnt sienna
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
    main: '#C49A3C',
    light: '#DAB860',
    dark: '#8A6B1E',
  },
  success: {
    main: '#6B8E3A',
    light: '#8AAE55',
    dark: '#4A6A20',
  },
  text: {
    primary: '#FFF3E0',     // Warm cream
    secondary: '#FFCC80',   // Soft amber
    disabled: '#C4AA96',    // Lighter warm grey (WCAG AA contrast on dark bg)
  },
  grey: {
    '50': '#FAF6F0',
    '100': '#F0E8DD',
    '200': '#E0D4C4',
    '300': '#C8B8A4',
    '400': '#A89888',
    '500': '#8A7A6A',
    '600': '#6E5E4E',
    '700': '#554838',
    '800': '#3E3228',
    '900': '#2A201A',
  },
  background: {
    default: '#1A1410',     // Deep warm black-brown
    paper: '#241E18',       // Dark mahogany
  },
  earthAccent: {
    light: '#F0D080',       // Light sand
    main: '#C8962A',        // Rich amber
  },
};
