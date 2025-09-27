import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../services/authState'
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const loc = useLocation()
  if (loading) return <div className="p-6 text-center text-slate-600">Carregando…</div>
  if (!user) return <Navigate to="/login" replace state={{ from: loc }} />
  return children
}
