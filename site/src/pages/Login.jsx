<<<<<<< HEAD
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Login(){
  const [form, setForm] = useState({ email:'', senha:'' })
  const [status, setStatus] = useState({ type:null, msg:'' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const loc = useLocation()
  const from = loc.state?.from?.pathname || '/simulacao'

  async function onSubmit(e){
    e.preventDefault()
    setLoading(true); setStatus({type:null, msg:''})
    try{
      await signInWithEmailAndPassword(auth, form.email, form.senha)
      navigate(from, { replace: true }) // volta pra rota que o usuário queria
    }catch(err){
      setStatus({ type:'err', msg: err.code ? `Erro: ${err.code}` : String(err) })
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="max-w-md bg-white p-6 rounded-2xl shadow space-y-3">
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Email" type="email"
               value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/>
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Senha" type="password"
               value={form.senha} onChange={e=>setForm({...form, senha:e.target.value})} required/>
        <button disabled={loading} className="px-4 py-2 rounded-xl bg-slate-900 text-white w-full">
          {loading? 'Entrando…':'Entrar'}
        </button>
        {status.msg && <p className={status.type==='err' ? 'text-red-600 text-sm' : 'text-green-600 text-sm'}>{status.msg}</p>}
        <p className="text-sm text-slate-600">Ainda não tem conta? <Link to="/cadastro" className="underline">Cadastre-se</Link></p>
      </form>
    </div>
  )
=======
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/simulacao");
    } catch (err) {
      setErro("Falha no login: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="border p-2 rounded"/>
        <input type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)} className="border p-2 rounded"/>
        {erro && <p className="text-red-500">{erro}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Entrar</button>
      </form>
    </div>
  );
>>>>>>> 2cadf08 (Sprint 5, 6 e 7 - v.1.0.1.9)
}
