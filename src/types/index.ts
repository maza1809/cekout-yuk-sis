export interface Product {
  id: string
  created_at: string
  updated_at: string
  name: string
  slug: string
  brand_id: string
  category_id: string
  description: string
  benefits: string
  how_to_use: string
  specifications: string
  price: number
  original_price?: number
  rating: number
  review_count: number
  images: string[]
  gallery_images?: string[]
  affiliate_url: string
  affiliate_platform: "shopee" | "other"
  is_published: boolean
  is_featured: boolean
  is_viral: boolean
  is_new: boolean
  viral_score: number
  tags: string[]
  click_count: number
  store_name?: string
  items_sold?: number
  last_synced?: string
}

export interface ScrapedProduct {
  name: string
  slug: string
  description: string
  price: number
  original_price?: number
  rating: number
  review_count: number
  items_sold: number
  store_name: string
  images: string[]
  gallery_images: string[]
  specifications: string
  tags: string[]
  category_id: string
  brand_id: string
}

export interface Brand {
  id: string
  created_at: string
  updated_at: string
  name: string
  slug: string
  logo: string
  description: string
  categories: string[]
  is_featured: boolean
  click_count: number
  product_count?: number
  shopee_url?: string
}

export interface Category {
  id: string
  created_at: string
  updated_at: string
  name: string
  slug: string
  description: string
  image: string
  icon: string
  is_active: boolean
  sort_order: number
  productCount?: number
}

export interface Banner {
  id: string
  created_at: string
  updated_at: string
  title: string
  subtitle: string
  image: string
  cta_text: string
  cta_link: string
  sort_order: number
  is_active: boolean
}

export interface SocialMedia {
  id: string
  platform: string
  url: string
  icon: string
  followers?: string
  description: string
  is_active: boolean
  sort_order: number
  created_at?: string
  updated_at?: string
}

export interface SiteSetting {
  id: string
  key: string
  value: string
  type: "text" | "image" | "json" | "script"
}

export interface SEOData {
  id: string
  page: string
  title: string
  description: string
  keywords: string
  og_image: string
  canonical_url: string
  schema_markup: string
}

export interface PageContent {
  id: string
  slug: string
  title: string
  content: string
  meta_title: string
  meta_description: string
  is_published: boolean
}

export interface ClickEvent {
  id: string
  product_id: string
  product_name: string
  category: string
  brand: string
  source: string
  device: string
  platform: string
  created_at: string
}

export interface AnalyticsData {
  total_clicks: number
  popular_products: { name: string; clicks: number }[]
  popular_categories: { name: string; clicks: number }[]
  popular_brands: { name: string; clicks: number }[]
  traffic_sources: { source: string; count: number }[]
  devices: { device: string; count: number }[]
  clicks_by_date: { date: string; count: number }[]
}

export interface AdminUser {
  id: string
  email: string
  name: string
  avatar?: string
  role: "superadmin" | "admin"
  is_active: boolean
  created_at: string
}

export interface MediaItem {
  id: string
  name: string
  url: string
  size: string
  type: string
  created_at: string
}

export type SortOption =
  | "newest"
  | "trending"
  | "recommended"
  | "price_asc"
  | "price_desc"
