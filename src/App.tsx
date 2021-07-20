import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import GlobalStyle from './styles/global';
import Interceptor from './Interceptor';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <CookiesProvider>
      <AppProvider>
        <Interceptor />

        <Routes />
      </AppProvider>
    </CookiesProvider>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
