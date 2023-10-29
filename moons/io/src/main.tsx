import React from 'react';
import ReactDOM from 'react-dom/client';

import Io from './Io';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Io width={1024} height={768} left={['A', 'B', 'C', 'D']} right={['C', 'A', 'D', 'B']} />
  </React.StrictMode>,
);
