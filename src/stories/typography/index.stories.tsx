import { PFTypography } from '@components/core/typography';
import { Stack, Typography } from '@mui/material';
import { Meta } from '@storybook/react';

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
    <PFTypography variant='h2' colorVariant='primary.main'>
      h2 - 16px 400 Roboto
    </PFTypography>
    <PFTypography variant='h3' colorVariant='secondary.main'>
      h3 - 14px 400 Roboto
    </PFTypography>
    <PFTypography variant='h4' colorVariant='error.main'>
      h4 - 12px 400 Roboto
    </PFTypography>
    <PFTypography variant='h5' colorVariant='warning.main'>
      h5 - 12px 400 Roboto
    </PFTypography>
    <PFTypography variant='h6' colorVariant='info.main'>
      h6 - 12px 700 Roboto
    </PFTypography>
    <PFTypography variant='subtitle1' colorVariant='success.main'>
      subtitle1 - 14px 700 Roboto
    </PFTypography>
    <PFTypography variant='subtitle2' colorVariant='grey.800'>
      subtitle2 - 12px 700 Roboto
    </PFTypography>
    <PFTypography variant='body1' colorVariant='grey.700'>
      body1 - 14px 400 Roboto
    </PFTypography>
    <PFTypography variant='body2' colorVariant='grey.600'>
      body2 - 12px 400 Roboto
    </PFTypography>
    <PFTypography variant='caption' colorVariant='grey.500'>
      caption - 10px 400 Roboto
    </PFTypography>
  </Stack>
);
