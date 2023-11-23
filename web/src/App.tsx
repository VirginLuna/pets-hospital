import './App.css';

import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { RouterBeforeEach, routes } from './route';

function App() {
  const element = useRoutes(routes);
  return (
    <div className='App'>
      <Suspense>
        <RouterBeforeEach>{element}</RouterBeforeEach>
      </Suspense>
    </div>
  );
}

export default App;
