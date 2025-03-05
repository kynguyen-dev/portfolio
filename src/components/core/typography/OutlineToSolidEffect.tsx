import { motion } from 'framer-motion';
import {CSSProperties, ReactNode } from "react";

interface OutlineToSolidEffectProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const OutlineToSolidEffect = ({ children, style }: OutlineToSolidEffectProps) => {
  return (
    <motion.div
      initial={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.8)', opacity: 0.7 }}
      animate={{
        WebkitTextStroke: ['1px rgba(255, 255, 255, 0.8)', '0px rgba(0,0,0,0)'],
        WebkitTextFillColor: ['transparent', 'white'],
        opacity: [0.7, 1],
      }}
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
