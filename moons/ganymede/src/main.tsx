import React from 'react';
import ReactDOM from 'react-dom/client';

import Ganymede from './Ganymede';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Ganymede
      width={1024}
      height={768}
      data={{
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
        },
        tests: [
          {
            label: 'square',
          },
          {
            label: 'triangle',
            color: '#ef4444',
          },
        ],
      }}
      onChange={(data, points) => console.log(data, points)}
    />
  </React.StrictMode>,
);
