import { PFSolidButton, PFTypography } from '@components/core';

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
    <div className='flex-1 flex flex-col items-center justify-center w-full h-full gap-6'>
      <div className='flex flex-col items-center gap-3'>
        <PFTypography
          variant='h1'
          fontWeight={600}
          fontSize='24px'
          color='#D44040'
          textAlign='center'
        >
          {title}
        </PFTypography>
        <PFTypography variant='body1' textAlign='center'>
          {description}
        </PFTypography>
      </div>

      {onClick && <PFSolidButton onClick={onClick}>{buttonText}</PFSolidButton>}
    </div>
  );
};
