import './index.css';

import { zhCN } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { HashRouter } from 'react-router-dom';

import App from './App';
import i18n from './lib/i18n';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#007FFF' },
    },
  },
  zhCN,
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </I18nextProvider>
  </HashRouter>,
);
