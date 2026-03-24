import type { Meta, StoryObj } from '@storybook/react';
import { IconTypography } from '@components/core';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';

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
    icon: <Mail className='text-primary-main' size={18} />,
    text: 'kynt101099@gmail.com',
  },
};

export const WithPhone: Story = {
  args: {
    icon: <Phone className='text-primary-main' size={18} />,
    text: '+84 868 772 887',
  },
};

export const AllContactTypes = () => (
  <div className='flex flex-col gap-4'>
    <IconTypography
      icon={<Mail className='text-primary-main' size={18} />}
      text='kynt101099@gmail.com'
    />
    <IconTypography
      icon={<Phone className='text-primary-main' size={18} />}
      text='+84 868 772 887'
    />
    <IconTypography
      icon={<Github className='text-primary-main' size={18} />}
      text='kynguyen-dev'
    />
    <IconTypography
      icon={<Linkedin className='text-primary-main' size={18} />}
      text='kynguyen-dev'
    />
  </div>
);
