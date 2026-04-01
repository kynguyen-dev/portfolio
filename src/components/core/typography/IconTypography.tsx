import { ReactNode } from 'react';
import { cn } from '@utils/core/cn';

interface IconTypographyProps {
  icon: ReactNode;
  text: string;
  className?: string;
}

export const IconTypography = ({
  icon,
  text,
  className,
}: IconTypographyProps) => {
  return (
    <span
      className={cn('inline-flex items-center gap-2 text-white', className)}
    >
      {icon}
      <span>{text}</span>
    </span>
  );
};
