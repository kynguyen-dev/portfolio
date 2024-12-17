import { PFCard, PFGradientTypography, PFTypography } from '@components/core';
import { Stack } from '@mui/material';

export const HightLightCard = () => {
  return (
    <PFCard
      variant='elevation'
      sx={{
        width: '215px',
        height: '378px',
        borderRadius: '56px 48px 56px 48px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Stack
        direction={'column'}
        gap={'48px'}
        display={'flex'}
        alignItems={'center'}
        padding={'32px'}
      >
        <Stack
          direction={'row'}
          gap={'8px'}
          display={'flex'}
          alignItems={'center'}
        >
          <PFGradientTypography variant='h3'>2</PFGradientTypography>
          <PFTypography variant='body1' colorVariant='common.white'>
            Programming Language
          </PFTypography>
        </Stack>

        <Stack
          direction={'row'}
          gap={'8px'}
          display={'flex'}
          alignItems={'center'}
        >
          <PFGradientTypography variant='h3'>4</PFGradientTypography>
          <PFTypography variant='body1' colorVariant='common.white'>
            Development Tools
          </PFTypography>
        </Stack>

        <Stack
          direction={'row'}
          gap={'8px'}
          display={'flex'}
          alignItems={'center'}
        >
          <PFGradientTypography variant='h3'>3</PFGradientTypography>
          <PFTypography variant='body1' colorVariant='common.white'>
            Year of Experience
          </PFTypography>
        </Stack>
      </Stack>
    </PFCard>
  );
};
