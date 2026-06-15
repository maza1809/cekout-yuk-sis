import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cekoutyuk.sis"

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/produk`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/kategori`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/brand`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/tentang-kami`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/kebijakan-privasi`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${baseUrl}/syarat-ketentuan`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.3 },
    { url: `${baseUrl}/kontak`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${baseUrl}/sosial-media`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 },
  ]

  const categories = [
    "skincare", "fragrance", "makeup", "bodycare", "haircare",
    "fashion", "bags", "shoes", "beautytools",
  ]

  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/kategori/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const brands = [
    "skintific", "wardah", "emina", "azarine", "scarlett",
    "implora", "make-over", "somethinc", "kahf", "hanasui",
    "luxcrime", "dear-me-beauty",
  ]

  const brandRoutes = brands.map((brand) => ({
    url: `${baseUrl}/brand/${brand}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...categoryRoutes, ...brandRoutes]
}
