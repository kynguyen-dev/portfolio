import { Button, ButtonProps } from '@mui/material';

export type PFButtonProps = ButtonProps;
export const PFButton = Button;

export const PFSolidButton = ({ ...buttonProps }: PFButtonProps) => {
  return (
    <PFButton variant='contained' color='secondary' {...buttonProps}>
      {buttonProps.children}
    </PFButton>
  );
};

export const PFWhiteButton = ({ ...buttonProps }: PFButtonProps) => {
  return (
    <PFButton variant='contained' color='inherit' {...buttonProps}>
      {buttonProps.children}
    </PFButton>
  );
};

export const PFStrokeButton = ({ ...buttonProps }: PFButtonProps) => {
  return (
    <PFButton variant='outlined' color='secondary' {...buttonProps}>
      {buttonProps.children}
    </PFButton>
  );
};
