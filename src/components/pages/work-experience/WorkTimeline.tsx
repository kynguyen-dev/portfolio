import { Box, Stack, useTheme } from '@mui/material';
import { motion, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PFGradientTypography, PFTypography } from '@components/core';
import { APP_THEMES, APP_TYPOGRAPHIES } from '@constants';

interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

const workHistory: TimelineEntry[] = [
  {
    company: 'DrivaLink',
    role: 'Full-Stack Developer',
    period: 'Jan 2024 — Present',
    description:
      'Built and maintained an innovative logistics management system combining driver safety, truck maintenance, and fleet tracking into a unified platform.',
    highlights: [
      'Architected the frontend with React 18, TypeScript & TanStack Query, reducing API call overhead through intelligent caching',
      'Built real-time fleet tracking dashboard with live GPS data integration',
      'Implemented role-based access control and authentication with Auth0',
      'Mentored 2 junior developers through code reviews & pair programming sessions',
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'PostgreSQL', 'REST API', 'Auth0'],
  },
  {
    company: 'Epilepsy Research Center',
    role: 'Front-End Developer',
    period: 'Jun 2023 — Dec 2023',
    description:
      'Developed a web application for an epilepsy research center, focused on managing health reports, tracking patient conditions, and collecting clinical data.',
    highlights: [
      'Designed and built a reusable component library with Material UI for consistent UX across the platform',
      'Integrated RESTful APIs with TanStack Query for efficient data fetching and caching',
      'Implemented complex form validation with React Hook Form + Yup schema',
      'Achieved 90%+ test coverage with Jest & React Testing Library',
    ],
    technologies: ['React', 'TypeScript', 'Material UI', 'TanStack Query', 'Jest'],
  },
  {
    company: 'Edalex — Learner Dashboard',
    role: 'Full-Stack Developer',
    period: 'Jan 2023 — May 2023',
    description:
      'Built a dynamic learner dashboard providing 24/7 access to learning progress, badges, cohort comparisons, and attendance tracking for all stakeholders.',
    highlights: [
      'Developed full-stack features with Next.js, MongoDB & Auth0 integration',
      'Built interactive data visualizations for learner progress tracking',
      'Implemented SSR for improved SEO and 40% faster initial page load',
      'Collaborated closely with UX designers to create a responsive, accessible interface',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'MongoDB', 'Auth0'],
  },
  {
    company: 'AirConSub — Hire Service',
    role: 'Full-Stack Developer',
    period: 'Aug 2022 — Dec 2022',
    description:
      'Developed a full-stack web application for an air conditioner subscription service, handling booking flows, payments, and service scheduling.',
    highlights: [
      'Built end-to-end booking & payment flow with Stripe integration',
      'Designed relational database schema with SQLite + Drizzle ORM migrations',
      'Developed responsive UI with React and Next.js App Router',
      'Set up CI/CD pipeline for automated testing and deployment',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Drizzle ORM', 'SQLite', 'Stripe'],
  },
];

export const WorkTimeline = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';
  return (
    <Box
      component="section"
      id="experience"
      sx={{ px: { xs: 3, md: '20%' }, py: 10 }}
    >
      <Stack alignItems="center" gap={6}>
        <PFGradientTypography
          variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
          theme={APP_THEMES.DARK}
          fontWeight="bold"
        >
          {t('workExperience.heading')}
        </PFGradientTypography>

        {/* Timeline */}
        <Stack
          direction="column"
          sx={{ position: 'relative', width: '100%', maxWidth: 800 }}
        >
          {/* Vertical line */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 16, md: '50%' },
              transform: { md: 'translateX(-50%)' },
              top: 0,
              bottom: 0,
              width: 2,
              background: `linear-gradient(to bottom, ${palette.primary.light}00, ${palette.primary.light}, ${palette.primary.main}, ${palette.secondary.main}, ${palette.secondary.main}00)`,
            }}
          />

          {workHistory.map((entry, index) => {
            const isLeft = index % 2 === 0;
            const cardVariant: Variants = {
              hidden: { opacity: 0, x: isLeft ? -60 : 60, scale: 0.95 },
              visible: {
                opacity: 1,
                x: 0,
                scale: 1,
                transition: { duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
              },
            };
            return (
              <Box
                key={entry.company}
                component={motion.div}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'flex-start', md: isLeft ? 'flex-end' : 'flex-start' },
                  pl: { xs: 5, md: isLeft ? 0 : '52%' },
                  pr: { xs: 0, md: isLeft ? '52%' : 0 },
                  mb: 5,
                  position: 'relative',
                }}
              >
                {/* Dot on timeline */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: 11, md: '50%' },
                    transform: { md: 'translateX(-50%)' },
                    top: 8,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: palette.primary.light,
                    boxShadow: `0 0 12px ${palette.primary.light}80`,
                    zIndex: 1,
                  }}
                />

                {/* Card */}
                <Box
                  sx={{
                    background: isLight ? 'rgba(251,246,238,0.85)' : 'rgba(11, 13, 46, 0.6)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245, 208, 96, 0.2)'}`,
                    borderRadius: 2,
                    p: 3,
                    width: '100%',
                    transition: 'border-color 0.3s',
                    '&:hover': {
                      borderColor: isLight ? 'rgba(184,137,31,0.5)' : 'rgba(245, 208, 96, 0.5)',
                    },
                  }}
                >
                  <PFTypography
                    variant="caption"
                    sx={{ color: palette.primary.light, fontWeight: 600, letterSpacing: 1 }}
                  >
                    {entry.period}
                  </PFTypography>
                  <PFTypography
                    variant="h6"
                    sx={{ color: palette.text.primary, fontWeight: 700, mt: 0.5 }}
                  >
                    {entry.role}
                  </PFTypography>
                  <PFTypography
                    variant="subtitle2"
                    sx={{ color: palette.primary.main, fontWeight: 600 }}
                  >
                    {entry.company}
                  </PFTypography>
                  <PFTypography
                    variant="body2"
                    sx={{ color: palette.text.secondary, mt: 1.5, lineHeight: 1.7, opacity: 0.85 }}
                  >
                    {entry.description}
                  </PFTypography>
                  {entry.highlights.length > 0 && (
                    <Box
                      component="ul"
                      sx={{
                        mt: 1.5,
                        pl: 2,
                        listStyle: 'none',
                        '& li': {
                          position: 'relative',
                          pl: 2,
                          mb: 0.75,
                          '&::before': {
                            content: '"▸"',
                            position: 'absolute',
                            left: 0,
                            color: palette.primary.light,
                            fontWeight: 700,
                          },
                        },
                      }}
                    >
                      {entry.highlights.map((h, i) => (
                        <PFTypography
                          key={i}
                          component="li"
                          variant="body2"
                          sx={{ color: palette.text.secondary, lineHeight: 1.6, opacity: 0.85 }}
                        >
                          {h}
                        </PFTypography>
                      ))}
                    </Box>
                  )}
                  <Stack direction="row" flexWrap="wrap" gap={1} mt={2}>
                    {entry.technologies.map(tech => (
                      <Box
                        key={tech}
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: palette.primary.light,
                          background: `${palette.primary.light}18`,
                          border: `1px solid ${palette.primary.light}33`,
                        }}
                      >
                        {tech}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};
