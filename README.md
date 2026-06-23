# Azimute

  O **Azimute** é uma rede social de apoio para viajantes, criada para ajudar pessoas a **verificar a confiabilidade de locais**, **evitar golpes e perigos** e **trocar informações úteis
  com a comunidade** durante uma viagem.

  A proposta do app é transformar a experiência de viagem em algo mais seguro, colaborativo e social, permitindo que viajantes compartilhem relatos, alertas, avaliações de locais e
  conexões de apoio em tempo real.

  ## Objetivo do app

  O Azimute foi pensado para resolver um problema comum de quem viaja: a falta de informações confiáveis sobre segurança, golpes, regiões de risco e apoio comunitário.

  Com o app, o usuário pode:

  - consultar relatos de outros viajantes sobre locais e estabelecimentos
  - visualizar alertas de risco e confiança no mapa
  - publicar experiências e ajudar outras pessoas
  - encontrar grupos, apoio e conexões sociais durante a viagem
  - ter uma experiência adaptativa conforme o perfil e a faixa etária
  - oferecer uma navegação mais simples e acessível para pessoas idosas

  ## Proposta de impacto social

  Além de ajudar na segurança em viagens, o Azimute também tem foco em **impacto social**, promovendo:

  - apoio entre viajantes
  - redução de isolamento em viagens
  - criação de conexões humanas reais
  - compartilhamento de conhecimento comunitário
  - inclusão de usuários idosos com experiência simplificada e acessível

  ## Tecnologias utilizadas

  Este protótipo foi desenvolvido com:

  - HTML
  - CSS
  - JavaScript
  - Vue 3 (camada leve de apoio no protótipo)
  - Leaflet.js para o mapa

  ## Estrutura do projeto

  ```bash
  azimute/
  ├── index.html
  ├── style.css
  ├── script.js
  ├── vue-app.js
  ├── logo-mark.svg
  ├── logo-horizontal.svg
  └── README.md

  ## Como executar localmente

  A versão atual do projeto está em **React + Vite** dentro de `azimute-react/`,
  com API em `server/` e PostgreSQL via Docker.

  ### Stack completa

  ```bash
  # 1) Banco de dados
  docker compose up -d

  # 2) API
  cd server
  cp .env.example .env
  npm install
  npm run setup
  npm run dev

  # 3) Front-end, em outro terminal
  cd azimute-react
  npm install
  npm run dev
  ```

  Acesse:

  - Front-end: http://localhost:5181
  - API: http://localhost:4100
  - Adminer: http://localhost:8090

  Conta de demonstração: `demo@azimute.app` / `123456`.

  ## Deploy

  O repositório já inclui configuração para publicar o front-end no **Vercel** e
  no **Netlify** a partir da raiz do repo:

  - Vercel: `vercel.json` usa `azimute-react` como app Vite e publica
    `azimute-react/dist`.
  - Netlify: `netlify.toml` usa `azimute-react` como base, roda o build e publica
    `dist`.

  Para login, perfil, relatos e CRUD funcionarem em produção, publique também a
  API (`server/`) em um host Node com PostgreSQL e configure no painel do Vercel
  e do Netlify:

  ```bash
  VITE_API_URL=https://sua-api-publica.example.com/api
  ```

  Na API em produção, configure `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN` com
  os domínios do Vercel/Netlify, `NODE_ENV=production` e `COOKIE_SECURE=true`.

  ## Fluxo principal do protótipo

  No app, o usuário pode:

  1. entrar com uma conta
  2. navegar pelo feed de relatos
  3. consultar locais e alertas no mapa
  4. explorar lugares avaliados pela comunidade
  5. publicar um novo relato
  6. interagir com a rede de apoio e grupos sociais
  7. acessar uma experiência mais simplificada no modo idoso

  ## Diferenciais do Azimute

  - foco 100% em turismo e viajantes
  - rede social útil de viagem, não entretenimento genérico
  - roteiros confiáveis curados pela comunidade de viajantes
  - alertas anti-golpe específicos para turistas (taxi pirata, agência falsa, cobranças abusivas)
  - integração com fontes oficiais de turismo (Embratur, ministérios, Itamaraty)
  - experiência adaptativa por perfil de viagem (mochileiro, família, solo, cultural, aventura)
  - modo acessível para idosos
  - forte componente de impacto social

  ## Observações

  Este projeto foi desenvolvido como protótipo para apresentação em hackathon, com foco em validação de ideia, UX e proposta de valor.

  Algumas funcionalidades são simuladas para fins de demonstração, mas a estrutura foi pensada para evoluir para um produto real.

  ## Autor

  Projeto desenvolvido por João Maximiano.
