import './index.css';

import { ConfigProvider, ThemeConfig } from 'antd';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App';

const config: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
  },
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <ConfigProvider theme={config}>
      <App />
    </ConfigProvider>
  </HashRouter>,
);
