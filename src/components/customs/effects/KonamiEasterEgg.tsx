import { useEffect, useState, useCallback, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';

const KONAMI = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

/**
 * Easter egg – type the Konami code (↑↑↓↓←→←→BA) to trigger a fun
 * confetti-like particle burst on screen.
 */
export const KonamiEasterEgg = () => {
  const { palette } = useTheme();
  const [triggered, setTriggered] = useState(false);
  const bufferRef = useRef<string[]>([]);

  const check = useCallback(
    (buf: string[]) => {
      if (buf.length < KONAMI.length) return;
      const tail = buf.slice(-KONAMI.length);
      if (tail.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())) {
        setTriggered(true);
        bufferRef.current = [];
        setTimeout(() => setTriggered(false), 4000);
      }
    },
    [],
  );

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
      palette.primary.light,
      palette.primary.main,
      palette.secondary?.main ?? palette.primary.dark,
      '#FF6B6B',
      '#4ECDC4',
      '#FFE66D',
    ];
    return {
      id: i,
      x: Math.random() * 100,          // vw
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
          key="konami-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100001,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          {/* Achievement banner */}
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              position: 'absolute',
              top: 40,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: '1.1rem',
                letterSpacing: 2,
                color: palette.mode === 'dark' ? '#1A1410' : '#FBF6EE',
                background: `linear-gradient(135deg, ${palette.primary.light}, ${palette.primary.main})`,
                boxShadow: `0 4px 30px ${palette.primary.main}66`,
                textAlign: 'center',
                userSelect: 'none',
              }}
            >
              🎮 KONAMI CODE ACTIVATED! 🎮
            </Box>
          </motion.div>

          {/* Confetti particles */}
          {particles.map((p) => (
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
              style={{
                position: 'absolute',
                width: p.size,
                height: p.size,
                borderRadius: p.id % 3 === 0 ? '50%' : p.id % 3 === 1 ? '2px' : '0%',
                background: p.color,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
