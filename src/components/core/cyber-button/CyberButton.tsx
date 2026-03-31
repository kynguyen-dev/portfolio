import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@utils/core/cn';

export interface CyberButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  glitchText?: string;
  tag?: string;
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CyberButton = ({
  children,
  glitchText,
  tag,
  active = false,
  size = 'md',
  className,
  ...props
}: CyberButtonProps) => {
  // We use inline CSS var injection for the dynamic shape colors to automatically
  // utilize proper Tailwind design tokens for active and inactive states.
  // Active: Primary (Purple) / Secondary (Mint)
  // Inactive: Surface Container High / Outline Variant
  const activeStyle = active
    ? {
        '--c-prim': 'var(--color-primary-main)',
        '--c-shad': 'var(--color-secondary-main)',
        '--c-hover-prim': 'var(--color-primary-light)',
        '--c-text-main': 'var(--color-ct-on-primary)',
        '--c-text-glitch': 'var(--color-ct-on-secondary)',
        '--c-shadow-glitch': 'var(--color-tertiary)',
      }
    : {
        '--c-prim': 'var(--color-ct-surface-container-high)',
        '--c-shad': 'var(--color-ct-outline-variant)',
        '--c-hover-prim': 'var(--color-ct-surface-container-highest)',
        '--c-text-main': 'var(--color-ct-on-surface)',
        '--c-text-glitch': 'var(--color-ct-on-surface-variant)',
        '--c-shadow-glitch': 'var(--color-ct-outline)',
      };

  return (
    <div
      className={cn(
        'relative m-[3px] inline-block',
        size === 'sm' && 'h-[34px] min-w-[72px]',
        size === 'md' && 'h-[42px] min-w-[100px]',
        size === 'lg' && 'h-[50px] min-w-[130px]',
        className
      )}
      style={activeStyle as React.CSSProperties}
    >
      <button
        type='button'
        className={cn(
          'group relative z-[1] flex h-full w-full cursor-pointer items-center justify-center border-none bg-transparent font-label-grotesk font-black uppercase text-[var(--c-text-main)] transition-all duration-300',
          size === 'sm' &&
            'px-[12px] text-[8px] tracking-[2px] group-hover:text-[9px]',
          size === 'md' &&
            'px-[12px] text-[9px] tracking-[3px] group-hover:text-[11px]',
          size === 'lg' &&
            'px-[18px] text-[11px] tracking-[4px] group-hover:text-[13px]'
        )}
        {...props}
      >
        {/* Shadow Background */}
        <div className='absolute inset-0 -z-10 translate-x-[5px] bg-[var(--c-shad)] transition-colors [clip-path:var(--cyber-clip)]' />

        {/* Main Background */}
        <div className='absolute inset-0 -z-10 bg-[var(--c-prim)] transition-colors group-hover:bg-[var(--c-hover-prim)] [clip-path:var(--cyber-clip)]' />

        {children}

        {/* Glitch Overlay */}
        <span
          aria-hidden='true'
          className={cn(
            'absolute inset-[-5px] z-10 hidden items-center justify-center uppercase',
            'bg-[var(--c-shad)] text-[var(--c-text-glitch)] [clip-path:var(--cyber-clip)]',
            '[text-shadow:2px_2px_var(--c-shad),-2px_-2px_var(--c-shadow-glitch)]',
            active
              ? 'animate-cyber-glitch-active block'
              : 'group-hover:block group-hover:animate-cyber-glitch'
          )}
        >
          <div className='absolute inset-[5px] -z-10 bg-[var(--c-prim)] transition-colors group-hover:bg-[var(--c-hover-prim)] [clip-path:var(--cyber-clip)]' />
          {glitchText ?? children}
        </span>

        {/* Corner Tag */}
        {tag && (
          <span
            className='absolute top-0 left-[81%] flex h-[6px] min-w-[15px] items-center justify-center bg-[var(--c-shad)] px-[2px] text-[5.5px] font-bold uppercase tracking-[1px] text-[var(--c-text-glitch)] transition-colors'
            aria-hidden='true'
          >
            {tag}
          </span>
        )}
      </button>
    </div>
  );
};
