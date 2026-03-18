import { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

const EXTENSIONS = ['jpg', 'png', 'webp', 'jpeg', 'gif'];

interface MultiFormatImageProps {
  /** Base path WITHOUT extension, e.g. `/images/three-kingdoms/avatar/guan-yu` */
  basePath: string;
  alt?: string;
  sx?: SxProps<Theme>;
  /** Render when no image format loads successfully */
  fallback?: React.ReactNode;
}

/**
 * Tries loading an image from `basePath` with multiple extensions (.jpg, .png, .webp, .jpeg, .gif).
 * Shows the first format that loads successfully, or renders the fallback if none work.
 *
 * Uses a JavaScript `Image()` object to probe for the correct extension without
 * rendering anything to the DOM (avoids layout/overflow clipping issues).
 */
export const MultiFormatImage = ({ basePath, alt = '', sx, fallback }: MultiFormatImageProps) => {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const probeRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let idx = 0;

    const tryNext = () => {
      if (cancelled || idx >= EXTENSIONS.length) {
        if (!cancelled) setFailed(true);
        return;
      }

      const img = new Image();
      probeRef.current = img;
      const src = `${basePath}.${EXTENSIONS[idx]}`;

      img.onload = () => {
        if (!cancelled) {
          setResolvedSrc(src);
          setFailed(false);
        }
      };

      img.onerror = () => {
        idx += 1;
        if (!cancelled) tryNext();
      };

      img.src = src;
    };

    // Reset state for new basePath
    setResolvedSrc(null);
    setFailed(false);
    tryNext();

    return () => {
      cancelled = true;
      if (probeRef.current) {
        probeRef.current.onload = null;
        probeRef.current.onerror = null;
        probeRef.current = null;
      }
    };
  }, [basePath]);

  if (failed) {
    return <>{fallback}</>;
  }

  if (!resolvedSrc) {
    // Shimmer skeleton while probing
    return (
      <Box
        sx={{
          ...((sx ?? {}) as Record<string, unknown>),
          background: 'linear-gradient(90deg, rgba(128,128,128,0.08) 25%, rgba(128,128,128,0.18) 50%, rgba(128,128,128,0.08) 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s ease-in-out infinite',
          '@keyframes shimmer': {
            '0%': { backgroundPosition: '200% 0' },
            '100%': { backgroundPosition: '-200% 0' },
          },
        }}
      />
    );
  }

  return (
    <Box
      component="img"
      src={resolvedSrc}
      alt={alt}
      sx={sx}
    />
  );
};

