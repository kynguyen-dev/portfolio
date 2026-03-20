import { styled } from '@mui/material';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(30, 58, 138, 0.95)', // Increased opacity for better readability
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Can switch to 'flex-start' if scrolling is needed
  alignItems: 'center',
  textAlign: 'center',
  transition: 'opacity 0.3s ease-in-out, background-color 0.3s ease-in-out',
  opacity: 0,
  overflowY: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  padding: theme.spacing(2),
}));

export const OverlayContent = styled(motion.div)({
  opacity: 0, // Initially hidden
  transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
  transform: 'translateY(10px)', // Slight movement
});
