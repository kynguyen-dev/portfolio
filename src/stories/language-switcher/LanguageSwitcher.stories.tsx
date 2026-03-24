import { Meta } from '@storybook/react';
import { LanguageSwitcher } from '@components/core/language-switcher/LanguageSwitcher';

const meta = {
  title: 'Core/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageSwitcher>;

export default meta;

export const Default = () => (
  <div className='flex flex-col items-center gap-4'>
    <p className='text-sm text-text-secondary'>
      Click to switch between EN, VI, and JA
    </p>
    <LanguageSwitcher />
  </div>
);
