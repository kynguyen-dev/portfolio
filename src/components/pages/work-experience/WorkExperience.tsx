import { Stack } from '@mui/material';
import { MyProject } from '../project/MyProject';

export const WorkExperience = () => {
  return (
    <Stack
      direction={'column'}
      gap={{ md: 8, xs: 2 }}
      sx={{ px: { md: '20%', xs: '24px' } }}
    >
      <Stack
        display='flex'
        justifyContent='center'
        alignItems='center'
        id={'projects'}
      >
        <MyProject />
      </Stack>
    </Stack>
  );
};
