import { type ReactNode } from 'react';
import { motion } from 'motion/react';
import { PFTypography } from '@components/core';
import { cn } from '@utils/core/cn';

export interface SkillBoxProps {
  imageUrl?: string;
  icon?: ReactNode;
  title: string;
  titleColor?: string;
  link?: string;
}

export const SkillBox = (props: SkillBoxProps) => {
  const content = (
    <div
      className={cn(
        'flex flex-col items-center justify-center w-24 gap-3',
        props.link ? 'cursor-pointer' : 'cursor-default'
      )}
    >
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className='flex items-center justify-center'
      >
        {props.icon ? (
          props.icon
        ) : (
          <img
            src={props.imageUrl}
            alt={props.title}
            loading='lazy'
            className='w-24 h-24 object-contain'
          />
        )}
      </motion.div>
      <PFTypography
        variant='body1'
        className='text-center'
        style={{ color: props.titleColor }}
      >
        {props.title}
      </PFTypography>
    </div>
  );

  if (props.link) {
    return (
      <a
        href={props.link}
        target='_blank'
        rel='noopener noreferrer'
        className='no-underline color-inherit'
      >
        {content}
      </a>
    );
  }

  return content;
};
