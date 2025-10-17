import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import Dashboards from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";

import Produtos from "./pages/Produtos"

{/* crud produtos */ }
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
  {
    path: "/produtos",
    element: <Produtos />,
  },

  /* crud produto */
  {
    path: "/additem",
    element: <AddItem />,
  },
  {
    path: "/editaritem",
    element: <EditarItem />,
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
