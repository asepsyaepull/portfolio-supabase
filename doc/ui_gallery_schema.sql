-- ==============================================================================
-- Schema: UI Gallery / Visual Archive
-- Database: PostgreSQL
-- Description: DDL dan initial seed data untuk galeri desain UI, eksplorasi mockup,
--              dan visual shots tanpa perlu full case-study.
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS ui_gallery (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,             -- Contoh: 'Web Dashboard', 'Mobile App', 'Landing Page', 'Design System'
  description text,                   -- Micro-caption / ringkasan visual (1-2 kalimat)
  image_url text NOT NULL,            -- URL mockup resolusi tinggi
  thumbnail_url text,                 -- URL gambar thumbnail (opsional, untuk fast load)
  tools text[] DEFAULT '{}',          -- ARRAY['Figma', 'AutoLayout', 'Tailwind CSS']
  aspect_ratio text DEFAULT '16/10',  -- '16/10', '4/3', '1/1', '9/16'
  figma_url text,                     -- Tautan preview file Figma (opsional)
  preview_url text,                   -- Tautan live demo / prototype (opsional)
  is_featured boolean DEFAULT true,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexing untuk pencarian cepat & penyortiran
CREATE INDEX IF NOT EXISTS idx_ui_gallery_category ON ui_gallery(category);
CREATE INDEX IF NOT EXISTS idx_ui_gallery_order ON ui_gallery(order_index ASC, created_at DESC);

-- Trigger untuk update field updated_at otomatis (Opsional)
CREATE OR REPLACE FUNCTION update_ui_gallery_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_ui_gallery_updated_at ON ui_gallery;
CREATE TRIGGER trigger_ui_gallery_updated_at
BEFORE UPDATE ON ui_gallery
FOR EACH ROW
EXECUTE FUNCTION update_ui_gallery_updated_at();

-- ==============================================================================
-- Seed Data: Contoh 6 Item Desain UI Siap Pakai
-- ==============================================================================

INSERT INTO ui_gallery (title, slug, category, description, image_url, tools, aspect_ratio, figma_url, preview_url, is_featured, order_index)
VALUES
(
  'Fintech Telemetry & Liquidity Dashboard',
  'fintech-telemetry-dashboard',
  'Web Dashboard',
  'Eksplorasi antarmuka analitik keuangan dense-data dengan palet gelap, grafik real-time telemetry, dan panel liquiditas interaktif.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
  ARRAY['Figma', 'AutoLayout', 'Tailwind CSS', 'Design Tokens'],
  '16/10',
  'https://figma.com/@asyaepul',
  NULL,
  true,
  1
),
(
  'AetherPay - Minimalist Mobile Wallet & Split Bill',
  'aetherpay-mobile-wallet',
  'Mobile App',
  'Konsep aplikasi dompet digital iOS dengan interaksi split bill gestural, micro-haptics feedback, dan hierarki tipografi ultra-bersih.',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop',
  ARRAY['Figma', 'iOS HIG', 'Design System', 'Prototyping'],
  '4/3',
  'https://figma.com/@asyaepul',
  NULL,
  true,
  2
),
(
  'Pulse AI - Developer Cloud Platform Landing Page',
  'pulse-ai-cloud-landing',
  'Landing Page',
  'Desain halaman arahan developer tool modern beraksen gelap dengan glow aksen oranye, animated code terminal preview, dan bento feature grid.',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop',
  ARRAY['Figma', 'Tailwind CSS', 'Framer Motion'],
  '16/10',
  'https://figma.com/@asyaepul',
  'https://pulse-ai.preview.com',
  true,
  3
),
(
  'Studio Token - Core UI Design System Components',
  'studio-token-design-system',
  'Design System',
  'Spesifikasi token komponen atomik untuk status pills, segmented switches, dynamic form fields, dan color variables yang siap di-code ke frontend.',
  'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1600&auto=format&fit=crop',
  ARRAY['Figma Variables', 'Design Tokens', 'Accessibility WCAG'],
  '16/10',
  'https://figma.com/@asyaepul',
  NULL,
  true,
  4
),
(
  'Nexus Logistics - Realtime Fleet Dispatch Console',
  'nexus-fleet-dispatch-console',
  'Web Dashboard',
  'Desain konsol armada truk operasional dengan peta pelacakan langsung, routing efisiensi bahan bakar, dan quick actions dispatch.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
  ARRAY['Figma', 'GIS Mapping', 'AutoLayout'],
  '16/10',
  'https://figma.com/@asyaepul',
  NULL,
  true,
  5
),
(
  'Vanguard E-Commerce - Luxury Watchmaker Storefront',
  'vanguard-luxury-storefront',
  'Landing Page',
  'Eksplorasi visual editorial storefront dengan fotografi sinematik, micro-animations hover showcase, dan minimal checkout drawer.',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop',
  ARRAY['Figma', 'Editorial Layout', 'Prototyping'],
  '4/3',
  'https://figma.com/@asyaepul',
  NULL,
  true,
  6
)
ON CONFLICT (slug) DO NOTHING;
