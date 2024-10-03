import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chefs from "./pages/Chefs";
import MyProfile from "./pages/MyProfile";
import Recipes from "./pages/Recipes";
import Modal from "./component/Modal";
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Recipes />,
      },
      {
        path: "/chefs",
        element: <Chefs />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/Modal",
        element: <Modal />,
      },
      {
        path: "/MyProfile",
        element: <MyProfile />,
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
