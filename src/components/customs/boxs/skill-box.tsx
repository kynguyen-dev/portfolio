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
        initial={{ y: 0 }}
        animate={{ y: [0, -5, 0] }} // Floating effect
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <CardMedia
          image={props.imageUrl}
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
