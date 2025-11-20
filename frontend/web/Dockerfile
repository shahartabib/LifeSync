FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies stage
FROM base AS deps
COPY package.json package-lock.json* yarn.lock* ./
RUN yarn install --frozen-lockfile || npm ci

# Build stage
FROM base AS builder
COPY package.json package-lock.json* yarn.lock* ./
RUN yarn install --frozen-lockfile || npm ci
COPY . .
RUN npm run build

# Production stage
FROM base AS runner
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
