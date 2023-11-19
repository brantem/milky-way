import React from 'react';
import ReactDOM from 'react-dom/client';

import Io from './Io';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Io
      width={1024}
      height={768}
      data={{
        left: {
          items: [
            { id: '1', text: 'Square' },
            { id: '2', text: 'Japan' },
            { id: '3', text: 'Mars' },
            { id: '4', text: 'Leonardo da Vinci' },
            { id: '5', text: 'Broccoli' },
          ],
          shuffle: true,
        },
        right: {
          items: [
            { id: '1', text: 'Four equal sides' },
            { id: '2', text: 'Tokyo' },
            { id: '3', text: 'Phobos' },
            { id: '4', text: 'Mona Lisa' },
            { id: '5', text: 'Vegetable' },
          ],
        },
      }}
      onChange={(data, points) => console.log(data, points)}
    />
  </React.StrictMode>,
);
