import { createRoot } from 'react-dom/client';
import App from './App';

import './connectShareDB';

createRoot(document.querySelector('#root')).render(<App />);
