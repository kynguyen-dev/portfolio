import { Stack, useTheme } from '@mui/material';
import { PFTypography } from '@components/core';

const techStack = [
  { name: 'ReactJS', link: 'https://react.dev/' },
  { name: 'Material UI', link: 'https://mui.com/' },
  { name: 'Motion', link: 'https://www.framer.com/motion/' },
  { name: 'VantaJS', link: 'https://www.vantajs.com/' },
  { name: 'Storybook', link: 'https://storybook.js.org/' },
  { name: 'ESLint', link: 'https://eslint.org/' },
  { name: 'Prettier', link: 'https://prettier.io/' },
  { name: 'Husky', link: 'https://typicode.github.io/husky/' },
  { name: 'Yarn', link: 'https://yarnpkg.com/' },
  { name: 'Vite', link: 'https://vitejs.dev/' },
];

export const TechStack = () => {
  const { palette } = useTheme();

  return (
    <Stack width='100%' textAlign='center' mt='auto' pb={2}>
      <PFTypography
        variant='body2'
        color={palette.text?.primary}
        textAlign={'center'}
      >
        Powered by{' '}
        {techStack.map((tech, index) => (
          <span key={tech.name}>
            <a
              href={tech.link}
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: 'none', color: palette.common.white }}
            >
              {tech.name}
            </a>
            {index !== techStack.length - 1 && ' - '}
          </span>
        ))}
      </PFTypography>
    </Stack>
  );
};
