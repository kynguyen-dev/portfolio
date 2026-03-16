import { Box, useTheme, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { PFTypography } from '@components/core';
import SpeedIcon from '@mui/icons-material/Speed';
import MemoryIcon from '@mui/icons-material/Memory';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface StatsBarProps {
  totalPhotos: number;
  renderedPhotos: number;
  fps: number;
}

/**
 * Floating performance stats bar that shows virtualization metrics.
 * Highlights the key benefit: only a fraction of DOM nodes are rendered.
 */
export const StatsBar = ({
  totalPhotos,
  renderedPhotos,
  fps,
}: StatsBarProps) => {
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';

  const memSaved =
    totalPhotos > 0
      ? `${Math.round(((totalPhotos - renderedPhotos) / totalPhotos) * 100)}%`
      : '0%';

  const fpsColor = fps >= 55 ? '#4caf50' : fps >= 30 ? '#ff9800' : '#f44336';

  const stats = [
    {
      icon: <PhotoLibraryIcon sx={{ fontSize: 15 }} />,
      label: 'Total',
      value: totalPhotos.toLocaleString(),
    },
    {
      icon: <VisibilityIcon sx={{ fontSize: 15 }} />,
      label: 'In DOM',
      value: renderedPhotos.toString(),
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 15 }} />,
      label: 'FPS',
      value: fps.toString(),
      color: fpsColor,
    },
    {
      icon: <MemoryIcon sx={{ fontSize: 15 }} />,
      label: 'DOM Saved',
      value: memSaved,
      color: '#4caf50',
    },
  ];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        justifyContent: 'center',
        mb: 3,
      }}
    >
      {stats.map(stat => (
        <Chip
          key={stat.label}
          icon={stat.icon}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PFTypography
                variant='caption'
                sx={{
                  color: isLight ? '#8B7355' : '#C8B88A',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </PFTypography>
              <PFTypography
                variant='caption'
                sx={{
                  color: stat.color ?? (isLight ? '#5C4A32' : '#FFE4B5'),
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                }}
              >
                {stat.value}
              </PFTypography>
            </Box>
          }
          variant='outlined'
          size='small'
          sx={{
            height: 32,
            background: isLight
              ? 'rgba(255,248,240,0.85)'
              : 'rgba(11, 13, 46, 0.6)',
            backdropFilter: 'blur(8px)',
            borderColor: isLight
              ? 'rgba(184,137,31,0.2)'
              : 'rgba(245,208,96,0.2)',
            '& .MuiChip-icon': {
              color: isLight ? '#B8891F' : '#F5D060',
            },
          }}
        />
      ))}
    </Box>
  );
};
