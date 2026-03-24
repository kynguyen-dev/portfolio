import { KINGDOMS } from '@constants/three-kingdoms';
import type { Kingdom } from '@constants/three-kingdoms';
import { cn } from '@utils/core/cn';

interface KingdomFilterProps {
  selected: Kingdom | 'all';
  onChange: (kingdom: Kingdom | 'all') => void;
}

export const KingdomFilter = ({ selected, onChange }: KingdomFilterProps) => {
  return (
    <div className='flex flex-row gap-2 flex-wrap'>
      <button
        onClick={() => onChange('all')}
        className={cn(
          'px-3 py-1 rounded-full text-sm border transition-colors cursor-pointer',
          selected === 'all'
            ? 'font-bold bg-primary-main/15 text-primary-light border-primary-light'
            : 'font-medium text-ct-on-surface-variant border-ct-outline-variant/30 hover:border-ct-outline-variant/60'
        )}
      >
        🏯 All
      </button>
      {KINGDOMS.map(k => (
        <button
          key={k.id}
          onClick={() => onChange(k.id)}
          className={cn(
            'px-3 py-1 rounded-full text-sm border transition-colors cursor-pointer',
            selected === k.id
              ? 'font-bold'
              : 'font-medium text-ct-on-surface-variant hover:border-opacity-60'
          )}
          style={
            selected === k.id
              ? {
                  backgroundColor: `${k.color}20`,
                  color: k.color,
                  borderColor: k.color,
                }
              : { borderColor: `${k.color}50` }
          }
        >
          {k.emoji} {k.name.en}
        </button>
      ))}
    </div>
  );
};
