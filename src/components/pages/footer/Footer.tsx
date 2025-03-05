import { Stack } from '@mui/material';
import { PFGradientTypography } from '@components/core';
import { Contact } from '@components/pages/contacts/Contact.tsx';
import { TechStack } from '@components/pages/footer/TechStack.tsx';
import { APP_TYPOGRAPHIES } from '@constants';

export const Footer = () => {
  return (
    <Stack
      id='contact'
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      height='30vh'
      gap={7}
      bgcolor='#68B8D7'
      px={3}
      pb={5}
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
