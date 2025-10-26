
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

}
