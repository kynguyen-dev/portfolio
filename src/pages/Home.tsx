import { Stack } from '@mui/material';
import { PFAppBar } from '@components/core/header';
import { Intro } from '@components/pages/Intro/Intro';
import { Profile } from '@components/pages/profile/Profile.tsx';
import { WorkExperience } from '@components/pages/work-experience/WorkExperience';
import { Footer } from '@components/pages/footer/Footer.tsx';

const Home = () => {
  return (
    <>
      <Stack sx={{ paddingX: '20%' }}>
        <PFAppBar />
      </Stack>
      <Intro />
      <Stack direction={'column'} gap={{ md: 10, xs: 4 }}>
        <Profile />
        <WorkExperience />
        <Footer />
      </Stack>
    </>
  );
};

export default Home;
