import { motion } from 'framer-motion';
import { Stack, useTheme } from '@mui/material';
import { PFGradientTypography } from '@components/core';
import {
  HorizontalSkillList,
  HorizontalSkillListProps,
} from '@components/customs/lists/HorizontalSkills';

const skills: HorizontalSkillListProps[] = [
  {
    title: 'Target on',
    skillBoxes: [
      {
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/5968/5968381.png',
        title: 'Typescript',
      },
      {
        imageUrl:
          'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
        title: 'React',
      },
      {
        imageUrl: 'https://v4.mui.com/static/logo.png',
        title: 'MUI',
      },
      {
        imageUrl: '/icons/skills/tailwindcss.png',
        title: 'TailwindCSS',
      },
    ],
  },
  {
    title: 'Capable of adapting',
    skillBoxes: [
      {
        imageUrl:
          'https://www.opencodez.com/wp-content/uploads/2018/02/Java-8-using-Examples.png',
        title: 'Java',
      },
      {
        imageUrl:
          'https://cdn2.phunware.com/wp-content/uploads/2014/10/SDK-Logo-Android.png',
        title: 'Java Android',
      },
      {
        imageUrl:
          'https://www.drupal.org/files/project-images/nextjs-drupal.jpg',
        title: 'NextJS',
      },
      {
        imageUrl:
          'https://th.bing.com/th/id/R.09af26effa4f2999663f96e00bb51f0a?rik=rlTKWrK8D1DPpg&pid=ImgRaw&r=0',
        title: 'Angular',
      },
      {
        imageUrl: 'https://www.svgrepo.com/show/331488/mongodb.svg',
        title: 'MongoDB',
      },
      {
        imageUrl: '/icons/skills/postgresql.png',
        title: 'PostgreSQL',
      },
    ],
  },
  {
    title: 'Another',
    skillBoxes: [
      {
        imageUrl:
          'https://logos-world.net/wp-content/uploads/2021/02/Jira-Emblem.png',
        title: 'Jira',
      },
      {
        imageUrl:
          'https://brandlogos.net/wp-content/uploads/2022/05/figma-logo_brandlogos.net_6n1pb.png',
        title: 'Figma',
      },
      {
        imageUrl:
          'https://cdn2.iconfinder.com/data/icons/business-methodologies-soft-fill/60/Sprint-Management-corporate-scrum-agile-1024.png',
        title: 'Agile & Scrum',
      },
    ],
  },
];

export const Skills = () => {
  const { palette } = useTheme();
  return (
    <Stack justifyContent='center' alignItems='center' gap={8}>
      <Stack display={'flex'} direction={'column'}>
        <PFGradientTypography
          variant='h2'
          color={palette.primary.contrastText}
          theme={'dark'}
        >
          My Skills
        </PFGradientTypography>
      </Stack>
      <Stack display={'flex'} alignItems={'center'} gap={6}>
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <HorizontalSkillList
              title={skill.title}
              skillBoxes={skill.skillBoxes}
            />
          </motion.div>
        ))}
      </Stack>
    </Stack>
  );
};
