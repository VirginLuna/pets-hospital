/*
 * @Author: Luna
 * @Date: 2023-11-21 10:04:50
 * @Description: 路由表配置
 */

import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Home from '@/pages/Home';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import useLoginStore from '@/store/user';

interface Route {
  path: string;
  name: string;
  element: ReactNode;
  children?: Route[];
  auth?: boolean;
}

export const routes: Route[] = [
  {
    path: '/main',
    element: <Index />,
    name: 'main',
    auth: true,
    children: [
      {
        path: 'home1',
        name: 'home1',
        auth: true,
        element: <Home />,
      },
      {
        path: 'home2',
        name: 'home2',
        auth: true,
        element: <Home />,
      },
      {
        path: 'home3',
        name: 'home3',
        auth: true,
        element: <Home />,
      },
      {
        path: 'home4',
        name: 'home4',
        auth: true,
        element: <Home />,
      },
      {
        path: 'home5',
        name: 'home5',
        auth: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/',
    name: '/',
    auth: false,
    element: <Login />,
  },
  {
    path: '*',
    name: '*',
    auth: false,
    element: <NotFound />,
  },
];

const getCurrentRouterMap = (routers: any, path: string): Route => {
  for (const router of routers) {
    if (router.path == path) return router;
    if (router.child) {
      const childRouter = getCurrentRouterMap(router.child, path);
      if (childRouter) return childRouter;
    }
  }
  return routes[routes.length - 1];
};

export const RouterBeforeEach = ({ children }: any) => {
  const location = useLocation();
  const navigator = useNavigate();
  const isLogin = useLoginStore((state: any) => state.isLogin);
  useEffect(() => {
    const router = getCurrentRouterMap(routes, location.pathname);
    if (!isLogin && router.auth) {
      navigator('/');
    }
  }, [location.pathname]);
  return children;
};
