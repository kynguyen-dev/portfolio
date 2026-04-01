/**
 * ContactDropdown — A floating dropdown that appears when clicking INIT_CONTACT.
 * Shows two options: Gmail and Phone (Zalo).
 */
import { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { EnvelopeIcon, ChatCircleIcon } from '@phosphor-icons/react';
import { cn } from '@utils/core/cn';
import { APP_INFORMATION } from '@constants';

interface ContactDropdownProps {
  children: ReactNode;
  /** Additional className for the trigger wrapper */
  className?: string;
  enableCyberStyles?: boolean;
}

const ZALO_PHONE = '+84868772887';
const ZALO_URL = `https://zalo.me/${ZALO_PHONE.replace('+', '')}`;

export const ContactDropdown = ({
  children,
  className,
  enableCyberStyles = false,
}: ContactDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDirection, setDropDirection] = useState<'bottom' | 'top'>(
    'bottom'
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Animation reacts accurately to drop direction
  const dropdownSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    y: isOpen ? 0 : dropDirection === 'top' ? 12 : -12,
    scale: isOpen ? 1 : 0.95,
    config: { tension: 400, friction: 26 },
  });

  // Close on outside click
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, handleClickOutside]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Dynamically calculate space before opening
    if (!isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      // Assume dropdown is ~180px tall
      if (spaceBelow < 180 && spaceAbove > 180) {
        setDropDirection('top');
      } else {
        setDropDirection('bottom');
      }
    }

    setIsOpen(prev => !prev);
  };

  return (
    <div ref={dropdownRef} className={cn('relative inline-block', className)}>
      {/* Trigger */}
      <div onClick={toggleDropdown} className='cursor-pointer'>
        {children}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <animated.div
          style={{
            opacity: dropdownSpring.opacity,
            transform: dropdownSpring.y.to(
              y => `translateY(${y}px) scale(${dropdownSpring.scale.get()})`
            ),
          }}
          className={cn(
            'absolute left-1/2 -translate-x-1/2 z-50 min-w-[200px] md:min-w-[240px]',
            dropDirection === 'bottom'
              ? 'top-full mt-2 md:mt-3'
              : 'bottom-full mb-2 md:mb-3',
            enableCyberStyles
              ? 'drop-shadow-[0_0_15px_rgba(208,188,255,0.4)]' // Neon Glow
              : 'shadow-[0_20px_60px_rgba(0,0,0,0.4)]'
          )}
        >
          {/* Arrow is NOT cyber style */}
          {!enableCyberStyles && (
            <div
              className={cn(
                'absolute left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 rotate-45 bg-ct-surface-container-high border-ct-outline-variant/20',
                dropDirection === 'bottom'
                  ? '-top-1.5 md:-top-2 border-l border-t'
                  : '-bottom-1.5 md:-bottom-2 border-r border-b'
              )}
            />
          )}

          <div
            className={cn(
              'overflow-hidden flex flex-col',
              enableCyberStyles
                ? 'bg-ct-surface-container-highest [clip-path:var(--cyber-clip)] p-0.5 md:p-1'
                : 'rounded-xl glass-elevated border border-ct-outline-variant/15'
            )}
          >
            {/* Cyber Inner Background Outline */}
            {enableCyberStyles && (
              <div className='absolute inset-0 -z-10 bg-primary-main/20' />
            )}

            {/* Gmail Option */}
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${APP_INFORMATION.EMAIL_TO.replace('mailto:', '')}`}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                'flex items-center gap-3 md:gap-4 px-4 py-3 md:px-5 md:py-4 transition-all duration-200 group no-underline relative z-10',
                enableCyberStyles
                  ? 'hover:bg-primary-main text-ct-on-surface hover:text-ct-on-primary'
                  : 'hover:bg-primary-main/10 text-ct-on-surface'
              )}
              onClick={() => setIsOpen(false)}
            >
              <div
                className={cn(
                  'w-8 h-8 md:w-10 md:h-10 flex shrink-0 items-center justify-center transition-colors',
                  enableCyberStyles
                    ? 'bg-primary-main/20 group-hover:bg-ct-surface-container-highest'
                    : 'rounded-md md:rounded-lg bg-primary-main/10 group-hover:bg-primary-main/20'
                )}
              >
                <EnvelopeIcon
                  size='100%'
                  weight='duotone'
                  className={cn(
                    'w-4 h-4 md:w-5 md:h-5',
                    enableCyberStyles
                      ? 'text-primary-main group-hover:text-primary-main'
                      : 'text-primary-main'
                  )}
                />
              </div>
              <div className='min-w-0'>
                <div
                  className={cn(
                    'font-bold font-label-grotesk tracking-wide transition-colors truncate',
                    enableCyberStyles
                      ? 'uppercase group-hover:text-ct-on-primary text-[11px] md:text-sm'
                      : 'text-[11px] md:text-sm'
                  )}
                >
                  {'GMAIL'}
                </div>
                <div
                  className={cn(
                    'text-[9px] md:text-[10px] font-label-grotesk tracking-wider opacity-80 transition-colors truncate',
                    enableCyberStyles && 'group-hover:text-ct-on-primary'
                  )}
                >
                  kynt101099@gmail.com
                </div>
              </div>
            </a>

            {/* Divider */}
            <div
              className={cn(
                'h-px mx-3 md:mx-4',
                enableCyberStyles
                  ? 'bg-primary-main/30'
                  : 'bg-ct-outline-variant/10'
              )}
            />

            {/* Zalo Option */}
            <a
              href={ZALO_URL}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                'flex items-center gap-3 md:gap-4 px-4 py-3 md:px-5 md:py-4 transition-all duration-200 group no-underline relative z-10',
                enableCyberStyles
                  ? 'hover:bg-ct-secondary text-ct-on-surface hover:text-ct-surface-container-highest'
                  : 'hover:bg-ct-secondary/10 text-ct-on-surface'
              )}
              onClick={() => setIsOpen(false)}
            >
              <div
                className={cn(
                  'w-8 h-8 md:w-10 md:h-10 flex shrink-0 items-center justify-center transition-colors',
                  enableCyberStyles
                    ? 'bg-ct-secondary/20 group-hover:bg-ct-surface-container-highest'
                    : 'rounded-md md:rounded-lg bg-ct-secondary/10 group-hover:bg-ct-secondary/20'
                )}
              >
                <ChatCircleIcon
                  size='100%'
                  weight='duotone'
                  className={cn(
                    'w-4 h-4 md:w-5 md:h-5',
                    enableCyberStyles
                      ? 'text-ct-secondary group-hover:text-ct-secondary'
                      : 'text-ct-secondary'
                  )}
                />
              </div>
              <div className='min-w-0'>
                <div
                  className={cn(
                    'font-bold font-label-grotesk tracking-wide transition-colors truncate',
                    enableCyberStyles
                      ? 'uppercase group-hover:text-ct-surface-container-highest text-[11px] md:text-sm'
                      : 'text-[11px] md:text-sm'
                  )}
                >
                  {'ZALO'}
                </div>
                <div
                  className={cn(
                    'text-[9px] md:text-[10px] font-label-grotesk tracking-wider opacity-80 transition-colors truncate',
                    enableCyberStyles &&
                      'group-hover:text-ct-surface-container-highest'
                  )}
                >
                  {ZALO_PHONE}
                </div>
              </div>
            </a>
          </div>
        </animated.div>
      )}
    </div>
  );
};
