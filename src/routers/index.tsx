import { lazy } from 'react';
import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
  useRouterState,
} from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { FullScreenLoading } from '@components/pages/loadings';

/* ─── Root layout with animated page transitions ─── */
const RootLayout = () => {
  const { location } = useRouterState();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
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
