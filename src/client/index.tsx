import { createRoot } from 'react-dom/client';
import App from './App';

import './models/shareDBDocument';

createRoot(document.querySelector('#root')).render(<App />);
