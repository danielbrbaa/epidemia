<<<<<<< HEAD
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'

import Nav from './components/Nav.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import App from './App.jsx'
import Sobre from './pages/Sobre.jsx'
import Entregas from './pages/Entregas.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Login from './pages/Login.jsx'

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
      <Nav />
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  )
}

const router = createBrowserRouter([
  // redireciona raiz para /simulacao
  { path: '/', element: <Navigate to="/simulacao" replace /> },

  // rota protegida
  { path: '/simulacao', element: <Shell><ProtectedRoute><App/></ProtectedRoute></Shell> },

  // rotas livres
  { path: '/sobre', element: <Shell><Sobre/></Shell> },
  { path: '/entregas', element: <Shell><Entregas/></Shell> },
  { path: '/cadastro', element: <Shell><Cadastro/></Shell> },
  { path: '/login', element: <Shell><Login/></Shell> },

  // 404 simples
  { path: '*', element: <Shell><div className="p-6">404 — Página não encontrada</div></Shell> },
])

createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
=======
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./services/authState.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
>>>>>>> 2cadf08 (Sprint 5, 6 e 7 - v.1.0.1.9)
