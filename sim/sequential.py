
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
