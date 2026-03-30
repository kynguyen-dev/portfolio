import { type ReactNode } from 'react';
import {
  animated,
  useSpring,
  useTrail,
  useSpringRef,
  useChain,
} from '@react-spring/web';
import { useTranslation } from 'react-i18next';
import { useInView } from '@utils/animations/springVariants';
import { cn } from '@utils/core/cn';
import {
  CodeBlockIcon,
  DatabaseIcon,
  GearSixIcon,
  RocketIcon,
  GitBranchIcon,
  CheckIcon,
  ArrowsClockwiseIcon,
  BookOpenIcon,
  KanbanIcon,
  AtomIcon,
  GlobeIcon,
  FileTsIcon,
  AngularLogoIcon,
  WindIcon,
  PaletteIcon,
  LeafIcon,
  FileCssIcon,
  CloudArrowUpIcon,
  TreeIcon,
  TestTubeIcon,
  PackageIcon,
  BugIcon,
  TerminalWindowIcon,
  GitlabLogoIcon,
  TimerIcon,
  FigmaLogoIcon,
  BrowsersIcon,
} from '@phosphor-icons/react';
import { GlareCard } from '@components/customs/aceternity';
import { getYearsOfExperience } from '@utils/core/career';

/* ─── Data ─── */
interface SkillTag {
  label: string;
  icon: ReactNode;
}

interface ArsenalPanel {
  titleKey: string;
  icon: ReactNode;
  accentClass: string;
  accentGradient: string;
  glareColor: string;
  chipStyle: string;
  skills: SkillTag[];
}

const arsenalPanels: ArsenalPanel[] = [
  {
    titleKey: 'skills.coreFrontend',
    icon: <CodeBlockIcon weight='duotone' />,
    accentClass: 'text-ct-secondary',
    accentGradient: 'from-ct-secondary/80 to-ct-secondary/30',
    glareColor: 'rgba(78, 222, 163, 0.10)',
    chipStyle:
      'bg-ct-secondary/8 text-ct-secondary border-ct-secondary/15 hover:bg-ct-secondary/15',
    skills: [
      { label: 'React (3+ years)', icon: <AtomIcon size={12} weight='bold' /> },
      { label: 'Next.js (SSR)', icon: <GlobeIcon size={12} weight='bold' /> },
      { label: 'TypeScript', icon: <FileTsIcon size={12} weight='bold' /> },
      { label: 'AngularJS', icon: <AngularLogoIcon size={12} weight='bold' /> },
      { label: 'Tailwind CSS', icon: <WindIcon size={12} weight='bold' /> },
      {
        label: 'MUI / Ant Design',
        icon: <PaletteIcon size={12} weight='bold' />,
      },
    ],
  },
  {
    titleKey: 'skills.dataArchitecture',
    icon: <DatabaseIcon weight='duotone' />,
    accentClass: 'text-primary-main',
    accentGradient: 'from-primary-main/80 to-primary-main/30',
    glareColor: 'rgba(208, 188, 255, 0.10)',
    chipStyle:
      'bg-primary-main/8 text-primary-main border-primary-main/15 hover:bg-primary-main/15',
    skills: [
      { label: 'Java (Spring)', icon: <LeafIcon size={12} weight='bold' /> },
      { label: 'PHP (Laravel)', icon: <FileCssIcon size={12} weight='bold' /> },
      {
        label: 'RESTful API',
        icon: <ArrowsClockwiseIcon size={12} weight='bold' />,
      },
      { label: 'PostgreSQL', icon: <DatabaseIcon size={12} weight='bold' /> },
      { label: 'MongoDB', icon: <TreeIcon size={12} weight='bold' /> },
      {
        label: 'Docker / MinIO',
        icon: <PackageIcon size={12} weight='bold' />,
      },
    ],
  },
  {
    titleKey: 'skills.toolingOps',
    icon: <GearSixIcon weight='duotone' />,
    accentClass: 'text-ct-secondary',
    accentGradient: 'from-ct-secondary/80 to-ct-secondary/30',
    glareColor: 'rgba(78, 222, 163, 0.10)',
    chipStyle:
      'bg-ct-secondary/8 text-ct-secondary border-ct-secondary/15 hover:bg-ct-secondary/15',
    skills: [
      {
        label: 'AWS / Vercel',
        icon: <CloudArrowUpIcon size={12} weight='bold' />,
      },
      {
        label: 'GitLab / GitHub',
        icon: <GitlabLogoIcon size={12} weight='bold' />,
      },
      { label: 'ESLint / Prettier', icon: <BugIcon size={12} weight='bold' /> },
      { label: 'Vite / Gradle', icon: <TimerIcon size={12} weight='bold' /> },
      {
        label: 'Postman / Insomnia',
        icon: <TerminalWindowIcon size={12} weight='bold' />,
      },
      {
        label: 'Figma / Notion',
        icon: <FigmaLogoIcon size={12} weight='bold' />,
      },
    ],
  },
  {
    titleKey: 'skills.execution',
    icon: <RocketIcon weight='duotone' />,
    accentClass: 'text-primary-main',
    accentGradient: 'from-primary-main/80 to-primary-main/30',
    glareColor: 'rgba(208, 188, 255, 0.10)',
    chipStyle:
      'bg-primary-main/8 text-primary-main border-primary-main/15 hover:bg-primary-main/15',
    skills: [
      { label: 'Agile / Scrum', icon: <KanbanIcon size={12} weight='bold' /> },
      {
        label: 'CI/CD Pipelines',
        icon: <GitBranchIcon size={12} weight='bold' />,
      },
      { label: 'Jest / RTL', icon: <TestTubeIcon size={12} weight='bold' /> },
      { label: 'Storybook', icon: <BrowsersIcon size={12} weight='bold' /> },
      { label: 'Clean Code', icon: <CheckIcon size={12} weight='bold' /> },
      { label: 'Code Review', icon: <BookOpenIcon size={12} weight='bold' /> },
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
            key={skill.label}
            className={cn(
              'px-3 py-1.5 text-xs font-label-grotesk font-medium rounded-lg border transition-all duration-200 cursor-default flex items-center gap-1.5',
              panel.chipStyle
            )}
          >
            <span className='opacity-70 flex-shrink-0'>{skill.icon}</span>
            {skill.label}
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

/* ─── Animated Counter ─── */
const AnimatedNumber = ({
  target,
  inView,
  suffix = '',
}: {
  target: number;
  inView: boolean;
  suffix?: string;
}) => {
  const { val } = useSpring({
    from: { val: 0 },
    to: { val: inView ? target : 0 },
    config: { tension: 60, friction: 18, clamp: true },
    delay: inView ? 300 : 0,
  });
  return (
    <animated.span>{val.to(v => `${Math.floor(v)}${suffix}`)}</animated.span>
  );
};

/* ─── Main Component ─── */
export const Skills = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3 });

  const trailApi = useSpringRef();
  const trail = useTrail(arsenalPanels.length, {
    ref: trailApi,
    from: { opacity: 0, y: 50, scale: 0.92 },
    to: inView
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 50, scale: 0.92 },
    config: { tension: 160, friction: 22 },
  });

  /* Section header animation */
  const headerApi = useSpringRef();
  const headerSpring = useSpring({
    ref: headerApi,
    from: { opacity: 0, y: 30 },
    to: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    config: { tension: 180, friction: 24 },
  });

  useChain(inView ? [headerApi, trailApi] : [trailApi, headerApi], [0, 0.15]);

  /* Stats strip stagger trail */
  const statsTrail = useTrail(3, {
    from: { opacity: 0, y: 24, scale: 0.9 },
    to: statsInView
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 24, scale: 0.9 },
    config: { tension: 200, friction: 22 },
    delay: 100,
  });

  /* Glow pulse timing */
  const glowSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: statsInView ? 1 : 0 },
    config: { tension: 60, friction: 20 },
    delay: 400,
  });

  const yearsExp = getYearsOfExperience();
  const statsData = [
    { target: 20, suffix: '+', label: t('skills.stats.technologies') },
    { target: yearsExp, suffix: '+', label: t('skills.stats.yearsExp') },
    { target: 6, suffix: '', label: t('skills.stats.productionSystems') },
  ];

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
          <div className='flex items-end gap-6 mb-4'>
            <div className='flex-shrink-0'>
              <h2 className='text-ct-secondary font-label-grotesk text-xs font-black tracking-[0.3em] uppercase mb-2'>
                02 {'// '}
                {t('skills.sectionLabel')}
              </h2>
              <h3 className='font-serif-display text-4xl md:text-5xl text-ct-on-surface'>
                {t('skills.sectionTitle')}
              </h3>
            </div>
            <div
              className='hidden md:block h-[2px] flex-grow'
              style={{
                background: 'linear-gradient(to right, #4edea3, transparent)',
              }}
            />
          </div>
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
        <div ref={statsRef} className='mt-20 relative'>
          {/* Ambient glow behind stats */}
          <animated.div
            style={{ opacity: glowSpring.opacity }}
            className='absolute inset-0 -z-10 flex items-center justify-center pointer-events-none'
          >
            <div className='w-[400px] h-[100px] bg-primary-main/6 rounded-full blur-[60px]' />
          </animated.div>

          <div className='flex flex-wrap items-center justify-center gap-0'>
            {statsData.map((stat, i) => (
              <animated.div
                key={stat.label}
                style={{
                  opacity: statsTrail[i].opacity,
                  transform: statsTrail[i].y.to(
                    y =>
                      `translateY(${y}px) scale(${statsTrail[i].scale.get()})`
                  ),
                }}
                className='flex items-stretch'
              >
                <div className='text-center group px-10 md:px-16 py-2 relative cursor-default'>
                  {/* Hover highlight */}
                  <div className='absolute inset-0 rounded-lg bg-primary-main/0 group-hover:bg-primary-main/5 transition-colors duration-500' />

                  {/* Counter value */}
                  <div className='font-serif-display text-4xl md:text-5xl text-ct-on-surface tracking-tight group-hover:text-primary-main transition-colors duration-300 relative z-10 tabular-nums'>
                    {statsInView ? (
                      <AnimatedNumber
                        target={stat.target}
                        inView={statsInView}
                        suffix={stat.suffix}
                      />
                    ) : (
                      `0${stat.suffix}`
                    )}
                  </div>

                  {/* Label */}
                  <div className='text-[10px] text-ct-outline font-label-grotesk tracking-[0.2em] uppercase mt-2 relative z-10 group-hover:text-ct-on-surface-variant transition-colors duration-300'>
                    {stat.label}
                  </div>

                  {/* Bottom accent on hover */}
                  <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-ct-secondary group-hover:w-8 transition-all duration-300 rounded-full' />
                </div>

                {/* Vertical separator between items */}
                {i < statsData.length - 1 && (
                  <animated.div
                    style={{ opacity: glowSpring.opacity }}
                    className='self-center w-px h-10 bg-gradient-to-b from-transparent via-ct-surface-container-highest to-transparent'
                  />
                )}
              </animated.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
