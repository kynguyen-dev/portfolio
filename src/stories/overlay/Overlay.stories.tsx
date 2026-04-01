import { Meta } from '@storybook/react';
import { Overlay, OverlayContent } from '@components/core/overlay';
import { PFTypography } from '@components/core';

const meta = {
  title: 'Core/Overlay',
  component: Overlay,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Overlay>;

export default meta;

export const Default = () => (
  <div
    className='relative w-[360px] h-[240px] rounded-lg overflow-hidden cursor-pointer group'
    style={{
      background:
        'linear-gradient(135deg, rgba(75,25,66,0.8), rgba(11,13,46,0.9))',
    }}
  >
    <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-ct-on-surface font-bold text-xl text-center z-0'>
      Hover Me
    </span>
    <Overlay className='overlay'>
      <OverlayContent className='overlay-content'>
        <PFTypography variant='h6' fontWeight={700}>
          Overlay Title
        </PFTypography>
        <PFTypography variant='body2' className='mt-2'>
          This overlay appears on hover with a smooth transition.
        </PFTypography>
      </OverlayContent>
    </Overlay>
  </div>
);
