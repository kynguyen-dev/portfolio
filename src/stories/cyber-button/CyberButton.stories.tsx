import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CyberButton } from '@components/core/cyber-button';

const meta = {
  title: 'Core/CyberButton',
  component: CyberButton,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#10141a' }],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    active: { control: 'boolean' },
  },
} satisfies Meta<typeof CyberButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Basic Variants ───

export const Default: Story = {
  args: {
    children: '_Cyber',
    glitchText: '_Cyber🦾',
    tag: 'r1',
  },
};

export const Active: Story = {
  args: {
    children: '_Radio',
    glitchText: '_R_a_d_i_o_',
    tag: 'r2',
    active: true,
  },
};

export const Small: Story = {
  args: {
    children: 'Hack',
    glitchText: 'H_a_c_k',
    tag: 's1',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Execute',
    glitchText: 'Ex_e_cute_',
    tag: 'x1',
    size: 'lg',
  },
};

// ─── Interactive Toggle Demo ───

export const ToggleDemo: Story = {
  args: {
    children: 'Click Me',
    glitchText: 'Cl_ick_Me_',
    tag: 't1',
  },
  render: function ToggleDemoRender(args) {
    const [isActive, setIsActive] = useState(false);
    return (
      <CyberButton
        {...args}
        active={isActive}
        onClick={() => setIsActive(!isActive)}
      />
    );
  },
};

// ─── Gallery: Row of buttons ───

export const Gallery: Story = {
  args: { children: '' },
  render: () => {
    const items = [
      { label: '_Cyber', glitch: '_Cyber🦾', tag: 'r1' },
      { label: '_Radio', glitch: '_R_a_d_i_o_', tag: 'r2' },
      { label: 'Buttons', glitch: 'Buttons_', tag: 'r3' },
    ];

    return (
      <div style={{ display: 'flex', gap: 0 }}>
        {items.map((item, i) => (
          <CyberButton
            key={i}
            glitchText={item.glitch}
            tag={item.tag}
            active={i === 1}
          >
            {item.label}
          </CyberButton>
        ))}
      </div>
    );
  },
};
