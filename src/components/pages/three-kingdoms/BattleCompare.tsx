import { Box, Stack, useTheme, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { PFTypography } from '@components/core';
import { StatsRadarChart } from './StatsRadarChart';
import { getKingdomMeta, STAT_LABELS } from '@constants/three-kingdoms';
import type {
  ThreeKingdomsCharacter,
  StatKey,
} from '@constants/three-kingdoms';

const STAT_KEYS: StatKey[] = [
  'might',
  'intelligence',
  'politics',
  'charisma',
  'leadership',
];

interface BattleCompareProps {
  fighter1: ThreeKingdomsCharacter;
  fighter2: ThreeKingdomsCharacter;
}

export const BattleCompare = ({ fighter1, fighter2 }: BattleCompareProps) => {
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';
  const km1 = getKingdomMeta(fighter1.kingdom);
  const km2 = getKingdomMeta(fighter2.kingdom);

  /* Simple stat comparison "verdict" */
  const total1 = STAT_KEYS.reduce((s, k) => s + fighter1.stats[k], 0);
  const total2 = STAT_KEYS.reduce((s, k) => s + fighter2.stats[k], 0);
  const wins1 = STAT_KEYS.filter(
    k => fighter1.stats[k] > fighter2.stats[k]
  ).length;
  const wins2 = STAT_KEYS.filter(
    k => fighter2.stats[k] > fighter1.stats[k]
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{
          background: isLight ? 'rgba(255,248,240,0.92)' : 'rgba(11,13,46,0.8)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)'}`,
          borderRadius: 3,
          p: { xs: 2.5, md: 4 },
        }}
      >
        {/* VS Header */}
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='center'
          spacing={3}
          sx={{ mb: 3 }}
        >
          <Stack alignItems='center' spacing={0.5}>
            <Box sx={{ fontSize: '2rem' }}>{km1.emoji}</Box>
            <PFTypography
              variant='h5'
              sx={{ fontWeight: 800, color: km1.color }}
            >
              {fighter1.name.cn}
            </PFTypography>
            <PFTypography
              variant='caption'
              sx={{ color: palette.text.secondary }}
            >
              {fighter1.name.en}
            </PFTypography>
          </Stack>

          <PFTypography
            variant='h4'
            sx={{
              fontWeight: 900,
              background: `linear-gradient(135deg, ${km1.color}, ${km2.color})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            VS
          </PFTypography>

          <Stack alignItems='center' spacing={0.5}>
            <Box sx={{ fontSize: '2rem' }}>{km2.emoji}</Box>
            <PFTypography
              variant='h5'
              sx={{ fontWeight: 800, color: km2.color }}
            >
              {fighter2.name.cn}
            </PFTypography>
            <PFTypography
              variant='caption'
              sx={{ color: palette.text.secondary }}
            >
              {fighter2.name.en}
            </PFTypography>
          </Stack>
        </Stack>

        {/* Overlaid radar chart */}
        <Box sx={{ maxWidth: 360, mx: 'auto', mb: 3 }}>
          <StatsRadarChart
            stats={fighter1.stats}
            color={km1.color}
            label={fighter1.name.en}
            compareStats={fighter2.stats}
            compareColor={km2.color}
            compareLabel={fighter2.name.en}
          />
        </Box>

        {/* Stat comparison bars */}
        <Stack spacing={1.5} sx={{ mb: 3 }}>
          {STAT_KEYS.map(key => {
            const v1 = fighter1.stats[key];
            const v2 = fighter2.stats[key];
            const max = Math.max(v1, v2);
            return (
              <Stack key={key} spacing={0.5}>
                <Stack direction='row' justifyContent='space-between'>
                  <PFTypography
                    variant='caption'
                    sx={{
                      fontWeight: 700,
                      color: v1 > v2 ? km1.color : palette.text.secondary,
                    }}
                  >
                    {v1}
                  </PFTypography>
                  <PFTypography
                    variant='caption'
                    sx={{ fontWeight: 600, color: palette.text.secondary }}
                  >
                    {STAT_LABELS[key].en}
                  </PFTypography>
                  <PFTypography
                    variant='caption'
                    sx={{
                      fontWeight: 700,
                      color: v2 > v1 ? km2.color : palette.text.secondary,
                    }}
                  >
                    {v2}
                  </PFTypography>
                </Stack>
                <Stack direction='row' spacing={0.5}>
                  {/* Left bar (fighter 1) — grows right-to-left */}
                  <Box
                    sx={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(v1 / max) * 100}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      style={{
                        height: 8,
                        borderRadius: 4,
                        background:
                          v1 >= v2
                            ? `linear-gradient(90deg, ${km1.color}60, ${km1.color})`
                            : `${km1.color}40`,
                      }}
                    />
                  </Box>
                  {/* Right bar (fighter 2) — grows left-to-right */}
                  <Box sx={{ flex: 1 }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(v2 / max) * 100}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      style={{
                        height: 8,
                        borderRadius: 4,
                        background:
                          v2 >= v1
                            ? `linear-gradient(90deg, ${km2.color}, ${km2.color}60)`
                            : `${km2.color}40`,
                      }}
                    />
                  </Box>
                </Stack>
              </Stack>
            );
          })}
        </Stack>

        <Divider
          sx={{
            mb: 2,
            borderColor: isLight
              ? 'rgba(0,0,0,0.08)'
              : 'rgba(255,255,255,0.08)',
          }}
        />

        {/* Verdict */}
        <Box
          sx={{
            textAlign: 'center',
            p: 2,
            borderRadius: 2,
            background: isLight
              ? 'rgba(184,137,31,0.06)'
              : 'rgba(245,208,96,0.06)',
            border: `1px solid ${isLight ? 'rgba(184,137,31,0.15)' : 'rgba(245,208,96,0.15)'}`,
          }}
        >
          <PFTypography
            variant='subtitle2'
            sx={{
              fontWeight: 700,
              mb: 0.5,
              color: isLight ? '#B8891F' : '#F5D060',
            }}
          >
            ⚖️ Battle Verdict
          </PFTypography>
          <PFTypography
            variant='body2'
            sx={{ color: palette.text.secondary, lineHeight: 1.6 }}
          >
            <Box component='span' sx={{ fontWeight: 700, color: km1.color }}>
              {fighter1.name.en}
            </Box>
            {' wins '}
            <Box component='span' sx={{ fontWeight: 700 }}>
              {wins1}
            </Box>
            {' / 5 stats, '}
            <Box component='span' sx={{ fontWeight: 700, color: km2.color }}>
              {fighter2.name.en}
            </Box>
            {' wins '}
            <Box component='span' sx={{ fontWeight: 700 }}>
              {wins2}
            </Box>
            {' / 5 stats. '}
            Total: {total1} vs {total2}.
            {total1 > total2
              ? ` ${fighter1.name.cn} has the overall edge! 🏆`
              : total2 > total1
                ? ` ${fighter2.name.cn} has the overall edge! 🏆`
                : " It's a dead even match! ⚔️"}
          </PFTypography>
        </Box>
      </Box>
    </motion.div>
  );
};
