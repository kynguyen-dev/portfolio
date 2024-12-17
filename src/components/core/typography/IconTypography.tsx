import { Stack, Typography, TypographyProps } from '@mui/material';
import { common } from '@mui/material/colors';
import { ReactNode } from 'react';

interface IconTypographyProps extends TypographyProps {
  icon: ReactNode;
  text: string;
}

export const IconTypography = ({
  icon,
  text,
  ...props
}: IconTypographyProps) => {
  return (
    <Stack direction='row' alignItems='center' gap={1}>
      {icon}
      <Typography color={common.white} variant='body1' {...props}>
        {text}
      </Typography>
    </Stack>
  );
};
