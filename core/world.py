
<<<<<<< HEAD
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
=======
from core.agent import Agent

class World:
    def __init__(self, N, p_infect, p_recover):
        self.N = N
        self.agents = [Agent() for _ in range(N*N)]
        self.p_infect = p_infect
        self.p_recover = p_recover

    def update(self):
        for agent in self.agents:
            agent.update(self.p_infect, self.p_recover)

    def count_states(self):
        counts = {"S": 0, "I": 0, "R": 0}
        for agent in self.agents:
            counts[agent.estado] += 1
        return counts
>>>>>>> 2cadf08 (Sprint 5, 6 e 7 - v.1.0.1.9)
