import React from 'react';
import ReactDOM from 'react-dom/client';

import Ganymede from './Ganymede';

import { File } from './lib/types';

const files: Record<string, File> = {
  'tests.json': {
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
  'ganymede.json': {
    key: 'ganymede.json',
    body: JSON.stringify({
      color: '#000',
      paths: [
        {
          id: 'aXjyt3QFH51MWJ4c7WSmS-MjC6si9Glgq6BTGrMuRiQ',
          color: '#000',
          d: 'M534.90,312.81 Q531.52,349.87 529.68,368.89 T526.51,403.23 524.10,431.63 522.18,455.31 520.80,474.63 519.56,491.82 517.11,513.11 513.43,535.90 500.43,545.82 500.59,538.46 524.68,526.57 554.78,518.13 587.24,511.67 625.76,507.97 673.26,506.56 722.97,507.29 773.22,510.44 820.64,515.07 863.05,520.36 896.53,524.95 919.78,527.70 938.74,529.22 939.96,521.10 928.72,498.71 923.96,476.34 920.82,457.96 918.17,438.47 915.78,418.82 913.67,399.34 912.07,380.12 910.52,358.82 909.11,336.35 916.68,327.12 916.45,329.15 891.74,329.57 865.80,329.01 840.46,326.49 806.96,322.25 768.56,317.99 725.16,313.50 676.67,308.95 624.99,305.43 582.06,303.43 547.19,302.18 515.70,301.33 492.23,301.16 470.75,301.38 455.14,301.39 449.39,300.73 446.01,299.16 443.31,296.59 441.57,293.29 440.98,289.62 441.59,285.94 443.34,282.65 446.06,280.10 449.44,278.54 453.14,278.15 456.78,278.96 459.97,280.89 462.37,283.73 463.74,287.19 463.94,290.92 462.93,294.50 460.83,297.58 457.86,299.83 454.33,301.01 450.60,301.00 447.08,299.80 444.12,297.54 442.03,294.45 441.05,290.86 441.26,287.14 442.64,283.68 445.06,280.85 448.26,278.94 451.90,278.14 453.78,278.05 457.11,278.37 471.81,280.04 492.90,282.21 516.23,283.64 547.67,284.64 582.70,285.32 626.08,286.52 678.24,288.96 726.85,291.98 770.29,294.34 808.79,295.68 841.85,296.06 866.52,296.10 885.04,296.13 907.70,295.91 930.09,300.82 939.60,315.57 940.02,335.45 940.07,357.14 940.84,377.78 942.31,396.21 944.42,415.27 946.85,434.55 949.40,453.16 953.47,478.01 958.48,507.37 961.40,530.65 953.77,546.27 935.95,550.19 917.06,546.37 894.08,542.37 860.99,537.68 819.02,532.98 772.24,529.14 722.99,527.06 674.34,527.73 628.94,530.89 593.25,536.32 563.92,545.02 538.05,554.98 518.97,564.18 502.12,571.10 486.73,564.46 481.67,547.35 486.40,529.95 491.81,509.07 495.73,489.26 498.14,472.33 500.66,453.24 503.19,430.03 505.07,401.82 506.43,367.58 507.18,330.09 507.55,309.84 508.49,306.67 510.17,303.82 512.48,301.45 515.29,299.70 518.44,298.67 521.74,298.43 525.00,298.99 528.04,300.31 530.67,302.32 532.74,304.90 534.14,307.90 534.78,311.15 ',
          prediction: {
            label: 'square',
            probability: 0.9995145797729492,
          },
        },
      ],
      n: 0,
    }),
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Ganymede
      // width={1024}
      // height={768}
      parent={{
        id: 'aXjyt3QFH51MWJ4c7WSmS',
        async request(_, keys) {
          return Promise.resolve(keys.map((key) => files[key] || null));
        },
      }}
      id="aXjyt3QFH51MWJ4c7WSmS"
      data={{
        initial: {
          file: 'ganymede.json',
        },
        tests: {
          file: 'tests.json',
        },
        output: {
          file: 'ganymede.json',
          deimos: 'deimos.json',
        },
        model: {
          // type: 'onnx',
          // urls: {
          //   wasmPath: 'https://moons.brantem.com/ganymede/',
          //   modelUrl: 'https://raw.githubusercontent.com/brantem/adudu/master/mnist/mnist-12.onnx',
          // },
          // input: {
          //   width: 28,
          //   height: 28,
          // },
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
      onPublish={(action, data) => console.log(action, data)}
      debug
    />
  </React.StrictMode>,
);
