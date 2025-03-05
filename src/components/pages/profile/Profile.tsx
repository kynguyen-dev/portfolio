import {Box, Grid, Stack} from '@mui/material';
import {motion} from 'framer-motion';
import {Code, Terminal} from '@mui/icons-material';
import ConstructionIcon from '@mui/icons-material/Construction';
import {GradientPaper} from '@components/customs/paper/GradientPaper.tsx';
import {PFGradientTypography, PFTypography} from '@components/core';
import {APP_MESSAGES} from "@utils/core/messages";
import {APP_PAGES, APP_SIZES, APP_TYPOGRAPHIES, APP_TYPOGRAPHIES_ANIMATION} from "@constants";
import {ReactNode} from "react";

interface HighlightSkill {
  label: string;
  items: string[];
}

interface Skills {
  title: string;
  icon: ReactNode;
  quote: string;
  highlights: HighlightSkill[];
}

const SKILLS: Skills[] = [
  {
    title: APP_MESSAGES.profile.skills.backEndDeveloper,
    icon: (
      <Terminal
        fontSize={APP_SIZES.LARGE}
        sx={{ color: 'linear-gradient(to bottom, #68B8D7, #A0B3FF, #F0FFFF)' }}
      />
    ),
    quote: APP_MESSAGES.profile.skills.backEndQuote,
    highlights: [
      { label: APP_MESSAGES.profile.skills.enjoyCoding, items: [APP_MESSAGES.profile.skills.java, APP_MESSAGES.profile.skills.typeScript] },
      {
        label: APP_MESSAGES.profile.skills.devTech,
        items: [
          APP_MESSAGES.profile.skills.javaVersion,
          APP_MESSAGES.profile.skills.springBoot,
          APP_MESSAGES.profile.skills.nextJS,
          APP_MESSAGES.profile.skills.sqLite,
          APP_MESSAGES.profile.skills.noSQL,
          APP_MESSAGES.profile.skills.postgre,
          APP_MESSAGES.profile.skills.orm,
          APP_MESSAGES.profile.skills.restful,
          APP_MESSAGES.profile.skills.junit,
          APP_MESSAGES.profile.skills.groovy,
          APP_MESSAGES.profile.skills.android,
        ],
      },
    ],
  },
  {
    title: APP_MESSAGES.profile.skills.fontEndDeveloper,
    icon: (
      <Code
        fontSize={APP_SIZES.LARGE}
        sx={{ color: 'linear-gradient(to bottom, #68B8D7, #A0B3FF, #F0FFFF)' }}
      />
    ),
    quote: APP_MESSAGES.profile.skills.fontEndQuote,
    highlights: [
      {
        label: APP_MESSAGES.profile.skills.languages,
        items: [APP_MESSAGES.profile.skills.html, APP_MESSAGES.profile.skills.css, APP_MESSAGES.profile.skills.typeScript]
      },
      {
        label: APP_MESSAGES.profile.skills.devTech,
        items: [
          APP_MESSAGES.profile.skills.react,
          APP_MESSAGES.profile.skills.tailwind,
          APP_MESSAGES.profile.skills.mui,
          APP_MESSAGES.profile.skills.useQuery,
          APP_MESSAGES.profile.skills.nextJS,
          APP_MESSAGES.profile.skills.angular,
          APP_MESSAGES.profile.skills.vite,
          APP_MESSAGES.profile.skills.esLint,
          APP_MESSAGES.profile.skills.prettier,
          APP_MESSAGES.profile.skills.storybook,
          APP_MESSAGES.profile.skills.jest,
          APP_MESSAGES.profile.skills.testLibrary,
          APP_MESSAGES.profile.skills.reactHookForm,
          APP_MESSAGES.profile.skills.auth0,
        ],
      },
    ],
  },
  {
    title: APP_MESSAGES.profile.skills.tools,
    icon: (
      <ConstructionIcon
        fontSize={APP_SIZES.LARGE}
        sx={{ color: 'linear-gradient(to bottom, #68B8D7, #A0B3FF, #F0FFFF)' }}
      />
    ),
    quote: APP_MESSAGES.profile.skills.toolEndQuote,
    highlights: [
      {
        label: APP_MESSAGES.profile.skills.methods,
        items: [APP_MESSAGES.profile.skills.agile],
      },
      {
        label: APP_MESSAGES.profile.skills.accompany,
        items: [
          APP_MESSAGES.profile.skills.vsCode,
          APP_MESSAGES.profile.skills.webStorm,
          APP_MESSAGES.profile.skills.intelliJ,
          APP_MESSAGES.profile.skills.postman,
          APP_MESSAGES.profile.skills.docker,
          APP_MESSAGES.profile.skills.git,
          APP_MESSAGES.profile.skills.gitTools,
          APP_MESSAGES.profile.skills.jira,
          APP_MESSAGES.profile.skills.figma,
        ],
      },
    ],
  },
];

export const Profile = () => {
  return (
    <Box
      id={APP_PAGES.PROFILE}
      sx={{
        textAlign: 'center',
        pt: 12,
        background: 'linear-gradient(to bottom, #68B8D7, #F0FFFF)',
        color: 'white',
        px: { xs: 3, md: '20%' },
      }}
    >
      <Box>
        <PFTypography variant={APP_TYPOGRAPHIES.HEADER_PRIMARY} animations={[APP_TYPOGRAPHIES_ANIMATION.TYPEWRITER]} fontWeight='bold'>
          {APP_MESSAGES.profile.opening}
        </PFTypography>
        <PFTypography variant={APP_TYPOGRAPHIES.BODY_SECONDARY} sx={{ mt: 2, mx: 'auto' }}>
          {APP_MESSAGES.profile.content}
        </PFTypography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 8, alignItems: 'stretch' }}>
        {SKILLS.map((role, index) => (
          <Grid item xs={12} md={4} key={role.title} sx={{ display: 'flex' }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              style={{ flex: 1 }}
            >
              <GradientPaper
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Stack direction='column' gap={1} alignItems='center'>
                  {role.icon}
                  <PFGradientTypography variant={APP_TYPOGRAPHIES.HEADER_SECONDARY} fontWeight='bold'>
                    {role.title}
                  </PFGradientTypography>
                  <PFTypography
                    variant={APP_TYPOGRAPHIES.BODY_SECONDARY}
                    animations={[APP_TYPOGRAPHIES_ANIMATION.TYPEWRITER]}
                    speed={50}
                    sx={{ mt: 1, color: 'text.secondary' }}
                  >
                    {role.quote}
                  </PFTypography>
                  <Box flexGrow={1} />
                  {role.highlights.map(highlight => (
                    <Box key={highlight.label} sx={{ mt: 2 }}>
                      <PFGradientTypography
                        variant={APP_TYPOGRAPHIES.SUBTITLE_SECONDARY}
                        fontWeight='bold'
                        color='#6C63FF'
                      >
                        {highlight.label}
                      </PFGradientTypography>
                      {highlight.items.map(item => (
                        <PFTypography key={item} variant={APP_TYPOGRAPHIES.BODY_SECONDARY} sx={{ mt: 1 }}>
                          {item}
                        </PFTypography>
                      ))}
                    </Box>
                  ))}
                </Stack>
              </GradientPaper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
