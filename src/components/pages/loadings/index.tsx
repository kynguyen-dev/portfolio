import { CircularProgress, Stack } from '@mui/material';

export const FullScreenLoading = () => (
  <Stack
    justifyContent={'center'}
    alignItems={'center'}
    width={'100%'}
    minHeight={'100vh'}
  >
    <CircularProgress />
  </Stack>
);
