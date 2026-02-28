import { IconButton, Tooltip, useTheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeMode } from '@contexts/theme-mode';
import { useTranslation } from 'react-i18next';

export const ThemeModeToggle = () => {
  const { mode, toggleMode } = useThemeMode();
  const { t } = useTranslation();
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';

  const label = mode === 'dark' ? t('common.lightMode') : t('common.darkMode');

  return (
    <Tooltip title={label} arrow>
      <IconButton
        onClick={toggleMode}
        aria-label={label}
        sx={{
          color: isLight ? '#5C4A32' : '#FFE4B5',
          transition: 'transform 0.3s ease, color 0.3s ease',
          '&:hover': {
            color: isLight ? '#B8891F' : '#F5D060',
            transform: 'rotate(30deg)',
          },
        }}
      >
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};
