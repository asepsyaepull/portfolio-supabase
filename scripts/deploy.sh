#!/bin/bash
set -e

echo "🚀 Deploying portfolio via Docker..."

cd /home/ubuntu/portfolio

echo "📥 Pulling latest changes from repository..."
git fetch origin
git reset --hard origin/main

# Ensure uploads directory exists on host for bind mount with full write permissions for Docker (UID 1001: nextjs)
mkdir -p public/uploads/covers public/uploads/gallery
sudo chown -R 1001:1001 public/uploads 2>/dev/null || true
sudo chmod -R 777 public/uploads 2>/dev/null || chmod -R 775 public/uploads 2>/dev/null || true

# Execute database migration if psql is available on the host
if command -v psql &> /dev/null && [ -f "doc/production_migration.sql" ]; then
  echo "🗄️ Applying database migrations to PostgreSQL..."
  if [ -f ".env.local" ]; then
    DB_URL=$(grep -E "^DATABASE_URL=" .env.local | head -n 1 | cut -d '=' -f2-)
    if [ -n "$DB_URL" ]; then
      psql "$DB_URL" -f doc/production_migration.sql || echo "⚠️ DB migration warning (proceeding)"
    fi
  fi
fi

# Permanently remove and unregister any legacy PM2 process holding port 3000
if command -v pm2 &> /dev/null; then
  if pm2 list 2>/dev/null | grep -q "portfolio"; then
    echo "🛑 Permanently removing legacy PM2 portfolio process and saving state..."
    pm2 delete portfolio 2>/dev/null || true
    pm2 save --force 2>/dev/null || true
  fi
fi

# Ensure port 3000 is free before Docker launch
PORT_PID=$(lsof -ti:3000 2>/dev/null || true)
if [ -n "$PORT_PID" ]; then
  CONTAINER_PID=$(sudo docker inspect --format '{{.State.Pid}}' portfolio-app 2>/dev/null || true)
  if [ "$PORT_PID" != "$CONTAINER_PID" ]; then
    echo "⚠️ Rogue process $PORT_PID detected on port 3000. Terminating..."
    sudo kill -9 $PORT_PID 2>/dev/null || true
    sleep 1
  fi
fi

echo "📦 Pulling latest image from GHCR..."
sudo docker compose pull

echo "🐳 Launching Docker container..."
sudo docker compose up -d

echo "🧹 Pruning old unused images..."
sudo docker image prune -f

# Verify container is healthy and responding on port 3000
echo "🔍 Verifying container health on port 3000..."
RETRY=0
MAX_RETRY=15
until curl -sf http://127.0.0.1:3000 > /dev/null 2>&1 || [ $RETRY -ge $MAX_RETRY ]; do
  sleep 2
  RETRY=$((RETRY + 1))
done

if [ $RETRY -ge $MAX_RETRY ]; then
  echo "❌ Error: Container failed health check on port 3000!"
  sudo docker logs portfolio-app --tail 30
  exit 1
fi

echo "✅ Deploy completed and verified successfully at $(date)"
