import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';

import Start from './pages/start';
import Planet from './pages/planet';
import Editor from './components/Editor';

import type { SolarSystem } from './lib/types';
import { editor, files } from './lib/state';
import { SOLAR_SYSTEM_FILE } from './lib/constants';

import './index.css';

const getFile = (key: string) => files.value.find((file) => file.key === key);

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        loader: () => redirect('milky-way'),
      },
      {
        path: ':solarSystem',
        element: (
          <>
            <Outlet />
            {editor.enabled && <Editor />}
          </>
        ),
        children: [
          {
            index: true,
            element: <Start />,
          },
          {
            path: ':planet',
            loader({ params }) {
              files.root = params.solarSystem || '';

              const file = getFile(`${params.solarSystem}/${SOLAR_SYSTEM_FILE}`);
              if (!file) return { solarSystem: null, planet: null }; // TODO: 404
              const solarSystem: SolarSystem = JSON.parse(file.body || '[]');
              const planet = solarSystem.planets.find((planet) => planet.id === params.planet);
              if (!planet) return { solarSystem, planet: null }; // TODO: 404
              return { solarSystem, planet: JSON.parse(getFile(planet.file)?.body || '{}') || {} };
            },
            element: <Planet />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
