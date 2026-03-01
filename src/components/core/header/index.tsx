import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@components/core/language-switcher/LanguageSwitcher';
import { ThemeModeToggle } from '@components/core/theme-toggle/ThemeModeToggle';
import { APP_PAGES } from '@constants';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;
const navItems = [
  APP_PAGES.HOME,
  APP_PAGES.PROFILE,
  APP_PAGES.SKILLS,
  APP_PAGES.PROJECTS,
  APP_PAGES.CONTACT,
];

/* Map page enum to i18n key */
const navI18nMap: Record<string, string> = {
  [APP_PAGES.HOME]: 'nav.home',
  [APP_PAGES.PROFILE]: 'nav.profile',
  [APP_PAGES.SKILLS]: 'nav.skills',
  [APP_PAGES.PROJECTS]: 'nav.projects',
  [APP_PAGES.CONTACT]: 'nav.contact',
};

export const PFAppBar = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>(APP_PAGES.HOME.toLowerCase());

  // Track active section on scroll
  React.useEffect(() => {
    const sectionIds = navItems.map(item => item.toLowerCase());

    const handleScroll = () => {
      let currentSection = sectionIds[0];
      const threshold = window.innerHeight * 0.35;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Section top is above the threshold line → it's the current section
          if (rect.top <= threshold) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const handleScrollTo = (id: string) => {
    const lowerId = id.toLowerCase();
    const element = document.getElementById(lowerId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(lowerId);
    }
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, my: 1 }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold', color: isLight ? '#5C4A32' : '#FFE4B5' }}>
          Ky Nguyen
        </Typography>
        <IconButton
          onClick={handleDrawerToggle}
          aria-label={t('common.closeMenu')}
          sx={{ color: isLight ? '#5C4A32' : '#FFE4B5' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ borderColor: isLight ? 'rgba(184,137,31,0.3)' : 'rgba(245, 208, 96, 0.3)' }} />
      <List>
        {navItems.map(item => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              onClick={() => handleScrollTo(item)}
              selected={activeSection === item.toLowerCase()}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={t(navI18nMap[item])} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem sx={{ justifyContent: 'center', mt: 1 }}>
          <ThemeModeToggle />
          <LanguageSwitcher />
        </ListItem>
      </List>
    </Box>
  );

  const container = undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component='nav'
        sx={{
          px: { md: '20%' },
          backdropFilter: 'blur(12px)',
          backgroundColor: isLight ? 'rgba(251,246,238,0.85)' : 'rgba(11, 13, 46, 0.7)',
          boxShadow: isLight ? '0 1px 20px rgba(0,0,0,0.08)' : '0 1px 20px rgba(0,0,0,0.3)',
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: isLight ? '#5C4A32' : '#FFE4B5' }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <img
              src='/icons/dashboard-icon.png'
              alt='Ky Nguyen Logo'
              loading='eager'
              style={{ height: 40, cursor: 'pointer' }}
              onClick={() => handleScrollTo(APP_PAGES.HOME)}
            />
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map(item => (
              <Button
                key={item}
                sx={{
                  color: activeSection === item.toLowerCase()
                    ? (isLight ? '#B8891F' : '#F5D060')
                    : (isLight ? '#5C4A32' : '#FFE4B5'),
                  fontWeight: activeSection === item.toLowerCase() ? 700 : 500,
                  borderBottom: activeSection === item.toLowerCase()
                    ? `2px solid ${isLight ? '#B8891F' : '#F5D060'}`
                    : '2px solid transparent',
                  borderRadius: 0,
                  transition: 'all 0.3s ease',
                  mx: 0.5,
                  '&:hover': {
                    color: isLight ? '#B8891F' : '#F5D060',
                    backgroundColor: isLight ? 'rgba(184,137,31,0.1)' : 'rgba(245, 208, 96, 0.1)',
                  },
                }}
                onClick={() => handleScrollTo(item)}
              >
                {t(navI18nMap[item])}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 1, alignItems: 'center', gap: 0.5 }}>
            <ThemeModeToggle />
            <LanguageSwitcher />
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: isLight ? 'rgba(251,246,238,0.98)' : 'rgba(11, 13, 46, 0.95)',
              backdropFilter: 'blur(12px)',
              color: isLight ? '#5C4A32' : '#FFE4B5',
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};
