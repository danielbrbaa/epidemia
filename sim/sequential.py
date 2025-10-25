<<<<<<< HEAD

import numpy as np
from core.world import S, I, R, init_world, neighbors_toroidal

def step(grid_t, grid_t1, p_infect, p_recover, rng):
    N = grid_t.shape[0]
    for x in range(N):
        for y in range(N):
            state = grid_t[x,y]
            if state == S:
                infected_neighbor = False
                for nx, ny in neighbors_toroidal(x,y,N):
                    if grid_t[nx,ny] == I:
                        infected_neighbor = True
                        break
                if infected_neighbor and rng.random() < p_infect:
                    grid_t1[x,y] = I
                else:
                    grid_t1[x,y] = S
            elif state == I:
                grid_t1[x,y] = R if rng.random() < p_recover else I
            else:
                grid_t1[x,y] = R

def run_sim(cfg):
    grid, rng = init_world(cfg.N, cfg.seed)
    buf = np.empty_like(grid)
    metrics = []
    for t in range(cfg.steps+1):
        unique, counts = np.unique(grid, return_counts=True)
        tally = {0:0,1:0,2:0} | dict(zip(unique.tolist(), counts.tolist()))
        metrics.append((t, tally[0], tally[1], tally[2]))
        if t == cfg.steps: break
        step(grid, buf, cfg.p_infect, cfg.p_recover, rng)
        grid, buf = buf, grid
    return metrics
=======
import numpy as np

# Estados:
# 0 = Suscetível (S)
# 1 = Infectado (I)
# 2 = Recuperado (R)

def inicializar_mundo(N, infectados_iniciais=10, seed=42):
    np.random.seed(seed)
    mundo = np.zeros((N, N), dtype=int)
    infectados = np.random.choice(N * N, infectados_iniciais, replace=False)
    for idx in infectados:
        x, y = divmod(idx, N)
        mundo[x, y] = 1
    return mundo


def atualizar_mundo(mundo, p_infect=0.15, p_recover=0.02):
    N = mundo.shape[0]
    novo_mundo = mundo.copy()

    for i in range(N):
        for j in range(N):
            if mundo[i, j] == 1:  # Infectado
                # Pode se recuperar
                if np.random.rand() < p_recover:
                    novo_mundo[i, j] = 2
            elif mundo[i, j] == 0:  # Suscetível
                # Verificar vizinhos infectados
                vizinhos = [
                    mundo[(i - 1) % N, j],
                    mundo[(i + 1) % N, j],
                    mundo[i, (j - 1) % N],
                    mundo[i, (j + 1) % N],
                ]
                if 1 in vizinhos and np.random.rand() < p_infect:
                    novo_mundo[i, j] = 1

    return novo_mundo


def run_simulation(N=80, p_infect=0.15, p_recover=0.02, passos=200, seed=42):
    """
    Executa a simulação SIR sequencial.
    Retorna:
      - dados: lista de contagens de S/I/R por passo
      - mundos: lista dos estados da grade em cada passo
    """
    mundo = inicializar_mundo(N, infectados_iniciais=10, seed=seed)

    mundos = [mundo.tolist()]
    historico = [{
        "passo": 0,
        "S": int((mundo == 0).sum()),
        "I": int((mundo == 1).sum()),
        "R": int((mundo == 2).sum())
    }]

    for passo in range(1, passos + 1):
        mundo = atualizar_mundo(mundo, p_infect, p_recover)
        mundos.append(mundo.tolist())
        historico.append({
            "passo": passo,
            "S": int((mundo == 0).sum()),
            "I": int((mundo == 1).sum()),
            "R": int((mundo == 2).sum())
        })

    return {
        "N": N,
        "passos": passos,
        "dados": historico,
        "mundos": mundos
    }
>>>>>>> 2cadf08 (Sprint 5, 6 e 7 - v.1.0.1.9)
