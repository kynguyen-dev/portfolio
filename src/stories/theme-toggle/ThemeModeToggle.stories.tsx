import { Meta } from '@storybook/react';
import { ThemeModeToggle } from '@components/core/theme-toggle/ThemeModeToggle';
import { Stack, Typography } from '@mui/material';

const meta = {
  title: 'Core/ThemeModeToggle',
  component: ThemeModeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeModeToggle>;

export default meta;

export const Default = () => (
  <Stack alignItems='center' spacing={2}>
    <Typography variant='body2' color='text.secondary'>
      Click the icon to toggle between dark and light mode
    </Typography>
    <ThemeModeToggle />
  </Stack>
);
