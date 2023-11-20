import React from 'react';
import ReactDOM from 'react-dom/client';

import Deimos from './Deimos';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Deimos
      width={400}
      height={400}
      files={[
        {
          key: 'items.json',
          body: JSON.stringify([
            {
              text: 'Exercitation ad dolore anim duis pariatur ipsum aute do nostrud irure eiusmod est mollit aute officia.\n\n```\nconst a = 1;\n```',
              data: {
                a: 1,
              },
            },
            {
              text: '```\nconst a = 1;\n```\n\nIpsum dolore ullamco eiusmod officia in aute fugiat nisi excepteur cupidatat elit aliqua laboris.',
              data: {
                a: 1,
                b: 2,
              },
            },
            {
              text: 'Exercitation velit irure `excepteur` enim aliquip eiusmod veniam do sint **ipsum** pariatur commodo irureesse do.',
              data: {
                a: 1,
              },
            },
            {
              text: 'Lorem *ullamco* Lorem ea.',
            },
          ]),
        },
        {
          key: 'outputs/deimos.json',
          body: JSON.stringify([
            {
              a: 1,
            },
            {
              a: 1,
              b: 1,
            },
            null,
            null,
          ]),
        },
      ]}
      data={{
        file: 'items.json',
      }}
    />
  </React.StrictMode>,
);
