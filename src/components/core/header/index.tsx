import * as React from 'react';
import { CaretLeftIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@components/core/language-switcher/LanguageSwitcher';
import { ThemeModeToggle } from '@components/core/theme-toggle/ThemeModeToggle';
import { AuthButton } from '@components/core/auth';
import { cn } from '@utils/core/cn';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { ROUTES } from '@constants/router';
import {
  ResizableNavbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from '@components/customs/aceternity';

interface NavItem {
  id: string;
  labelKey: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'experience', labelKey: 'nav.experience', href: '#path' },
  { id: 'arsenal', labelKey: 'nav.theArsenal', href: '#skills' },
  { id: 'tools', labelKey: 'nav.tools', href: '#tools' },
  { id: 'contact', labelKey: 'nav.contact', href: '#contact' },
];

export interface PFAppBarProps {
  onBack?: () => void;
  brandText?: string;
  brandLogo?: React.ReactNode;
}

export const PFAppBar = ({ onBack, brandText, brandLogo }: PFAppBarProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === ROUTES.HOME;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeNav, setActiveNav] = React.useState('path');

  const handleDrawerToggle = () => setMobileOpen(prev => !prev);

  const handleLogoClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveNav('path');
    } else {
      navigate({ to: ROUTES.HOME });
    }
  };

  const handleNavClick = (item: NavItem) => {
    if (isHome) {
      const elId = item.href.replace('#', '');
      const element = document.getElementById(elId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setActiveNav(item.id);
    } else {
      navigate({ to: ROUTES.HOME, hash: item.href.replace('#', '') });
    }
    setMobileOpen(false);
  };

  return (
    <header>
      <ResizableNavbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div className='flex items-center gap-4'>
            {onBack && (
              <button
                onClick={onBack}
                aria-label='Back'
                className='flex items-center justify-center w-10 h-10 rounded-full text-ct-on-surface glass-panel hover:bg-ct-surface-container-high/90 transition-all duration-300 cursor-pointer active:scale-90'
              >
                <CaretLeftIcon size={20} weight='bold' />
              </button>
            )}
            <div
              className='cursor-pointer flex items-center gap-3 font-label-grotesk font-black tracking-widest text-xl text-ct-secondary uppercase'
              onClick={handleLogoClick}
            >
              {brandLogo}
              <span>
                {brandText ||
                  (isHome ? t('nav.brandHome') : t('nav.brandOther'))}
              </span>
            </div>
          </div>

          <div className='hidden md:flex items-center justify-center flex-1 gap-8'>
            {isHome &&
              navItems.map(item => (
                <a
                  key={item.id}
                  className={cn(
                    'font-label-grotesk uppercase tracking-widest text-xs transition-colors duration-300 cursor-pointer',
                    activeNav === item.id
                      ? 'text-primary-main border-b-2 border-primary-main pb-1'
                      : 'text-ct-on-surface-variant/60 hover:text-ct-secondary'
                  )}
                  onClick={() => handleNavClick(item)}
                >
                  {t(item.labelKey)}
                </a>
              ))}
          </div>

          <div className='hidden md:flex items-center gap-3 ml-4'>
            <ThemeModeToggle />
            <LanguageSwitcher />
            <AuthButton />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <div className='flex items-center gap-4'>
              {onBack && (
                <button
                  onClick={onBack}
                  aria-label='Back'
                  className='flex items-center justify-center w-10 h-10 rounded-full text-ct-on-surface glass-panel hover:bg-ct-surface-container-high/90 transition-all duration-300 cursor-pointer active:scale-90'
                >
                  <CaretLeftIcon size={20} weight='bold' />
                </button>
              )}
              <div
                className='cursor-pointer flex items-center gap-3 font-label-grotesk font-black tracking-widest text-xl text-ct-secondary uppercase'
                onClick={handleLogoClick}
              >
                {brandLogo}
                <span>
                  {brandText ||
                    (isHome ? t('nav.brandHome') : t('nav.brandOther'))}
                </span>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              {isHome ? (
                <>
                  <ThemeModeToggle />
                  <MobileNavToggle
                    isOpen={mobileOpen}
                    onClick={handleDrawerToggle}
                  />
                </>
              ) : (
                <div className='flex items-center gap-2'>
                  <ThemeModeToggle />
                  <LanguageSwitcher />
                </div>
              )}
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
          >
            <div className='flex w-full flex-col gap-2'>
              {isHome &&
                navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={cn(
                      'w-full text-left px-6 py-3 text-xs font-label-grotesk font-medium uppercase tracking-[0.1em] transition-all rounded-lg',
                      activeNav === item.id
                        ? 'text-ct-secondary bg-ct-secondary/10'
                        : 'text-ct-on-surface-variant/60 hover:text-ct-secondary hover:bg-ct-secondary/5'
                    )}
                  >
                    {t(item.labelKey)}
                  </button>
                ))}
            </div>
            <div className='w-full pt-4 mt-2 border-t border-ct-outline-variant/20 flex justify-between items-center'>
              <LanguageSwitcher />
              <AuthButton />
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </header>
  );
};
