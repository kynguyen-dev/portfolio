import { useState } from 'react';
import { motion } from 'framer-motion';
import { PFGradientTypography, PFTypography } from '@components/core';
import { Chip, useTheme } from '@mui/material';
import Box from '@mui/material/Box';

export const CVHighLightItems = ({
  number,
  label,
  details,
}: {
  number: string;
  label: string;
  details: string;
}) => {
  const { palette } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(prev => !prev);

  return (
    <motion.div
      className='flip-card'
      onClick={handleFlip}
      style={{
        width: '272px',
        height: '80px',
        perspective: '1000px',
        cursor: 'pointer',
      }}
    >
      <motion.div
        className='flip-card-inner'
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front Side */}
        <Box
          component={motion.div}
          className='flip-card-front'
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.2)',
            padding: '12px',
            borderRadius: '8px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}
        >
          <PFGradientTypography
            variant='h3'
            sx={{ fontWeight: 'bold', color: 'lightblue' }}
          >
            {number}
          </PFGradientTypography>
          <PFTypography variant='body1'>{label}</PFTypography>
        </Box>

        {/* Back Side */}
        <Box
          component={motion.div}
          className='flip-card-back'
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            justifyContent: 'center',
            padding: 1,
            borderRadius: 2,
            backdropFilter: 'blur(15px)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
            transform: 'rotateY(180deg)',
            color: palette.common.white,
          }}
        >
          {/*<PFTypography variant="body2">{details}</PFTypography>*/}
          {details.split('-').map(tech => (
            <Chip
              key={tech}
              label={tech}
              sx={{
                background: palette.primary.main,
                color: palette.common.white,
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '2px 6px',
              }}
            />
          ))}
        </Box>
      </motion.div>
    </motion.div>
  );
};
