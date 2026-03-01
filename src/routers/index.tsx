import { FullScreenLoading } from '@components/pages/loadings';
import { ROUTES } from '@constants/router';
import loadable from '@loadable/component';
import { ComponentType } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RootRouterError } from '@routers/error';
import { RootRouterElement } from '@routers/element';

const Home = loadable(() => import('@pages/Home')) as ComponentType;
const NotFound = loadable(() => import('@pages/NotFound')) as ComponentType;

export const appRoute = createBrowserRouter(
  [
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
  ],
  {
    basename: import.meta.env.BASE_URL.replace(/\/+$/, ''),
  }
);

export const AppRouter = () => (
  <RouterProvider router={appRoute} fallbackElement={<FullScreenLoading />} />
);
