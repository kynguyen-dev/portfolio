import { X, ArrowRightLeft } from 'lucide-react';
import { animated, useSpring, to } from '@react-spring/web';
import { PFTypography } from '@components/core';
import { StatsRadarChart } from './StatsRadarChart';
import { MultiFormatImage } from './MultiFormatImage';
import {
  getKingdomMeta,
  STAT_LABELS,
  STAT_KEYS,
} from '@constants/three-kingdoms';
import type { ThreeKingdomsCharacter } from '@constants/three-kingdoms';
import { useThemeMode } from '@contexts/theme-mode';
import { useRef } from 'react';

interface CharacterDetailProps {
  character: ThreeKingdomsCharacter;
  onClose: () => void;
  onCompare: (character: ThreeKingdomsCharacter) => void;
}

export const CharacterDetail = ({
  character,
  onClose,
  onCompare,
}: CharacterDetailProps) => {
  const { mode } = useThemeMode();
  const isLight = mode === 'light';
  const km = getKingdomMeta(character.kingdom);

  // Ink Reveal Entry Animation
  const inkReveal = useSpring({
    from: { opacity: 0, scale: 0.9, filter: 'blur(20px)', y: 20 },
    to: { opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 },
    config: { tension: 120, friction: 20 },
  });

  const avatarSpring = useSpring({
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    delay: 150,
    config: { duration: 350 },
  });

  // Magnetic Button Effect
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [{ mx, my }, magneticApi] = useSpring(() => ({ mx: 0, my: 0 }));

  const handleMagneticMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic pull (max factor 0.2)
    magneticApi.start({ mx: distanceX * 0.2, my: distanceY * 0.2 });
  };

  const resetMagnetic = () => magneticApi.start({ mx: 0, my: 0 });

  return (
    <animated.div
      style={inkReveal}
      className='flex-1 min-h-0 overflow-auto @container'
    >
      <div className='rounded-3xl border border-ct-outline-variant/20 overflow-hidden relative shadow-2xl transition-all duration-300 bg-ct-surface-container-lowest/50'>
        {/* ── Hero banner with background ── */}
        <div
          className='relative h-52 @md:h-64 overflow-hidden'
          style={{
            background: `linear-gradient(135deg, ${km.color}30 0%, ${
              isLight ? 'var(--sys-surface-container-low)' : 'var(--sys-bg)'
            } 60%, ${km.color}15 100%)`,
          }}
        >
          <MultiFormatImage
            basePath={`/images/three-kingdoms/background/${character.id}`}
            className='absolute inset-0 w-full h-full object-cover object-center @md:object-[center_20%]'
          />

          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-ct-surface-container-lowest/60 to-ct-surface-container-lowest/95' />

          <div
            className='absolute top-0 left-0 right-0 h-1'
            style={{
              background: `linear-gradient(90deg, ${km.color}, ${km.color}80, transparent)`,
            }}
          />

          <button
            onClick={onClose}
            aria-label='Close detail'
            className='absolute top-3 right-3 z-10 p-2 rounded-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 bg-ct-surface-container-lowest/50 text-ct-secondary hover:bg-ct-surface-container-lowest/80'
          >
            <X className='w-5 h-5' />
          </button>

          <div className='absolute bottom-4 left-4 @md:left-7 right-4 @md:right-7 z-10 flex items-end gap-4'>
            <animated.div style={avatarSpring}>
              <div
                className='w-20 h-20 @md:w-24 @md:h-24 rounded-full border-2 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-lg'
                style={{
                  borderColor: km.color,
                  boxShadow: `0 4px 20px ${km.color}40`,
                  backgroundColor: `${km.color}20`,
                }}
              >
                <MultiFormatImage
                  basePath={`/images/three-kingdoms/avatar/${character.id}`}
                  alt={character.name.en}
                  className='w-full h-full object-cover'
                  fallback={
                    <PFTypography
                      variant='h3'
                      className='font-extrabold'
                      style={{ color: km.color }}
                    >
                      {character.name.cn.charAt(0)}
                    </PFTypography>
                  }
                />
              </div>
            </animated.div>

            <div className='pb-1'>
              <PFTypography
                variant='h4'
                className='font-extrabold tracking-tight'
                style={{
                  color: km.color,
                  textShadow: isLight
                    ? '0 1px 8px rgba(255,255,255,0.8)'
                    : '0 1px 8px rgba(0,0,0,0.6)',
                }}
              >
                {character.name.cn}
              </PFTypography>
              <PFTypography
                variant='subtitle1'
                className='font-medium opacity-90 text-ct-on-surface'
                style={{
                  textShadow: isLight
                    ? '0 1px 4px rgba(255,255,255,0.6)'
                    : '0 1px 4px rgba(0,0,0,0.5)',
                }}
              >
                {character.name.vi} · {character.name.en}
              </PFTypography>
            </div>
          </div>
        </div>

        {/* ── Body content ── */}
        <div className='backdrop-blur-2xl p-6 @md:p-10 pt-4 @md:pt-6 bg-ct-surface-container-lowest/80'>
          <div className='flex flex-row flex-wrap gap-2 mb-8'>
            <span
              className='px-3 py-1 rounded-full text-xs font-bold'
              style={{
                backgroundColor: `${km.color}18`,
                color: km.color,
                border: `1px solid ${km.color}40`,
              }}
            >
              {km.name.en} ({km.name.cn})
            </span>
            <span className='px-3 py-1 rounded-full text-xs font-medium border border-ct-outline-variant/10 bg-ct-surface-container-low/50'>
              📍 {character.hometown}
            </span>
            <span className='px-3 py-1 rounded-full text-xs font-medium border border-ct-outline-variant/10 bg-ct-surface-container-low/50'>
              ⚔️ {character.weapon}
            </span>
          </div>

          <div className='grid grid-cols-1 @lg:grid-cols-2 gap-10 mb-10'>
            <div className='max-w-xs mx-auto @lg:mx-0'>
              <StatsRadarChart
                stats={character.stats}
                color={km.color}
                label={character.name.en}
              />
            </div>

            <div className='flex flex-col gap-4 justify-center'>
              {STAT_KEYS.map(key => (
                <StatBar
                  key={key}
                  label={STAT_LABELS[key].en}
                  value={character.stats[key]}
                  color={km.color}
                />
              ))}
            </div>
          </div>

          <div className='h-px w-full bg-ct-outline-variant/10 mb-6' />

          <PFTypography
            variant='body2'
            className='text-ct-on-surface-variant leading-relaxed mb-10'
          >
            {character.bio}
          </PFTypography>

          <animated.button
            ref={buttonRef}
            onClick={() => onCompare(character)}
            onMouseMove={handleMagneticMove}
            onMouseLeave={resetMagnetic}
            style={{
              transform: to([mx, my], (x, y) => `translate(${x}px, ${y}px)`),
              color: km.color,
              borderColor: `${km.color}40`,
              backgroundColor: `${km.color}05`,
            }}
            className='inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-shadow hover:shadow-lg active:scale-95 group border'
          >
            <ArrowRightLeft className='w-4 h-4 transition-transform group-hover:rotate-180' />
            Compare with another warrior…
          </animated.button>
        </div>
      </div>
    </animated.div>
  );
};

/** Animated stat bar using react-spring */
const StatBar = ({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) => {
  const spring = useSpring({
    from: { width: '0%' },
    to: { width: `${value}%` },
    config: { duration: 800 },
  });

  return (
    <div className='flex items-center gap-4'>
      <PFTypography
        variant='caption'
        className='w-20 font-bold text-text-secondary text-right uppercase tracking-tighter'
      >
        {label}
      </PFTypography>
      <div className='flex-grow h-2 rounded-full bg-white/10 overflow-hidden'>
        <animated.div
          style={{
            ...spring,
            background: `linear-gradient(90deg, ${color}, ${color}AA)`,
          }}
          className='h-full rounded-full'
        />
      </div>
      <PFTypography
        variant='caption'
        className='w-8 font-extrabold tabular-nums'
      >
        {value}
      </PFTypography>
    </div>
  );
};
