import {Stack, useTheme} from '@mui/material';
import { PFGradientTypography } from '@components/core';
import { Contact } from '@components/pages/contacts/Contact.tsx';
import { TechStack } from '@components/pages/footer/TechStack.tsx';
import { APP_TYPOGRAPHIES } from '@constants';

export const Footer = () => {
  const { palette } = useTheme()
  return (
    <Stack
      id='contact'
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      gap={7}
      bgcolor={palette.primary.main}
      px={3}
      pb={4}
    >
      {/* Centered Content */}
      <Stack display='flex' alignItems='center' mt={10}>
        <PFGradientTypography
          variant={APP_TYPOGRAPHIES.HEADER_SECONDARY}
          textAlign={'center'}
        >
          Living, learning, & improve one day at a time.
        </PFGradientTypography>
      </Stack>

      {/* Social Icons */}
      <Contact />

      {/* Footer - Stays at the Bottom */}
      <TechStack />
    </Stack>
  );
};
