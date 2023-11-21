import React from 'react';
import ReactDOM from 'react-dom/client';

import Ganymede from './Ganymede';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Ganymede
      // width={1024}
      // height={768}
      files={[
        {
          key: 'tests.json',
          body: JSON.stringify([
            {
              text: 'Draw a square with any color',
              data: { label: 'square' },
            },
            {
              text: 'Draw a triangle with [](color://#ef4444)',
              data: { label: 'triangle', color: '#ef4444' },
            },
          ]),
        },
      ]}
      data={{
        tests: {
          file: 'tests.json',
        },
        // model: {
        //   type: 'onnx',
        //   urls: {
        //     modelUrl: 'https://raw.githubusercontent.com/brantem/adudu/master/mnist/mnist-12.onnx',
        //   },
        //   input: {
        //     width: 28,
        //     height: 28,
        //   },
        // },
        model: {
          type: 'teachable_machine',
          urls: {
            baseUrl: 'https://raw.githubusercontent.com/brantem/adudu/master/shapes',
          },
          input: {
            width: 96,
            height: 96,
            background: '#fff',
          },
          probability: {
            min: 90,
            max: 100,
          },
        },
      }}
      onChange={(files, points) => console.log(files, points)}
      debug
    />
  </React.StrictMode>,
);
