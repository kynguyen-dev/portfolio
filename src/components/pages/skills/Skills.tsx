import { PFTypography } from '@components/core';
import { Stack, useTheme } from '@mui/material';
import { common } from '@mui/material/colors';
import { SkillBox } from '@components/customs/boxs/skill-box';

export const Skills = () => {
  const { palette } = useTheme();
  return (
    <Stack display={'flex'} alignItems={'center'} py={'128px'} gap={7}>
      <Stack display={'flex'} alignItems={'center'}>
        <PFTypography variant='h3' color={palette.primary.main}>
          My Skills
        </PFTypography>
      </Stack>
      <Stack display={'flex'} alignItems={'center'} gap={4}>
        <PFTypography variant='body2' color={common.white}>
          Target on
        </PFTypography>
        <Stack gap={10} direction={'row'}>
          <SkillBox
            imageUrl={'https://cdn-icons-png.flaticon.com/512/5968/5968381.png'}
            title={'Typescript'}
          />

          <SkillBox
            imageUrl={
              'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png'
            }
            title={'React'}
          />

          <SkillBox
            imageUrl={'https://v4.mui.com/static/logo.png'}
            title={'MUI'}
          />
        </Stack>
        <PFTypography variant='body2' color={common.white}>
          Capable of adapting
        </PFTypography>
        <Stack gap={10} direction={'row'}>
          <SkillBox
            imageUrl={'https://cdn-icons-png.flaticon.com/512/5968/5968381.png'}
            title={'Typescript'}
          />

          <SkillBox
            imageUrl={
              'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png'
            }
            title={'React'}
          />

          <SkillBox
            imageUrl={'https://v4.mui.com/static/logo.png'}
            title={'MUI'}
          />
          <SkillBox
            imageUrl={'https://cdn-icons-png.flaticon.com/512/5968/5968381.png'}
            title={'Typescript'}
          />

          <SkillBox
            imageUrl={
              'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png'
            }
            title={'React'}
          />

          <SkillBox
            imageUrl={'https://v4.mui.com/static/logo.png'}
            title={'MUI'}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
