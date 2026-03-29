import { animated, useSpring, useTrail } from '@react-spring/web';
import { useTranslation } from 'react-i18next';
import { useInView } from '@utils/animations/springVariants';
import { cn } from '@utils/core/cn';
import { CodeBlock, Database, GearSix, Rocket } from '@phosphor-icons/react';
import { GlareCard } from '@components/customs/aceternity';
import { getYearsOfExperience } from '@utils/core/career';

/* ─── Data ─── */
interface ArsenalPanel {
  titleKey: string;
  icon: React.ReactNode;
  accentClass: string;
  accentGradient: string;
  glareColor: string;
  chipStyle: string;
  skills: string[];
}

const arsenalPanels: ArsenalPanel[] = [
  {
    titleKey: 'skills.coreFrontend',
    icon: <CodeBlock weight='duotone' />,
    accentClass: 'text-ct-secondary',
    accentGradient: 'from-ct-secondary/80 to-ct-secondary/30',
    glareColor: 'rgba(78, 222, 163, 0.10)',
    chipStyle:
      'bg-ct-secondary/8 text-ct-secondary border-ct-secondary/15 hover:bg-ct-secondary/15',
    skills: [
      'React (3+ years)',
      'Next.js (SSR)',
      'TypeScript',
      'AngularJS',
      'Tailwind CSS',
      'MUI / Ant Design',
    ],
  },
  {
    titleKey: 'skills.dataArchitecture',
    icon: <Database weight='duotone' />,
    accentClass: 'text-primary-main',
    accentGradient: 'from-primary-main/80 to-primary-main/30',
    glareColor: 'rgba(208, 188, 255, 0.10)',
    chipStyle:
      'bg-primary-main/8 text-primary-main border-primary-main/15 hover:bg-primary-main/15',
    skills: [
      'Java (Spring)',
      'PHP (Laravel)',
      'RESTful API',
      'PostgreSQL',
      'MongoDB',
      'Docker / MinIO',
    ],
  },
  {
    titleKey: 'skills.toolingOps',
    icon: <GearSix weight='duotone' />,
    accentClass: 'text-ct-secondary',
    accentGradient: 'from-ct-secondary/80 to-ct-secondary/30',
    glareColor: 'rgba(78, 222, 163, 0.10)',
    chipStyle:
      'bg-ct-secondary/8 text-ct-secondary border-ct-secondary/15 hover:bg-ct-secondary/15',
    skills: [
      'AWS / Vercel',
      'GitLab / GitHub',
      'ESLint / Prettier',
      'Vite / Gradle',
      'Postman / Insomnia',
      'Figma / Notion',
    ],
  },
  {
    titleKey: 'skills.execution',
    icon: <Rocket weight='duotone' />,
    accentClass: 'text-primary-main',
    accentGradient: 'from-primary-main/80 to-primary-main/30',
    glareColor: 'rgba(208, 188, 255, 0.10)',
    chipStyle:
      'bg-primary-main/8 text-primary-main border-primary-main/15 hover:bg-primary-main/15',
    skills: [
      'Agile / Scrum',
      'CI/CD Pipelines',
      'Jest / RTL',
      'Storybook',
      'Clean Code',
      'Code Review',
    ],
  },
];

/* ─── Bento layout config: zigzag pattern ─── */
const bentoRows: { panelIdx: number; span: 1 | 2 }[][] = [
  [
    { panelIdx: 0, span: 2 },
    { panelIdx: 1, span: 1 },
  ],
  [
    { panelIdx: 2, span: 1 },
    { panelIdx: 3, span: 2 },
  ],
];

/* ─── Arsenal Card Content ─── */
const ArsenalCardContent = ({
  panel,
  panelIdx,
}: {
  panel: ArsenalPanel;
  panelIdx: number;
}) => {
  const { t } = useTranslation();

  return (
    <div className='p-8 md:p-10 h-full flex flex-col'>
      {/* Top accent line */}
      <div
        className={cn(
          'h-[2px] w-full rounded-full bg-gradient-to-r mb-8 opacity-50',
          panel.accentGradient
        )}
      />

      {/* Icon + counter row */}
      <div className='flex items-start justify-between mb-6'>
        <div
          className={cn(
            'p-3.5 rounded-xl bg-ct-surface-container transition-all duration-300',
            panel.accentClass
          )}
        >
          <span className='text-2xl block'>{panel.icon}</span>
        </div>
        <span className='text-[10px] text-ct-outline font-label-grotesk tracking-[0.15em] uppercase opacity-40 mt-1'>
          {String(panelIdx + 1).padStart(2, '0')}/
          {String(arsenalPanels.length).padStart(2, '0')}
        </span>
      </div>

      {/* Title */}
      <h5 className='text-xs font-black tracking-[0.25em] mb-6 text-ct-on-surface uppercase font-label-grotesk'>
        {t(panel.titleKey)}
      </h5>

      {/* Skill chips */}
      <div className='flex flex-wrap gap-2.5 flex-1'>
        {panel.skills.map(skill => (
          <span
            key={skill}
            className={cn(
              'px-4 py-2 text-sm font-label-grotesk font-medium rounded-lg border transition-all duration-200 cursor-default',
              panel.chipStyle
            )}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Bottom accent */}
      <div
        className={cn(
          'mt-8 h-[1px] w-10 rounded-full opacity-20',
          panel.accentClass.replace('text-', 'bg-')
        )}
      />
    </div>
  );
};

/* ─── Main Component ─── */
export const Skills = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const trail = useTrail(arsenalPanels.length, {
    from: { opacity: 0, y: 50, scale: 0.92 },
    to: inView
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 50, scale: 0.92 },
    config: { tension: 160, friction: 22 },
  });

  /* Section header animation */
  const headerSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    config: { tension: 180, friction: 24 },
  });

  return (
    <section
      id='skills'
      aria-label={t('skills.heading')}
      className='py-28 md:py-36 relative overflow-hidden'
    >
      {/* Ambient glow decorations */}
      <div className='absolute top-0 left-1/3 w-[600px] h-[600px] bg-primary-main/4 rounded-full blur-[180px] pointer-events-none' />
      <div className='absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-ct-secondary/4 rounded-full blur-[150px] pointer-events-none' />

      {/* Subtle topology grid overlay */}
      <div className='absolute inset-0 topology-grid opacity-[0.04] pointer-events-none' />

      <div className='px-8 lg:px-16'>
        {/* Section Header */}
        <animated.div
          style={{
            opacity: headerSpring.opacity,
            transform: headerSpring.y.to(y => `translateY(${y}px)`),
          }}
          className='mb-20'
        >
          <div className='flex items-center gap-4 mb-4'>
            <h2 className='text-primary-main font-label-grotesk text-xs font-black tracking-[0.3em] uppercase'>
              02 {'// '}
              {t('skills.sectionLabel')}
            </h2>
            <div className='h-px flex-1 max-w-[120px] bg-gradient-to-r from-primary-main/40 to-transparent' />
          </div>
          <h3 className='font-serif-display text-4xl md:text-5xl lg:text-6xl text-ct-on-surface tracking-tight'>
            {t('skills.sectionTitle')}
          </h3>
          <p className='mt-4 text-ct-on-surface-variant/60 font-label-grotesk text-sm tracking-wide max-w-xl'>
            {t('skills.description')}
          </p>
        </animated.div>

        {/* Arsenal Bento Grid — zigzag with Glare Cards */}
        <div ref={ref} className='space-y-5'>
          {bentoRows.map((row, rowIdx) => (
            <div key={rowIdx} className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
              {row.map(({ panelIdx, span }) => {
                const panel = arsenalPanels[panelIdx];
                const style = trail[panelIdx];
                const isWide = span === 2;
                return (
                  <animated.div
                    key={panel.titleKey}
                    style={{
                      opacity: style.opacity,
                      transform: style.y.to(
                        y => `translateY(${y}px) scale(${style.scale.get()})`
                      ),
                    }}
                    className={isWide ? 'lg:col-span-2' : ''}
                  >
                    <GlareCard glareColor={panel.glareColor} className='h-full'>
                      <ArsenalCardContent panel={panel} panelIdx={panelIdx} />
                    </GlareCard>
                  </animated.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Stats Strip */}
        <animated.div
          style={{
            opacity: headerSpring.opacity,
            transform: headerSpring.y.to(y => `translateY(${y}px)`),
          }}
          className='mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-16'
        >
          {[
            { value: '20+', label: t('skills.stats.technologies') },
            {
              value: `${getYearsOfExperience()}+`,
              label: t('skills.stats.yearsExp'),
            },
            { value: '6', label: t('skills.stats.productionSystems') },
          ].map(stat => (
            <div key={stat.label} className='text-center group'>
              <div className='font-serif-display text-3xl md:text-4xl text-ct-on-surface tracking-tight group-hover:text-primary-main transition-colors duration-300'>
                {stat.value}
              </div>
              <div className='text-[10px] text-ct-outline font-label-grotesk tracking-[0.2em] uppercase mt-1'>
                {stat.label}
              </div>
            </div>
          ))}
        </animated.div>
      </div>
    </section>
  );
};
