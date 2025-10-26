
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      navigate("/login");
    } catch (err) {
      setErro("Erro ao cadastrar: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
      <form onSubmit={handleCadastro} className="flex flex-col gap-3">
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="border p-2 rounded"/>
        <input type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)} className="border p-2 rounded"/>
        {erro && <p className="text-red-500">{erro}</p>}
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Cadastrar</button>
      </form>
    </div>
  );

}
