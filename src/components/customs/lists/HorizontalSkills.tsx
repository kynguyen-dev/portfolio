import { animated, useTrail } from '@react-spring/web';
import { PFTypography } from '@components/core';
import { SkillBox, SkillBoxProps } from '../boxs/skill-box';
import { useInView } from '@utils/animations/springVariants';

export interface HorizontalSkillListProps {
  title: string;
  skillBoxes: SkillBoxProps[];
}

export const HorizontalSkillList = ({
  title,
  skillBoxes,
}: HorizontalSkillListProps) => {
  const { ref, inView } = useInView();

  const trail = useTrail(skillBoxes.length, {
    from: { opacity: 0, y: 20 },
    to: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className='flex flex-col justify-center items-center gap-6'>
      <PFTypography variant='h6' className='text-text-primary'>
        {title}
      </PFTypography>
      <div
        ref={ref}
        className='flex flex-row flex-wrap justify-center gap-6 sm:gap-12 md:gap-20'
      >
        {trail.map((style, index) => (
          <animated.div key={index} style={style}>
            <SkillBox
              imageUrl={skillBoxes[index].imageUrl}
              icon={skillBoxes[index].icon}
              title={skillBoxes[index].title}
              titleColor={skillBoxes[index].titleColor}
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
};
