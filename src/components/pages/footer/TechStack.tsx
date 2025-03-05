import { Stack, useTheme } from '@mui/material';
import { PFTypography } from '@components/core';
import {APP_MESSAGES} from "@utils/core/messages";
import {
  ESLINT_URLS,
  HUSKY_URLS, MOTION_URLS, MUI_URLS,
  PRETTIER_URLS, REACTJS_URLS,
  STORYBOOK_URLS,
  VANTA_URLS,
  VERCEL_URLS,
  VITE_URLS,
  YARN_URLS
} from "@constants";

interface TechStackProps {
  name: string;
  link: string;
}

const techStacks: TechStackProps[] = [
  { name: APP_MESSAGES.profile.skills.react, link: REACTJS_URLS },
  { name: APP_MESSAGES.profile.skills.mui, link: MUI_URLS },
  { name: APP_MESSAGES.profile.skills.motion, link: MOTION_URLS },
  { name: APP_MESSAGES.profile.skills.vanta, link: VANTA_URLS },
  { name: APP_MESSAGES.profile.skills.storybook, link: STORYBOOK_URLS },
  { name: APP_MESSAGES.profile.skills.esLint, link: ESLINT_URLS },
  { name: APP_MESSAGES.profile.skills.prettier, link: PRETTIER_URLS },
  { name: APP_MESSAGES.profile.skills.husky, link: HUSKY_URLS },
  { name: APP_MESSAGES.profile.skills.yarn, link: YARN_URLS },
  { name: APP_MESSAGES.profile.skills.vite, link: VITE_URLS },
  { name: APP_MESSAGES.profile.skills.vercel, link: VERCEL_URLS },
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
        {techStacks.map((tech, index) => (
          <span key={tech.name}>
            <a
              href={tech.link}
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: 'none', color: palette.common.white }}
            >
              {tech.name}
            </a>
            {index !== techStacks.length - 1 && ' - '}
          </span>
        ))}
      </PFTypography>
    </Stack>
  );
};
