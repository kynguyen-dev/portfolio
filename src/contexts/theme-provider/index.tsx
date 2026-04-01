import { ReactNode } from 'react';

/**
 * Theme provider — MUI has been removed.
 * Theme mode is now handled purely through CSS/Tailwind tokens in index.css.
 */
export const PFThemeProvider = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);
