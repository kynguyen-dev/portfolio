import { CrePath } from '@models/core/types';
import { Palette, Typography, TypographyProps, useTheme } from '@mui/material';
import { getValueByPath } from '@utils/core/mapping/valueByPath';
import { forwardRef } from 'react';

export interface PFTypographyProps extends TypographyProps {
  colorVariant?: CrePath<Palette>;
  ellipsisLines?: number;
}

export const PFTypography = forwardRef<
  HTMLParagraphElement | null,
  PFTypographyProps
>(({ colorVariant, sx, ...others }, ref) => {
  const { palette } = useTheme();

  //   const ellipsisStyle: SxProps<Theme> = useMemo(() => {
  //     if (!ellipsisLines) {
  //       return {};
  //     }
  //     return {
  //       overflow: 'hidden',
  //       textOverflow: 'ellipsis',
  //       wordBreak: 'break-word',
  //       display: '-webkit-box',
  //       WebkitLineClamp: ellipsisLines,
  //       WebkitBoxOrient: 'vertical',
  //     };
  //   }, [ellipsisLines]);

  return (
    <Typography
      ref={ref}
      color={colorVariant ? getValueByPath(palette, colorVariant) : undefined}
      sx={{
        // ...ellipsisStyle,
        ...sx,
      }}
      {...others}
    />
  );
});
