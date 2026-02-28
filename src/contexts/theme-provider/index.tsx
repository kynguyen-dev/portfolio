import { getThemeByMode } from '@assets/themes';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import { useThemeMode } from '@contexts/theme-mode';

export const PFThemeProvider = ({
  children,
  ...props
}: Partial<ThemeProviderProps>) => {
  const { mode } = useThemeMode();

  return (
    <ThemeProvider {...props} theme={getThemeByMode(mode)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
