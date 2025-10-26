
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

}
