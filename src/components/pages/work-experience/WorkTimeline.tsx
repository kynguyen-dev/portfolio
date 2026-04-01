import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
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

export const WorkTimeline = () => {
  const { t } = useTranslation();
  const workHistory = t('intro.workHistory', {
    returnObjects: true,
  }) as TimelineEntry[];
  const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.15 });

  const stickyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stickyRef,
  });

  // Calculate translation: move left by 75% of its total width
  // (leaving the last 25% visible on screen at the end)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  // We can still use react-spring to fade in the accent cards
  const gridTrail = useTrail(2, {
    from: { opacity: 0, y: 40, scale: 0.95 },
    to: gridInView
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 40, scale: 0.95 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <section id='path' aria-label={t('workExperience.heading')}>
      {/* ─── Scroll-Linked Horizontal Section ─── */}
      <div ref={stickyRef} className='h-[400vh] relative'>
        <div className='sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-24'>
          {/* Header inside sticky container */}
          <div className='flex items-end justify-between mb-8 px-8 lg:px-16 w-full absolute top-24 left-0 z-20 pointer-events-none'>
            <div>
              <h2 className='text-ct-secondary font-label-grotesk text-xs font-black tracking-[0.3em] uppercase mb-2'>
                01 {'// '}
                {t('workExperience.sectionTitle')}
              </h2>
              <h3 className='font-serif-display text-4xl md:text-5xl text-ct-on-surface'>
                {t('nav.experience').toUpperCase().replace(' ', '_')}
              </h3>
            </div>
            <div className='hidden md:block h-[1px] flex-grow mx-12 bg-gradient-to-r from-ct-outline-variant/30 to-transparent' />
          </div>

          <motion.div
            style={{ x }}
            className='relative flex items-center w-[400vw] h-full px-8 lg:px-16 mt-16 pointer-events-auto'
          >
            {/* Aceternity Tracing Beam SVG spanning full width */}
            <svg
              className='absolute top-1/2 left-0 w-full h-[400px] -translate-y-1/2 pointer-events-none z-0'
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

            {/* History Cards */}
            <div className='flex items-center w-full h-full justify-around'>
              {workHistory.map((entry, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={`${entry.company}-${entry.period}`}
                    className={`w-[85vw] md:w-[450px] shrink-0 relative z-10 ${
                      isEven ? 'mb-32' : 'mt-32'
                    }`}
                  >
                    <div
                      className='glass-panel p-8 rounded-2xl border-2 border-primary-main/40 shadow-[0_0_30px_rgba(208,188,255,0.15)] relative overflow-hidden hover:border-primary-main/80 transition-all duration-500 group'
                      style={{
                        animation: `float 6s ease-in-out infinite${
                          isEven ? '' : ' -3s'
                        }`,
                      }}
                    >
                      <div
                        className={`absolute ${
                          isEven ? '-top-10 -right-10' : '-bottom-10 -left-10'
                        } w-32 h-32 bg-primary-main/10 rounded-full blur-3xl group-hover:bg-primary-main/20 transition-all`}
                      />
                      <div className='text-ct-secondary font-label-grotesk text-sm mb-4 tracking-widest'>
                        [ {entry.period.toUpperCase()} ]
                      </div>
                      <h4 className='text-2xl font-bold text-ct-on-surface mb-3 tracking-tight'>
                        {entry.role}
                      </h4>
                      <div className='text-xs text-ct-outline uppercase tracking-widest mb-4'>
                        {entry.company}
                      </div>
                      <p className='text-ct-on-surface-variant text-lg leading-relaxed mb-6'>
                        {entry.description}
                      </p>
                      <div className='flex flex-wrap gap-2'>
                        {entry.technologies.map(tech => (
                          <span
                            key={tech}
                            className='px-2 py-1 bg-ct-surface-container text-primary-main text-[10px] font-bold rounded border border-primary-main/20'
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Accent Cards Grid ─── */}
      <div
        ref={gridRef}
        className='grid grid-cols-1 md:grid-cols-2 gap-6 px-8 lg:px-16 pb-24'
      >
        {/* Accent Card — Philosophy */}
        <animated.div
          style={gridTrail[0]}
          className='bg-ct-secondary text-ct-on-secondary p-8 rounded-2xl flex flex-col justify-between items-start md:items-center text-center md:flex-row'
        >
          <div className='mb-4 md:mb-0 text-left'>
            <h4 className='font-black text-2xl tracking-tighter leading-tight'>
              {t('intro.precisionOverPolish')}
            </h4>
          </div>
          <span className='text-4xl opacity-50 hidden md:block'>✦</span>
        </animated.div>

        {/* Accent Card — Stats */}
        <animated.div
          style={gridTrail[1]}
          className='bg-ct-surface-container-low p-8 rounded-2xl border-l-[6px] border-ct-secondary/40 flex flex-col justify-center relative overflow-hidden group hover:bg-ct-surface-container-high transition-colors'
        >
          <div className='absolute -top-10 -right-10 w-32 h-32 bg-ct-secondary/5 rounded-full blur-3xl group-hover:bg-ct-secondary/10 transition-all' />
          <div className='relative z-10'>
            <div className='text-5xl font-serif-display italic mb-2 text-ct-secondary'>
              {workHistory.length}+
            </div>
            <div className='text-xs text-ct-outline uppercase tracking-widest font-label-grotesk font-black'>
              {t('intro.successfulMissions')}
            </div>
          </div>
        </animated.div>
      </div>
    </section>
  );
};
