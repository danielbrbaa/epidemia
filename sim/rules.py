import random

def aplicar_regras(populacao, p_isolamento=0.1, p_vacinacao=0.05, p_mortalidade=0.02):
    for individuo in populacao:
        if individuo.estado == 'S' and random.random() < p_vacinacao:
            individuo.estado = 'R'
        if individuo.estado == 'I' and random.random() < p_mortalidade:
            individuo.estado = 'D'
        if random.random() < p_isolamento:
            individuo.movimenta = False
