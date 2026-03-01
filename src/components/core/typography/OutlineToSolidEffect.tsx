import { motion, type TargetAndTransition } from 'framer-motion';
import { CSSProperties, ReactNode } from 'react';

interface OutlineToSolidEffectProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const OutlineToSolidEffect = ({
  children,
  style,
}: OutlineToSolidEffectProps) => {
  return (
    <motion.div
      initial={
        {
          WebkitTextStroke: '1px rgba(255, 243, 224, 0.8)',
          opacity: 0.7,
        } as TargetAndTransition
      }
      animate={
        {
          WebkitTextStroke: ['1px rgba(255, 243, 224, 0.8)', '0px rgba(0,0,0,0)'],
          WebkitTextFillColor: ['transparent', '#FFF3E0'],
          opacity: [0.7, 1],
        } as TargetAndTransition
      }
      transition={{
        duration: 1.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror',
      }}
      style={{ display: 'inline-block', ...style }}
    >
      {children}
    </motion.div>
  );
};
