import { PFTypography } from '@components/core';
import { Stack, useTheme } from '@mui/material';
import { common } from '@mui/material/colors';

export const MyProject = () => {
  const { palette } = useTheme();
  return (
    <Stack display={'flex'} alignItems={'center'} py={'128px'} gap={7}>
      <Stack display={'flex'} alignItems={'center'} gap={1}>
        <PFTypography variant='h3' color={palette.primary.main}>
          My Project
        </PFTypography>
        <PFTypography variant='body2' color={common.white}>
          I had the pleasure of working with these awesome projects
        </PFTypography>
      </Stack>
    </Stack>
  );
};
