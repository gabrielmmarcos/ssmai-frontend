import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import ItensDetalhes from "./pages/ItensDetalhes";
import Profile from "./pages/Profile"
import Dashboards from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import Produtos from "./pages/Produtos"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/itensdetalhes",
    element: <ItensDetalhes />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/dashboard",
    element: <Dashboards />,
  },
  {
    path: "/chatbot",
    element: <Chatbot />,
  },
  {
    path: "/produtos",
    element: <Produtos />,
  },

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
