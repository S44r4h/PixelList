

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";

import Record from "./components/Record";
import RecordList from "./components/RecordList";
import MainPage from "./components/MainPage";
import SignIn from './components/SignIn';
import Register from './components/Register';
import "./index.css";


// HOME LAYOUT







const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <Record />,
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <Record />,
      },
    ],
  },
  {
    path: "/signIn",
    element: <App />,
    children: [
      {
        path: "/signIn",
        element: <SignIn/>,
      },
    ],
  },{
    path: "/register",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <Register/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);