import React from 'react';
import type { Preview } from '@storybook/react';
import { PFThemeProvider } from '../src/contexts/theme-provider';

export const withMuiTheme = (Story, _context: any) => {
  return (
    <PFThemeProvider>
      <Story />
    </PFThemeProvider>
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
