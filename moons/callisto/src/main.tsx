import React from 'react';
import ReactDOM from 'react-dom/client';

import Callisto from './Callisto';

const data = [
  {
    text: "Every morning, I like to start my day with a healthy __1__. I usually have a bowl of __2__ topped with fresh __3__, a sprinkle of __4__, and a drizzle of __5__. It's the perfect way to energize myself for the day ahead.",
    choices: [
      { id: '1', text: 'breakfast' }, //__1__
      { id: '2', text: 'oatmeal' }, // __2__
      { id: '3', text: 'strawberries' }, // __3__
      { id: '4', text: 'honey' }, // __4__
      { id: '5', text: 'milk' }, // __5__
      { id: '6', text: 'coal' },
    ],
  },
  {
    text: 'The __1__ dog quickly dashed across the __2__, chasing its bouncing __3__. Its owner, laughing, picked up their pace to keep an eye on the lively pet. Enjoying a sunny __4__ afternoon, they continued their enjoyable __5__ in the park.',
    choices: [
      { id: '1', text: 'chihuahua' }, //__1__
      { id: '2', text: 'backyard' }, // __2__
      { id: '3', text: 'ball' }, // __3__
      { id: '4', text: 'spring' }, // __4__
      { id: '5', text: 'walk' }, // __5__
      { id: '6', text: 'grandfather' },
    ],
  },
  {
    text: 'The young boy __1__ in astonishment as the __2__ flew overhead. It was his first time at the __3__, and he could not hide his excitement. He skipped ahead, his __4__ jumping in rhythm with his steps. From this day onwards, his __5__ was clear - he wanted to become a pilot.',
    choices: [
      { id: '1', text: 'laughed' }, //__1__
      { id: '2', text: 'airplane' }, // __2__
      { id: '3', text: 'airport' }, // __3__
      { id: '4', text: 'heart' }, // __4__
      { id: '5', text: 'dream' }, // __5__
      { id: '6', text: 'table' },
    ],
  },
];

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

const item = data[Math.floor(Math.random() * data.length)];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Callisto width={1024} height={768} text={item.text} choices={shuffle(item.choices)} />
  </React.StrictMode>,
);
