import { Box, Stack, IconButton, Chip, useTheme, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
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
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';
  const km = getKingdomMeta(character.kingdom);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          background: isLight ? 'rgba(255,248,240,0.92)' : 'rgba(11,13,46,0.8)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)'}`,
          borderRadius: 3,
          p: { xs: 2.5, md: 4 },
          position: 'relative',
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={onClose}
          aria-label='Close detail'
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            color: isLight ? '#5C4A32' : '#FFE4B5',
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Header */}
        <Stack spacing={1.5} sx={{ mb: 3 }}>
          <Stack direction='row' alignItems='center' spacing={1.5}>
            <Box sx={{ fontSize: '2.5rem', lineHeight: 1 }}>{km.emoji}</Box>
            <Box>
              <PFTypography
                variant='h4'
                sx={{ fontWeight: 800, color: km.color }}
              >
                {character.name.cn}
              </PFTypography>
              <PFTypography
                variant='subtitle1'
                sx={{ color: palette.text.secondary }}
              >
                {character.name.en} · {character.name.vi}
              </PFTypography>
            </Box>
          </Stack>

          <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
            <Chip
              label={`${km.name.en} (${km.name.cn})`}
              size='small'
              sx={{
                backgroundColor: `${km.color}18`,
                color: km.color,
                fontWeight: 600,
                border: `1px solid ${km.color}40`,
              }}
            />
            <Chip
              label={`📍 ${character.hometown}`}
              size='small'
              variant='outlined'
              sx={{
                borderColor: isLight
                  ? 'rgba(0,0,0,0.15)'
                  : 'rgba(255,255,255,0.15)',
              }}
            />
            <Chip
              label={character.weapon}
              size='small'
              variant='outlined'
              sx={{
                borderColor: isLight
                  ? 'rgba(0,0,0,0.15)'
                  : 'rgba(255,255,255,0.15)',
              }}
            />
          </Stack>
        </Stack>

        {/* Radar chart */}
        <Box sx={{ maxWidth: 320, mx: 'auto', mb: 3 }}>
          <StatsRadarChart
            stats={character.stats}
            color={km.color}
            label={character.name.en}
          />
        </Box>

        {/* Stat bars */}
        <Stack spacing={1} sx={{ mb: 3 }}>
          {STAT_KEYS.map(key => (
            <Stack key={key} direction='row' alignItems='center' spacing={1.5}>
              <PFTypography
                variant='caption'
                sx={{
                  width: 80,
                  fontWeight: 600,
                  color: palette.text.secondary,
                  textAlign: 'right',
                }}
              >
                {STAT_LABELS[key].en}
              </PFTypography>
              <Box
                sx={{
                  flex: 1,
                  height: 8,
                  borderRadius: 1,
                  backgroundColor: isLight
                    ? 'rgba(0,0,0,0.06)'
                    : 'rgba(255,255,255,0.08)',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${character.stats[key]}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    borderRadius: 4,
                    background: `linear-gradient(90deg, ${km.color}, ${km.color}AA)`,
                  }}
                />
              </Box>
              <PFTypography
                variant='caption'
                sx={{
                  width: 28,
                  fontWeight: 700,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {character.stats[key]}
              </PFTypography>
            </Stack>
          ))}
        </Stack>

        <Divider
          sx={{
            mb: 2,
            borderColor: isLight
              ? 'rgba(0,0,0,0.08)'
              : 'rgba(255,255,255,0.08)',
          }}
        />

        {/* Bio */}
        <PFTypography
          variant='body2'
          sx={{ color: palette.text.secondary, lineHeight: 1.7, mb: 3 }}
        >
          {character.bio}
        </PFTypography>

        {/* Compare button */}
        <Box
          onClick={() => onCompare(character)}
          role='button'
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter') onCompare(character);
          }}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 2.5,
            py: 1,
            borderRadius: 2,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.85rem',
            color: km.color,
            border: `1px solid ${km.color}40`,
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: `${km.color}12`,
              borderColor: km.color,
            },
          }}
        >
          <CompareArrowsIcon fontSize='small' />
          Compare with another warrior…
        </Box>
      </Box>
    </motion.div>
  );
};
