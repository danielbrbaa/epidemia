# Simulação de Epidemia (SIR) — Sequencial vs Paralelo

Este repositório contém:
- **/site**: site React para visualizar e interagir com a simulação (modo sequencial vs paralelo via Web Worker).
- **Código Python** para rodar simulações offline e gerar CSV/PNG.

## Requisitos Python
```
pip install -r requirements.txt
python app.py --mode=seq --N=200 --steps=200
python app.py --mode=par --N=200 --steps=200 --workers=8
```

Saídas ficam em `outputs/`.

## Rodando o site
Veja `site/README.md`.
