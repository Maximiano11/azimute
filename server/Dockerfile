# --- deps: instala apenas dependências de produção ---
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# --- runtime ---
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY migrations ./migrations
COPY src ./src
EXPOSE 4100
# Aplica migrations pendentes e sobe a API.
CMD ["sh", "-c", "npm run migrate:ci && node src/index.js"]
