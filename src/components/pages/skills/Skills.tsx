import { animated, useTrail } from '@react-spring/web';
import { useTranslation } from 'react-i18next';
import { useInView } from '@utils/animations/springVariants';

interface ArsenalPanel {
  titleKey: string;
  icon: string;
  accentClass: string;
  skills: string[];
}

const arsenalPanels: ArsenalPanel[] = [
  {
    titleKey: 'skills.coreFrontend',
    icon: '⌨',
    accentClass: 'text-ct-secondary',
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
    accentClass: 'text-primary-main',
    skills: ['PostgreSQL', 'GraphQL', 'Redis', 'Firebase', 'Prisma', 'Node.js'],
  },
  {
    titleKey: 'skills.toolingOps',
    icon: '⚙',
    accentClass: 'text-ct-secondary',
    skills: ['Docker', 'GitHub Actions', 'Vite', 'AWS EC2', 'Jest', 'Cypress'],
  },
  {
    titleKey: 'skills.execution',
    icon: '🔧',
    accentClass: 'text-primary-main',
    skills: ['CI/CD', 'Vercel', 'Storybook', 'TanStack'],
  },
];

export const Skills = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.2 });

  const trail = useTrail(arsenalPanels.length, {
    from: { opacity: 0, y: 30 },
    to: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <section
      id='skills'
      aria-label={t('skills.heading')}
      className='py-24 md:py-32 bg-ct-surface-container-lowest'
    >
      <div className='px-8 lg:px-16'>
        {/* Section Header — centered, prototype style */}
        <div className='text-center mb-20'>
          <h2 className='text-primary-main font-label-grotesk text-xs font-black tracking-[0.3em] uppercase mb-2'>
            02 // DATA_BANK
          </h2>
          <h3 className='font-serif-display text-4xl md:text-5xl text-ct-on-surface'>
            {t('skills.sectionTitle')}
          </h3>
        </div>

        {/* Matrix Grid — gap-px for subtle dividers (No-Line Rule) */}
        <div
          ref={ref}
          className='grid grid-cols-2 md:grid-cols-4 gap-px bg-ct-outline-variant/10'
        >
          {trail.map((style, i) => {
            const panel = arsenalPanels[i];
            return (
              <animated.div
                key={panel.titleKey}
                style={style}
                className='bg-ct-bg p-10 group hover:bg-ct-surface-container-low transition-all duration-300'
              >
                <div
                  className={`mb-4 opacity-50 group-hover:opacity-100 transition-opacity ${panel.accentClass}`}
                >
                  <span className='text-4xl'>{panel.icon}</span>
                </div>
                <h5 className='text-xs font-black tracking-[0.2em] mb-3 text-ct-on-surface uppercase font-label-grotesk'>
                  {t(panel.titleKey)}
                </h5>
                <ul className='text-ct-on-surface-variant text-sm space-y-1.5'>
                  {panel.skills.map(skill => (
                    <li
                      key={skill}
                      className='hover:text-primary-main transition-colors cursor-default'
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </animated.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
