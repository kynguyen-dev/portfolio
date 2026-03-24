import {
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react';
import { useSpring, animated } from '@react-spring/web';
import { cn } from '@utils/core/cn';

interface CardHoverEffectProps {
  items: {
    title: string;
    description: string;
    link?: string;
    icon?: ReactNode;
  }[];
  className?: string;
}

export const HoverEffect = ({ items, className }: CardHoverEffectProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className='relative group block p-2'
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatedBackground isHovered={hoveredIndex === idx} />
          <div className='relative z-10 glass-panel rounded-2xl p-6 h-full'>
            {item.icon && (
              <div className='mb-4 text-ct-secondary'>{item.icon}</div>
            )}
            <h4 className='text-ct-on-surface font-bold text-lg mb-2'>
              {item.title}
            </h4>
            <p className='text-ct-on-surface-variant text-sm leading-relaxed'>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const AnimatedBackground = ({ isHovered }: { isHovered: boolean }) => {
  const spring = useSpring({
    opacity: isHovered ? 1 : 0,
    scale: isHovered ? 1 : 0.95,
    config: { tension: 300, friction: 20 },
  });

  return (
    <animated.div
      style={spring}
      className='absolute inset-0 rounded-2xl bg-ct-surface-container-high/50'
    />
  );
};

/**
 * Spotlight Card — follows mouse cursor with a radial glow
 */
interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export const SpotlightCard = ({
  children,
  className,
  spotlightColor = 'rgba(78, 222, 163, 0.15)',
}: SpotlightCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const spring = useSpring({
    opacity: isHovering ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden glass-panel rounded-2xl',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <animated.div
        style={{
          ...spring,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
        className='pointer-events-none absolute inset-0 z-0'
      />
      <div className='relative z-10'>{children}</div>
    </div>
  );
};

/**
 * Moving Border — animated border gradient that rotates around the element
 */
interface MovingBorderProps {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
  duration?: number;
  borderClassName?: string;
}

export const MovingBorder = ({
  children,
  className,
  borderRadius = '1rem',
  duration = 4000,
  borderClassName,
}: MovingBorderProps) => {
  return (
    <div
      className={cn('relative inline-block overflow-hidden p-[1px]', className)}
      style={{ borderRadius }}
    >
      <div
        className={cn('absolute inset-0', borderClassName)}
        style={{
          borderRadius,
          background: `conic-gradient(from 0deg, transparent 70%, #d0bcff 80%, #4edea3 90%, transparent 100%)`,
          animation: `spin ${duration}ms linear infinite`,
        }}
      />
      <div
        className='relative bg-ct-surface-container z-10'
        style={{ borderRadius }}
      >
        {children}
      </div>
    </div>
  );
};
