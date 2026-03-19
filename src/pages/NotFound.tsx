import { Stack, Button, useTheme } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { PFTypography } from '@components/core';
import { useEffect } from 'react';

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';

  useEffect(() => {
    document.title = `${t('notFound.title')} | Ky Nguyen`;
    return () => {
      document.title = 'Ky Nguyen | Software Developer Portfolio';
    };
  }, [t]);

  return (
    <Stack
      component='main'
      flex={1}
      alignItems='center'
      justifyContent='center'
      width='100%'
      height='100vh'
      spacing={3}
      sx={{
        background: isLight
          ? 'linear-gradient(180deg, #FBF6EE 0%, #F5E6C8 40%, #EDD9A3 100%)'
          : 'linear-gradient(180deg, #0B0D2E 0%, #1B1145 40%, #4A1942 100%)',
      }}
    >
      <PFTypography
        variant='h1'
        fontWeight={600}
        sx={{ color: isLight ? '#B8891F' : '#F5D060' }}
      >
        {t('notFound.title')}
      </PFTypography>
      <PFTypography
        variant='h5'
        sx={{ color: isLight ? '#5C4A32' : '#FFE4B5' }}
      >
        {t('notFound.message')}
      </PFTypography>
      <Button
        variant='contained'
        sx={{
          backgroundColor: isLight ? '#B8891F' : '#D4A843',
          '&:hover': { backgroundColor: isLight ? '#D4A843' : '#E8C96A' },
        }}
        onClick={() => navigate({ to: '/' })}
      >
        {t('notFound.goHome')}
      </Button>
    </Stack>
  );
};

export default NotFound;
