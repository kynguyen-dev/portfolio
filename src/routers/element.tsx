import { ReactNode } from 'react';
import { Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';

interface RootRouterElementProps {
  children?: ReactNode;
}
export const RootRouterElement = ({ children }: RootRouterElementProps) => {
  const location = useLocation();

  return (
    <>
      {children}
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
    </>
  );
};
