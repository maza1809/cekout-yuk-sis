-- Migration v2: Fix products table & seed data
-- Run ALL of this in Supabase SQL Editor

-- Drop products table completely and recreate with TEXT columns
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand_id TEXT NOT NULL,
  category_id TEXT NOT NULL,
  description TEXT,
  benefits TEXT,
  how_to_use TEXT,
  specifications TEXT,
  price BIGINT NOT NULL,
  original_price BIGINT,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  affiliate_url TEXT NOT NULL,
  affiliate_platform TEXT DEFAULT 'shopee' CHECK (affiliate_platform IN ('shopee', 'other')),
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_viral BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  viral_score INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recreate indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_published ON products(is_published);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_viral ON products(is_viral);
CREATE INDEX idx_products_new ON products(is_new);
CREATE INDEX idx_products_slug ON products(slug);

-- Drop old click_events FK if exists
ALTER TABLE click_events DROP CONSTRAINT IF EXISTS click_events_product_id_fkey;

-- RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON products;
DROP POLICY IF EXISTS "Admin full access" ON products;
CREATE POLICY "Public read access" ON products FOR SELECT USING (is_published = true);
CREATE POLICY "Admin full access" ON products FOR ALL USING (auth.role() = 'authenticated');

-- RLS for other tables (ensure all can be read by anon key)
DROP POLICY IF EXISTS "Public read" ON brands;
DROP POLICY IF EXISTS "Public read" ON categories;
DROP POLICY IF EXISTS "Public read" ON banners;
DROP POLICY IF EXISTS "Public read active" ON social_media;

CREATE POLICY "Public read" ON brands FOR SELECT USING (true);
CREATE POLICY "Public read active" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active" ON banners FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active" ON social_media FOR SELECT USING (is_active = true);

-- Ensure all tables can be read
DROP POLICY IF EXISTS "Public read" ON settings;
DROP POLICY IF EXISTS "Public read" ON seo_meta;
DROP POLICY IF EXISTS "Public read published" ON pages;
DROP POLICY IF EXISTS "Public insert" ON subscribers;
CREATE POLICY "Public read" ON settings FOR SELECT USING (true);
CREATE POLICY "Public read" ON seo_meta FOR SELECT USING (true);
CREATE POLICY "Public read published" ON pages FOR SELECT USING (is_published = true);
CREATE POLICY "Public insert" ON subscribers FOR INSERT WITH CHECK (true);

-- Seed products (13 products)
INSERT INTO products (name, slug, brand_id, category_id, description, benefits, how_to_use, specifications, price, original_price, rating, review_count, images, affiliate_url, affiliate_platform, is_published, is_featured, is_viral, is_new, viral_score, tags, click_count) VALUES
  ('Skintific 5X Ceramide Moisturizer', 'skintific-5x-ceramide-moisturizer', 'skintific', 'skincare', 'Moisturizer dengan 5X Ceramide untuk memperbaiki skin barrier', 'Melembabkan, memperbaiki skin barrier, menenangkan kulit', 'Oleskan pada wajah setelah toner dan serum', '30ml | Skintific | Korea', 89000, 119000, 4.8, 15230, ARRAY['/products/skintific-moisturizer.jpg'], 'https://shopee.co.id/skintific-moisturizer', 'shopee', true, true, true, false, 95, ARRAY['skincare', 'moisturizer', 'ceramide'], 45200),
  ('Somethinc Niacinamide Serum', 'somethinc-niacinamide-serum', 'somethinc', 'skincare', 'Serum Niacinamide 10% untuk kulit berminyak', 'Mengecilkan pori, mengurangi minyak, mencerahkan', 'Oleskan 3 tetes setelah toner', '20ml | Somethinc | Indonesia', 75000, NULL, 4.7, 29800, ARRAY['/products/somethinc-niacinamide.jpg'], 'https://shopee.co.id/somethinc-niacinamide', 'shopee', true, true, false, true, 72, ARRAY['serum', 'niacinamide', 'skincare'], 19800),
  ('Wardah Perfect Bright Moisturizer', 'wardah-perfect-bright-moisturizer', 'wardah', 'skincare', 'Moisturizer pencerah wajah dengan Vitamin C', 'Mencerahkan, melembabkan, meratakan warna kulit', 'Aplikasikan setiap pagi dan malam', '30ml | Wardah | Indonesia', 45000, 55000, 4.6, 23450, ARRAY['/products/wardah-bright.jpg'], 'https://shopee.co.id/wardah-bright', 'shopee', true, true, true, false, 88, ARRAY['skincare', 'moisturizer', 'brightening'], 32100),
  ('Emina Bright Stuff Face Wash', 'emina-bright-stuff-face-wash', 'emina', 'skincare', 'Sabun cuci muka yang bikin wajah cerah alami', 'Membersihkan, mencerahkan, wajah terasa segar', 'Gunakan setiap pagi dan malam', '100ml | Emina | Indonesia', 25000, NULL, 4.5, 42100, ARRAY['/products/emina-facewash.jpg'], 'https://shopee.co.id/emina-facewash', 'shopee', true, true, false, false, 60, ARRAY['skincare', 'facewash', 'brightening'], 28900),
  ('Azarine Sunscreen SPF 45', 'azarine-sunscreen-spf-45', 'azarine', 'skincare', 'Sunscreen ringan dengan SPF 45 PA+++', 'Melindungi dari sinar UV, ringan, tidak lengket', 'Oleskan 15 menit sebelum beraktivitas di luar', '30ml | Azarine | Indonesia', 35000, NULL, 4.7, 38900, ARRAY['/products/azarine-sunscreen.jpg'], 'https://shopee.co.id/azarine-sunscreen', 'shopee', true, true, true, false, 91, ARRAY['sunscreen', 'skincare', 'spf'], 36700),
  ('Scarlett Whitening Body Lotion', 'scarlett-whitening-body-lotion', 'scarlett', 'bodycare', 'Body lotion pemutih dengan Glutathione', 'Memutihkan, melembabkan, wangi tahan lama', 'Oleskan setelah mandi', '250ml | Scarlett | Indonesia', 55000, 70000, 4.6, 56700, ARRAY['/products/scarlett-lotion.jpg'], 'https://shopee.co.id/scarlett-lotion', 'shopee', true, false, true, false, 93, ARRAY['bodycare', 'whitening', 'lotion'], 52300),
  ('Implora Lip Cream Matte', 'implora-lip-cream-matte', 'implora', 'makeup', 'Lip cream matte tahan lama dengan berbagai shade cantik', 'Tahan lama, tidak bikin kering, warna pigmented', 'Oleskan pada bibir yang bersih', '4ml | Implora | Indonesia', 18000, 25000, 4.4, 67800, ARRAY['/products/implora-lipcream.jpg'], 'https://shopee.co.id/implora-lipcream', 'shopee', true, false, false, true, 45, ARRAY['makeup', 'lipcream', 'matte'], 41200),
  ('Make Over Longwear Foundation', 'make-over-longwear-foundation', 'make-over', 'makeup', 'Foundation full coverage tahan seharian', 'Full coverage, tahan lama, smooth finish', 'Aplikasikan dengan beauty blender atau brush', '30ml | Make Over | Indonesia', 125000, NULL, 4.5, 18700, ARRAY['/products/makeover-foundation.jpg'], 'https://shopee.co.id/makeover-foundation', 'shopee', true, false, false, true, 55, ARRAY['makeup', 'foundation', 'coverage'], 15600),
  ('Hanasui Lip Tint Glow', 'hanasui-lip-tint-glow', 'hanasui', 'makeup', 'Lip tint dengan efek glow natural', 'Warna natural, glow, tahan lama', 'Oleskan pada bibir secara merata', '5ml | Hanasui | Indonesia', 15000, NULL, 4.3, 89100, ARRAY['/products/hanasui-liptint.jpg'], 'https://shopee.co.id/hanasui-liptint', 'shopee', true, false, true, false, 87, ARRAY['makeup', 'liptint', 'glow'], 59800),
  ('Luxcrime Setting Spray', 'luxcrime-setting-spray', 'luxcrime', 'beautytools', 'Setting spray untuk makeup tahan seharian', 'Membuat makeup tahan lama, menyegarkan wajah', 'Semprotkan ke wajah dari jarak 20cm setelah makeup', '100ml | Luxcrime | Indonesia', 42000, NULL, 4.6, 12500, ARRAY['/products/luxcrime-setting-spray.jpg'], 'https://shopee.co.id/luxcrime-setting-spray', 'shopee', true, false, false, true, 48, ARRAY['makeup', 'setting spray', 'beautytools'], 9800),
  ('Ellips Hair Vitamin', 'ellips-hair-vitamin', 'ellips', 'haircare', 'Hair vitamin dengan Argan Oil untuk rambut berkilau', 'Melembutkan, menutrisi, melindungi rambut', 'Oleskan pada rambut setengah kering', '60ml | Ellips | Indonesia', 12000, NULL, 4.5, 78900, ARRAY['/products/ellips-hair-vitamin.jpg'], 'https://shopee.co.id/ellips-hair-vitamin', 'shopee', true, false, true, false, 85, ARRAY['haircare', 'hair vitamin', 'argan oil'], 44100),
  ('Miniso Eau de Parfum', 'miniso-eau-de-parfum', 'miniso', 'fragrance', 'Parfum dengan aroma floral dan musky yang elegan', 'Aroma tahan lama, wangi segar seharian', 'Semprotkan pada titik nadi', '50ml | Miniso | Japan', 65000, 85000, 4.3, 23400, ARRAY['/products/miniso-parfum.jpg'], 'https://shopee.co.id/miniso-parfum', 'shopee', true, false, false, true, 52, ARRAY['fragrance', 'parfum', 'floral'], 12300),
  ('The Originote Ceramide Moisturizer', 'the-originote-ceramide-moisturizer', 'the-originote', 'skincare', 'Moisturizer dengan Ceramide untuk memperbaiki skin barrier', 'Melembabkan, menenangkan, memperbaiki skin barrier', 'Oleskan pada wajah setelah toner', '30g | The Originote | Indonesia', 35000, NULL, 4.6, 28500, ARRAY['/products/originote-moisturizer.jpg'], 'https://shopee.co.id/originote-moisturizer', 'shopee', true, true, true, true, 88, ARRAY['skincare', 'moisturizer', 'ceramide'], 18700)
ON CONFLICT (slug) DO NOTHING;

-- Seed banners
INSERT INTO banners (title, subtitle, image, cta_text, cta_link, sort_order, is_active) VALUES
  ('New Collection 2026', 'Temukan produk skincare terbaru dengan formula terkini', '/banners/skincare-banner.jpg', 'Belanja Sekarang', '/produk', 1, true),
  ('Best Seller Week', 'Produk terlaris pilihan pelanggan setia kami', '/banners/bestseller-banner.jpg', 'Lihat Produk', '/produk?sort=trending', 2, true),
  ('Viral di TikTok', 'Produk yang lagi viral dan diburu banyak orang', '/banners/viral-banner.jpg', 'Cek Produk Viral', '/produk', 3, true)
ON CONFLICT DO NOTHING;
