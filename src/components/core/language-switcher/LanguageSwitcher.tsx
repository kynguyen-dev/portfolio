import { useState } from 'react';
import { Box, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@i18n';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const currentLang =
    SUPPORTED_LANGUAGES.find(l => l.code === i18n.language) ??
    SUPPORTED_LANGUAGES[0];

  return (
    <>
      <Box
        onClick={e => setAnchorEl(e.currentTarget)}
        role='button'
        aria-label='Change language'
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setAnchorEl(e.currentTarget as HTMLElement);
          }
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          cursor: 'pointer',
          color: palette.text.primary,
          px: 1,
          py: 0.5,
          borderRadius: 1,
          transition: 'background 0.2s',
          '&:hover': { background: `${palette.primary.light}18` },
        }}
      >
        <LanguageIcon fontSize='small' sx={{ color: palette.primary.light }} />
        <Typography
          variant='body2'
          fontWeight={600}
          sx={{ color: palette.primary.light }}
        >
          {currentLang.flag} {currentLang.label}
        </Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            background: isLight
              ? 'rgba(255,248,240,0.98)'
              : 'rgba(11, 13, 46, 0.95)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)'}`,
            color: palette.text.primary,
            minWidth: 120,
          },
        }}
      >
        {SUPPORTED_LANGUAGES.map(lang => (
          <MenuItem
            key={lang.code}
            selected={lang.code === i18n.language}
            onClick={() => {
              i18n.changeLanguage(lang.code);
              setAnchorEl(null);
            }}
            sx={{
              '&.Mui-selected': { background: `${palette.primary.light}26` },
              '&:hover': { background: `${palette.primary.light}18` },
            }}
          >
            <Typography variant='body2'>
              {lang.flag} {lang.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
