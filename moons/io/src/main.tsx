import React from 'react';
import ReactDOM from 'react-dom/client';

import Io from './Io';

const shuffle = <T,>(a: T[]): T[] => {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = b[i];
    b[i] = b[j];
    b[j] = temp;
  }
  return b;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Io
      width={1024}
      height={768}
      left={shuffle(['Square', 'Japan', 'Mars', 'Leonardo da Vinci', 'Broccoli'])}
      right={shuffle(['Four equal sides', 'Tokyo', 'Phobos', 'Mona Lisa', 'Vegetable'])}
    />
  </React.StrictMode>,
);
