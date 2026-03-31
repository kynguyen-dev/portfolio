import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@utils/core/cn';
import styles from './CyberButton.module.css';

/* ─────────────────────────────────────────────
   CyberButton — Glitch-punk Button Component
   Faithfully ported from stitch/radio prototype.
   ───────────────────────────────────────────── */

export interface CyberButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The visible label text */
  children: ReactNode;
  /** Glitch text shown on hover / active state. Defaults to children if not provided */
  glitchText?: string;
  /** Small corner-tag identifier (e.g. "r1") */
  tag?: string;
  /** Whether the button is in active/selected state */
  active?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Optional className override */
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
  const sizeClass = size !== 'md' ? styles[`btn--${size}`] : '';

  return (
    <div
      className={cn(
        styles.wrapper,
        size === 'sm' && styles['wrapper--sm'],
        size === 'lg' && styles['wrapper--lg'],
        className
      )}
    >
      <button
        type='button'
        className={cn(styles.btn, sizeClass, active && styles['btn--active'])}
        {...props}
      >
        {children}
        <span aria-hidden='true' className={styles.glitch}>
          {glitchText ?? children}
        </span>
        {tag && (
          <span className={styles.tag} aria-hidden='true'>
            {tag}
          </span>
        )}
      </button>
    </div>
  );
};
