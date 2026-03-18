import { Meta } from '@storybook/react';
import { Overlay, OverlayContent } from '@components/core/overlay';
import { Box, Typography } from '@mui/material';

const meta = {
  title: 'Core/Overlay',
  component: Overlay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Overlay>;

export default meta;

export const Default = () => (
  <Box
    sx={{
      position: 'relative',
      width: 360,
      height: 240,
      borderRadius: 2,
      overflow: 'hidden',
      background:
        'linear-gradient(135deg, rgba(75,25,66,0.8), rgba(11,13,46,0.9))',
      cursor: 'pointer',
      '&:hover .overlay': {
        opacity: 1,
      },
      '&:hover .overlay-content': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    }}
  >
    <Typography
      variant="h5"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#FFE4B5',
        fontWeight: 700,
        textAlign: 'center',
        zIndex: 0,
      }}
    >
      Hover Me
    </Typography>
    <Overlay className="overlay">
      <OverlayContent className="overlay-content">
        <Typography variant="h6" fontWeight={700}>
          Overlay Title
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          This overlay appears on hover with a smooth transition.
        </Typography>
      </OverlayContent>
    </Overlay>
  </Box>
);
