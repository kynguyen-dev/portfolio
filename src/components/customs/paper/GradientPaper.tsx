import { ReactNode, HTMLAttributes } from 'react';
import { motion } from 'motion/react';
import { useThemeMode } from '@contexts/theme-mode';
import { cn } from '@utils/core/cn';

interface GradientPaperProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const GradientPaper = ({
  children,
  className,
  ...props
}: GradientPaperProps) => {
  const { mode } = useThemeMode();
  const isLight = mode === 'light';

  return (
    <motion.div
      whileHover={{ scale: 1.03, rotateX: 5, rotateY: 5 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'p-8 rounded-xl text-center backdrop-blur-lg border transition-all duration-300',
        isLight
          ? 'bg-gradient-to-br from-[#FFF8F0]/95 via-[#FAE8B0]/85 to-[#FFF8F0]/95 border-[#B8891F]/30 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(212,168,67,0.2)] text-text-primary'
          : 'bg-gradient-to-br from-[#0B0D2E]/85 via-[#4B1942]/75 to-[#0B0D2E]/85 border-[#F5D060]/25 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(232,168,56,0.15)] text-white',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
