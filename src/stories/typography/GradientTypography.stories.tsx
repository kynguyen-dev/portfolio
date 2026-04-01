import type { Meta, StoryObj } from '@storybook/react';
import { PFGradientTypography } from '@components/core';
import { APP_THEMES, APP_TYPOGRAPHIES_ANIMATION } from '@constants';

const meta = {
  title: 'Core/Typography/Gradient',
  component: PFGradientTypography,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: [APP_THEMES.LIGHT, APP_THEMES.DARK],
    },
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'body1'],
    },
  },
} satisfies Meta<typeof PFGradientTypography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Gradient Typography',
    variant: 'h3',
    theme: APP_THEMES.LIGHT,
  },
};
export const DarkTheme: Story = {
  args: {
    children: 'Dark Gradient Text',
    variant: 'h3',
    theme: APP_THEMES.DARK,
  },
};
export const CustomColors: Story = {
  args: {
    children: 'Custom Colors',
    variant: 'h2',
    colors: ['#FF6B6B', '#4ECDC4', '#FFE66D'],
  },
};
export const WithTypewriter: Story = {
  args: {
    children: 'Typewriter + Gradient',
    variant: 'h3',
    animations: [APP_TYPOGRAPHIES_ANIMATION.TYPEWRITER],
    speed: 80,
  },
};

export const AllVariants = () => (
  <div className='flex flex-col gap-4 items-start'>
    <PFGradientTypography variant='h1'>Heading 1</PFGradientTypography>
    <PFGradientTypography variant='h2'>Heading 2</PFGradientTypography>
    <PFGradientTypography variant='h3'>Heading 3</PFGradientTypography>
    <PFGradientTypography variant='h4'>Heading 4</PFGradientTypography>
    <PFGradientTypography variant='h5'>Heading 5</PFGradientTypography>
    <PFGradientTypography variant='h6'>Heading 6</PFGradientTypography>
  </div>
);
