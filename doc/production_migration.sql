-- ==============================================================================
-- PRODUCTION DATABASE MIGRATION SCRIPT
-- Jalankan skrip ini di database server VPS PostgreSQL Anda.
-- Contoh command di VPS:
-- psql -d portfolio -f /home/ubuntu/portfolio/doc/production_migration.sql
-- ==============================================================================

-- 1. Pastikan extension UUID tersedia
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tambahkan kolom baru pada tabel projects jika belum ada
ALTER TABLE projects ADD COLUMN IF NOT EXISTS role text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS timeline text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tools text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_url text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_overlap text DEFAULT 'none';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS icon_name text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_active boolean DEFAULT true;

-- 3. Buat tabel ui_gallery
CREATE TABLE IF NOT EXISTS ui_gallery (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  description text,
  image_url text NOT NULL,
  thumbnail_url text,
  tools text[] DEFAULT '{}',
  aspect_ratio text DEFAULT '16/10',
  figma_url text,
  preview_url text,
  is_featured boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index performa untuk query frontend dan sortable admin
CREATE INDEX IF NOT EXISTS idx_ui_gallery_category ON ui_gallery(category);
CREATE INDEX IF NOT EXISTS idx_ui_gallery_order ON ui_gallery(order_index ASC, created_at DESC);

