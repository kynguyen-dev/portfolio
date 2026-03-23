import { Terminal, Code, Construction } from 'lucide-react';
import { motion } from 'motion/react';
import { GradientPaper } from '@components/customs/paper/GradientPaper.tsx';
import { PFGradientTypography, PFTypography } from '@components/core';
import { useTranslation } from 'react-i18next';
import {
  APP_PAGES,
  APP_TYPOGRAPHIES,
  APP_TYPOGRAPHIES_ANIMATION,
} from '@constants';
import { ReactNode } from 'react';
import {
  staggerContainer,
  staggerItem,
} from '@utils/animations/scrollVariants';
import { getYearsOfExperience } from '@utils/core/career';

interface HighlightSkill {
  labelKey: string;
  items: string[];
}

interface SkillsDef {
  titleKey: string;
  icon: ReactNode;
  quoteKey: string;
  highlights: HighlightSkill[];
}

const skillDefs: SkillsDef[] = [
  {
    titleKey: 'profile.backEndDeveloper',
    icon: <Terminal className='w-12 h-12 text-primary-light' />,
    quoteKey: 'profile.backEndQuote',
    highlights: [
      {
        labelKey: 'profile.enjoyCoding',
        items: ['Java', 'TypeScript'],
      },
      {
        labelKey: 'profile.devTech',
        items: [
          'Java 8',
          'Spring Boot',
          'NextJS',
          'SQLite',
          'NoSQL MongoDB',
          'PostgreSQL',
          'Drizzle ORM',
          'RESTful API',
          'JUnit',
          'Groovy',
          'Java Android',
        ],
      },
    ],
  },
  {
    titleKey: 'profile.frontEndDeveloper',
    icon: <Code className='w-12 h-12 text-primary-light' />,
    quoteKey: 'profile.frontEndQuote',
    highlights: [
      {
        labelKey: 'profile.languages',
        items: ['HTML', 'CSS', 'TypeScript'],
      },
      {
        labelKey: 'profile.devTech',
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
    titleKey: 'profile.tools',
    icon: <Construction className='w-12 h-12 text-primary-light' />,
    quoteKey: 'profile.toolEndQuote',
    highlights: [
      {
        labelKey: 'profile.methods',
        items: ['Scrum/Agile'],
      },
      {
        labelKey: 'profile.toolsIUse',
        items: [
          'Visual Studio Code',
          'WebStorm',
          'IntelliJ IDE',
          'Postman',
          'Docker Desktop',
          'Git',
          'GitHub/GitLab',
          'Jira',
          'Figma',
        ],
      },
    ],
  },
];

export const Profile = () => {
  const { t } = useTranslation();
  const years = getYearsOfExperience();

  return (
    <section
      id={APP_PAGES.PROFILE.toLowerCase()}
      aria-label={t('profile.opening')}
      className='py-16 md:py-24 px-4 md:px-12 max-w-6xl mx-auto text-center relative'
    >
      <div className='mb-16'>
        <PFTypography
          variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
          animations={[APP_TYPOGRAPHIES_ANIMATION.TYPEWRITER]}
          className='font-bold'
        >
          {t('profile.opening')}
        </PFTypography>
        <PFTypography
          variant={APP_TYPOGRAPHIES.BODY_SECONDARY}
          className='mt-4 max-w-2xl mx-auto'
        >
          {t('profile.content', { years })}
        </PFTypography>
      </div>

      <motion.div
        variants={staggerContainer(0.2, 0.15)}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        className='grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch'
      >
        {skillDefs.map(role => (
          <motion.div
            key={role.titleKey}
            variants={staggerItem}
            whileHover={{ y: -8 }}
            className='flex'
          >
            <GradientPaper className='flex-1 flex flex-col p-8'>
              <div className='flex flex-col gap-4 items-center h-full'>
                <div className='mb-2'>{role.icon}</div>

                <PFGradientTypography
                  variant={APP_TYPOGRAPHIES.HEADER_SECONDARY}
                  className='font-bold'
                >
                  {t(role.titleKey)}
                </PFGradientTypography>

                <PFTypography
                  variant={APP_TYPOGRAPHIES.BODY_SECONDARY}
                  animations={[APP_TYPOGRAPHIES_ANIMATION.TYPEWRITER]}
                  speed={50}
                  className='mt-2 text-text-secondary italic min-h-[3em]'
                >
                  {t(role.quoteKey)}
                </PFTypography>

                <div className='flex-grow' />

                <div className='w-full flex flex-col gap-6 mt-6'>
                  {role.highlights.map(highlight => (
                    <div
                      key={highlight.labelKey}
                      className='flex flex-col gap-2'
                    >
                      <PFGradientTypography
                        variant={APP_TYPOGRAPHIES.SUBTITLE_SECONDARY}
                        className='font-bold'
                        colors={['#E8C96A', '#D4A843', '#C75B39']}
                      >
                        {t(highlight.labelKey)}
                      </PFGradientTypography>

                      <div className='flex flex-wrap justify-center gap-x-3 gap-y-1'>
                        {highlight.items.map(item => (
                          <PFTypography
                            key={item}
                            variant={APP_TYPOGRAPHIES.BODY_SECONDARY}
                            className='font-bold text-text-primary'
                          >
                            {item}
                          </PFTypography>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GradientPaper>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
