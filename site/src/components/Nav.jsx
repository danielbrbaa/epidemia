import { NavLink } from "react-router-dom";
import { useAuth } from "../services/authState";

export default function Nav() {
  const context = useAuth();
  if (!context) {
    console.error("⚠️ AuthProvider não encontrado, renderizando Nav sem contexto.");
    return null;
  }

  const { user, logout } = context;

  return (
    <nav className="bg-white/80 backdrop-blur sticky top-0 z-50 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <span className="font-bold">Simulação SIR</span>
          <div className="flex items-center gap-2 text-sm">
            <NavLink to="/simulacao" className="px-3 py-2 rounded-md hover:bg-slate-100">
              Simulação
            </NavLink>
            <NavLink to="/sobre" className="px-3 py-2 rounded-md hover:bg-slate-100">
              Sobre
            </NavLink>
            <NavLink to="/entregas" className="px-3 py-2 rounded-md hover:bg-slate-100">
              Entregas
            </NavLink>
          </div>
        </div>

        <div className="text-sm flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden md:inline text-slate-600">Olá, {user.email}</span>
              <button onClick={logout} className="px-3 py-2 rounded-xl border">
                Sair
              </button>
            </>
          ) : (
            <NavLink to="/login" className="px-3 py-2 rounded-md hover:bg-slate-100">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
