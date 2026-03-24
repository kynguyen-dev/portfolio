import { Meta } from '@storybook/react';
import { ThemeModeToggle } from '@components/core/theme-toggle/ThemeModeToggle';

const meta = {
  title: 'Core/ThemeModeToggle',
  component: ThemeModeToggle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeModeToggle>;

export default meta;

export const Default = () => (
  <div className='flex flex-col items-center gap-4'>
    <p className='text-sm text-text-secondary'>
      Click the icon to toggle between dark and light mode
    </p>
    <ThemeModeToggle />
  </div>
);
