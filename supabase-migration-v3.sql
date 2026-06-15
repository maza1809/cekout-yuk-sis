-- Migration v3: Full anon CRUD access for admin tables
-- Run ALL in Supabase SQL Editor

-- =====================
-- PRODUCTS
-- =====================
DROP POLICY IF EXISTS "Public read access" ON products;
DROP POLICY IF EXISTS "Admin full access" ON products;
DROP POLICY IF EXISTS "anon select" ON products;
DROP POLICY IF EXISTS "anon insert" ON products;
DROP POLICY IF EXISTS "anon update" ON products;
DROP POLICY IF EXISTS "anon delete" ON products;
CREATE POLICY "anon select" ON products FOR SELECT USING (true);
CREATE POLICY "anon insert" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "anon update" ON products FOR UPDATE USING (true);
CREATE POLICY "anon delete" ON products FOR DELETE USING (true);

-- =====================
-- CATEGORIES
-- =====================
DROP POLICY IF EXISTS "Public read active" ON categories;
DROP POLICY IF EXISTS "Admin full access" ON categories;
DROP POLICY IF EXISTS "anon select" ON categories;
DROP POLICY IF EXISTS "anon insert" ON categories;
DROP POLICY IF EXISTS "anon update" ON categories;
DROP POLICY IF EXISTS "anon delete" ON categories;
CREATE POLICY "anon select" ON categories FOR SELECT USING (true);
CREATE POLICY "anon insert" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "anon update" ON categories FOR UPDATE USING (true);
CREATE POLICY "anon delete" ON categories FOR DELETE USING (true);

-- =====================
-- BRANDS
-- =====================
DROP POLICY IF EXISTS "Public read" ON brands;
DROP POLICY IF EXISTS "Admin full access" ON brands;
DROP POLICY IF EXISTS "anon select" ON brands;
DROP POLICY IF EXISTS "anon insert" ON brands;
DROP POLICY IF EXISTS "anon update" ON brands;
DROP POLICY IF EXISTS "anon delete" ON brands;
CREATE POLICY "anon select" ON brands FOR SELECT USING (true);
CREATE POLICY "anon insert" ON brands FOR INSERT WITH CHECK (true);
CREATE POLICY "anon update" ON brands FOR UPDATE USING (true);
CREATE POLICY "anon delete" ON brands FOR DELETE USING (true);

-- =====================
-- BANNERS
-- =====================
DROP POLICY IF EXISTS "Public read active" ON banners;
DROP POLICY IF EXISTS "Admin full access" ON banners;
DROP POLICY IF EXISTS "anon select" ON banners;
DROP POLICY IF EXISTS "anon insert" ON banners;
DROP POLICY IF EXISTS "anon update" ON banners;
DROP POLICY IF EXISTS "anon delete" ON banners;
CREATE POLICY "anon select" ON banners FOR SELECT USING (true);
CREATE POLICY "anon insert" ON banners FOR INSERT WITH CHECK (true);
CREATE POLICY "anon update" ON banners FOR UPDATE USING (true);
CREATE POLICY "anon delete" ON banners FOR DELETE USING (true);

-- =====================
-- SOCIAL MEDIA
-- =====================
DROP POLICY IF EXISTS "Public read active" ON social_media;
DROP POLICY IF EXISTS "anon select" ON social_media;
DROP POLICY IF EXISTS "anon insert" ON social_media;
DROP POLICY IF EXISTS "anon update" ON social_media;
DROP POLICY IF EXISTS "anon delete" ON social_media;
CREATE POLICY "anon select" ON social_media FOR SELECT USING (true);
CREATE POLICY "anon insert" ON social_media FOR INSERT WITH CHECK (true);
CREATE POLICY "anon update" ON social_media FOR UPDATE USING (true);
CREATE POLICY "anon delete" ON social_media FOR DELETE USING (true);

-- =====================
-- SETTINGS
-- =====================
DROP POLICY IF EXISTS "Public read" ON settings;
DROP POLICY IF EXISTS "anon select" ON settings;
DROP POLICY IF EXISTS "anon insert" ON settings;
DROP POLICY IF EXISTS "anon update" ON settings;
DROP POLICY IF EXISTS "anon delete" ON settings;
CREATE POLICY "anon select" ON settings FOR SELECT USING (true);
CREATE POLICY "anon insert" ON settings FOR INSERT WITH CHECK (true);
CREATE POLICY "anon update" ON settings FOR UPDATE USING (true);
CREATE POLICY "anon delete" ON settings FOR DELETE USING (true);

-- =====================
-- SEO META
-- =====================
DROP POLICY IF EXISTS "Public read" ON seo_meta;
DROP POLICY IF EXISTS "anon select" ON seo_meta;
DROP POLICY IF EXISTS "anon insert" ON seo_meta;
DROP POLICY IF EXISTS "anon update" ON seo_meta;
DROP POLICY IF EXISTS "anon delete" ON seo_meta;
CREATE POLICY "anon select" ON seo_meta FOR SELECT USING (true);
CREATE POLICY "anon insert" ON seo_meta FOR INSERT WITH CHECK (true);
CREATE POLICY "anon update" ON seo_meta FOR UPDATE USING (true);
CREATE POLICY "anon delete" ON seo_meta FOR DELETE USING (true);

-- =====================
-- PAGES
-- =====================
DROP POLICY IF EXISTS "Public read published" ON pages;
DROP POLICY IF EXISTS "anon select" ON pages;
DROP POLICY IF EXISTS "anon insert" ON pages;
DROP POLICY IF EXISTS "anon update" ON pages;
DROP POLICY IF EXISTS "anon delete" ON pages;
CREATE POLICY "anon select" ON pages FOR SELECT USING (true);
CREATE POLICY "anon insert" ON pages FOR INSERT WITH CHECK (true);
CREATE POLICY "anon update" ON pages FOR UPDATE USING (true);
CREATE POLICY "anon delete" ON pages FOR DELETE USING (true);

-- =====================
-- SUBSCRIBERS
-- =====================
DROP POLICY IF EXISTS "Public insert" ON subscribers;
DROP POLICY IF EXISTS "anon select" ON subscribers;
DROP POLICY IF EXISTS "anon insert" ON subscribers;
DROP POLICY IF EXISTS "anon delete" ON subscribers;
CREATE POLICY "anon select" ON subscribers FOR SELECT USING (true);
CREATE POLICY "anon insert" ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "anon delete" ON subscribers FOR DELETE USING (true);

-- =====================
-- USERS (admin users)
-- =====================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon select" ON users;
DROP POLICY IF EXISTS "anon insert" ON users;
DROP POLICY IF EXISTS "anon update" ON users;
DROP POLICY IF EXISTS "anon delete" ON users;
CREATE POLICY "anon select" ON users FOR SELECT USING (true);
CREATE POLICY "anon insert" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "anon update" ON users FOR UPDATE USING (true);
CREATE POLICY "anon delete" ON users FOR DELETE USING (true);
