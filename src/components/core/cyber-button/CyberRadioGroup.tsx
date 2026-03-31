import { InputHTMLAttributes } from 'react';
import { cn } from '@utils/core/cn';
import styles from './CyberButton.module.css';

/* ─────────────────────────────────────────────
   CyberRadio — Glitch-punk Radio Button
   ───────────────────────────────────────────── */

export interface CyberRadioOption {
  /** Unique value for this option */
  value: string;
  /** Display label */
  label: string;
  /** Glitch text overlay. Defaults to label if not provided */
  glitchText?: string;
  /** Small corner tag (e.g. "r1") */
  tag?: string;
}

export interface CyberRadioGroupProps {
  /** The radio group name (shared across all radios) */
  name: string;
  /** List of options */
  options: CyberRadioOption[];
  /** Currently selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className for the group container */
  className?: string;
  /** Extra props forwarded to each hidden radio input */
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'name' | 'value' | 'checked' | 'onChange' | 'className'
  >;
}

export const CyberRadioGroup = ({
  name,
  options,
  value,
  onChange,
  size = 'md',
  className,
}: CyberRadioGroupProps) => {
  const sizeClass = size !== 'md' ? styles[`btn--${size}`] : '';
  const wrapperSize =
    size === 'sm'
      ? styles['wrapper--sm']
      : size === 'lg'
        ? styles['wrapper--lg']
        : '';

  return (
    <div className={cn(styles.radioGroup, className)}>
      {options.map(opt => {
        const isChecked = value === opt.value;

        return (
          <div key={opt.value} className={cn(styles.wrapper, wrapperSize)}>
            <input
              type='radio'
              id={`${name}-${opt.value}`}
              name={name}
              value={opt.value}
              checked={isChecked}
              onChange={() => onChange?.(opt.value)}
              className={styles.hiddenInput}
            />
            <div className={cn(styles.btn, sizeClass)}>
              {opt.label}
              <span aria-hidden='true' className={styles.glitch}>
                {opt.glitchText ?? opt.label}
              </span>
              {opt.tag && (
                <span className={styles.tag} aria-hidden='true'>
                  {opt.tag}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
