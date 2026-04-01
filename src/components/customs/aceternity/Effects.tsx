import {
  ReactNode,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
} from 'react';
import { useSpring, animated, useTrail } from '@react-spring/web';
import { cn } from '@utils/core/cn';

/**
 * Text Generate Effect — characters appear one by one with a spring animation
 */
interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 500,
}: TextGenerateEffectProps) => {
  const wordsArray = words.split(' ');

  const trail = useTrail(wordsArray.length, {
    from: { opacity: 0, y: 10, filter: filter ? 'blur(10px)' : 'none' },
    to: { opacity: 1, y: 0, filter: filter ? 'blur(0px)' : 'none' },
    config: { duration },
  });

  return (
    <div className={cn('font-bold', className)}>
      <div className='leading-snug tracking-wide'>
        {trail.map((style, idx) => (
          <animated.span
            key={`${wordsArray[idx]}-${idx}`}
            style={style}
            className='inline-block mr-[0.25em]'
          >
            {wordsArray[idx]}
          </animated.span>
        ))}
      </div>
    </div>
  );
};

/**
 * Wavy Background — animated wave pattern using CSS
 */
interface WavyBackgroundProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  speed?: 'slow' | 'fast';
}

export const WavyBackground = ({
  children,
  className,
  containerClassName,
}: WavyBackgroundProps) => {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center overflow-hidden',
        containerClassName
      )}
    >
      {/* Animated ink wash layers */}
      <div className='absolute inset-0 pointer-events-none'>
        <div
          className='absolute inset-0 opacity-30 dark:opacity-20'
          style={{
            background: `radial-gradient(circle at 20% 30%, var(--sys-primary-main) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, var(--sys-secondary-main) 0%, transparent 50%)`,
            filter: 'blur(80px)',
            animation: 'inkFloat 15s ease-in-out infinite alternate',
          }}
        />
        <div
          className='absolute inset-0 opacity-20 dark:opacity-10'
          style={{
            background: `radial-gradient(circle at 70% 20%, var(--sys-secondary-main) 0%, transparent 40%),
                        radial-gradient(circle at 30% 80%, var(--sys-primary-main) 0%, transparent 40%)`,
            filter: 'blur(60px)',
            animation: 'inkFloat 12s ease-in-out infinite alternate-reverse',
          }}
        />
      </div>
      <div className={cn('relative z-10', className)}>{children}</div>
      <style>{`
        @keyframes inkFloat {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(5%, 2%) scale(1.1); }
          100% { transform: translate(-2%, 5%) scale(1.05); }
        }
      `}</style>
    </div>
  );
};

/**
 * Lamp Effect — a decorative glowing "lamp" emanating from the top
 */
interface LampProps {
  children: ReactNode;
  className?: string;
}

export const Lamp = ({ children, className }: LampProps) => {
  const spring = useSpring({
    from: { opacity: 0, width: '15rem' },
    to: { opacity: 1, width: '30rem' },
    config: { tension: 120, friction: 30 },
  });

  return (
    <div
      className={cn(
        'relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden bg-ct-surface-container-lowest w-full rounded-2xl',
        className
      )}
    >
      <div className='relative flex w-full flex-1 items-center justify-center'>
        {/* Lamp glow */}
        <animated.div
          style={{
            opacity: spring.opacity,
            width: spring.width,
          }}
          className='absolute inset-auto z-30 h-36 -translate-y-[6rem] rounded-full bg-primary-main/30 blur-2xl'
        />
        <animated.div
          style={{
            opacity: spring.opacity,
            width: spring.width,
          }}
          className='absolute inset-auto z-50 h-0.5 -translate-y-[6rem] bg-primary-main'
        />
        {/* Gradient cone */}
        <div className='absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-ct-surface-container-lowest' />
      </div>
      <div className='relative z-50 -mt-48'>{children}</div>
    </div>
  );
};

/**
 * 3D Card — tilts on mouse move using react-spring
 */
interface ThreeDCardProps {
  children: ReactNode;
  className?: string;
}

export const ThreeDCard = ({ children, className }: ThreeDCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const [{ rotateX, rotateY }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    config: { tension: 350, friction: 40 },
  }));

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;
    api.start({ rotateX: rX, rotateY: rY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    api.start({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      <animated.div
        style={{
          transform: rotateX.to(
            rx => `rotateX(${rx}deg) rotateY(${rotateY.get()}deg)`
          ),
        }}
        className={cn(
          'transition-shadow duration-300',
          isHovering && 'shadow-[0_20px_50px_rgba(208,188,255,0.15)]'
        )}
      >
        {children}
      </animated.div>
    </div>
  );
};
