import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Start from './pages/start';
import Planet from './pages/planet';
import Editor from './components/Editor';

import type { SolarSystem } from './lib/types';
import { files } from './lib/state';
import { ROOT_FOLDER, SOLAR_SYSTEM_FILE } from './lib/constants';

import './index.css';

const getFile = (key: string) => files.value.find((file) => file.key === key);

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Start />,
      },
      {
        path: ':planetId',
        loader({ params }) {
          const file = getFile(ROOT_FOLDER + SOLAR_SYSTEM_FILE)!;
          const solarSystem: SolarSystem = JSON.parse(file.body || '[]');
          const planet = solarSystem.planets.find((planet) => planet.id === params.planetId);
          if (!planet) return { solarSystem };
          return { solarSystem, planet: JSON.parse(getFile(planet.file)?.body || '{}') || {} };
        },
        element: <Planet />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Editor />
  </React.StrictMode>,
);
