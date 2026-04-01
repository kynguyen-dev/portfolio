import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PFButton } from '@components/core';

const meta = {
  title: 'Core/Button/Default',
  component: PFButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  args: { onClick: fn() },
} satisfies Meta<typeof PFButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = {
  args: {
    variant: 'solid',
    children: 'Solid (Purple Glow)',
  },
};

export const Stroke: Story = {
  args: {
    variant: 'stroke',
    children: 'Stroke (Ghost Border)',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Mint: Story = {
  args: {
    variant: 'mint',
    children: 'Mint Logic',
  },
};
