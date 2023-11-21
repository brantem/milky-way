import React from 'react';
import ReactDOM from 'react-dom/client';

import Callisto from './Callisto';

const data = [
  {
    text: 'The __1__ dog quickly dashed across the __2__, chasing its bouncing __3__. Its owner, laughing, picked up their pace to keep an eye on the lively pet. Enjoying a sunny __4__ afternoon, they continued their enjoyable __5__ in the park.',
    choices: [
      { id: '1', text: 'chihuahua' },
      { id: '2', text: 'backyard' },
      { id: '3', text: 'ball' },
      { id: '4', text: 'spring' },
      { id: '5', text: 'walk' },
      { id: '6', text: 'grandfather' },
    ],
  },
  {
    text: 'The young boy __1__ in astonishment as the __2__ flew overhead. It was his first time at the __3__, and he could not hide his excitement. He skipped ahead, his __4__ jumping in rhythm with his steps. From this day onwards, his __5__ was clear - he wanted to become a pilot.',
    choices: [
      { id: '1', text: 'laughed' },
      { id: '2', text: 'airplane' },
      { id: '3', text: 'airport' },
      { id: '4', text: 'heart' },
      { id: '5', text: 'dream' },
      { id: '6', text: 'table' },
    ],
  },
];

const item = data[Math.floor(Math.random() * data.length)];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Callisto
      width={1024}
      height={768}
      data={{
        text: item.text,
        choices: {
          items: item.choices,
          shuffle: true,
        },
      }}
      onChange={(files, points) => console.log(files, points)}
    />
  </React.StrictMode>,
);
