import { Box, Stack, useTheme } from '@mui/material';
import { motion, type Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PFGradientTypography, PFTypography } from '@components/core';
import { APP_THEMES, APP_TYPOGRAPHIES } from '@constants';
import { glassCardSx } from '@utils/styles/glassCard';

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
    company: 'Cymosoft',
    role: 'Full-Stack Developer',
    period: 'Sep 2024 — Jan 2025',
    description:
      'Developed a full-stack air conditioner rental service platform for the Japanese market, handling subscription management, booking flows, and service scheduling.',
    highlights: [
      'Built server-rendered pages and API routes with Next.js App Router & TypeScript',
      'Designed relational database schema and managed migrations with Drizzle ORM',
      'Implemented responsive, mobile-first UI with Tailwind CSS',
      'Delivered end-to-end features following Agile sprints in a cross-cultural team',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Drizzle ORM'],
  },
  {
    company: 'PTN Global',
    role: 'Full-Stack Developer',
    period: 'Mar 2024 — Dec 2024',
    description:
      'Built a dynamic learner dashboard for Australian educational institutions, providing 24/7 access to badges, cohort comparisons, and attendance tracking for learners, parents, teachers and administrators.',
    highlights: [
      'Developed interactive UI components with ReactJS and documented them in Storybook',
      'Implemented efficient server-state management with TanStack Query',
      'Built backend microservices with Java & Micronaut framework',
      'Collaborated closely with UX designers to deliver a responsive, accessible interface',
    ],
    technologies: [
      'ReactJS',
      'Java',
      'Micronaut',
      'TanStack Query',
      'Storybook',
    ],
  },
  {
    company: 'PTN Global',
    role: 'Front-End Developer',
    period: 'Feb 2023 — Mar 2024',
    description:
      'Developed a healthcare platform for an epilepsy research center, focused on managing clinical data, tracking patient conditions, and streamlining health report workflows.',
    highlights: [
      'Designed and built a reusable component library with Material UI for consistent UX',
      'Integrated secure authentication and authorization with Auth0',
      'Implemented complex form validation with React Hook Form + Yup schema',
      'Achieved 90%+ test coverage with Jest & React Testing Library',
    ],
    technologies: ['React', 'TypeScript', 'Auth0', 'Jest', 'Material UI'],
  },
  {
    company: 'PTN Global',
    role: 'Full-Stack Developer',
    period: 'Dec 2021 — Feb 2023',
    description:
      'Built and maintained a logistics and driver safety management system, combining fleet tracking, compliance workflows, and a mobile companion app for drivers.',
    highlights: [
      'Developed backend services with Java 8 & Spring Boot for fleet management APIs',
      'Built responsive admin dashboard with Angular for fleet operators',
      'Developed Android companion app for real-time driver safety monitoring',
      'Mentored 2 junior developers through code reviews & pair programming sessions',
    ],
    technologies: ['Java 8', 'Spring Boot', 'Angular', 'Android'],
  },
];

export const WorkTimeline = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';
  return (
    <Box
      component='section'
      id='experience'
      sx={{
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 12 },
        maxWidth: 1100,
        mx: 'auto',
      }}
    >
      <Stack alignItems='center' gap={6}>
        <PFGradientTypography
          variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
          theme={APP_THEMES.DARK}
          fontWeight='bold'
        >
          {t('workExperience.heading')}
        </PFGradientTypography>

        {/* Timeline */}
        <Stack
          direction='column'
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
              background: `linear-gradient(to bottom, ${palette.primary.light}00, ${palette.primary.light}, ${palette.primary.main}, ${palette.primary.main}, ${palette.secondary.main}, ${palette.secondary.main}00)`,
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
                transition: {
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              },
            };
            return (
              <Box
                key={entry.company}
                component={motion.div}
                variants={cardVariant}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                sx={{
                  display: 'flex',
                  justifyContent: {
                    xs: 'flex-start',
                    md: isLeft ? 'flex-end' : 'flex-start',
                  },
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
                    ...glassCardSx(isLight, {
                      blur: 10,
                      borderRadius: 2,
                      hoverLift: false,
                    }),
                    p: 3,
                    width: '100%',
                  }}
                >
                  <PFTypography
                    variant='caption'
                    sx={{
                      color: palette.primary.light,
                      fontWeight: 600,
                      letterSpacing: 1,
                    }}
                  >
                    {entry.period}
                  </PFTypography>
                  <PFTypography
                    variant='h6'
                    sx={{
                      color: palette.text.primary,
                      fontWeight: 700,
                      mt: 0.5,
                    }}
                  >
                    {entry.role}
                  </PFTypography>
                  <PFTypography
                    variant='subtitle2'
                    sx={{ color: palette.primary.main, fontWeight: 600 }}
                  >
                    {entry.company}
                  </PFTypography>
                  <PFTypography
                    variant='body2'
                    sx={{
                      color: palette.text.secondary,
                      mt: 1.5,
                      lineHeight: 1.7,
                      opacity: 0.85,
                    }}
                  >
                    {entry.description}
                  </PFTypography>
                  {entry.highlights.length > 0 && (
                    <Box
                      component='ul'
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
                          component='li'
                          variant='body2'
                          sx={{
                            color: palette.text.secondary,
                            lineHeight: 1.6,
                            opacity: 0.85,
                          }}
                        >
                          {h}
                        </PFTypography>
                      ))}
                    </Box>
                  )}
                  <Stack direction='row' flexWrap='wrap' gap={1} mt={2}>
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
