import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Stack, Box, useTheme, useMediaQuery } from '@mui/material';
import { PFGradientTypography, PFTypography} from '@components/core';
import { Overlay, OverlayContent } from '@components/core/overlay';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTranslation } from 'react-i18next';
import {
  APP_INFORMATION,
  APP_THEMES,
  APP_TYPOGRAPHIES, DRIVALINK_URL,
  EPILEPSY_PROJECT_URL,
  LEARNER_DASHBOARD_URL,
} from '@constants';
import {StyledButton} from "@components/core/button";

/** Path to the 2×2 sprite sheet containing all project images */
const SPRITE_URL = '/images/projects-sprite.jpg';

/**
 * CSS background-position values for each quadrant of a 2×2 sprite sheet.
 * With `background-size: 200% 200%`, each position maps to one quarter.
 */
const SPRITE_POSITIONS = [
  '0% 0%',     // top-left     → DrivaLink
  '100% 0%',   // top-right    → Healthcare
  '0% 100%',   // bottom-left  → Learner Dashboard
  '100% 100%', // bottom-right → AirConSub
] as const;

interface ProjectCardProps {
  titleKey: string;
  descriptionKey: string;
  roleKey: string;
  contributionsKey: string;
  spritePosition: string;
  url: string;
  githubUrl?: string;
  isPrivate?: boolean;
}

const projectDefs: ProjectCardProps[] = [
  {
    titleKey: 'projects.logistic.title',
    descriptionKey: 'projects.logistic.description',
    roleKey: 'projects.fullStackDeveloper',
    contributionsKey: 'projects.logistic.contributions',
    spritePosition: SPRITE_POSITIONS[0],
    url: DRIVALINK_URL,
  },
  {
    titleKey: 'projects.medical.title',
    descriptionKey: 'projects.medical.description',
    roleKey: 'projects.frontEndDeveloper',
    contributionsKey: 'projects.medical.contributions',
    spritePosition: SPRITE_POSITIONS[1],
    url: EPILEPSY_PROJECT_URL,
  },
  {
    titleKey: 'projects.education.title',
    descriptionKey: 'projects.education.description',
    roleKey: 'projects.fullStackDeveloper',
    contributionsKey: 'projects.education.contributions',
    spritePosition: SPRITE_POSITIONS[2],
    url: LEARNER_DASHBOARD_URL,
  },
  {
    titleKey: 'projects.hireService.title',
    descriptionKey: 'projects.hireService.description',
    roleKey: 'projects.fullStackDeveloper',
    contributionsKey: 'projects.hireService.contributions',
    spritePosition: SPRITE_POSITIONS[3],
    url: "",
    isPrivate: true,
  },
];

export const MyProject = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isTouchDevice = useMediaQuery('(hover: none)');
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const toggleCard = (title: string) => {
    setActiveCard(prev => (prev === title ? null : title));
  };

  return (
    <Stack
      width={'100%'}
      display={'flex'}
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={{ md: 8, xs: 3 }}
    >
      <PFGradientTypography
        variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
        theme={APP_THEMES.DARK}
      >
        {t('projects.recentWork')}
      </PFGradientTypography>
      <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
        <PFTypography
          variant={APP_TYPOGRAPHIES.SUBTITLE_PRIMARY}
          color={theme.palette.common.black}
          textAlign={'center'}
        >
          {t('projects.recentWorkDescriptions')}{' '}
          <a href={APP_INFORMATION.EMAIL_TO} style={{ textDecoration: 'none', fontWeight: 'bold', color: theme.palette.primary.main }}>
            {t('projects.emailMe')}
          </a>
        </PFTypography>
      </Stack>
      <Grid container spacing={4}>
        {projectDefs.map((project, index) => {
          const title = t(project.titleKey);
          const description = t(project.descriptionKey);
          const role = t(project.roleKey);
          const contributions = t(project.contributionsKey, { returnObjects: true }) as string[];

          return (
          <Grid item xs={12} sm={6} key={project.titleKey}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              style={{ flex: 1 }}
            >
              <Box
                component={motion.div}
                tabIndex={0}
                role="button"
                aria-expanded={activeCard === title}
                aria-label={t('projects.viewDetails', { title })}
                onClick={() => isTouchDevice && toggleCard(title)}
                onFocus={() => !isTouchDevice && setActiveCard(title)}
                onBlur={() => !isTouchDevice && setActiveCard(null)}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCard(title);
                  }
                }}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: theme.shape.borderRadius,
                  width: '100%',
                  height: { xs: '280px', sm: '360px', md: '480px' },
                  aspectRatio: '16/9',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background-color 0.3s ease-in-out',
                  ...(!isTouchDevice && {
                    '&:hover, &:focus-visible': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                    '&:hover .project-image, &:focus-visible .project-image': {
                      opacity: 0,
                    },
                    '&:hover .overlay, &:focus-visible .overlay': {
                      opacity: 1,
                    },
                    '&:hover .overlay-content, &:focus-visible .overlay-content': {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                    '&:hover .default-text, &:focus-visible .default-text': {
                      opacity: 0,
                    },
                  }),
                  ...(isTouchDevice && activeCard === title && {
                    backgroundColor: theme.palette.primary.dark,
                    '& .project-image': { opacity: 0 },
                    '& .overlay': { opacity: 1 },
                    '& .overlay-content': { opacity: 1, transform: 'translateY(0)' },
                    '& .default-text': { opacity: 0 },
                  }),
                  '&:focus-visible': {
                    boxShadow: `0 0 0 3px ${theme.palette.primary.light}`,
                  },
                }}
              >
                {/* CSS Sprite image using background-image + background-position */}
                <Box
                  className="project-image"
                  role="img"
                  aria-label={title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundImage: `url('${SPRITE_URL}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '200% 200%',
                    backgroundPosition: project.spritePosition,
                    backgroundColor: 'transparent',
                    transition: 'opacity 0.3s ease-in-out',
                  }}
                />
                <Box
                  className="default-text"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)',
                    padding: '32px 20px 16px',
                    transition: 'opacity 0.3s ease-in-out',
                  }}
                >
                  <PFTypography
                    variant={APP_TYPOGRAPHIES.HEADER_SECONDARY}
                    color={theme.palette.common.white}
                    fontWeight={'bold'}
                    fontSize={{ xs: '1rem', md: '1.5rem' }}
                    sx={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)' }}
                  >
                    {title}
                  </PFTypography>
                  <PFTypography
                    variant="caption"
                    sx={{ color: 'rgba(255,255,255,0.7)', letterSpacing: 1, fontWeight: 500 }}
                  >
                    {role}
                  </PFTypography>
                </Box>

                <Overlay className={'overlay'}>
                  <OverlayContent className="overlay-content">
                    <Stack direction={'column'} gap={1.5} alignItems={'center'} px={2}>
                      <PFGradientTypography variant={APP_TYPOGRAPHIES.HEADER_SECONDARY} theme={APP_THEMES.LIGHT}>
                        {role}
                      </PFGradientTypography>
                      <PFTypography color={theme.palette.text.primary} sx={{ typography: { xs: APP_TYPOGRAPHIES.CAPTION, md: APP_TYPOGRAPHIES.BODY_SECONDARY }}}>
                        {description}
                      </PFTypography>

                      {Array.isArray(contributions) && contributions.length > 0 && (
                        <Stack gap={0.5} sx={{ width: '100%', maxWidth: 400 }}>
                          {contributions.slice(0, 3).map((c, ci) => (
                            <Stack key={ci} direction="row" alignItems="flex-start" gap={1}>
                              <Box sx={{ width: 5, height: 5, borderRadius: '50%', background: theme.palette.primary.light, mt: 0.8, flexShrink: 0 }} />
                              <PFTypography sx={{ color: theme.palette.text.secondary, opacity: 0.9, fontSize: { xs: '0.65rem', md: '0.8rem' }, lineHeight: 1.5 }}>
                                {c}
                              </PFTypography>
                            </Stack>
                          ))}
                        </Stack>
                      )}

                      <Stack direction="row" gap={2} alignItems="center">
                        {project.url ? (
                          <StyledButton variant="outlined" size="large" onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}>
                            {t('projects.visitWebSite')}
                          </StyledButton>
                        ) : (
                          <PFTypography variant="body2" color={theme.palette.text.secondary} fontStyle="italic">
                            {t('projects.privateProject')}
                          </PFTypography>
                        )}
                        {project.githubUrl && (
                          <Box
                            component="a"
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ color: theme.palette.text.primary, display: 'flex', '&:hover': { color: theme.palette.primary.light } }}
                            aria-label={`View ${title} on GitHub`}
                          >
                            <GitHubIcon />
                          </Box>
                        )}
                      </Stack>
                    </Stack>
                  </OverlayContent>
                </Overlay>
              </Box>
            </motion.div>
          </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};
