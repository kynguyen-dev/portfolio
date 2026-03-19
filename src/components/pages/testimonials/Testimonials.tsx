import { Box, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { useTranslation } from 'react-i18next';
import {
  PFGradientTypography,
  PFTypography,
} from '@components/core/typography';
import { APP_THEMES, APP_TYPOGRAPHIES } from '@constants';
import { glassCardSx } from '@utils/styles/glassCard';

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export const Testimonials = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';
  const items = t('testimonials.items', { returnObjects: true }) as Array<{
    quote: string;
    name: string;
    title: string;
    relationship: string;
  }>;

  return (
    <Box
      component='section'
      aria-label={t('testimonials.heading')}
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 6 },
        maxWidth: 1100,
        mx: 'auto',
      }}
    >
      <PFGradientTypography
        variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
        theme={APP_THEMES.DARK}
        fontWeight='bold'
        align='center'
        sx={{ mb: 1 }}
      >
        {t('testimonials.heading')}
      </PFGradientTypography>
      <PFTypography
        variant='body1'
        align='center'
        sx={{ color: palette.text.secondary, opacity: 0.7, mb: 6 }}
      >
        {t('testimonials.subtitle')}
      </PFTypography>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        alignItems='stretch'
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            initial='hidden'
            whileInView='visible'
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                ...glassCardSx(isLight, { hoverLift: false }),
                p: 4,
                position: 'relative',
              }}
            >
              <FormatQuoteIcon
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 16,
                  color: `${palette.primary.light}12`,
                  fontSize: 80,
                  transform: 'scaleX(-1)',
                  pointerEvents: 'none',
                }}
              />
              <PFTypography
                variant='body2'
                sx={{
                  color: palette.text.primary,
                  lineHeight: 1.8,
                  fontStyle: 'italic',
                  flex: 1,
                  opacity: 0.9,
                }}
              >
                &ldquo;{item.quote}&rdquo;
              </PFTypography>
              <Box
                sx={{
                  mt: 3,
                  pt: 2,
                  borderTop: `1px solid ${isLight ? 'rgba(184,137,31,0.1)' : 'rgba(245,208,96,0.1)'}`,
                }}
              >
                <PFTypography
                  variant='subtitle2'
                  sx={{ color: palette.primary.light, fontWeight: 700 }}
                >
                  {item.name}
                </PFTypography>
                <PFTypography
                  variant='caption'
                  sx={{ color: palette.text.secondary, opacity: 0.7 }}
                >
                  {item.relationship} · {item.title}
                </PFTypography>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
};
