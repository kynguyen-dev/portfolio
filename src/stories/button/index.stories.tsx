import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PFTypography } from '@components/core';

const meta = {
  title: 'Core/Button/Default',
  component: PFTypography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  args: { onClick: fn() },
} satisfies Meta<typeof PFTypography>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Contained: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Contained',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outlined',
    color: 'error',
    children: 'Outline',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    color: 'info',
    children: 'Text',
  },
};
