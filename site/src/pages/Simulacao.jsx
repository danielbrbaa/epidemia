import { useState, useEffect } from "react";
import { useAuth } from "../services/authState";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Simulacao() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);

  const [params, setParams] = useState({
    N: 80,
    passos: 200,
    p_infect: 0.15,
    p_recover: 0.02,
  });

  const handleChange = (e) => {
    setParams({ ...params, [e.target.name]: parseFloat(e.target.value) });
  };

  const rodarSimulacao = async () => {
    if (!user) {
      alert("Você precisa estar logado para rodar a simulação.");
      return;
    }

    setLoading(true);
    setErro(null);

    try {
      const token = await user.getIdToken();

      const response = await axios.post(
        "http://127.0.0.1:8000/simular",
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDados(response.data.resultado);
    } catch (err) {
      console.error("Erro ao rodar simulação:", err);
      setErro("Erro ao rodar a simulação. Verifique o backend.");
    } finally {
      setLoading(false);
    }
  };

  // 🎨 Renderização do mapa da simulação
  useEffect(() => {
    if (!dados || !dados.mundos) return;

    const canvas = document.getElementById("simCanvas");
    const ctx = canvas.getContext("2d");
    const size = 400 / params.N; // tamanho dos quadradinhos
    let passo = 0;

    const drawFrame = () => {
      ctx.clearRect(0, 0, 400, 400);
      const frame = dados.mundos[passo];
      if (!frame) return;

      for (let i = 0; i < params.N; i++) {
        for (let j = 0; j < params.N; j++) {
          const estado = frame[i][j];
          if (estado === 0) ctx.fillStyle = "#3b82f6"; // S - Azul
          else if (estado === 1) ctx.fillStyle = "#ef4444"; // I - Vermelho
          else ctx.fillStyle = "#10b981"; // R - Verde
          ctx.fillRect(j * size, i * size, size, size);
        }
      }

      passo = (passo + 1) % dados.mundos.length;
      requestAnimationFrame(drawFrame);
    };

    drawFrame();
  }, [dados]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Simulação de Epidemia (SIR)</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Painel de controle */}
        <div>
          <div className="space-y-3">
            <label className="block">
              N (tamanho da grade)
              <input
                type="number"
                name="N"
                value={params.N}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
              />
            </label>

            <label className="block">
              Passos
              <input
                type="number"
                name="passos"
                value={params.passos}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
              />
            </label>

            <label className="block">
              p_infect
              <input
                type="number"
                step="0.01"
                name="p_infect"
                value={params.p_infect}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
              />
            </label>

            <label className="block">
              p_recover
              <input
                type="number"
                step="0.01"
                name="p_recover"
                value={params.p_recover}
                onChange={handleChange}
                className="border rounded px-2 py-1 w-full"
              />
            </label>

            <button
              onClick={rodarSimulacao}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Simulando..." : "Rodar Simulação"}
            </button>
          </div>

          {erro && <p className="text-red-500 mt-4">{erro}</p>}
        </div>

        {/* Resultados */}
        <div>
          {dados ? (
            <div>
              <h2 className="font-semibold mb-2">Simulação visual:</h2>

              {/* Canvas da simulação */}
              <canvas
                id="simCanvas"
                width={400}
                height={400}
                className="border rounded bg-gray-100"
              ></canvas>

              <h2 className="font-semibold mt-4 mb-2">Curvas S/I/R:</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dados.dados}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="passo" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="S" stroke="#3b82f6" dot={false} />
                  <Line type="monotone" dataKey="I" stroke="#ef4444" dot={false} />
                  <Line type="monotone" dataKey="R" stroke="#10b981" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-gray-500">
              Nenhum resultado ainda — clique em “Rodar Simulação”.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
