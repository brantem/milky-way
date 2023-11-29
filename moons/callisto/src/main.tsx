import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import Callisto from './Callisto';

const App = () => {
  const [files, setFiles] = useState<Record<string, any>>({
    'callisto-1.json': {
      key: 'callisto-1.json',
      body: JSON.stringify({
        answers: [
          { blankId: '__1__', choiceId: '1' },
          { blankId: '__2__', choiceId: '2' },
          { blankId: '__3__', choiceId: '3' },
        ],
      }),
    },
    'callisto-2.json': {
      key: 'callisto-2.json',
      body: JSON.stringify({
        answers: [
          { blankId: '__1__', choiceId: '1' },
          { blankId: '__2__', choiceId: '2' },
          { blankId: '__3__', choiceId: '3' },
          { blankId: '__4__', choiceId: '4' },
        ],
      }),
    },
  });

  return (
    <Callisto
      width={1024}
      height={768}
      parent={{
        id: 'aXjyt3QFH51MWJ4c7WSmS',
        request(_, keys) {
          return keys.map((key) => files[key] || null);
        },
      }}
      id="aXjyt3QFH51MWJ4c7WSmS"
      data={{
        initial: {
          file: 'callisto-1.json',
        },
        output: {
          file: 'callisto-2.json',
        },
        text: 'The __1__ dog quickly dashed across the __2__, chasing its bouncing __3__. Its owner, laughing, picked up their pace to keep an eye on the lively pet. Enjoying a sunny __4__ afternoon, they continued their enjoyable __5__ in the park.',
        choices: {
          items: [
            { id: '1', text: 'chihuahua' },
            { id: '2', text: 'backyard' },
            { id: '3', text: 'ball' },
            { id: '4', text: 'spring' },
            { id: '5', text: 'walk' },
            { id: '6', text: 'grandfather' },
          ],
          shuffle: true,
        },
      }}
      onChange={(files, points) => {
        console.log(files, points);
        setFiles((prev) => ({
          ...prev,
          ...files.reduce((obj, file) => ({ ...obj, [file.key]: file }), {} as Record<string, any>),
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
