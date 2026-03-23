import { X, ArrowRightLeft } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.3 }}
      className='flex-1 min-h-0 overflow-auto'
    >
      <div
        className={cn(
          'rounded-3xl border overflow-hidden relative shadow-2xl transition-all duration-300',
          isLight
            ? 'border-primary-main/20 shadow-primary-main/5'
            : 'border-primary-main/20 shadow-black/40'
        )}
      >
        {/* ── Hero banner with background ── */}
        <div
          className='relative h-52 md:h-64 overflow-hidden'
          style={{
            background: `linear-gradient(135deg, ${km.color}30 0%, ${isLight ? 'rgba(255,248,240,0.7)' : 'rgba(11,13,46,0.7)'} 60%, ${km.color}15 100%)`,
          }}
        >
          <MultiFormatImage
            basePath={`/images/three-kingdoms/background/${character.id}`}
            className='absolute inset-0 w-full h-full object-cover object-center md:object-[center_20%]'
          />

          <div
            className={cn(
              'absolute inset-0',
              isLight
                ? 'bg-gradient-to-b from-transparent via-white/60 to-white/95'
                : 'bg-gradient-to-b from-transparent via-background-default/50 to-background-default/95'
            )}
          />

          <div
            className='absolute top-0 left-0 right-0 h-1'
            style={{
              background: `linear-gradient(90deg, ${km.color}, ${km.color}80, transparent)`,
            }}
          />

          <button
            onClick={onClose}
            aria-label='Close detail'
            className={cn(
              'absolute top-3 right-3 z-10 p-2 rounded-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95',
              isLight
                ? 'bg-white/70 text-primary-dark hover:bg-white/95'
                : 'bg-background-default/50 text-primary-light hover:bg-background-default/80'
            )}
          >
            <X className='w-5 h-5' />
          </button>

          <div className='absolute bottom-4 left-4 md:left-7 right-4 md:right-7 z-10 flex items-end gap-4'>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.35 }}
            >
              <div
                className='w-20 h-20 md:w-24 md:h-24 rounded-full border-2 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-lg'
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
            </motion.div>

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
                className={cn(
                  'font-medium opacity-90',
                  isLight ? 'text-text-primary' : 'text-[#e0d5c5]'
                )}
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
        <div
          className={cn(
            'backdrop-blur-2xl p-6 md:p-10 pt-4 md:pt-6',
            isLight ? 'bg-white/90' : 'bg-background-default/80'
          )}
        >
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
            <span className='px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5'>
              📍 {character.hometown}
            </span>
            <span className='px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5'>
              ⚔️ {character.weapon}
            </span>
          </div>

          <div className='max-w-xs mx-auto mb-10'>
            <StatsRadarChart
              stats={character.stats}
              color={km.color}
              label={character.name.en}
            />
          </div>

          <div className='flex flex-col gap-4 mb-10'>
            {STAT_KEYS.map(key => (
              <div key={key} className='flex items-center gap-4'>
                <PFTypography
                  variant='caption'
                  className='w-20 font-bold text-text-secondary text-right uppercase tracking-tighter'
                >
                  {STAT_LABELS[key].en}
                </PFTypography>
                <div className='flex-grow h-2 rounded-full bg-white/10 overflow-hidden'>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${character.stats[key]}%` }}
                    transition={{ duration: 0.8, ease: 'circOut' }}
                    className='h-full rounded-full'
                    style={{
                      background: `linear-gradient(90deg, ${km.color}, ${km.color}AA)`,
                    }}
                  />
                </div>
                <PFTypography
                  variant='caption'
                  className='w-8 font-extrabold tabular-nums'
                >
                  {character.stats[key]}
                </PFTypography>
              </div>
            ))}
          </div>

          <div className='h-px w-full bg-white/10 mb-6' />

          <PFTypography
            variant='body2'
            className='text-text-secondary leading-relaxed mb-10'
          >
            {character.bio}
          </PFTypography>

          <button
            onClick={() => onCompare(character)}
            className='inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 group border'
            style={{
              color: km.color,
              borderColor: `${km.color}40`,
              backgroundColor: `${km.color}05`,
            }}
          >
            <ArrowRightLeft className='w-4 h-4 transition-transform group-hover:rotate-180' />
            Compare with another warrior…
          </button>
        </div>
      </div>
    </motion.div>
  );
};
