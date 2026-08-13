# ==========================================
# 1. Base Stage
# ==========================================
FROM oven/bun:1-alpine AS base
WORKDIR /app

# ==========================================
# 2. Dependencies Stage
# ==========================================
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile || bun install

# ==========================================
# 3. Production Runner Stage
# ==========================================
FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000

# Copy installed dependencies
COPY --from=deps /app/node_modules ./node_modules
# Copy source code and configuration files
COPY package.json tsconfig.json ./
COPY src ./src

# Expose port
EXPOSE 3000

# Start server
CMD ["bun", "run", "src/index.ts"]
