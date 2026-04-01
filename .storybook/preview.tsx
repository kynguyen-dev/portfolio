import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeModeProvider } from '../src/contexts/theme-mode';
import '../src/index.css';
import '../src/i18n';

/**
 * Global decorator that wraps every story in the ThemeModeProvider.
 * Tailwind CSS styles are applied via the index.css import above.
 */
export const withTheme = (Story: React.ComponentType) => {
  return (
    <ThemeModeProvider>
      <div className='bg-ct-bg text-ct-on-surface min-h-screen p-8 font-sans'>
        <Story />
      </div>
    </ThemeModeProvider>
  );
};

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'obsidian',
      values: [
        { name: 'obsidian', value: '#10141a' },
        { name: 'surface-container', value: '#1c2026' },
        { name: 'surface-container-high', value: '#262a31' },
        { name: 'light', value: '#dfe2eb' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  argTypes: {
    onClick: {
      action: 'clicked',
      description: 'Triggered action upon clicking this component',
    },
  },
  decorators: [withTheme],
};

export default preview;
