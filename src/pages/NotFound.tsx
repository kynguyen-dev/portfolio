import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { PFButton, PFTypography } from '@components/core';
import { useEffect } from 'react';
import { useThemeMode } from '@contexts/theme-mode';
import { cn } from '@utils/core/cn';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mode } = useThemeMode();
  const isLight = mode === 'light';

  useEffect(() => {
    document.title = `${t('notFound.title')} | Ky Nguyen`;
    return () => {
      document.title = 'Ky Nguyen | Software Developer Portfolio';
    };
  }, [t]);

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center w-full min-h-screen gap-6',
        isLight
          ? 'bg-gradient-to-b from-[#FBF6EE] via-[#F5E6C8] to-[#EDD9A3]'
          : 'bg-gradient-to-b from-[#0B0D2E] via-[#1B1145] to-[#4A1942]'
      )}
    >
      <PFTypography
        variant='h1'
        fontWeight={600}
        className={isLight ? 'text-[#B8891F]' : 'text-[#F5D060]'}
      >
        {t('notFound.title')}
      </PFTypography>
      <PFTypography
        variant='h5'
        className={isLight ? 'text-[#5C4A32]' : 'text-[#FFE4B5]'}
      >
        {t('notFound.message')}
      </PFTypography>
      <PFButton
        variant='solid'
        className={cn(
          'transition-colors duration-200',
          isLight
            ? 'bg-[#B8891F] hover:bg-[#D4A843]'
            : 'bg-[#D4A843] hover:bg-[#E8C96A]'
        )}
        onClick={() => navigate({ to: '/' })}
      >
        {t('notFound.goHome')}
      </PFButton>
    </div>
  );
};

export default NotFound;
