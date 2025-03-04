import { PFTypography } from '@components/core';
import { Stack } from '@mui/material';
import { common } from '@mui/material/colors';

export const AboutMe = () => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Stack direction={'column'} gap={'64px'}>
        <Stack gap={'16px'}>
          <PFTypography variant='body1' color={common.black}>
            My name is Ky Nguyen and I specialize in web developement that
            utilizes HTML, CSS, JS, and REACT etc.
          </PFTypography>
          <PFTypography variant='body1' color={common.black}>
            I am a highly motivated individual and eternal optimist dedicated to
            writing clear, concise, robust code that works. Striving to never
            stop learning and improving.
          </PFTypography>
          <PFTypography variant='body1' color={common.black}>
            When I'm not coding, I am writing bolgs, reading, or picking up some
            new hands-on art project like photography.
          </PFTypography>
          <PFTypography variant='body1' color={common.black}>
            I like to have my perspective and belief systems challenged so that
            I see the world through new eyes.
          </PFTypography>
        </Stack>
      </Stack>
    </Stack>
  );
};
