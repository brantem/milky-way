import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';

import Deimos, { type DeimosHandle } from './Deimos';

import { Action, type File } from './lib/types';

const files: Record<string, File> = {
  'tasks.json': {
    key: 'tasks.json',
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
        text: 'Lorem *ullamco* Lorem ea. [](color://#0891b2)',
      },
    ]),
  },
  'deimos.json': {
    key: 'deimos.json',
    body: JSON.stringify([
      {
        a: 1,
        b: 1,
      },
      {
        a: 1,
        b: 1,
      },
      null,
      null,
    ]),
  },
};

const App = () => {
  const deimosRef = useRef<DeimosHandle>(null);

  return (
    <>
      <button onClick={() => deimosRef.current?.execute(Action.Refresh)}>refresh</button>

      <Deimos
        ref={deimosRef}
        width={400}
        height={400}
        parent={{
          id: 'aXjyt3QFH51MWJ4c7WSmS',
          async request(_, keys) {
            return Promise.resolve(keys.map((key) => files[key] || null));
          },
        }}
        id="aXjyt3QFH51MWJ4c7WSmS"
        data={{
          tasks: {
            file: 'tasks.json',
            output: 'deimos.json',
          },
        }}
        onPublish={(action, data) => console.log(action, data)}
      />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
