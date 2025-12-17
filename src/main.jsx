import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {library} from '@fortawesome/fontawesome-svg-core';
import App from './App.jsx';
import { faSpinner} from '@fortawesome/free-solid-svg-icons';

library.add(faSpinner)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
