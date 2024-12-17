import { PFCard, PFTypography } from '@components/core';
import { Stack, useTheme } from '@mui/material';
import { common } from '@mui/material/colors';

export const AboutMe = () => {
  const { palette } = useTheme();
  return (
    <Stack
      py={'128px'}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Stack direction={'column'} gap={'64px'}>
        <PFCard
          variant='elevation'
          sx={{
            width: '400px',
            borderRadius: '32px 0px 32px 0px',
            border: '4px solid',
            borderColor: palette.primary.light,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PFTypography variant='h2' color={common.white}>
            About Me
          </PFTypography>
        </PFCard>
        <PFCard
          variant='elevation'
          sx={{
            borderRadius: '64px 64px 64px 64px',
          }}
        >
          <Stack marginX={'64px'} marginY={'32px'} gap={'16px'}>
            <PFTypography variant='h4' color={palette.primary.light}>
              Hello!
            </PFTypography>
            <PFTypography variant='body1' color={common.white}>
              My name is Sinan and I specialize in web developement that
              utilizes HTML, CSS, JS, and REACT etc.
            </PFTypography>
            <PFTypography variant='body1' color={common.white}>
              I am a highly motivated individual and eternal optimist dedicated
              to writing clear, concise, robust code that works. Striving to
              never stop learning and improving.
            </PFTypography>
            <PFTypography variant='body1' color={common.white}>
              When I'm not coding, I am writing bolgs, reading, or picking up
              some new hands-on art project like photography.
            </PFTypography>
            <PFTypography variant='body1' color={common.white}>
              I like to have my perspective and belief systems challenged so
              that I see the world through new eyes.
            </PFTypography>
          </Stack>
        </PFCard>
      </Stack>
    </Stack>
  );
};
