import { FullScreenError } from '@components/pages/errors';
import { ROUTER_ERROR } from '@constants/error/routers';
import { useEffect, useMemo, useState } from 'react';
import { useRouteError } from 'react-router-dom';
import { AUTO_RELOAD_OLD_PAGE_VERSION_TIME, SECOND } from '@constants/time';

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
  const isForceReloaded = useMemo(() => true, []);

  const [counter, setCounter] = useState(AUTO_RELOAD_OLD_PAGE_VERSION_TIME);

  useEffect(() => {
    if (isDynamicImportError && !isForceReloaded) {
      const timeOut = setTimeout(() => {
        window.location.reload();
      }, AUTO_RELOAD_OLD_PAGE_VERSION_TIME);
      const timeInterval = setInterval(() => {
        setCounter(currentTime => (currentTime > 0 ? currentTime - SECOND : 0));
      }, SECOND);
      return () => {
        clearTimeout(timeOut);
        clearInterval(timeInterval);
      };
    }
    return () => undefined;
  }, [isDynamicImportError, isForceReloaded]);

  const description = useMemo(() => {
    const currentCounter = counter / SECOND;
    if (isForceReloaded) {
      return 'Please try again';
    }
    return `We will update you to the new version in <strong>${currentCounter}</strong> ${
      currentCounter > 1 ? 'seconds' : 'second'
    }...`;
  }, [counter, isForceReloaded]);

  return (
    <FullScreenError
      title={
        isDynamicImportError
          ? 'New version is now available.'
          : 'Can not load this page'
      }
      description={isDynamicImportError ? description : undefined}
      buttonText='Reload'
      onClick={isForceReloaded ? () => window.location.reload() : undefined}
    />
  );
};
