FROM node:22-alpine AS base

WORKDIR /app
COPY package*.json ./

FROM base AS deps
RUN npm ci --omit=dev --legacy-peer-deps

FROM base AS builder
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY package.json ./

EXPOSE 3000
CMD ["npm", "start"]
