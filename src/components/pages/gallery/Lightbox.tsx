import { Box, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryPhoto } from './types';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { PFTypography } from '@components/core';
import { useEffect, useCallback } from 'react';

interface LightboxProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
}

/**
 * Full-screen lightbox overlay for viewing a single photo.
 * Closes on backdrop click, ESC key, or close button.
 */
export const Lightbox = ({ photo, onClose }: LightboxProps) => {
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (photo) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [photo, handleKeyDown]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          key='lightbox'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(20px)',
            cursor: 'zoom-out',
          }}
        >
          {/* Close button */}
          <Box
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              zIndex: 10,
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              '&:hover': {
                background: 'rgba(255,255,255,0.2)',
              },
            }}
          >
            <CloseIcon />
          </Box>

          {/* Image container */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
              cursor: 'default',
            }}
          >
            <Box
              component='img'
              src={photo.src}
              alt={`Photo by ${photo.author}`}
              loading='lazy'
              sx={{
                maxWidth: '100%',
                maxHeight: '78vh',
                objectFit: 'contain',
                borderRadius: 2,
                boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
              }}
            />

            {/* Photo info */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 3,
                py: 1.5,
                borderRadius: 2,
                background: isLight
                  ? 'rgba(255,248,240,0.9)'
                  : 'rgba(11, 13, 46, 0.7)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)'}`,
              }}
            >
              <PFTypography
                variant='body2'
                sx={{ color: isLight ? '#5C4A32' : '#FFE4B5', fontWeight: 600 }}
              >
                📸 {photo.author}
              </PFTypography>
              <PFTypography
                variant='caption'
                sx={{ color: isLight ? '#8B7355' : '#C8B88A' }}
              >
                {photo.width * 2} × {photo.height * 2}
              </PFTypography>
              <Box
                component='a'
                href={photo.src}
                target='_blank'
                rel='noopener noreferrer'
                onClick={e => e.stopPropagation()}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: isLight ? '#B8891F' : '#F5D060',
                  '&:hover': { opacity: 0.8 },
                }}
              >
                <OpenInNewIcon sx={{ fontSize: 16 }} />
              </Box>
            </Box>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
