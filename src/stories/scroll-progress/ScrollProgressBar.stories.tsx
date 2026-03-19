import { Meta } from '@storybook/react';
import { ScrollProgressBar } from '@components/core/scroll-progress/ScrollProgressBar';
import { Box, Typography, Stack } from '@mui/material';

const meta = {
  title: 'Core/ScrollProgressBar',
  component: ScrollProgressBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollProgressBar>;

export default meta;

export const Default = () => (
  <Box>
    <ScrollProgressBar />
    <Stack spacing={4} sx={{ p: 4 }}>
      <Typography variant='h4' fontWeight={700}>
        Scroll Progress Bar
      </Typography>
      <Typography variant='body1' color='text.secondary'>
        Scroll down in this panel to see the progress bar at the top. The bar
        uses a gradient of the primary and secondary colors and animates
        smoothly with a spring physics.
      </Typography>
      {/* Generate tall content so the user can scroll */}
      {Array.from({ length: 20 }, (_, i) => (
        <Box
          key={i}
          sx={{
            p: 3,
            borderRadius: 2,
            background: `rgba(128, 128, 128, ${0.05 + (i % 3) * 0.03})`,
          }}
        >
          <Typography variant='h6'>Section {i + 1}</Typography>
          <Typography variant='body2' color='text.secondary'>
            Scroll content placeholder to demonstrate the progress indicator.
          </Typography>
        </Box>
      ))}
    </Stack>
  </Box>
);
