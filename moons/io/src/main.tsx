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
      data={{
        left: shuffle([
          { id: '1', text: 'Square' },
          { id: '2', text: 'Japan' },
          { id: '3', text: 'Mars' },
          { id: '4', text: 'Leonardo da Vinci' },
          { id: '5', text: 'Broccoli' },
        ]),
        right: shuffle([
          { id: '1', text: 'Four equal sides' },
          { id: '2', text: 'Tokyo' },
          { id: '3', text: 'Phobos' },
          { id: '4', text: 'Mona Lisa' },
          { id: '5', text: 'Vegetable' },
        ]),
      }}
      onChange={(data, points) => console.log(data, points)}
    />
  </React.StrictMode>,
);
