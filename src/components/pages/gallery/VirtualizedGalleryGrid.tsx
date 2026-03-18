import { useRef, useMemo, useCallback, useState, useEffect, memo } from 'react';
import { Box, useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { GalleryPhoto } from './types';
import { PFTypography } from '@components/core';

/* ─── Constants ─── */
const GAP = 8;
/**
 * Overscan = number of extra rows to render outside the viewport.
 * Lower = fewer DOM nodes = better FPS. 2 rows is enough for smooth scroll.
 */
const OVERSCAN = 2;
/** Fixed row height for uniform grid */
const ROW_HEIGHT = 220;

/* ─── Lazy image with IntersectionObserver ─── */
interface LazyImageProps {
  src: string;
  alt: string;
  color: string;
}

/**
 * Only sets the `src` attribute once the image enters the viewport.
 * This prevents the browser from fetching images that TanStack Virtual
 * has rendered into the DOM but that sit in the overscan zone (off-screen).
 */
const LazyImage = memo(({ src, alt, color }: LazyImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <img
        ref={imgRef}
        src={isVisible ? src : undefined}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease-out',
        }}
      />
      {/* Color placeholder while loading */}
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: color,
          }}
        />
      )}
    </>
  );
});

LazyImage.displayName = 'LazyImage';

/* ─── Photo card (no Framer Motion — pure CSS for performance) ─── */
interface GalleryPhotoCardProps {
  photo: GalleryPhoto;
  onClick: (photo: GalleryPhoto) => void;
}

const GalleryPhotoCard = memo(({ photo, onClick }: GalleryPhotoCardProps) => {
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';

  return (
    <Box
      onClick={() => onClick(photo)}
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'zoom-in',
        position: 'relative',
        background: photo.color,
        transition: 'box-shadow 0.25s ease, transform 0.2s ease',
        willChange: 'transform',
        '&:hover': {
          boxShadow: `0 8px 32px ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.15)'}`,
          transform: 'translateY(-2px) scale(1.02)',
          zIndex: 2,
          '& .photo-overlay': { opacity: 1 },
        },
      }}
    >
      <LazyImage
        src={photo.thumbSrc}
        alt={`Photo by ${photo.author}`}
        color={photo.color}
      />

      {/* Hover overlay */}
      <Box
        className='photo-overlay'
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          px: 1.5,
          py: 1,
          opacity: 0,
          transition: 'opacity 0.2s',
          background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)',
          pointerEvents: 'none',
        }}
      >
        <PFTypography
          variant='caption'
          sx={{
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.7rem',
          }}
        >
          {photo.author}
        </PFTypography>
      </Box>
    </Box>
  );
});

GalleryPhotoCard.displayName = 'GalleryPhotoCard';

/* ─── Row data ─── */
interface RowData {
  photos: GalleryPhoto[];
}

const buildRows = (photos: GalleryPhoto[], columnCount: number): RowData[] => {
  const rows: RowData[] = [];
  for (let i = 0; i < photos.length; i += columnCount) {
    rows.push({ photos: photos.slice(i, i + columnCount) });
  }
  return rows;
};

/* ─── Main virtualized grid ─── */
interface VirtualizedGalleryGridProps {
  photos: GalleryPhoto[];
  isLoading: boolean;
  onLoadMore: () => void;
  onPhotoClick: (photo: GalleryPhoto) => void;
}

export const VirtualizedGalleryGrid = ({
  photos,
  isLoading,
  onLoadMore,
  onPhotoClick,
}: VirtualizedGalleryGridProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { palette, breakpoints } = useTheme();
  const isLight = palette.mode === 'light';
  const isXs = useMediaQuery(breakpoints.down('sm'));
  const isSm = useMediaQuery(breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(breakpoints.between('md', 'lg'));

  const columnCount = isXs ? 2 : isSm ? 3 : isMd ? 4 : 5;

  const rows = useMemo(
    () => buildRows(photos, columnCount),
    [photos, columnCount]
  );

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT + GAP,
    overscan: OVERSCAN,
  });

  const virtualItems = virtualizer.getVirtualItems();

  /* Infinite scroll trigger */
  useEffect(() => {
    if (virtualItems.length === 0) return;
    const lastItem = virtualItems[virtualItems.length - 1];
    if (lastItem && lastItem.index >= rows.length - 2 && !isLoading) {
      onLoadMore();
    }
  }, [virtualItems, rows.length, isLoading, onLoadMore]);

  /* Rendered count for stats */
  const renderedCount = virtualItems.reduce(
    (sum, vi) => sum + (rows[vi.index]?.photos.length ?? 0),
    0
  );

  useEffect(() => {
    const el = parentRef.current;
    if (el) el.dataset.renderedCount = String(renderedCount);
  }, [renderedCount]);

  const handlePhotoClick = useCallback(
    (photo: GalleryPhoto) => onPhotoClick(photo),
    [onPhotoClick]
  );

  return (
    <Box
      ref={parentRef}
      data-rendered-count={renderedCount}
      sx={{
        height: 'calc(100vh - 280px)',
        minHeight: 400,
        overflow: 'auto',
        borderRadius: 3,
        background: isLight ? 'rgba(255,248,240,0.4)' : 'rgba(11, 13, 46, 0.3)',
        border: `1px solid ${isLight ? 'rgba(184,137,31,0.1)' : 'rgba(245,208,96,0.1)'}`,
        /* GPU-accelerated scroll container */
        willChange: 'scroll-position',
        '&::-webkit-scrollbar': { width: 8 },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: 4,
          background: isLight
            ? 'rgba(184,137,31,0.25)'
            : 'rgba(245,208,96,0.25)',
          '&:hover': {
            background: isLight
              ? 'rgba(184,137,31,0.4)'
              : 'rgba(245,208,96,0.4)',
          },
        },
      }}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
          /* contain tells the browser this box won't affect outside layout */
          contain: 'layout size',
        }}
      >
        {virtualItems.map(virtualRow => {
          const row = rows[virtualRow.index];
          if (!row) return null;

          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: ROW_HEIGHT,
                transform: `translateY(${virtualRow.start}px)`,
                display: 'grid',
                gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
                gap: `${GAP}px`,
                padding: `0 ${GAP}px`,
                /* contain for each row */
                contain: 'layout style',
              }}
            >
              {row.photos.map(photo => (
                <GalleryPhotoCard
                  key={photo.id}
                  photo={photo}
                  onClick={handlePhotoClick}
                />
              ))}
            </div>
          );
        })}
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1.5,
            py: 3,
          }}
        >
          <CircularProgress
            size={20}
            sx={{ color: isLight ? '#B8891F' : '#F5D060' }}
          />
          <PFTypography
            variant='caption'
            sx={{
              color: isLight ? '#8B7355' : '#C8B88A',
              fontWeight: 500,
            }}
          >
            Loading more photos…
          </PFTypography>
        </Box>
      )}
    </Box>
  );
};
