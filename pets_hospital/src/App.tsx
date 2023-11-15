import './App.css';

import CssBaseline from '@mui/material/CssBaseline';
import { Suspense } from 'react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Middleware from './components/Middleware';
import Theme from './components/Theme';
import { themeStore } from './store/theme';

const Index = React.lazy(() => import('./pages/Index'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Login = React.lazy(() => import('./pages/Login'));

function App() {
  const theme = themeStore((state) => state.theme);
  const colorScheme = themeStore((state) => state.scheme);

  return (
    <Theme name={theme} scheme={colorScheme}>
      <CssBaseline />
      <div className='App'>
        <Routes>
          <Route
            path='/main'
            element={
              <Suspense>
                {/* <Middleware type={{ name: 'anonymous' }}>
                </Middleware> */}
                <Index></Index>
              </Suspense>
            }
          ></Route>

          <Route
            path='*'
            element={
              <Middleware type={{ name: 'login' }}>
                <NotFound></NotFound>
              </Middleware>
            }
          />
          <Route
            path='/'
            element={
              <Middleware type={{ name: 'anonymous' }}>
                <Login />
              </Middleware>
            }
          />
        </Routes>
      </div>
    </Theme>
  );
}

export default App;
