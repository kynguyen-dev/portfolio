import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  staggerContainer,
  staggerScaleUp,
} from '@utils/animations/scrollVariants';

interface ArsenalPanel {
  titleKey: string;
  icon: string;
  accentClass: string;
  borderClass: string;
  hoverClass: string;
  skills: string[];
}

const arsenalPanels: ArsenalPanel[] = [
  {
    titleKey: 'skills.coreFrontend',
    icon: '⌨',
    accentClass: 'text-ct-primary-container',
    borderClass: 'border-t-ct-primary-container/30',
    hoverClass: 'hover:text-ct-primary-container',
    skills: [
      'React 18',
      'TypeScript',
      'Next.js',
      'Vue 3',
      'SASS/SCSS',
      'Redux Toolkit',
    ],
  },
  {
    titleKey: 'skills.dataArchitecture',
    icon: '🗄',
    accentClass: 'text-ct-secondary',
    borderClass: 'border-t-ct-secondary/30',
    hoverClass: 'hover:text-ct-secondary',
    skills: ['PostgreSQL', 'GraphQL', 'Redis', 'Firebase', 'Prisma', 'Node.js'],
  },
  {
    titleKey: 'skills.toolingOps',
    icon: '⚙',
    accentClass: 'text-ct-on-surface',
    borderClass: 'border-t-ct-on-surface/30',
    hoverClass: 'hover:text-white',
    skills: ['Docker', 'GitHub Actions', 'Vite', 'AWS EC2', 'Jest', 'Cypress'],
  },
];

export const Skills = () => {
  const { t } = useTranslation();

  return (
    <section
      id='skills'
      aria-label={t('skills.heading')}
      className='bg-ct-surface-container-low py-24 md:py-32'
    >
      <div className='max-w-7xl mx-auto px-8'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-16 flex flex-col items-center'
        >
          <h2 className='font-serif-display text-4xl text-ct-secondary text-center mb-4'>
            {t('skills.sectionTitle')}
          </h2>
          <div className='h-px w-24 bg-ct-secondary' />
        </motion.div>

        {/* 3-Column Grid */}
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, amount: 0.2 }}
          className='grid grid-cols-1 md:grid-cols-3 gap-6'
        >
          {arsenalPanels.map(panel => (
            <motion.div
              key={panel.titleKey}
              variants={staggerScaleUp}
              className={`glass p-8 rounded-xl border-t-2 ${panel.borderClass}`}
            >
              <div className='flex items-center gap-3 mb-8'>
                <span className={`text-2xl ${panel.accentClass}`}>
                  {panel.icon}
                </span>
                <h3 className='font-mono-code text-sm tracking-widest uppercase font-bold text-ct-on-surface'>
                  {t(panel.titleKey)}
                </h3>
              </div>
              <div className='flex flex-wrap gap-3'>
                {panel.skills.map(skill => (
                  <span
                    key={skill}
                    className={`px-3 py-1 bg-ct-surface-container-high rounded text-[11px] font-mono-code text-ct-on-surface-variant ${panel.hoverClass} transition-colors cursor-default`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
