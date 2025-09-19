
from dataclasses import dataclass

@dataclass
class Config:
    mode: str = "seq"
    N: int = 200
    steps: int = 200
    p_infect: float = 0.15
    p_recover: float = 0.02
    seed: int = 42
    workers: int = 8
