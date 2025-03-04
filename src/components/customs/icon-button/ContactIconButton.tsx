import { PFGradientTypography } from '@components/core';
import { Box, CardMedia, useTheme } from '@mui/material';

interface ContactIconButtonProps {
  imageUrl: string;
  title: string;
  titleColor?: string;
}
export const ContactIconButton = (props: ContactIconButtonProps) => {
  const { palette } = useTheme();
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems={'center'}
      gap={1}
      sx={{ cursor: 'pointer' }}
    >
      <CardMedia
        image={props.imageUrl}
        sx={{ width: '96px', height: '96px' }}
      />
      <PFGradientTypography
        variant='body1'
        color={props.titleColor ?? palette.primary.main}
      >
        {props.title}
      </PFGradientTypography>
    </Box>
  );
};
