#!/bin/bash
set -e

echo "🚀 Deploying portfolio via Docker..."

cd /home/ubuntu/portfolio

echo "📥 Pulling latest changes from repository..."
git fetch origin
git reset --hard origin/main

# Ensure uploads directory exists on host for bind mount
mkdir -p public/uploads

# Gracefully stop old PM2 process if active, to free port 3000
if command -v pm2 &> /dev/null; then
  if pm2 list | grep -q "portfolio"; then
    echo "🛑 Stopping PM2 portfolio process to free port 3000..."
    pm2 stop portfolio || true
  fi
fi

echo "📦 Pulling latest image from GHCR..."
sudo docker compose pull

echo "🐳 Launching Docker container..."
sudo docker compose up -d

echo "🧹 Pruning old unused images..."
sudo docker image prune -f

echo "✅ Deploy completed successfully at $(date)"
