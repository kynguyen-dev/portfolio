import { PFSolidButton, PFTypography } from '@components/core';
import { Stack } from '@mui/material';

export interface FullScreenErrorProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onClick?: () => void;
}
export const FullScreenError = ({
  title = 'Sorry!',
  description = 'We could not load the page this time, Please try again',
  buttonText = 'Retry',
  onClick,
}: FullScreenErrorProps) => {
  return (
    <Stack
      flex={1}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
      height={'100%'}
      spacing={3}
    >
      <Stack alignItems={'center'} spacing={1.5}>
        <PFTypography
          variant='h1'
          fontWeight={600}
          fontSize={'24px'}
          colorVariant='error.main'
          textAlign={'center'}
        >
          {title}
        </PFTypography>
        <PFTypography variant='body1' textAlign={'center'}>
          {description}
        </PFTypography>
      </Stack>

      {onClick && <PFSolidButton onClick={onClick}>{buttonText}</PFSolidButton>}
    </Stack>
  );
};
