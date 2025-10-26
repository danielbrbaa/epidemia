
import numpy as np
from concurrent.futures import ThreadPoolExecutor
from core.world import S, I, R, init_world, neighbors_toroidal

from data_io import config, results


def step_tile(args):
    grid_t, x0, x1, p_infect, p_recover, seed = args
    N = grid_t.shape[0]
    rng = np.random.default_rng(seed)
    out = np.empty((x1-x0, N), dtype=np.int8)
    for ix, x in enumerate(range(x0, x1)):
        for y in range(N):
            state = grid_t[x,y]
            if state == S:
                inf = any(grid_t[nx,ny]==I for nx,ny in neighbors_toroidal(x,y,N))
                out[ix,y] = I if (inf and rng.random()<p_infect) else S
            elif state == I:
                out[ix,y] = R if rng.random()<p_recover else I
            else:
                out[ix,y] = R
    return x0, out

def run_sim(cfg):
    grid, _ = init_world(cfg.N, cfg.seed)
    metrics = []
    N = cfg.N
    tiles = []
    step_size = max(1, N // max(1,cfg.workers))
    for x0 in range(0, N, step_size):
        x1 = min(N, x0+step_size)
        tiles.append((x0, x1))

    for t in range(cfg.steps+1):
        unique, counts = np.unique(grid, return_counts=True)
        tally = {0:0,1:0,2:0} | dict(zip(unique.tolist(), counts.tolist()))
        metrics.append((t, tally[0], tally[1], tally[2]))
        if t == cfg.steps: break
        tasks = [(grid, x0, x1, cfg.p_infect, cfg.p_recover, (cfg.seed*73856093 + t*19349663 + x0) & 0xFFFFFFFF)
                 for (x0,x1) in tiles]
        next_grid = np.empty_like(grid)
        with ThreadPoolExecutor(max_workers=cfg.workers) as ex:
            for x0, tile_out in ex.map(step_tile, tasks):
                next_grid[x0:x0+tile_out.shape[0], :] = tile_out
        grid = next_grid
    return metrics
