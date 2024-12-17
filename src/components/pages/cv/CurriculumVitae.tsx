import { IconTypography, PFCard, PFTypography } from '@components/core';
import {
  Avatar,
  CardActions,
  CardContent,
  Grid,
  Stack,
  useTheme,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { HightLightCard } from '@components/customs';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { StyledButton } from '@components/core/button';

export const CurriculumVitae = () => {
  const { palette } = useTheme();
  return (
    <Stack
      display='flex'
      justifyContent='center'
      alignItems='center'
      height='100vh'
    >
      <Grid container gap={'48px'} flexWrap={'nowrap'}>
        <Grid item xs={6} display={'flex'} justifyContent={'center'}>
          <PFCard
            variant='elevation'
            sx={{
              width: '320px',
              height: '520px',
              borderRadius: '128px 0px 128px 0px',
              border: '4px solid',
              borderColor: palette.primary.dark,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CardContent>
              <Stack direction={'column'} gap={'16px'}>
                <Stack display={'flex'} alignItems={'center'}>
                  <Avatar
                    sx={{
                      height: '96px',
                      width: '96px',
                    }}
                    src='https://static-00.iconduck.com/assets.00/web-developer-illustration-1004x1024-wcqgbag3.png'
                  />
                </Stack>
                <Stack alignItems={'center'}>
                  <PFTypography variant='h5' colorVariant='common.white'>
                    Ky Nguyen
                  </PFTypography>
                  <PFTypography variant='body1' colorVariant='common.white'>
                    Software developer
                  </PFTypography>
                </Stack>

                <IconTypography
                  icon={<EmailIcon color='primary' />}
                  text={'kynt101099@gmail.com'}
                />
                <IconTypography
                  icon={<HomeIcon color='primary' />}
                  text={'Can Tho'}
                />
                <IconTypography
                  icon={<WorkIcon color='primary' />}
                  text={'Software developer'}
                />
                <IconTypography
                  icon={<SmartphoneIcon color='primary' />}
                  text={'+(84) 868 772 887'}
                />
              </Stack>
            </CardContent>
            <CardActions>
              <StyledButton size='large' endIcon={<DownloadIcon />}>
                Download
              </StyledButton>
            </CardActions>
          </PFCard>
        </Grid>
        <Grid
          item
          xs={4}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <HightLightCard />
        </Grid>
      </Grid>
    </Stack>
  );
};
