import type { Meta } from '@storybook/react';
import { PFButton, PFSolidButton, PFStrokeButton, PFWhiteButton } from '@components/core';
import { fn } from '@storybook/test';
import { Stack, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';

const meta = {
  title: 'Core/Button/Gallery',
  component: PFButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PFButton>;

export default meta;

/** Side-by-side comparison of all button variants */
export const AllVariants = () => (
  <Stack spacing={4} alignItems="center">
    <Typography variant="h5" fontWeight={700}>
      Button Variants
    </Typography>
    <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
      <PFButton variant="contained" color="primary" onClick={fn()}>
        Primary Contained
      </PFButton>
      <PFButton variant="outlined" color="primary" onClick={fn()}>
        Primary Outlined
      </PFButton>
      <PFButton variant="text" color="primary" onClick={fn()}>
        Primary Text
      </PFButton>
    </Stack>

    <Typography variant="h6" fontWeight={600}>
      Pre-styled Buttons
    </Typography>
    <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
      <PFSolidButton onClick={fn()}>Solid</PFSolidButton>
      <PFStrokeButton onClick={fn()}>Stroke</PFStrokeButton>
      <PFWhiteButton onClick={fn()}>White</PFWhiteButton>
    </Stack>

    <Typography variant="h6" fontWeight={600}>
      With Icons
    </Typography>
    <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
      <PFSolidButton startIcon={<SendIcon />} onClick={fn()}>
        Send
      </PFSolidButton>
      <PFStrokeButton endIcon={<DownloadIcon />} onClick={fn()}>
        Download
      </PFStrokeButton>
    </Stack>

    <Typography variant="h6" fontWeight={600}>
      Sizes
    </Typography>
    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" justifyContent="center">
      <PFSolidButton size="small" onClick={fn()}>Small</PFSolidButton>
      <PFSolidButton size="medium" onClick={fn()}>Medium</PFSolidButton>
      <PFSolidButton size="large" onClick={fn()}>Large</PFSolidButton>
    </Stack>

    <Typography variant="h6" fontWeight={600}>
      States
    </Typography>
    <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
      <PFSolidButton disabled>Disabled</PFSolidButton>
      <PFStrokeButton disabled>Disabled Stroke</PFStrokeButton>
    </Stack>
  </Stack>
);
