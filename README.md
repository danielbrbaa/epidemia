

# 🧪 Simulação de Epidemia (SIR) — Sequencial vs Paralelo

Projeto acadêmico que implementa uma **simulação de epidemia** usando o modelo **SIR** (Suscetíveis, Infectados e Recuperados).  
A simulação é feita em uma **grade 2D toroidal**, com execução **sequencial** e **paralela**, e um **site interativo** com autenticação via **Firebase** e **API FastAPI**.

---

## 📂 Estrutura do Projeto

```

epidemia-main/
├─ app.py                  # Backend FastAPI com autenticação Firebase + endpoint /simular
├─ requirements.txt        # Dependências Python
├─ core/                   # Núcleo da simulação (agentes, mundo)
│   ├─ agent.py
│   ├─ world.py
│   └─ **init**.py
├─ sim/                    # Implementações da simulação
│   ├─ sequential.py       # Versão sequencial
│   ├─ parallel.py         # (opcional) Versão paralela
│   └─ rules.py            # Regras de infecção/recuperação
├─ data_io/                # Entrada e saída de dados
│   ├─ config.py
│   ├─ results.py
│   └─ **init**.py
├─ results/                # Arquivos JSON de simulações geradas
├─ tests/                  # Testes unitários (pytest)
│   ├─ test_rules.py
│   └─ test_sequential.py
└─ site/                   # Website interativo (React + Vite + Tailwind + Firebase)
├─ src/
│   ├─ pages/
│   │   ├─ Simulacao.jsx
│   │   ├─ Login.jsx
│   │   ├─ Cadastro.jsx
│   │   ├─ Sobre.jsx
│   │   └─ Entregas.jsx
│   ├─ components/
│   │   ├─ Nav.jsx
│   │   └─ ProtectedRoute.jsx
│   ├─ services/
│   │   ├─ firebase.js
│   │   └─ authState.js
│   ├─ App.jsx
│   └─ main.jsx
├─ public/
└─ package.json

````

---

## ⚙️ Backend — FastAPI

A API realiza a execução da simulação e exige autenticação via **Firebase Token**.

### ▶️ Rodando localmente

```bash
pip install -r requirements.txt
uvicorn app:app --reload
````

Acesse:

```
http://127.0.0.1:8000/docs
```

### 🔐 Endpoints principais

| Método | Endpoint   | Descrição                         |
| ------ | ---------- | --------------------------------- |
| `GET`  | `/status`  | Verifica se a API está online     |
| `POST` | `/simular` | Executa simulação SIR autenticada |

> **Header obrigatório**
> `Authorization: Bearer <token_firebase>`

---

## 🌐 Site — React + Vite + Firebase

O site permite login, cadastro e execução das simulações com visualização interativa.

### ▶️ Rodando o site

```bash
cd site
npm install
npm run dev
```

Acesse:

```
http://localhost:5173
```

### 🔥 Firebase (Autenticação)

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
2. Ative **Authentication → Email/Senha**.
3. Gere as credenciais web e adicione ao arquivo `.env` dentro da pasta `site/`:

```bash
VITE_FB_API_KEY=xxxxx
VITE_FB_AUTH_DOMAIN=xxxxx.firebaseapp.com
VITE_FB_PROJECT_ID=xxxxx
VITE_FB_STORAGE=xxxxx.appspot.com
VITE_FB_SENDER=xxxxx
VITE_FB_APP_ID=xxxxx
VITE_FB_MEASUREMENT_ID=xxxxx
```

4. Baixe a chave da conta de serviço (SDK Admin) e coloque como:

```
serviceAccountKey.json
```

na raiz do projeto.

---

## 🎮 Funcionalidades

* Login e cadastro via **Firebase**
* Execução autenticada da simulação no **FastAPI**
* Controle de parâmetros:

  * `N` (tamanho da grade NxN)
  * `passos` (número de iterações)
  * `p_infect` (probabilidade de infecção)
  * `p_recover` (probabilidade de recuperação)
* Visualização da simulação (canvas 2D)
* Gráfico das curvas **S/I/R**
* Salvamento dos resultados em `.json`

---

## 📊 Modelo SIR

* **S (Susceptíveis):** podem ser infectados
* **I (Infectados):** transmitem com probabilidade `p_infect`
* **R (Recuperados):** tornam-se imunes
* Atualização síncrona (`t → t+1`)
* Vizinhança: **Moore (8 vizinhos)**
* Mundo **toroidal** (as bordas se conectam)

---

## 🧠 Tecnologias Utilizadas

### 🔹 Backend

* **Python 3.11+**
* FastAPI
* Firebase Admin SDK
* Uvicorn
* Pytest (testes)

### 🔹 Frontend

* **React + Vite**
* TailwindCSS
* Firebase Auth
* Axios
* Recharts (gráficos)
* Framer Motion (animações)
* Context API + React Router

---

## 🧾 Licença

Projeto acadêmico desenvolvido para fins educacionais.
Sinta-se livre para utilizar e modificar com os devidos créditos.

---

## 👨‍💻 Autor

🔗 [github.com/danielbrbaa](https://github.com/danielbrbaa)

---

## 🚀 Execução Completa (Resumo)

### Backend

```bash
uvicorn app:app --reload
```

### Frontend

```bash
cd site
npm run dev
```

Acesse:

```
http://localhost:5173
```

---

Posso gerar um exemplo de `<img>` Markdown com preview automático do canvas.
```
