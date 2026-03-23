import {
  ESLINT_URLS,
  HUSKY_URLS,
  MOTION_URLS,
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
  { name: 'Tailwind CSS', link: 'https://tailwindcss.com' },
  { name: 'Shadcn/UI', link: 'https://ui.shadcn.com' },
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
  return (
    <div className='w-full text-center'>
      <div className='flex flex-row justify-center items-center flex-wrap gap-x-2 gap-y-1'>
        <PFTypography className='text-text-secondary opacity-70'>
          Powered by{' '}
        </PFTypography>
        {techStacks.map((tech, index) => (
          <div key={tech.name} className='flex items-center'>
            <a
              href={tech.link}
              target='_blank'
              rel='noopener noreferrer'
              className='text-text-primary hover:text-primary-light transition-colors no-underline font-medium text-sm'
              aria-label={`Learn more about ${tech.name}`}
            >
              {tech.name}
            </a>
            {index !== techStacks.length - 1 && (
              <span className='ml-2 text-text-disabled opacity-30 select-none'>
                •
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
