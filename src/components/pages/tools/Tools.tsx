import { Stack, Box, useTheme } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { PFTypography, PFGradientTypography } from '@components/core';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '@constants/router';
import { glassCardSx } from '@utils/styles/glassCard';
import {
  staggerContainer,
  staggerItem,
} from '@utils/animations/scrollVariants';

interface ToolItem {
  emoji?: string;
  image?: string;
  titleKey: string;
  descriptionKey: string;
  route: string;
}

const TOOLS: ToolItem[] = [
  {
    emoji: '🌤️',
    titleKey: 'tools.items.weather.title',
    descriptionKey: 'tools.items.weather.description',
    route: ROUTES.TOOLS.WEATHER_ADVISOR,
  },
  {
    emoji: '🗄️',
    titleKey: 'tools.items.dbExplorer.title',
    descriptionKey: 'tools.items.dbExplorer.description',
    route: ROUTES.TOOLS.DB_EXPLORER,
  },
  {
    emoji: '🖼️',
    titleKey: 'tools.items.gallery.title',
    descriptionKey: 'tools.items.gallery.description',
    route: ROUTES.TOOLS.GALLERY,
  },
  {
    image: '/images/three-kingdoms/logo.jpg',
    titleKey: 'tools.items.threeKingdoms.title',
    descriptionKey: 'tools.items.threeKingdoms.description',
    route: ROUTES.TOOLS.THREE_KINGDOMS,
  },
];

export const Tools = () => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isLight = palette.mode === 'light';

  return (
    <Box
      component='section'
      id='tools'
      sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}
    >
      <Stack alignItems='center' spacing={2} sx={{ mb: { xs: 5, md: 7 } }}>
        <PFGradientTypography variant='h4' fontWeight={800}>
          {t('tools.heading')}
        </PFGradientTypography>
        <PFTypography
          variant='body1'
          sx={{
            color: palette.text.secondary,
            textAlign: 'center',
            maxWidth: 560,
          }}
        >
          {t('tools.subtitle')}
        </PFTypography>
      </Stack>

      {/* Tools grid with stagger animation */}
      <motion.div
        variants={staggerContainer(0.15, 0.1)}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.15 }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
            },
            gap: { xs: 2, md: 3 },
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          {TOOLS.map(tool => (
            <motion.div key={tool.route} variants={staggerItem}>
              <Box
                onClick={() => navigate({ to: tool.route })}
                role='link'
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate({ to: tool.route });
                  }
                }}
                sx={{
                  ...glassCardSx(isLight, { hoverLift: true }),
                  p: { xs: 3, md: 4 },
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:focus-visible': {
                    outline: `2px solid ${palette.primary.main}`,
                    outlineOffset: 2,
                  },
                }}
              >
                {/* Decorative gradient corner */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -40,
                    right: -40,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${palette.primary.main}15, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />

                <Stack spacing={2}>
                  {/* Icon */}
                  <Box sx={{ fontSize: '2.5rem', lineHeight: 1 }}>
                    {tool.image ? (
                      <Box
                        component='img'
                        src={tool.image}
                        alt=''
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      tool.emoji
                    )}
                  </Box>

                  {/* Title */}
                  <PFTypography
                    variant='h6'
                    sx={{
                      fontWeight: 700,
                      color: palette.text.primary,
                    }}
                  >
                    {t(tool.titleKey)}
                  </PFTypography>

                  {/* Description */}
                  <PFTypography
                    variant='body2'
                    sx={{
                      color: palette.text.secondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {t(tool.descriptionKey)}
                  </PFTypography>

                  {/* Arrow indicator */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: isLight ? '#B8891F' : '#F5D060',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      mt: 1,
                    }}
                  >
                    {t('tools.explore')} →
                  </Box>
                </Stack>
              </Box>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
};
