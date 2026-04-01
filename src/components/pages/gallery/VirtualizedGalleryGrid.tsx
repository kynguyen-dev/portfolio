import { useRef, useMemo, useCallback, useState, useEffect, memo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useThemeMode } from '@contexts/theme-mode';
import type { GalleryPhoto } from './types';
import { PFTypography } from '@components/core';

const GAP = 8;
const OVERSCAN = 2;
const ROW_HEIGHT = 220;

/* ─── Lazy image with IntersectionObserver ─── */
interface LazyImageProps {
  src: string;
  alt: string;
  color: string;
}

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
      {!loaded && (
        <div style={{ position: 'absolute', inset: 0, background: color }} />
      )}
    </>
  );
});
LazyImage.displayName = 'LazyImage';

/* ─── Photo card ─── */
interface GalleryPhotoCardProps {
  photo: GalleryPhoto;
  onClick: (photo: GalleryPhoto) => void;
}

const GalleryPhotoCard = memo(({ photo, onClick }: GalleryPhotoCardProps) => {
  return (
    <div
      onClick={() => onClick(photo)}
      className='w-full h-full rounded-lg overflow-hidden cursor-zoom-in relative will-change-transform transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:z-[2] group'
      style={{ background: photo.color }}
    >
      <LazyImage
        src={photo.thumbSrc}
        alt={`Photo by ${photo.author}`}
        color={photo.color}
      />
      <div
        className='absolute bottom-0 left-0 right-0 px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)',
        }}
      >
        <PFTypography
          variant='caption'
          fontWeight={600}
          style={{ color: '#fff', fontSize: '0.7rem' }}
        >
          {photo.author}
        </PFTypography>
      </div>
    </div>
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

/* ─── Hook to determine column count based on viewport ─── */
const useColumnCount = () => {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w < 640 ? 2 : w < 768 ? 3 : w < 1024 ? 4 : 5);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return cols;
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
  const { mode } = useThemeMode();
  const isLight = mode === 'light';
  const columnCount = useColumnCount();

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

  useEffect(() => {
    if (virtualItems.length === 0) return;
    const lastItem = virtualItems[virtualItems.length - 1];
    if (lastItem && lastItem.index >= rows.length - 2 && !isLoading)
      onLoadMore();
  }, [virtualItems, rows.length, isLoading, onLoadMore]);

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
    <div
      ref={parentRef}
      data-rendered-count={renderedCount}
      className='rounded-xl overflow-auto will-change-scroll'
      style={{
        height: 'calc(100vh - 280px)',
        minHeight: 400,
        background: isLight ? 'rgba(255,248,240,0.4)' : 'rgba(11,13,46,0.3)',
        border: `1px solid ${isLight ? 'rgba(184,137,31,0.1)' : 'rgba(245,208,96,0.1)'}`,
      }}
    >
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: '100%',
          position: 'relative',
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

      {isLoading && (
        <div className='flex justify-center items-center gap-3 py-6'>
          <div
            className='w-5 h-5 border-2 border-t-transparent rounded-full animate-spin'
            style={{
              borderColor: isLight ? '#B8891F' : '#F5D060',
              borderTopColor: 'transparent',
            }}
          />
          <PFTypography
            variant='caption'
            fontWeight={500}
            style={{ color: isLight ? '#8B7355' : '#C8B88A' }}
          >
            Loading more photos…
          </PFTypography>
        </div>
      )}
    </div>
  );
};
