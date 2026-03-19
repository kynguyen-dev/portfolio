import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Box, CardMedia, useTheme } from '@mui/material';
import { PFTypography } from '@components/core';

export interface SkillBoxProps {
  imageUrl?: string;
  icon?: ReactNode;
  title: string;
  titleColor?: string;
  link?: string;
}
export const SkillBox = (props: SkillBoxProps) => {
  const { palette } = useTheme();
  const content = (
    <Box
      display='flex'
      flexDirection='column'
      alignItems={'center'}
      justifyContent={'center'}
      width={'96px'}
      gap={1}
      sx={{ cursor: props.link ? 'pointer' : 'default' }}
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {props.icon ? (
          props.icon
        ) : (
          <CardMedia
            component='img'
            image={props.imageUrl}
            alt={props.title}
            loading='lazy'
            sx={{ width: '96px', height: '96px', objectFit: 'contain' }}
          />
        )}
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

  if (props.link) {
    return (
      <Box
        component='a'
        href={props.link}
        target='_blank'
        rel='noopener noreferrer'
        sx={{ textDecoration: 'none', color: 'inherit' }}
      >
        {content}
      </Box>
    );
  }

  return content;
};
