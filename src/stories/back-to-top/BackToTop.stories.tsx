import type { Meta, StoryObj } from '@storybook/react';
import { BackToTop } from '@components/core/back-to-top/BackToTop';
import { Box, Typography, Stack } from '@mui/material';

const meta = {
  title: 'Core/BackToTop',
  component: BackToTop,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    threshold: {
      control: { type: 'number', min: 100, max: 1000, step: 50 },
      description: 'Scroll distance in px before the button appears',
    },
  },
} satisfies Meta<typeof BackToTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    threshold: 200,
  },
  render: args => (
    <Box>
      <Stack spacing={3} sx={{ p: 4 }}>
        <Typography variant='h4' fontWeight={700}>
          Back to Top Button
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Scroll down past {args.threshold}px to reveal the floating button in
          the bottom-left corner.
        </Typography>
        {Array.from({ length: 25 }, (_, i) => (
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
              Keep scrolling to see the back-to-top button appear.
            </Typography>
          </Box>
        ))}
      </Stack>
      <BackToTop threshold={args.threshold} />
    </Box>
  ),
};
