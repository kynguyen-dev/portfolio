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
  // We use inline CSS var injection for the primary and shadow colors so we can
  // utilize arbitrary value injection via Tailwind cleanly for pseudo elements.
  const activeStyle = active
    ? { '--c-prim': '#8b00ff', '--c-shad': '#00e572' }
    : { '--c-prim': '#ff184c', '--c-shad': '#fded00' };

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
          'group relative z-[1] flex h-full w-full cursor-pointer items-center justify-center border-none bg-transparent font-label-grotesk font-black uppercase text-white transition-all duration-300',
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
        <div
          className={cn(
            'absolute inset-0 -z-10 transition-colors [clip-path:var(--cyber-clip)]',
            active
              ? 'bg-[var(--c-prim)]'
              : 'bg-[var(--c-prim)] group-hover:bg-[#cc133c]'
          )}
        />

        {children}

        {/* Glitch Overlay */}
        <span
          aria-hidden='true'
          className={cn(
            'absolute inset-[-5px] z-10 hidden items-center justify-center uppercase',
            'bg-[var(--c-shad)] text-white [clip-path:var(--cyber-clip)]',
            active
              ? '[text-shadow:2px_2px_var(--c-shad),-2px_-2px_hsl(180,90%,60%)] animate-cyber-glitch-active block'
              : '[text-shadow:2px_2px_var(--c-shad),-2px_-2px_hsl(60,90%,60%)] group-hover:block group-hover:animate-cyber-glitch'
          )}
        >
          <div
            className={cn(
              'absolute inset-[5px] -z-10 transition-colors [clip-path:var(--cyber-clip)]',
              active
                ? 'bg-[var(--c-prim)]'
                : 'bg-[var(--c-prim)] group-hover:bg-[#cc133c]'
            )}
          />
          {glitchText ?? children}
        </span>

        {/* Corner Tag */}
        {tag && (
          <span
            className='absolute top-0 left-[81%] flex h-[6px] w-[15px] items-center justify-center bg-[var(--c-shad)] text-[5.5px] font-bold tracking-[1px] text-[#323232] uppercase transition-colors'
            aria-hidden='true'
          >
            {tag}
          </span>
        )}
      </button>
    </div>
  );
};
