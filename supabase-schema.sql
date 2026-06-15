-- Cekout Yuk Sis - Supabase Database Schema

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (admin)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Brands table
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo TEXT,
  description TEXT,
  categories TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
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

-- Banners table
CREATE TABLE banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  image TEXT NOT NULL,
  cta_text TEXT,
  cta_link TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Social Media table
CREATE TABLE social_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  followers TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings table
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'image', 'json', 'script')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SEO Meta table
CREATE TABLE seo_meta (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  keywords TEXT,
  og_image TEXT,
  canonical_url TEXT,
  schema_markup TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Static Pages table
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  meta_title TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscribers table
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Click Events table (analytics)
CREATE TABLE click_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  product_name TEXT,
  category TEXT,
  brand TEXT,
  source TEXT,
  device TEXT,
  platform TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity Logs table
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_published ON products(is_published);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_viral ON products(is_viral);
CREATE INDEX idx_products_new ON products(is_new);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_brands_slug ON brands(slug);
CREATE INDEX idx_click_events_created ON click_events(created_at);
CREATE INDEX idx_click_events_product ON click_events(product_id);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read access" ON products FOR SELECT USING (is_published = true);
CREATE POLICY "Admin full access" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public read access" ON brands FOR SELECT USING (true);
CREATE POLICY "Admin full access" ON brands FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public read access" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Public read access" ON banners FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access" ON banners FOR ALL USING (auth.role() = 'authenticated');

-- Default data: categories
INSERT INTO categories (name, slug, description, icon, sort_order, is_active) VALUES
  ('Skincare', 'skincare', 'Produk perawatan kulit wajah dan tubuh', 'Sparkles', 1, true),
  ('Fragrance', 'fragrance', 'Parfum dan wewangian', 'Flower2', 2, true),
  ('Makeup', 'makeup', 'Produk rias wajah dan kosmetik', 'Paintbrush', 3, true),
  ('Body Care', 'bodycare', 'Perawatan tubuh', 'Heart', 4, true),
  ('Hair Care', 'haircare', 'Perawatan rambut', 'Scissors', 5, true),
  ('Fashion', 'fashion', 'Pakaian dan busana muslim', 'Shirt', 6, true),
  ('Bags', 'bags', 'Tas dan aksesoris', 'ShoppingBag', 7, true),
  ('Shoes', 'shoes', 'Sepatu dan alas kaki', 'Footprints', 8, true),
  ('Beauty Tools', 'beautytools', 'Alat kecantikan', 'Wand', 9, true);

-- Default settings
INSERT INTO settings (key, value, type) VALUES
  ('site_name', 'Cekout Yuk Sis', 'text'),
  ('site_description', 'Platform kurasi produk pilihan untuk wanita Indonesia', 'text'),
  ('site_logo', '/logo.svg', 'image'),
  ('site_favicon', '/favicon.ico', 'image');

-- Default admin user (password handled via Supabase Auth)
INSERT INTO users (email, name, role, is_active) VALUES
  ('admin@cekoutyuk.sis', 'Admin Cekout Yuk Sis', 'superadmin', true);
