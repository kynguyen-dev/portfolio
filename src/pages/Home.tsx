import { PFAppBar } from '@components/core/header';
import { CurriculumVitae } from '@components/pages/cv';
import { Divider, Stack, useTheme } from '@mui/material';

const Home = () => {
  const { palette } = useTheme();
  return (
    <Stack paddingX='64px'>
      <PFAppBar />
      <Divider sx={{ backgroundColor: palette.common.white }} />
      <CurriculumVitae />
    </Stack>
  );
};

export default Home;
