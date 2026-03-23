import { motion, type Variants } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { PFGradientTypography, PFTypography } from '@components/core';
import { APP_THEMES, APP_TYPOGRAPHIES } from '@constants';
import { useThemeMode } from '@contexts/theme-mode';
import { cn } from '@utils/core/cn';

interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

const workHistory: TimelineEntry[] = [
  {
    company: 'Cymosoft',
    role: 'Full-Stack Developer',
    period: 'Sep 2024 — Jan 2025',
    description:
      'Developed a full-stack air conditioner rental service platform for the Japanese market, handling subscription management, booking flows, and service scheduling.',
    highlights: [
      'Built server-rendered pages and API routes with Next.js App Router & TypeScript',
      'Designed relational database schema and managed migrations with Drizzle ORM',
      'Implemented responsive, mobile-first UI with Tailwind CSS',
      'Delivered end-to-end features following Agile sprints in a cross-cultural team',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Drizzle ORM'],
  },
  {
    company: 'PTN Global',
    role: 'Full-Stack Developer',
    period: 'Mar 2024 — Dec 2024',
    description:
      'Built a dynamic learner dashboard for Australian educational institutions, providing 24/7 access to badges, cohort comparisons, and attendance tracking for learners, parents, teachers and administrators.',
    highlights: [
      'Developed interactive UI components with ReactJS and documented them in Storybook',
      'Implemented efficient server-state management with TanStack Query',
      'Built backend microservices with Java & Micronaut framework',
      'Collaborated closely with UX designers to deliver a responsive, accessible interface',
    ],
    technologies: [
      'ReactJS',
      'Java',
      'Micronaut',
      'TanStack Query',
      'Storybook',
    ],
  },
  {
    company: 'PTN Global',
    role: 'Front-End Developer',
    period: 'Feb 2023 — Mar 2024',
    description:
      'Developed a healthcare platform for an epilepsy research center, focused on managing clinical data, tracking patient conditions, and streamlining health report workflows.',
    highlights: [
      'Designed and built a reusable component library with Material UI for consistent UX',
      'Integrated secure authentication and authorization with Auth0',
      'Implemented complex form validation with React Hook Form + Yup schema',
      'Achieved 90%+ test coverage with Jest & React Testing Library',
    ],
    technologies: ['React', 'TypeScript', 'Auth0', 'Jest', 'Material UI'],
  },
  {
    company: 'PTN Global',
    role: 'Full-Stack Developer',
    period: 'Dec 2021 — Feb 2023',
    description:
      'Built and maintained a logistics and driver safety management system, combining fleet tracking, compliance workflows, and a mobile companion app for drivers.',
    highlights: [
      'Developed backend services with Java 8 & Spring Boot for fleet management APIs',
      'Built responsive admin dashboard with Angular for fleet operators',
      'Developed Android companion app for real-time driver safety monitoring',
      'Mentored 2 junior developers through code reviews & pair programming sessions',
    ],
    technologies: ['Java 8', 'Spring Boot', 'Angular', 'Android'],
  },
];

export const WorkTimeline = () => {
  const { t } = useTranslation();
  const { mode } = useThemeMode();
  const isLight = mode === 'light';

  return (
    <section
      id='experience'
      className='px-4 md:px-12 py-16 md:py-24 max-w-[1100px] mx-auto'
    >
      <div className='flex flex-col items-center gap-12'>
        <PFGradientTypography
          variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
          theme={APP_THEMES.DARK}
          fontWeight='bold'
        >
          {t('workExperience.heading')}
        </PFGradientTypography>

        <div className='relative w-full max-w-[800px] flex flex-col'>
          {/* Vertical line */}
          <div
            className='absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px]'
            style={{
              background:
                'linear-gradient(to bottom, transparent, #E8C96A, #D4A843, #D4A843, #C75B39, transparent)',
            }}
          />

          {workHistory.map((entry, index) => {
            const isLeft = index % 2 === 0;
            const cardVariant: Variants = {
              hidden: { opacity: 0, x: isLeft ? -60 : 60, scale: 0.95 },
              visible: {
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              },
            };
            return (
              <motion.div
                key={entry.company}
                variants={cardVariant}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={cn(
                  'relative flex mb-10 w-full',
                  'pl-12 md:pl-0',
                  isLeft
                    ? 'md:justify-end md:pr-[52%]'
                    : 'md:justify-start md:pl-[52%]'
                )}
              >
                {/* Dot on timeline */}
                <div
                  className={cn(
                    'absolute top-2 w-3 h-3 rounded-full z-10',
                    'left-[11px] md:left-1/2 md:-translate-x-1/2',
                    'bg-primary-light shadow-[0_0_12px_rgba(232,201,106,0.5)]'
                  )}
                />

                {/* Card */}
                <div
                  className={cn(
                    'p-6 w-full transition-all duration-300 rounded-lg backdrop-blur-[10px] border',
                    isLight
                      ? 'bg-[#FFF8F0]/85 border-[#B8891F]/15 hover:border-[#B8891F]/45 hover:shadow-[0_0_24px_rgba(184,137,31,0.08)]'
                      : 'bg-[#0B0D2E]/55 border-[#F5D060]/15 hover:border-[#F5D060]/45 hover:shadow-[0_0_24px_rgba(245,208,96,0.08)]'
                  )}
                >
                  <PFTypography
                    variant='caption'
                    fontWeight={600}
                    className='text-primary-light uppercase tracking-wider'
                  >
                    {entry.period}
                  </PFTypography>
                  <PFTypography
                    variant='h6'
                    fontWeight={700}
                    className='mt-1 text-text-primary'
                  >
                    {entry.role}
                  </PFTypography>
                  <PFTypography
                    variant='body1'
                    fontWeight={600}
                    className='text-primary-main'
                  >
                    {entry.company}
                  </PFTypography>
                  <PFTypography
                    variant='body2'
                    className='mt-3 text-text-secondary leading-relaxed opacity-85'
                  >
                    {entry.description}
                  </PFTypography>
                  {entry.highlights.length > 0 && (
                    <ul className='mt-4 pl-0 list-none'>
                      {entry.highlights.map((h, i) => (
                        <PFTypography
                          key={i}
                          component='li'
                          variant='body2'
                          className='relative pl-5 mb-2 text-text-secondary leading-relaxed opacity-85 before:content-["▸"] before:absolute before:left-0 before:text-primary-light before:font-bold'
                        >
                          {h}
                        </PFTypography>
                      ))}
                    </ul>
                  )}
                  <div className='flex flex-wrap gap-2 mt-4'>
                    {entry.technologies.map(tech => (
                      <div
                        key={tech}
                        className='px-3 py-1 rounded bg-primary-light/10 border border-primary-light/20 text-[0.75rem] font-semibold text-primary-light'
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
