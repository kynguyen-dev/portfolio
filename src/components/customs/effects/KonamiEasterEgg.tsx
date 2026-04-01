import { useEffect, useState, useCallback, useRef } from 'react';
import { animated, useTransition, useSpring } from '@react-spring/web';
import { useThemeMode } from '@contexts/theme-mode';
import { cn } from '@utils/core/cn';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const KonamiEasterEgg = () => {
  const { mode } = useThemeMode();
  const [triggered, setTriggered] = useState(false);
  const bufferRef = useRef<string[]>([]);

  const check = useCallback((buf: string[]) => {
    if (buf.length < KONAMI.length) return;
    const tail = buf.slice(-KONAMI.length);
    if (tail.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())) {
      setTriggered(true);
      bufferRef.current = [];
      setTimeout(() => setTriggered(false), 4000);
    }
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const next = [...bufferRef.current, e.key].slice(-KONAMI.length);
      bufferRef.current = next;
      check(next);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [check]);

  const particles = Array.from({ length: 40 }, (_, i) => {
    const colors = [
      '#D4A843',
      '#E8C96A',
      '#C75B39',
      '#FF6B6B',
      '#4ECDC4',
      '#FFE66D',
    ];
    return {
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      size: 6 + Math.random() * 10,
      color: colors[i % colors.length],
      rotate: Math.random() * 720 - 360,
      duration: 2.5 + Math.random(),
    };
  });

  const overlayTransition = useTransition(triggered, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 600 },
  });

  const bannerSpring = useSpring({
    from: { y: -80, opacity: 0 },
    to: triggered ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 },
    config: { tension: 300, friction: 20 },
  });

  return (
    <>
      {overlayTransition((style, show) =>
        show ? (
          <animated.div
            key='konami-overlay'
            style={style}
            className='fixed inset-0 z-[100001] pointer-events-none overflow-hidden'
          >
            <animated.div
              style={{
                ...bannerSpring,
                position: 'absolute',
                top: 40,
                left: '50%',
                transform: 'translateX(-50%)',
              }}
              className={cn(
                'px-8 py-3 rounded-xl font-bold text-lg tracking-widest text-center select-none shadow-2xl',
                mode === 'dark' ? 'text-[#1A1410]' : 'text-[#FBF6EE]',
                'bg-gradient-to-r from-primary-light to-primary-main shadow-primary-main/40'
              )}
            >
              🎮 KONAMI CODE ACTIVATED! 🎮
            </animated.div>

            {particles.map(p => (
              <div
                key={p.id}
                className={cn(
                  'absolute',
                  p.id % 3 === 0
                    ? 'rounded-full'
                    : p.id % 3 === 1
                      ? 'rounded-sm'
                      : ''
                )}
                style={{
                  left: `${p.x}vw`,
                  width: p.size,
                  height: p.size,
                  background: p.color,
                  animation: `konami-fall ${p.duration}s ${p.delay}s ease-in forwards`,
                }}
              />
            ))}
          </animated.div>
        ) : null
      )}
      <style>{`
        @keyframes konami-fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </>
  );
};
