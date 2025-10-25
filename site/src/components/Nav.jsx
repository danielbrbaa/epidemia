<<<<<<< HEAD
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth, logout } from '../services/authState'

const linkCls = ({isActive}) => `px-3 py-2 rounded-xl ${isActive ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'}`

export default function Nav(){
  const { user } = useAuth()
  return (
    <nav className="bg-white/80 backdrop-blur sticky top-0 z-50 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold">Simulação SIR</Link>
          <div className="flex items-center gap-2 text-sm">
            <NavLink to="/simulacao" className={linkCls}>Simulação</NavLink>
            <NavLink to="/cadastro" className={linkCls}>Cadastro</NavLink>
            <NavLink to="/sobre" className={linkCls}>Sobre</NavLink>
            <NavLink to="/entregas" className={linkCls}>Entregas</NavLink>
            <NavLink to="/login" className={linkCls}>Login</NavLink>
          </div>
        </div>
        <div className="text-sm flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden md:inline text-slate-600">Olá, {user.email}</span>
              <button onClick={logout} className="px-3 py-2 rounded-xl border">Sair</button>
            </>
          ) : (
            <NavLink to="/login" className={linkCls}>Login</NavLink>
          )}
        </div>
      </div>
    </nav>
  )
=======
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../services/authState";

export default function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const linkCls = ({ isActive }) =>
    `px-3 py-2 rounded-md font-medium ${isActive ? "bg-slate-200" : "hover:bg-slate-100"}`;

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-sm">
      <div className="flex gap-3">
        <NavLink to="/simulacao" className={linkCls}>Simulação</NavLink>
        <NavLink to="/sobre" className={linkCls}>Sobre</NavLink>
        <NavLink to="/entregas" className={linkCls}>Entregas</NavLink>
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-3 text-slate-600">{user.email}</span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
              Sair
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={linkCls}>Login</NavLink>
            <NavLink to="/cadastro" className={linkCls}>Cadastro</NavLink>
          </>
        )}
      </div>
    </nav>
  );
>>>>>>> 2cadf08 (Sprint 5, 6 e 7 - v.1.0.1.9)
}
