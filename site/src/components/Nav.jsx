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
}
