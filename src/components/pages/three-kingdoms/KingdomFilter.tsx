import { Chip, Stack } from '@mui/material';
import { KINGDOMS } from '@constants/three-kingdoms';
import type { Kingdom } from '@constants/three-kingdoms';

interface KingdomFilterProps {
  selected: Kingdom | 'all';
  onChange: (kingdom: Kingdom | 'all') => void;
}

export const KingdomFilter = ({ selected, onChange }: KingdomFilterProps) => (
  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
    <Chip
      label="All"
      variant={selected === 'all' ? 'filled' : 'outlined'}
      onClick={() => onChange('all')}
      sx={{
        fontWeight: selected === 'all' ? 700 : 500,
        borderColor: 'rgba(128,128,128,0.3)',
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
