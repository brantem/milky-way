import React from 'react';
import ReactDOM from 'react-dom/client';

import Io from './Io';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Io
      width={1024}
      height={768}
      parent={{
        id: 'parent-1',
        request() {
          return [
            {
              key: 'io.json',
              body: JSON.stringify({
                leftIds: ['3', '4', '2', '1', '5'],
                rightIds: ['2', '5', '3', '1', '4'],
                lines: [
                  {
                    a: 'left-3',
                    b: 'right-3',
                  },
                ],
              }),
            },
          ];
        },
      }}
      data={{
        initial: {
          file: 'io.json',
        },
        output: {
          file: 'io.json',
        },
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
          shuffle: true,
        },
      }}
      onChange={(files, points) => console.log(files, points)}
    />
  </React.StrictMode>,
);
