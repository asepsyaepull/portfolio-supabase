# Multi-stage Dockerfile for Next.js (Optimized Standalone Mode)

# -----------------------------------------------------------
# 1. Base Stage: Node 20 on Alpine Linux
# -----------------------------------------------------------
FROM node:20-alpine AS base

# Install libc6-compat for compatibility with native dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app

# -----------------------------------------------------------
# 2. Dependencies Stage
# -----------------------------------------------------------
FROM base AS deps
WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json ./

# Install dependencies strictly from lockfile
RUN npm ci

# -----------------------------------------------------------
# 3. Builder Stage
# -----------------------------------------------------------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the Next.js standalone application
RUN npm run build

# -----------------------------------------------------------
# 4. Runner Stage (Production)
# -----------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create a non-root user and group for security
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy static assets and public directory
COPY --from=builder /app/public ./public

# Ensure uploads directory exists and is writable by nextjs user
RUN mkdir -p ./public/uploads && chown -R nextjs:nodejs ./public

# Copy standalone build output and static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Start Next.js standalone server
CMD ["node", "server.js"]
