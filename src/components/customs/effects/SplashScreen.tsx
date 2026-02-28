import { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/**
 * Full-screen animated splash screen displayed on initial page load.
 * Shows a greeting, the developer's name and role, then fades away.
 */
export const SplashScreen = () => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            background:
              palette.mode === 'dark'
                ? 'linear-gradient(135deg, #1A1410 0%, #2D1F10 50%, #1A1410 100%)'
                : 'linear-gradient(135deg, #FBF6EE 0%, #F5E6D0 50%, #FBF6EE 100%)',
          }}
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <Box
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                fontWeight: 400,
                letterSpacing: 6,
                textTransform: 'uppercase',
                color: palette.text.secondary,
                textAlign: 'center',
                userSelect: 'none',
                mb: 1,
              }}
            >
              {t('splash.greeting')}
            </Box>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          >
            <Box
              sx={{
                fontSize: { xs: '2.2rem', md: '3.5rem' },
                fontWeight: 800,
                letterSpacing: 4,
                background: `linear-gradient(135deg, ${palette.primary.light}, ${palette.primary.main}, ${palette.secondary?.main ?? palette.primary.dark})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                userSelect: 'none',
              }}
            >
              {t('splash.name')}
            </Box>
          </motion.div>

          {/* Animated line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 140 }}
            transition={{ duration: 1.0, delay: 0.8, ease: 'easeInOut' }}
            style={{
              height: 2,
              borderRadius: 2,
              marginTop: 12,
              background: `linear-gradient(90deg, ${palette.primary.light}, ${palette.primary.main})`,
            }}
          />

          {/* Role */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}
          >
            <Box
              sx={{
                fontSize: { xs: '0.85rem', md: '1.05rem' },
                fontWeight: 500,
                letterSpacing: 3,
                color: palette.text.secondary,
                textAlign: 'center',
                userSelect: 'none',
                mt: 2,
              }}
            >
              {t('splash.role')}
            </Box>
          </motion.div>

          {/* Pulsing dot loader */}
          <Box sx={{ display: 'flex', gap: 1, mt: 5 }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: palette.primary.main,
                }}
              />
            ))}
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
