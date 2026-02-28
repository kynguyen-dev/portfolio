import { useState, useEffect } from 'react';
import { Fab, Zoom, useTheme } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

/**
 * Floating "back to top" button that appears after scrolling
 * past a threshold (default 400px).
 */
export const BackToTop = ({ threshold = 400 }: { threshold?: number }) => {
  const { palette } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Zoom in={visible}>
      <Fab
        onClick={scrollToTop}
        aria-label="Back to top"
        size="small"
        sx={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 1500,
          background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.secondary.main})`,
          color: '#fff',
          boxShadow: `0 4px 20px ${palette.primary.main}60`,
          '&:hover': {
            background: `linear-gradient(135deg, ${palette.primary.light}, ${palette.secondary.light})`,
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};
