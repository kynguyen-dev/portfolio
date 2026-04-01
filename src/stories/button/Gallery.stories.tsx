import type { Meta } from '@storybook/react';
import {
  PFButton,
  PFSolidButton,
  PFStrokeButton,
  PFWhiteButton,
} from '@components/core';
import { fn } from '@storybook/test';
import { PaperPlaneTiltIcon, DownloadSimpleIcon } from '@phosphor-icons/react';

const meta = {
  title: 'Core/Button/Gallery',
  component: PFButton,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof PFButton>;

export default meta;

export const AllVariants = () => (
  <div className='flex flex-col items-center gap-8'>
    <h2 className='text-xl font-bold text-ct-on-surface'>Button Variants</h2>
    <div className='flex flex-row gap-4 flex-wrap justify-center'>
      <PFButton variant='solid' onClick={fn()}>
        Solid (Purple Glow)
      </PFButton>
      <PFButton variant='stroke' onClick={fn()}>
        Stroke (Ghost Border)
      </PFButton>
      <PFButton variant='ghost' onClick={fn()}>
        Ghost
      </PFButton>
      <PFButton variant='mint' onClick={fn()}>
        Mint Logic
      </PFButton>
    </div>

    <h3 className='text-lg font-semibold text-ct-on-surface'>
      Pre-styled Buttons
    </h3>
    <div className='flex flex-row gap-4 flex-wrap justify-center'>
      <PFSolidButton onClick={fn()}>Solid</PFSolidButton>
      <PFStrokeButton onClick={fn()}>Stroke</PFStrokeButton>
      <PFWhiteButton onClick={fn()}>White</PFWhiteButton>
    </div>

    <h3 className='text-lg font-semibold text-ct-on-surface'>With Icons</h3>
    <div className='flex flex-row gap-4 flex-wrap justify-center'>
      <PFSolidButton
        startIcon={<PaperPlaneTiltIcon size={16} />}
        onClick={fn()}
      >
        Send
      </PFSolidButton>
      <PFStrokeButton endIcon={<DownloadSimpleIcon size={16} />} onClick={fn()}>
        Download
      </PFStrokeButton>
    </div>

    <h3 className='text-lg font-semibold text-ct-on-surface'>Sizes</h3>
    <div className='flex flex-row gap-4 items-center flex-wrap justify-center'>
      <PFSolidButton size='small' onClick={fn()}>
        Small
      </PFSolidButton>
      <PFSolidButton size='medium' onClick={fn()}>
        Medium
      </PFSolidButton>
      <PFSolidButton size='large' onClick={fn()}>
        Large
      </PFSolidButton>
    </div>

    <h3 className='text-lg font-semibold text-ct-on-surface'>States</h3>
    <div className='flex flex-row gap-4 flex-wrap justify-center'>
      <PFSolidButton disabled>Disabled</PFSolidButton>
      <PFStrokeButton disabled>Disabled Stroke</PFStrokeButton>
    </div>
  </div>
);
