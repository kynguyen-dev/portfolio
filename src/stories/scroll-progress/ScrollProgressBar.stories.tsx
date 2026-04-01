import { Meta } from '@storybook/react';
import { ScrollProgressBar } from '@components/core/scroll-progress/ScrollProgressBar';
import { PFTypography } from '@components/core';

const meta = {
  title: 'Core/ScrollProgressBar',
  component: ScrollProgressBar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollProgressBar>;

export default meta;

export const Default = () => (
  <div>
    <ScrollProgressBar />
    <div className='flex flex-col gap-8 p-8'>
      <PFTypography variant='h4' fontWeight={700}>
        Scroll Progress Bar
      </PFTypography>
      <PFTypography variant='body1' className='text-text-secondary'>
        Scroll down in this panel to see the progress bar at the top.
      </PFTypography>
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} className='p-6 rounded-lg bg-ct-surface-container-low'>
          <PFTypography variant='h6'>Section {i + 1}</PFTypography>
          <PFTypography variant='body2' className='text-text-secondary'>
            Scroll content placeholder to demonstrate the progress indicator.
          </PFTypography>
        </div>
      ))}
    </div>
  </div>
);
