import { Box, Grid, Stack, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Code, Terminal } from '@mui/icons-material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { GradientPaper } from '@components/customs/paper/GradientPaper.tsx';
import { PFGradientTypography, PFTypography } from '@components/core';
import { useTranslation } from 'react-i18next';
import {
  APP_PAGES,
  APP_SIZES,
  APP_TYPOGRAPHIES,
  APP_TYPOGRAPHIES_ANIMATION,
  CAREER_START_DATE,
} from '@constants';
import { ReactNode } from 'react';
import { staggerContainer, staggerItem } from '@utils/animations/scrollVariants';

const getYears = () =>
  Math.floor((Date.now() - CAREER_START_DATE.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

interface HighlightSkill {
  labelKey: string;
  items: string[];
}

interface SkillsDef {
  titleKey: string;
  icon: ReactNode;
  quoteKey: string;
  highlights: HighlightSkill[];
}

const skillDefs: SkillsDef[] = [
  {
    titleKey: 'profile.backEndDeveloper',
    icon: <Terminal fontSize={APP_SIZES.LARGE} sx={{ color: 'primary.light' }} />,
    quoteKey: 'profile.backEndQuote',
    highlights: [
      {
        labelKey: 'profile.enjoyCoding',
        items: ['Java', 'TypeScript'],
      },
      {
        labelKey: 'profile.devTech',
        items: [
          'Java 8', 'Spring Boot', 'NextJS', 'SQLite', 'NoSQL MongoDB',
          'PostgreSQL', 'Drizzle ORM', 'RESTful API', 'JUnit', 'Groovy', 'Java Android',
        ],
      },
    ],
  },
  {
    titleKey: 'profile.frontEndDeveloper',
    icon: <Code fontSize={APP_SIZES.LARGE} sx={{ color: 'primary.light' }} />,
    quoteKey: 'profile.frontEndQuote',
    highlights: [
      {
        labelKey: 'profile.languages',
        items: ['HTML', 'CSS', 'TypeScript'],
      },
      {
        labelKey: 'profile.devTech',
        items: [
          'ReactJS', 'Tailwind CSS', 'Material UI', 'TanStack Query', 'NextJS',
          'AngularJS', 'Vite', 'ESLint', 'Prettier', 'Storybook',
          'Jest', 'React Testing Library', 'React Hook Form', 'Auth0',
        ],
      },
    ],
  },
  {
    titleKey: 'profile.tools',
    icon: <ConstructionIcon fontSize={APP_SIZES.LARGE} sx={{ color: 'primary.light' }} />,
    quoteKey: 'profile.toolEndQuote',
    highlights: [
      {
        labelKey: 'profile.methods',
        items: ['Scrum/Agile'],
      },
      {
        labelKey: 'profile.toolsIUse',
        items: [
          'Visual Studio Code', 'WebStorm', 'IntelliJ IDE', 'Postman',
          'Docker Desktop', 'Git', 'GitHub/GitLab', 'Jira', 'Figma',
        ],
      },
    ],
  },
];

export const Profile = () => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const years = getYears();

  return (
    <Box
      component="section"
      id={APP_PAGES.PROFILE.toLowerCase()}
      aria-label={t('profile.heading')}
      sx={{
        textAlign: 'center',
        pt: 16,
        pb: 16,
        position: 'relative',
        color: palette.text.primary,
        px: { xs: 3, md: '20%' },
      }}
    >
      <Box>
        <PFTypography
          variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
          animations={[APP_TYPOGRAPHIES_ANIMATION.TYPEWRITER]}
          fontWeight='bold'
        >
          {t('profile.opening')}
        </PFTypography>
        <PFTypography
          variant={APP_TYPOGRAPHIES.BODY_SECONDARY}
          sx={{ mt: 2, mx: 'auto' }}
        >
          {t('profile.content', { years })}
        </PFTypography>
      </Box>

      <Grid
        container
        spacing={4}
        sx={{ mt: 8, alignItems: 'stretch' }}
        component={motion.div}
        variants={staggerContainer(0.2, 0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skillDefs.map((role) => (
          <Grid item xs={12} md={4} key={role.titleKey} sx={{ display: 'flex' }}>
            <motion.div
              variants={staggerItem}
              style={{ flex: 1 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
            >
              <GradientPaper
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Stack direction='column' gap={1} alignItems='center'>
                  {role.icon}
                  <PFGradientTypography
                    variant={APP_TYPOGRAPHIES.HEADER_SECONDARY}
                    fontWeight='bold'
                  >
                    {t(role.titleKey)}
                  </PFGradientTypography>
                  <PFTypography
                    variant={APP_TYPOGRAPHIES.BODY_SECONDARY}
                    animations={[APP_TYPOGRAPHIES_ANIMATION.TYPEWRITER]}
                    speed={50}
                    sx={{ mt: 1, color: `${palette.text.secondary} !important` }}
                  >
                    {t(role.quoteKey)}
                  </PFTypography>
                  <Box flexGrow={1} />
                  {role.highlights.map(highlight => (
                    <Box key={highlight.labelKey} sx={{ mt: 2 }}>
                      <PFGradientTypography
                        variant={APP_TYPOGRAPHIES.SUBTITLE_SECONDARY}
                        fontWeight='bold'
                        colors={[palette.primary.light, palette.primary.main, palette.secondary.main]}
                      >
                        {t(highlight.labelKey)}
                      </PFGradientTypography>
                      {highlight.items.map(item => (
                        <PFTypography
                          key={item}
                          variant={APP_TYPOGRAPHIES.BODY_SECONDARY}
                          sx={{ mt: 1, color: `${palette.text.primary} !important`, fontWeight: 700 }}
                        >
                          {item}
                        </PFTypography>
                      ))}
                    </Box>
                  ))}
                </Stack>
              </GradientPaper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
