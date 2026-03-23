import { useEffect, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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

/**
 * Easter egg – type the Konami code (↑↑↓↓←→←→BA) to trigger a fun
 * confetti-like particle burst on screen.
 */
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

  /* Generate random particles */
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
      x: Math.random() * 100, // vw
      delay: Math.random() * 0.5,
      size: 6 + Math.random() * 10,
      color: colors[i % colors.length],
      rotate: Math.random() * 720 - 360,
    };
  });

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          key='konami-overlay'
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className='fixed inset-0 z-[100001] pointer-events-none overflow-hidden'
        >
          {/* Achievement banner */}
          <motion.div
            initial={{ y: -80, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: -80, opacity: 0, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={cn(
              'absolute top-10 left-1/2 px-8 py-3 rounded-xl font-bold text-lg tracking-widest text-center select-none shadow-2xl',
              mode === 'dark' ? 'text-[#1A1410]' : 'text-[#FBF6EE]',
              'bg-gradient-to-r from-primary-light to-primary-main shadow-primary-main/40'
            )}
          >
            🎮 KONAMI CODE ACTIVATED! 🎮
          </motion.div>

          {/* Confetti particles */}
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ y: '-10vh', x: `${p.x}vw`, opacity: 1, rotate: 0 }}
              animate={{
                y: '110vh',
                rotate: p.rotate,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 2.5 + Math.random(),
                delay: p.delay,
                ease: 'easeIn',
              }}
              className={cn(
                'absolute',
                p.id % 3 === 0
                  ? 'rounded-full'
                  : p.id % 3 === 1
                    ? 'rounded-sm'
                    : ''
              )}
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
