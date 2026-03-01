import { Box, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import { useTranslation } from 'react-i18next';
import { PFGradientTypography, PFTypography } from '@components/core';
import { APP_THEMES, APP_TYPOGRAPHIES } from '@constants';
import { slideInLeft } from '@utils/animations/scrollVariants';
import { glassCardSx } from '@utils/styles/glassCard';

export const Education = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';

  const educationData = [
    {
      institution: 'FPT University',
      degree: t('education.degree'),
      period: t('education.period'),
      details: [
        t('education.major'),
        t('education.coursework'),
        t('education.languages'),
      ],
    },
  ];
  return (
    <Box
      component="section"
      id="education"
      aria-label={t('education.heading')}
      sx={{ px: { xs: 2, md: 6 }, py: { xs: 8, md: 12 }, maxWidth: 1100, mx: 'auto' }}
    >
      <Stack alignItems="center" gap={5}>
        <PFGradientTypography
          variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
          theme={APP_THEMES.DARK}
          fontWeight="bold"
        >
          {t('education.heading')}
        </PFGradientTypography>

        {educationData.map((edu) => (
          <Box
            key={edu.institution}
            component={motion.div}
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.25 } }}
            sx={{
              width: '100%',
              maxWidth: 700,
              ...glassCardSx(isLight, { blur: 10 }),
              p: 4,
            }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} gap={2} mb={2} flexWrap='wrap'>
              <SchoolIcon sx={{ color: palette.primary.light, fontSize: 36 }} />
              <Stack flex={1}>
                <PFTypography
                  variant="h6"
                  sx={{ color: palette.text.primary, fontWeight: 700 }}
                >
                  {edu.degree}
                </PFTypography>
                <PFTypography
                  variant="subtitle2"
                  sx={{ color: palette.primary.main, fontWeight: 600 }}
                >
                  {edu.institution}
                </PFTypography>
              </Stack>
              <PFTypography
                variant="caption"
                sx={{ color: palette.primary.light, fontWeight: 600, letterSpacing: 1 }}
              >
                {edu.period}
              </PFTypography>
            </Stack>

            <Stack gap={1} ml={0.5}>
              {edu.details.map(detail => (
                <Stack key={detail} direction="row" alignItems="flex-start" gap={1.5}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: palette.primary.light,
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  <PFTypography
                    variant="body2"
                    sx={{ color: palette.text.secondary, lineHeight: 1.7, opacity: 0.9 }}
                  >
                    {detail}
                  </PFTypography>
                </Stack>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
