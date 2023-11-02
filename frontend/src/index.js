import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CTR } from './CTR';
import { EvPM } from './EvPM';
import { Table } from './Table';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Navigate push to="/CTR" />
      },
      {
        path: "CTR",
        element: <CTR/>,
      },
      {
        path: "EvPM",
        element: <EvPM/>,
      },
      {
        path: "table",
        element: <Table/>,
      },
    ],
  }
]);

root.render(
  <RouterProvider router={router} />
);
