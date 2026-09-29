-- ==============================================================================
-- OPTIONAL SAMPLE SEED DATA FOR UI GALLERY (LOCAL / DEVELOPMENT ONLY)
-- Gunakan file ini jika ingin mengisi data dummy untuk keperluan testing.
-- JANGAN dijalankan otomatis di pipeline deployment server produksi.
-- ==============================================================================

INSERT INTO ui_gallery (title, slug, category, description, image_url, tools, aspect_ratio, figma_url, preview_url, is_featured, order_index)
SELECT 
  'Fintech Telemetry & Liquidity Dashboard',
  'fintech-telemetry-dashboard',
  'Web Dashboard',
  'Eksplorasi antarmuka analitik keuangan dense-data dengan palet gelap, grafik real-time telemetry, dan panel liquiditas interaktif.',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
  ARRAY['Figma', 'AutoLayout', 'Tailwind CSS', 'Design Tokens'],
  '16/10',
  'https://figma.com',
  NULL,
  true,
  1
WHERE NOT EXISTS (SELECT 1 FROM ui_gallery WHERE slug = 'fintech-telemetry-dashboard');

INSERT INTO ui_gallery (title, slug, category, description, image_url, tools, aspect_ratio, figma_url, preview_url, is_featured, order_index)
SELECT 
  'AetherPay - Minimalist Mobile Wallet & Split Bill',
  'aetherpay-mobile-wallet',
  'Mobile App',
  'Konsep aplikasi dompet digital iOS dengan interaksi split bill gestural, micro-haptics feedback, dan hierarki tipografi ultra-bersih.',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop',
  ARRAY['Figma', 'iOS HIG', 'Design System', 'Prototyping'],
  '4/3',
  'https://figma.com',
  NULL,
  true,
  2
WHERE NOT EXISTS (SELECT 1 FROM ui_gallery WHERE slug = 'aetherpay-mobile-wallet');

INSERT INTO ui_gallery (title, slug, category, description, image_url, tools, aspect_ratio, figma_url, preview_url, is_featured, order_index)
SELECT 
  'Pulse AI - Developer Cloud Platform Landing Page',
  'pulse-ai-cloud-landing',
  'Landing Page',
  'Desain halaman arahan developer tool modern beraksen gelap dengan glow aksen oranye, animated code terminal preview, dan bento feature grid.',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop',
  ARRAY['Figma', 'Tailwind CSS', 'Framer Motion'],
  '16/10',
  'https://figma.com',
  'https://pulse-ai.preview.com',
  true,
  3
WHERE NOT EXISTS (SELECT 1 FROM ui_gallery WHERE slug = 'pulse-ai-cloud-landing');

INSERT INTO ui_gallery (title, slug, category, description, image_url, tools, aspect_ratio, figma_url, preview_url, is_featured, order_index)
SELECT 
  'Lumina Design Tokens & Multi-Brand System',
  'lumina-design-system',
  'Design System',
  'Arsitektur design token enterprise yang mendukung switching tema dark/light dinamis, typography scale terkalibrasi, dan komponen atomik.',
  'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1600&auto=format&fit=crop',
  ARRAY['Figma Tokens', 'Variables', 'Component Craft'],
  '16/10',
  'https://figma.com',
  NULL,
  true,
  4
WHERE NOT EXISTS (SELECT 1 FROM ui_gallery WHERE slug = 'lumina-design-system');

INSERT INTO ui_gallery (title, slug, category, description, image_url, tools, aspect_ratio, figma_url, preview_url, is_featured, order_index)
SELECT 
  'Kinetix - High-End Mechanical Watch E-Commerce',
  'kinetix-luxury-ecommerce',
  'E-Commerce',
  'Eksplorasi visual e-commerce horologi mewah dengan mikro-interaksi kustom, tipografi editorial elegan, dan visual showcase produk 360 derajat.',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop',
  ARRAY['Figma', 'Web Design', 'Luxury Branding'],
  '4/3',
  'https://figma.com',
  NULL,
  true,
  5
WHERE NOT EXISTS (SELECT 1 FROM ui_gallery WHERE slug = 'kinetix-luxury-ecommerce');

INSERT INTO ui_gallery (title, slug, category, description, image_url, tools, aspect_ratio, figma_url, preview_url, is_featured, order_index)
SELECT 
  'OmniSwitch & Interactive Micro-Components',
  'omniswitch-micro-components',
  'Component Craft',
  'Koleksi komponen UI eksperimental: tactile toggle switch dengan efek liquid spring, dynamic segmented tab, dan floating action bar.',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
  ARRAY['Figma', 'Micro-Interactions', 'Prototyping'],
  '1/1',
  'https://figma.com',
  NULL,
  true,
  6
WHERE NOT EXISTS (SELECT 1 FROM ui_gallery WHERE slug = 'omniswitch-micro-components');
