import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';

import Deimos, { type DeimosHandle } from './Deimos';

import { Action } from './lib/types';

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
          request(_, keys) {
            switch (keys[0]) {
              case 'tasks.json':
                return [
                  {
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
                ];
              case 'deimos.json':
                return [
                  {
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
                ];
            }
            return [];
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
