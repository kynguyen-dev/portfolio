import * as React from 'react';
import { List, X } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@components/core/language-switcher/LanguageSwitcher';
import { ThemeModeToggle } from '@components/core/theme-toggle/ThemeModeToggle';
import { AuthButton } from '@components/core/auth';
import { cn } from '@utils/core/cn';
import { useTransition, animated, useSpring } from '@react-spring/web';

interface NavItem {
  id: string;
  labelKey: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'path', labelKey: 'nav.tacticalPath', href: '#path' },
  { id: 'arsenal', labelKey: 'nav.theArsenal', href: '#skills' },
  { id: 'projects', labelKey: 'nav.projects', href: '#projects' },
  { id: 'tools', labelKey: 'nav.tools', href: '#tools' },
];

export const PFAppBar = () => {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeNav, setActiveNav] = React.useState('path');

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(prev => !prev);

  const handleScrollTo = (href: string, id: string) => {
    const elId = href.replace('#', '');
    const element = document.getElementById(elId);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveNav(id);
    setMobileOpen(false);
  };

  /* ─── react-spring transitions for mobile drawer ─── */
  const backdropTransition = useTransition(mobileOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  });

  const drawerSpring = useSpring({
    transform: mobileOpen ? 'translateX(0%)' : 'translateX(-100%)',
    config: { tension: 200, friction: 25 },
  });

  return (
    <header className='fixed top-0 left-0 right-0 z-50'>
      <nav
        className={cn(
          'transition-all duration-300',
          scrolled
            ? 'bg-ct-surface/60 backdrop-blur-xl shadow-[0_20px_50px_rgba(13,17,23,0.5)]'
            : 'bg-transparent backdrop-blur-none'
        )}
      >
        <div className='flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto'>
          {/* Brand — "ALGORITHMIC_ATELIER" */}
          <div
            className='cursor-pointer font-label-grotesk font-black tracking-widest text-xl text-ct-secondary uppercase'
            onClick={() => handleScrollTo('#home', 'home')}
          >
            ALGORITHMIC_ATELIER
          </div>

          {/* Desktop Nav — Architect labels */}
          <div className='hidden md:flex items-center gap-8'>
            {navItems.map(item => (
              <a
                key={item.id}
                className={cn(
                  'font-label-grotesk uppercase tracking-widest text-xs transition-colors duration-300 cursor-pointer',
                  activeNav === item.id
                    ? 'text-primary-main border-b-2 border-primary-main pb-1'
                    : 'text-ct-on-surface-variant/60 hover:text-ct-secondary'
                )}
                onClick={() => handleScrollTo(item.href, item.id)}
              >
                {t(item.labelKey)}
              </a>
            ))}
            <div className='flex items-center gap-3 ml-4'>
              <ThemeModeToggle />
              <LanguageSwitcher />
              <AuthButton />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={handleDrawerToggle}
            className='md:hidden p-2 text-ct-secondary'
            aria-label='Toggle menu'
          >
            {mobileOpen ? <X /> : <List />}
          </button>
        </div>

        {/* Bottom gradient line */}
        <div className='bg-gradient-to-r from-transparent via-ct-surface-container-highest to-transparent h-[1px] w-full' />
      </nav>

      {/* Mobile Drawer */}
      {backdropTransition((style, show) =>
        show ? (
          <animated.div
            style={style}
            onClick={handleDrawerToggle}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden'
          />
        ) : null
      )}
      {mobileOpen && (
        <animated.div
          style={drawerSpring}
          className='fixed top-0 left-0 bottom-0 w-72 z-50 md:hidden flex flex-col bg-ct-surface border-r border-ct-outline-variant/30'
        >
          <div className='p-6 flex items-center justify-between'>
            <span className='font-label-grotesk font-black text-xl text-ct-secondary uppercase'>
              ATELIER
            </span>
            <button
              onClick={handleDrawerToggle}
              className='p-2 text-ct-on-surface'
              aria-label={t('common.closeMenu')}
            >
              <X />
            </button>
          </div>
          <div className='flex-1 overflow-y-auto py-6'>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.href, item.id)}
                className={cn(
                  'w-full text-left px-8 py-4 text-xs font-label-grotesk font-medium uppercase tracking-[0.1em] transition-all',
                  activeNav === item.id
                    ? 'text-ct-secondary bg-ct-secondary/10 border-l-4 border-ct-secondary'
                    : 'text-ct-on-surface-variant/60 hover:text-ct-secondary hover:bg-ct-secondary/5'
                )}
              >
                {t(item.labelKey)}
              </button>
            ))}
          </div>
          <div className='p-6 flex justify-center gap-4'>
            <ThemeModeToggle />
            <LanguageSwitcher />
            <AuthButton />
          </div>
        </animated.div>
      )}
    </header>
  );
};
