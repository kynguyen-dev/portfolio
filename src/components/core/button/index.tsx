import { Button, ButtonProps, styled } from '@mui/material';

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

export const StyledButton = styled(PFWhiteButton)`
  ${({ theme }) => `
  cursor: pointer;
  background-color: ${theme.palette.primary.dark};
  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    background-color: ${theme.palette.primary.main};
    transform: scale(1.1);
  }
  color: ${theme.palette.text.primary};
  border: 2px solid ${theme.palette.primary.main};
  `}
`;
