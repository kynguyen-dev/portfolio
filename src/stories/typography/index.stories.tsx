import { Meta } from '@storybook/react';
import { PFTypography } from '@components/core';

const ThemeTypography = () => <div>Theme/Typography</div>;

export default {
  title: 'Theme/Typography',
  component: ThemeTypography,
} as Meta<typeof ThemeTypography>;

export const Variant = () => (
  <div className='flex flex-col gap-4 items-start'>
    <PFTypography variant='h1'>h1 - Display Large</PFTypography>
    <PFTypography variant='h2'>h2 - Display Medium</PFTypography>
    <PFTypography variant='h3'>h3 - Display Small</PFTypography>
    <PFTypography variant='h4'>h4 - Headline Large</PFTypography>
    <PFTypography variant='h5'>h5 - Headline Medium</PFTypography>
    <PFTypography variant='h6'>h6 - Headline Small</PFTypography>
    <PFTypography variant='subtitle1'>subtitle1</PFTypography>
    <PFTypography variant='subtitle2'>subtitle2</PFTypography>
    <PFTypography variant='body1'>body1 - Space Grotesk</PFTypography>
    <PFTypography variant='body2'>body2 - Space Grotesk</PFTypography>
    <PFTypography variant='caption'>caption</PFTypography>
    <PFTypography variant='overline'>overline</PFTypography>
  </div>
);

export const Colors = () => (
  <div className='flex flex-col gap-4 items-start'>
    <PFTypography variant='h1'>h1 - Default</PFTypography>
    <PFTypography variant='h2' color='#d0bcff'>
      h2 - Primary
    </PFTypography>
    <PFTypography variant='h3' color='#4edea3'>
      h3 - Secondary (Mint)
    </PFTypography>
    <PFTypography variant='h4' color='#D44040'>
      h4 - Error
    </PFTypography>
    <PFTypography variant='h5' color='#E8963A'>
      h5 - Warning
    </PFTypography>
    <PFTypography variant='h6' color='#C49A3C'>
      h6 - Info
    </PFTypography>
    <PFTypography variant='subtitle1' color='#6B8E3A'>
      subtitle1 - Success
    </PFTypography>
    <PFTypography variant='body1' color='#c4c3cf'>
      body1 - Text Secondary
    </PFTypography>
    <PFTypography variant='caption' color='#78767e'>
      caption - Disabled
    </PFTypography>
  </div>
);
