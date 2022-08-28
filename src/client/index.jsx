import { createRoot } from 'react-dom/client';
import App from './application';

import './connectShareDB';

createRoot(document.querySelector('#root')).render(<App />);
