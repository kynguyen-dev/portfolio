import { InputHTMLAttributes } from 'react';
import { cn } from '@utils/core/cn';
import { CyberButton } from './CyberButton';

export interface CyberRadioOption {
  value: string;
  label: string;
  glitchText?: string;
  tag?: string;
}

export interface CyberRadioGroupProps {
  name: string;
  options: CyberRadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'name' | 'value' | 'checked' | 'onChange' | 'className' | 'onClick'
  >;
}

export const CyberRadioGroup = ({
  name,
  options,
  value,
  onChange,
  size = 'md',
  className,
  inputProps,
}: CyberRadioGroupProps) => {
  return (
    <div className={cn('flex flex-row flex-wrap gap-0', className)}>
      {options.map(opt => {
        const isChecked = value === opt.value;

        return (
          <div
            key={opt.value}
            className='relative flex items-center justify-center'
          >
            <input
              type='radio'
              id={`${name}-${opt.value}`}
              name={name}
              value={opt.value}
              checked={isChecked}
              onChange={() => onChange?.(opt.value)}
              className='absolute inset-0 z-20 m-0 h-full w-full cursor-pointer opacity-0'
              {...inputProps}
            />

            <CyberButton
              type='button'
              tabIndex={-1}
              active={isChecked}
              size={size}
              tag={opt.tag}
              glitchText={opt.glitchText}
            >
              {opt.label}
            </CyberButton>
          </div>
        );
      })}
    </div>
  );
};
