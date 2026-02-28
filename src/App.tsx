import { PFThemeProvider } from './contexts/theme-provider';
import { ThemeModeProvider } from './contexts/theme-mode';
import { AppRouter } from './routers';
import { SplashScreen } from '@components/customs/effects/SplashScreen';
import { CustomCursor } from '@components/customs/effects/CustomCursor';
import { MouseSpotlight } from '@components/customs/effects/MouseSpotlight';
import { KonamiEasterEgg } from '@components/customs/effects/KonamiEasterEgg';

export const App = () => {
  return (
    <ThemeModeProvider>
      <PFThemeProvider>
        <SplashScreen />
        <CustomCursor />
        <MouseSpotlight />
        <KonamiEasterEgg />
        <AppRouter />
      </PFThemeProvider>
    </ThemeModeProvider>
  );
};
