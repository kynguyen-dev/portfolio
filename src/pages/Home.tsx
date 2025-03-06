import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Stack } from "@mui/material";
import { Profile } from "@components/pages/profile/Profile.tsx";
import { Footer } from "@components/pages/footer/Footer.tsx";
import { WorkExperience } from "@components/pages/work-experience/WorkExperience.tsx";
import { Intro } from "@components/pages/Intro/Intro.tsx";
import {SpeedDialCustom} from "@components/customs/speed-dial";

const HomePage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <>
    <Stack ref={containerRef} direction={'column'}>
      {/* INTRO SECTION - No Opacity Effect */}
      <Intro />
      {/* PROFILE SECTION - With Opacity Effect */}
      <Stack direction={'column'} gap={8}>
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.2, 0.4], [0, 1]),
          }}
        >
          <Profile />
        </motion.div>
        {/* WORK EXPERIENCE SECTION - With Opacity & Scale Effect */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]),
            scale: useTransform(scrollYProgress, [0.4, 0.6], [0.8, 1]),
          }}
        >
          <WorkExperience />
        </motion.div>
        {/* FOOTER SECTION - No Opacity Effect */}
        <Footer />
      </Stack>
    </Stack>
      <SpeedDialCustom />
    </>
  );
};

export default HomePage;
