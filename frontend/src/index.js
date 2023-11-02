import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './routes/App';
import { CTR } from './routes/CTR';
import { EvPM } from './routes/EvPM';
import { Table } from './routes/Table';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};



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
  <Provider template={AlertTemplate} {...options}>
    <RouterProvider router={router} />
  </Provider>
);
