import { PFAppBar } from '@components/core/header';
import { Intro } from '@components/pages/Intro/Intro';
import { AboutMe } from '@components/pages/about-me/AboutMe';
import { Contact } from '@components/pages/contacts/Contact';
import { CurriculumVitae } from '@components/pages/cv/CurriculumVitae';
import { MyProject } from '@components/pages/project/MyProject';
import { Skills } from '@components/pages/skills/Skills';
import { Container, Stack } from '@mui/material';

const Home = () => {
  return (
    <Stack paddingX='64px'>
      <PFAppBar />
      <Container maxWidth='lg'>
        <Intro />
        <CurriculumVitae />
        <AboutMe />
        <Skills />
      </Container>
      <MyProject />
      <Container maxWidth='lg'>
        <Contact />
      </Container>
    </Stack>
  );
};

export default Home;
