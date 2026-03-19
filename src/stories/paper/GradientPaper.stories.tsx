import type { Meta, StoryObj } from '@storybook/react';
import { GradientPaper } from '@components/customs';
import { Typography, Stack } from '@mui/material';

const meta = {
  title: 'Customs/GradientPaper',
  component: GradientPaper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GradientPaper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sx: { minWidth: 300, minHeight: 160 },
    children: (
      <Stack spacing={1} alignItems='center'>
        <Typography variant='h5' fontWeight={700}>
          Gradient Paper
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Glassmorphic card with hover 3D tilt effect
        </Typography>
      </Stack>
    ),
  },
};

export const WithCustomPadding: Story = {
  args: {
    sx: { minWidth: 320, p: 6 },
    children: (
      <Stack spacing={2} alignItems='center'>
        <Typography variant='h4' fontWeight={700}>
          ✨ Featured
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          A premium-looking paper with gradient background, blur, and animated
          hover.
        </Typography>
      </Stack>
    ),
  },
};
