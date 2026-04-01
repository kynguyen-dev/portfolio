import type { Meta, StoryObj } from '@storybook/react';
import { BackToTop } from '@components/core/back-to-top/BackToTop';
import { PFTypography } from '@components/core';

const meta = {
  title: 'Core/BackToTop',
  component: BackToTop,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    threshold: {
      control: { type: 'number', min: 100, max: 1000, step: 50 },
      description: 'Scroll distance in px before the button appears',
    },
  },
} satisfies Meta<typeof BackToTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { threshold: 200 },
  render: args => (
    <div>
      <div className='flex flex-col gap-6 p-8'>
        <PFTypography variant='h4' fontWeight={700}>
          Back to Top Button
        </PFTypography>
        <PFTypography variant='body1' className='text-text-secondary'>
          Scroll down past {args.threshold}px to reveal the floating button.
        </PFTypography>
        {Array.from({ length: 25 }, (_, i) => (
          <div key={i} className='p-6 rounded-lg bg-ct-surface-container-low'>
            <PFTypography variant='h6'>Section {i + 1}</PFTypography>
            <PFTypography variant='body2' className='text-text-secondary'>
              Keep scrolling to see the back-to-top button appear.
            </PFTypography>
          </div>
        ))}
      </div>
      <BackToTop threshold={args.threshold} />
    </div>
  ),
};
