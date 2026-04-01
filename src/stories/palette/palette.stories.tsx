import { Meta } from '@storybook/react';
import { PFTypography } from '@components/core';

const PaletteViewer = () => <div>Theme/Palette</div>;

export default {
  title: 'Theme/Palette',
  component: PaletteViewer,
} as Meta<typeof PaletteViewer>;

const ColorSwatch = ({ name, value }: { name: string; value: string }) => (
  <div className='min-w-[200px] rounded-lg overflow-hidden bg-ct-surface-container-low'>
    <div className='h-20' style={{ backgroundColor: value }} />
    <div className='p-3'>
      <PFTypography variant='body1' className='font-bold'>
        {name}
      </PFTypography>
      <PFTypography
        variant='body2'
        className='text-ct-on-surface-variant font-label-grotesk text-xs'
      >
        {value}
      </PFTypography>
    </div>
  </div>
);

const colorGroups = [
  {
    title: 'PRIMARY (Purple / Narrative)',
    colors: [
      { name: 'primary-main', value: '#d0bcff' },
      { name: 'primary-light', value: '#e9ddff' },
      { name: 'primary-dark', value: '#6d3bd7' },
      { name: 'primary-container', value: '#a078ff' },
      { name: 'on-primary', value: '#3c0091' },
    ],
  },
  {
    title: 'SECONDARY (Mint / Logic)',
    colors: [
      { name: 'secondary-main', value: '#4edea3' },
      { name: 'secondary-light', value: '#6ffbbe' },
      { name: 'secondary-dark', value: '#00a572' },
      { name: 'on-secondary', value: '#003824' },
    ],
  },
  {
    title: 'TERTIARY (Blue)',
    colors: [
      { name: 'tertiary', value: '#adc6ff' },
      { name: 'tertiary-container', value: '#4d8eff' },
    ],
  },
  {
    title: 'SURFACE (Obsidian Hierarchy)',
    colors: [
      { name: 'surface-container-lowest', value: '#0a0e14' },
      { name: 'surface / background', value: '#10141a' },
      { name: 'surface-container-low', value: '#181c22' },
      { name: 'surface-container', value: '#1c2026' },
      { name: 'surface-container-high', value: '#262a31' },
      { name: 'surface-container-highest', value: '#31353c' },
      { name: 'surface-bright', value: '#353940' },
    ],
  },
  {
    title: 'TEXT & OUTLINE',
    colors: [
      { name: 'on-surface', value: '#dfe2eb' },
      { name: 'on-surface-variant', value: '#cbc3d7' },
      { name: 'outline', value: '#958ea0' },
      { name: 'outline-variant', value: '#494454' },
    ],
  },
  {
    title: 'ERROR',
    colors: [
      { name: 'error', value: '#ffb4ab' },
      { name: 'error-container', value: '#93000a' },
    ],
  },
];

export const DesignTokens = () => (
  <div className='flex flex-col gap-12'>
    <div className='text-center mb-4'>
      <h1 className='font-serif-display text-3xl text-ct-secondary mb-2'>
        The Algorithmic Atelier
      </h1>
      <p className='text-ct-on-surface-variant text-sm'>
        Obsidian depth · Purple narrative · Mint logic
      </p>
    </div>
    {colorGroups.map(group => (
      <div key={group.title} className='flex flex-col gap-4'>
        <h2 className='font-label-grotesk text-xs font-black tracking-[0.2em] uppercase text-ct-secondary'>
          {group.title}
        </h2>
        <div className='flex flex-row gap-4 flex-wrap'>
          {group.colors.map(color => (
            <ColorSwatch key={color.name} {...color} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const GlassPanel = () => (
  <div className='flex flex-col gap-8'>
    <h2 className='font-label-grotesk text-xs font-black tracking-[0.2em] uppercase text-ct-secondary'>
      GLASSMORPHISM VARIANTS
    </h2>
    <div className='flex gap-6 flex-wrap'>
      <div className='glass-panel p-8 rounded-2xl w-64'>
        <h3 className='font-serif-display text-lg text-ct-secondary mb-2'>
          Glass Panel
        </h3>
        <p className='text-ct-on-surface-variant text-sm'>
          60% opacity + blur(20px)
        </p>
      </div>
      <div className='glass-elevated p-8 rounded-2xl w-64'>
        <h3 className='font-serif-display text-lg text-ct-secondary mb-2'>
          Glass Elevated
        </h3>
        <p className='text-ct-on-surface-variant text-sm'>
          65% opacity + blur(24px)
        </p>
      </div>
      <div className='glass p-8 rounded-2xl w-64 primary-glow'>
        <h3 className='font-serif-display text-lg text-primary-main mb-2'>
          Primary Glow
        </h3>
        <p className='text-ct-on-surface-variant text-sm'>Purple glow effect</p>
      </div>
      <div className='glass p-8 rounded-2xl w-64 mint-glow'>
        <h3 className='font-serif-display text-lg text-ct-secondary mb-2'>
          Mint Glow
        </h3>
        <p className='text-ct-on-surface-variant text-sm'>Mint accent glow</p>
      </div>
    </div>
  </div>
);

export const Typography = () => (
  <div className='flex flex-col gap-8'>
    <h2 className='font-label-grotesk text-xs font-black tracking-[0.2em] uppercase text-ct-secondary'>
      TYPOGRAPHY SYSTEM
    </h2>
    <div className='flex flex-col gap-6'>
      <div>
        <span className='hud-label text-xs mb-2 block'>
          The Weaver (Noto Serif)
        </span>
        <h1 className='font-serif-display text-5xl text-ct-on-surface'>
          Synthesizing Architecture
        </h1>
      </div>
      <div>
        <span className='hud-label text-xs mb-2 block'>
          The Architect (Space Grotesk)
        </span>
        <p className='font-label-grotesk text-xl text-ct-on-surface'>
          PURE_LOGIC // System Status Active
        </p>
      </div>
      <div>
        <span className='hud-label text-xs mb-2 block'>HUD Label</span>
        <span className='hud-label'>[ SYSTEM_STATUS : ACTIVE_SYNTHESIS ]</span>
      </div>
      <div>
        <span className='hud-label text-xs mb-2 block'>HUD Breadcrumb</span>
        <span className='hud-breadcrumb'>
          ARCHITECT <span className='hud-breadcrumb-separator'>{'// '}</span>
          LOGIC <span className='hud-breadcrumb-separator'>{':: '}</span>
          WEAVER
        </span>
      </div>
    </div>
  </div>
);

export const TopologyGrid = () => (
  <div className='flex flex-col gap-8'>
    <h2 className='font-label-grotesk text-xs font-black tracking-[0.2em] uppercase text-ct-secondary'>
      BACKGROUND PATTERNS
    </h2>
    <div className='flex gap-6'>
      <div className='relative w-80 h-48 bg-ct-surface-container-lowest rounded-2xl overflow-hidden'>
        <div className='absolute inset-0 topology-grid opacity-20' />
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='hud-label'>topology-grid</span>
        </div>
      </div>
      <div className='relative w-80 h-48 vanta-bg rounded-2xl overflow-hidden bg-ct-bg'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='hud-label'>vanta-bg</span>
        </div>
      </div>
    </div>
  </div>
);
