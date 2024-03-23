import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';
import { storybookTheme } from './theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: storybookTheme,
    },
  },
};

export default preview;
