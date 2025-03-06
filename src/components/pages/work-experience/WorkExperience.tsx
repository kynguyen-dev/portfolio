import { Stack } from '@mui/material';
import { MyProject } from '../project/MyProject';
import { APP_PAGES } from '@constants';

export const WorkExperience = () => {
  return (
    <Stack
      id={APP_PAGES.PROJECTS.toLowerCase()}
      direction={'column'}
      gap={{ md: 6, xs: 2 }}
      sx={{ px: { md: '20%', xs: 3 } }}
    >
      <Stack
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <MyProject />
      </Stack>
    </Stack>
  );
};
