import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';

import Jupiter from './components/planets/Jupiter';
import Neptune from './components/planets/Neptune';
import Editor from './components/Editor';

import { files } from './lib/state';

import './index.css';

const getPlanet = (key: string) => {
  const file = files.value.find((file) => file.key === key);
  return JSON.parse(file?.body || '{}') || {};
};

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        loader: () => redirect('jupiter'),
      },
      {
        path: 'jupiter',
        loader() {
          return getPlanet('planets/jupiter/_planet.json');
        },
        element: <Jupiter />,
      },
      {
        path: 'neptune',
        loader() {
          return getPlanet('planets/neptune/_planet.json');
        },
        element: <Neptune />,
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
