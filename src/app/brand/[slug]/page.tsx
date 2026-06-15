"use client"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animations"
import {
  ShoppingBag,
  Eye,
  Share2,
  ChevronLeft,
  Home,
  Check,
  Package,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ProductCard } from "@/components/shared/product-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useBrands } from "@/contexts/brand-context"
import { db } from "@/lib/services/supabase-service"
import type { Product } from "@/types"

const demoProducts: Product[] = [
  {
    id: "p1", created_at: "2025-06-10T10:00:00Z", updated_at: "2025-06-15T10:00:00Z", name: "Azarine Hydrasoothe Sunscreen SPF45 PA+++", slug: "azarine-hydrasoothe-sunscreen",
    description: "Tabir surya ringan dengan Hydrasoothe Technology yang memberikan perlindungan maksimal tanpa meninggalkan whitecast.",
    benefits: "Melindungi dari sinar UV, melembabkan, tidak meninggalkan whitecast",
    how_to_use: "Oleskan secara merata pada wajah dan leher 15 menit sebelum beraktivitas di luar ruangan.",
    specifications: "SPF45 PA+++",
    price: 45000, original_price: 55000, rating: 4.8, review_count: 2340, images: [""], affiliate_url: "", affiliate_platform: "shopee",
    is_published: true, is_featured: true, is_viral: true, is_new: false, viral_score: 95, tags: ["sunscreen", "spf", "skincare"], category_id: "skincare", brand_id: "azarine", click_count: 8700,
  },
  {
    id: "p2", created_at: "2025-06-09T10:00:00Z", updated_at: "2025-06-14T10:00:00Z", name: "Skin Game Barrier Moisturizer", slug: "skin-game-barrier-moisturizer",
    description: "Moisturizer dengan kandungan Ceramide 5X untuk memperbaiki skin barrier dan melembabkan hingga ke lapisan kulit terdalam.",
    benefits: "Memperbaiki skin barrier, melembabkan intensif, menenangkan iritasi",
    how_to_use: "Aplikasikan pada wajah yang telah dibersihkan, pagi dan malam hari.",
    specifications: "50ml",
    price: 65000, original_price: 79000, rating: 4.7, review_count: 1890, images: [""], affiliate_url: "", affiliate_platform: "shopee",
    is_published: true, is_featured: true, is_viral: false, is_new: false, viral_score: 78, tags: ["moisturizer", "ceramide", "skincare"], category_id: "skincare", brand_id: "skintific", click_count: 6500,
  },
  {
    id: "p3", created_at: "2025-06-08T10:00:00Z", updated_at: "2025-06-13T10:00:00Z", name: "Wardah Lightening Serum", slug: "wardah-lightening-serum",
    description: "Serum pencerah wajah dengan kandungan Vitamin C dan Niacinamide untuk kulit tampak lebih cerah dan merata.",
    benefits: "Mencerahkan kulit, menyamarkan noda hitam, meratakan warna kulit",
    how_to_use: "Teteskan 2-3 tetes serum, lalu ratakan ke seluruh wajah setelah toner.",
    specifications: "20ml",
    price: 55000, original_price: 65000, rating: 4.6, review_count: 1560, images: [""], affiliate_url: "", affiliate_platform: "shopee",
    is_published: true, is_featured: true, is_viral: true, is_new: false, viral_score: 88, tags: ["serum", "vitamin c", "brightening"], category_id: "skincare", brand_id: "wardah", click_count: 7200,
  },
  {
    id: "p4", created_at: "2025-06-07T10:00:00Z", updated_at: "2025-06-12T10:00:00Z", name: "Emina Bright Stuff Face Mist", slug: "emina-bright-stuff-face-mist",
    description: "Face mist dengan kandungan Vitamin C yang menyegarkan dan membantu mencerahkan wajah.",
    benefits: "Menyegarkan wajah, mencerahkan, melembabkan",
    how_to_use: "Semprotkan ke wajah dari jarak 20cm, kapan saja saat wajah terasa kusam atau lelah.",
    specifications: "60ml",
    price: 28000, original_price: 35000, rating: 4.5, review_count: 2100, images: [""], affiliate_url: "", affiliate_platform: "shopee",
    is_published: true, is_featured: false, is_viral: false, is_new: true, viral_score: 62, tags: ["face mist", "vitamin c", "skincare"], category_id: "skincare", brand_id: "emina", click_count: 4300,
  },
  {
    id: "p5", created_at: "2025-06-06T10:00:00Z", updated_at: "2025-06-11T10:00:00Z", name: "Scarlett Brightly Body Lotion", slug: "scarlett-brightly-body-lotion",
    description: "Body lotion dengan Glutathione dan Vitamin E yang mencerahkan dan melembabkan kulit tubuh.",
    benefits: "Mencerahkan kulit tubuh, melembabkan, menyamarkan bekas luka",
    how_to_use: "Oleskan ke seluruh tubuh setelah mandi, pijat lembut hingga meresap.",
    specifications: "300ml",
    price: 42000, original_price: 52000, rating: 4.7, review_count: 3200, images: [""], affiliate_url: "", affiliate_platform: "shopee",
    is_published: true, is_featured: true, is_viral: false, is_new: false, viral_score: 60, tags: ["body lotion", "brightening", "bodycare"], category_id: "bodycare", brand_id: "scarlett", click_count: 9800,
  },
  {
    id: "p6", created_at: "2025-06-05T10:00:00Z", updated_at: "2025-06-10T10:00:00Z", name: "Implora Lip Cream Glossy", slug: "implora-lip-cream-glossy",
    description: "Lip cream dengan hasil akhir glossy yang nyaman di bibir dan tidak lengket.",
    benefits: "Warna intens, glossy, tahan lama, melembabkan bibir",
    how_to_use: "Aplikasikan ke bibir secara merata, tunggu beberapa detik hingga set.",
    specifications: "4ml",
    price: 15000, original_price: 20000, rating: 4.4, review_count: 4500, images: [""], affiliate_url: "", affiliate_platform: "shopee",
    is_published: true, is_featured: true, is_viral: true, is_new: false, viral_score: 91, tags: ["lip cream", "glossy", "makeup"], category_id: "makeup", brand_id: "implora", click_count: 15000,
  },
  {
    id: "p7", created_at: "2025-06-04T10:00:00Z", updated_at: "2025-06-09T10:00:00Z", name: "Make Over Powerstay Lip Cream", slug: "make-over-powerstay-lip-cream",
    description: "Lip cream matte dengan ketahanan hingga 12 jam, tidak transfer dan nyaman di bibir.",
    benefits: "Tahan lama, tidak transfer, matte, pigmented",
    how_to_use: "Oleskan pada bibir yang bersih, ratakan menggunakan aplikator.",
    specifications: "5ml",
    price: 68000, original_price: 85000, rating: 4.6, review_count: 1200, images: [""], affiliate_url: "", affiliate_platform: "shopee",
    is_published: true, is_featured: false, is_viral: true, is_new: false, viral_score: 93, tags: ["lip cream", "matte", "long lasting"], category_id: "makeup", brand_id: "make-over", click_count: 5600,
  },
  {
    id: "p8", created_at: "2025-06-03T10:00:00Z", updated_at: "2025-06-08T10:00:00Z", name: "Somethinc Niacinamide Moisturizer", slug: "somethinc-niacinamide-moisturizer",
    description: "Moisturizer dengan kandungan Niacinamide 5% yang membantu menyamarkan pori-pori dan mengontrol minyak.",
    benefits: "Menyamarkan pori, mengontrol minyak, melembabkan",
    how_to_use: "Ambil secukupnya, aplikasikan ke wajah secara merata setelah serum.",
    specifications: "30g",
    price: 75000, original_price: 90000, rating: 4.5, review_count: 980, images: [""], affiliate_url: "", affiliate_platform: "shopee",
    is_published: true, is_featured: false, is_viral: false, is_new: true, viral_score: 45, tags: ["moisturizer", "niacinamide", "skincare"], category_id: "skincare", brand_id: "somethinc", click_count: 3800,
  },
  {
    id: "p9", created_at: "2025-06-02T10:00:00Z", updated_at: "2025-06-07T10:00:00Z", name: "Kahf Face Wash Oil Control", slug: "kahf-face-wash-oil-control",
    description: "Face wash dengan kandungan Salicylic Acid dan Tea Tree untuk mengontrol minyak berlebih.",
    benefits: "Mengontrol minyak, mencegah jerawat, menyegarkan wajah",
    how_to_use: "Basahi wajah, tuangkan secukupnya, gosok perlahan lalu bilas dengan air.",
    specifications: "100ml",
    price: 25000, original_price: 32000, rating: 4.4, review_count: 1800, images: [""], affiliate_url: "", affiliate_platform: "shopee",
    is_published: true, is_featured: false, is_viral: false, is_new: true, viral_score: 55, tags: ["face wash", "oil control", "skincare"], category_id: "skincare", brand_id: "kahf", click_count: 6200,
  },
  {
    id: "p10", created_at: "2025-06-01T10:00:00Z", updated_at: "2025-06-06T10:00:00Z", name: "Hanasui Lip Tint Glow", slug: "hanasui-lip-tint-glow",
    description: "Lip tint dengan hasil glow natural yang memberikan warna segar di bibir sepanjang hari.",
    benefits: "Warna natural, glow, tahan lama, tidak kering",
    how_to_use: "Oleskan ke bibir secara merata, bisa digunakan sendiri atau sebagai base lipstick.",
    specifications: "3.5ml",
    price: 12000, original_price: 18000, rating: 4.3, review_count: 6700, images: [""], affiliate_url: "", affiliate_platform: "shopee",
    is_published: true, is_featured: true, is_viral: false, is_new: true, viral_score: 72, tags: ["lip tint", "glow", "makeup"], category_id: "makeup", brand_id: "hanasui", click_count: 22000,
  },
  {
    id: "p11", created_at: "2025-05-30T10:00:00Z", updated_at: "2025-06-05T10:00:00Z", name: "Luxcrime Setting Spray Matte", slug: "luxcrime-setting-spray-matte",
    description: "Setting spray dengan hasil akhir matte yang membuat makeup tahan lama hingga 12 jam.",
    benefits: "Makeup tahan lama, hasil matte, mengontrol minyak",
    how_to_use: "Semprotkan ke wajah dari jarak 20-30cm setelah selesai makeup.",
    specifications: "100ml",
    price: 35000, original_price: 45000, rating: 4.5, review_count: 2100, images: [""], affiliate_url: "", affiliate_platform: "shopee",
    is_published: true, is_featured: false, is_viral: true, is_new: false, viral_score: 87, tags: ["setting spray", "matte", "makeup"], category_id: "makeup", brand_id: "luxcrime", click_count: 8200,
  },
  {
    id: "p12", created_at: "2025-05-28T10:00:00Z", updated_at: "2025-06-04T10:00:00Z", name: "Dear Me Beauty Lip Mask", slug: "dear-me-beauty-lip-mask",
    description: "Lip mask dengan kandungan Shea Butter dan Vitamin E yang melembabkan bibir secara intensif saat tidur.",
    benefits: "Melembabkan intensif, memperbaiki bibir kering, nyaman dipakai tidur",
    how_to_use: "Oleskan tipis-tipis ke bibir sebelum tidur, bilas keesokan paginya.",
    specifications: "20g",
    price: 22000, original_price: 28000, rating: 4.6, review_count: 1400, images: [""], affiliate_url: "", affiliate_platform: "shopee",
    is_published: true, is_featured: false, is_viral: false, is_new: true, viral_score: 48, tags: ["lip mask", "lip care", "skincare"], category_id: "skincare", brand_id: "dear-me-beauty", click_count: 2900,
  },
]

const tabs = [
  { id: "all", label: "Semua Produk" },
] as const

type TabId = (typeof tabs)[number]["id"]

export default function BrandDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { brands } = useBrands()
  const [activeTab, setActiveTab] = useState<TabId>("all")
  const [copied, setCopied] = useState(false)
  const [products, setProducts] = useState<Product[]>(demoProducts)

  useEffect(() => {
    async function fetchData() {
      const data = await db.products({ published: true })
      if (data && data.length > 0) setProducts(data)
    }
    fetchData()
  }, [])

  const brand = brands.find((b) => b.slug === slug)

  const newestProductIds = useMemo(() => {
    return new Set(
      [...products]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 12)
        .map((p) => p.id)
    )
  }, [products])

  const topTrendingIds = useMemo(() => {
    return new Set(
      [...products]
        .sort((a, b) => b.click_count - a.click_count)
        .slice(0, 12)
        .map((p) => p.id)
    )
  }, [products])

  const brandProducts = products.filter((p) => p.brand_id === slug).map((p) => ({
    ...p,
    is_new: newestProductIds.has(p.id),
  }))

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: brand?.name, url })
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const gradients = [
    "from-pink-500 to-rose-500",
    "from-purple-500 to-indigo-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-blue-500 to-cyan-500",
    "from-violet-500 to-purple-500",
    "from-amber-500 to-yellow-500",
    "from-lime-500 to-green-500",
  ]

  if (!brand) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h1 className="mt-4 text-2xl font-bold">Brand Tidak Ditemukan</h1>
          <p className="mt-2 text-muted-foreground">
            Brand dengan nama tersebut tidak ditemukan.
          </p>
          <Button asChild className="mt-6">
            <Link href="/brand">Kembali ke Brand</Link>
          </Button>
        </div>
      </div>
    )
  }

  const brandIndex = brands.findIndex((b) => b.slug === slug)
  const gradientIndex = brandIndex >= 0 ? brandIndex : 0

  return (
    <div className="min-h-dvh">
      <div className="relative overflow-hidden bg-gradient-to-b from-secondary/30 to-background px-4 pb-8 pt-6 sm:pt-10">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Home className="h-3.5 w-3.5" />
              Beranda
            </Link>
            <span>/</span>
            <Link href="/brand" className="hover:text-foreground transition-colors">Brand</Link>
            <span>/</span>
            <span className="font-medium text-foreground">{brand.name}</span>
          </nav>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div
              className={`flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradients[gradientIndex % gradients.length]} text-4xl font-bold text-white shadow-lg`}
            >
              {brand.name.charAt(0)}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {brand.name}
                  </h1>
                </div>
              </div>

              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                {brand.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span className="font-medium text-foreground">{brand.product_count || 0}</span> Produk
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span className="font-medium text-foreground">{brand.click_count.toLocaleString("id-ID")}</span> Klik
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium text-foreground">{brand.categories.length}</span> Kategori
                </div>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:justify-start">
                {brand.categories.map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs capitalize">
                    {cat}
                  </Badge>
                ))}
              </div>

              {brand.shopee_url && (
                <div className="mt-4 flex justify-center sm:justify-start">
                  <a
                    href={brand.shopee_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Belanja di Shopee
                  </a>
                </div>
              )}
            </div>

            <div className="flex shrink-0 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" />
                    Share Brand
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex border-b">
          {tabs.map((tab) => {
            const productCount = brandProducts.length

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <ShoppingBag className="h-4 w-4" />
                {tab.label}
                <span className="text-xs text-muted-foreground">
                  ({productCount})
                </span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            )
          })}
        </div>

        {activeTab === "all" && (
          <section>
            {brandProducts.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
              >
                {brandProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.05 } },
                    }}
                  >
                    <ProductCard product={product} index={index} isTrending={topTrendingIds.has(product.id)} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-semibold">Belum Ada Produk</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Belum ada produk dari brand ini.
                </p>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}
