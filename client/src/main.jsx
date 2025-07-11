import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

import Record from "./components/Record";
import RecordList from "./components/RecordList";
import MainPage from "./components/MainPage";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import DashBoard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
import GameAdminPanel from "./components/GameAdminPanel";
import { GameContextProvider } from "./context/GameContext";
import AdminRoutes from "./components/AdminRoutes";
import UserGameList from "./components/UsergameList";
import UserManagement from "./components/UserManagement";
import ExploreGames from "./components/ExploreGames";
import "./index.css";

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
    path: "/login",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "/register",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/recordlist",
    element: <App />,
    children: [
      {
        path: "/recordlist",
        element: <RecordList />,
      },
    ],
  },
  {
    path: "/adminpanel",
    element: <App />,
    children: [
      {
        path: "/adminpanel",
        element: (
          <AdminRoutes>
            <GameContextProvider>
              <GameAdminPanel />
            </GameContextProvider>
          </AdminRoutes>
        ),
      },
    ],
  },
  {
    path: "/usermanagement",
    element: <App />,
    children: [
      {
        path: "/usermanagement",
        element: (
          <AdminRoutes>
            <GameContextProvider>
              <UserManagement />
            </GameContextProvider>
          </AdminRoutes>
        ),
      },
    ],
  },
  {
    path: "/usergamelist",
    element: <App />,
    children: [
      {
        path: "/usergamelist",
        element: (
          <ProtectedRoute>
            <GameContextProvider>
              <UserGameList />
            </GameContextProvider>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/exploregames",
    element: <App />,
    children: [
      {
        path: "/exploregames",
        element: (
          <ProtectedRoute>
            <ExploreGames />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
