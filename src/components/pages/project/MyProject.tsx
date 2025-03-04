import { motion } from 'framer-motion';
import { Grid, Stack, Typography, useTheme } from '@mui/material';
import { PFGradientTypography, PFTypography } from '@components/core';
import Box from '@mui/material/Box';
import { Overlay, OverlayContent } from '@components/core/overlay';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const projects: ProjectCardProps[] = [
  {
    title: 'Logistics',
    description:
      'Developed a Comprehensive Driver and Truck Tracking System Collaborated on designing and building a multi-platform application ecosystem to enhance logistics efficiency. Achieved safety accreditation and compliance certification from NHVR.\n',
    imageUrl: '/assets/images/projects/drivalink.jpg',
  },
  {
    title: 'Medical',
    description:
      'Developing a web application for an epilepsy research center, focused on managing health reports, tracking health conditions, and collecting information from clinics and epilepsy patients.\n',
    imageUrl: '/assets/images/projects/EPI.jpg',
  },
  {
    title: 'Education',
    description:
      'Developing a web application for managing student Credentialate, focusing on skill recognition, badge management, and student progress tracking.\n',
    imageUrl: '/assets/images/projects/learner-dashboard.webp',
  },
  {
    title: 'Hire Service',
    description:
      'Developed a full-stack web application for an air conditioner subscription service using ReactJS and Next.js.\n',
    imageUrl: '/assets/images/projects/airconsub.jpg',
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
      <PFGradientTypography variant='h5' theme={'dark'}>
        My Recent Work
      </PFGradientTypography>
      <PFTypography
        variant='subtitle1'
        colorVariant={'common.black'}
        textAlign={'center'}
      >
        Here are a few past design projects I've worked on. Want to see more?
        Email me.
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
                height: '480px',
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
                  <Stack direction={'column'} gap={2} justifyItems={'center'}>
                    <PFGradientTypography variant='h5' theme={'light'}>
                      {project.title}
                    </PFGradientTypography>
                    <Typography variant='caption' color={'white'}>
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
