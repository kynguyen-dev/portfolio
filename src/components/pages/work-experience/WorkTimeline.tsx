import { motion, type Variants } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { APP_PAGES } from '@constants';

interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
}

const workHistory: TimelineEntry[] = [
  {
    company: 'Cymosoft',
    role: 'Full-Stack Developer',
    period: 'Sep 2024 — Jan 2025',
    description:
      'Developed a full-stack air conditioner rental service platform for the Japanese market, handling subscription management, booking flows, and service scheduling.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Drizzle ORM'],
  },
  {
    company: 'PTN Global',
    role: 'Full-Stack Developer',
    period: 'Mar 2024 — Dec 2024',
    description:
      'Built a dynamic learner dashboard for Australian educational institutions, providing 24/7 access to badges, cohort comparisons, and attendance tracking.',
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
    technologies: ['React', 'TypeScript', 'Auth0', 'Jest', 'Material UI'],
  },
  {
    company: 'PTN Global',
    role: 'Full-Stack Developer',
    period: 'Dec 2021 — Feb 2023',
    description:
      'Built and maintained a logistics and driver safety management system, combining fleet tracking, compliance workflows, and a mobile companion app for drivers.',
    technologies: ['Java 8', 'Spring Boot', 'Angular', 'Android'],
  },
];

export const WorkTimeline = () => {
  const { t } = useTranslation();

  return (
    <section
      id={APP_PAGES.PROJECTS.toLowerCase()}
      aria-label={t('workExperience.heading')}
      className='max-w-7xl mx-auto px-8 py-24 md:py-32'
    >
      <div className='flex flex-col md:flex-row gap-16'>
        {/* Left — Sticky heading */}
        <div className='md:w-1/3'>
          <h2 className='font-serif-display text-4xl text-ct-secondary sticky top-32'>
            {t('workExperience.sectionTitle')}
            <span className='text-ct-on-surface'>
              {t('workExperience.sectionTitleSuffix')}
            </span>
          </h2>
          <p className='mt-4 text-ct-on-surface-variant font-mono-code text-sm'>
            {t('workExperience.archiveLabel')}
          </p>
        </div>

        {/* Right — Timeline */}
        <div className='md:w-2/3 relative pl-12 border-l border-ct-secondary/20 space-y-24'>
          {workHistory.map((entry, index) => {
            const cardVariant: Variants = {
              hidden: { opacity: 0, x: 60, scale: 0.95 },
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
                key={`${entry.company}-${entry.period}`}
                variants={cardVariant}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.3 }}
                className='relative'
              >
                {/* Timeline dot */}
                <div className='absolute -left-[54px] top-0 w-3 h-3 rounded-full bg-ct-secondary shadow-[0_0_15px_#D4AF37]' />

                {/* Card */}
                <div className='glass p-8 rounded-xl gold-glow transition-all duration-300'>
                  <span className='font-mono-code text-ct-secondary text-sm mb-2 block'>
                    {entry.period}
                  </span>
                  <h3 className='text-2xl font-bold mb-1 text-ct-on-surface'>
                    {entry.role}
                  </h3>
                  <p className='text-ct-primary-container text-sm font-semibold mb-4'>
                    {entry.company}
                  </p>
                  <p className='text-ct-on-surface-variant mb-6 leading-relaxed'>
                    {entry.description}
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {entry.technologies.map(tech => (
                      <span
                        key={tech}
                        className='text-[10px] font-mono-code px-2 py-1 border border-ct-primary-container/20 text-ct-primary-container bg-ct-primary-container/5 uppercase'
                      >
                        {tech}
                      </span>
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
