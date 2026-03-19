import type { Meta, StoryObj } from '@storybook/react';
import { IconTypography } from '@components/core';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Stack } from '@mui/material';

const meta = {
  title: 'Core/Typography/IconTypography',
  component: IconTypography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['body1', 'body2', 'subtitle1', 'subtitle2', 'caption', 'h6'],
    },
  },
} satisfies Meta<typeof IconTypography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithEmail: Story = {
  args: {
    icon: <EmailIcon color='primary' />,
    text: 'kynt101099@gmail.com',
    variant: 'body1',
  },
};

export const WithPhone: Story = {
  args: {
    icon: <PhoneIcon color='primary' />,
    text: '+84 868 772 887',
    variant: 'body1',
  },
};

export const AllContactTypes = () => (
  <Stack spacing={2}>
    <IconTypography
      icon={<EmailIcon color='primary' />}
      text='kynt101099@gmail.com'
    />
    <IconTypography
      icon={<PhoneIcon color='primary' />}
      text='+84 868 772 887'
    />
    <IconTypography icon={<GitHubIcon color='primary' />} text='kynguyen-dev' />
    <IconTypography
      icon={<LinkedInIcon color='primary' />}
      text='kynguyen-dev'
    />
  </Stack>
);
