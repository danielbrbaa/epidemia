from sim import rules

class MockIndividuo:
    def __init__(self, estado='S'):
        self.estado = estado
        self.movimenta = True

def test_vacinacao():
    populacao = [MockIndividuo('S') for _ in range(50)]
    rules.aplicar_regras(populacao, p_vacinacao=1.0)
    assert all(p.estado == 'R' for p in populacao)

def test_mortalidade():
    populacao = [MockIndividuo('I') for _ in range(50)]
    rules.aplicar_regras(populacao, p_mortalidade=1.0)
    assert all(p.estado == 'D' for p in populacao)
