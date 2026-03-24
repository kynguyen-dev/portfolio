import type { Meta, StoryObj } from '@storybook/react';
import {
  HoverEffect,
  SpotlightCard,
  MovingBorder,
} from '@components/customs/aceternity';
import {
  Code,
  Database,
  HardDrives,
  Cloud,
  ShieldCheck,
  Lightning,
} from '@phosphor-icons/react';

/* ─── HoverEffect ─── */
const HoverEffectMeta = {
  title: 'Aceternity/HoverEffect',
  component: HoverEffect,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof HoverEffect>;

export default HoverEffectMeta;
type HoverStory = StoryObj<typeof HoverEffectMeta>;

export const Default: HoverStory = {
  args: {
    items: [
      {
        title: 'React 18',
        description:
          'Component-driven architecture with hooks, concurrent features, and server components.',
        icon: <Code size={24} />,
      },
      {
        title: 'TypeScript',
        description:
          'Strict type system for reliable, maintainable codebases at scale.',
        icon: <ShieldCheck size={24} />,
      },
      {
        title: 'PostgreSQL',
        description:
          'Relational data modeling with advanced indexing and query optimization.',
        icon: <Database size={24} />,
      },
      {
        title: 'Node.js',
        description:
          'Event-driven runtime for high-throughput backend services.',
        icon: <HardDrives size={24} />,
      },
      {
        title: 'AWS EC2',
        description:
          'Scalable cloud compute with auto-scaling and load balancing.',
        icon: <Cloud size={24} />,
      },
      {
        title: 'Vite',
        description:
          'Next-gen build tooling with instant HMR and optimized bundling.',
        icon: <Lightning size={24} />,
      },
    ],
  },
};

/* ─── SpotlightCard ─── */
export const SpotlightCardStory = () => (
  <div className='flex gap-6'>
    <SpotlightCard className='p-8 w-72'>
      <h3 className='font-serif-display text-xl text-ct-on-surface mb-2'>
        Spotlight Effect
      </h3>
      <p className='text-ct-on-surface-variant text-sm'>
        Mouse over to see the radial mint glow follow your cursor.
      </p>
    </SpotlightCard>
    <SpotlightCard
      className='p-8 w-72'
      spotlightColor='rgba(208, 188, 255, 0.15)'
    >
      <h3 className='font-serif-display text-xl text-ct-on-surface mb-2'>
        Purple Spotlight
      </h3>
      <p className='text-ct-on-surface-variant text-sm'>
        Custom spotlight color matching the primary purple.
      </p>
    </SpotlightCard>
  </div>
);
SpotlightCardStory.storyName = 'SpotlightCard';

/* ─── MovingBorder ─── */
export const MovingBorderStory = () => (
  <div className='flex gap-8 items-center'>
    <MovingBorder>
      <div className='px-8 py-4'>
        <span className='text-ct-secondary font-bold'>
          Moving Border Button
        </span>
      </div>
    </MovingBorder>
    <MovingBorder duration={6000} borderRadius='1.5rem'>
      <div className='px-8 py-6'>
        <h3 className='font-serif-display text-lg text-ct-on-surface mb-1'>
          Premium Card
        </h3>
        <p className='text-ct-on-surface-variant text-sm'>
          Rotating conic gradient border
        </p>
      </div>
    </MovingBorder>
  </div>
);
MovingBorderStory.storyName = 'MovingBorder';
