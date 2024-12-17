import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PFStrokeButton } from '@components/core/button';

const meta = {
  title: 'Core/Button/Stroke',
  component: PFStrokeButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  args: { onClick: fn() },
} satisfies Meta<typeof PFStrokeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  args: {
    children: 'Stroke Button',
  },
};
