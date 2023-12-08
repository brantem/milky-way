import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter, json, redirect } from 'react-router-dom';

import Start from './pages/start';
import Planet from './pages/planet';
import Editor from './components/Editor';

import type { SolarSystem } from './types';
import { editor, points } from './lib/state';
import { SOLAR_SYSTEM_FILE } from './constants';
import storage from './lib/storage';

import './index.css';

const fillEditorKeys = async () => {
  editor.keys = await storage.getAllKeys('files');
};

const fillPoints = async () => {
  let cursor = await storage.cursor('points');
  while (cursor) {
    points.value[cursor.key] = cursor.value;
    cursor = await cursor.continue();
  }
};

const getUrlsToCache = async (root: string) => {
  const body = await storage.get('files', `${root}/_cache.json`);
  return JSON.parse(body || '[]') as string[];
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
          const [urls, solarSystem] = await Promise.all([
            getUrlsToCache(params.solarSystem!),
            getSolarSystem(params.solarSystem!),
            fillEditorKeys(),
            fillPoints(),
          ]);
          navigator.serviceWorker.controller?.postMessage({ action: 'cache', name: params.solarSystem, urls });
          return json(solarSystem);
        },
        element: (
          <>
            <Outlet />
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
