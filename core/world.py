

import numpy as np

S, I, R = 0, 1, 2

def init_world(N, seed=42, p_initial_infected=0.01):
    rng = np.random.default_rng(seed)
    grid = np.zeros((N,N), dtype=np.int8)
    infected = rng.random((N,N)) < p_initial_infected
    grid[infected] = I
    return grid, rng

def neighbors_toroidal(x, y, N):
    xs = [(x-1)%N, x, (x+1)%N]
    ys = [(y-1)%N, y, (y+1)%N]
    for xi in xs:
        for yi in ys:
            if not (xi==x and yi==y):
                yield xi, yi

