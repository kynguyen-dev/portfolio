import * as React from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@components/core/language-switcher/LanguageSwitcher';
import { ThemeModeToggle } from '@components/core/theme-toggle/ThemeModeToggle';
import { AuthButton } from '@components/core/auth';
import { APP_PAGES } from '@constants';
import { useThemeMode } from '@contexts/theme-mode';
import { cn } from '@utils/core/cn';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
  APP_PAGES.HOME,
  APP_PAGES.PROFILE,
  APP_PAGES.SKILLS,
  APP_PAGES.PROJECTS,
  APP_PAGES.TOOLS,
  APP_PAGES.CONTACT,
];

/* Map page enum to i18n key */
const navI18nMap: Record<string, string> = {
  [APP_PAGES.HOME]: 'nav.home',
  [APP_PAGES.PROFILE]: 'nav.profile',
  [APP_PAGES.SKILLS]: 'nav.skills',
  [APP_PAGES.PROJECTS]: 'nav.projects',
  [APP_PAGES.TOOLS]: 'nav.tools',
  [APP_PAGES.CONTACT]: 'nav.contact',
};

export const PFAppBar = () => {
  const { t } = useTranslation();
  const { mode } = useThemeMode();
  const isLight = mode === 'light';
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>(
    APP_PAGES.HOME.toLowerCase()
  );

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

  return (
    <header className='fixed top-0 left-0 right-0 z-50'>
      <nav
        className={cn(
          'px-4 md:px-[10%] lg:px-[20%] py-3 backdrop-blur-xl transition-all duration-300 border-b',
          isLight
            ? 'bg-white/80 border-black/5 shadow-sm'
            : 'bg-background-default/70 border-white/5 shadow-2xl'
        )}
      >
        <div className='flex items-center justify-between h-14'>
          {/* Mobile Menu Toggle */}
          <button
            onClick={handleDrawerToggle}
            className='sm:hidden p-2 -ml-2 text-text-primary'
            aria-label='Toggle menu'
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>

          {/* Logo */}
          <div className='flex-grow sm:flex-grow-0'>
            <img
              src='/icons/dashboard-icon.png'
              alt='Ky Nguyen Logo'
              className='h-10 cursor-pointer hover:scale-105 transition-transform'
              onClick={() => handleScrollTo(APP_PAGES.HOME)}
            />
          </div>

          {/* Desktop Nav */}
          <div className='hidden sm:flex items-center gap-1 md:gap-4'>
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => handleScrollTo(item)}
                className={cn(
                  'px-3 py-2 text-sm font-medium transition-all relative group',
                  activeSection === item.toLowerCase()
                    ? 'text-primary-main'
                    : 'text-text-primary hover:text-primary-light'
                )}
              >
                {t(navI18nMap[item])}
                {activeSection === item.toLowerCase() && (
                  <motion.div
                    layoutId='nav-underline'
                    className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary-main'
                  />
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className='hidden sm:flex items-center gap-2 ml-4'>
            <ThemeModeToggle />
            <LanguageSwitcher />
            <AuthButton />
          </div>

          {/* Mobile Right Actions (always visible) */}
          <div className='flex sm:hidden items-center gap-2'>
            <ThemeModeToggle />
            <AuthButton />
          </div>
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
              className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40 sm:hidden'
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cn(
                'fixed top-0 left-0 bottom-0 w-64 z-50 sm:hidden flex flex-col',
                isLight ? 'bg-white' : 'bg-background-paper'
              )}
            >
              <div className='p-6 flex items-center justify-between border-b border-white/5'>
                <span className='font-bold text-xl'>Ky Nguyen</span>
                <button onClick={handleDrawerToggle} className='p-2'>
                  <X />
                </button>
              </div>
              <div className='flex-1 overflow-y-auto py-6'>
                {navItems.map(item => (
                  <button
                    key={item}
                    onClick={() => handleScrollTo(item)}
                    className={cn(
                      'w-full text-left px-8 py-4 text-lg font-medium transition-colors',
                      activeSection === item.toLowerCase()
                        ? 'bg-primary-main/10 text-primary-main border-l-4 border-primary-main'
                        : 'text-text-primary hover:bg-white/5'
                    )}
                  >
                    {t(navI18nMap[item])}
                  </button>
                ))}
              </div>
              <div className='p-6 border-t border-white/5 flex justify-center gap-4'>
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
