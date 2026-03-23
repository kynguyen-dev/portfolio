import { motion } from 'motion/react';
import { PFTypography } from '@components/core';
import { SkillBox, SkillBoxProps } from '../boxs/skill-box';

export interface HorizontalSkillListProps {
  title: string;
  skillBoxes: SkillBoxProps[];
}

export const HorizontalSkillList = ({
  title,
  skillBoxes,
}: HorizontalSkillListProps) => {
  return (
    <div className='flex flex-col justify-center items-center gap-6'>
      <PFTypography variant='h6' className='text-text-primary'>
        {title}
      </PFTypography>
      <motion.div
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
        }}
      >
        <div className='flex flex-row flex-wrap justify-center gap-6 sm:gap-12 md:gap-20'>
          {skillBoxes.map((skillBox, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <SkillBox
                imageUrl={skillBox.imageUrl}
                icon={skillBox.icon}
                title={skillBox.title}
                titleColor={skillBox.titleColor}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
