import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PFWhiteButton } from '@components/core/button';

const meta = {
  title: 'Core/Button/White',
  component: PFWhiteButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  args: { onClick: fn() },
} satisfies Meta<typeof PFWhiteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  args: {
    children: 'White Button',
  },
};
