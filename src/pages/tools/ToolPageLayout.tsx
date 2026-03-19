import { Stack, Box, IconButton, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from '@tanstack/react-router';
import { PFTypography, PFGradientTypography } from '@components/core';
import { SunriseBackground } from '@components/customs/backgrounds/SunriseBackground';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ToolPageLayoutProps {
  title: string;
  emoji: string;
  description: string;
  children?: ReactNode;
}

/**
 * Shared layout for tool pages — gradient background, back button,
 * animated title section, and a content area for the actual tool.
 */
const ToolPageLayout = ({
  title,
  emoji,
  description,
  children,
}: ToolPageLayoutProps) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';

  return (
    <SunriseBackground>
      <Stack
        component='main'
        minHeight='100vh'
        alignItems='center'
        justifyContent='center'
        sx={{ px: { xs: 2, md: 4 }, py: { xs: 10, md: 12 } }}
      >
        {/* Back button */}
        <Box sx={{ position: 'fixed', top: 20, left: 20, zIndex: 50 }}>
          <IconButton
            onClick={() => navigate({ to: '/' })}
            aria-label='Back to portfolio'
            sx={{
              color: isLight ? '#5C4A32' : '#FFE4B5',
              background: isLight
                ? 'rgba(255,248,240, 0.8)'
                : 'rgba(11, 13, 46, 0.6)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)'}`,
              '&:hover': {
                background: isLight
                  ? 'rgba(255,248,240, 0.95)'
                  : 'rgba(11, 13, 46, 0.85)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>

        {/* Animated content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Stack
            alignItems='center'
            spacing={3}
            sx={{
              textAlign: 'center',
              width: '100%',
              px: { xs: 2, md: 4 },
            }}
          >
            {/* Emoji icon with pulse */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: '4rem', lineHeight: 1 }}
            >
              {emoji}
            </motion.div>

            {/* Title */}
            <PFGradientTypography variant='h3' fontWeight={800}>
              {title}
            </PFGradientTypography>

            {/* Description */}
            <PFTypography
              variant='h6'
              sx={{
                color: isLight ? '#5C4A32' : '#FFE4B5',
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              {description}
            </PFTypography>

            {/* Optional children for future tool content */}
            {children}
          </Stack>
        </motion.div>
      </Stack>
    </SunriseBackground>
  );
};

export default ToolPageLayout;
