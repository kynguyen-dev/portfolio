import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PFSolidButton } from '@components/core/button';

const meta = {
  title: 'Core/Button/Solid',
  component: PFSolidButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  args: { onClick: fn() },
} satisfies Meta<typeof PFSolidButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  args: {
    children: 'Contained',
  },
};
