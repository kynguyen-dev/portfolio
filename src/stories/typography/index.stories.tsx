import { Stack, Typography } from '@mui/material';
import { Meta } from '@storybook/react';
import { PFTypography } from '@components/core';

const ThemeTypography = () => <Stack>Theme/Typography</Stack>;

export default {
  title: 'Theme/Typography',
  component: ThemeTypography,
} as Meta<typeof ThemeTypography>;

export const Variant = () => (
  <Stack spacing={2} alignItems={'start'}>
    <PFTypography variant='h1'>h1 - 18px 400 Raleway</PFTypography>
    <PFTypography variant='h2'>h2 - 16px 400 Raleway</PFTypography>
    <PFTypography variant='h3'>h3 - 14px 400 Raleway</PFTypography>
    <PFTypography variant='h4'>h4 - 12px 400 Raleway</PFTypography>
    <PFTypography variant='h5'>h5 - 12px 400 Open Sans</PFTypography>
    <PFTypography variant='h6'>h6 - 12px 700 Raleway</PFTypography>
    <PFTypography variant='subtitle1'>
      subtitle1 - 14px 700 Raleway
    </PFTypography>
    <PFTypography variant='subtitle2'>
      subtitle2 - 12px 700 Raleway
    </PFTypography>
    <PFTypography variant='body1'>body1 - 14px 400 Open Sans</PFTypography>
    <PFTypography variant='body2'>body2 - 12px 400 Raleway</PFTypography>
    <PFTypography variant='caption'>caption - 10px 400 Raleway</PFTypography>
  </Stack>
);

export const Colors = () => (
  <Stack spacing={2} alignItems={'start'}>
    <Typography variant='h1'>h1 - 18px 400 Roboto</Typography>
    <PFTypography variant='h2' color='primary.main'>
      h2 - 16px 400 Roboto
    </PFTypography>
    <PFTypography variant='h3' color='secondary.main'>
      h3 - 14px 400 Roboto
    </PFTypography>
    <PFTypography variant='h4' color='error.main'>
      h4 - 12px 400 Roboto
    </PFTypography>
    <PFTypography variant='h5' color='warning.main'>
      h5 - 12px 400 Roboto
    </PFTypography>
    <PFTypography variant='h6' color='info.main'>
      h6 - 12px 700 Roboto
    </PFTypography>
    <PFTypography variant='subtitle1' color='success.main'>
      subtitle1 - 14px 700 Roboto
    </PFTypography>
    <PFTypography variant='subtitle2' color='grey.800'>
      subtitle2 - 12px 700 Roboto
    </PFTypography>
    <PFTypography variant='body1' color='grey.700'>
      body1 - 14px 400 Roboto
    </PFTypography>
    <PFTypography variant='body2' color='grey.600'>
      body2 - 12px 400 Roboto
    </PFTypography>
    <PFTypography variant='caption' color='grey.500'>
      caption - 10px 400 Roboto
    </PFTypography>
  </Stack>
);
