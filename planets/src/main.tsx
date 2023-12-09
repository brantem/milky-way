import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter, json, redirect } from 'react-router-dom';

import Start from './pages/start';
import Planet from './pages/planet';
import Editor from './components/Editor';
import Offline from './components/Offline';

import type { SolarSystem } from './types';
import { files, points } from './lib/state';
import { SOLAR_SYSTEM_FILE } from './constants';
import storage from './lib/storage';

import './index.css';

const loadFiles = async (root: string) => {
  files.root = root;
  files.keys = await storage.getAllKeys('files');
};

const loadPoints = async () => {
  let cursor = await storage.cursor('points');
  while (cursor) {
    points.value[cursor.key] = cursor.value;
    cursor = await cursor.continue();
  }
};

const getSolarSystem = async (root: string) => {
  const body = await storage.get('files', `${root}/${SOLAR_SYSTEM_FILE}`);
  return JSON.parse(body || '{}') as SolarSystem;
};

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
        id: 'solarSystem',
        async loader({ params }) {
          const [solarSystem] = await Promise.all([
            getSolarSystem(params.solarSystem!),
            loadFiles(params.solarSystem!),
            loadPoints(),
          ]);
          return json(solarSystem);
        },
        element: (
          <>
            <Outlet />
            <Offline />
            <Editor />
          </>
        ),
        children: [
          {
            index: true,
            element: <Start />,
          },
          {
            path: ':planet',
            async loader({ params }) {
              const solarSystem = await getSolarSystem(params.solarSystem!);
              const planet = solarSystem.planets.find((planet) => planet.id === params.planet);
              if (!planet) return redirect(`/${params.solarSystem}`);
              return json(JSON.parse((await storage.get('files', planet.file)) || '{}'));
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
