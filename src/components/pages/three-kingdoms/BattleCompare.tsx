import { CaretLeftIcon, ListBulletsIcon } from '@phosphor-icons/react';
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
import { SpotlightCard } from '@components/customs/aceternity';

interface BattleCompareProps {
  fighter1: ThreeKingdomsCharacter;
  fighter2: ThreeKingdomsCharacter;
  onBackToDetail?: (character: ThreeKingdomsCharacter) => void;
  onBackToBrowse?: () => void;
}

const AnimatedBar = ({
  value,
  max,
  color,
  isWinner,
  direction,
}: {
  value: number;
  max: number;
  color: string;
  isWinner: boolean;
  direction: 'left' | 'right';
}) => {
  const spring = useSpring({
    from: { width: '0%' },
    to: { width: `${(value / max) * 100}%` },
    config: { tension: 120, friction: 14 },
  });

  return (
    <animated.div
      style={{
        ...spring,
        background: isWinner
          ? direction === 'left'
            ? `linear-gradient(90deg, ${color}60, ${color})`
            : `linear-gradient(90deg, ${color}, ${color}60)`
          : `${color}40`,
      }}
      className='h-full rounded-full'
    />
  );
};

export const BattleCompare = ({
  fighter1,
  fighter2,
  onBackToDetail,
  onBackToBrowse,
}: BattleCompareProps) => {
  const { mode } = useThemeMode();
  const isLight = mode === 'light';
  const km1 = getKingdomMeta(fighter1.kingdom);
  const km2 = getKingdomMeta(fighter2.kingdom);

  const total1 = STAT_KEYS.reduce((s, k) => s + fighter1.stats[k], 0);
  const total2 = STAT_KEYS.reduce((s, k) => s + fighter2.stats[k], 0);
  const wins1 = STAT_KEYS.filter(
    k => fighter1.stats[k] > fighter2.stats[k]
  ).length;
  const wins2 = STAT_KEYS.filter(
    k => fighter2.stats[k] > fighter1.stats[k]
  ).length;

  const enterSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 280, friction: 60 },
  });

  const avatar1Spring = useSpring({
    from: { scale: 0.7, opacity: 0, x: -30 },
    to: { scale: 1, opacity: 1, x: 0 },
    delay: 100,
    config: { tension: 200, friction: 20 },
  });

  const avatar2Spring = useSpring({
    from: { scale: 0.7, opacity: 0, x: 30 },
    to: { scale: 1, opacity: 1, x: 0 },
    delay: 150,
    config: { tension: 200, friction: 20 },
  });

  const vsSpring = useSpring({
    from: { scale: 0, rotate: -20 },
    to: { scale: 1, rotate: 0 },
    delay: 250,
    config: { tension: 300, friction: 15 },
  });

  const renderAvatar = (
    fighter: ThreeKingdomsCharacter,
    km: ReturnType<typeof getKingdomMeta>,
    size: number
  ) => (
    <div
      className='rounded-full glass-panel overflow-hidden flex items-center justify-center flex-shrink-0 p-1 primary-glow transition-all duration-500 hover:scale-110'
      style={{
        width: size,
        height: size,
        borderColor: `${km.color}80`,
      }}
    >
      <MultiFormatImage
        basePath={`/images/three-kingdoms/avatar/${fighter.id}`}
        alt={fighter.name.en}
        className='w-full h-full rounded-full object-cover'
        fallback={
          <PFTypography
            variant='h4'
            className='font-black'
            style={{ color: km.color }}
          >
            {fighter.name.cn.charAt(0)}
          </PFTypography>
        }
      />
    </div>
  );

  return (
    <animated.div
      style={enterSpring}
      className='flex-1 min-h-0 overflow-auto py-4 px-2'
    >
      <SpotlightCard className='w-full border-none bg-transparent'>
        <div className='glass-panel rounded-3xl overflow-hidden relative ambient-shadow'>
          {/* ── Full-height split background images ── */}
          <div className='absolute inset-0 flex z-0'>
            <div className='flex-1 relative overflow-hidden'>
              <div
                className='absolute inset-0 z-10'
                style={{
                  background: `linear-gradient(135deg, ${km1.color}20 0%, transparent 100%)`,
                }}
              />
              <MultiFormatImage
                basePath={`/images/three-kingdoms/background/${fighter1.id}`}
                className='absolute inset-0 w-full h-full object-cover object-center md:object-[center_20%]'
              />
              <div
                className={cn(
                  'absolute inset-0 z-20',
                  isLight
                    ? 'bg-gradient-to-r from-white/10 via-white/60 to-white/95'
                    : 'bg-gradient-to-r from-ct-bg/10 via-ct-bg/60 to-ct-bg/95'
                )}
              />
            </div>
            <div className='w-px z-30 bg-ct-secondary/20 shadow-[0_0_15px_rgba(78,222,163,0.3)]' />
            <div className='flex-1 relative overflow-hidden'>
              <div
                className='absolute inset-0 z-10'
                style={{
                  background: `linear-gradient(225deg, ${km2.color}20 0%, transparent 100%)`,
                }}
              />
              <MultiFormatImage
                basePath={`/images/three-kingdoms/background/${fighter2.id}`}
                className='absolute inset-0 w-full h-full object-cover object-center md:object-[center_20%]'
              />
              <div
                className={cn(
                  'absolute inset-0 z-20',
                  isLight
                    ? 'bg-gradient-to-l from-white/10 via-white/60 to-white/95'
                    : 'bg-gradient-to-l from-ct-bg/10 via-ct-bg/60 to-ct-bg/95'
                )}
              />
            </div>
          </div>

          {/* ── Foreground content ── */}
          <div className='relative z-40 p-6 md:p-10'>
            <div className='flex items-center justify-center gap-4 md:gap-16 mb-12'>
              <div className='flex flex-col items-center gap-3'>
                <animated.div style={avatar1Spring}>
                  {renderAvatar(fighter1, km1, 96)}
                </animated.div>
                <PFTypography
                  variant='h4'
                  className='font-serif-display font-black uppercase tracking-tight'
                  style={{ color: km1.color }}
                >
                  {fighter1.name.cn}
                </PFTypography>
                <span className='hud-label text-[10px] opacity-60'>
                  {fighter1.name.en}
                </span>
              </div>

              <animated.div
                style={vsSpring}
                className='w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center glass-elevated border-ct-secondary/40 shadow-2xl z-50 primary-glow'
              >
                <PFTypography
                  variant='h6'
                  className='font-black'
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${km1.color}, ${km2.color})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  VS
                </PFTypography>
              </animated.div>

              <div className='flex flex-col items-center gap-3'>
                <animated.div style={avatar2Spring}>
                  {renderAvatar(fighter2, km2, 96)}
                </animated.div>
                <PFTypography
                  variant='h4'
                  className='font-serif-display font-black uppercase tracking-tight'
                  style={{ color: km2.color }}
                >
                  {fighter2.name.cn}
                </PFTypography>
                <span className='hud-label text-[10px] opacity-60'>
                  {fighter2.name.en}
                </span>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12'>
              {/* Radar chart */}
              <div className='max-w-sm mx-auto w-full p-8 rounded-3xl border border-ct-outline-variant/10'>
                <StatsRadarChart
                  stats={fighter1.stats}
                  color={km1.color}
                  label={fighter1.name.en}
                  compareStats={fighter2.stats}
                  compareColor={km2.color}
                  compareLabel={fighter2.name.en}
                />
              </div>

              {/* Stat bars */}
              <div className='flex flex-col gap-6 w-full'>
                <h2 className='text-ct-secondary text-[10px] font-black tracking-[0.3em] uppercase mb-2'>
                  COMPARATIVE_METRICS
                </h2>
                {STAT_KEYS.map(key => {
                  const v1 = fighter1.stats[key];
                  const v2 = fighter2.stats[key];
                  const max = Math.max(v1, v2, 1);
                  return (
                    <div key={key} className='flex flex-col gap-2'>
                      <div className='flex justify-between items-center px-1'>
                        <span
                          className='text-xs font-black tabular-nums'
                          style={{
                            color: v1 > v2 ? km1.color : 'inherit',
                            opacity: v1 > v2 ? 1 : 0.4,
                          }}
                        >
                          {v1}
                        </span>
                        <span className='text-[10px] font-black uppercase tracking-widest text-ct-on-surface-variant'>
                          {STAT_LABELS[key].en}
                        </span>
                        <span
                          className='text-xs font-black tabular-nums'
                          style={{
                            color: v2 > v1 ? km2.color : 'inherit',
                            opacity: v2 > v1 ? 1 : 0.4,
                          }}
                        >
                          {v2}
                        </span>
                      </div>
                      <div className='flex gap-2 h-2'>
                        <div className='flex-1 flex justify-end bg-ct-surface-container-highest/10 rounded-l-full overflow-hidden glass-panel border-none'>
                          <AnimatedBar
                            value={v1}
                            max={max}
                            color={km1.color}
                            isWinner={v1 >= v2}
                            direction='left'
                          />
                        </div>
                        <div className='flex-1 bg-ct-surface-container-highest/10 rounded-r-full overflow-hidden glass-panel border-none'>
                          <AnimatedBar
                            value={v2}
                            max={max}
                            color={km2.color}
                            isWinner={v2 >= v1}
                            direction='right'
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Verdict */}
            <div className='glass-panel p-8 rounded-3xl text-center border-ct-secondary/20 relative overflow-hidden'>
              <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ct-secondary to-transparent opacity-30' />
              <PFTypography
                variant='subtitle2'
                className='font-black uppercase tracking-[0.3em] text-ct-secondary mb-4'
              >
                ⚖️ DUEL_VERDICT
              </PFTypography>
              <PFTypography
                variant='body1'
                className='text-ct-on-surface-variant leading-relaxed font-medium max-w-2xl mx-auto'
              >
                <span
                  className='font-black uppercase tracking-wider'
                  style={{ color: km1.color }}
                >
                  {fighter1.name.en}
                </span>
                {' secured '}
                <span className='text-ct-on-surface font-black px-2 py-0.5 glass-panel rounded-md mx-1'>
                  {wins1}
                </span>
                {' victories, while '}
                <span
                  className='font-black uppercase tracking-wider'
                  style={{ color: km2.color }}
                >
                  {fighter2.name.en}
                </span>
                {' dominated '}
                <span className='text-ct-on-surface font-black px-2 py-0.5 glass-panel rounded-md mx-1'>
                  {wins2}
                </span>
                {' metrics. '}
                <br className='hidden md:block mt-4' />
                Total Potential Output:{' '}
                <span className='font-black text-ct-on-surface'>
                  {total1}
                </span>{' '}
                vs{' '}
                <span className='font-black text-ct-on-surface'>{total2}</span>.
                <span className='block mt-4 text-ct-secondary font-black uppercase tracking-widest text-lg'>
                  {total1 > total2
                    ? `> ${fighter1.name.cn} maintains strategic superiority!`
                    : total2 > total1
                      ? `> ${fighter2.name.cn} maintains strategic superiority!`
                      : '> Equilibrium achieved in battle archives.'}
                </span>
              </PFTypography>
            </div>

            <div className='flex flex-wrap justify-center gap-6 mt-12'>
              {onBackToDetail && (
                <button
                  onClick={() => onBackToDetail(fighter1)}
                  className='inline-flex items-center gap-3 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest glass-panel border-ct-secondary/20 text-ct-on-surface hover:bg-ct-surface-container-highest transition-all duration-300 active:scale-95'
                >
                  <CaretLeftIcon size={18} weight='bold' /> Back to Profile
                </button>
              )}
              {onBackToBrowse && (
                <button
                  onClick={onBackToBrowse}
                  className='inline-flex items-center gap-3 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest glass-panel border-ct-secondary/20 text-ct-on-surface hover:bg-ct-surface-container-highest transition-all duration-300 active:scale-95'
                >
                  <ListBulletsIcon size={18} weight='bold' /> Return to Archives
                </button>
              )}
            </div>
          </div>
        </div>
      </SpotlightCard>
    </animated.div>
  );
};
