import { motion } from 'framer-motion';
import { Stack, useTheme } from '@mui/material';
import { PFGradientTypography } from '@components/core';
import {
  HorizontalSkillList,
  HorizontalSkillListProps,
} from '@components/customs/lists/HorizontalSkills';
import { useTranslation } from 'react-i18next';
import { APP_THEMES, APP_TYPOGRAPHIES } from '@constants';
import {
  staggerContainer,
  staggerScaleUp,
} from '@utils/animations/scrollVariants';
import {
  SiTypescript,
  SiReact,
  SiMui,
  SiTailwindcss,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiAndroid,
  SiAngular,
  SiJira,
  SiFigma,
  SiSpringboot,
} from '@icons-pack/react-simple-icons';

const ICON_SIZE = 72;

const skillGroups: {
  titleKey: string;
  skillBoxes: HorizontalSkillListProps['skillBoxes'];
}[] = [
  {
    titleKey: 'skills.core',
    skillBoxes: [
      {
        icon: <SiTypescript size={ICON_SIZE} color='#3178C6' />,
        title: 'TypeScript',
      },
      { icon: <SiReact size={ICON_SIZE} color='#61DAFB' />, title: 'React' },
      { icon: <SiMui size={ICON_SIZE} color='#007FFF' />, title: 'MUI' },
      {
        icon: <SiTailwindcss size={ICON_SIZE} color='#06B6D4' />,
        title: 'TailwindCSS',
      },
    ],
  },
  {
    titleKey: 'skills.additional',
    skillBoxes: [
      {
        icon: <SiSpringboot size={ICON_SIZE} color='#6DB33F' />,
        title: 'Spring Boot',
      },
      {
        icon: <SiAndroid size={ICON_SIZE} color='#34A853' />,
        title: 'Java Android',
      },
      { icon: <SiNextdotjs size={ICON_SIZE} />, title: 'NextJS' },
      {
        icon: <SiAngular size={ICON_SIZE} color='#DD0031' />,
        title: 'Angular',
      },
      {
        icon: <SiMongodb size={ICON_SIZE} color='#47A248' />,
        title: 'MongoDB',
      },
      {
        icon: <SiPostgresql size={ICON_SIZE} color='#4169E1' />,
        title: 'PostgreSQL',
      },
    ],
  },
  {
    titleKey: 'skills.toolsAndMethods',
    skillBoxes: [
      { icon: <SiJira size={ICON_SIZE} color='#0052CC' />, title: 'Jira' },
      { icon: <SiFigma size={ICON_SIZE} color='#F24E1E' />, title: 'Figma' },
      { imageUrl: '/icons/skills/agile.png', title: 'Agile & Scrum' },
    ],
  },
];

export const Skills = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  return (
    <Stack
      component='section'
      id='skills'
      aria-label={t('skills.heading')}
      justifyContent='center'
      alignItems='center'
      gap={8}
      sx={{
        px: { xs: 2, md: 6 },
        py: { xs: 8, md: 12 },
        maxWidth: 1100,
        mx: 'auto',
        position: 'relative',
      }}
    >
      <Stack display={'flex'} direction={'column'}>
        <PFGradientTypography
          variant={APP_TYPOGRAPHIES.HEADER_PRIMARY}
          color={palette.text.primary}
          theme={APP_THEMES.DARK}
        >
          {t('skills.heading')}
        </PFGradientTypography>
      </Stack>
      <Stack
        component={motion.div}
        variants={staggerContainer(0.18, 0.1)}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        display={'flex'}
        alignItems={'center'}
        gap={6}
      >
        {skillGroups.map((skill, index) => (
          <motion.div key={index} variants={staggerScaleUp}>
            <HorizontalSkillList
              title={t(skill.titleKey)}
              skillBoxes={skill.skillBoxes}
            />
          </motion.div>
        ))}
      </Stack>
    </Stack>
  );
};
