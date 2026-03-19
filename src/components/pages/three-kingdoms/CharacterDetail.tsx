import { Box, Stack, IconButton, Chip, useTheme, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { motion } from 'framer-motion';
import { PFTypography } from '@components/core';
import { StatsRadarChart } from './StatsRadarChart';
import { MultiFormatImage } from './MultiFormatImage';
import {
  getKingdomMeta,
  STAT_LABELS,
  STAT_KEYS,
} from '@constants/three-kingdoms';
import type { ThreeKingdomsCharacter } from '@constants/three-kingdoms';

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
      style={{ flex: 1, minHeight: 0, overflow: 'auto' }}
    >
      <Box
        sx={{
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)'}`,
        }}
      >
        {/* ── Hero banner with background ── */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: 200, md: 260 },
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${km.color}30 0%, ${isLight ? 'rgba(255,248,240,0.7)' : 'rgba(11,13,46,0.7)'} 60%, ${km.color}15 100%)`,
          }}
        >
          <MultiFormatImage
            basePath={`/images/three-kingdoms/background/${character.id}`}
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: isLight
                ? 'linear-gradient(to bottom, transparent 30%, rgba(255,248,240,0.6) 70%, rgba(255,248,240,0.97) 100%)'
                : 'linear-gradient(to bottom, transparent 30%, rgba(11,13,46,0.5) 70%, rgba(11,13,46,0.95) 100%)',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: `linear-gradient(90deg, ${km.color}, ${km.color}80, transparent)`,
            }}
          />

          <IconButton
            onClick={onClose}
            aria-label='Close detail'
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 5,
              color: isLight ? '#5C4A32' : '#FFE4B5',
              background: isLight
                ? 'rgba(255,248,240,0.7)'
                : 'rgba(11,13,46,0.5)',
              backdropFilter: 'blur(8px)',
              '&:hover': {
                background: isLight
                  ? 'rgba(255,248,240,0.95)'
                  : 'rgba(11,13,46,0.8)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Stack
            direction='row'
            alignItems='flex-end'
            spacing={2}
            sx={{
              position: 'absolute',
              bottom: 16,
              left: { xs: 16, md: 28 },
              right: { xs: 16, md: 28 },
              zIndex: 3,
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.35 }}
            >
              <Box
                sx={{
                  width: { xs: 80, md: 100 },
                  height: { xs: 80, md: 100 },
                  borderRadius: '50%',
                  border: `3px solid ${km.color}`,
                  boxShadow: `0 4px 20px ${km.color}40`,
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundColor: `${km.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MultiFormatImage
                  basePath={`/images/three-kingdoms/avatar/${character.id}`}
                  alt={character.name.en}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  fallback={
                    <PFTypography
                      variant='h3'
                      sx={{ fontWeight: 800, color: km.color, lineHeight: 1 }}
                    >
                      {character.name.cn.charAt(0)}
                    </PFTypography>
                  }
                />
              </Box>
            </motion.div>

            <Box sx={{ pb: 0.5 }}>
              <PFTypography
                variant='h4'
                sx={{
                  fontWeight: 800,
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
                sx={{
                  color: isLight ? palette.text.primary : '#e0d5c5',
                  textShadow: isLight
                    ? '0 1px 4px rgba(255,255,255,0.6)'
                    : '0 1px 4px rgba(0,0,0,0.5)',
                }}
              >
                {character.name.vi} · {character.name.en}
              </PFTypography>
            </Box>
          </Stack>
        </Box>

        {/* ── Body content ── */}
        <Box
          sx={{
            background: isLight
              ? 'rgba(255,248,240,0.92)'
              : 'rgba(11,13,46,0.8)',
            backdropFilter: 'blur(16px)',
            p: { xs: 2.5, md: 4 },
            pt: { xs: 2, md: 3 },
          }}
        >
          <Stack
            direction='row'
            spacing={1}
            flexWrap='wrap'
            useFlexGap
            sx={{ mb: 3 }}
          >
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

          <Box sx={{ maxWidth: 320, mx: 'auto', mb: 3 }}>
            <StatsRadarChart
              stats={character.stats}
              color={km.color}
              label={character.name.en}
            />
          </Box>

          <Stack spacing={1} sx={{ mb: 3 }}>
            {STAT_KEYS.map(key => (
              <Stack
                key={key}
                direction='row'
                alignItems='center'
                spacing={1.5}
              >
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

          <PFTypography
            variant='body2'
            sx={{ color: palette.text.secondary, lineHeight: 1.7, mb: 3 }}
          >
            {character.bio}
          </PFTypography>

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
      </Box>
    </motion.div>
  );
};
