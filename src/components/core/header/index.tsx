import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { InputAdornment, InputBase, Stack, useTheme } from '@mui/material';
import { PFButton, PFTypography } from '..';

export const PFAppBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const { palette } = useTheme();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='error'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size='large'
          aria-label='show 17 new notifications'
          color='inherit'
        >
          <Badge badgeContent={17} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{
          background: palette.background.default,
          boxShadow: 'none',
          paddingY: '32px',
        }}
      >
        <Toolbar sx={{ marginX: '64px' }}>
          <PFTypography
            variant='h5'
            noWrap
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {'<JS /> Nguyen Truong Ky'}
          </PFTypography>

          <Box sx={{ flexGrow: 1 }} />
          <Stack gap={'48px'} direction={'row'}>
            <Stack gap={'24px'} direction={'row'}>
              <PFButton variant='text'>
                <PFTypography
                  variant='h6'
                  noWrap
                  component='div'
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  Home
                </PFTypography>
              </PFButton>
              <PFButton variant='text'>
                <PFTypography
                  variant='h6'
                  noWrap
                  component='div'
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  Blogs
                </PFTypography>
              </PFButton>
            </Stack>

            <Toolbar
              style={{
                minHeight: '48px',
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #fff',
              }}
            >
              <InputBase
                placeholder='Search...'
                endAdornment={
                  <InputAdornment position='start'>
                    <SearchIcon color='primary' />
                  </InputAdornment>
                }
                sx={{ flex: 1, marginX: 1, color: palette.primary.main }}
              />
            </Toolbar>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '24px' }}>
              <IconButton
                size='large'
                aria-label='show 4 new mails'
                color='inherit'
              >
                <PhoneIphoneIcon />
                <PFTypography variant='body2'>Contact</PFTypography>
              </IconButton>
              <IconButton
                size='large'
                aria-label='show 17 new notifications'
                color='inherit'
              >
                <EmailIcon />
                <PFTypography variant='body2'>Email</PFTypography>
              </IconButton>
              <IconButton
                size='large'
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <GitHubIcon />
                <PFTypography variant='body1'>Github</PFTypography>
              </IconButton>
            </Box>
          </Stack>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};
