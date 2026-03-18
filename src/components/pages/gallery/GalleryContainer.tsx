import { useState, useCallback, useRef, useEffect } from 'react';
import { Stack, Box, IconButton, useTheme, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from '@tanstack/react-router';
import { PFGradientTypography, PFTypography } from '@components/core';
import { SunriseBackground } from '@components/customs/backgrounds/SunriseBackground';
import { motion } from 'framer-motion';
import type { GalleryPhoto } from './types';
import { useGalleryPhotos } from './useGalleryPhotos';
import { useFps } from './useFps';
import { VirtualizedGalleryGrid } from './VirtualizedGalleryGrid';
import { StatsBar } from './StatsBar';
import { Lightbox } from './Lightbox';

/**
 * Infinite Photo Gallery — showcases TanStack Virtual performance.
 * Renders thousands of photos from Lorem Picsum using virtualised
 * rows, infinite scroll, and real-time FPS metrics.
 */
export const GalleryContainer = () => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';

  const { photos, isLoading, loadMore } = useGalleryPhotos();
  const fps = useFps();
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [renderedCount, setRenderedCount] = useState(0);

  /* Poll rendered count from the grid's data attribute */
  useEffect(() => {
    const interval = setInterval(() => {
      const el = gridRef.current?.querySelector(
        '[data-rendered-count]'
      ) as HTMLElement | null;
      if (el?.dataset.renderedCount) {
        setRenderedCount(Number(el.dataset.renderedCount));
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handlePhotoClick = useCallback((photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
  }, []);

  const handleLightboxClose = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  return (
    <SunriseBackground sun={false} rays={false} particles={false}>
      <Stack
        component='main'
        minHeight='100vh'
        sx={{ px: { xs: 1.5, sm: 2, md: 4 }, py: { xs: 2, md: 3 } }}
      >
        {/* ── Header ── */}
        <Box sx={{ position: 'fixed', top: 20, left: 20, zIndex: 50 }}>
          <Tooltip title='Back to portfolio' arrow>
            <IconButton
              onClick={() => navigate({ to: '/' })}
              aria-label='Back to portfolio'
              sx={{
                color: isLight ? '#5C4A32' : '#FFE4B5',
                background: isLight
                  ? 'rgba(255,248,240, 0.8)'
                  : 'rgba(11, 13, 46, 0.6)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)'}`,
                '&:hover': {
                  background: isLight
                    ? 'rgba(255,248,240, 0.95)'
                    : 'rgba(11, 13, 46, 0.85)',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* ── Title section ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Stack
            alignItems='center'
            spacing={1}
            sx={{ pt: { xs: 7, md: 4 }, pb: 2 }}
          >
            <Box
              component={motion.div}
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              sx={{ fontSize: '2.5rem', lineHeight: 1 }}
            >
              🖼️
            </Box>

            <PFGradientTypography variant='h4' fontWeight={800}>
              Infinite Photo Gallery
            </PFGradientTypography>

            <PFTypography
              variant='body2'
              sx={{
                color: isLight ? '#8B7355' : '#C8B88A',
                textAlign: 'center',
                maxWidth: 600,
                lineHeight: 1.5,
              }}
            >
              Rendering{' '}
              <Box
                component='span'
                sx={{
                  fontWeight: 700,
                  color: isLight ? '#B8891F' : '#F5D060',
                  fontFamily: 'monospace',
                }}
              >
                {photos.length.toLocaleString()}+
              </Box>{' '}
              photos at 60 FPS with TanStack Virtual — only{' '}
              <Box
                component='span'
                sx={{
                  fontWeight: 700,
                  color: isLight ? '#B8891F' : '#F5D060',
                  fontFamily: 'monospace',
                }}
              >
                {renderedCount}
              </Box>{' '}
              DOM nodes are actually rendered.
            </PFTypography>
          </Stack>
        </motion.div>

        {/* ── Stats ── */}
        <StatsBar
          totalPhotos={photos.length}
          renderedPhotos={renderedCount}
          fps={fps}
        />

        {/* ── Grid ── */}
        <Box ref={gridRef} sx={{ flex: 1, minHeight: 0 }}>
          <VirtualizedGalleryGrid
            photos={photos}
            isLoading={isLoading}
            onLoadMore={loadMore}
            onPhotoClick={handlePhotoClick}
          />
        </Box>

        {/* ── Tech footnote ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
              mt: 2,
              pb: 1,
            }}
          >
            {[
              'TanStack Virtual',
              'Infinite Scroll',
              'Lazy Loading',
              'Memo Cards',
            ].map(tech => (
              <Box
                key={tech}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                  color: isLight ? '#B8891F' : '#F5D060',
                  border: `1px solid ${isLight ? 'rgba(184,137,31,0.15)' : 'rgba(245,208,96,0.15)'}`,
                  background: isLight
                    ? 'rgba(184,137,31,0.04)'
                    : 'rgba(245,208,96,0.04)',
                }}
              >
                {tech}
              </Box>
            ))}
          </Box>
        </motion.div>
      </Stack>

      {/* ── Lightbox ── */}
      <Lightbox photo={selectedPhoto} onClose={handleLightboxClose} />
    </SunriseBackground>
  );
};
