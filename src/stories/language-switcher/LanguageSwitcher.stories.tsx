import { Meta } from '@storybook/react';
import { LanguageSwitcher } from '@components/core/language-switcher/LanguageSwitcher';
import { Stack, Typography } from '@mui/material';

const meta = {
  title: 'Core/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;

export const Default = () => (
  <Stack alignItems="center" spacing={2}>
    <Typography variant="body2" color="text.secondary">
      Click to switch between EN, VI, and JA
    </Typography>
    <LanguageSwitcher />
  </Stack>
);
