# Sistema de Gerenciamento de Processos Jurídicos

Um sistema web para cadastro, consulta e gerenciamento de processos judiciais, partes envolvidas e audiências, desenvolvido como projeto de extensão acadêmica.

---

## 📋 Sumário

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração de Ambiente](#-configuração-de-ambiente)
- [Execução](#-execução)
- [API Endpoints](#-api-endpoints)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🚀 Funcionalidades

- **Cadastro de Processos**: número do processo, status, descrição.
- **Gerenciamento de Partes**: pessoas físicas e jurídicas envolvidas em um processo.
- **Agendamento de Audiências**: data, horário, local e partes presentes.
- **Consulta e Filtros**: busca por número, status ou datas de audiências.

---

## 🛠️ Tecnologias

- **Backend**: Node.js, Express.js
- **Banco de Dados**: MongoDB (com mongoose)
- **Frontend**: React.js (opcional: React Router, Axios)
- **Controle de Versão**: Git & GitHub

---

## 🗂️ Estrutura do Projeto

```
Aplicação/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Lógica de rotas e manipulação de dados
│   │   ├── models/            # Schemas do MongoDB (Parte, Processo, Audiencia)
│   │   ├── routes/            # Definição de endpoints RESTful
│   │   └── app.js             # Configuração do Express
│   ├── .env                   # Variáveis de ambiente (não comitar)
│   └── package.json
└── frontend/                  # (se existir)
    ├── src/
    │   ├── components/        # Componentes React
    │   ├── pages/             # Páginas da aplicação
    │   └── App.js             # Roteamento e layout
    └── package.json
```

---

## 💻 Pré-requisitos

- Node.js v14 ou superior
- npm ou yarn
- MongoDB em execução (local ou Atlas)

---

## ⚙️ Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/Sistema-de-gerenciamento-de-processos-juridicos.git
   cd Sistema-de-gerenciamento-de-processos-juridicos/Aplicação
   ```

2. Instale as dependências do backend:
   ```bash
   cd backend
   npm install
   ```

3. (Opcional) Instale as dependências do frontend:
   ```bash
   cd ../frontend
   npm install
   ```

---

## 🛠️ Configuração de Ambiente

1. No diretório `backend`, crie um arquivo `.env` com as variáveis:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/seu_banco
   ```

2. (Se usar frontend) ajuste a base URL da API em `frontend/src/services/api.js`:
   ```js
   export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
   ```

---

## ▶️ Execução

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm start
```

Abra o navegador em `http://localhost:3000` (ou `http://localhost:5173` se usar Vite).

---

## 📡 API Endpoints

> **Base URL:** `http://localhost:3000/api`

| Método | Endpoint                      | Descrição                          |
| ------ | ----------------------------- | ---------------------------------- |
| GET    | `/processos`                  | Listar todos os processos          |
| POST   | `/processos`                  | Criar novo processo                |
| GET    | `/processos/:id`              | Consultar processo por ID          |
| PUT    | `/processos/:id`              | Atualizar processo                 |
| DELETE | `/processos/:id`              | Remover processo                   |

| GET    | `/partes`                     | Listar todas as partes             |
| POST   | `/partes`                     | Criar nova parte                   |

| GET    | `/audiencias`                 | Listar todas as audiências         |
| POST   | `/audiencias`                 | Agendar nova audiência             |

---


Desenvolvido por Dalidy Fachini
