import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import Io from './Io';

import { File } from './lib/types';

const App = () => {
  const [files, setFiles] = useState<Record<string, File>>({
    'io-1.json': {
      key: 'io-1.json',
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
  });

  return (
    <Io
      width={1024}
      height={768}
      id="aXjyt3QFH51MWJ4c7WSmS"
      parent={{
        id: 'aXjyt3QFH51MWJ4c7WSmS',
        async request(_, keys) {
          return Promise.resolve(keys.map((key) => files[key] || null));
        },
      }}
      data={{
        initial: {
          file: 'io-1.json',
        },
        output: {
          file: 'io-2.json',
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
      onChange={(files, points) => {
        console.log(files, points);
        setFiles((prev) => ({
          ...prev,
          ...files.reduce((obj, file) => ({ ...obj, [file.key]: file }), {} as Record<string, File>),
        }));
      }}
    />
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
