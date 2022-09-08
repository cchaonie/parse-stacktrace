import { createRoot } from 'react-dom/client';
import App from './App';

import './models/initializeShareDBDocument';

createRoot(document.querySelector('#root')).render(<App />);
