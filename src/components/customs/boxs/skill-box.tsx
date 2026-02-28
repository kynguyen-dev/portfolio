import { motion } from 'framer-motion';
import { Box, CardMedia, useTheme } from '@mui/material';
import { PFTypography } from '@components/core';

export interface SkillBoxProps {
  imageUrl: string;
  title: string;
  titleColor?: string;
}
export const SkillBox = (props: SkillBoxProps) => {
  const { palette } = useTheme();
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems={'center'}
      justifyContent={'center'}
      width={'96px'}
      gap={1}
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <CardMedia
          component="img"
          image={props.imageUrl}
          alt={props.title}
          loading="lazy"
          sx={{ width: '96px', height: '96px', objectFit: 'contain' }}
        />
      </motion.div>
      <PFTypography
        variant='body1'
        color={props.titleColor ?? palette.primary.contrastText}
        align='center'
      >
        {props.title}
      </PFTypography>
    </Box>
  );
};
