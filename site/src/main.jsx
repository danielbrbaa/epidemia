// site/src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";

import Nav from "./components/Nav.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./services/authState.jsx";

import App from "./App.jsx";
import Sobre from "./pages/Sobre.jsx";
import Entregas from "./pages/Entregas.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Login from "./pages/Login.jsx";

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
      <Nav />
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
}

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/simulacao" replace /> },
  {
    path: "/simulacao",
    element: (
      <Shell>
        <ProtectedRoute>
          <App />
        </ProtectedRoute>
      </Shell>
    ),
  },
  { path: "/sobre", element: <Shell><Sobre /></Shell> },
  { path: "/entregas", element: <Shell><Entregas /></Shell> },
  { path: "/cadastro", element: <Shell><Cadastro /></Shell> },
  { path: "/login", element: <Shell><Login /></Shell> },
  { path: "*", element: <Shell><div className="p-6">404 — Página não encontrada</div></Shell> },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
