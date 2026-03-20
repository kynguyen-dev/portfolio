import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Stack, Box, useTheme, useMediaQuery } from '@mui/material';
import { PFGradientTypography, PFTypography } from '@components/core';
import { Overlay, OverlayContent } from '@components/core/overlay';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTranslation } from 'react-i18next';
import {
  APP_INFORMATION,
  APP_THEMES,
  APP_TYPOGRAPHIES,
  DRIVALINK_URL,
  EPILEPSY_PROJECT_URL,
  LEARNER_DASHBOARD_URL,
} from '@constants';
import { StyledButton } from '@components/core/button';

/** Path to the 2×2 sprite sheet containing all project images */
const SPRITE_URL = '/images/projects-sprite.jpg';

/**
 * CSS background-position values for each quadrant of a 2×2 sprite sheet.
 * With `background-size: 200% 200%`, each position maps to one quarter.
 */
const SPRITE_POSITIONS = [
  '0% 0%', // top-left     → DrivaLink
  '100% 0%', // top-right    → Healthcare
  '0% 100%', // bottom-left  → Learner Dashboard
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
    url: '',
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
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        gap={1}
      >
        <PFTypography
          variant={APP_TYPOGRAPHIES.SUBTITLE_PRIMARY}
          color={theme.palette.common.black}
          textAlign={'center'}
        >
          {t('projects.recentWorkDescriptions')}{' '}
          <a
            href={APP_INFORMATION.EMAIL_TO}
            style={{
              textDecoration: 'none',
              fontWeight: 'bold',
              color: theme.palette.primary.main,
            }}
          >
            {t('projects.emailMe')}
          </a>
        </PFTypography>
      </Stack>
      <Grid container spacing={4}>
        {projectDefs.map((project, index) => {
          const title = t(project.titleKey);
          const description = t(project.descriptionKey);
          const role = t(project.roleKey);
          const contributions = t(project.contributionsKey, {
            returnObjects: true,
          }) as string[];

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
                  role='button'
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
                    height: { xs: '320px', sm: '380px', md: '480px' },
                    cursor: 'pointer',
                    outline: 'none',
                    transition:
                      'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
                    ...(!isTouchDevice && {
                      '&:hover, &:focus-visible': {
                        backgroundColor: theme.palette.primary.dark,
                        transform: 'translateY(-4px)',
                      },
                      '&:hover .project-image, &:focus-visible .project-image':
                        {
                          opacity: 0,
                        },
                      '&:hover .overlay, &:focus-visible .overlay': {
                        opacity: 1,
                      },
                      '&:hover .overlay-content, &:focus-visible .overlay-content':
                        {
                          opacity: 1,
                          transform: 'translateY(0)',
                        },
                      '&:hover .default-text, &:focus-visible .default-text': {
                        opacity: 0,
                      },
                    }),
                    ...(isTouchDevice &&
                      activeCard === title && {
                        backgroundColor: theme.palette.primary.dark,
                        '& .project-image': { opacity: 0 },
                        '& .overlay': { opacity: 1 },
                        '& .overlay-content': {
                          opacity: 1,
                          transform: 'translateY(0)',
                        },
                        '& .default-text': { opacity: 0 },
                      }),
                    '&:focus-visible': {
                      boxShadow: `0 0 0 3px ${theme.palette.primary.light}`,
                    },
                  }}
                >
                  {/* CSS Sprite image using background-image + background-position */}
                  <Box
                    className='project-image'
                    role='img'
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
                    className='default-text'
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      textAlign: 'center',
                      background:
                        'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                      padding: { xs: '24px 16px 12px', md: '32px 20px 16px' },
                      transition: 'opacity 0.3s ease-in-out',
                    }}
                  >
                    <PFTypography
                      variant={APP_TYPOGRAPHIES.HEADER_SECONDARY}
                      color={theme.palette.common.white}
                      fontWeight={'bold'}
                      fontSize={{ xs: '1.1rem', md: '1.5rem' }}
                      sx={{ textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)' }}
                    >
                      {title}
                    </PFTypography>
                    <PFTypography
                      variant='caption'
                      sx={{
                        color: 'rgba(255,255,255,0.85)',
                        letterSpacing: 1,
                        fontWeight: 600,
                        fontSize: { xs: '0.7rem', md: '0.75rem' },
                      }}
                    >
                      {role}
                    </PFTypography>
                  </Box>

                  <Overlay className={'overlay'}>
                    <OverlayContent
                      className='overlay-content'
                      sx={{ width: '100%', minHeight: 'min-content' }}
                    >
                      <Stack
                        direction={'column'}
                        gap={{ xs: 1, md: 2 }}
                        alignItems={'center'}
                        px={{ xs: 1, md: 3 }}
                        py={2}
                      >
                        <PFGradientTypography
                          variant={APP_TYPOGRAPHIES.HEADER_SECONDARY}
                          theme={APP_THEMES.LIGHT}
                          fontWeight='bold'
                          fontSize={{ xs: '1rem', md: '1.25rem' }}
                        >
                          {role}
                        </PFGradientTypography>
                        <PFTypography
                          color={theme.palette.common.white}
                          sx={{
                            fontSize: { xs: '0.8rem', md: '0.9rem' },
                            lineHeight: 1.6,
                            opacity: 0.95,
                            maxWidth: 450,
                          }}
                        >
                          {description}
                        </PFTypography>

                        {Array.isArray(contributions) &&
                          contributions.length > 0 && (
                            <Stack
                              gap={1}
                              sx={{
                                width: '100%',
                                maxWidth: 400,
                                my: { xs: 1, md: 2 },
                              }}
                            >
                              {contributions.slice(0, 3).map((c, ci) => (
                                <Stack
                                  key={ci}
                                  direction='row'
                                  alignItems='flex-start'
                                  gap={1.5}
                                >
                                  <Box
                                    sx={{
                                      width: 6,
                                      height: 6,
                                      borderRadius: '50%',
                                      background: theme.palette.secondary.light,
                                      mt: 0.8,
                                      flexShrink: 0,
                                    }}
                                  />
                                  <PFTypography
                                    sx={{
                                      color: 'rgba(255,255,255,0.9)',
                                      fontSize: {
                                        xs: '0.75rem',
                                        md: '0.85rem',
                                      },
                                      lineHeight: 1.5,
                                      textAlign: 'left',
                                    }}
                                  >
                                    {c}
                                  </PFTypography>
                                </Stack>
                              ))}
                            </Stack>
                          )}

                        <Stack
                          direction='row'
                          gap={2}
                          alignItems='center'
                          sx={{ mt: { xs: 1, md: 2 } }}
                        >
                          {project.url ? (
                            <StyledButton
                              variant='contained'
                              size='medium'
                              color='secondary'
                              sx={{
                                borderRadius: '30px',
                                px: { xs: 2, md: 4 },
                                fontSize: { xs: '0.75rem', md: '0.875rem' },
                              }}
                              onClick={e => {
                                e.stopPropagation();
                                window.open(
                                  project.url,
                                  '_blank',
                                  'noopener,noreferrer'
                                );
                              }}
                            >
                              {t('projects.visitWebSite')}
                            </StyledButton>
                          ) : (
                            <PFTypography
                              variant='body2'
                              color='rgba(255,255,255,0.7)'
                              fontStyle='italic'
                              sx={{
                                fontSize: { xs: '0.75rem', md: '0.875rem' },
                              }}
                            >
                              {t('projects.privateProject')}
                            </PFTypography>
                          )}
                          {project.githubUrl && (
                            <Box
                              component='a'
                              href={project.githubUrl}
                              target='_blank'
                              rel='noopener noreferrer'
                              onClick={e => e.stopPropagation()}
                              sx={{
                                color: theme.palette.common.white,
                                display: 'flex',
                                '&:hover': {
                                  color: theme.palette.secondary.light,
                                },
                              }}
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
