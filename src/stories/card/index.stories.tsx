import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Card } from '@mui/material';

const meta = {
  title: 'Core/Card/Default',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  args: { onClick: fn() },
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  args: {
    children: 'Hello',
  },
};

export default {};
