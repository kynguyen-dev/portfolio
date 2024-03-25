import { PFTypography } from '@components/core/typography';
import {
  PaletteColorOptions,
  PaletteOptions,
  Paper,
  Stack,
  useTheme,
} from '@mui/material';
import { Meta } from '@storybook/react';
import { useCallback } from 'react';

const ThemePalette = () => <Stack>Theme/Palette</Stack>;

export default {
  title: 'Theme/Palette',
  component: ThemePalette,
} as Meta<typeof ThemePalette>;

export const Light = () => {
  const { palette } = useTheme();
  const groupColor: (keyof PaletteOptions)[] = [
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'info',
    'text',
    'grey',
    'background',
    'branchBlue',
  ];

  const getArrayColors = useCallback(
    (group: keyof PaletteOptions) => {
      const result: {
        title: string;
        value: string;
      }[] = [];
      const value = palette[group];
      if (value) {
        if (typeof value === 'string') {
          result.push({
            title: group,
            value,
          });
        } else {
          Object.keys(value).forEach(childKey => {
            const childValue = value[childKey as keyof PaletteColorOptions];
            if (childValue && typeof childValue === 'string') {
              result.push({
                title: `${group}.${childKey}`,
                value: childValue,
              });
            }
          });
        }
      }
      return result;
    },
    [palette]
  );

  console.log(palette);

  return (
    <Stack direction='column' spacing={6}>
      {groupColor.map(group => {
        const colors = getArrayColors(group);
        return (
          <Stack direction='column' spacing={2} key={group}>
            <PFTypography variant='h3'>{group.toUpperCase()}</PFTypography>
            <Stack gap={2} flexWrap={'wrap'} direction={'row'}>
              {colors.map(color => (
                <Paper
                  key={color.title}
                  variant='elevation'
                  elevation={4}
                  sx={{ minWidth: '200px' }}
                >
                  <Stack>
                    <Stack
                      sx={{
                        backgroundColor: color.value,
                        borderBottomColor: palette.grey[100],
                        borderBottomWidth: 1,
                        borderBottomStyle: 'solid',
                        height: '80px',
                      }}
                    />
                    <Stack sx={{ p: 2 }}>
                      <PFTypography variant='body1'>{color.title}</PFTypography>
                      <PFTypography variant='body2'>{color.value}</PFTypography>
                    </Stack>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};
