#!/bin/bash
set -e

echo "🚀 Deploying portfolio..."

cd /home/ubuntu/portfolio

echo "📥 Pulling latest changes..."
git fetch origin
git reset --hard origin/main

echo "📦 Installing dependencies..."
npm ci --omit=dev 2>/dev/null || npm install --omit=dev

echo "🔨 Building..."
npm run build

echo "♻️  Restarting PM2..."
pm2 restart portfolio

echo "✅ Deploy complete at $(date)"
