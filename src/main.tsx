import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import './index.css';
import { App } from './App';
import { Auth0ProviderWithConfig } from './contexts/auth0';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0ProviderWithConfig>
      <App />
    </Auth0ProviderWithConfig>
  </React.StrictMode>
);
