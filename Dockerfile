# Step 1 — Build
FROM node:20-alpine AS builder

WORKDIR /app

# Включаем pnpm
RUN corepack enable && corepack prepare pnpm@10.8.0 --activate

# Копируем зависимости
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Копируем проект
COPY . .

# Сборка Vite
RUN pnpm build


# Step 2 — Serve static files
FROM node:20-alpine

WORKDIR /app

# Сервер для статики
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 4800

CMD ["serve", "-s", "dist", "-l", "4800"]
