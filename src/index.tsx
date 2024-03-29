import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/layout/App';
import { StoreContext, store } from './app/api/stores/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
    <App />
    </StoreContext.Provider>
  </React.StrictMode>,
)

