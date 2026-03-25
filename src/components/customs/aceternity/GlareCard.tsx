/**
 * Glare Card — Aceternity UI Pattern
 * Inspired by Linear's holographic card effect.
 * Adapted for @react-spring/web (no framer-motion).
 *
 * Features:
 * - 3D perspective tilt following mouse cursor
 * - Diagonal glare beam that sweeps across the card surface
 * - Radial spotlight glow at cursor position
 * - Smooth spring-physics transitions
 */
import {
  useRef,
  useState,
  useCallback,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react';
import { useSpring, animated } from '@react-spring/web';
import { cn } from '@utils/core/cn';

interface GlareCardProps {
  children: ReactNode;
  className?: string;
  /** Glare beam color — use rgba with low alpha */
  glareColor?: string;
  /** Maximum tilt angle in degrees (default 6) */
  maxTilt?: number;
  /** Glare beam size as percentage of card diagonal (default 60) */
  glareSize?: number;
}

export const GlareCard = ({
  children,
  className,
  glareColor = 'rgba(255, 255, 255, 0.12)',
  maxTilt = 6,
  glareSize = 60,
}: GlareCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 }); // normalized 0-1
  const [isHovering, setIsHovering] = useState(false);

  // 3D tilt spring
  const [tiltSpring, tiltApi] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    config: { tension: 350, friction: 40 },
  }));

  // Glare opacity spring
  const glareSpring = useSpring({
    opacity: isHovering ? 1 : 0,
    config: { tension: 200, friction: 25 },
  });

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 → 1
      const y = (e.clientY - rect.top) / rect.height; // 0 → 1

      tiltApi.start({
        rotateX: (y - 0.5) * -maxTilt * 2,
        rotateY: (x - 0.5) * maxTilt * 2,
        scale: 1.02,
      });
      setPos({ x, y });
    },
    [tiltApi, maxTilt],
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    tiltApi.start({ rotateX: 0, rotateY: 0, scale: 1 });
  }, [tiltApi]);

  // Glare angle follows cursor — beam sweeps diagonally
  const glareAngle = Math.atan2(pos.y - 0.5, pos.x - 0.5) * (180 / Math.PI);
  const glarePosX = pos.x * 100;
  const glarePosY = pos.y * 100;

  return (
    <div
      ref={ref}
      className={cn('relative group/glare', className)}
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <animated.div
        style={{
          transform: tiltSpring.rotateX.to(
            (rx) =>
              `rotateX(${rx}deg) rotateY(${tiltSpring.rotateY.get()}deg) scale(${tiltSpring.scale.get()})`,
          ),
          transformStyle: 'preserve-3d',
        }}
        className='relative overflow-hidden rounded-2xl glass-panel transition-shadow duration-500 hover:shadow-[0_25px_80px_rgba(208,188,255,0.12)]'
      >
        {/* ── Glare beam overlay ── */}
        <animated.div
          style={{
            opacity: glareSpring.opacity,
            backgroundImage: `linear-gradient(${glareAngle + 90}deg, transparent 0%, ${glareColor} ${glareSize / 2}%, transparent ${glareSize}%)`,
            backgroundPosition: `${glarePosX}% ${glarePosY}%`,
            backgroundSize: '200% 200%',
          }}
          className='pointer-events-none absolute inset-0 z-20'
        />

        {/* ── Radial spotlight at cursor ── */}
        <animated.div
          style={{
            opacity: glareSpring.opacity.to((o) => o * 0.7),
            backgroundImage: `radial-gradient(500px circle at ${glarePosX}% ${glarePosY}%, ${glareColor}, transparent 45%)`,
          }}
          className='pointer-events-none absolute inset-0 z-10'
        />

        {/* ── Edge highlight — subtle bright border on cursor side ── */}
        <animated.div
          style={{
            opacity: glareSpring.opacity.to((o) => o * 0.4),
            backgroundImage: `radial-gradient(ellipse at ${glarePosX}% ${glarePosY}%, rgba(255,255,255,0.15), transparent 60%)`,
          }}
          className='pointer-events-none absolute inset-0 z-30 mix-blend-overlay'
        />

        {/* ── Card content ── */}
        <div className='relative z-40'>{children}</div>
      </animated.div>
    </div>
  );
};
