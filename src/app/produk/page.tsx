"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animations"
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  ChevronLeft,
  Home,
  Sparkles,
  Flower2,
  Paintbrush,
  Heart,
  Scissors,
  Shirt,
  ShoppingBag,
  Footprints,
  Wand,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { ProductCard } from "@/components/shared/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatPrice } from "@/lib/utils"
import { type Product, type SortOption } from "@/types"
import { SORT_OPTIONS, CATEGORY_ICONS } from "@/lib/constants"
import { FilterSidebar } from "@/components/shared/filter-sidebar"
import { db } from "@/lib/services/supabase-service"

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Flower2,
  Paintbrush,
  Heart,
  Scissors,
  Shirt,
  ShoppingBag,
  Footprints,
  Wand,
}

const allCategories = [
  { slug: "skincare", name: "Skincare", icon: "Sparkles" },
  { slug: "fragrance", name: "Fragrance", icon: "Flower2" },
  { slug: "makeup", name: "Makeup", icon: "Paintbrush" },
  { slug: "bodycare", name: "Body Care", icon: "Heart" },
  { slug: "haircare", name: "Hair Care", icon: "Scissors" },
  { slug: "fashion", name: "Fashion", icon: "Shirt" },
  { slug: "bags", name: "Tas", icon: "ShoppingBag" },
  { slug: "shoes", name: "Sepatu", icon: "Footprints" },
  { slug: "beautytools", name: "Beauty Tools", icon: "Wand" },
]

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
  {
    id: "11",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-06-01T00:00:00Z",
    name: "Ellips Hair Vitamin",
    slug: "ellips-hair-vitamin",
    brand_id: "ellips",
    category_id: "haircare",
    description: "Hair vitamin dengan Argan Oil untuk rambut berkilau",
    benefits: "Melembutkan, menutrisi, melindungi rambut",
    how_to_use: "Oleskan pada rambut setengah kering",
    specifications: "60ml | Ellips | Indonesia",
    price: 12000,
    rating: 4.5,
    review_count: 78900,
    images: ["/products/ellips-hair-vitamin.jpg"],
    affiliate_url: "https://shopee.co.id/ellips-hair-vitamin",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: false,
    is_viral: true,
    is_new: false,
    viral_score: 85,
    tags: ["haircare", "hair vitamin", "argan oil"],
    click_count: 44100,
  },
  {
    id: "12",
    created_at: "2026-06-01T00:00:00Z",
    updated_at: "2026-06-01T00:00:00Z",
    name: "Miniso Eau de Parfum",
    slug: "miniso-eau-de-parfum",
    brand_id: "miniso",
    category_id: "fragrance",
    description: "Parfum wanita dengan aroma floral dan musky yang elegan",
    benefits: "Aroma tahan lama, wangi segar seharian",
    how_to_use: "Semprotkan pada titik nadi seperti pergelangan tangan dan leher",
    specifications: "50ml | Miniso | Japan",
    price: 65000,
    original_price: 85000,
    rating: 4.3,
    review_count: 23400,
    images: ["/products/miniso-parfum.jpg"],
    affiliate_url: "https://shopee.co.id/miniso-parfum",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: false,
    is_viral: false,
    is_new: true,
    viral_score: 52,
    tags: ["fragrance", "parfum", "floral"],
    click_count: 12300,
  },
]

export default function ProdukPage() {
  const [products, setProducts] = useState<Product[]>(demoProducts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const data = await db.products({ published: true })
      if (data && data.length > 0) {
        setProducts(data)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const brandList = [...new Set(products.map((p) => p.brand_id))]
  const categoryList = [...new Set(products.map((p) => p.category_id))]
  const [search, setSearch] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")
  const [selectedRating, setSelectedRating] = useState(0)
  const [sort, setSort] = useState<SortOption>("newest")
  const [showFilters, setShowFilters] = useState(false)
  const [visibleCount, setVisibleCount] = useState(8)

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.brand_id.toLowerCase().includes(q))
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category_id))
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand_id))
    }

    if (priceMin) {
      result = result.filter((p) => p.price >= Number(priceMin))
    }

    if (priceMax) {
      result = result.filter((p) => p.price <= Number(priceMax))
    }

    if (selectedRating > 0) {
      result = result.filter((p) => p.rating >= selectedRating)
    }

    switch (sort) {
      case "newest":
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case "trending":
        result.sort((a, b) => b.click_count - a.click_count)
        break
      case "recommended":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "price_asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price_desc":
        result.sort((a, b) => b.price - a.price)
        break
    }

    return result
  }, [search, selectedCategories, selectedBrands, priceMin, priceMax, selectedRating, sort])

  const newestProductIds = useMemo(() => {
    return new Set(
      [...products]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 12)
        .map((p) => p.id)
    )
  }, [])

  const topTrendingIds = useMemo(() => {
    return new Set(
      [...products]
        .sort((a, b) => b.click_count - a.click_count)
        .slice(0, 12)
        .map((p) => p.id)
    )
  }, [])

  const displayProducts = filteredProducts.slice(0, visibleCount).map((p) => ({
    ...p,
    is_new: newestProductIds.has(p.id),
  }))
  const hasMore = visibleCount < filteredProducts.length

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    )
  }

  const clearFilters = () => {
    setSearch("")
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceMin("")
    setPriceMax("")
    setSelectedRating(0)
    setSort("newest")
  }

  const hasActiveFilters =
    search ||
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    priceMin ||
    priceMax ||
    selectedRating > 0



  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <nav className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="flex items-center gap-1 hover:text-primary">
              <Home className="h-3.5 w-3.5" />
              Beranda
            </Link>
            <ChevronLeft className="h-3.5 w-3.5 -rotate-180" />
            <span className="font-medium text-foreground">Semua Produk</span>
          </nav>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Semua Produk</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Temukan produk skincare, makeup, body care, dan lainnya
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between gap-4 lg:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(true)}
            className="gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                !
              </Badge>
            )}
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {filteredProducts.length} produk
            </span>
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="h-9 w-40 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 space-y-6 rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filter</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto px-2 py-1 text-xs text-muted-foreground"
                  onClick={clearFilters}
                >
                  Reset
                </Button>
              </div>
              <FilterSidebar
                search={search}
                onSearchChange={setSearch}
                selectedCategories={selectedCategories}
                categoryList={categoryList}
                allCategories={allCategories}
                onToggleCategory={toggleCategory}
                selectedBrands={selectedBrands}
                brandList={brandList}
                onToggleBrand={toggleBrand}
                priceMin={priceMin}
                priceMax={priceMax}
                onPriceMinChange={setPriceMin}
                onPriceMaxChange={setPriceMax}
                selectedRating={selectedRating}
                onRatingChange={setSelectedRating}
                onClear={clearFilters}
              />
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-4 hidden items-center justify-between lg:flex">
              <p className="text-sm text-muted-foreground">
                Menampilkan <span className="font-medium text-foreground">{displayProducts.length}</span> dari{" "}
                <span className="font-medium text-foreground">{filteredProducts.length}</span> produk
              </p>
              <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
                <SelectTrigger className="h-9 w-44 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {displayProducts.length > 0 ? (
              <>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                >
                  {displayProducts.map((product, index) => (
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

                <div className="mt-10 flex justify-center">
                  {hasMore ? (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setVisibleCount((prev) => prev + 8)}
                      className="gap-2"
                    >
                      Muat Lainnya
                    </Button>
                  ) : filteredProducts.length > 8 ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setVisibleCount(8)}
                      className="text-muted-foreground"
                    >
                      Tampilkan Lebih Sedikit
                    </Button>
                  ) : null}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 rounded-full bg-muted p-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">Produk Tidak Ditemukan</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tidak ada produk yang sesuai dengan filter yang kamu pilih.
                </p>
                <Button variant="link" className="mt-2" onClick={clearFilters}>
                  Hapus Semua Filter
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-background p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Filter</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <FilterSidebar
                search={search}
                onSearchChange={setSearch}
                selectedCategories={selectedCategories}
                categoryList={categoryList}
                allCategories={allCategories}
                onToggleCategory={toggleCategory}
                selectedBrands={selectedBrands}
                brandList={brandList}
                onToggleBrand={toggleBrand}
                priceMin={priceMin}
                priceMax={priceMax}
                onPriceMinChange={setPriceMin}
                onPriceMaxChange={setPriceMax}
                selectedRating={selectedRating}
                onRatingChange={setSelectedRating}
                onClear={clearFilters}
              />
          </div>
        </div>
      )}
    </motion.div>
  )
}
