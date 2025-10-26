import argparse, time
from data_io.config import Config
from sim.sequential import run_simulation as run_seq
from sim.parallel import run_sim as run_par
from data_io.results import save_metrics, plot_sir, save_timing
import logging
logging.basicConfig(level=logging.DEBUG)


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--mode", choices=["seq","par"], default="seq")
    p.add_argument("--N", type=int, default=200)
    p.add_argument("--steps", type=int, default=200)
    p.add_argument("--p_infect", type=float, default=0.15)
    p.add_argument("--p_recover", type=float, default=0.02)
    p.add_argument("--seed", type=int, default=42)
    p.add_argument("--workers", type=int, default=8)
    args = p.parse_args()

    cfg = Config(**vars(args))
    t0 = time.perf_counter()
    if args.mode == "seq":
        metrics = run_seq(cfg)
    else:
        metrics = run_par(cfg)
    elapsed = time.perf_counter() - t0

    save_metrics(metrics, cfg)
    plot_sir(metrics, cfg)
    save_timing({"mode": args.mode, "N": cfg.N, "steps": cfg.steps,
                 "workers": cfg.workers, "seconds": elapsed}, cfg)
    print(f"OK: {args.mode} em {elapsed:.3f}s")

if __name__ == "__main__":
    main()

import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

import firebase_admin
from firebase_admin import credentials, auth
from fastapi import FastAPI, HTTPException, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from sim.sequential import run_simulation
from data_io import results

# ============================
# 🔹 CONFIGURAÇÃO DO FASTAPI
# ============================
app = FastAPI(
    title="API - Simulação de Epidemia SIR",
    description="API com autenticação via Firebase e execução da simulação.",
    version="2.0.0"
)

# ============================
# 🔹 PERMISSÕES CORS
# ============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================
# 🔹 FIREBASE ADMIN
# ============================
# Garante inicialização única (evita erro no reload)
if not firebase_admin._apps:
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred)


# ============================
# 🔹 VERIFICA TOKEN
# ============================
async def verificar_token(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(status_code=401, detail="Token ausente")

    try:
        token = auth_header.split("Bearer ")[1]
        decoded = auth.verify_id_token(token)
        request.state.user = decoded
        return decoded
    except Exception as e:
        print(f"Erro de autenticação Firebase: {e}")
        raise HTTPException(status_code=401, detail="Token inválido ou expirado")


# ============================
# 🔹 ENDPOINTS
# ============================
@app.get("/status")
def status():
    return {"status": "API com autenticação ativa"}


from types import SimpleNamespace
from fastapi import FastAPI, HTTPException, Depends

@app.post("/simular")
def simular(parametros: dict, usuario=Depends(verificar_token)):
    try:
        cfg = SimpleNamespace(
            N=parametros.get("N", 100),
            steps=parametros.get("passos", 200),
            p_infect=parametros.get("p_infect", 0.15),
            p_recover=parametros.get("p_recover", 0.02),
            seed=parametros.get("seed", 42)
        )

        # Executa a simulação
        resultado = run_simulation(cfg)
        # Retorna o formato certo
        return {
    "usuario": usuario.get("email"),
    "resultado": resultado,
    "mensagem": "Simulação concluída com sucesso!"
        }

    except Exception as e:
        import traceback
        print("❌ ERRO NA SIMULAÇÃO:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

