import { Stack } from '@mui/material';
import { MyProject } from '../project/MyProject';
import { WorkTimeline } from './WorkTimeline';
import { APP_PAGES } from '@constants';

export const WorkExperience = () => {
  return (
    <Stack
      component="section"
      id={APP_PAGES.PROJECTS.toLowerCase()}
      aria-label="Work Experience & Projects"
      direction={'column'}
    >
      <WorkTimeline />
      <Stack
        direction="column"
        gap={{ md: 6, xs: 2 }}
        sx={{ px: { md: '20%', xs: 3 }, py: 10 }}
      >
        <Stack
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <MyProject />
        </Stack>
      </Stack>
    </Stack>
  );
};
