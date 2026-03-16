import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';

interface Auth0ProviderWithConfigProps {
  children: ReactNode;
}

/**
 * Wraps the app with Auth0Provider, reading domain & clientId
 * from Vite environment variables.
 *
 * The redirect_uri is set to the current origin so Auth0
 * redirects back to the same page after login.
 */
export const Auth0ProviderWithConfig = ({
  children,
}: Auth0ProviderWithConfigProps) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

  if (!domain || !clientId) {
    console.warn(
      'Auth0: Missing VITE_AUTH0_DOMAIN or VITE_AUTH0_CLIENT_ID in .env — auth is disabled.'
    );
    return <>{children}</>;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation='localstorage'
      useRefreshTokens
    >
      {children}
    </Auth0Provider>
  );
};
