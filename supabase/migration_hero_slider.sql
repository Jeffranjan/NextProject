-- Migration to Refactor Hero Slider System

-- 1. Add new columns to 'products' table
ALTER TABLE products
ADD COLUMN IF NOT EXISTS is_hero_slider BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS hero_slider_order INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS hero_title TEXT,
ADD COLUMN IF NOT EXISTS hero_subtitle TEXT,
ADD COLUMN IF NOT EXISTS hero_cta_primary TEXT DEFAULT 'Shop Now',
ADD COLUMN IF NOT EXISTS hero_cta_secondary TEXT DEFAULT 'View Specs',
ADD COLUMN IF NOT EXISTS hero_highlight_specs JSONB,
ADD COLUMN IF NOT EXISTS hero_image_url TEXT;

-- 2. Drop the old 'sliders' table (OPTIONAL - Uncomment if you want to strictly remove it now, or keep it for backup)
-- DROP TABLE IF EXISTS sliders;

-- 3. Create index for faster querying of hero sliders
CREATE INDEX IF NOT EXISTS idx_products_is_hero_slider ON products(is_hero_slider);
CREATE INDEX IF NOT EXISTS idx_products_hero_slider_order ON products(hero_slider_order);
