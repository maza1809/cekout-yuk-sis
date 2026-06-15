"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animations"
import {
  HeroSection,
  BannerSection,
  CategoriesSection,
  NewProducts,
  TrendingProducts,
  BrandsSection,
} from "@/components/home"
import type { Product } from "@/types"
import { db } from "@/lib/services/supabase-service"

const demoProducts: Product[] = [
  {
    id: "1",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-06-01T00:00:00Z",
    name: "Skintific 5X Ceramide Moisturizer",
    slug: "skintific-5x-ceramide-moisturizer",
    brand_id: "skintific",
    category_id: "skincare",
    description: "Moisturizer dengan 5X Ceramide untuk memperbaiki skin barrier",
    benefits: "Melembabkan, memperbaiki skin barrier, menenangkan kulit",
    how_to_use: "Oleskan pada wajah setelah toner dan serum",
    specifications: "30ml | Skintific | Korea",
    price: 89000,
    original_price: 119000,
    rating: 4.8,
    review_count: 15230,
    images: ["/products/skintific-moisturizer.jpg"],
    affiliate_url: "https://shopee.co.id/skintific-moisturizer",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: true,
    is_viral: true,
    is_new: false,
    viral_score: 95,
    tags: ["skincare", "moisturizer", "ceramide"],
    click_count: 45200,
  },
  {
    id: "2",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-06-01T00:00:00Z",
    name: "Wardah Perfect Bright Moisturizer",
    slug: "wardah-perfect-bright-moisturizer",
    brand_id: "wardah",
    category_id: "skincare",
    description: "Moisturizer pencerah wajah dengan Vitamin C",
    benefits: "Mencerahkan, melembabkan, meratakan warna kulit",
    how_to_use: "Aplikasikan setiap pagi dan malam",
    specifications: "30ml | Wardah | Indonesia",
    price: 45000,
    original_price: 55000,
    rating: 4.6,
    review_count: 23450,
    images: ["/products/wardah-bright.jpg"],
    affiliate_url: "https://shopee.co.id/wardah-bright",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: true,
    is_viral: true,
    is_new: false,
    viral_score: 88,
    tags: ["skincare", "moisturizer", "brightening"],
    click_count: 32100,
  },
  {
    id: "3",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-06-01T00:00:00Z",
    name: "Emina Bright Stuff Face Wash",
    slug: "emina-bright-stuff-face-wash",
    brand_id: "emina",
    category_id: "skincare",
    description: "Sabun cuci muka yang bikin wajah cerah alami",
    benefits: "Membersihkan, mencerahkan, wajah terasa segar",
    how_to_use: "Gunakan setiap pagi dan malam",
    specifications: "100ml | Emina | Indonesia",
    price: 25000,
    rating: 4.5,
    review_count: 42100,
    images: ["/products/emina-facewash.jpg"],
    affiliate_url: "https://shopee.co.id/emina-facewash",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: true,
    is_viral: false,
    is_new: false,
    viral_score: 60,
    tags: ["skincare", "facewash", "brightening"],
    click_count: 28900,
  },
  {
    id: "4",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-06-01T00:00:00Z",
    name: "Azarine Sunscreen SPF 45",
    slug: "azarine-sunscreen-spf-45",
    brand_id: "azarine",
    category_id: "skincare",
    description: "Sunscreen ringan dengan SPF 45 PA+++",
    benefits: "Melindungi dari sinar UV, ringan, tidak lengket",
    how_to_use: "Oleskan 15 menit sebelum beraktivitas di luar",
    specifications: "30ml | Azarine | Indonesia",
    price: 35000,
    rating: 4.7,
    review_count: 38900,
    images: ["/products/azarine-sunscreen.jpg"],
    affiliate_url: "https://shopee.co.id/azarine-sunscreen",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: true,
    is_viral: true,
    is_new: false,
    viral_score: 91,
    tags: ["sunscreen", "skincare", "spf"],
    click_count: 36700,
  },
  {
    id: "5",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-06-01T00:00:00Z",
    name: "Scarlett Whitening Body Lotion",
    slug: "scarlett-whitening-body-lotion",
    brand_id: "scarlett",
    category_id: "bodycare",
    description: "Body lotion pemutih dengan Glutathione",
    benefits: "Memutihkan, melembabkan, wangi tahan lama",
    how_to_use: "Oleskan setelah mandi",
    specifications: "250ml | Scarlett | Indonesia",
    price: 55000,
    original_price: 70000,
    rating: 4.6,
    review_count: 56700,
    images: ["/products/scarlett-lotion.jpg"],
    affiliate_url: "https://shopee.co.id/scarlett-lotion",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: false,
    is_viral: true,
    is_new: false,
    viral_score: 93,
    tags: ["bodycare", "whitening", "lotion"],
    click_count: 52300,
  },
  {
    id: "6",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-06-01T00:00:00Z",
    name: "Somethinc Niacinamide Serum",
    slug: "somethinc-niacinamide-serum",
    brand_id: "somethinc",
    category_id: "skincare",
    description: "Serum Niacinamide 10% untuk kulit berminyak",
    benefits: "Mengecilkan pori, mengurangi minyak, mencerahkan",
    how_to_use: "Oleskan 3 tetes setelah toner",
    specifications: "20ml | Somethinc | Indonesia",
    price: 75000,
    rating: 4.7,
    review_count: 29800,
    images: ["/products/somethinc-niacinamide.jpg"],
    affiliate_url: "https://shopee.co.id/somethinc-niacinamide",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: false,
    is_viral: false,
    is_new: true,
    viral_score: 72,
    tags: ["serum", "niacinamide", "skincare"],
    click_count: 19800,
  },
  {
    id: "7",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-06-01T00:00:00Z",
    name: "Implora Lip Cream Matte",
    slug: "implora-lip-cream-matte",
    brand_id: "implora",
    category_id: "makeup",
    description: "Lip cream matte tahan lama dengan berbagai shade cantik",
    benefits: "Tahan lama, tidak bikin kering, warna pigmented",
    how_to_use: "Oleskan pada bibir yang bersih",
    specifications: "4ml | Implora | Indonesia",
    price: 18000,
    original_price: 25000,
    rating: 4.4,
    review_count: 67800,
    images: ["/products/implora-lipcream.jpg"],
    affiliate_url: "https://shopee.co.id/implora-lipcream",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: false,
    is_viral: false,
    is_new: true,
    viral_score: 45,
    tags: ["makeup", "lipcream", "matte"],
    click_count: 41200,
  },
  {
    id: "8",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-06-01T00:00:00Z",
    name: "Make Over Longwear Foundation",
    slug: "make-over-longwear-foundation",
    brand_id: "make-over",
    category_id: "makeup",
    description: "Foundation full coverage tahan seharian",
    benefits: "Full coverage, tahan lama, smooth finish",
    how_to_use: "Aplikasikan dengan beauty blender atau brush",
    specifications: "30ml | Make Over | Indonesia",
    price: 125000,
    rating: 4.5,
    review_count: 18700,
    images: ["/products/makeover-foundation.jpg"],
    affiliate_url: "https://shopee.co.id/makeover-foundation",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: false,
    is_viral: false,
    is_new: true,
    viral_score: 55,
    tags: ["makeup", "foundation", "coverage"],
    click_count: 15600,
  },
  {
    id: "9",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-06-01T00:00:00Z",
    name: "Hanasui Lip Tint Glow",
    slug: "hanasui-lip-tint-glow",
    brand_id: "hanasui",
    category_id: "makeup",
    description: "Lip tint dengan efek glow natural",
    benefits: "Warna natural, glow, tahan lama",
    how_to_use: "Oleskan pada bibir secara merata",
    specifications: "5ml | Hanasui | Indonesia",
    price: 15000,
    rating: 4.3,
    review_count: 89100,
    images: ["/products/hanasui-liptint.jpg"],
    affiliate_url: "https://shopee.co.id/hanasui-liptint",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: false,
    is_viral: true,
    is_new: false,
    viral_score: 87,
    tags: ["makeup", "liptint", "glow"],
    click_count: 59800,
  },
  {
    id: "10",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-06-01T00:00:00Z",
    name: "Luxcrime Setting Spray",
    slug: "luxcrime-setting-spray",
    brand_id: "luxcrime",
    category_id: "beautytools",
    description: "Setting spray untuk makeup tahan seharian",
    benefits: "Membuat makeup tahan lama, menyegarkan wajah",
    how_to_use: "Semprotkan ke wajah dari jarak 20cm setelah makeup",
    specifications: "100ml | Luxcrime | Indonesia",
    price: 42000,
    rating: 4.6,
    review_count: 12500,
    images: ["/products/luxcrime-setting-spray.jpg"],
    affiliate_url: "https://shopee.co.id/luxcrime-setting-spray",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: false,
    is_viral: false,
    is_new: true,
    viral_score: 48,
    tags: ["makeup", "setting spray", "beautytools"],
    click_count: 9800,
  },
]

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(demoProducts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await db.products({ published: true })
        if (data && data.length > 0) {
          setProducts(data)
        }
      } catch {
        console.error("Failed to fetch products from Supabase")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const newestProducts = useMemo(() => {
    return [...products].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  }, [products])

  const newProducts = useMemo(() =>
    newestProducts.slice(0, 4).map((p) => ({ ...p, is_new: true })),
    [newestProducts]
  )

  const trending = useMemo(() =>
    [...products].sort((a, b) => b.click_count - a.click_count),
    [products]
  )
  const trendingProducts = useMemo(() => trending.slice(0, 4), [trending])

  const topTrendingIds = useMemo(() => {
    return new Set(
      [...products]
        .sort((a, b) => b.click_count - a.click_count)
        .slice(0, 12)
        .map((p) => p.id)
    )
  }, [products])

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <HeroSection />
      <BannerSection />
      <CategoriesSection />

      <TrendingProducts
        title="Sedang Trending"
        subtitle="Produk paling populer dan paling banyak diburu"
        products={trendingProducts}
        isTrending
      />
      <BrandsSection />
      <div className="pb-20">
        <NewProducts
          title="Produk Baru"
          subtitle="Rekomendasi produk terbaru buat kamu coba"
          products={newProducts}
          isTrending
        />
      </div>
    </motion.div>
  )
}
