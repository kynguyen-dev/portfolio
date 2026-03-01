import { Box, Chip, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTranslation } from 'react-i18next';
import { PFGradientTypography, PFTypography } from '@components/core/typography';
import { APP_THEMES, APP_TYPOGRAPHIES } from '@constants';
import { glassCardSx } from '@utils/styles/glassCard';

interface BlogPost {
  titleKey: string;
  summaryKey: string;
  url: string;
  tags: string[];
  date: string;
  minRead: number;
}

/**
 * Static blog post data — replace URLs with your actual articles.
 * Title/summary are plain strings (not i18n keys) so you can edit quickly.
 */
const posts: BlogPost[] = [
  {
    titleKey: 'Scaling React Apps with Feature-Based Architecture',
    summaryKey:
      'How I structure large React + TypeScript codebases using feature folders, barrel exports, and path aliases to keep things maintainable as the team grows.',
    url: 'https://dev.to/',
    tags: ['React', 'Architecture', 'TypeScript'],
    date: '2025-12',
    minRead: 6,
  },
  {
    titleKey: 'Taming API State with TanStack Query',
    summaryKey:
      'A practical guide to replacing manual useEffect data fetching with TanStack Query — caching, retries, optimistic updates, and real-world patterns.',
    url: 'https://dev.to/',
    tags: ['TanStack Query', 'React', 'Performance'],
    date: '2025-10',
    minRead: 8,
  },
  {
    titleKey: 'Building Accessible UIs with Material UI',
    summaryKey:
      'Lessons learned from shipping healthcare and education platforms — keyboard navigation, ARIA patterns, and color contrast strategies that actually work.',
    url: 'https://dev.to/',
    tags: ['Accessibility', 'Material UI', 'UX'],
    date: '2025-08',
    minRead: 5,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export const Blog = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';

  return (
    <Box
      component="section"
      aria-label={t('blog.heading')}
      sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 6 }, maxWidth: 1100, mx: 'auto' }}
    >
      <PFGradientTypography
        variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
        theme={APP_THEMES.DARK}
        fontWeight="bold"
        align="center"
        sx={{ mb: 1 }}
      >
        {t('blog.heading')}
      </PFGradientTypography>
      <PFTypography variant="body1" align="center" sx={{ color: palette.text.secondary, opacity: 0.7, mb: 6 }}>
        {t('blog.subtitle')}
      </PFTypography>

      <Stack spacing={3}>
        {posts.map((post, i) => (
          <Box
            key={i}
            component={motion.a}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            sx={{
              display: 'block',
              textDecoration: 'none',
              ...glassCardSx(isLight),
              p: { xs: 3, md: 4 },
              cursor: 'pointer',
              borderLeft: `3px solid ${palette.primary.light}`,
              '&:focus-visible': {
                outline: `2px solid ${palette.primary.light}`,
                outlineOffset: 2,
              },
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box flex={1}>
                <Stack direction="row" alignItems="center" gap={1} mb={1}>
                  <PFTypography
                    variant="h6"
                    sx={{ color: palette.text.primary, fontWeight: 700 }}
                  >
                    {post.titleKey}
                  </PFTypography>
                  <OpenInNewIcon sx={{ color: 'rgba(245,208,96,0.4)', fontSize: 18 }} />
                </Stack>
                <PFTypography
                  variant="body2"
                  sx={{ color: palette.text.secondary, opacity: 0.8, lineHeight: 1.7, mb: 2 }}
                >
                  {post.summaryKey}
                </PFTypography>
                <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center">
                  {post.tags.map(tag => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        background: `${palette.primary.light}18`,
                        border: `1px solid ${palette.primary.light}33`,
                        color: palette.primary.light,
                        fontWeight: 600,
                        fontSize: '0.7rem',
                      }}
                    />
                  ))}
                  <PFTypography
                    variant="caption"
                    sx={{ color: palette.text.secondary, opacity: 0.5, ml: 1 }}
                  >
                    {post.date} · {t('blog.minRead', { min: post.minRead })}
                  </PFTypography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
