import { X, ArrowsLeftRight } from '@phosphor-icons/react';
import { animated, useSpring } from '@react-spring/web';
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
import { cn } from '@utils/core/cn';
import {
  SpotlightCard,
  TextGenerateEffect,
} from '@components/customs/aceternity';

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

  const fadeSlide = useSpring({
    from: { opacity: 0, x: 40 },
    to: { opacity: 1, x: 0 },
    config: { tension: 280, friction: 60 },
  });

  const avatarSpring = useSpring({
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    delay: 150,
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div
      style={fadeSlide}
      className='flex-1 min-h-0 overflow-auto py-4 px-2'
    >
      <SpotlightCard
        className='w-full border-none bg-transparent'
        spotlightColor={`${km.color}20`}
      >
        <div className='glass-panel rounded-3xl overflow-hidden relative ambient-shadow'>
          {/* ── Hero banner with background ── */}
          <div className='relative h-60 md:h-72 overflow-hidden'>
            <MultiFormatImage
              basePath={`/images/three-kingdoms/background/${character.id}`}
              className='absolute inset-0 w-full h-full object-cover object-center md:object-[center_20%]'
            />

            <div
              className={cn(
                'absolute inset-0',
                isLight
                  ? 'bg-gradient-to-b from-transparent via-white/40 to-white/95'
                  : 'bg-gradient-to-b from-transparent via-ct-bg/40 to-ct-bg/95'
              )}
            />

            <div
              className='absolute top-0 left-0 right-0 h-1.5'
              style={{
                background: `linear-gradient(90deg, ${km.color}, ${km.color}80, transparent)`,
              }}
            />

            <button
              onClick={onClose}
              aria-label='Close detail'
              className='absolute top-4 right-4 z-10 p-2.5 rounded-2xl glass-panel hover:bg-ct-surface-container-highest transition-all duration-300 active:scale-90'
            >
              <X size={20} weight='bold' className='text-ct-on-surface' />
            </button>

            <div className='absolute bottom-6 left-6 md:left-10 right-6 md:right-10 z-10 flex items-end gap-6'>
              <animated.div style={avatarSpring}>
                <div
                  className='w-24 h-24 md:w-32 md:h-32 rounded-full glass-panel overflow-hidden flex-shrink-0 flex items-center justify-center p-1 primary-glow'
                  style={{ borderColor: `${km.color}80` }}
                >
                  <MultiFormatImage
                    basePath={`/images/three-kingdoms/avatar/${character.id}`}
                    alt={character.name.en}
                    className='w-full h-full rounded-full object-cover'
                    fallback={
                      <PFTypography
                        variant='h2'
                        className='font-black'
                        style={{ color: km.color }}
                      >
                        {character.name.cn.charAt(0)}
                      </PFTypography>
                    }
                  />
                </div>
              </animated.div>

              <div className='pb-2'>
                <PFTypography
                  variant='h3'
                  className='font-serif-display font-black tracking-tight uppercase'
                  style={{ color: km.color }}
                >
                  {character.name.cn}
                </PFTypography>
                <PFTypography
                  variant='subtitle1'
                  className='font-black text-ct-on-surface-variant uppercase tracking-widest text-xs mt-1'
                >
                  {character.name.vi}{' '}
                  <span className='mx-2 opacity-30'>{'//'}</span>{' '}
                  {character.name.en}
                </PFTypography>
              </div>
            </div>
          </div>

          {/* ── Body content ── */}
          <div className='p-6 md:p-10 pt-8'>
            <div className='flex flex-row flex-wrap gap-3 mb-10'>
              <span
                className='px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] glass-panel'
                style={{ color: km.color, borderColor: `${km.color}30` }}
              >
                {km.name.en}
              </span>
              <span className='px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] glass-panel text-ct-secondary border-ct-secondary/20'>
                📍 {character.hometown}
              </span>
              <span className='px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] glass-panel text-ct-secondary border-ct-secondary/20'>
                ⚔️ {character.weapon}
              </span>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
              <div className='max-w-sm mx-auto w-full'>
                <div className='p-6 rounded-3xl border border-ct-outline-variant/10'>
                  <StatsRadarChart
                    stats={character.stats}
                    color={km.color}
                    label={character.name.en}
                  />
                </div>
              </div>

              <div className='flex flex-col gap-5 w-full'>
                <h2 className='text-ct-secondary text-[10px] font-black tracking-[0.3em] uppercase mb-2'>
                  01 // STATISTICAL_ANALYSIS
                </h2>
                {STAT_KEYS.map(key => (
                  <StatBar
                    key={key}
                    label={STAT_LABELS[key].en}
                    value={character.stats[key]}
                    color={km.color}
                  />
                ))}

                <div className='mt-8'>
                  <h2 className='text-ct-secondary text-[10px] font-black tracking-[0.3em] uppercase mb-4'>
                    02 // ARCHIVE_BIOGRAPHY
                  </h2>
                  <TextGenerateEffect
                    words={character.bio}
                    className='text-ct-on-surface-variant leading-relaxed font-medium text-sm'
                  />
                </div>

                <div className='mt-8 flex justify-end'>
                  <button
                    onClick={() => onCompare(character)}
                    className='inline-flex items-center gap-3 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 group glass-panel border-ct-secondary/30 text-ct-secondary hover:bg-ct-secondary hover:text-ct-on-secondary primary-glow'
                  >
                    <ArrowsLeftRight
                      size={18}
                      weight='bold'
                      className='transition-transform group-hover:rotate-180'
                    />
                    Initiate Duel Simulation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SpotlightCard>
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
    config: { tension: 120, friction: 14 },
  });

  return (
    <div className='flex flex-col gap-1.5'>
      <div className='flex justify-between items-center px-1'>
        <span className='text-[10px] font-black text-ct-on-surface-variant uppercase tracking-widest'>
          {label}
        </span>
        <span className='text-[10px] font-black tabular-nums' style={{ color }}>
          {value}%
        </span>
      </div>
      <div className='h-1.5 rounded-full bg-ct-surface-container-highest/10 overflow-hidden glass-panel border-none'>
        <animated.div
          style={{
            ...spring,
            background: `linear-gradient(90deg, ${color}AA, ${color})`,
            boxShadow: `0 0 8px ${color}40`,
          }}
          className='h-full rounded-full'
        />
      </div>
    </div>
  );
};
