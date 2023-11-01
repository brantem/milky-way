import React from 'react';
import ReactDOM from 'react-dom/client';

import Europa from './Europa';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Europa width={1024} height={768} />
  </React.StrictMode>,
);
