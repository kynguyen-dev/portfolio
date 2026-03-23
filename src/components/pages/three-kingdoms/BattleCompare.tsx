import { ArrowLeft, LayoutList } from 'lucide-react';
import { motion } from 'motion/react';
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

interface BattleCompareProps {
  fighter1: ThreeKingdomsCharacter;
  fighter2: ThreeKingdomsCharacter;
  onBackToDetail?: (character: ThreeKingdomsCharacter) => void;
  onBackToBrowse?: () => void;
}

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

  const renderAvatar = (
    fighter: ThreeKingdomsCharacter,
    km: ReturnType<typeof getKingdomMeta>,
    size: { xs: number; md: number }
  ) => (
    <div
      className='rounded-full border-[3px] overflow-hidden flex items-center justify-center flex-shrink-0'
      style={{
        width: size.md,
        height: size.md,
        borderColor: km.color,
        boxShadow: `0 2px 16px ${km.color}50`,
        backgroundColor: `${km.color}20`,
      }}
    >
      <MultiFormatImage
        basePath={`/images/three-kingdoms/avatar/${fighter.id}`}
        alt={fighter.name.en}
        className='w-full h-full object-cover'
        fallback={
          <PFTypography
            variant='h4'
            className='font-extrabold leading-none'
            style={{ color: km.color }}
          >
            {fighter.name.cn.charAt(0)}
          </PFTypography>
        }
      />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='flex-1 min-h-0 overflow-auto'
    >
      <div
        className={cn(
          'rounded-3xl overflow-hidden relative border transition-all duration-300',
          isLight
            ? 'border-primary-main/20 shadow-xl'
            : 'border-primary-main/20 shadow-black/40'
        )}
      >
        {/* ── Full-height split background images ── */}
        <div className='absolute inset-0 flex z-0'>
          {/* Left background */}
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
                  ? 'bg-gradient-to-r from-white/15 via-white/70 to-white/95'
                  : 'bg-gradient-to-r from-background-default/20 via-background-default/70 to-background-default/95'
              )}
            />
            <div
              className='absolute top-0 left-0 right-0 h-1 z-30'
              style={{ background: km1.color }}
            />
          </div>

          <div
            className={cn(
              'w-0.5 z-30',
              isLight
                ? 'bg-gradient-to-b from-primary-main/30 to-transparent'
                : 'bg-gradient-to-b from-primary-main/30 to-transparent'
            )}
          />

          {/* Right background */}
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
                  ? 'bg-gradient-to-l from-white/15 via-white/70 to-white/95'
                  : 'bg-gradient-to-l from-background-default/20 via-background-default/70 to-background-default/95'
              )}
            />
            <div
              className='absolute top-0 left-0 right-0 h-1 z-30'
              style={{ background: km2.color }}
            />
          </div>
        </div>

        {/* ── Foreground content ── */}
        <div className='relative z-40 p-6 md:p-10'>
          {/* VS Header with avatars */}
          <div className='flex items-center justify-center gap-4 md:gap-12 mb-10'>
            <div className='flex flex-col items-center gap-2'>
              <motion.div
                initial={{ scale: 0.7, opacity: 0, x: -30 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                {renderAvatar(fighter1, km1, { xs: 64, md: 80 })}
              </motion.div>
              <PFTypography
                variant='h5'
                className='font-black'
                style={{
                  color: km1.color,
                  textShadow: isLight
                    ? '0 1px 8px rgba(255,255,255,0.9)'
                    : '0 1px 8px rgba(0,0,0,0.7)',
                }}
              >
                {fighter1.name.cn}
              </PFTypography>
              <PFTypography
                variant='caption'
                className={cn(
                  'font-medium opacity-80',
                  isLight ? 'text-text-primary' : 'text-[#d4c9b8]'
                )}
                style={{
                  textShadow: isLight
                    ? '0 1px 4px rgba(255,255,255,0.7)'
                    : '0 1px 4px rgba(0,0,0,0.5)',
                }}
              >
                {fighter1.name.vi} · {fighter1.name.en}
              </PFTypography>
            </div>

            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 200 }}
              className={cn(
                'w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center backdrop-blur-xl border-2 shadow-2xl z-50',
                isLight
                  ? 'bg-white/90 border-primary-main/40 shadow-black/10'
                  : 'bg-background-default/85 border-primary-main/40 shadow-black/50'
              )}
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
            </motion.div>

            <div className='flex flex-col items-center gap-2'>
              <motion.div
                initial={{ scale: 0.7, opacity: 0, x: 30 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                {renderAvatar(fighter2, km2, { xs: 64, md: 80 })}
              </motion.div>
              <PFTypography
                variant='h5'
                className='font-black'
                style={{
                  color: km2.color,
                  textShadow: isLight
                    ? '0 1px 8px rgba(255,255,255,0.9)'
                    : '0 1px 8px rgba(0,0,0,0.7)',
                }}
              >
                {fighter2.name.cn}
              </PFTypography>
              <PFTypography
                variant='caption'
                className={cn(
                  'font-medium opacity-80',
                  isLight ? 'text-text-primary' : 'text-[#d4c9b8]'
                )}
                style={{
                  textShadow: isLight
                    ? '0 1px 4px rgba(255,255,255,0.7)'
                    : '0 1px 4px rgba(0,0,0,0.5)',
                }}
              >
                {fighter2.name.vi} · {fighter2.name.en}
              </PFTypography>
            </div>
          </div>

          {/* Radar chart */}
          <div className='max-w-sm mx-auto mb-10'>
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
          <div className='flex flex-col gap-6 mb-10'>
            {STAT_KEYS.map(key => {
              const v1 = fighter1.stats[key];
              const v2 = fighter2.stats[key];
              const max = Math.max(v1, v2);
              return (
                <div key={key} className='flex flex-col gap-1.5'>
                  <div className='flex justify-between items-center px-1'>
                    <PFTypography
                      variant='caption'
                      className='font-black tabular-nums'
                      style={{
                        color: v1 > v2 ? km1.color : 'inherit',
                        opacity: v1 > v2 ? 1 : 0.6,
                      }}
                    >
                      {v1}
                    </PFTypography>
                    <PFTypography
                      variant='caption'
                      className='font-bold uppercase tracking-tighter opacity-70'
                    >
                      {STAT_LABELS[key].en}
                    </PFTypography>
                    <PFTypography
                      variant='caption'
                      className='font-black tabular-nums'
                      style={{
                        color: v2 > v1 ? km2.color : 'inherit',
                        opacity: v2 > v1 ? 1 : 0.6,
                      }}
                    >
                      {v2}
                    </PFTypography>
                  </div>
                  <div className='flex gap-1 h-2'>
                    <div className='flex-1 flex justify-end bg-white/5 rounded-l-full overflow-hidden'>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(v1 / max) * 100}%` }}
                        transition={{ duration: 0.8, ease: 'circOut' }}
                        className='h-full rounded-full'
                        style={{
                          background:
                            v1 >= v2
                              ? `linear-gradient(90deg, ${km1.color}60, ${km1.color})`
                              : `${km1.color}40`,
                        }}
                      />
                    </div>
                    <div className='flex-1 bg-white/5 rounded-r-full overflow-hidden'>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(v2 / max) * 100}%` }}
                        transition={{ duration: 0.8, ease: 'circOut' }}
                        className='h-full rounded-full'
                        style={{
                          background:
                            v2 >= v1
                              ? `linear-gradient(90deg, ${km2.color}, ${km2.color}60)`
                              : `${km2.color}40`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className='h-px w-full bg-white/10 mb-8' />

          {/* Verdict */}
          <div
            className={cn(
              'p-6 rounded-2xl text-center backdrop-blur-xl border transition-all duration-500',
              isLight
                ? 'bg-white/85 border-primary-main/15'
                : 'bg-background-default/70 border-primary-main/15'
            )}
          >
            <PFTypography
              variant='subtitle2'
              className='font-black uppercase tracking-widest text-primary-main mb-2'
            >
              ⚖️ Battle Verdict
            </PFTypography>
            <PFTypography
              variant='body2'
              className='text-text-secondary leading-relaxed font-medium'
            >
              <span className='font-bold' style={{ color: km1.color }}>
                {fighter1.name.en}
              </span>
              {' wins '}
              <span className='font-black'>{wins1}</span>
              {' / 5 stats, '}
              <span className='font-bold' style={{ color: km2.color }}>
                {fighter2.name.en}
              </span>
              {' wins '}
              <span className='font-black'>{wins2}</span>
              {' / 5 stats. '}
              <br className='hidden md:block' />
              Total Potential: <span className='font-black'>
                {total1}
              </span> vs <span className='font-black'>{total2}</span>.
              {total1 > total2
                ? ` ${fighter1.name.cn} has the overall edge! 🏆`
                : total2 > total1
                  ? ` ${fighter2.name.cn} has the overall edge! 🏆`
                  : " It's a dead even match! ⚔️"}
            </PFTypography>
          </div>

          {/* Navigation buttons */}
          <div className='flex flex-wrap gap-4 mt-10'>
            {onBackToDetail && (
              <button
                onClick={() => onBackToDetail(fighter1)}
                className={cn(
                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm backdrop-blur-md border transition-all hover:scale-105 active:scale-95',
                  isLight
                    ? 'bg-white/80 border-primary-main/20 text-primary-dark'
                    : 'bg-background-default/60 border-primary-main/20 text-primary-light'
                )}
                style={{ color: km1.color, borderColor: `${km1.color}40` }}
              >
                <ArrowLeft className='w-4 h-4' />
                Back to {fighter1.name.en}
              </button>
            )}
            {onBackToBrowse && (
              <button
                onClick={onBackToBrowse}
                className={cn(
                  'inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm backdrop-blur-md border transition-all hover:scale-105 active:scale-95',
                  isLight
                    ? 'bg-white/80 border-primary-main/20 text-primary-dark'
                    : 'bg-background-default/60 border-primary-main/20 text-primary-light'
                )}
              >
                <LayoutList className='w-4 h-4' />
                Browse All
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
