import { ReactNode } from 'react';

/**
 * @deprecated Auth0 has been removed. This is a no-op wrapper for backward compat.
 */
export const Auth0ProviderWithConfig = ({
  children,
}: {
  children: ReactNode;
}) => <>{children}</>;
