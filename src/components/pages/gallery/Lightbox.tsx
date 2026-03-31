import { animated, useTransition, useSpring } from '@react-spring/web';
import { XIcon, ArrowSquareOutIcon } from '@phosphor-icons/react';
import { PFTypography } from '@components/core';
import { useEffect, useCallback, useState } from 'react';
import { useThemeMode } from '@contexts/theme-mode';
import type { GalleryPhoto } from './types';

interface LightboxProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
}

export const Lightbox = ({ photo, onClose }: LightboxProps) => {
  const { mode } = useThemeMode();
  const isLight = mode === 'light';
  const [closeHovered, setCloseHovered] = useState(false);

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

  const overlayTransition = useTransition(photo, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 250 },
  });

  const closeSpring = useSpring({
    scale: closeHovered ? 1.1 : 1,
    config: { tension: 300, friction: 10 },
  });

  return (
    <>
      {overlayTransition((style, item) =>
        item ? (
          <animated.div
            key='lightbox'
            style={{
              ...style,
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
            onClick={onClose}
          >
            <animated.button
              style={{
                ...closeSpring,
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
              }}
              onMouseEnter={() => setCloseHovered(true)}
              onMouseLeave={() => setCloseHovered(false)}
              onClick={onClose}
            >
              <XIcon size={20} />
            </animated.button>

            <div
              onClick={e => e.stopPropagation()}
              className='max-w-[90vw] max-h-[85vh] flex flex-col items-center gap-4 cursor-default'
            >
              <img
                src={item.src}
                alt={`Photo by ${item.author}`}
                loading='lazy'
                className='max-w-full max-h-[78vh] object-contain rounded-lg shadow-[0_20px_80px_rgba(0,0,0,0.5)]'
              />

              <div
                className='flex items-center gap-4 px-6 py-3 rounded-lg backdrop-blur-xl'
                style={{
                  background: isLight
                    ? 'rgba(255,248,240,0.9)'
                    : 'rgba(11,13,46,0.7)',
                  border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)'}`,
                }}
              >
                <PFTypography
                  variant='body2'
                  fontWeight={600}
                  style={{ color: isLight ? '#5C4A32' : '#FFE4B5' }}
                >
                  📸 {item.author}
                </PFTypography>
                <PFTypography
                  variant='caption'
                  style={{ color: isLight ? '#8B7355' : '#C8B88A' }}
                >
                  {item.width * 2} × {item.height * 2}
                </PFTypography>
                <a
                  href={item.src}
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={e => e.stopPropagation()}
                  className='flex items-center hover:opacity-80'
                  style={{ color: isLight ? '#B8891F' : '#F5D060' }}
                >
                  <ArrowSquareOutIcon size={16} />
                </a>
              </div>
            </div>
          </animated.div>
        ) : null
      )}
    </>
  );
};
