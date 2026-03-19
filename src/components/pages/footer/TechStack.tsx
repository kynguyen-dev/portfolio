import { Stack, Box, useTheme } from '@mui/material';
import {
  ESLINT_URLS,
  HUSKY_URLS,
  MOTION_URLS,
  MUI_URLS,
  PRETTIER_URLS,
  REACTJS_URLS,
  STORYBOOK_URLS,
  VANTA_URLS,
  VERCEL_URLS,
  VITE_URLS,
  YARN_URLS,
} from '@constants';
import { PFTypography } from '@components/core';

interface TechStackProps {
  name: string;
  link: string;
}

const techStacks: TechStackProps[] = [
  { name: 'ReactJS', link: REACTJS_URLS },
  { name: 'Material UI', link: MUI_URLS },
  { name: 'Motion', link: MOTION_URLS },
  { name: 'VantaJS', link: VANTA_URLS },
  { name: 'Storybook', link: STORYBOOK_URLS },
  { name: 'ESLint', link: ESLINT_URLS },
  { name: 'Prettier', link: PRETTIER_URLS },
  { name: 'Husky', link: HUSKY_URLS },
  { name: 'Yarn', link: YARN_URLS },
  { name: 'Vite', link: VITE_URLS },
  { name: 'Vercel', link: VERCEL_URLS },
];

export const TechStack = () => {
  const { palette } = useTheme();

  return (
    <Stack width='100%' textAlign='center'>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        flexWrap='wrap'
        gap={1}
      >
        <PFTypography>{`Powered by `}</PFTypography>
        {techStacks.map((tech, index) => (
          <Box key={tech.name} display='inline'>
            <a
              href={tech.link}
              target='_blank'
              rel='noopener noreferrer'
              style={{
                textDecoration: 'none',
                color: palette.text.primary,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e =>
                (e.currentTarget.style.color = palette.primary.light)
              }
              onMouseLeave={e =>
                (e.currentTarget.style.color = palette.text.primary)
              }
              aria-label={`Learn more about ${tech.name}`}
            >
              {tech.name}
            </a>
            {index !== techStacks.length - 1 && <span> - </span>}
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};
