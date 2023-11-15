import type { To } from 'history';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Redirect = To | (() => To);

interface MiddlewareLoginRequired {
  name: 'login'; // 要求登录
  role?: string; // 角色
  redirect?: Redirect; // 如果不满足，则重定向的地址
}

interface MiddlewareAnonymousRequired {
  name: 'anonymous'; // 要求未登录
  role?: string; // 角色
  redirect?: Redirect; // 如果不满足，则重定向的地址
}

interface PageProps extends PropsWithChildren {
  type: MiddlewareLoginRequired | MiddlewareAnonymousRequired;

  // 正在加载中，显示的 Loading
  loading?: React.ReactNode;
}

export default function Middleware(props: PageProps) {
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = false; // 假设已经登录

    const redirect = props.type.redirect;

    switch (props.type.name) {
      case 'login':
        if (isLogin) {
          setReady(true);
        } else if (redirect) {
          if (typeof redirect === 'function') {
            navigate(redirect());
          } else {
            navigate(redirect);
          }
        } else {
          navigate('/');
        }
        break;
      case 'anonymous':
        if (!isLogin) {
          setReady(true);
        } else if (redirect) {
          if (typeof redirect === 'function') {
            navigate(redirect());
          } else {
            navigate(redirect);
          }
        } else {
          navigate('/');
        }
        break;
    }
  }, []);

  if (!ready) {
    return null;
  }

  return <>{props.children}</>;
}
