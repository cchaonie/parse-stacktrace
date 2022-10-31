import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './models/core/initializeShareDBDocument';

createRoot(document.querySelector('#root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
