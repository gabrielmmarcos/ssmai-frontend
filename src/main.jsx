import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro"
import Profile from "./pages/Profile"
//id
import Dashboards from "./pages/Dashboard";
//dashboard
import DashboardTela from "./pages/Dashboards";
import Chatbot from "./pages/Chatbot";
// produtos
import Produtos from "./pages/Estoque"

//crud produto
import AddItem from "./pages/AddItem";
import ItensDetalhes from "./pages/VerItem";
import EditarItem from "./pages/EditarItem";
import AddItemIA from "./pages/AddViaAI"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
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
    path: "/dashboard/:id",
    element: <Dashboards />,
  },
  {
    path: "/dashboard",
    element: <DashboardTela />,
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
  {
    path: "/additemia",
    element: <AddItemIA />,
  },

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
