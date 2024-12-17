import { CircularProgress, Stack } from '@mui/material';

export const FullScreenLoading = () => (
  <Stack
    justifyContent={'center'}
    alignItems={'center'}
    width={'100%'}
    height={'100%'}
  >
    <CircularProgress />
  </Stack>
);
