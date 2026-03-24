import { animated, useTrail } from '@react-spring/web';
import { useTranslation } from 'react-i18next';
import { useInView } from '@utils/animations/springVariants';

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
  const { ref: beamRef, inView: beamInView } = useInView({ threshold: 0.1 });
  const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.15 });

  // We animate the first 2 floating nodes + the bento grid items
  const nodeTrail = useTrail(2, {
    from: { opacity: 0, y: 40, scale: 0.9 },
    to: beamInView
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 40, scale: 0.9 },
    config: { tension: 180, friction: 22 },
  });

  const gridTrail = useTrail(workHistory.length + 2, {
    from: { opacity: 0, y: 40, scale: 0.95 },
    to: gridInView
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 40, scale: 0.95 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <section
      id='path'
      aria-label={t('workExperience.heading')}
      className='py-24 px-8 max-w-screen-2xl mx-auto relative'
    >
      {/* ─── Section Header ─── */}
      <div className='flex items-end justify-between mb-16'>
        <div>
          <h2 className='text-ct-secondary font-label-grotesk text-xs font-black tracking-[0.3em] uppercase mb-2'>
            01 {'// '}THE_EVOLUTION
          </h2>
          <h3 className='font-serif-display text-4xl md:text-5xl text-ct-on-surface'>
            {t('workExperience.sectionTitle')}
          </h3>
        </div>
        <div className='hidden md:block h-[1px] flex-grow mx-12 bg-gradient-to-r from-ct-outline-variant/30 to-transparent' />
      </div>

      {/* ─── Tracing Beam + Floating Nodes ─── */}
      <div
        ref={beamRef}
        className='relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center mb-16'
      >
        {/* Aceternity Tracing Beam SVG */}
        <svg
          className='absolute top-0 left-0 w-full h-full pointer-events-none z-0'
          preserveAspectRatio='none'
          viewBox='0 0 1000 400'
        >
          <path
            className='opacity-30'
            d='M0,200 C150,50 350,350 500,200 C650,50 850,350 1000,200'
            fill='none'
            stroke='#4edea3'
            strokeWidth='2'
            strokeDasharray='10 5'
            style={{ animation: 'pulse-beam 3s infinite linear' }}
          />
          <path
            className='opacity-60'
            d='M0,200 C150,50 350,350 500,200 C650,50 850,350 1000,200'
            fill='none'
            stroke='#4edea3'
            strokeWidth='0.5'
          />
        </svg>

        {/* Floating Glassmorphism Data Nodes */}
        <div className='relative z-10 w-full flex flex-col md:flex-row justify-between items-center gap-16 md:gap-8 px-4'>
          {/* Node 01 (latest) */}
          <animated.div
            style={nodeTrail[0]}
            className='w-full max-w-md'
            // Float animation via CSS
          >
            <div
              className='glass-panel p-8 rounded-2xl border-2 border-primary-main/40 shadow-[0_0_30px_rgba(208,188,255,0.15)] relative overflow-hidden hover:border-primary-main/80 transition-all duration-500 group'
              style={{ animation: 'float 6s ease-in-out infinite' }}
            >
              <div className='absolute -top-10 -right-10 w-32 h-32 bg-primary-main/10 rounded-full blur-3xl group-hover:bg-primary-main/20 transition-all' />
              <div className='text-ct-secondary font-label-grotesk text-sm mb-4 tracking-widest'>
                [ {workHistory[0].period.toUpperCase()} ]
              </div>
              <h4 className='text-2xl font-bold text-ct-on-surface mb-3 tracking-tight'>
                {workHistory[0].role}
              </h4>
              <div className='text-xs text-ct-outline uppercase tracking-widest mb-4'>
                {workHistory[0].company}
              </div>
              <p className='text-ct-on-surface-variant text-sm leading-relaxed mb-6'>
                {workHistory[0].description}
              </p>
              <div className='flex flex-wrap gap-2'>
                {workHistory[0].technologies.map(tech => (
                  <span
                    key={tech}
                    className='px-2 py-1 bg-ct-surface-container text-primary-main text-[10px] font-bold rounded border border-primary-main/20'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </animated.div>

          {/* Node 02 (offset) */}
          <animated.div
            style={nodeTrail[1]}
            className='w-full max-w-md md:mt-32'
          >
            <div
              className='glass-panel p-8 rounded-2xl border-2 border-primary-main/40 shadow-[0_0_30px_rgba(208,188,255,0.15)] relative overflow-hidden hover:border-primary-main/80 transition-all duration-500 group'
              style={{
                animation: 'float 6s ease-in-out infinite',
                animationDelay: '-3s',
              }}
            >
              <div className='absolute -bottom-10 -left-10 w-32 h-32 bg-primary-main/10 rounded-full blur-3xl group-hover:bg-primary-main/20 transition-all' />
              <div className='text-ct-secondary font-label-grotesk text-sm mb-4 tracking-widest'>
                [ {workHistory[1].period.toUpperCase()} ]
              </div>
              <h4 className='text-2xl font-bold text-ct-on-surface mb-3 tracking-tight'>
                {workHistory[1].role}
              </h4>
              <div className='text-xs text-ct-outline uppercase tracking-widest mb-4'>
                {workHistory[1].company}
              </div>
              <p className='text-ct-on-surface-variant text-sm leading-relaxed mb-6'>
                {workHistory[1].description}
              </p>
              <div className='flex flex-wrap gap-2'>
                {workHistory[1].technologies.map(tech => (
                  <span
                    key={tech}
                    className='px-2 py-1 bg-ct-surface-container text-primary-main text-[10px] font-bold rounded border border-primary-main/20'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </animated.div>
        </div>
      </div>

      {/* ─── Bento Grid ─── */}
      <div ref={gridRef} className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        {workHistory.slice(2).map((entry, index) => (
          <animated.div
            key={`${entry.company}-${entry.period}`}
            style={gridTrail[index]}
            className='md:col-span-2 bg-ct-surface-container-low p-8 rounded-2xl hover:bg-ct-surface-container-high transition-colors duration-300 group'
          >
            <div className='text-ct-secondary font-label-grotesk text-sm mb-4 tracking-wider'>
              {entry.period}
            </div>
            <h4 className='text-xl font-bold mb-1 text-ct-on-surface'>
              {entry.role}
            </h4>
            <p className='text-primary-main text-sm font-semibold mb-4'>
              {entry.company}
            </p>
            <p className='text-ct-on-surface-variant text-sm leading-relaxed mb-6'>
              {entry.description}
            </p>
            <div className='flex flex-wrap gap-2'>
              {entry.technologies.map(tech => (
                <span
                  key={tech}
                  className='text-[10px] font-label-grotesk px-2.5 py-1 bg-primary-main/5 text-primary-main uppercase tracking-wider'
                >
                  {tech}
                </span>
              ))}
            </div>
          </animated.div>
        ))}

        {/* Accent Card — Philosophy */}
        <animated.div
          style={gridTrail[workHistory.length]}
          className='md:col-span-1 bg-ct-secondary text-ct-on-secondary p-8 rounded-2xl flex flex-col justify-between'
        >
          <h4 className='font-black text-2xl tracking-tighter leading-tight'>
            PRECISION
            <br />
            OVER
            <br />
            POLISH.
          </h4>
          <span className='self-end text-2xl'>✦</span>
        </animated.div>

        {/* Accent Card — Stats */}
        <animated.div
          style={gridTrail[workHistory.length + 1]}
          className='md:col-span-1 bg-ct-surface-container-low p-8 rounded-2xl border-l-2 border-ct-secondary/20'
        >
          <div className='text-3xl font-serif-display italic mb-2'>
            {workHistory.length}+
          </div>
          <div className='text-[10px] text-ct-outline uppercase tracking-widest'>
            Successful Missions
          </div>
        </animated.div>
      </div>
    </section>
  );
};
