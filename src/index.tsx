import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import {ThemeProvider} from './hooks/Theme';
import { AuthProvider } from './hooks/Auth';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


