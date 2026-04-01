import type { Meta, StoryObj } from '@storybook/react';
import { GradientPaper } from '@components/customs';
import { PFTypography } from '@components/core';

const meta = {
  title: 'Customs/GradientPaper',
  component: GradientPaper,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof GradientPaper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'min-w-[300px] min-h-[160px]',
    children: (
      <div className='flex flex-col items-center gap-2'>
        <PFTypography variant='h5' fontWeight={700}>
          Gradient Paper
        </PFTypography>
        <PFTypography variant='body2' className='text-text-secondary'>
          Glassmorphic card with hover 3D tilt effect
        </PFTypography>
      </div>
    ),
  },
};

export const WithCustomPadding: Story = {
  args: {
    className: 'min-w-[320px] p-10',
    children: (
      <div className='flex flex-col items-center gap-4'>
        <PFTypography variant='h4' fontWeight={700}>
          ✨ Featured
        </PFTypography>
        <PFTypography variant='body1' className='text-text-secondary'>
          A premium paper with gradient background, blur, and animated hover.
        </PFTypography>
      </div>
    ),
  },
};
