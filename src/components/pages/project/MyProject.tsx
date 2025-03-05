import { motion } from 'framer-motion';
import { Grid, Stack, Typography, Box, useTheme } from '@mui/material';
import { PFGradientTypography, PFTypography } from '@components/core';
import { Overlay, OverlayContent } from '@components/core/overlay';
import {
  APP_THEMES,
  APP_TYPOGRAPHIES,
  EDUCATION_PROJECT_IMAGE_URLS, HIRE_SERVICE_PROJECT_IMAGE_URLS,
  LOGISTIC_PROJECT_IMAGE_URLS,
  MEDICAL_PROJECT_IMAGE_URLS
} from "@constants";
import { APP_MESSAGES } from "@utils/core/messages";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const projects: ProjectCardProps[] = [
  {
    title: APP_MESSAGES.projects.logistic.title,
    description: APP_MESSAGES.projects.logistic.description,
    imageUrl: LOGISTIC_PROJECT_IMAGE_URLS,
  },
  {
    title: APP_MESSAGES.projects.medical.title,
    description: APP_MESSAGES.projects.medical.description,
    imageUrl: MEDICAL_PROJECT_IMAGE_URLS,
  },
  {
    title: APP_MESSAGES.projects.education.title,
    description: APP_MESSAGES.projects.education.description,
    imageUrl: EDUCATION_PROJECT_IMAGE_URLS,
  },
  {
    title: APP_MESSAGES.projects.hireService.title,
    description: APP_MESSAGES.projects.hireService.description,
    imageUrl: HIRE_SERVICE_PROJECT_IMAGE_URLS,
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
      <PFGradientTypography variant={APP_TYPOGRAPHIES.HEADER_PRIMARY} theme={APP_THEMES.DARK}>
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
            <Box
              component={motion.div}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: theme.shape.borderRadius,
                width: '100%',
                height: "480px",
                cursor: 'pointer',
                '&:hover .overlay-content': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              }}
            >
              <img
                src={project.imageUrl}
                height={'100%'}
                alt={project.title}
                style={{ objectFit: 'cover', filter: 'grayscale(30%)' }}
              />
              <Overlay className={'overlay'}>
                <OverlayContent className='overlay-content'>
                  <Stack direction={'column'} gap={2} justifyItems={'center'} px={2}>
                    <PFGradientTypography variant={APP_TYPOGRAPHIES.HEADER_SECONDARY} theme={APP_THEMES.LIGHT}>
                      {project.title}
                    </PFGradientTypography>
                    <Typography variant={APP_TYPOGRAPHIES.CAPTION} color={'white'}>
                      {project.description}
                    </Typography>
                  </Stack>
                </OverlayContent>
              </Overlay>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
