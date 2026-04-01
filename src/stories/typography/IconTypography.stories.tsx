import type { Meta, StoryObj } from '@storybook/react';
import { IconTypography } from '@components/core';
import {
  EnvelopeIcon,
  PhoneIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from '@phosphor-icons/react';

const meta = {
  title: 'Core/Typography/IconTypography',
  component: IconTypography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IconTypography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithEmail: Story = {
  args: {
    icon: <EnvelopeIcon className='text-primary-main' size={18} />,
    text: 'kynt101099@gmail.com',
  },
};

export const WithPhone: Story = {
  args: {
    icon: <PhoneIcon className='text-primary-main' size={18} />,
    text: '+84 868 772 887',
  },
};

export const AllContactTypes = () => (
  <div className='flex flex-col gap-4'>
    <IconTypography
      icon={<EnvelopeIcon className='text-primary-main' size={18} />}
      text='kynt101099@gmail.com'
    />
    <IconTypography
      icon={<PhoneIcon className='text-primary-main' size={18} />}
      text='+84 868 772 887'
    />
    <IconTypography
      icon={<GithubLogoIcon className='text-primary-main' size={18} />}
      text='kynguyen-dev'
    />
    <IconTypography
      icon={<LinkedinLogoIcon className='text-primary-main' size={18} />}
      text='kynguyen-dev'
    />
  </div>
);
