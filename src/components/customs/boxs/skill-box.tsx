import { PFTypography } from '@components/core';
import { Box, CardMedia, useTheme } from '@mui/material';

interface SkillBoxProps {
  imageUrl: string;
  title: string;
  titleColor?: string;
}
export const SkillBox = (props: SkillBoxProps) => {
  const { palette } = useTheme();
  return (
    <Box display='flex' flexDirection='column' alignItems={'center'} gap={1}>
      <CardMedia
        image={props.imageUrl}
        sx={{ width: '96px', height: '96px' }}
      />
      <PFTypography
        variant='body1'
        color={props.titleColor ?? palette.primary.main}
      >
        {props.title}
      </PFTypography>
    </Box>
  );
};
