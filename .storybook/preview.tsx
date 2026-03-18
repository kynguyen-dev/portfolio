import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeModeProvider } from '../src/contexts/theme-mode';
import { PFThemeProvider } from '../src/contexts/theme-provider';
import '../src/i18n';

export const withMuiTheme = (Story, _context: any) => {
  return (
    <ThemeModeProvider>
      <PFThemeProvider>
        <Story />
      </PFThemeProvider>
    </ThemeModeProvider>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background)$/i,
      },
    },
  },
  argTypes: {
    onClick: {
      action: 'clicked',
      description: 'Triggered action upon clicking this component',
    },
  },
  decorators: [withMuiTheme],
};

export default preview;
