import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';

import Jupiter from './components/planets/Jupiter';
import Neptune from './components/planets/Neptune';
import Editor from './components/Editor';

import './index.css';

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
        element: <Jupiter />,
      },
      {
        path: 'neptune',
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
