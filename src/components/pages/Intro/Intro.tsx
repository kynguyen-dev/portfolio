import { PFGradientTypography, PFTypography } from '@components/core';
import { Box, IconButton, Stack, useTheme } from '@mui/material';
import UsbIcon from '@mui/icons-material/Usb';

export const Intro = () => {
  const { palette } = useTheme();
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh' // Full height of the viewport
    >
      <Stack
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={1}
      >
        <PFGradientTypography variant='h3'>Trường Kỳ</PFGradientTypography>
        <PFGradientTypography variant='h3'>
          {"I'm a Software Developer"}
        </PFGradientTypography>
        <IconButton color='info'>
          <UsbIcon />
        </IconButton>
        <PFTypography variant='body1' color={palette.common.white}>
          Beware of bugs in the early code, even a small mistake may cause much
          headache later.
        </PFTypography>
      </Stack>
    </Box>
  );
};
