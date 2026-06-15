"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Home,
  ChevronLeft,
  ShoppingBag,
  Check,
  Eye,
  MessageCircle,
  X,
  AtSign,
  Link2,
} from "lucide-react"
import { cn, formatPrice } from "@/lib/utils"
import { staggerContainer, fadeInLeft, fadeInRight } from "@/lib/animations"
import { SITE_URL } from "@/lib/constants"
import { type Product } from "@/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { RatingStars } from "@/components/shared/rating-stars"
import { ProductCard } from "@/components/shared/product-card"

const categoryNames: Record<string, string> = {
  skincare: "Skincare",
  fragrance: "Fragrance",
  makeup: "Makeup",
  bodycare: "Body Care",
  haircare: "Hair Care",
  fashion: "Fashion",
  bags: "Tas",
  shoes: "Sepatu",
  beautytools: "Beauty Tools",
}

const demoProducts: Product[] = [
  {
    id: "detail-1",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-06-10T00:00:00Z",
    name: "Skintific 5X Ceramide Moisturizer",
    slug: "skintific-5x-ceramide-moisturizer",
    brand_id: "Skintific",
    category_id: "skincare",
    description:
      "Skintific 5X Ceramide Moisturizer adalah pelembap wajah dengan teknologi 5X Ceramide Complex yang bekerja secara sinergis untuk memperbaiki dan memperkuat skin barrier. Diperkaya dengan Ceramide, Niacinamide, dan Peptide, moisturizer ini memberikan hidrasi intensif sekaligus melindungi kulit dari kerusakan akibat faktor lingkungan. Cocok untuk semua jenis kulit, termasuk kulit sensitif dan berjerawat.",
    benefits:
      "Memperbaiki skin barrier yang rusak\nMengunci kelembaban hingga 72 jam\nMenenangkan kulit yang iritasi dan merah\nMencerahkan kulit dengan Niacinamide\nMengecilkan tampilan pori-pori\nTekstur ringan, cepat meresap tanpa lengket",
    how_to_use:
      "Ambil moisturizer secukupnya (sebesar biji jagung)\nHangatkan di ujung jari untuk aktivasi formula\nOleskan secara merata ke seluruh wajah setelah penggunaan toner dan serum\nTepuk-tepuk lembut hingga meresap sempurna\nGunakan setiap pagi dan malam hari untuk hasil optimal",
    specifications:
      "Ukuran: 30ml\nVarian: 5X Ceramide Moisturizer\nMerek: Skintific\nAsal: Korea Selatan\nJenis Kulit: Semua jenis kulit\nBPOM: NA18200104873\nKadaluarsa: 24 bulan sejak produksi\nIsi: 30 gram",
    price: 89000,
    original_price: 119000,
    rating: 4.8,
    review_count: 15230,
    images: [
      "https://picsum.photos/seed/skintific-1/600/600",
      "https://picsum.photos/seed/skintific-2/600/600",
      "https://picsum.photos/seed/skintific-3/600/600",
      "https://picsum.photos/seed/skintific-4/600/600",
      "https://picsum.photos/seed/skintific-5/600/600",
    ],
    affiliate_url: "https://shopee.co.id/skintific-5x-ceramide-moisturizer",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: true,
    is_viral: true,
    is_new: false,
    viral_score: 95,
    tags: ["skincare", "moisturizer", "ceramide", "skin barrier", "korea"],
    click_count: 45200,
  },
  {
    id: "2",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-06-01T00:00:00Z",
    name: "Wardah Perfect Bright Moisturizer",
    slug: "wardah-perfect-bright-moisturizer",
    brand_id: "Wardah",
    category_id: "skincare",
    description: "Moisturizer pencerah wajah dengan Vitamin C",
    benefits: "Mencerahkan\nMelembabkan\nMeratakan warna kulit",
    how_to_use: "Aplikasikan setiap pagi dan malam",
    specifications: "Ukuran: 30ml\nMerek: Wardah\nAsal: Indonesia",
    price: 45000,
    original_price: 55000,
    rating: 4.6,
    review_count: 23450,
    images: [
      "https://picsum.photos/seed/wardah-1/600/600",
      "https://picsum.photos/seed/wardah-2/600/600",
      "https://picsum.photos/seed/wardah-3/600/600",
    ],
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
    brand_id: "Emina",
    category_id: "skincare",
    description: "Sabun cuci muka yang bikin wajah cerah alami",
    benefits: "Membersihkan\nMencerahkan\nWajah terasa segar",
    how_to_use: "Gunakan setiap pagi dan malam",
    specifications: "Ukuran: 100ml\nMerek: Emina\nAsal: Indonesia",
    price: 25000,
    rating: 4.5,
    review_count: 42100,
    images: [
      "https://picsum.photos/seed/emina-1/600/600",
      "https://picsum.photos/seed/emina-2/600/600",
    ],
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
    brand_id: "Azarine",
    category_id: "skincare",
    description: "Sunscreen ringan dengan SPF 45 PA+++",
    benefits: "Melindungi dari sinar UV\nRingan\ntidak lengket",
    how_to_use: "Oleskan 15 menit sebelum beraktivitas di luar",
    specifications: "Ukuran: 30ml\nMerek: Azarine\nAsal: Indonesia",
    price: 35000,
    rating: 4.7,
    review_count: 38900,
    images: [
      "https://picsum.photos/seed/azarine-1/600/600",
      "https://picsum.photos/seed/azarine-2/600/600",
    ],
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
    brand_id: "Scarlett",
    category_id: "bodycare",
    description: "Body lotion pemutih dengan Glutathione",
    benefits: "Memutihkan\nMelembabkan\nWangi tahan lama",
    how_to_use: "Oleskan setelah mandi",
    specifications: "Ukuran: 250ml\nMerek: Scarlett\nAsal: Indonesia",
    price: 55000,
    original_price: 70000,
    rating: 4.6,
    review_count: 56700,
    images: [
      "https://picsum.photos/seed/scarlett-1/600/600",
      "https://picsum.photos/seed/scarlett-2/600/600",
    ],
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
    brand_id: "Somethinc",
    category_id: "skincare",
    description: "Serum Niacinamide 10% untuk kulit berminyak",
    benefits: "Mengecilkan pori\nMengurangi minyak\nMencerahkan",
    how_to_use: "Oleskan 3 tetes setelah toner",
    specifications: "Ukuran: 20ml\nMerek: Somethinc\nAsal: Indonesia",
    price: 75000,
    rating: 4.7,
    review_count: 29800,
    images: [
      "https://picsum.photos/seed/somethinc-1/600/600",
      "https://picsum.photos/seed/somethinc-2/600/600",
    ],
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
    brand_id: "Implora",
    category_id: "makeup",
    description: "Lip cream matte tahan lama dengan berbagai shade cantik",
    benefits: "Tahan lama\nTidak bikin kering\nWarna pigmented",
    how_to_use: "Oleskan pada bibir yang bersih",
    specifications: "Ukuran: 4ml\nMerek: Implora\nAsal: Indonesia",
    price: 18000,
    original_price: 25000,
    rating: 4.4,
    review_count: 67800,
    images: [
      "https://picsum.photos/seed/implora-1/600/600",
      "https://picsum.photos/seed/implora-2/600/600",
    ],
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
]

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

const shareLinks = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    color: "text-green-500 hover:text-green-600",
    bg: "bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50",
    getUrl: (url: string, text: string) =>
      `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
  },
  {
    name: "Facebook",
    icon: FacebookIcon,
    color: "text-blue-600 hover:text-blue-700",
    bg: "bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50",
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "X",
    icon: X,
    color: "text-foreground",
    bg: "bg-muted hover:bg-accent",
    getUrl: (url: string, text: string) =>
      `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: "Threads",
    icon: AtSign,
    color: "text-foreground",
    bg: "bg-muted hover:bg-accent",
    getUrl: (url: string, text: string) =>
      `https://threads.net/intent/post?text=${encodeURIComponent(text + " " + url)}`,
  },
  {
    name: "Pinterest",
    icon: Link2,
    color: "text-red-600 hover:text-red-700",
    bg: "bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50",
    getUrl: (url: string, text: string) =>
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`,
  },
]

function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 rounded-full bg-muted p-6">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="mb-2 text-2xl font-bold">Produk Tidak Ditemukan</h1>
        <p className="mb-6 text-muted-foreground">
          Maaf, produk yang kamu cari tidak tersedia atau telah dihapus.
        </p>
        <Button asChild>
          <Link href="/produk">Lihat Semua Produk</Link>
        </Button>
      </motion.div>
    </div>
  )
}

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const product = useMemo(() => demoProducts.find((p) => p.slug === slug), [slug])

  if (!product) return <NotFound />

  const shareUrl = `${SITE_URL}/produk/${product.slug}`
  const shareText = `Cek ${product.name} di Cekout Yuk Sis!`
  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : 0
  const brandSlug = product.brand_id.toLowerCase().replace(/\s+/g, "-")
  const catName = categoryNames[product.category_id] || product.category_id

  const benefitsList = product.benefits
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean)
  const howToList = product.how_to_use
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
  const specsList = product.specifications
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((line) => {
      const colonIdx = line.indexOf(":")
      if (colonIdx > 0) {
        return { key: line.slice(0, colonIdx).trim(), value: line.slice(colonIdx + 1).trim() }
      }
      return { key: line, value: "" }
    })

  const newestProductIds = useMemo(() => {
    return new Set(
      [...demoProducts]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 12)
        .map((p) => p.id)
    )
  }, [])

  const topTrendingIds = useMemo(() => {
    return new Set(
      [...demoProducts]
        .sort((a, b) => b.click_count - a.click_count)
        .slice(0, 12)
        .map((p) => p.id)
    )
  }, [])

  const relatedProducts = demoProducts
    .filter((p) => p.id !== product.id && p.category_id === product.category_id)
    .slice(0, 4)
    .map((p) => ({ ...p, is_new: newestProductIds.has(p.id) }))

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="min-h-screen pb-16"
    >
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="flex items-center gap-1 hover:text-primary">
              <Home className="h-3.5 w-3.5" />
              Beranda
            </Link>
            <ChevronLeft className="h-3.5 w-3.5 -rotate-180" />
            <Link
              href={`/kategori/${product.category_id}`}
              className="hover:text-primary"
            >
              {catName}
            </Link>
            <ChevronLeft className="h-3.5 w-3.5 -rotate-180" />
            <span className="line-clamp-1 font-medium text-foreground">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div variants={fadeInLeft} className="space-y-4">
            <div className="group relative aspect-square overflow-hidden rounded-2xl border bg-muted">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200",
                    idx === selectedImage
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInRight} className="space-y-5">
            <Link
              href={`/brand/${brandSlug}`}
              className="inline-block text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:text-primary/80"
            >
              {product.brand_id}
            </Link>

            <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {product.name}
            </h1>

            <div className="flex items-center gap-2">
              <RatingStars rating={product.rating} reviewCount={product.review_count} />
              <span className="text-sm text-muted-foreground">
                ({product.review_count} ulasan)
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                {formatPrice(product.price)}
              </span>
              {product.original_price && product.original_price > product.price && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
              {discount > 0 && (
                <Badge variant="destructive" className="px-2 py-0.5 text-xs font-bold">
                  -{discount}%
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {newestProductIds.has(product.id) && (
                <Badge
                  variant="default"
                  className="gap-1 border-0 bg-green-500 px-3 py-1 text-xs font-bold text-white"
                >
                  Baru
                </Badge>
              )}
              <Badge variant="secondary" className="px-3 py-1 text-xs capitalize">
                {catName}
              </Badge>
            </div>

            <p className="leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="space-y-2.5 rounded-xl border bg-card p-4">
              <h3 className="text-sm font-semibold">Keunggulan Produk</h3>
              <ul className="space-y-2">
                {benefitsList.slice(0, 4).map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="flex-1 gap-2 bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg transition-all hover:from-primary/90 hover:to-purple-600/90 hover:shadow-xl"
                asChild
              >
                <a
                  href={product.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Lihat Produk di Marketplace
                </a>
              </Button>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-muted-foreground">Bagikan:</p>
              <div className="flex flex-wrap gap-2">
                {shareLinks.map((share) => {
                  const Icon = share.icon
                  return (
                    <a
                      key={share.name}
                      href={share.getUrl(shareUrl, shareText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Bagikan ke ${share.name}`}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full transition-all",
                        share.bg,
                        share.color
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <Tabs defaultValue="deskripsi" className="w-full">
            <TabsList className="w-full overflow-x-auto bg-muted/50">
              <TabsTrigger value="deskripsi" className="text-xs sm:text-sm">
                Deskripsi
              </TabsTrigger>
              <TabsTrigger value="manfaat" className="text-xs sm:text-sm">
                Manfaat
              </TabsTrigger>
              <TabsTrigger value="cara-penggunaan" className="text-xs sm:text-sm">
                Cara Penggunaan
              </TabsTrigger>
              <TabsTrigger value="spesifikasi" className="text-xs sm:text-sm">
                Spesifikasi
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deskripsi" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose prose-sm max-w-none dark:prose-invert"
              >
                <p className="leading-relaxed text-muted-foreground">{product.description}</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border bg-card p-4">
                    <p className="text-sm font-semibold">Platform Afiliasi</p>
                    <p className="mt-1 text-sm capitalize text-muted-foreground">
                      {product.affiliate_platform === "shopee"
                        ? "Shopee"
                        : "Marketplace Lainnya"}
                    </p>
                  </div>
                  <div className="rounded-xl border bg-card p-4">
                    <p className="text-sm font-semibold">Kategori</p>
                    <p className="mt-1 text-sm capitalize text-muted-foreground">{catName}</p>
                  </div>
                  {product.tags.length > 0 && (
                    <div className="rounded-xl border bg-card p-4 sm:col-span-2">
                      <p className="text-sm font-semibold">Tags</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {product.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="manfaat" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-3 sm:grid-cols-2"
              >
                {benefitsList.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border bg-card p-4 transition-all hover:shadow-md"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">{benefit}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="cara-penggunaan" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {howToList.length > 0 ? (
                  <ol className="space-y-4">
                    {howToList.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                          {idx + 1}
                        </span>
                        <div className="rounded-xl border bg-card p-4 flex-1">
                          <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-sm text-muted-foreground">{product.how_to_use}</p>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="spesifikasi" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-xl border"
              >
                <table className="w-full">
                  <tbody>
                    {specsList.map((spec, idx) => (
                      <tr
                        key={idx}
                        className={cn(
                          "border-b last:border-b-0",
                          idx % 2 === 0 ? "bg-card" : "bg-muted/30"
                        )}
                      >
                        <td className="px-4 py-3 text-sm font-medium">{spec.key}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h2 className="mb-6 text-xl font-bold tracking-tight">Produk Serupa</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((related, idx) => (
                <ProductCard key={related.id} product={related} index={idx} isTrending={topTrendingIds.has(related.id)} />
              ))}
            </div>
          </motion.section>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-2xl border bg-card p-6"
        >
          <h2 className="mb-4 text-lg font-bold tracking-tight">Status Popularitas</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Eye className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Dilihat</p>
                <p className="text-lg font-bold">{product.click_count.toLocaleString("id-ID")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
