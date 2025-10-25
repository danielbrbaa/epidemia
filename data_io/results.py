
import csv, json, os
import matplotlib.pyplot as plt

def _outdir():
    os.makedirs("outputs", exist_ok=True)
    return "outputs"

def save_metrics(metrics, cfg):
    path = os.path.join(_outdir(), f"metrics_{cfg.mode}.csv")
    with open(path, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["step","S","I","R"])
        w.writerows(metrics)

def plot_sir(metrics, cfg):
    steps = [m[0] for m in metrics]
    S = [m[1] for m in metrics]
    I = [m[2] for m in metrics]
    R = [m[3] for m in metrics]
    plt.figure()
    plt.plot(steps, S, label="S")
    plt.plot(steps, I, label="I")
    plt.plot(steps, R, label="R")
    plt.xlabel("Passo")
    plt.ylabel("Agentes")
    plt.title(f"SIR - {cfg.mode}")
    plt.legend()
    plt.tight_layout()
    plt.savefig(os.path.join(_outdir(), f"sir_{cfg.mode}.png"))
    plt.close()

def save_timing(obj, cfg):
    path = os.path.join(_outdir(), f"timing_{cfg.mode}.json")
    with open(path, "w") as f:
        json.dump(obj, f, indent=2)
import json
import os
from datetime import datetime

def salvar_json(resultado, pasta="results"):
    """Salva o resultado da simulação em um arquivo JSON"""
    if not os.path.exists(pasta):
        os.makedirs(pasta)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    caminho = os.path.join(pasta, f"simulacao_{timestamp}.json")

    with open(caminho, "w", encoding="utf-8") as f:
        json.dump(resultado, f, indent=2, ensure_ascii=False)

    print(f"✅ Resultado salvo em: {caminho}")
    return caminho
