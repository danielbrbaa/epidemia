
import React, { useState } from 'react'
import { auth, db } from '../services/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

export default function Cadastro(){
  const [form, setForm] = useState({ nome:'', ra:'', email:'', senha:'' })
  const [status, setStatus] = useState({ type:null, msg:'' })
  const [loading, setLoading] = useState(false)

  async function onSubmit(e){
    e.preventDefault()
    setLoading(true)
    setStatus({type:null, msg:''})
    try{
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.senha)
      await setDoc(doc(db, 'usuarios', cred.user.uid), {
        nome: form.nome, ra: form.ra, email: form.email, createdAt: serverTimestamp()
      })
      setStatus({ type:'ok', msg:'Cadastro realizado com sucesso!' })
      setForm({ nome:'', ra:'', email:'', senha:'' })
    }catch(err){
      setStatus({ type:'err', msg: String(err) })
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
      <form onSubmit={onSubmit} className="max-w-md bg-white p-6 rounded-2xl shadow space-y-3">
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Nome"  value={form.nome}  onChange={e=>setForm({...form, nome:e.target.value})} required/>
        <input className="w-full border rounded-xl px-3 py-2" placeholder="RA"    value={form.ra}    onChange={e=>setForm({...form, ra:e.target.value})} required/>
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/>
        <input className="w-full border rounded-xl px-3 py-2" placeholder="Senha" type="password" value={form.senha} onChange={e=>setForm({...form, senha:e.target.value})} required/>
        <button disabled={loading} className="px-4 py-2 rounded-xl bg-slate-900 text-white w-full">{loading? 'Enviando…':'Cadastrar'}</button>
        {status.msg && <p className={status.type==='ok' ? 'text-green-600 text-sm' : 'text-red-600 text-sm'}>{status.msg}</p>}
      </form>
    </div>
  )
}
