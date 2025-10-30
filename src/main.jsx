import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import Dashboards from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
// produtos
import Produtos from "./pages/Estoque"

//crud produto
import AddItem from "./pages/AddItem";
import ItensDetalhes from "./pages/VerItem";
import EditarItem from "./pages/EditarItem";


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
  // produtos
  {
    path: "/estoque",
    element: <Produtos />,
  },

  /* crud produto */
  {
    path: "/veritem/:id",
    element: <ItensDetalhes />,
  },
  {
    path: "/editaritem/:id",
    element: <EditarItem />,
  },
  {
    path: "/additem",
    element: <AddItem />,
  },
  {
    path: "/veritem",
    element: <ItensDetalhes />,
  },

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
