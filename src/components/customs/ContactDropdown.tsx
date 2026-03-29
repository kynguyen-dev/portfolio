/**
 * ContactDropdown — A floating dropdown that appears when clicking INIT_CONTACT.
 * Shows two options: Gmail and Phone (Zalo).
 */
import { useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Envelope, ChatCircle } from '@phosphor-icons/react';
import { cn } from '@utils/core/cn';
import { APP_INFORMATION } from '@constants';

interface ContactDropdownProps {
  children: ReactNode;
  /** Additional className for the trigger wrapper */
  className?: string;
}

const ZALO_PHONE = '+84868772887';
const ZALO_URL = `https://zalo.me/${ZALO_PHONE.replace('+', '')}`;

export const ContactDropdown = ({
  children,
  className,
}: ContactDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Animation
  const dropdownSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    y: isOpen ? 0 : -8,
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
          className='absolute left-1/2 -translate-x-1/2 mt-3 z-50 min-w-[220px]'
        >
          {/* Arrow */}
          <div className='absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-ct-surface-container-high border-l border-t border-ct-outline-variant/20' />

          <div className='rounded-xl glass-elevated overflow-hidden border border-ct-outline-variant/15 shadow-[0_20px_60px_rgba(0,0,0,0.4)]'>
            {/* Gmail Option */}
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${APP_INFORMATION.EMAIL_TO.replace('mailto:', '')}`}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-4 px-5 py-4 hover:bg-primary-main/10 transition-colors duration-200 group no-underline'
              onClick={() => setIsOpen(false)}
            >
              <div className='w-10 h-10 rounded-lg bg-primary-main/10 flex items-center justify-center group-hover:bg-primary-main/20 transition-colors'>
                <Envelope
                  size={20}
                  weight='duotone'
                  className='text-primary-main'
                />
              </div>
              <div>
                <div className='text-sm font-bold text-ct-on-surface font-label-grotesk tracking-wide'>
                  GMAIL
                </div>
                <div className='text-[10px] text-ct-on-surface-variant font-label-grotesk tracking-wider'>
                  kynt101099@gmail.com
                </div>
              </div>
            </a>

            {/* Divider */}
            <div className='h-px bg-ct-outline-variant/10 mx-4' />

            {/* Zalo Option */}
            <a
              href={ZALO_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-4 px-5 py-4 hover:bg-ct-secondary/10 transition-colors duration-200 group no-underline'
              onClick={() => setIsOpen(false)}
            >
              <div className='w-10 h-10 rounded-lg bg-ct-secondary/10 flex items-center justify-center group-hover:bg-ct-secondary/20 transition-colors'>
                <ChatCircle size={20} weight='duotone' className='text-ct-secondary' />
              </div>
              <div>
                <div className='text-sm font-bold text-ct-on-surface font-label-grotesk tracking-wide'>
                  ZALO
                </div>
                <div className='text-[10px] text-ct-on-surface-variant font-label-grotesk tracking-wider'>
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
