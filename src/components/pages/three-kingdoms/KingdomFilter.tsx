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
          'px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer border',
          selected === 'all'
            ? 'bg-ct-secondary text-ct-on-secondary border-ct-secondary shadow-lg shadow-ct-secondary/20'
            : 'glass-panel text-ct-on-surface-variant border-ct-outline-variant/30 hover:border-ct-secondary/50 hover:text-ct-secondary'
        )}
      >
        🏯 All
      </button>
      {KINGDOMS.map(k => (
        <button
          key={k.id}
          onClick={() => onChange(k.id)}
          className={cn(
            'px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer border flex items-center gap-2',
            selected === k.id
              ? 'shadow-lg'
              : 'glass-panel text-ct-on-surface-variant hover:border-opacity-60'
          )}
          style={
            selected === k.id
              ? {
                  backgroundColor: k.color,
                  color: '#fff',
                  borderColor: k.color,
                  boxShadow: `0 4px 12px ${k.color}40`,
                }
              : {
                  borderColor: `${k.color}40`,
                }
          }
        >
          <span>{k.emoji}</span>
          <span>{k.name.en}</span>
        </button>
      ))}
    </div>
  );
};
