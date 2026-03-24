import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@components/core/language-switcher/LanguageSwitcher';
import { ThemeModeToggle } from '@components/core/theme-toggle/ThemeModeToggle';
import { AuthButton } from '@components/core/auth';
import { cn } from '@utils/core/cn';
import { AnimatePresence, motion } from 'framer-motion';

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

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(prev => !prev);

  const handleScrollTo = (href: string) => {
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  return (
    <header className='fixed top-0 left-0 right-0 z-50'>
      <nav
        className={cn(
          'border-b border-ct-outline-variant/20 transition-all duration-300',
          scrolled
            ? 'bg-ct-surface/80 backdrop-blur-xl'
            : 'bg-transparent backdrop-blur-none'
        )}
      >
        <div className='flex justify-between items-center w-full px-8 py-4 max-w-screen-2xl mx-auto'>
          {/* Logo / Brand */}
          <div
            className='text-xl font-bold tracking-tighter text-ct-on-surface font-headline uppercase cursor-pointer'
            onClick={() => handleScrollTo('#home')}
          >
            Ky Nguyen //{' '}
            <span className='text-ct-secondary italic'>
              The Digital Alchemist
            </span>
          </div>

          {/* Desktop Nav */}
          <div className='hidden md:flex items-center gap-8 font-label-grotesk text-sm'>
            {navItems.map(item => (
              <a
                key={item.id}
                className='text-ct-on-surface/60 font-medium hover:text-ct-on-surface transition-colors cursor-pointer'
                onClick={() => handleScrollTo(item.href)}
              >
                {t(item.labelKey)}
              </a>
            ))}
            <a
              className='bg-ct-primary-container text-ct-on-primary px-6 py-2 rounded-full font-bold hover:scale-95 transition-all duration-200 cursor-pointer'
              onClick={() => handleScrollTo('#contact')}
            >
              {t('nav.initContact')}
            </a>
            <div className='flex items-center gap-2 ml-2'>
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
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleDrawerToggle}
              className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden'
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='fixed top-0 left-0 bottom-0 w-64 z-50 md:hidden flex flex-col bg-ct-surface'
            >
              <div className='p-6 flex items-center justify-between border-b border-ct-outline-variant/10'>
                <span className='font-bold text-xl text-ct-on-surface'>
                  Ky Nguyen
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
                    onClick={() => handleScrollTo(item.href)}
                    className='w-full text-left px-8 py-4 text-lg font-medium text-ct-on-surface hover:bg-ct-surface-container transition-colors'
                  >
                    {t(item.labelKey)}
                  </button>
                ))}
                <button
                  onClick={() => handleScrollTo('#contact')}
                  className='w-full text-left px-8 py-4 text-lg font-bold text-ct-primary-container'
                >
                  {t('nav.initContact')}
                </button>
              </div>
              <div className='p-6 border-t border-ct-outline-variant/10 flex justify-center gap-4'>
                <ThemeModeToggle />
                <LanguageSwitcher />
                <AuthButton />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
