import { lazy, useEffect, useState, useRef } from 'react';
import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import { useTransition, animated } from '@react-spring/web';
import { FullScreenLoading } from '@components/pages/loadings';

/* ─── Root layout with animated page transitions ─── */
const RootLayout = () => {
  const { location } = useRouterState();
  const [currentKey, setCurrentKey] = useState(location.pathname);
  const prevKeyRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevKeyRef.current) {
      prevKeyRef.current = location.pathname;
      setCurrentKey(location.pathname);
    }
  }, [location.pathname]);

  const transitions = useTransition(currentKey, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 },
  });

  return (
    <>
      {transitions((style, key) =>
        key === currentKey ? (
          <animated.div key={key} style={style}>
            <Outlet />
          </animated.div>
        ) : null
      )}
    </>
  );
};

/* ─── Root route ─── */
const rootRoute = createRootRoute({
  component: RootLayout,
  pendingComponent: FullScreenLoading,
});

/* ─── Lazy page imports ─── */
const HomePage = lazy(() => import('@pages/Home'));
const NotFoundPage = lazy(() => import('@pages/NotFound'));

const GalleryPage = lazy(() => import('@pages/tools/Gallery'));
const ThreeKingdomsPage = lazy(() => import('@pages/tools/ThreeKingdoms'));
const AiSqlHelperPage = lazy(() => import('@pages/tools/AiSqlHelper'));
const MarketInsightsPage = lazy(() => import('@pages/tools/MarketInsights'));
const NewsListPage = lazy(() => import('@pages/tools/NewsList'));

/* ─── Route definitions ─── */
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/gallery',
  component: GalleryPage,
});

const threeKingdomsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/three-kingdoms',
  component: ThreeKingdomsPage,
});

const aiSqlHelperRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/ai-sql-helper',
  component: AiSqlHelperPage,
});

const marketInsightsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/market-insights',
  component: MarketInsightsPage,
});

const newsListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/market-insights/news',
  component: NewsListPage,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFoundPage,
});

/* ─── Route tree & router ─── */
const routeTree = rootRoute.addChildren([
  homeRoute,

  galleryRoute,
  threeKingdomsRoute,
  aiSqlHelperRoute,
  marketInsightsRoute,
  newsListRoute,
  notFoundRoute,
]);

export const router = createRouter({
  routeTree,
  defaultPendingComponent: FullScreenLoading,
});

/* ─── Type safety ─── */
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
