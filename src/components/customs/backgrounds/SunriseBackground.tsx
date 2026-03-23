import { motion } from 'motion/react';
import { useMemo, ReactNode, useEffect, useState } from 'react';
import { useThemeMode } from '@contexts/theme-mode';

/* ───────── Sunrise color tokens ───────── */
const DARK_SKY = {
  top: '#0B0D2E', // deep night sky
  mid: '#1B1145', // dark indigo
  purple: '#4A1942', // twilight purple
  rose: '#8B2252', // dawn rose
  orange: '#D4652A', // sunrise orange
  gold: '#E8A838', // golden horizon
  yellow: '#F5D060', // bright sunlight
  peach: '#FFE4B5', // warm peach glow
};

const LIGHT_SKY = {
  top: '#E8F0F8', // pale blue sky
  mid: '#D6E8F4', // soft sky
  purple: '#C8D8E8', // lavender haze
  rose: '#F0D8C8', // blush
  orange: '#F5D8A8', // warm peach
  gold: '#FAE8B0', // soft gold
  yellow: '#FFF2CC', // cream sunshine
  peach: '#FFF8F0', // near-white cream
};

/* ───────── Floating light mote ───────── */
const LightMote = ({
  size,
  x,
  delay,
  duration,
  color,
}: {
  size: number;
  x: string;
  delay: number;
  duration: number;
  color: string;
}) => (
  <motion.div
    initial={{ y: '100vh', opacity: 0 }}
    animate={{
      y: '-10vh',
      opacity: [0, 0.7, 0.5, 0],
      x: [0, 12, -8, 6, 0],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    className='absolute pointer-events-none'
    style={{
      left: x,
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color}AA, ${color}44, transparent)`,
      filter: `blur(${size > 5 ? 1 : 0}px)`,
    }}
  />
);

/* ───────── Sun component ───────── */
const Sun = ({ sky }: { sky: typeof DARK_SKY }) => (
  <div className='absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0'>
    {/* Outer glow */}
    <motion.div
      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[40px]'
      style={{
        background: `radial-gradient(circle, ${sky.yellow}30, ${sky.orange}15, transparent 70%)`,
      }}
    />
    {/* Mid glow */}
    <motion.div
      animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[20px]'
      style={{
        background: `radial-gradient(circle, ${sky.peach}50, ${sky.gold}30, transparent 70%)`,
      }}
    />
    {/* Core */}
    <motion.div
      animate={{ scale: [1, 1.04, 1] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px] rounded-full blur-[6px]'
      style={{
        background: `radial-gradient(circle, #FFFFFFD0, ${sky.yellow}C0, ${sky.gold}80, transparent)`,
      }}
    />
  </div>
);

/* ───────── Sun-ray component ───────── */
const SunRays = ({ sky }: { sky: typeof DARK_SKY }) => (
  <motion.div
    animate={{ rotate: [0, 360] }}
    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
    className='absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0'
  >
    {Array.from({ length: 12 }, (_, i) => (
      <div
        key={i}
        className='absolute left-1/2 top-1/2 w-[2px] h-[45%] -translate-x-1/2 origin-bottom'
        style={{
          background: `linear-gradient(to top, ${sky.gold}30, transparent)`,
          transform: `translateX(-50%) rotate(${i * 30}deg)`,
        }}
      />
    ))}
  </motion.div>
);

interface SunriseBackgroundProps {
  children: ReactNode;
  sun?: boolean;
  particles?: boolean;
  rays?: boolean;
}

export const SunriseBackground = ({
  children,
  sun = true,
  particles = true,
  rays = true,
}: SunriseBackgroundProps) => {
  const { mode } = useThemeMode();
  const isLight = mode === 'light';
  const SKY = isLight ? LIGHT_SKY : DARK_SKY;

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 600px)');

    setPrefersReducedMotion(motionQuery.matches);
    setIsMobile(mobileQuery.matches);

    const handleMotion = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    const handleMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    motionQuery.addEventListener('change', handleMotion);
    mobileQuery.addEventListener('change', handleMobile);

    return () => {
      motionQuery.removeEventListener('change', handleMotion);
      mobileQuery.removeEventListener('change', handleMobile);
    };
  }, []);

  const moteCount = prefersReducedMotion ? 0 : isMobile ? 10 : 25;
  const showAnimations = !prefersReducedMotion;

  const motes = useMemo(
    () =>
      Array.from({ length: moteCount }, (_, i) => {
        const warm =
          i % 3 === 0 ? SKY.gold : i % 3 === 1 ? SKY.orange : SKY.peach;
        return {
          id: i,
          size: 2 + Math.random() * 5,
          x: `${Math.random() * 100}%`,
          delay: Math.random() * 14,
          duration: 9 + Math.random() * 10,
          color: warm,
        };
      }),
    [moteCount, SKY]
  );

  return (
    <div
      className='relative overflow-hidden min-h-screen'
      style={{
        background: `linear-gradient(180deg, ${SKY.top} 0%, ${SKY.mid} 12%, ${SKY.purple} 25%, ${SKY.rose} 38%, ${SKY.orange} 52%, ${SKY.gold} 66%, ${SKY.yellow} 80%, ${SKY.peach} 100%)`,
      }}
    >
      {/* Animated horizontal colour-shift */}
      {showAnimations && (
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className='absolute inset-0 pointer-events-none'
          style={{
            background: `
              radial-gradient(ellipse at 30% 60%, ${SKY.rose}20 0%, transparent 55%),
              radial-gradient(ellipse at 70% 40%, ${SKY.orange}18 0%, transparent 55%),
              radial-gradient(ellipse at 50% 80%, ${SKY.gold}15 0%, transparent 50%)
            `,
            backgroundSize: '200% 200%',
          }}
        />
      )}

      {/* Subtle noise texture */}
      <div
        className='absolute inset-0 opacity-[0.025] pointer-events-none bg-repeat'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* Sun rays */}
      {rays && showAnimations && <SunRays sky={SKY} />}

      {/* Sun glow */}
      {sun && <Sun sky={SKY} />}

      {/* Floating warm particles */}
      {particles &&
        showAnimations &&
        motes.map(m => (
          <LightMote
            key={m.id}
            size={m.size}
            x={m.x}
            delay={m.delay}
            duration={m.duration}
            color={m.color}
          />
        ))}

      {/* Content */}
      <div className='relative z-10'>{children}</div>
    </div>
  );
};
