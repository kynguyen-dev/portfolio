import { PFTypography } from '@components/core';
import { Grid, IconButton, Stack, useTheme } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

export const CurriculumVitae = () => {
  const { palette } = useTheme();
  return (
    <Stack
      paddingY={'72px'}
      display={'flex'}
      alignItems={'center'}
      gap={'48px'}
    >
      <PFTypography variant='h1' color={palette.primary.light}>
        Developer
      </PFTypography>
      <Grid container spacing={4}>
        <Grid item xs={4} display={'flex'} justifyContent={'flex-end'}>
          <PFTypography variant='body1'>{'<React />'}</PFTypography>
        </Grid>
        <Grid item xs={4} display={'flex'} justifyContent={'flex-start'}>
          <Stack direction={'column'}>
            <PFTypography variant='body1' color={palette.primary.light}>
              {'<h1>'}
            </PFTypography>
            <br />
            <PFTypography
              paddingLeft={'24px'}
              variant='h3'
              color={palette.primary.light}
            >
              Hey I’m Ky Nguyen, Full-Stack Developer
            </PFTypography>
            <br />
            <PFTypography variant='body1' color={palette.primary.light}>
              {'</h1>'}
            </PFTypography>
            <br />
            <br />
            <br />
            <PFTypography variant='body1' color={palette.primary.light}>
              {'<p>'}
            </PFTypography>
            <br />
            <PFTypography
              paddingLeft={'24px'}
              variant='body1'
              color={palette.primary.light}
            >
              I help business grow by crafting amazing web experiences. If
              you’re looking for a developer that likes to get stuff done,
            </PFTypography>
            <br />
            <PFTypography variant='body1' color={palette.primary.light}>
              {'</p>'}
            </PFTypography>
            <br />

            <Stack direction={'row'} gap={'12px'}>
              <PFTypography
                paddingLeft={'24px'}
                variant='h3'
                color={palette.primary.light}
              >
                let’s talk
              </PFTypography>
              <IconButton
                size='large'
                aria-label='show 17 new notifications'
                color='primary'
              >
                <EmailIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={4} display={'flex'} justifyContent={'flex-start'}>
          <PFTypography variant='body1'>Truong Ky</PFTypography>
        </Grid>
      </Grid>
    </Stack>
  );
};
