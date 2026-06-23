# Azimute · React + Vite + API (Postgres)

Front-end do Azimute em **React 18 + Vite**, agora ligado a um **backend real**
(Node/Express) com **PostgreSQL rodando em Docker**. A persistência, a
autenticação (JWT + bcrypt) e todo o CRUD acontecem no servidor.

## Arquitetura

```
azimute/
├── docker-compose.yml     # PostgreSQL 16 + Adminer
├── server/                # API REST (Node/Express)
└── azimute-react/         # este front-end
```

Portas (escolhidas para não conflitar com outros serviços locais):
Postgres `5544` · Adminer `8090` · API `4100` · Vite `5181`.

## Como rodar (stack completa)

```bash
# 1) Banco de dados (na raiz do repositório)
docker compose up -d

# 2) API
cd server
cp .env.example .env        # ajuste o JWT_SECRET se quiser
npm install
npm run setup               # roda as migrations + popula dados de demonstração
npm run dev                 # http://localhost:4100

# 3) Front-end (em outro terminal)
cd azimute-react
npm install
npm run dev                 # http://localhost:5181
```

O Vite faz proxy de `/api` para a API (`vite.config.js`), então o front-end fala
com o backend sem configuração extra. Para produção, defina `VITE_API_URL`.

Conta de demonstração: `demo@azimute.app` / `123456`.

### Modo "full" (API também em Docker)

Para subir banco + API em containers de uma vez (a API roda migrations no boot):

```bash
docker compose --profile full up -d   # db + adminer + api dockerizada
cd azimute-react && npm run dev        # só o front-end localmente
```

## Qualidade / CI

`.github/workflows/ci.yml` roda a cada push/PR: sobe Postgres, aplica migrations,
faz seed, sobe a API e roda o smoke test; em paralelo, builda o front-end.

## Banco de dados (migrations)

O esquema é versionado com **node-pg-migrate** em `server/migrations/`.

```bash
cd server
npm run migrate             # aplica migrations pendentes
npm run migrate:down        # desfaz a última
npm run migrate:create nome # cria uma nova migration
npm run seed                # popula dados de demonstração (idempotente)
```

## Testes

```bash
cd server
npm test                    # smoke test HTTP: auth, CRUD, permissões, paginação e validação
```

## Estrutura do front-end

```
src/
  main.jsx              # entrada (providers + router)
  App.jsx               # rotas
  index.css             # design system (tokens, glass UI, responsivo)
  context/
    ThemeContext.jsx    # tema claro/escuro
    AuthContext.jsx     # apenas sessão/perfil (auth)
    ToastContext.jsx    # notificações
    ConfirmContext.jsx  # diálogos de confirmação
  hooks/
    useReports.js       # dados de relatos/curtidas/comentários (TanStack Query)
  lib/
    api.js              # cliente HTTP (cookie httpOnly + erros)
    geo.js              # geocodificação/rotas (Nominatim/OSRM)
  data/
    constants.js, incidents.js (fallback offline dos alertas)
  components/
    Layout, Topbar, Sidebar, BottomNav, Modal, Avatar, Icons, RequireAuth
  pages/
    Landing, MapPage (Leaflet), Alerts, Community, Profile, Auth
```

## O que está implementado

- **Autenticação real**: cadastro/login/logout com JWT; senhas com hash bcrypt.
- **Perfil (CRUD de usuário)**: editar nome/bio/tipo/avatar; apagar conta (cascade).
- **Relatos (CRUD completo)**: criar, listar, editar, excluir — por dono, validado no servidor.
- **Curtidas** (toggle) e **comentários** (criar/listar/apagar) como entidades reais.
- **Mapa** (Leaflet) com alertas do backend + pins dos relatos geocodificados.
- **Alertas** e **Comunidade** consumindo a API, com fallback offline.
- **UX**: estados de carregamento, botões com feedback, toasts, estados vazios,
  foco visível e `aria-*`, tema claro/escuro e layout responsivo.
- **Dados no front com TanStack Query**: cache, paginação infinita e **curtida
  otimista** (reflete na hora, reconcilia com o servidor).

### Backend em camadas

`routes/` (controllers finos) → `repositories/` (toda a SQL) → `db.js`. Validação
de entrada com **zod** (`schemas.js`/`validate.js`) e de ambiente no boot (`config.js`).
