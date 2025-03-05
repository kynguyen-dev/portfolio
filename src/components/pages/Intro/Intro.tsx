import {motion} from 'framer-motion';
import {Avatar, Box, Stack, useTheme} from '@mui/material';
import {PFGradientTypography, PFTypography} from '@components/core';
import {APP_MESSAGES} from "@utils/core/messages";
import {APP_PAGES, APP_THEMES, APP_TYPOGRAPHIES, APP_TYPOGRAPHIES_ANIMATION} from "@constants";

export const Intro = () => {
  const { palette } = useTheme();
  const floatAnimation = {
    y: [0, -5, 0],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  };

  const hoverEffect = {
    scale: 1.1,
    y: -10,
    transition: { duration: 0.3 },
  };

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      id={APP_PAGES.HOME}
      sx={{ px: { xs: 3, md: 0 }, pt: { xs: 20, md: 20 } }}
    >
      <Stack
        alignItems='center'
        justifyContent='center'
        gap={4}
        textAlign={{ xs: 'center', md: 'left' }}
      >
        <PFGradientTypography variant={APP_TYPOGRAPHIES.HEADER_PRIMARY} theme={APP_THEMES.DARK} fontWeight='bold'
                              animations={[APP_TYPOGRAPHIES_ANIMATION.TYPEWRITER, APP_TYPOGRAPHIES_ANIMATION.OUTlINE_TO_SOLID]}>
          {APP_MESSAGES.intro.title}
        </PFGradientTypography>
        <PFTypography variant={APP_TYPOGRAPHIES.SUBTITLE_PRIMARY} color={palette.text.disabled}>
          {APP_MESSAGES.intro.description}
        </PFTypography>
        <motion.div animate={floatAnimation} whileHover={hoverEffect}>
          <Avatar
            src='/images/avatar.png'
            alt='Avatar'
            sx={{
              width: { md: 180, xs: 120 },
              height: { md: 180, xs: 120 },
              boxShadow: 3,
              bgcolor: palette.primary.main,
            }}
          />
        </motion.div>
        <Box
          component={motion.img}
          src='/images/home.svg'
          alt='Avatar'
          height='auto'
          width={{ xs: '100%', md: '800px' }}
          whileHover={{ scale: 1.1, opacity: 0.8, y: -18 }}
          pt={6}
        />
      </Stack>
    </Box>
  );
};
