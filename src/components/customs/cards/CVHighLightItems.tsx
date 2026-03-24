import { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { PFGradientTypography, PFTypography } from '@components/core';

export const CVHighLightItems = ({
  number,
  label,
  details,
}: {
  number: string;
  label: string;
  details: string;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(prev => !prev);

  const flipSpring = useSpring({
    rotateY: isFlipped ? 180 : 0,
    config: { duration: 500 },
  });

  return (
    <div
      className='flip-card'
      onClick={handleFlip}
      style={{
        width: '100%',
        maxWidth: '272px',
        minWidth: '200px',
        height: '80px',
        perspective: '1000px',
        cursor: 'pointer',
      }}
    >
      <animated.div
        className='flip-card-inner'
        style={{
          ...flipSpring,
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front Side */}
        <div
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
        </div>

        {/* Back Side */}
        <div
          className='flip-card-back'
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backfaceVisibility: 'hidden',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            justifyContent: 'center',
            padding: '8px',
            borderRadius: '8px',
            backdropFilter: 'blur(15px)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.25)',
            transform: 'rotateY(180deg)',
            color: '#fff',
          }}
        >
          {details.split('-').map(tech => (
            <span
              key={tech}
              className='inline-block bg-primary-main text-white text-xs font-bold px-2 py-0.5 rounded-full'
            >
              {tech}
            </span>
          ))}
        </div>
      </animated.div>
    </div>
  );
};
