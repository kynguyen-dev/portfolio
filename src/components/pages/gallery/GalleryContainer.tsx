import { useState, useCallback, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { PFGradientTypography, PFTypography } from '@components/core';
import { SunriseBackground } from '@components/customs/backgrounds/SunriseBackground';
import { animated, useSpring } from '@react-spring/web';
import { useThemeMode } from '@contexts/theme-mode';
import type { GalleryPhoto } from './types';
import { useGalleryPhotos } from './useGalleryPhotos';
import { useFps } from './useFps';
import { VirtualizedGalleryGrid } from './VirtualizedGalleryGrid';
import { StatsBar } from './StatsBar';
import { Lightbox } from './Lightbox';

export const GalleryContainer = () => {
  const navigate = useNavigate();
  const { mode } = useThemeMode();
  const isLight = mode === 'light';

  const { photos, isLoading, loadMore } = useGalleryPhotos();
  const fps = useFps();
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [renderedCount, setRenderedCount] = useState(0);

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

  const handlePhotoClick = useCallback(
    (photo: GalleryPhoto) => setSelectedPhoto(photo),
    []
  );
  const handleLightboxClose = useCallback(() => setSelectedPhoto(null), []);

  const titleSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { duration: 500 },
  });

  const [emojiToggle, setEmojiToggle] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => setEmojiToggle(prev => !prev), 1500);
    return () => clearInterval(interval);
  }, []);
  const emojiSpring = useSpring({
    rotateZ: emojiToggle ? 5 : -5,
    config: { duration: 1500 },
  });
  const footnoteSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1000,
    config: { duration: 500 },
  });

  return (
    <SunriseBackground sun={false} rays={false} particles={false}>
      <main className='min-h-screen px-3 sm:px-4 md:px-8 py-4 md:py-6 flex flex-col'>
        {/* Back button */}
        <div className='fixed top-5 left-5 z-50'>
          <button
            onClick={() => navigate({ to: '/' })}
            aria-label='Back to portfolio'
            title='Back to portfolio'
            className='flex items-center justify-center w-10 h-10 rounded-full text-ct-on-surface bg-ct-surface-container/80 backdrop-blur-xl border border-ct-outline-variant/20 hover:bg-ct-surface-container-high/90 transition-colors cursor-pointer'
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        {/* Title */}
        <animated.div style={titleSpring}>
          <div className='flex flex-col items-center gap-2 pt-14 md:pt-8 pb-4'>
            <animated.div
              style={{ ...emojiSpring, fontSize: '2.5rem', lineHeight: 1 }}
            >
              🖼️
            </animated.div>
            <PFGradientTypography variant='h4' fontWeight={800}>
              Infinite Photo Gallery
            </PFGradientTypography>
            <PFTypography
              variant='body2'
              className='text-center max-w-[600px] leading-relaxed text-ct-on-surface-variant'
            >
              Rendering{' '}
              <span className='font-bold font-mono text-ct-secondary'>
                {photos.length.toLocaleString()}+
              </span>{' '}
              photos at 60 FPS with TanStack Virtual — only{' '}
              <span className='font-bold font-mono text-ct-secondary'>
                {renderedCount}
              </span>{' '}
              DOM nodes are actually rendered.
            </PFTypography>
          </div>
        </animated.div>

        <StatsBar
          totalPhotos={photos.length}
          renderedPhotos={renderedCount}
          fps={fps}
        />

        <div ref={gridRef} className='flex-1 min-h-0'>
          <VirtualizedGalleryGrid
            photos={photos}
            isLoading={isLoading}
            onLoadMore={loadMore}
            onPhotoClick={handlePhotoClick}
          />
        </div>

        <animated.div style={footnoteSpring}>
          <div className='flex justify-center gap-4 flex-wrap mt-4 pb-2'>
            {[
              'TanStack Virtual',
              'Infinite Scroll',
              'Lazy Loading',
              'Memo Cards',
            ].map(tech => (
              <span
                key={tech}
                className={`px-3 py-1 rounded text-[0.65rem] font-semibold tracking-wide uppercase border ${
                  isLight
                    ? 'text-[#B8891F] border-[rgba(184,137,31,0.15)] bg-[rgba(184,137,31,0.04)]'
                    : 'text-[#F5D060] border-[rgba(245,208,96,0.15)] bg-[rgba(245,208,96,0.04)]'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </animated.div>
      </main>

      <Lightbox photo={selectedPhoto} onClose={handleLightboxClose} />
    </SunriseBackground>
  );
};
