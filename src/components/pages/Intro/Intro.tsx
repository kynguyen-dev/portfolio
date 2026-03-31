import { useEffect, useRef, useState } from 'react';
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
import {
  Terminal,
  ImagesBadge,
  ExpandableWorkCard,
  TracingBeam,
  SparklesCore,
  AuroraBackground,
} from '@components/customs/aceternity';
import { ContactDropdown } from '@components/customs/ContactDropdown';

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
  domain?: string;
  teamSize?: string;
  tools?: string[];
  achievements?: string[];
}

export const Intro = () => {
  const { t } = useTranslation();
  const env = import.meta.env.MODE === 'production' ? 'PROD' : 'DEV';
  const workHistory = t('intro.workHistory', {
    returnObjects: true,
  }) as TimelineEntry[];

  /* ─── Detect 2xl+ for scroll-driven animations ─── */
  const [isAbove2xl, setIsAbove2xl] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1536px)');
    setIsAbove2xl(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsAbove2xl(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

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
  const scrollEndPercent =
    totalPages > 1 ? `-${((totalPages - 1) / totalPages) * 100}%` : '0%';
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
    <section
      id={APP_PAGES.HOME.toLowerCase()}
      className='relative'
      style={{ overflowX: 'clip' }}
    >
      {/* 500vh container houses both Hero and Tactical Path */}
      <div ref={containerRef} className='2xl:h-[500vh] relative antialiased'>
        {/* Anchor point for Desktop Experience nav link */}
        <div
          id={isAbove2xl ? 'path' : undefined}
          className='hidden 2xl:block absolute w-full pointer-events-none'
          style={{ top: '80vh' }}
        />
        {/* Sticky viewport container — only sticky on 2xl+ for horizontal scroll */}
        <div className='h-screen 2xl:sticky 2xl:top-0 w-full flex flex-col justify-center [perspective:1000px] overflow-hidden'>
          {/* Aurora Background — ambient purple/mint glow */}
          <AuroraBackground
            className='absolute inset-0 z-0 pointer-events-none'
            showRadialGradient={true}
          >
            <></>
          </AuroraBackground>
          {/* Topology Grid Background */}
          <div className='absolute inset-0 topology-grid opacity-20 pointer-events-none z-[1]' />

          {/* Sparkles ambient background */}
          <div className='absolute inset-0 z-20 pointer-events-none'>
            <SparklesCore
              id='hero-sparkles'
              background='transparent'
              minSize={0.4}
              maxSize={1.4}
              particleDensity={80}
              className='w-full h-full'
              particleColor='#d0bcff'
              speed={2}
            />
          </div>

          {/* =========================================
              HERO FOREGROUND LAYER
              ========================================= */}
          <motion.div
            style={
              isAbove2xl
                ? {
                    opacity: heroOpacity,
                    y: heroTranslateY,
                    display: heroDisplay,
                  }
                : undefined
            }
            className='absolute inset-0 z-30 flex flex-col items-center pt-24 md:pt-32 pb-8 px-4 md:px-8'
          >
            <div className='w-full max-w-4xl flex flex-col items-center mx-auto relative px-2 my-auto'>
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
                <span className='inline-flex items-center gap-2 px-3 py-1.5 bg-ct-secondary/5 border border-ct-secondary/15 rounded-full text-ct-secondary text-[10px] md:text-[11px] font-label-grotesk font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase'>
                  <span className='w-1.5 h-1.5 rounded-full bg-ct-secondary animate-pulse' />
                  {t('intro.establishingConnection')}
                </span>
              </animated.div>

              <animated.div
                style={headingSpring}
                className='text-center mb-4 md:mb-6 lg:mb-10'
              >
                <h1 className='font-serif-display text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-ct-secondary tracking-tighter leading-tight md:leading-none mb-2 md:mb-3 lg:mb-4 break-words'>
                  {'> '}
                  {t('intro.heroTitle')}
                  <br />
                  <span className='text-ct-on-surface opacity-90 italic text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl'>
                    {t('intro.heroTitleAccent')}
                  </span>
                </h1>
                <p className='max-w-2xl mx-auto text-sm md:text-base lg:text-lg text-ct-on-surface-variant/60 font-label-grotesk tracking-wide px-2 md:px-0'>
                  {t('intro.heroSubtitle')}
                </p>
              </animated.div>

              {/* Terminal HUD */}
              <animated.div
                style={ctaSpring}
                className='w-full hidden md:block'
              >
                <Terminal
                  username='kynguyen.dev'
                  title={t('intro.terminal.header')}
                  enableSound={false}
                  typingSpeed={40}
                  delayBetweenCommands={600}
                  initialDelay={1200}
                  commands={[
                    t('intro.terminal.command1'),
                    t('intro.terminal.command2'),
                    t('intro.terminal.command3'),
                    t('intro.terminal.command4'),
                  ]}
                  outputs={{
                    0: t('intro.terminal.output1', {
                      returnObjects: true,
                    }) as string[],
                    1: t('intro.terminal.output2', {
                      returnObjects: true,
                    }) as string[],
                    2: t('intro.terminal.output3', {
                      returnObjects: true,
                    }) as string[],
                    3: t('intro.terminal.output4', {
                      env,
                      returnObjects: true,
                    }) as string[],
                  }}
                  className='max-w-4xl'
                />
              </animated.div>

              {/* CTA Buttons */}
              <animated.div
                style={ctaSpring}
                className='mt-4 md:mt-6 lg:mt-10 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full'
              >
                <ContactDropdown>
                  <ImagesBadge
                    images={ctaBadgeImages}
                    hoverSpread={28}
                    hoverRotation={14}
                    hoverTranslateY={-35}
                    imageSize={34}
                    className='group relative px-8 py-4 bg-primary-main text-ct-on-primary font-bold rounded-lg overflow-hidden transition-all active:scale-95 shadow-[0_0_20px_rgba(208,188,255,0.3)] inline-flex items-center gap-2'
                  >
                    {t('nav.initContact')}
                  </ImagesBadge>
                </ContactDropdown>
                <ImagesBadge
                  images={ctaBadgeImages.slice(0, 3)}
                  onClick={() =>
                    window.open(
                      '/resume/FULL_STACK_DEVELOPER_NGUYEN_TRUONG_KY_CV.pdf',
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                  hoverSpread={22}
                  hoverRotation={10}
                  hoverTranslateY={-30}
                  imageSize={30}
                  className='px-8 py-4 border border-ct-secondary/30 text-ct-secondary font-bold rounded-lg hover:bg-ct-secondary/5 transition-all inline-flex items-center gap-2'
                >
                  {t('intro.downloadCV')}
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
            className='absolute inset-0 z-10 w-full h-full hidden 2xl:flex items-center [transform-style:preserve-3d]'
          >
            {/* Tactical Path Heading */}
            <motion.div
              style={{ opacity: headerOpacity, display: headerDisplay }}
              className='absolute top-24 left-8 lg:left-16 z-20 pointer-events-none'
            >
              <h2 className='text-ct-secondary font-label-grotesk text-xs font-black tracking-[0.3em] uppercase mb-2'>
                01 {'// '}
                {t('workExperience.sectionTitle')}
              </h2>
              <h3 className='font-serif-display text-4xl md:text-5xl text-ct-on-surface'>
                {t('nav.tacticalPath').toUpperCase().replace(' ', '_')}
              </h3>
            </motion.div>

            {/* Horizontal Scrolling Grid Wrapper */}
            <div className='relative w-full h-full overflow-x-clip pointer-events-none'>
              <motion.div
                style={{ x, width: `${totalPages * 100}%` }}
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
                      <path
                        className='opacity-40'
                        d={d}
                        fill='none'
                        stroke='#4edea3'
                        strokeWidth='2'
                        strokeDasharray='8 4'
                        style={{ animation: 'pulse-beam 3s infinite linear' }}
                      />
                      <path
                        className='opacity-70'
                        d={d}
                        fill='none'
                        stroke='#4edea3'
                        strokeWidth='0.8'
                      />
                      <path
                        className='opacity-10'
                        d={d}
                        fill='none'
                        stroke='#4edea3'
                        strokeWidth='8'
                        filter='blur(4px)'
                      />
                    </svg>
                  );
                })()}

                {/* History Cards — dynamic pages, 2 cards each */}
                {Array.from({ length: totalPages }, (_, pageIdx) => {
                  const startIdx = pageIdx * 2;
                  const pageEntries = workHistory.slice(startIdx, startIdx + 2);
                  return (
                    <div
                      key={pageIdx}
                      className='shrink-0 flex items-center justify-evenly h-full px-8 lg:px-16'
                      style={{ width: `${100 / totalPages}%` }}
                    >
                      {pageEntries.map((entry, i) => {
                        const globalIdx = startIdx + i;
                        return (
                          <ExpandableWorkCard
                            key={`${entry.company}-${entry.period}`}
                            entry={entry}
                            index={globalIdx}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Mobile Tactical Path (Tracing Beam) ─── */}
      <div
        id={!isAbove2xl ? 'path' : undefined}
        className='2xl:hidden px-6 pt-16 pb-8 relative z-10'
      >
        <h2 className='text-ct-secondary font-label-grotesk text-xs font-black tracking-[0.3em] uppercase mb-2'>
          01 {'// '}
          {t('workExperience.sectionTitle')}
        </h2>
        <h3 className='font-serif-display text-3xl text-ct-on-surface mb-10'>
          {t('workExperience.heading')}
        </h3>
        <TracingBeam>
          <div className='flex flex-col gap-8 pl-8'>
            {workHistory.map((entry, idx) => (
              <ExpandableWorkCard
                key={`${entry.company}-${entry.period}`}
                entry={entry}
                index={idx}
              />
            ))}
          </div>
        </TracingBeam>
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
            <div className='font-serif-display text-5xl italic mb-2 text-ct-secondary'>
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
