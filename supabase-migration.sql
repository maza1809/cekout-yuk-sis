-- Migration: Fix schema to match code conventions
-- Run this in Supabase SQL Editor

-- 1. Fix products table: change brand_id and category_id to TEXT (code uses string slugs)
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_brand_id_fkey;
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_id_fkey;
ALTER TABLE products ALTER COLUMN brand_id TYPE TEXT;
ALTER TABLE products ALTER COLUMN category_id TYPE TEXT;

-- 2. Add RLS policies for public SELECT on all tables
ALTER TABLE social_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active" ON social_media FOR SELECT USING (is_active = true);
CREATE POLICY "Public read" ON settings FOR SELECT USING (true);
CREATE POLICY "Public read" ON seo_meta FOR SELECT USING (true);
CREATE POLICY "Public read published" ON pages FOR SELECT USING (is_published = true);
CREATE POLICY "Public insert" ON subscribers FOR INSERT WITH CHECK (true);

-- 3. Seed demo brands
INSERT INTO brands (name, slug, description, categories, is_featured, click_count) VALUES
  ('Skintific', 'skintific', 'Skincare asal Korea dengan formula Ceramide 5X untuk memperbaiki skin barrier', ARRAY['skincare'], true, 45200),
  ('Somethinc', 'somethinc', 'Brand skincare lokal dengan ingredients high-end untuk kulit glowing', ARRAY['skincare'], true, 29800),
  ('Wardah', 'wardah', 'Kosmetik halal pertama di Indonesia, aman dan terjangkau', ARRAY['skincare','makeup'], true, 32100),
  ('Scarlett', 'scarlett', 'Brand kecantikan milik artis yang viral dengan body care-nya', ARRAY['skincare','bodycare'], true, 52300),
  ('Emina', 'emina', 'Kosmetik untuk remaja dengan harga terjangkau dan warna ceria', ARRAY['skincare','makeup'], true, 28900),
  ('The Originote', 'the-originote', 'Skincare dengan formula sederhana tapi efektif untuk semua jenis kulit', ARRAY['skincare'], true, 15600),
  ('Azarine', 'azarine', 'Skincare dengan bahan alami untuk hasil maksimal', ARRAY['skincare'], true, 36700),
  ('Kahf', 'kahf', 'Skincare khusus pria dengan bahan alami dan segar', ARRAY['skincare'], true, 6200),
  ('Make Over', 'make-over', 'Brand kosmetik profesional dengan pigmentation tinggi', ARRAY['makeup'], true, 15600),
  ('Implora', 'implora', 'Lip cream dan kosmetik murah yang viral di TikTok', ARRAY['makeup'], true, 41200),
  ('Hanasui', 'hanasui', 'Brand lip tint dan lip cream yang digemari remaja Indonesia', ARRAY['makeup'], true, 59800),
  ('Luxcrime', 'luxcrime', 'Setting spray dan makeup tools berkualitas', ARRAY['makeup','beautytools'], true, 9800),
  ('Ellips', 'ellips', 'Hair vitamin terlaris dengan berbagai varian', ARRAY['haircare'], true, 44100),
  ('Miniso', 'miniso', 'Brand Jepang dengan produk kecantikan dan wewangian', ARRAY['fragrance','beautytools'], true, 12300)
ON CONFLICT (slug) DO NOTHING;

-- 4. Seed demo products (using slug strings for brand_id and category_id)
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
  ('Miniso Eau de Parfum', 'miniso-eau-de-parfum', 'miniso', 'fragrance', 'Parfum wanita dengan aroma floral dan musky yang elegan', 'Aroma tahan lama, wangi segar seharian', 'Semprotkan pada titik nadi seperti pergelangan tangan dan leher', '50ml | Miniso | Japan', 65000, 85000, 4.3, 23400, ARRAY['/products/miniso-parfum.jpg'], 'https://shopee.co.id/miniso-parfum', 'shopee', true, false, false, true, 52, ARRAY['fragrance', 'parfum', 'floral'], 12300),
  ('The Originote Ceramide Moisturizer', 'the-originote-ceramide-moisturizer', 'the-originote', 'skincare', 'Moisturizer dengan Ceramide untuk memperbaiki skin barrier', 'Melembabkan, menenangkan, memperbaiki skin barrier', 'Oleskan pada wajah setelah toner', '30g | The Originote | Indonesia', 35000, NULL, 4.6, 28500, ARRAY['/products/originote-moisturizer.jpg'], 'https://shopee.co.id/originote-moisturizer', 'shopee', true, true, true, true, 88, ARRAY['skincare', 'moisturizer', 'ceramide'], 18700)
ON CONFLICT (slug) DO NOTHING;

-- 5. Seed demo banners
INSERT INTO banners (title, subtitle, image, cta_text, cta_link, sort_order, is_active) VALUES
  ('New Collection 2026', 'Temukan produk skincare terbaru dengan formula terkini', '/banners/skincare-banner.jpg', 'Belanja Sekarang', '/produk', 1, true),
  ('Best Seller Week', 'Produk terlaris pilihan pelanggan setia kami', '/banners/bestseller-banner.jpg', 'Lihat Produk', '/produk?sort=trending', 2, true),
  ('Viral di TikTok', 'Produk yang lagi viral dan diburu banyak orang', '/banners/viral-banner.jpg', 'Cek Produk Viral', '/produk', 3, true)
ON CONFLICT DO NOTHING;
