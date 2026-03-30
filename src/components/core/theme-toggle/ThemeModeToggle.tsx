import { SunIcon, MoonIcon } from '@phosphor-icons/react';
import { useThemeMode } from '@contexts/theme-mode';
import { useTranslation } from 'react-i18next';
import { cn } from '@lib/utils';

export const ThemeModeToggle = () => {
  const { mode, toggleMode } = useThemeMode();
  const { t } = useTranslation();
  const isLight = mode === 'light';

  const label = isLight ? t('common.darkMode') : t('common.lightMode');

  return (
    <button
      onClick={toggleMode}
      aria-label={label}
      title={label}
      className={cn(
        'p-2 rounded-full transition-all duration-300 hover:rotate-[30deg]',
        isLight
          ? 'text-[#5C4A32] hover:text-[#B8891F] hover:bg-[#5C4A32]/5'
          : 'text-[#FFE4B5] hover:text-[#F5D060] hover:bg-[#FFE4B5]/10'
      )}
    >
      {isLight ? <MoonIcon size={20} /> : <SunIcon size={20} />}
    </button>
  );
};
