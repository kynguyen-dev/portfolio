import { ReactNode } from 'react';
import { Outlet } from 'react-router';

interface RootRouterElementProps {
  children?: ReactNode;
}
export const RootRouterElement = ({ children }: RootRouterElementProps) => {
  return (
    <>
      {children}
      <Outlet />
    </>
  );
};
