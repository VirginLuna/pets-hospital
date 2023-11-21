/*
 * @Author: Luna
 * @Date: 2023-11-21 10:04:50
 * @Description: 路由表配置
 */

import Home from '@/pages/Home';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';

export default [
  {
    path: '/main',
    element: <Index />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
    ],
  },
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
