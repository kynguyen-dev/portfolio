import { FullScreenLoading } from '@components/pages/loadings';
import { ROUTES } from '@constants/router';
import loadable from '@loadable/component';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootRouterError } from '@routers/error';
import { RootRouterElement } from '@routers/element';

const Home = loadable(() => import('@pages/Home'));
const NotFound = loadable(() => import('@pages/NotFound'));

export const appRoute = createBrowserRouter([
  {
    errorElement: <RootRouterError />,
    element: <RootRouterElement />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
]);

export const AppRouter = () => (
  <RouterProvider router={appRoute} fallbackElement={<FullScreenLoading />} />
);
