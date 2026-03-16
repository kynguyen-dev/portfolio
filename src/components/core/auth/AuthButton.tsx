import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Avatar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  useTheme,
} from '@mui/material';
import { useState, MouseEvent } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { PFTypography } from '@components/core';

/**
 * Auth button that shows a Login icon when unauthenticated,
 * and the user's avatar with a dropdown menu when authenticated.
 * Designed to sit in the top-right corner of any page.
 */
export const AuthButton = () => {
  const { isAuthenticated, isLoading, user, loginWithRedirect, logout } =
    useAuth0();
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleLogout = () => {
    handleMenuClose();
    logout({
      logoutParams: {
        returnTo: `${window.location.origin}/`,
      },
    });
  };

  if (isLoading) return null;

  const buttonBaseSx = {
    color: isLight ? '#5C4A32' : '#FFE4B5',
    background: isLight ? 'rgba(255,248,240, 0.8)' : 'rgba(11, 13, 46, 0.6)',
    backdropFilter: 'blur(12px)',
    border: `1px solid ${isLight ? 'rgba(184,137,31,0.2)' : 'rgba(245,208,96,0.2)'}`,
    '&:hover': {
      background: isLight
        ? 'rgba(255,248,240, 0.95)'
        : 'rgba(11, 13, 46, 0.85)',
    },
  };

  /* ── Not logged in → show login button ── */
  if (!isAuthenticated) {
    return (
      <Tooltip title='Sign in' arrow>
        <IconButton
          onClick={handleLogin}
          aria-label='Sign in'
          sx={buttonBaseSx}
        >
          <LoginIcon />
        </IconButton>
      </Tooltip>
    );
  }

  /* ── Logged in → show avatar + dropdown ── */
  return (
    <>
      <Tooltip title={user?.name ?? 'Account'} arrow>
        <IconButton
          onClick={handleMenuOpen}
          aria-label='Account menu'
          sx={{
            ...buttonBaseSx,
            p: 0.5,
          }}
        >
          {user?.picture ? (
            <Avatar
              src={user.picture}
              alt={user.name ?? 'User'}
              sx={{ width: 32, height: 32 }}
            />
          ) : (
            <PersonIcon />
          )}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 200,
              background: isLight
                ? 'rgba(255,248,240,0.95)'
                : 'rgba(11, 13, 46, 0.9)',
              backdropFilter: 'blur(16px)',
              border: `1px solid ${isLight ? 'rgba(184,137,31,0.15)' : 'rgba(245,208,96,0.15)'}`,
              borderRadius: 2,
            },
          },
        }}
      >
        {/* User info header */}
        <Box sx={{ px: 2, py: 1.5 }}>
          <PFTypography
            variant='body2'
            sx={{ fontWeight: 700, color: palette.text.primary }}
          >
            {user?.name}
          </PFTypography>
          <PFTypography
            variant='caption'
            sx={{ color: palette.text.secondary }}
          >
            {user?.email}
          </PFTypography>
        </Box>

        <Divider
          sx={{
            borderColor: isLight
              ? 'rgba(184,137,31,0.1)'
              : 'rgba(245,208,96,0.1)',
          }}
        />

        {/* Logout */}
        <MenuItem
          onClick={handleLogout}
          sx={{
            gap: 1.5,
            py: 1.5,
            color: palette.text.primary,
            '&:hover': {
              background: isLight
                ? 'rgba(184,137,31,0.06)'
                : 'rgba(245,208,96,0.06)',
            },
          }}
        >
          <LogoutIcon
            sx={{ fontSize: 18, color: isLight ? '#B8891F' : '#F5D060' }}
          />
          <PFTypography variant='body2'>Sign out</PFTypography>
        </MenuItem>
      </Menu>
    </>
  );
};
