import { styled } from '@mui/material';
import { motion } from 'framer-motion';

export const Overlay = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(30, 58, 138, 0.6)', // Default overlay color
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'background-color 0.3s ease-in-out',
  opacity: 1,
}));

export const OverlayContent = styled(motion.div)({
  opacity: 0, // Initially hidden
  transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
  transform: 'translateY(10px)', // Slight movement
});
