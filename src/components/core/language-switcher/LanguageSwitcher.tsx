import { useState, useRef, useEffect } from 'react';
import { Translate } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@i18n';
import { cn } from '@lib/utils';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang =
    SUPPORTED_LANGUAGES.find(l => l.code === i18n.language) ??
    SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label='Change language'
        className='flex items-center gap-2 cursor-pointer text-[var(--color-text-primary)] px-2 py-1 rounded transition-colors hover:bg-[var(--color-primary-light)]/10'
      >
        <Translate size={16} className='text-[var(--color-primary-light)]' />
        <span className='text-sm font-semibold text-[var(--color-primary-light)]'>
          {currentLang.flag} {currentLang.label}
        </span>
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 min-w-[120px] bg-[var(--color-background-paper)]/95 backdrop-blur-md border border-[var(--color-primary-light)]/20 rounded shadow-lg z-50 overflow-hidden'>
          {SUPPORTED_LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => {
                i18n.changeLanguage(lang.code);
                setIsOpen(false);
              }}
              className={cn(
                'w-full text-left px-4 py-2 text-sm transition-colors hover:bg-[var(--color-primary-light)]/10 text-[var(--color-text-primary)]',
                lang.code === i18n.language &&
                  'bg-[var(--color-primary-light)]/15'
              )}
            >
              {lang.flag} {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
