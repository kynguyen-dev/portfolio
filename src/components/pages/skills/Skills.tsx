import { motion } from 'framer-motion';
import { Stack, useTheme } from '@mui/material';
import { PFGradientTypography } from '@components/core';
import {
  HorizontalSkillList,
  HorizontalSkillListProps,
} from '@components/customs/lists/HorizontalSkills';
import { useTranslation } from 'react-i18next';
import {
  APP_THEMES,
  APP_TYPOGRAPHIES,
  REACTJS_URLS,
  MUI_URLS,
  TYPESCRIPT_URLS,
  TAILWIND_URLS,
  SPRINGBOOT_URLS,
  ANDROID_URLS,
  NEXTJS_URLS,
  ANGULAR_URLS,
  MONGODB_URLS,
  POSTGRESQL_URLS,
  JIRA_URLS,
  FIGMA_URLS,
  AGILE_URLS,
  JAVA_URLS,
  REACT_QUERY_URLS,
  AUTH0_URLS,
  VITE_URLS,
  GIT_URLS,
  DOCKER_URLS,
} from '@constants';
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
  SiJava,
  SiReactquery,
  SiAuth0,
  SiVite,
  SiGit,
  SiDocker,
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
        link: TYPESCRIPT_URLS,
      },
      {
        icon: <SiReact size={ICON_SIZE} color='#61DAFB' />,
        title: 'React',
        link: REACTJS_URLS,
      },
      {
        icon: <SiReactquery size={ICON_SIZE} color='#FF4154' />,
        title: 'React Query',
        link: REACT_QUERY_URLS,
      },
      {
        icon: <SiMui size={ICON_SIZE} color='#007FFF' />,
        title: 'MUI',
        link: MUI_URLS,
      },
      {
        icon: <SiTailwindcss size={ICON_SIZE} color='#06B6D4' />,
        title: 'TailwindCSS',
        link: TAILWIND_URLS,
      },
    ],
  },
  {
    titleKey: 'skills.additional',
    skillBoxes: [
      {
        icon: <SiJava size={ICON_SIZE} color='#007396' />,
        title: 'Java',
        link: JAVA_URLS,
      },
      {
        icon: <SiSpringboot size={ICON_SIZE} color='#6DB33F' />,
        title: 'Spring Boot',
        link: SPRINGBOOT_URLS,
      },
      {
        icon: <SiAndroid size={ICON_SIZE} color='#34A853' />,
        title: 'Java Android',
        link: ANDROID_URLS,
      },
      {
        icon: <SiNextdotjs size={ICON_SIZE} />,
        title: 'NextJS',
        link: NEXTJS_URLS,
      },
      {
        icon: <SiAngular size={ICON_SIZE} color='#DD0031' />,
        title: 'Angular',
        link: ANGULAR_URLS,
      },
      {
        icon: <SiMongodb size={ICON_SIZE} color='#47A248' />,
        title: 'MongoDB',
        link: MONGODB_URLS,
      },
      {
        icon: <SiPostgresql size={ICON_SIZE} color='#4169E1' />,
        title: 'PostgreSQL',
        link: POSTGRESQL_URLS,
      },
    ],
  },
  {
    titleKey: 'skills.toolsAndMethods',
    skillBoxes: [
      {
        icon: <SiGit size={ICON_SIZE} color='#F05032' />,
        title: 'Git',
        link: GIT_URLS,
      },
      {
        icon: <SiDocker size={ICON_SIZE} color='#2496ED' />,
        title: 'Docker',
        link: DOCKER_URLS,
      },
      {
        icon: <SiVite size={ICON_SIZE} color='#646CFF' />,
        title: 'Vite',
        link: VITE_URLS,
      },
      {
        icon: <SiAuth0 size={ICON_SIZE} color='#EB5424' />,
        title: 'Auth0',
        link: AUTH0_URLS,
      },
      {
        icon: <SiJira size={ICON_SIZE} color='#0052CC' />,
        title: 'Jira',
        link: JIRA_URLS,
      },
      {
        icon: <SiFigma size={ICON_SIZE} color='#F24E1E' />,
        title: 'Figma',
        link: FIGMA_URLS,
      },
      {
        imageUrl: '/icons/skills/agile.png',
        title: 'Agile & Scrum',
        link: AGILE_URLS,
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
