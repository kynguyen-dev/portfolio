import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring as fmSpring,
} from 'motion/react';
import { animated, useSpring, useTrail } from '@react-spring/web';
import { useTranslation } from 'react-i18next';
import { APP_PAGES } from '@constants';
import { useInView } from '@utils/animations/springVariants';
import { Terminal, ImagesBadge } from '@components/customs/aceternity';

/* Badge images for CTA hover effect */
const ctaBadgeImages = [
  '/icons/developer.png',
  '/icons/dashboard-icon.png',
  '/icons/medicare-icon.png',
  '/icons/air-conditioner.png',
];

/* ─── Work History Data ─── */
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
  {
    company: 'Freelance',
    role: 'Web Developer',
    period: 'Jun 2021 — Nov 2021',
    description:
      'Delivered custom web solutions for small businesses, including responsive landing pages, e-commerce storefronts, and CMS integrations with a focus on performance and SEO.',
    technologies: ['HTML/CSS', 'JavaScript', 'WordPress', 'Firebase'],
  },
];

export const Intro = () => {
  const { t } = useTranslation();

  /* ─── Scroll & Parallax Setup ─── */
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };
  const smoothProgress = fmSpring(scrollYProgress, springConfig);

  // 1. Hero Content fades out & translates up (0 to 0.15)
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const heroTranslateY = useTransform(smoothProgress, [0, 0.15], [0, -300]);
  // Use a string-returning function to hide the hero completely when faded out
  const heroDisplay = useTransform(scrollYProgress, v =>
    v > 0.15 ? 'none' : 'flex'
  );

  // 2. Tactical Path Background flattens from 3D (0 to 0.2)
  const rotateX = useTransform(smoothProgress, [0, 0.2], [15, 0]);
  const rotateZ = useTransform(smoothProgress, [0, 0.2], [10, 0]);
  const translateY = useTransform(smoothProgress, [0, 0.2], [50, 0]);
  const pathOpacity = useTransform(smoothProgress, [0, 0.2], [0.2, 1]);

  // 3. Tactical Path Header fades in (0.1 to 0.2)
  const headerOpacity = useTransform(smoothProgress, [0.1, 0.2], [0, 1]);
  const headerDisplay = useTransform(scrollYProgress, v =>
    v < 0.05 ? 'none' : 'block'
  );

  // 4. Tactical Path Horizontal Scroll (0.2 to 1.0)
  const totalPages = Math.ceil(workHistory.length / 2);
  const scrollEndPercent = totalPages > 1 ? `-${((totalPages - 1) / totalPages) * 100}%` : '0%';
  const x = useTransform(smoothProgress, [0.2, 1], ['0%', scrollEndPercent]);

  /* ─── Intro Mount Animations (React-Spring) ─── */
  const statusSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    delay: 200,
  });

  const headingSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 400,
  });


  const ctaSpring = useSpring({
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    delay: 1000,
    config: { tension: 180, friction: 20 },
  });


  /* ─── Accent Cards Mount Animations ─── */
  const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.15 });
  const gridTrail = useTrail(2, {
    from: { opacity: 0, y: 40, scale: 0.95 },
    to: gridInView
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 40, scale: 0.95 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <section id={APP_PAGES.HOME.toLowerCase()}>
      {/* 500vh container houses both Hero and Tactical Path */}
      <div
        ref={containerRef}
        className='h-[500vh] relative antialiased'
      >
        {/* Sticky viewport container */}
        <div className='sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center [perspective:1000px]'>
          {/* Topology Grid Background */}
          <div className='absolute inset-0 topology-grid opacity-20 pointer-events-none' />

          {/* =========================================
              HERO FOREGROUND LAYER
              ========================================= */}
          <motion.div
            style={{
              opacity: heroOpacity,
              y: heroTranslateY,
              display: heroDisplay,
            }}
            className='absolute inset-0 z-30 flex justify-center items-center px-4 md:px-8'
          >
            <div className='w-full max-w-4xl flex flex-col items-center mx-auto relative'>
              {/* Floating Data Node */}
              <animated.div
                style={statusSpring}
                className='absolute -top-12 right-0 lg:right-12 glass-panel p-4 rounded-xl hidden md:flex flex-col gap-1 z-10'
              >
                <div className='flex items-center gap-2 text-ct-secondary text-[10px] font-bold tracking-tighter'>
                  <span className='w-2 h-2 rounded-full bg-ct-secondary animate-pulse' />
                  {t('intro.systemStatus')}
                </div>
                <div className='text-[10px] text-ct-outline font-label-grotesk opacity-60'>
                  10.7627° N, 106.6602° E
                </div>
              </animated.div>

              {/* Hero Headline */}
              <animated.div style={statusSpring} className='text-center mb-2'>
                <span className='inline-flex items-center gap-2 px-4 py-1.5 bg-ct-secondary/5 border border-ct-secondary/15 rounded-full text-ct-secondary text-[11px] font-label-grotesk font-bold tracking-[0.2em] uppercase'>
                  <span className='w-1.5 h-1.5 rounded-full bg-ct-secondary animate-pulse' />
                  Establishing Connection...
                </span>
              </animated.div>

              <animated.div style={headingSpring} className='text-center mb-10'>
                <h1 className='font-serif-display text-5xl md:text-7xl lg:text-8xl text-ct-secondary tracking-tighter leading-none mb-4'>
                  {'> '}{t('intro.heroTitle')}
                  <br className='hidden md:block' />
                  <span className='text-ct-on-surface opacity-90 italic'>
                    {t('intro.heroTitleAccent')}
                  </span>
                </h1>
                <p className='max-w-2xl mx-auto text-base md:text-lg text-ct-on-surface-variant/60 font-label-grotesk tracking-wide'>
                  {t('intro.heroSubtitle')}
                </p>
              </animated.div>

              {/* Terminal HUD */}
              <animated.div style={ctaSpring} className='w-full'>
                <Terminal
                  username='kynguyen.dev'
                  enableSound={false}
                  typingSpeed={40}
                  delayBetweenCommands={600}
                  initialDelay={1200}
                  commands={[
                    'whoami',
                    'cat skills.txt',
                    'curl -s https://status.kynguyen.dev/ping',
                  ]}
                  outputs={{
                    0: [
                      '> Ky Nguyen — Full-Stack Developer',
                      '> Synthesizing Architecture into PURE_LOGIC',
                      '',
                      'Strategic full-stack engineer specializing in the',
                      'intersection of high-performance technical systems',
                      'and elite aesthetic execution.',
                    ],
                    1: [
                      '╔══════════════════════════════════════╗',
                      '║  CORE_STACK                          ║',
                      '╠══════════════════════════════════════╣',
                      '║  React · TypeScript · Next.js        ║',
                      '║  Java · Spring Boot · TanStack       ║',
                      '║  Tailwind CSS · Storybook · Vite     ║',
                      '╚══════════════════════════════════════╝',
                    ],
                    2: [
                      '{ "status": "ONLINE", "latency": "12ms" }',
                      '✓ All systems operational.',
                    ],
                  }}
                  className='max-w-4xl'
                />
              </animated.div>

              {/* CTA Buttons */}
              <animated.div
                style={ctaSpring}
                className='mt-10 flex flex-col md:flex-row items-center justify-center gap-6'
              >
                <ImagesBadge
                  images={ctaBadgeImages}
                  href='#contact'
                  hoverSpread={28}
                  hoverRotation={14}
                  hoverTranslateY={-35}
                  imageSize={34}
                  className='group relative px-8 py-4 bg-primary-main text-ct-on-primary font-bold rounded-lg overflow-hidden transition-all active:scale-95 shadow-[0_0_20px_rgba(208,188,255,0.3)] inline-flex items-center gap-2'
                >
                  {t('nav.initContact')}
                </ImagesBadge>
                <ImagesBadge
                  images={ctaBadgeImages.slice(0, 3)}
                  href='#projects'
                  hoverSpread={22}
                  hoverRotation={10}
                  hoverTranslateY={-30}
                  imageSize={30}
                  className='px-8 py-4 border border-ct-secondary/30 text-ct-secondary font-bold rounded-lg hover:bg-ct-secondary/5 transition-all inline-flex items-center gap-2'
                >
                  VIEW_MANIFESTO
                </ImagesBadge>
              </animated.div>
            </div>
          </motion.div>

          {/* =========================================
              TACTICAL PATH BACKGROUND & HORIZONTAL SCROLL
              ========================================= */}
          <motion.div
            style={{
              rotateX,
              rotateZ,
              translateY,
              opacity: pathOpacity,
            }}
            className='absolute inset-0 z-10 w-full h-full flex items-center [transform-style:preserve-3d]'
          >
            {/* Tactical Path Heading */}
            <motion.div
              style={{ opacity: headerOpacity, display: headerDisplay }}
              className='absolute top-24 left-8 lg:left-16 z-20 pointer-events-none'
            >
              <h2 className='text-ct-secondary font-label-grotesk text-xs font-black tracking-[0.3em] uppercase mb-2'>
                01 {'// '}THE_EVOLUTION
              </h2>
              <h3 className='font-serif-display text-4xl md:text-5xl text-ct-on-surface'>
                TACTICAL_PATH
              </h3>
            </motion.div>

            {/* Horizontal Scrolling Grid */}
            <motion.div
              style={{ x, width: `${totalPages * 100}vw` }}
              className='relative flex items-center h-full mt-16 pointer-events-auto'
            >
              {/* S-Curve Tracing Beam — one cycle per viewport */}
              {(() => {
                const segW = 1000 / totalPages;
                let d = '';
                for (let p = 0; p < totalPages; p++) {
                  const x0 = p * segW;
                  const x1 = (p + 1) * segW;
                  const goingDown = p % 2 === 0;
                  const y0 = goingDown ? 50 : 350;
                  const y1 = goingDown ? 350 : 50;
                  if (p === 0) d += `M${x0},${y0}`;
                  d += ` C${x0 + segW * 0.35},${y0} ${x0 + segW * 0.65},${y1} ${x1},${y1}`;
                }
                return (
                  <svg
                    className='absolute top-1/2 left-0 w-full h-[500px] -translate-y-1/2 pointer-events-none z-0'
                    preserveAspectRatio='none'
                    viewBox='0 0 1000 400'
                  >
                    <path className='opacity-40' d={d} fill='none' stroke='#4edea3' strokeWidth='2' strokeDasharray='8 4' style={{ animation: 'pulse-beam 3s infinite linear' }} />
                    <path className='opacity-70' d={d} fill='none' stroke='#4edea3' strokeWidth='0.8' />
                    <path className='opacity-10' d={d} fill='none' stroke='#4edea3' strokeWidth='8' filter='blur(4px)' />
                  </svg>
                );
              })()}

              {/* History Cards — dynamic pages, 2 cards each */}
              {Array.from({ length: totalPages }, (_, pageIdx) => {
                const startIdx = pageIdx * 2;
                const pageEntries = workHistory.slice(startIdx, startIdx + 2);
                const goingDown = pageIdx % 2 === 0;
                return (
                  <div
                    key={pageIdx}
                    className='w-screen shrink-0 flex items-center justify-evenly h-full px-8 lg:px-16'
                  >
                    {pageEntries.map((entry, i) => {
                      const globalIdx = startIdx + i;
                      // Card position within the page curve (0 = start, 1 = end)
                      const t = pageEntries.length > 1 ? i / (pageEntries.length - 1) : 0.5;
                      // Follow the S-curve: goingDown → first card high, second card low
                      const yOffset = goingDown
                        ? -100 + t * 200   // −100 → +100
                        : 100 - t * 200;    // +100 → −100
                      return (
                        <div
                          key={`${entry.company}-${entry.period}`}
                          className='w-[90vw] md:w-[840px] shrink-0 relative z-10'
                          style={{ transform: `translateY(${yOffset}px)` }}
                        >
                          <div
                            className='glass-panel p-14 rounded-3xl border-2 border-primary-main/40 shadow-[0_0_30px_rgba(208,188,255,0.15)] relative overflow-hidden hover:border-primary-main/80 transition-all duration-500 group'
                            style={{
                              animation: `float 6s ease-in-out infinite${
                                globalIdx % 2 !== 0 ? ' -3s' : ''
                              }`,
                            }}
                          >
                            <div
                              className={`absolute ${
                                globalIdx % 2 === 0 ? '-top-10 -right-10' : '-bottom-10 -left-10'
                              } w-32 h-32 bg-primary-main/10 rounded-full blur-3xl group-hover:bg-primary-main/20 transition-all`}
                            />
                            <div className='text-ct-secondary font-label-grotesk text-base mb-5 tracking-widest'>
                              [ {entry.period.toUpperCase()} ]
                            </div>
                            <h4 className='text-4xl font-bold text-ct-on-surface mb-4 tracking-tight'>
                              {entry.role}
                            </h4>
                            <div className='text-sm text-ct-outline uppercase tracking-widest mb-5'>
                              {entry.company}
                            </div>
                            <p className='text-ct-on-surface-variant text-lg leading-relaxed mb-10'>
                              {entry.description}
                            </p>
                            <div className='flex flex-wrap gap-2'>
                              {entry.technologies.map(tech => (
                                <span
                                  key={tech}
                                  className='px-3 py-1.5 bg-ct-surface-container text-primary-main text-xs font-bold rounded border border-primary-main/20'
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
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ─── Accent Cards Grid ─── */}
      <div
        ref={gridRef}
        className='grid grid-cols-1 md:grid-cols-2 gap-6 px-8 lg:px-16 pb-24 pt-24 relative z-10'
      >
        {/* Accent Card — Philosophy */}
        <animated.div
          style={gridTrail[0]}
          className='bg-ct-secondary text-ct-on-secondary p-8 rounded-2xl flex flex-col justify-between items-start md:items-center text-center md:flex-row'
        >
          <div className='mb-4 md:mb-0 text-left'>
            <h4 className='font-black text-2xl tracking-tighter leading-tight'>
              PRECISION
              <br />
              OVER
              <br />
              POLISH.
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
              Successful Missions
            </div>
          </div>
        </animated.div>
      </div>
    </section>
  );
};
