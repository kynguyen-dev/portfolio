import { Box, Stack, useTheme, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ViewListIcon from '@mui/icons-material/ViewList';
import { motion } from 'framer-motion';
import { PFTypography } from '@components/core';
import { StatsRadarChart } from './StatsRadarChart';
import { MultiFormatImage } from './MultiFormatImage';
import { getKingdomMeta, STAT_LABELS, STAT_KEYS } from '@constants/three-kingdoms';
import type { ThreeKingdomsCharacter } from '@constants/three-kingdoms';

interface BattleCompareProps {
  fighter1: ThreeKingdomsCharacter;
  fighter2: ThreeKingdomsCharacter;
  onBackToDetail?: (character: ThreeKingdomsCharacter) => void;
  onBackToBrowse?: () => void;
}

export const BattleCompare = ({ fighter1, fighter2, onBackToDetail, onBackToBrowse }: BattleCompareProps) => {
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';
  const km1 = getKingdomMeta(fighter1.kingdom);
  const km2 = getKingdomMeta(fighter2.kingdom);

  const total1 = STAT_KEYS.reduce((s, k) => s + fighter1.stats[k], 0);
  const total2 = STAT_KEYS.reduce((s, k) => s + fighter2.stats[k], 0);
  const wins1 = STAT_KEYS.filter(k => fighter1.stats[k] > fighter2.stats[k]).length;
  const wins2 = STAT_KEYS.filter(k => fighter2.stats[k] > fighter1.stats[k]).length;

  const renderAvatar = (
    fighter: ThreeKingdomsCharacter,
    km: ReturnType<typeof getKingdomMeta>,
    size: { xs: number; md: number },
  ) => (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `3px solid ${km.color}`,
        boxShadow: `0 2px 16px ${km.color}50`,
        overflow: 'hidden',
        backgroundColor: `${km.color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <MultiFormatImage
        basePath={`/images/three-kingdoms/avatar/${fighter.id}`}
        alt={fighter.name.en}
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        fallback={
          <PFTypography variant="h4" sx={{ fontWeight: 800, color: km.color, lineHeight: 1 }}>
            {fighter.name.cn.charAt(0)}
          </PFTypography>
        }
      />
    </Box>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ flex: 1, minHeight: 0, overflow: 'auto' }}
    >
      <Box
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
          border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)'}`,
        }}
      >
        {/* ── Full-height split background images ── */}
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', zIndex: 0 }}>
          {/* Left background */}
          <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${km1.color}20 0%, transparent 100%)` }} />
            <MultiFormatImage
              basePath={`/images/three-kingdoms/background/${fighter1.id}`}
              sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
            />
            <Box sx={{ position: 'absolute', inset: 0, background: isLight
              ? 'linear-gradient(to right, rgba(255,248,240,0.15) 0%, rgba(255,248,240,0.7) 85%, rgba(255,248,240,0.95) 100%)'
              : 'linear-gradient(to right, rgba(11,13,46,0.2) 0%, rgba(11,13,46,0.7) 85%, rgba(11,13,46,0.95) 100%)' }} />
            <Box sx={{ position: 'absolute', inset: 0, background: isLight
              ? 'linear-gradient(to bottom, rgba(255,248,240,0.1) 0%, rgba(255,248,240,0.6) 100%)'
              : 'linear-gradient(to bottom, rgba(11,13,46,0.1) 0%, rgba(11,13,46,0.6) 100%)' }} />
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: km1.color }} />
          </Box>

          <Box sx={{ width: 2, background: `linear-gradient(to bottom, ${isLight ? 'rgba(184,137,31,0.3)' : 'rgba(245,208,96,0.3)'}, transparent)`, zIndex: 1 }} />

          {/* Right background */}
          <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(225deg, ${km2.color}20 0%, transparent 100%)` }} />
            <MultiFormatImage
              basePath={`/images/three-kingdoms/background/${fighter2.id}`}
              sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
            />
            <Box sx={{ position: 'absolute', inset: 0, background: isLight
              ? 'linear-gradient(to left, rgba(255,248,240,0.15) 0%, rgba(255,248,240,0.7) 85%, rgba(255,248,240,0.95) 100%)'
              : 'linear-gradient(to left, rgba(11,13,46,0.2) 0%, rgba(11,13,46,0.7) 85%, rgba(11,13,46,0.95) 100%)' }} />
            <Box sx={{ position: 'absolute', inset: 0, background: isLight
              ? 'linear-gradient(to bottom, rgba(255,248,240,0.1) 0%, rgba(255,248,240,0.6) 100%)'
              : 'linear-gradient(to bottom, rgba(11,13,46,0.1) 0%, rgba(11,13,46,0.6) 100%)' }} />
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: km2.color }} />
          </Box>
        </Box>

        {/* ── Foreground content ── */}
        <Box sx={{ position: 'relative', zIndex: 2, p: { xs: 2.5, md: 4 } }}>
          {/* VS Header with avatars */}
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 2, md: 4 }} sx={{ mb: 4 }}>
            <Stack alignItems="center" spacing={1}>
              <motion.div
                initial={{ scale: 0.7, opacity: 0, x: -30 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                {renderAvatar(fighter1, km1, { xs: 64, md: 80 })}
              </motion.div>
              <PFTypography
                variant="h5"
                sx={{ fontWeight: 800, color: km1.color, textShadow: isLight ? '0 1px 8px rgba(255,255,255,0.9)' : '0 1px 8px rgba(0,0,0,0.7)' }}
              >
                {fighter1.name.cn}
              </PFTypography>
              <PFTypography
                variant="caption"
                sx={{ color: isLight ? palette.text.primary : '#d4c9b8', textShadow: isLight ? '0 1px 4px rgba(255,255,255,0.7)' : '0 1px 4px rgba(0,0,0,0.5)' }}
              >
                {fighter1.name.vi} · {fighter1.name.en}
              </PFTypography>
            </Stack>

            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 200 }}
            >
              <Box
                sx={{
                  width: { xs: 48, md: 56 },
                  height: { xs: 48, md: 56 },
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isLight ? 'rgba(255,248,240,0.9)' : 'rgba(11,13,46,0.85)',
                  border: `2px solid ${isLight ? 'rgba(184,137,31,0.4)' : 'rgba(245,208,96,0.4)'}`,
                  boxShadow: `0 4px 24px ${isLight ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.5)'}`,
                }}
              >
                <PFTypography
                  variant="h6"
                  sx={{
                    fontWeight: 900,
                    background: `linear-gradient(135deg, ${km1.color}, ${km2.color})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  VS
                </PFTypography>
              </Box>
            </motion.div>

            <Stack alignItems="center" spacing={1}>
              <motion.div
                initial={{ scale: 0.7, opacity: 0, x: 30 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                {renderAvatar(fighter2, km2, { xs: 64, md: 80 })}
              </motion.div>
              <PFTypography
                variant="h5"
                sx={{ fontWeight: 800, color: km2.color, textShadow: isLight ? '0 1px 8px rgba(255,255,255,0.9)' : '0 1px 8px rgba(0,0,0,0.7)' }}
              >
                {fighter2.name.cn}
              </PFTypography>
              <PFTypography
                variant="caption"
                sx={{ color: isLight ? palette.text.primary : '#d4c9b8', textShadow: isLight ? '0 1px 4px rgba(255,255,255,0.7)' : '0 1px 4px rgba(0,0,0,0.5)' }}
              >
                {fighter2.name.vi} · {fighter2.name.en}
              </PFTypography>
            </Stack>
          </Stack>

          {/* Radar chart */}
          <Box sx={{ maxWidth: 360, mx: 'auto', mb: 3 }}>
            <StatsRadarChart
              stats={fighter1.stats} color={km1.color} label={fighter1.name.en}
              compareStats={fighter2.stats} compareColor={km2.color} compareLabel={fighter2.name.en}
            />
          </Box>

          {/* Stat bars */}
          <Stack spacing={1.5} sx={{ mb: 3 }}>
            {STAT_KEYS.map(key => {
              const v1 = fighter1.stats[key];
              const v2 = fighter2.stats[key];
              const max = Math.max(v1, v2);
              return (
                <Stack key={key} spacing={0.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <PFTypography variant="caption" sx={{ fontWeight: 700, color: v1 > v2 ? km1.color : palette.text.secondary, textShadow: isLight ? '0 1px 3px rgba(255,255,255,0.6)' : 'none' }}>{v1}</PFTypography>
                    <PFTypography variant="caption" sx={{ fontWeight: 600, color: palette.text.secondary, textShadow: isLight ? '0 1px 3px rgba(255,255,255,0.6)' : 'none' }}>{STAT_LABELS[key].en}</PFTypography>
                    <PFTypography variant="caption" sx={{ fontWeight: 700, color: v2 > v1 ? km2.color : palette.text.secondary, textShadow: isLight ? '0 1px 3px rgba(255,255,255,0.6)' : 'none' }}>{v2}</PFTypography>
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(v1 / max) * 100}%` }} transition={{ duration: 0.6, ease: 'easeOut' }}
                        style={{ height: 8, borderRadius: 4, background: v1 >= v2 ? `linear-gradient(90deg, ${km1.color}60, ${km1.color})` : `${km1.color}40` }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(v2 / max) * 100}%` }} transition={{ duration: 0.6, ease: 'easeOut' }}
                        style={{ height: 8, borderRadius: 4, background: v2 >= v1 ? `linear-gradient(90deg, ${km2.color}, ${km2.color}60)` : `${km2.color}40` }} />
                    </Box>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>

          <Divider sx={{ mb: 2, borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }} />

          {/* Verdict */}
          <Box
            sx={{
              textAlign: 'center', p: 2, borderRadius: 2,
              background: isLight ? 'rgba(255,248,240,0.85)' : 'rgba(11,13,46,0.7)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${isLight ? 'rgba(184,137,31,0.15)' : 'rgba(245,208,96,0.15)'}`,
            }}
          >
            <PFTypography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5, color: isLight ? '#B8891F' : '#F5D060' }}>
              ⚖️ Battle Verdict
            </PFTypography>
            <PFTypography variant="body2" sx={{ color: palette.text.secondary, lineHeight: 1.6 }}>
              <Box component="span" sx={{ fontWeight: 700, color: km1.color }}>{fighter1.name.en}</Box>
              {' wins '}<Box component="span" sx={{ fontWeight: 700 }}>{wins1}</Box>{' / 5 stats, '}
              <Box component="span" sx={{ fontWeight: 700, color: km2.color }}>{fighter2.name.en}</Box>
              {' wins '}<Box component="span" sx={{ fontWeight: 700 }}>{wins2}</Box>{' / 5 stats. '}
              Total: {total1} vs {total2}.
              {total1 > total2 ? ` ${fighter1.name.cn} has the overall edge! 🏆`
                : total2 > total1 ? ` ${fighter2.name.cn} has the overall edge! 🏆`
                : ' It\'s a dead even match! ⚔️'}
            </PFTypography>
          </Box>

          {/* Navigation buttons */}
          <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
            {onBackToDetail && (
              <Box
                onClick={() => onBackToDetail(fighter1)}
                role="button" tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter') onBackToDetail(fighter1); }}
                sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 1, px: 2.5, py: 1, borderRadius: 2,
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', color: km1.color,
                  background: isLight ? 'rgba(255,248,240,0.8)' : 'rgba(11,13,46,0.6)',
                  backdropFilter: 'blur(6px)',
                  border: `1px solid ${km1.color}40`, transition: 'all 0.2s',
                  '&:hover': { backgroundColor: isLight ? 'rgba(255,248,240,0.95)' : 'rgba(11,13,46,0.85)', borderColor: km1.color },
                }}
              >
                <ArrowBackIcon fontSize="small" />
                Back to {fighter1.name.en}
              </Box>
            )}
            {onBackToBrowse && (
              <Box
                onClick={onBackToBrowse}
                role="button" tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter') onBackToBrowse(); }}
                sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 1, px: 2.5, py: 1, borderRadius: 2,
                  cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                  color: isLight ? '#5C4A32' : '#FFE4B5',
                  background: isLight ? 'rgba(255,248,240,0.8)' : 'rgba(11,13,46,0.6)',
                  backdropFilter: 'blur(6px)',
                  border: `1px solid ${isLight ? 'rgba(184,137,31,0.3)' : 'rgba(245,208,96,0.3)'}`,
                  transition: 'all 0.2s',
                  '&:hover': { backgroundColor: isLight ? 'rgba(255,248,240,0.95)' : 'rgba(11,13,46,0.85)' },
                }}
              >
                <ViewListIcon fontSize="small" />
                Browse All
              </Box>
            )}
          </Stack>
        </Box>
      </Box>
    </motion.div>
  );
};
