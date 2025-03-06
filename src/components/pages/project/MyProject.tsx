import { motion } from 'framer-motion';
import { Grid, Stack, Box, useTheme } from '@mui/material';
import { PFGradientTypography, PFTypography} from '@components/core';
import { Overlay, OverlayContent } from '@components/core/overlay';
import {
  APP_THEMES,
  APP_TYPOGRAPHIES, DRIVALINK_URL,
  EDUCATION_PROJECT_IMAGE_URLS, EPILEPSY_PROJECT_URL,
  HIRE_SERVICE_PROJECT_IMAGE_URLS, LEARNER_DASHBOARD_URL,
  LOGISTIC_PROJECT_IMAGE_URLS,
  MEDICAL_PROJECT_IMAGE_URLS,
} from '@constants';
import { APP_MESSAGES } from '@utils/core/messages';
import {StyledButton} from "@components/core/button";

interface ProjectCardProps {
  title: string;
  description: string;
  role: string;
  imageUrl: string;
  url: string;
}

const projects: ProjectCardProps[] = [
  {
    title: APP_MESSAGES.projects.logistic.title,
    description: APP_MESSAGES.projects.logistic.description,
    role: APP_MESSAGES.projects.fullStackDeveloper,
    imageUrl: LOGISTIC_PROJECT_IMAGE_URLS,
    url: DRIVALINK_URL,
  },
  {
    title: APP_MESSAGES.projects.medical.title,
    description: APP_MESSAGES.projects.medical.description,
    role: APP_MESSAGES.projects.fontEndDeveloper,
    imageUrl: MEDICAL_PROJECT_IMAGE_URLS,
    url: EPILEPSY_PROJECT_URL,
  },
  {
    title: APP_MESSAGES.projects.education.title,
    description: APP_MESSAGES.projects.education.description,
    role: APP_MESSAGES.projects.fullStackDeveloper,
    imageUrl: EDUCATION_PROJECT_IMAGE_URLS,
    url: LEARNER_DASHBOARD_URL,
  },
  {
    title: APP_MESSAGES.projects.hireService.title,
    description: APP_MESSAGES.projects.hireService.description,
    role: APP_MESSAGES.projects.fullStackDeveloper,
    imageUrl: HIRE_SERVICE_PROJECT_IMAGE_URLS,
    url: "",
  },
];

export const MyProject = () => {
  const theme = useTheme();
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
        {APP_MESSAGES.projects.recentWork}
      </PFGradientTypography>
      <PFTypography
        variant={APP_TYPOGRAPHIES.SUBTITLE_PRIMARY}
        color={theme.palette.common.black}
        textAlign={'center'}
      >
        {APP_MESSAGES.projects.recentWorkDescriptions}
      </PFTypography>
      <Grid container spacing={4}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              style={{ flex: 1 }}
            >
              <Box
                component={motion.div}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: theme.shape.borderRadius,
                  width: '100%',
                  height: { xs: '280px', sm: '360px', md: '480px' },
                  aspectRatio: '16/9',
                  transition: 'background-color 0.3s ease-in-out',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    opacity: 0.8
                  },
                  '&:hover .project-image': {
                    opacity: 0,
                  },
                  '&:hover .overlay-content': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                  '&:hover .default-text': {
                    opacity: 0,
                  },
                }}
              >
                {/* Image */}
                <img
                  className="project-image"
                  src={project.imageUrl}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    transition: 'opacity 0.3s ease-in-out',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
                <Box
                  className="default-text"
                  sx={{
                    position: 'absolute',
                    top: '90%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(5px)',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    opacity: 1,
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
                    {project.title}
                  </PFTypography>
                </Box>

                {/* Overlay Content */}
                <Overlay className={'overlay'}>
                  <OverlayContent className="overlay-content">
                    <Stack direction={'column'} gap={2} justifyItems={'center'} px={2}>
                      <PFGradientTypography variant={APP_TYPOGRAPHIES.HEADER_SECONDARY} theme={APP_THEMES.LIGHT}>
                        {project.role}
                      </PFGradientTypography>
                      <PFTypography color={theme.palette.text.primary} sx={{ typography: { xs: APP_TYPOGRAPHIES.CAPTION, md: APP_TYPOGRAPHIES.BODY_SECONDARY }}}>
                        {project.description}
                      </PFTypography>
                      <Box display="flex" justifyContent="center">
                        {
                          project.url &&
                            <StyledButton variant="outlined" size={"large"} onClick={() => window.open(project.url, '_blank')}>
                              {APP_MESSAGES.projects.visitWebSite}
                            </StyledButton>
                        }
                      </Box>
                    </Stack>
                  </OverlayContent>
                </Overlay>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
