import { PFThemeProvider } from './contexts/theme-provider';
import { ThemeModeProvider } from './contexts/theme-mode';
import { router } from './routers';
import { SplashScreen } from '@components/customs/effects/SplashScreen';
import { CustomCursor } from '@components/customs/effects/CustomCursor';
import { MouseSpotlight } from '@components/customs/effects/MouseSpotlight';
import { KonamiEasterEgg } from '@components/customs/effects/KonamiEasterEgg';
import { ErrorBoundary } from '@components/core/error-boundary/ErrorBoundary';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MotionConfig } from 'framer-motion';
import { RouterProvider } from '@tanstack/react-router';

const HtmlLangSync = () => {
  const { i18n } = useTranslation();
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  return null;
};

export const App = () => {
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion='user'>
        <ThemeModeProvider>
          <PFThemeProvider>
            <HtmlLangSync />
            <SplashScreen />
            <CustomCursor />
            <MouseSpotlight />
            <KonamiEasterEgg />
            <RouterProvider router={router} />
          </PFThemeProvider>
        </ThemeModeProvider>
      </MotionConfig>
    </ErrorBoundary>
  );
};
