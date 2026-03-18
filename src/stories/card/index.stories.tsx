import type { Meta, StoryObj } from '@storybook/react';
import { PFCard } from '@components/core';
import { Typography, Stack } from '@mui/material';

const meta = {
  title: 'Core/Card/Default',
  component: PFCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PFCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Elevated: Story = {
  args: {
    elevation: 4,
    sx: { p: 3, minWidth: 280 },
    children: (
      <Stack spacing={1}>
        <Typography variant="h6">Card Title</Typography>
        <Typography variant="body2" color="text.secondary">
          This is a PFCard component with elevation.
        </Typography>
      </Stack>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    sx: { p: 3, minWidth: 280 },
    children: (
      <Stack spacing={1}>
        <Typography variant="h6">Outlined Card</Typography>
        <Typography variant="body2" color="text.secondary">
          This is a PFCard component with outlined variant.
        </Typography>
      </Stack>
    ),
  },
};
