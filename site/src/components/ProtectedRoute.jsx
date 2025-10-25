<<<<<<< HEAD
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../services/authState'
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const loc = useLocation()
  if (loading) return <div className="p-6 text-center text-slate-600">Carregando…</div>
  if (!user) return <Navigate to="/login" replace state={{ from: loc }} />
  return children
=======
import { Navigate } from "react-router-dom";
import { useAuth } from "../services/authState.jsx";

export default function ProtectedRoute({ children }) {
  const context = useAuth();

  if (!context) {
    console.error("❌ useAuth() retornou undefined — AuthProvider não está ativo.");
    return <Navigate to="/login" replace />;
  }

  const { user, loading } = context;

  if (loading) return <div className="p-6 text-center">Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
>>>>>>> 2cadf08 (Sprint 5, 6 e 7 - v.1.0.1.9)
}
