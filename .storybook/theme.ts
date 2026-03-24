import { create } from '@storybook/theming';

export const storybookTheme = create({
  base: 'dark',
  brandTitle: 'Algorithmic Atelier // Ky Nguyen',
  brandUrl: '/',
  brandTarget: '_blank',

  // Obsidian surface tiers
  colorPrimary: '#d0bcff',
  colorSecondary: '#4edea3',

  // UI
  appBg: '#0a0e14',
  appContentBg: '#10141a',
  appPreviewBg: '#10141a',
  appBorderColor: '#494454',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Space Grotesk Variable", "Inter", sans-serif',
  fontCode: '"Space Grotesk Variable", monospace',

  // Text colors
  textColor: '#dfe2eb',
  textInverseColor: '#10141a',
  textMutedColor: '#958ea0',

  // Toolbar
  barTextColor: '#cbc3d7',
  barSelectedColor: '#4edea3',
  barHoverColor: '#d0bcff',
  barBg: '#1c2026',

  // Form colors
  inputBg: '#181c22',
  inputBorder: '#494454',
  inputTextColor: '#dfe2eb',
  inputBorderRadius: 4,

  // Booleans
  booleanBg: '#181c22',
  booleanSelectedBg: '#4edea3',

  // Buttons
  buttonBg: '#262a31',
  buttonBorder: '#494454',
});
