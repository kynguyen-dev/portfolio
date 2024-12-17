import { PFThemeProvider } from './contexts/theme-provider';
import { AppRouter } from './routers';

export const App = () => {
  return (
    <PFThemeProvider>
      <AppRouter />
    </PFThemeProvider>
  );
};
