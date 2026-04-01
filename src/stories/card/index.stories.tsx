import type { Meta, StoryObj } from '@storybook/react';
import { PFCard } from '@components/core';
import { PFTypography } from '@components/core';

const meta = {
  title: 'Core/Card/Default',
  component: PFCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof PFCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'min-w-[280px] p-6',
    children: (
      <div className='flex flex-col gap-2'>
        <PFTypography variant='h6'>Tonal Card</PFTypography>
        <PFTypography variant='body2' className='text-text-secondary'>
          Uses surface-container-low → surface-container-high on hover.
        </PFTypography>
      </div>
    ),
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    className: 'min-w-[280px] p-6',
    children: (
      <div className='flex flex-col gap-2'>
        <PFTypography variant='h6'>Glass Card</PFTypography>
        <PFTypography variant='body2' className='text-text-secondary'>
          Frosted obsidian pane with 60% opacity + blur(20px).
        </PFTypography>
      </div>
    ),
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    className: 'min-w-[280px] p-6',
    children: (
      <div className='flex flex-col gap-2'>
        <PFTypography variant='h6'>Ghost Border Card</PFTypography>
        <PFTypography variant='body2' className='text-text-secondary'>
          Uses outline-variant at 15% opacity.
        </PFTypography>
      </div>
    ),
  },
};
