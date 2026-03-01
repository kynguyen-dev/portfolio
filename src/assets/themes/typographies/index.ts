import { TypographyOptions } from '@mui/material/styles/createTypography';

export const typography: TypographyOptions = {
  fontSize: 14,
  fontFamily: 'Roboto, sans-serif',
  htmlFontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  allVariants: {
    fontStyle: 'normal',
    fontFamily: 'Roboto, sans-serif',
    lineHeight: 'normal',
  },
  /* ── Responsive heading sizes using clamp() ── */
  h1: { fontSize: 'clamp(2rem, 5vw, 3.5rem)' },
  h2: { fontSize: 'clamp(1.75rem, 4vw, 3rem)' },
  h3: { fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' },
  h4: { fontSize: 'clamp(1.25rem, 3vw, 2.125rem)' },
  h5: { fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' },
  h6: { fontSize: 'clamp(1rem, 2vw, 1.25rem)' },
  button: {
    fontSize: '14px',
    fontWeight: 700,
    textTransform: 'none',
  },
};
