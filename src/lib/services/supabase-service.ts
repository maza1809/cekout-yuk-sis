import { supabase } from "@/lib/supabase"
import type {
  Product, Brand, Category, Banner, SocialMedia,
  SiteSetting, SEOData, PageContent, ClickEvent, AdminUser, AnalyticsData, MediaItem
} from "@/types"

export const db = {
  async products(query?: {
    category?: string
    brand?: string
    featured?: boolean
    viral?: boolean
    is_new?: boolean
    published?: boolean
    search?: string
    sort?: string
    limit?: number
  }): Promise<Product[]> {
    if (!supabase) return []
    try {
      let q = supabase.from("products").select("*")
      if (query?.published) q = q.eq("is_published", true)
      if (query?.category) q = q.eq("category_id", query.category)
      if (query?.brand) q = q.eq("brand_id", query.brand)
      if (query?.featured) q = q.eq("is_featured", true)
      if (query?.viral) q = q.eq("is_viral", true)
      if (query?.is_new) q = q.eq("is_new", true)
      if (query?.search) q = q.ilike("name", `%${query.search}%`)
      if (query?.sort === "trending") q = q.order("click_count", { ascending: false })
      else if (query?.sort === "newest") q = q.order("created_at", { ascending: false })
      else if (query?.sort === "recommended") q = q.order("rating", { ascending: false })
      else q = q.order("created_at", { ascending: false })
      if (query?.limit) q = q.limit(query.limit)
      const { data } = await q
      return (data as Product[]) || []
    } catch { return [] }
  },

  async productBySlug(slug: string): Promise<Product | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("products").select("*").eq("slug", slug).single()
      return data as Product | null
    } catch { return null }
  },

  async productById(id: string): Promise<Product | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("products").select("*").eq("id", id).single()
      return data as Product | null
    } catch { return null }
  },

  async upsertProduct(product: Partial<Product> & { id?: string }): Promise<Product | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("products").upsert(product).select().single()
      return data as Product | null
    } catch { return null }
  },

  async deleteProduct(id: string): Promise<boolean> {
    if (!supabase) return false
    try {
      const { error } = await supabase.from("products").delete().eq("id", id)
      return !error
    } catch { return false }
  },

  async categories(activeOnly = true): Promise<Category[]> {
    if (!supabase) return []
    try {
      let q = supabase.from("categories").select("*").order("sort_order", { ascending: true })
      if (activeOnly) q = q.eq("is_active", true)
      const { data } = await q
      return (data as Category[]) || []
    } catch { return [] }
  },

  async categoryBySlug(slug: string): Promise<Category | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("categories").select("*").eq("slug", slug).single()
      return data as Category | null
    } catch { return null }
  },

  async upsertCategory(category: Partial<Category> & { id?: string }): Promise<Category | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("categories").upsert(category).select().single()
      return data as Category | null
    } catch { return null }
  },

  async deleteCategory(id: string): Promise<boolean> {
    if (!supabase) return false
    try {
      const { error } = await supabase.from("categories").delete().eq("id", id)
      return !error
    } catch { return false }
  },

  async brands(featuredOnly = false): Promise<Brand[]> {
    if (!supabase) return []
    try {
      let q = supabase.from("brands").select("*").order("name", { ascending: true })
      if (featuredOnly) q = q.eq("is_featured", true)
      const { data } = await q
      const brands = (data as Brand[]) || []

      const { data: products } = await supabase
        .from("products")
        .select("brand_id")
        .eq("is_published", true)

      if (products) {
        const counts: Record<string, number> = {}
        products.forEach((p: { brand_id: string }) => {
          counts[p.brand_id] = (counts[p.brand_id] || 0) + 1
        })
        return brands.map((b) => ({
          ...b,
          product_count: counts[b.id] || 0,
        }))
      }

      return brands
    } catch { return [] }
  },

  async brandBySlug(slug: string): Promise<Brand | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("brands").select("*").eq("slug", slug).single()
      return data as Brand | null
    } catch { return null }
  },

  async upsertBrand(brand: Partial<Brand> & { id?: string }): Promise<Brand | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("brands").upsert(brand).select().single()
      return data as Brand | null
    } catch { return null }
  },

  async deleteBrand(id: string): Promise<boolean> {
    if (!supabase) return false
    try {
      const { error } = await supabase.from("brands").delete().eq("id", id)
      return !error
    } catch { return false }
  },

  async banners(activeOnly = true): Promise<Banner[]> {
    if (!supabase) return []
    try {
      let q = supabase.from("banners").select("*").order("sort_order", { ascending: true })
      if (activeOnly) q = q.eq("is_active", true)
      const { data } = await q
      return (data as Banner[]) || []
    } catch { return [] }
  },

  async upsertBanner(banner: Partial<Banner> & { id?: string }): Promise<Banner | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("banners").upsert(banner).select().single()
      return data as Banner | null
    } catch { return null }
  },

  async deleteBanner(id: string): Promise<boolean> {
    if (!supabase) return false
    try {
      const { error } = await supabase.from("banners").delete().eq("id", id)
      return !error
    } catch { return false }
  },

  async socialMedia(activeOnly = true): Promise<SocialMedia[]> {
    if (!supabase) return []
    try {
      let q = supabase.from("social_media").select("*").order("sort_order", { ascending: true })
      if (activeOnly) q = q.eq("is_active", true)
      const { data } = await q
      return (data as SocialMedia[]) || []
    } catch { return [] }
  },

  async upsertSocialMedia(item: Partial<SocialMedia> & { id?: string }): Promise<SocialMedia | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("social_media").upsert(item).select().single()
      return data as SocialMedia | null
    } catch { return null }
  },

  async deleteSocialMedia(id: string): Promise<boolean> {
    if (!supabase) return false
    try {
      const { error } = await supabase.from("social_media").delete().eq("id", id)
      return !error
    } catch { return false }
  },

  async settings(): Promise<SiteSetting[]> {
    if (!supabase) return []
    try {
      const { data } = await supabase.from("settings").select("*")
      return (data as SiteSetting[]) || []
    } catch { return [] }
  },

  async getSetting(key: string): Promise<SiteSetting | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("settings").select("*").eq("key", key).single()
      return data as SiteSetting | null
    } catch { return null }
  },

  async upsertSetting(setting: Partial<SiteSetting> & { id?: string }): Promise<SiteSetting | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("settings").upsert(setting).select().single()
      return data as SiteSetting | null
    } catch { return null }
  },

  async seoMeta(): Promise<SEOData[]> {
    if (!supabase) return []
    try {
      const { data } = await supabase.from("seo_meta").select("*")
      return (data as SEOData[]) || []
    } catch { return [] }
  },

  async getSeoMeta(page: string): Promise<SEOData | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("seo_meta").select("*").eq("page", page).single()
      return data as SEOData | null
    } catch { return null }
  },

  async upsertSeoMeta(seo: Partial<SEOData> & { id?: string }): Promise<SEOData | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("seo_meta").upsert(seo).select().single()
      return data as SEOData | null
    } catch { return null }
  },

  async pages(publishedOnly = true): Promise<PageContent[]> {
    if (!supabase) return []
    try {
      let q = supabase.from("pages").select("*").order("created_at", { ascending: false })
      if (publishedOnly) q = q.eq("is_published", true)
      const { data } = await q
      return (data as PageContent[]) || []
    } catch { return [] }
  },

  async pageBySlug(slug: string): Promise<PageContent | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("pages").select("*").eq("slug", slug).single()
      return data as PageContent | null
    } catch { return null }
  },

  async upsertPage(page: Partial<PageContent> & { id?: string }): Promise<PageContent | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("pages").upsert(page).select().single()
      return data as PageContent | null
    } catch { return null }
  },

  async deletePage(id: string): Promise<boolean> {
    if (!supabase) return false
    try {
      const { error } = await supabase.from("pages").delete().eq("id", id)
      return !error
    } catch { return false }
  },

  async subscribers(): Promise<{ email: string; subscribed_at: string }[]> {
    if (!supabase) return []
    try {
      const { data } = await supabase.from("subscribers").select("email, subscribed_at").order("subscribed_at", { ascending: false })
      return (data || []) as { email: string; subscribed_at: string }[]
    } catch { return [] }
  },

  async addSubscriber(email: string): Promise<boolean> {
    if (!supabase) return false
    try {
      const { error } = await supabase.from("subscribers").insert({ email })
      return !error || error.code === "23505"
    } catch { return false }
  },

  async deleteSubscriber(email: string): Promise<boolean> {
    if (!supabase) return false
    try {
      const { error } = await supabase.from("subscribers").delete().eq("email", email)
      return !error
    } catch { return false }
  },

  async clickEvents(): Promise<ClickEvent[]> {
    if (!supabase) return []
    try {
      const { data } = await supabase.from("click_events").select("*").order("created_at", { ascending: false })
      return (data as ClickEvent[]) || []
    } catch { return [] }
  },

  async logClick(event: Partial<ClickEvent>): Promise<boolean> {
    if (!supabase) return false
    try {
      const { error } = await supabase.from("click_events").insert(event)
      return !error
    } catch { return false }
  },

  async getAnalytics(): Promise<AnalyticsData | null> {
    if (!supabase) return null
    try {
      const { data: events } = await supabase.from("click_events").select("*")
      if (!events) return null
      const typed = events as ClickEvent[]
      const categoryCount: Record<string, number> = {}
      const brandCount: Record<string, number> = {}
      const sourceCount: Record<string, number> = {}
      const deviceCount: Record<string, number> = {}
      const productCount: Record<string, number> = {}
      const dateCount: Record<string, number> = {}
      typed.forEach((e) => {
        if (e.category) categoryCount[e.category] = (categoryCount[e.category] || 0) + 1
        if (e.brand) brandCount[e.brand] = (brandCount[e.brand] || 0) + 1
        if (e.source) sourceCount[e.source] = (sourceCount[e.source] || 0) + 1
        if (e.device) deviceCount[e.device] = (deviceCount[e.device] || 0) + 1
        if (e.product_name) productCount[e.product_name] = (productCount[e.product_name] || 0) + 1
        if (e.created_at) {
          const day = e.created_at.split("T")[0]
          dateCount[day] = (dateCount[day] || 0) + 1
        }
      })
      return {
        total_clicks: typed.length,
        popular_products: Object.entries(productCount).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, clicks]) => ({ name, clicks })),
        popular_categories: Object.entries(categoryCount).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, clicks]) => ({ name, clicks })),
        popular_brands: Object.entries(brandCount).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([name, clicks]) => ({ name, clicks })),
        traffic_sources: Object.entries(sourceCount).map(([source, count]) => ({ source, count })),
        devices: Object.entries(deviceCount).map(([device, count]) => ({ device, count })),
        clicks_by_date: Object.entries(dateCount).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)),
      }
    } catch { return null }
  },

  async adminUsers(): Promise<AdminUser[]> {
    if (!supabase) return []
    try {
      const { data } = await supabase.from("users").select("*")
      return (data as AdminUser[]) || []
    } catch { return [] }
  },

  async upsertAdminUser(user: Partial<AdminUser> & { id?: string }): Promise<AdminUser | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("users").upsert(user).select().single()
      return data as AdminUser | null
    } catch { return null }
  },

  async deleteAdminUser(id: string): Promise<boolean> {
    if (!supabase) return false
    try {
      const { error } = await supabase.from("users").delete().eq("id", id)
      return !error
    } catch { return false }
  },

  async recordClick(
    productId: string,
    productName: string,
    category: string,
    brand: string,
    source: string,
    device: string,
    platform: string
  ): Promise<void> {
    if (!supabase) return
    try {
      await supabase.from("click_events").insert({
        product_id: productId,
        product_name: productName,
        category, brand, source, device, platform,
      })
      await supabase.rpc("increment_click_count", { row_id: productId }).then(() => {})
    } catch { /* silent */ }
  },

  async media(): Promise<MediaItem[]> {
    if (!supabase) return []
    try {
      const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false })
      return (data as MediaItem[]) || []
    } catch { return [] }
  },

  async upsertMedia(item: Partial<MediaItem> & { id?: string }): Promise<MediaItem | null> {
    if (!supabase) return null
    try {
      const { data } = await supabase.from("media").upsert(item).select().single()
      return data as MediaItem | null
    } catch { return null }
  },

  async deleteMedia(id: string): Promise<boolean> {
    if (!supabase) return false
    try {
      const { error } = await supabase.from("media").delete().eq("id", id)
      return !error
    } catch { return false }
  },
}
