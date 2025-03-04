import { mainTheme } from '@assets/themes';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';

export const PFThemeProvider = ({
  children,
  ...props
}: Partial<ThemeProviderProps>) => (
  <ThemeProvider {...props} theme={mainTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
