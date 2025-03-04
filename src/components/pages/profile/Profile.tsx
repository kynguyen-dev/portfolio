import { Box, Grid, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Code, Terminal } from '@mui/icons-material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { GradientPaper } from '@components/customs/paper/GradientPaper.tsx';
import { PFGradientTypography, PFTypography } from '@components/core';

const roles = [
  {
    title: 'Backend Developer',
    icon: (
      <Terminal
        fontSize='large'
        sx={{ color: 'linear-gradient(to bottom, #68B8D7, #A0B3FF, #F0FFFF)' }}
      />
    ),
    description:
      'I turn business logic into robust backend solutions that power the digital world.',
    highlights: [
      { label: 'Things I enjoy coding', items: ['Java', 'TypeScript'] },
      {
        label: 'Dev Tech',
        items: [
          'Java 8',
          'Spring Boot',
          'NextJS',
          'SQLite',
          'NoSQL MongoDB',
          'PostgreSQL',
          'Drizzle ORM',
          'RESTful API',
          'Junit',
          'Groovy',
          'Java Android',
        ],
      },
    ],
  },
  {
    title: 'Frontend Developer',
    icon: (
      <Code
        fontSize='large'
        sx={{ color: 'linear-gradient(to bottom, #68B8D7, #A0B3FF, #F0FFFF)' }}
      />
    ),
    description:
      'I like to code things from scratch and enjoy bringing ideas to life in the browser.',
    highlights: [
      { label: 'Languages I speak', items: ['HTML', 'CSS', 'TypeScript'] },
      {
        label: 'Dev Tech',
        items: [
          'ReactJS',
          'Tailwind CSS',
          'Material UI',
          'TanStack Query',
          'NextJS',
          'AngularJS',
          'Vite',
          'ESLint',
          'Prettier',
          'Storybook',
          'Jest',
          'React Testing Library',
          'React Hook Form',
          'Auth0',
        ],
      },
    ],
  },
  {
    title: 'Tools',
    icon: (
      <ConstructionIcon
        fontSize='large'
        sx={{ color: 'linear-gradient(to bottom, #68B8D7, #A0B3FF, #F0FFFF)' }}
      />
    ),
    description:
      'I don’t just use tools; I master them to build something great.',
    highlights: [
      {
        label: 'The method I work',
        items: ['Scrum/Agile'],
      },
      {
        label: 'Accompany I work',
        items: [
          'Visual Studio Code',
          'WebStorm',
          'IntelliJ IDE',
          'Postman',
          'Docker Desktop',
          'GitHub/GitLab',
          'Jira',
          'Figma',
        ],
      },
    ],
  },
];

export const Profile = () => {
  return (
    <Box
      id='profile'
      sx={{
        textAlign: 'center',
        pt: 12,
        background: 'linear-gradient(to bottom, #68B8D7, #F0FFFF)',
        color: 'white',
        px: { xs: 3, md: '20%' }, // 24px padding on mobile, 20% on desktop
      }}
    >
      <Box>
        <PFTypography variant='h4' fontWeight='bold'>
          Hi, I'm Ky Nguyen. Nice to meet you.
        </PFTypography>
        <PFTypography variant='body1' sx={{ mt: 2, mx: 'auto' }}>
          Since beginning my journey as a Font-End Developer three years ago, I
          have built expertise in developing cross-browser, responsive web
          applications. I specialize in TypeScript and ReactJS within Agile
          environments, continuously improving codebase quality through
          optimization, documentation, mentoring, and code reviews. Passionate
          about learning and growth, I stay up to date with modern development
          technologies to enhance both my skills and team collaboration.
        </PFTypography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 8, alignItems: 'stretch' }}>
        {roles.map((role, index) => (
          <Grid item xs={12} md={4} key={role.title} sx={{ display: 'flex' }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              style={{ flex: 1 }}
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
                  <PFGradientTypography variant='h6' fontWeight='bold'>
                    {role.title}
                  </PFGradientTypography>
                  <PFTypography
                    variant='body2'
                    sx={{ mt: 1, color: 'text.secondary' }}
                  >
                    {role.description}
                  </PFTypography>
                  <Box flexGrow={1} />
                  {role.highlights.map(highlight => (
                    <Box key={highlight.label} sx={{ mt: 2 }}>
                      <PFGradientTypography
                        variant='subtitle2'
                        fontWeight='bold'
                        color='#6C63FF'
                      >
                        {highlight.label}:
                      </PFGradientTypography>
                      {highlight.items.map(item => (
                        <PFTypography key={item} variant='body2' sx={{ mt: 1 }}>
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
