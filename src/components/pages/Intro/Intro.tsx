import { animated, useSpring, useTrail } from '@react-spring/web';
import { useTranslation } from 'react-i18next';
import { APP_PAGES } from '@constants';

export const Intro = () => {
  const { t } = useTranslation();

  const techBadges = t('intro.techBadges', { returnObjects: true }) as string[];

  /* ─── Animate on mount ─── */
  const statusSpring = useSpring({
    from: { opacity: 0, y: -20 },
    to: { opacity: 1, y: 0 },
    delay: 200,
    config: { duration: 600 },
  });

  const headingSpring = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 400,
    config: { duration: 800 },
  });

  const subtitleSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 600,
    config: { duration: 600 },
  });

  const ctaSpring = useSpring({
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    delay: 1000,
    config: { tension: 180, friction: 20 },
  });

  const trail = useTrail(Array.isArray(techBadges) ? techBadges.length : 0, {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    delay: 800,
    config: { tension: 170, friction: 26 },
  });

  return (
    <section
      id={APP_PAGES.HOME.toLowerCase()}
      aria-label={t('intro.title')}
      className='relative min-h-screen flex items-center justify-center overflow-hidden bg-ct-surface-container-lowest'
    >
      {/* Topology Grid Background */}
      <div className='absolute inset-0 topology-grid opacity-20' />
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-ct-bg/50 to-ct-bg' />

      {/* Floating Decorative Glows */}
      <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-primary-main/5 rounded-full blur-[120px]' />
      <div className='absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-ct-secondary/5 rounded-full blur-[150px]' />

      {/* Circular Radar Element (Decorative) */}
      <div className='absolute -bottom-24 -left-24 w-64 h-64 border border-ct-outline-variant/10 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]'>
        <div className='w-48 h-48 border-t-2 border-ct-secondary/20 rounded-full' />
      </div>

      <div className='relative z-10 w-full max-w-7xl px-8 flex flex-col items-center'>
        {/* Floating Data Node */}
        <animated.div
          style={statusSpring}
          className='absolute -top-12 right-12 glass-panel p-4 rounded-xl hidden md:flex flex-col gap-1'
        >
          <div className='flex items-center gap-2 text-ct-secondary text-[10px] font-bold tracking-tighter'>
            <span className='w-2 h-2 rounded-full bg-ct-secondary animate-pulse' />
            {t('intro.systemStatus')}
          </div>
          <div className='text-[10px] text-ct-outline font-label-grotesk opacity-60'>
            10.7627° N, 106.6602° E
          </div>
          <div className='mt-2 pt-2 border-t border-ct-outline-variant/30 text-[9px] text-primary-main uppercase tracking-[0.2em]'>
            ARCHITECT_STATUS : ONLINE
          </div>
        </animated.div>

        {/* Main HUD Content */}
        <div className='glass-panel w-full p-12 md:p-20 rounded-[2rem] shadow-2xl relative overflow-hidden'>
          {/* Weaver Progress Bar */}
          <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ct-secondary to-transparent' />

          {/* Title Section */}
          <div className='space-y-6 text-center'>
            <animated.div
              style={statusSpring}
              className='inline-flex items-center gap-2 px-3 py-1 bg-ct-secondary/10 border border-ct-secondary/20 rounded-full text-ct-secondary text-[10px] font-bold tracking-widest uppercase mb-4'
            >
              Establishing Connection...
            </animated.div>

            <animated.h1
              style={headingSpring}
              className='font-serif-display text-5xl md:text-7xl lg:text-8xl text-ct-secondary tracking-tighter leading-none mb-8'
            >
              &gt; {t('intro.heroTitle')} <br className='hidden md:block' />
              <span className='text-ct-on-surface opacity-90 italic'>
                {t('intro.heroTitleAccent')}
              </span>
            </animated.h1>

            <animated.p
              style={subtitleSpring}
              className='max-w-2xl mx-auto text-lg md:text-xl text-ct-on-surface-variant font-light leading-relaxed'
            >
              {t('intro.heroSubtitle')}
            </animated.p>
          </div>

          {/* Tech Tags Matrix */}
          <div className='flex flex-wrap justify-center gap-3 mt-12'>
            {Array.isArray(techBadges) &&
              trail.map((style, i) => (
                <animated.span
                  key={techBadges[i]}
                  style={style}
                  className='px-5 py-2 glass-panel rounded-full text-xs font-medium tracking-wider cursor-default transition-colors hover:bg-primary-main/10 text-primary-main'
                >
                  {techBadges[i]}
                </animated.span>
              ))}
          </div>

          {/* CTA Buttons */}
          <animated.div
            style={ctaSpring}
            className='mt-16 flex flex-col md:flex-row items-center justify-center gap-6'
          >
            <a
              href='#contact'
              className='group relative px-8 py-4 bg-primary-main text-ct-on-primary font-bold rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(208,188,255,0.3)]'
            >
              <span className='relative z-10 flex items-center gap-2'>
                {t('nav.initContact')}
              </span>
            </a>
            <a
              href='#projects'
              className='px-8 py-4 border border-ct-secondary/30 text-ct-secondary font-bold rounded-lg hover:bg-ct-secondary/5 transition-all'
            >
              VIEW_MANIFESTO
            </a>
          </animated.div>
        </div>
      </div>
    </section>
  );
};
