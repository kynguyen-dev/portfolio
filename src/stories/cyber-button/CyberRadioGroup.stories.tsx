import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CyberRadioGroup } from '@components/core/cyber-button';
import type { CyberRadioOption } from '@components/core/cyber-button';

const defaultOptions: CyberRadioOption[] = [
  { value: 'cyber', label: '_Cyber', glitchText: '_Cyber🦾', tag: 'r1' },
  { value: 'radio', label: '_Radio', glitchText: '_R_a_d_i_o_', tag: 'r2' },
  { value: 'buttons', label: 'Buttons', glitchText: 'Buttons_', tag: 'r3' },
];

const meta = {
  title: 'Core/CyberRadioGroup',
  component: CyberRadioGroup,
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
  },
} satisfies Meta<typeof CyberRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default (Controlled) ───

export const Default: Story = {
  args: {
    name: 'demo',
    options: defaultOptions,
    value: 'radio',
  },
  render: function DefaultRender(args) {
    const [selected, setSelected] = useState(args.value ?? 'radio');
    return (
      <CyberRadioGroup
        {...args}
        value={selected}
        onChange={v => setSelected(v)}
      />
    );
  },
};

// ─── Small Size ───

export const Small: Story = {
  args: {
    name: 'demo-sm',
    options: defaultOptions,
    value: 'cyber',
    size: 'sm',
  },
  render: function SmallRender(args) {
    const [selected, setSelected] = useState(args.value ?? 'cyber');
    return (
      <CyberRadioGroup
        {...args}
        value={selected}
        onChange={v => setSelected(v)}
      />
    );
  },
};

// ─── Large Size ───

export const Large: Story = {
  args: {
    name: 'demo-lg',
    options: [
      { value: 'init', label: 'Init_', glitchText: 'In_i_t_', tag: 'x1' },
      { value: 'exec', label: 'Execute', glitchText: 'Ex_ecute_', tag: 'x2' },
      {
        value: 'deploy',
        label: 'Deploy',
        glitchText: 'D_e_p_l_o_y',
        tag: 'x3',
      },
    ],
    value: 'exec',
    size: 'lg',
  },
  render: function LargeRender(args) {
    const [selected, setSelected] = useState(args.value ?? 'exec');
    return (
      <CyberRadioGroup
        {...args}
        value={selected}
        onChange={v => setSelected(v)}
      />
    );
  },
};

// ─── Many Options ───

export const ManyOptions: Story = {
  args: {
    name: 'many',
    options: [
      { value: 'a', label: 'Alpha', glitchText: 'A_lpha_', tag: '01' },
      { value: 'b', label: 'Bravo', glitchText: 'Br_avo_', tag: '02' },
      { value: 'c', label: 'Charlie', glitchText: 'Ch_arlie_', tag: '03' },
      { value: 'd', label: 'Delta', glitchText: 'D_elta_', tag: '04' },
      { value: 'e', label: 'Echo', glitchText: 'E_cho_', tag: '05' },
    ],
    value: 'c',
  },
  render: function ManyRender(args) {
    const [selected, setSelected] = useState(args.value ?? 'c');
    return (
      <CyberRadioGroup
        {...args}
        value={selected}
        onChange={v => setSelected(v)}
      />
    );
  },
};
