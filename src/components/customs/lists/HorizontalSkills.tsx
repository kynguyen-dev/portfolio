import { motion } from 'framer-motion';
import { PFTypography } from '@components/core';
import { Stack } from '@mui/material';
import { common } from '@mui/material/colors';
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
    <Stack
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={2}
    >
      <PFTypography variant='h6' color={common.white}>
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
        <Stack gap={10} direction={'row'}>
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
                title={skillBox.title}
                titleColor={skillBox.titleColor}
              />
            </motion.div>
          ))}
        </Stack>
      </motion.div>
    </Stack>
  );
};
