/**
 * Images Badge — Aceternity UI Pattern
 * A button/badge with stacked circular images that fan out on hover.
 * Inspired by Linear's CTA buttons.
 * Adapted for @react-spring/web (no framer-motion dependency).
 */
import {
  useState,
  ReactNode,
  MouseEvent as ReactMouseEvent,
  useCallback,
} from 'react';
import { useSpring, animated, useSprings } from '@react-spring/web';
import { cn } from '@utils/core/cn';

interface ImagesBadgeProps {
  children: ReactNode;
  /** Array of image URLs to display as floating badges */
  images: string[];
  /** How far images spread horizontally on hover (px), default: 24 */
  hoverSpread?: number;
  /** Rotation angle in degrees for fanned images, default: 12 */
  hoverRotation?: number;
  /** How far images translate upwards on hover (px), default: -30 */
  hoverTranslateY?: number;
  /** Size of each image circle (px), default: 36 */
  imageSize?: number;
  className?: string;
  /** Optional href — renders as <a> if provided, <button> otherwise */
  href?: string;
  /** Optional click handler */
  onClick?: (e: ReactMouseEvent<HTMLElement>) => void;
}

export const ImagesBadge = ({
  children,
  images,
  hoverSpread = 24,
  hoverRotation = 12,
  hoverTranslateY = -30,
  imageSize = 36,
  className,
  href,
  onClick,
}: ImagesBadgeProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const totalImages = images.length;

  // Badge scale spring
  const badgeSpring = useSpring({
    scale: isHovering ? 1.04 : 1,
    config: { tension: 300, friction: 20 },
  });

  // Image fan-out springs
  const [imageSprings] = useSprings(totalImages, (i) => {
    // Calculate spread: center offset for each image
    const center = (totalImages - 1) / 2;
    const offset = i - center;
    const spreadX = offset * hoverSpread;
    const rotation = offset * hoverRotation;

    return {
      x: isHovering ? spreadX : 0,
      y: isHovering ? hoverTranslateY : 0,
      rotate: isHovering ? rotation : 0,
      opacity: isHovering ? 1 : 0,
      scale: isHovering ? 1 : 0.6,
      config: {
        tension: 280,
        friction: 20,
        // Stagger delay via mass
        mass: 1 + i * 0.15,
      },
    };
  }, [isHovering, hoverSpread, hoverRotation, hoverTranslateY]);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  const Tag = href ? 'a' : 'button';
  const linkProps = href ? { href } : {};

  return (
    <div className='relative inline-flex items-center justify-center'>
      {/* Floating images */}
      <div
        className='absolute inset-0 flex items-center justify-center pointer-events-none z-0'
        aria-hidden
      >
        {imageSprings.map((style, i) => (
          <animated.div
            key={i}
            style={{
              x: style.x,
              y: style.y,
              rotate: style.rotate.to((r) => `${r}deg`),
              opacity: style.opacity,
              scale: style.scale,
            }}
            className='absolute'
          >
            <div
              className='rounded-full overflow-hidden border-2 border-ct-surface-container shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
              style={{ width: imageSize, height: imageSize }}
            >
              <img
                src={images[i]}
                alt=''
                className='w-full h-full object-cover'
                loading='lazy'
              />
            </div>
          </animated.div>
        ))}
      </div>

      {/* Main button/badge */}
      <animated.div style={{ scale: badgeSpring.scale }} className='relative z-10'>
        <Tag
          {...linkProps}
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn('relative cursor-pointer no-underline', className)}
        >
          {children}
        </Tag>
      </animated.div>
    </div>
  );
};
