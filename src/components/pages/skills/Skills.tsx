import {motion} from 'framer-motion';
import {Stack, useTheme} from '@mui/material';
import {PFGradientTypography} from '@components/core';
import {HorizontalSkillList, HorizontalSkillListProps,} from '@components/customs/lists/HorizontalSkills';
import { useTranslation } from 'react-i18next';
import {APP_THEMES, APP_TYPOGRAPHIES} from "@constants";
import { staggerContainer, staggerScaleUp } from '@utils/animations/scrollVariants';

const skillGroups: { titleKey: string; skillBoxes: HorizontalSkillListProps['skillBoxes'] }[] = [
  {
    titleKey: 'skills.core',
    skillBoxes: [
      {
        imageUrl: '/icons/skills/typescript.png',
        title: 'Typescript',
      },
      {
        imageUrl: '/icons/skills/react.png',
        title: 'React',
      },
      {
        imageUrl: '/icons/skills/mui.png',
        title: 'MUI',
      },
      {
        imageUrl: '/icons/skills/tailwindcss.png',
        title: 'TailwindCSS',
      },
    ],
  },
  {
    titleKey: 'skills.additional',
    skillBoxes: [
      {
        imageUrl: '/icons/skills/java.png',
        title: 'Java',
      },
      {
        imageUrl: '/icons/skills/android.png',
        title: 'Java Android',
      },
      {
        imageUrl: '/icons/skills/nextjs.jpg',
        title: 'NextJS',
      },
      {
        imageUrl: '/icons/skills/angular.png',
        title: 'Angular',
      },
      {
        imageUrl: '/icons/skills/mongodb.svg',
        title: 'MongoDB',
      },
      {
        imageUrl: '/icons/skills/postgresql.png',
        title: 'PostgreSQL',
      },
    ],
  },
  {
    titleKey: 'skills.toolsAndMethods',
    skillBoxes: [
      {
        imageUrl: '/icons/skills/jira.png',
        title: 'Jira',
      },
      {
        imageUrl: '/icons/skills/figma.png',
        title: 'Figma',
      },
      {
        imageUrl: '/icons/skills/agile.png',
        title: 'Agile & Scrum',
      },
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
        px: { xs: 3, md: '20%' },
        pt: 12,
        pb: 12,
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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        display={'flex'}
        alignItems={'center'}
        gap={6}
      >
        {skillGroups.map((skill, index) => (
          <motion.div
            key={index}
            variants={staggerScaleUp}
          >
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
