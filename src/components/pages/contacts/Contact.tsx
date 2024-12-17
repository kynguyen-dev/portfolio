import { PFTypography } from '@components/core';
import { ContactIconButton } from '@components/customs/icon-button/ContactIconButton';
import { Stack, useTheme } from '@mui/material';
import { common } from '@mui/material/colors';

export const Contact = () => {
  const { palette } = useTheme();
  return (
    <Stack display={'flex'} alignItems={'center'} py={'128px'} gap={7}>
      <Stack display={'flex'} alignItems={'center'}>
        <PFTypography variant='h3' color={palette.primary.main}>
          Contact
        </PFTypography>
        <PFTypography variant='body2' color={common.white}>
          I’m currently available for freelance work
        </PFTypography>
      </Stack>
      <Stack gap={20} direction={'row'}>
        <ContactIconButton
          imageUrl={
            'https://i.pinimg.com/originals/ce/5c/ee/ce5cee4b4eab5058e858cbf8b65c39a4.png'
          }
          title={'Discord'}
        />

        <ContactIconButton
          imageUrl={
            'https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png'
          }
          title={'LinkIn'}
        />

        <ContactIconButton
          imageUrl={
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Github-desktop-logo-symbol.svg/2048px-Github-desktop-logo-symbol.svg.png'
          }
          title={'Github'}
        />
      </Stack>
    </Stack>
  );
};
