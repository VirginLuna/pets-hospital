import './App.css';

import { useRoutes } from 'react-router-dom';

import route from './route';

function App() {
  const element = useRoutes(route);
  return <div className='App'>{element}</div>;
}

export default App;
