import { PFGradientTypography, PFTypography } from '@components/core';
import { Box, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { APP_THEMES, APP_TYPOGRAPHIES, APP_INFORMATION, CAREER_START_DATE } from '@constants';
import { staggerContainer, staggerItem, blurIn } from '@utils/animations/scrollVariants';

const getYears = () =>
  Math.floor((Date.now() - CAREER_START_DATE.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

export const AboutMe = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const years = getYears();

  return (
    <Box
      component="section"
      id="about"
      aria-label={t('about.heading')}
      sx={{ px: { xs: 3, md: '20%' }, py: 10 }}
    >
      <Stack
        direction="column"
        alignItems="center"
        gap={4}
      >
        <PFGradientTypography
          variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
          theme={APP_THEMES.DARK}
          fontWeight="bold"
        >
          {t('aboutMe.heading')}
        </PFGradientTypography>

        <Stack
          component={motion.div}
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          direction="column"
          gap={2.5}
          sx={{
            maxWidth: 720,
            textAlign: 'center',
          }}
        >
          <motion.div variants={staggerItem}>
            <PFTypography variant="body1" sx={{ color: palette.text.primary, lineHeight: 1.8 }}>
              {t('aboutMe.p1', { years })}
            </PFTypography>
          </motion.div>
          <motion.div variants={staggerItem}>
            <PFTypography variant="body1" sx={{ color: palette.text.primary, lineHeight: 1.8 }}>
              {t('aboutMe.p2')}
            </PFTypography>
          </motion.div>
          <motion.div variants={staggerItem}>
            <PFTypography variant="body1" sx={{ color: palette.text.primary, lineHeight: 1.8 }}>
              {t('aboutMe.p3')}
            </PFTypography>
          </motion.div>
          <motion.div variants={staggerItem}>
            <PFTypography variant="body1" sx={{ color: palette.text.primary, lineHeight: 1.8 }}>
              {t('aboutMe.p4')}
            </PFTypography>
          </motion.div>
          <motion.div variants={blurIn}>
            <Stack direction="row" gap={2} justifyContent="center" mt={1}>
            <Box
              component="a"
              href={APP_INFORMATION.GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: palette.primary.light,
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {t('aboutMe.github')}
            </Box>
            <Box
              component="a"
              href={APP_INFORMATION.LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: palette.primary.light,
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {t('aboutMe.linkedin')}
            </Box>
          </Stack>
          </motion.div>
        </Stack>
      </Stack>
    </Box>
  );
};
