
import random

class Agent:
    """
    Representa um indivíduo na simulação da epidemia.
    Possui estados: S (susceptível), I (infectado) e R (recuperado).
    """

    def __init__(self):
        self.estado = 'S'  # todos começam suscetíveis
        self.movimenta = True

    def update(self, p_infect, p_recover):
        """
        Atualiza o estado do agente conforme probabilidades.
        """
        if self.estado == 'I':
            if random.random() < p_recover:
                self.estado = 'R'
        elif self.estado == 'S':
            if random.random() < p_infect:
                self.estado = 'I'

