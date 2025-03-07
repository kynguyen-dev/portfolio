import { useRef } from "react";
import { Stack } from "@mui/material";
import { Profile } from "@components/pages/profile/Profile.tsx";
import { Footer } from "@components/pages/footer/Footer.tsx";
import { WorkExperience } from "@components/pages/work-experience/WorkExperience.tsx";
import { Intro } from "@components/pages/Intro/Intro.tsx";
import { SpeedDialCustom } from "@components/customs/speed-dial";

const HomePage = () => {
  const containerRef = useRef(null);

  return (
    <>
      <Stack ref={containerRef} direction={'column'}>
        <Intro />
        <Stack direction={'column'} gap={8}>
          <Profile />
          <WorkExperience />
          <Footer />
        </Stack>
      </Stack>
      <SpeedDialCustom />
    </>
  );
};

export default HomePage;
