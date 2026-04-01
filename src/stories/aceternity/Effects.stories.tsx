import type { Meta } from '@storybook/react';
import {
  TextGenerateEffect,
  WavyBackground,
  Lamp,
  ThreeDCard,
} from '@components/customs/aceternity';

const EffectsMeta = {
  title: 'Aceternity/Effects',
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta;

export default EffectsMeta;

/* ─── TextGenerateEffect ─── */
export const TextGenerate = () => (
  <div className='p-12'>
    <TextGenerateEffect
      words='Synthesizing architecture through algorithmic precision and human narrative.'
      className='font-serif-display text-3xl md:text-5xl text-ct-on-surface'
    />
  </div>
);

/* ─── WavyBackground ─── */
export const Wavy = () => (
  <WavyBackground containerClassName='min-h-[400px]'>
    <h2 className='font-serif-display text-4xl text-ct-on-surface text-center'>
      Wavy Background
    </h2>
    <p className='text-ct-on-surface-variant text-center mt-4'>
      Animated purple-mint wave pattern
    </p>
  </WavyBackground>
);

/* ─── Lamp ─── */
export const LampEffect = () => (
  <Lamp>
    <h2 className='font-serif-display text-5xl text-primary-main text-center'>
      The Atelier Lamp
    </h2>
    <p className='text-ct-on-surface-variant text-center mt-4'>
      A decorative purple glow emanates from above
    </p>
  </Lamp>
);

/* ─── ThreeDCard ─── */
export const ThreeDCardEffect = () => (
  <div className='flex justify-center p-12'>
    <ThreeDCard>
      <div className='glass-panel p-8 rounded-2xl w-80'>
        <h3 className='font-serif-display text-2xl text-ct-secondary mb-4'>
          3D Tilt Card
        </h3>
        <p className='text-ct-on-surface-variant text-sm leading-relaxed'>
          Move your mouse over this card to see it tilt in 3D space. Uses
          react-spring for smooth physics-based animation.
        </p>
        <div className='mt-6 flex gap-2'>
          <span className='px-3 py-1 text-[10px] bg-primary-main/10 text-primary-main tracking-widest uppercase'>
            React-Spring
          </span>
          <span className='px-3 py-1 text-[10px] bg-ct-secondary/10 text-ct-secondary tracking-widest uppercase'>
            Tailwind
          </span>
        </div>
      </div>
    </ThreeDCard>
  </div>
);
