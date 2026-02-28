import {Stack} from '@mui/material';
import {motion} from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PFGradientTypography } from '@components/core';
import { Contact } from '@components/pages/contacts/Contact.tsx';
import { TechStack } from '@components/pages/footer/TechStack.tsx';
import { APP_TYPOGRAPHIES } from '@constants';
import { fadeUp, blurIn } from '@utils/animations/scrollVariants';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <Stack
      component="footer"
      id='contact'
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      gap={7}
      sx={{
        position: 'relative',
        /* Smooth gradient overlay that blends with the sunrise bottom (peach/gold) */
        background: `linear-gradient(
          180deg,
          transparent 0%,
          rgba(0,0,0,0.06) 15%,
          rgba(0,0,0,0.15) 40%,
          rgba(11,13,46,0.35) 100%
        )`,
        backdropFilter: 'blur(2px)',
      }}
      px={3}
      pb={4}
    >
      {/* Centered Content */}
      <Stack
        component={motion.div}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        display='flex'
        alignItems='center'
        mt={10}
      >
        <PFGradientTypography
          variant={APP_TYPOGRAPHIES.HEADER_SECONDARY}
          textAlign={'center'}
        >
          {t('footer.quote')}
        </PFGradientTypography>
      </Stack>

      {/* Social Icons */}
      <motion.div
        variants={blurIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Contact />
      </motion.div>

      {/* Footer - Stays at the Bottom */}
      <TechStack />
    </Stack>
  );
};
