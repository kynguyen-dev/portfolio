import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@lib/utils';

export const Overlay = ({ className, ...props }: HTMLMotionProps<'div'>) => (
  <motion.div
    className={cn(
      'absolute top-0 left-0 w-full h-full bg-[#1e3aba]/95 text-white flex flex-col justify-center items-center text-center transition-[opacity,background-color] duration-300 opacity-0 overflow-y-auto scrollbar-none p-4',
      className
    )}
    {...props}
  />
);

export const OverlayContent = ({
  className,
  ...props
}: HTMLMotionProps<'div'>) => (
  <motion.div
    className={cn(
      'opacity-0 transition-[opacity,transform] duration-300 translate-y-2.5',
      className
    )}
    {...props}
  />
);
