import { FullScreenError } from '@components/pages/errors';
import { ROUTER_ERROR } from '@constants/error/routers';
import { useMemo } from 'react';
import { useRouteError } from 'react-router-dom';

/**
 * This function to handle error actions when errors occur while loading some APIs,
 * allowing us to retry the API loading
 */
export const RootRouterError = () => {
  const error = useRouteError();
  const isDynamicImportError = useMemo(
    () =>
      error instanceof TypeError &&
      error.message.includes(ROUTER_ERROR.DYNAMIC_IMPORT),
    [error]
  );

  return (
    <FullScreenError
      title={
        isDynamicImportError
          ? 'New version is now available.'
          : 'Can not load this page'
      }
      description={isDynamicImportError ? 'Please try again' : undefined}
      buttonText='Reload'
      onClick={() => window.location.reload()}
    />
  );
};
