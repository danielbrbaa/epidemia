<<<<<<< HEAD
# 🧪 Simulação de Epidemia (SIR) — Sequencial vs Paralelo

Projeto acadêmico que implementa uma **simulação de epidemia** usando o modelo **SIR** (Suscetíveis, Infectados e Recuperados).  
A simulação é feita em uma **grade 2D toroidal** com **atualização síncrona (double buffering)**.  
O objetivo é comparar a execução **sequencial (thread única)** e **paralela (threads / Web Worker)**.

---

## 📂 Estrutura do Projeto

```

sim-epidemia/
├─ app.py                  # Script principal para rodar simulação em Python
├─ requirements.txt        # Dependências Python
├─ core/                   # Núcleo da simulação (estados, mundo, vizinhança)
├─ sim/                    # Implementações sequencial e paralela
├─ io/                     # Entrada/saída: configs, salvamento de métricas/gráficos
├─ outputs/                # Resultados gerados (CSV, PNG, JSON)
└─ site/                   # Website interativo (React + Vite + Tailwind)

````

---

## ⚙️ Rodando a Simulação em Python

### 1. Instalar dependências
=======

# 🧪 Simulação de Epidemia (SIR) — Projeto Unificado

Este repositório reúne **todo o código** necessário para as Sprints 1–4:
- **Python** (simulação sequencial e paralela): `app.py`, `core/`, `sim/`, `io/`, `outputs/`.
- **Site (React + Vite + Tailwind + Router + Firebase)**: `site/` com rotas `/simulacao`, `/sobre`, `/entregas`, `/cadastro`.

## ▶️ Python
>>>>>>> fc266c1 (v1.0.1.5)
```bash
pip install -r requirements.txt
````

### 2. Rodar simulação sequencial

```bash
python app.py --mode=seq --N=200 --steps=200
```

### 3. Rodar simulação paralela

```bash
python app.py --mode=par --N=200 --steps=200 --workers=8
```

<<<<<<< HEAD
### 4. Saídas geradas em `/outputs`

* `metrics_seq.csv` ou `metrics_par.csv` → métricas por passo
* `sir_seq.png` ou `sir_par.png` → gráfico SIR
* `timing_seq.json` ou `timing_par.json` → tempo de execução

---

## 🌐 Rodando o Site (Visualização Interativa)

### 1. Entrar na pasta do site

```bash
cd site
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar em modo desenvolvimento

```bash
npm run dev
```

Abra o link mostrado no terminal (ex.: `http://localhost:5173`).

### 4. Build para produção

```bash
npm run build
npm run preview
```

---

## 🎮 Funcionalidades

* Controle de parâmetros:

  * `N` (tamanho da grade NxN)
  * `steps` (número de passos de tempo)
  * `p_infect` (probabilidade de infecção)
  * `p_recover` (probabilidade de recuperação)
  * `seed` (aleatoriedade reprodutível)
  * `workers` (apenas no modo paralelo)
* Comparação de **Sequencial** vs **Paralelo (Worker)**
* Visualização da grade em tempo real
* Gráfico das curvas **S/I/R** ao longo do tempo

---

## 📊 Modelo SIR

* **S**: suscetíveis
* **I**: infectados
* **R**: recuperados (imunes)
* Vizinhança: Moore (8 vizinhos) com bordas **toroidais**
* Atualização **síncrona** (todos os agentes em t → t+1 ao mesmo tempo)

---

## 👨‍💻 Tecnologias Utilizadas

* **Python**: NumPy, Matplotlib
* **JavaScript/React**: Vite, TailwindCSS, Recharts, Framer Motion
* **Paralelismo**:

  * Python → `ThreadPoolExecutor`
  * Web → **Web Worker**

---

## 📅 Entregas (Sprints)

* **Sprint 1**: Documento de backlog + arquitetura
* **Sprint 2**: Feature básica funcional + relatório de progresso

---

## 📝 Licença

Projeto acadêmico para fins de estudo.
Sinta-se livre para reutilizar com créditos.

=======
## 🌐 Site
```bash
cd site
npm install
npm run dev
```

## 🔥 Firebase (p/ cadastro)
1. Crie projeto, ative Authentication (Email/Password) e Firestore.
2. Em `site/`: `cp .env.example .env` e cole as chaves do app Web.
3. Abra `/cadastro` e cadastre um usuário.
>>>>>>> fc266c1 (v1.0.1.5)
