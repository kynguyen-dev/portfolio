import { Chip, Stack, useTheme } from '@mui/material';
import { KINGDOMS } from '@constants/three-kingdoms';
import type { Kingdom } from '@constants/three-kingdoms';

interface KingdomFilterProps {
  selected: Kingdom | 'all';
  onChange: (kingdom: Kingdom | 'all') => void;
}

export const KingdomFilter = ({ selected, onChange }: KingdomFilterProps) => {
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      <Chip
        label="🏯 All"
        variant={selected === 'all' ? 'filled' : 'outlined'}
        onClick={() => onChange('all')}
        sx={{
          fontWeight: selected === 'all' ? 700 : 500,
          borderColor: isLight ? 'rgba(184,137,31,0.3)' : 'rgba(245,208,96,0.3)',
          ...(selected === 'all' && {
            background: isLight
              ? 'linear-gradient(135deg, rgba(184,137,31,0.15), rgba(196,30,58,0.08))'
              : 'linear-gradient(135deg, rgba(245,208,96,0.15), rgba(196,30,58,0.08))',
            color: isLight ? '#B8891F' : '#F5D060',
            borderColor: isLight ? '#B8891F' : '#F5D060',
          }),
        }}
      />
      {KINGDOMS.map(k => (
        <Chip
          key={k.id}
          label={`${k.emoji} ${k.name.en}`}
          variant={selected === k.id ? 'filled' : 'outlined'}
          onClick={() => onChange(k.id)}
          sx={{
            fontWeight: selected === k.id ? 700 : 500,
            borderColor: `${k.color}50`,
            ...(selected === k.id && {
              backgroundColor: `${k.color}20`,
              color: k.color,
              borderColor: k.color,
            }),
          }}
        />
      ))}
    </Stack>
  );
};

