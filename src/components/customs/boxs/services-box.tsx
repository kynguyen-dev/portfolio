import { PFCard, PFTypography } from '@components/core';
import { Stack, IconButton, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface ServiceBoxProps {
  icon: ReactNode;
  title: string;
  content: string;
  background?: string;
  borderLeftColor?: string;
}

export const ServiceBox = (props: ServiceBoxProps) => {
  const { palette } = useTheme();

  return (
    <PFCard
      sx={{
        background: props.background ?? palette.primary.light,
        borderLeft: '5px solid',
        borderLeftColor: props.borderLeftColor ?? palette.secondary.main,
      }}
    >
      <Stack
        marginX={'32px'}
        marginY={'16px'}
        gap={'12px'}
        display={'flex'}
        alignItems={'center'}
      >
        <IconButton>{props.icon}</IconButton>
        <PFTypography variant='h5'>{props.title}</PFTypography>
        <PFTypography variant='body2'>{props.content}</PFTypography>
      </Stack>
    </PFCard>
  );
};
