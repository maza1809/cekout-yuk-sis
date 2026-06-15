"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { formatPrice, slugify, truncate } from "@/lib/utils"
import { AFFILIATE_PLATFORMS } from "@/lib/constants"
import { Product } from "@/types"
import { db } from "@/lib/services/supabase-service"
import { toast } from "sonner"
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Image as ImageIcon,
  Sparkles,
  GripVertical,
  X,
  RefreshCw,
  Upload,
} from "lucide-react"

const defaultProducts: Product[] = [
  {
    id: "1",
    created_at: "2025-01-15T10:00:00Z",
    updated_at: "2025-06-01T10:00:00Z",
    name: "Skintific 5X Ceramide Low PH Cleanser",
    slug: "skintific-5x-ceramide-low-ph-cleanser",
    brand_id: "b1",
    category_id: "c1",
    description: "Skintific 5X Ceramide Low PH Cleanser adalah facial wash dengan 5X Ceramide untuk memperbaiki skin barrier.",
    benefits: "Membersihkan wajah tanpa membuat kering\nMengandung 5 jenis ceramide\npH rendah 5.5",
    how_to_use: "Tuangkan secukupnya, busakan, dan pijat lembut ke wajah. Bilas dengan air.",
    specifications: "Volume: 100ml\npH: 5.5\nKulit: Normal, Kering, Sensitif",
    price: 45000,
    original_price: 60000,
    rating: 4.8,
    review_count: 15200,
    images: ["https://placehold.co/200x200/6366f1/ffffff?text=Skintific"],
    affiliate_url: "https://shopee.co.id/product",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: true,
    is_viral: true,
    is_new: false,
    viral_score: 92,
    tags: ["skincare", "facial-wash", "ceramide"],
    click_count: 3400,
  },
  {
    id: "2",
    created_at: "2025-02-20T10:00:00Z",
    updated_at: "2025-05-28T10:00:00Z",
    name: "Somethinc Niacinamide + Moisture Beet Serum",
    slug: "somethinc-niacinamide-moisture-beet-serum",
    brand_id: "b2",
    category_id: "c1",
    description: "Serum dengan Niacinamide dan Moisture Beet untuk mencerahkan dan melembapkan.",
    benefits: "Mencerahkan kulit\nMelembapkan intensif\nMenyamarkan noda hitam",
    how_to_use: "Gunakan 2-3 tetes setelah toner, pagi dan malam.",
    specifications: "Volume: 30ml\nKandungan: 10% Niacinamide",
    price: 85000,
    original_price: 100000,
    rating: 4.7,
    review_count: 8900,
    images: ["https://placehold.co/200x200/ec4899/ffffff?text=Somethinc"],
    affiliate_url: "https://shopee.co.id/product",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: true,
    is_viral: false,
    is_new: true,
    viral_score: 78,
    tags: ["skincare", "serum", "niacinamide"],
    click_count: 2100,
  },
  {
    id: "3",
    created_at: "2025-03-10T10:00:00Z",
    updated_at: "2025-06-05T10:00:00Z",
    name: "Wardah Lightening Day Cream SPF 30",
    slug: "wardah-lightening-day-cream-spf-30",
    brand_id: "b3",
    category_id: "c1",
    description: "Krim siang dengan SPF 30 yang mencerahkan dan melindungi dari sinar UV.",
    benefits: "SPF 30 PA+++\nMencerahkan kulit\nMelembapkan",
    how_to_use: "Aplikasikan ke wajah setiap pagi setelah serum.",
    specifications: "Volume: 30g\nSPF: 30 PA+++",
    price: 32000,
    original_price: 38000,
    rating: 4.6,
    review_count: 12400,
    images: ["https://placehold.co/200x200/10b981/ffffff?text=Wardah"],
    affiliate_url: "https://shopee.co.id/product",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: false,
    is_viral: false,
    is_new: false,
    viral_score: 65,
    tags: ["skincare", "day-cream", "spf"],
    click_count: 1800,
  },
  {
    id: "4",
    created_at: "2025-04-05T10:00:00Z",
    updated_at: "2025-06-10T10:00:00Z",
    name: "Scarlett Whitening Body Lotion",
    slug: "scarlett-whitening-body-lotion",
    brand_id: "b4",
    category_id: "c4",
    description: "Body lotion dengan glutathione untuk mencerahkan kulit tubuh.",
    benefits: "Mencerahkan tubuh\nMelembapkan 12 jam\nWanginya tahan lama",
    how_to_use: "Gunakan setelah mandi, oleskan merata ke seluruh tubuh.",
    specifications: "Volume: 250ml\nKandungan: Glutathione, Vitamin E",
    price: 55000,
    original_price: 65000,
    rating: 4.5,
    review_count: 28300,
    images: ["https://placehold.co/200x200/8b5cf6/ffffff?text=Scarlett"],
    affiliate_url: "https://shopee.co.id/product",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: true,
    is_viral: true,
    is_new: false,
    viral_score: 95,
    tags: ["bodycare", "body-lotion", "whitening"],
    click_count: 5600,
  },
  {
    id: "5",
    created_at: "2025-04-20T10:00:00Z",
    updated_at: "2025-06-08T10:00:00Z",
    name: "Emina Bright Stuff Face Mist",
    slug: "emina-bright-stuff-face-mist",
    brand_id: "b5",
    category_id: "c1",
    description: "Face mist yang menyegarkan dengan kandungan brightening.",
    benefits: "Menyegarkan wajah\nMencerahkan\nRingan di kulit",
    how_to_use: "Semprotkan ke wajah dari jarak 15-20 cm, kapan saja.",
    specifications: "Volume: 50ml\nKandungan: Vitamin C",
    price: 22000,
    rating: 4.4,
    review_count: 6700,
    images: ["https://placehold.co/200x200/f59e0b/ffffff?text=Emina"],
    affiliate_url: "https://shopee.co.id/product",
    affiliate_platform: "shopee",
    is_published: true,
    is_featured: false,
    is_viral: false,
    is_new: true,
    viral_score: 55,
    tags: ["skincare", "face-mist", "vitamin-c"],
    click_count: 1200,
  },
  {
    id: "6",
    created_at: "2025-05-01T10:00:00Z",
    updated_at: "2025-06-11T10:00:00Z",
    name: "The Originote Hyaluronic Acid Serum",
    slug: "the-originote-hyaluronic-acid-serum",
    brand_id: "b6",
    category_id: "c1",
    description: "Serum hyaluronic acid dengan triple HA untuk hidrasi maksimal.",
    benefits: "Hidrasi 3 lapis kulit\nMelembapkan intensif\nMengurangi garis halus",
    how_to_use: "Aplikasikan 2 tetes ke wajah setelah toner.",
    specifications: "Volume: 30ml\nKandungan: Triple Hyaluronic Acid",
    price: 38000,
    original_price: 45000,
    rating: 4.9,
    review_count: 4200,
    images: ["https://placehold.co/200x200/06b6d4/ffffff?text=Originote"],
    affiliate_url: "https://shopee.co.id/product",
    affiliate_platform: "shopee",
    is_published: false,
    is_featured: false,
    is_viral: true,
    is_new: true,
    viral_score: 88,
    tags: ["skincare", "serum", "hyaluronic-acid"],
    click_count: 980,
  },
]

const [brandOptions, setBrandOptions] = React.useState([
  { id: "b1", name: "Skintific" },
  { id: "b2", name: "Somethinc" },
  { id: "b3", name: "Wardah" },
  { id: "b4", name: "Scarlett" },
  { id: "b5", name: "Emina" },
  { id: "b6", name: "The Originote" },
])

const [categoryOptions, setCategoryOptions] = React.useState([
  { id: "c1", name: "Skincare" },
  { id: "c2", name: "Fragrance" },
  { id: "c3", name: "Makeup" },
  { id: "c4", name: "Bodycare" },
  { id: "c5", name: "Haircare" },
  { id: "c6", name: "Fashion" },
  { id: "c7", name: "Bags" },
  { id: "c8", name: "Shoes" },
  { id: "c9", name: "Beauty Tools" },
])

const emptyForm = {
  name: "",
  slug: "",
  brand_id: "",
  category_id: "",
  price: 0,
  original_price: 0,
  rating: 0,
  review_count: 0,
  description: "",
  benefits: "",
  how_to_use: "",
  specifications: "",
  affiliate_url: "",
  affiliate_platform: "shopee" as Product["affiliate_platform"],
  images: [""] as string[],
  is_published: true,
  viral_score: 0,
  tags: "",
}

type FormData = typeof emptyForm

export default function ProdukPage() {
  const [products, setProducts] = React.useState<Product[]>(defaultProducts)
  const [search, setSearch] = React.useState("")
  const [filterBrand, setFilterBrand] = React.useState("")
  const [filterCategory, setFilterCategory] = React.useState("")
  const [filterStatus, setFilterStatus] = React.useState("")
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [form, setForm] = React.useState<FormData>(emptyForm)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [syncingId, setSyncingId] = React.useState<string | null>(null)
  const [syncingAll, setSyncingAll] = React.useState(false)

  React.useEffect(() => {
    async function fetchData() {
      const data = await db.products()
      if (data && data.length > 0) setProducts(data)
    }
    fetchData()
  }, [])

  React.useEffect(() => {
    async function fetchOptions() {
      const [brands, cats] = await Promise.all([db.brands(), db.categories(false)])
      if (brands.length) setBrandOptions(brands.map(b => ({ id: b.slug, name: b.name })))
      if (cats.length) setCategoryOptions(cats.map(c => ({ id: c.slug, name: c.name })))
    }
    fetchOptions()
  }, [])

  const newestProductIds = React.useMemo(() => {
    return new Set(
      [...products]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 12)
        .map((p) => p.id)
    )
  }, [products])

  const filtered = products.filter((p) => {
    const q = search.toLowerCase()
    if (q && !p.name.toLowerCase().includes(q) && !p.slug.includes(q)) return false
    if (filterBrand && p.brand_id !== filterBrand) return false
    if (filterCategory && p.category_id !== filterCategory) return false
    if (filterStatus === "published" && !p.is_published) return false
    if (filterStatus === "draft" && p.is_published) return false
    return true
  })

  const handleOpenAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setErrors({})
    setDialogOpen(true)
  }

  const handleOpenEdit = (product: Product) => {
    setEditingId(product.id)
    setForm({
      name: product.name,
      slug: product.slug,
      brand_id: product.brand_id,
      category_id: product.category_id,
      price: product.price,
      original_price: product.original_price || 0,
      rating: product.rating,
      review_count: product.review_count,
      description: product.description,
      benefits: product.benefits,
      how_to_use: product.how_to_use,
      specifications: product.specifications,
      affiliate_url: product.affiliate_url,
      affiliate_platform: product.affiliate_platform,
      images: product.images.length ? product.images : [""],
      is_published: product.is_published,
      viral_score: product.viral_score,
      tags: product.tags.join(", "),
    })
    setErrors({})
    setDialogOpen(true)
  }

  const handleNameChange = (name: string) => {
    setForm((f) => ({ ...f, name, slug: slugify(name) }))
  }

  const handleImageChange = (index: number, value: string) => {
    const images = [...form.images]
    images[index] = value
    setForm((f) => ({ ...f, images }))
  }

  const addImageField = () => {
    setForm((f) => ({ ...f, images: [...f.images, ""] }))
  }

  const removeImageField = (index: number) => {
    if (form.images.length <= 1) return
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }))
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = "Nama produk wajib diisi"
    if (!form.slug.trim()) errs.slug = "Slug wajib diisi"
    if (!form.brand_id) errs.brand_id = "Pilih brand"
    if (!form.category_id) errs.category_id = "Pilih kategori"
    if (form.price <= 0) errs.price = "Harga harus lebih dari 0"
    if (!form.affiliate_url.trim()) errs.affiliate_url = "URL afiliasi wajib diisi"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
    const images = form.images.filter((img) => img.trim())
    const now = new Date().toISOString()

    if (editingId) {
      const updated = {
        ...form,
        id: editingId,
        original_price: form.original_price || undefined,
        tags,
        images,
        updated_at: now,
      }
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, ...updated }
            : p
        )
      )
      await db.upsertProduct(updated)
      toast.success("Produk berhasil diperbarui")
    } else {
      const newProduct: Product = {
        id: String(Date.now()),
        created_at: now,
        updated_at: now,
        name: form.name,
        slug: form.slug,
        brand_id: form.brand_id,
        category_id: form.category_id,
        price: form.price,
        original_price: form.original_price || undefined,
        rating: form.rating,
        review_count: form.review_count,
        description: form.description,
        benefits: form.benefits,
        how_to_use: form.how_to_use,
        specifications: form.specifications,
        images,
        affiliate_url: form.affiliate_url,
        affiliate_platform: form.affiliate_platform,
        is_published: form.is_published,
        is_featured: false,
        is_viral: false,
        is_new: false,
        viral_score: 0,
        tags,
        click_count: 0,
      }
      setProducts((prev) => [newProduct, ...prev])
      await db.upsertProduct(newProduct)
      toast.success("Produk berhasil ditambahkan")
    }
    setDialogOpen(false)
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setProducts((prev) => prev.filter((p) => p.id !== deleteId))
    await db.deleteProduct(deleteId)
    toast.success("Produk berhasil dihapus")
    setDeleteDialogOpen(false)
    setDeleteId(null)
  }

  const togglePublish = async (id: string) => {
    const now = new Date().toISOString()
    let updated: Product | undefined
    setProducts((prev) => {
      const next = prev.map((p) => {
        if (p.id === id) {
          updated = { ...p, is_published: !p.is_published, updated_at: now }
          return updated
        }
        return p
      })
      return next
    })
    if (updated) await db.upsertProduct(updated)
  }

  const handleSync = async (product: Product) => {
    setSyncingId(product.id)
    try {
      const res = await fetch("/api/sync-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, url: product.affiliate_url }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || "Gagal sinkronisasi")
        return
      }
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id
            ? {
                ...p,
                price: data.product.price,
                original_price: data.product.original_price,
                rating: data.product.rating,
                review_count: data.product.review_count,
                items_sold: data.product.items_sold,
                last_synced: data.product.last_synced,
                updated_at: data.product.last_synced,
              }
            : p
        )
      )
      toast.success(data.message || "Sinkronisasi berhasil")
    } catch {
      toast.error("Gagal sinkronisasi produk")
    } finally {
      setSyncingId(null)
    }
  }

  const handleSyncAll = async () => {
    setSyncingAll(true)
    try {
      const res = await fetch("/api/sync-all", { method: "POST" })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || "Gagal sinkronisasi")
        return
      }
      const now = new Date().toISOString()
      setProducts((prev) =>
        prev.map((p, i) => {
          const update = data.updates[i % data.updates.length]
          return {
            ...p,
            price: update.price,
            rating: update.rating,
            review_count: update.review_count,
            items_sold: update.items_sold,
            last_synced: now,
            updated_at: now,
          }
        })
      )
      toast.success(data.message)
    } catch {
      toast.error("Gagal sinkronisasi semua produk")
    } finally {
      setSyncingAll(false)
    }
  }

  const formatLastSync = (date?: string) => {
    if (!date) return "Belum pernah"
    const d = new Date(date)
    const now = new Date()
    const diff = Math.floor((now.getTime() - d.getTime()) / 1000)
    if (diff < 60) return `${diff} detik lalu`
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
    return d.toLocaleDateString("id-ID")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Produk</h2>
          <p className="text-sm text-muted-foreground">Kelola semua produk afiliasi</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleOpenAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Produk
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/produk/import">
              <Upload className="mr-2 h-4 w-4" />
              Import dari Shopee
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleSyncAll} disabled={syncingAll} title="Sync All Products">
            <RefreshCw className={`h-4 w-4 ${syncingAll ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterBrand} onValueChange={setFilterBrand}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Semua Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Brand</SelectItem>
            {brandOptions.map((b) => (
              <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Semua Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            {categoryOptions.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-36">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Image</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Brand</th>
                <th className="px-4 py-3 text-left font-medium">Category</th>
                <th className="px-4 py-3 text-right font-medium">Price</th>
                <th className="px-4 py-3 text-center font-medium">Status</th>
                <th className="px-4 py-3 text-center font-medium">Badges</th>
                <th className="px-4 py-3 text-center font-medium">Sync</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                    Tidak ada produk ditemukan
                  </td>
                </tr>
              )}
              {filtered.map((product) => (
                <tr key={product.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-muted">
                      {product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium max-w-[200px] truncate" title={product.name}>
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{product.rating} &middot; {product.review_count.toLocaleString()} reviews</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {brandOptions.find((b) => b.id === product.brand_id)?.name || product.brand_id}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">
                      {categoryOptions.find((c) => c.id === product.category_id)?.name || product.category_id}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <p className="font-medium">{formatPrice(product.price)}</p>
                    {product.original_price && (
                      <p className="text-xs text-muted-foreground line-through">
                        {formatPrice(product.original_price)}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={product.is_published}
                        onCheckedChange={() => togglePublish(product.id)}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">
                      {product.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-center gap-1">
                      {newestProductIds.has(product.id) && (
                        <Badge className="bg-emerald-500 text-white border-0 text-[10px] px-1.5 py-0">
                          <Sparkles className="mr-0.5 h-3 w-3" /> New
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleSync(product)}
                        disabled={syncingId === product.id}
                        title="Sync Now"
                      >
                        <RefreshCw className={`h-3.5 w-3.5 ${syncingId === product.id ? "animate-spin" : ""}`} />
                      </Button>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                        {formatLastSync(product.last_synced)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleOpenEdit(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => {
                          setDeleteId(product.id)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Produk" : "Tambah Produk"}</DialogTitle>
            <DialogDescription>
              Isi form berikut untuk {editingId ? "memperbarui" : "menambahkan"} produk.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Produk *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Nama produk"
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="nama-produk"
                />
                {errors.slug && <p className="text-xs text-destructive">{errors.slug}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="brand_id">Brand *</Label>
                <Select value={form.brand_id} onValueChange={(v) => setForm((f) => ({ ...f, brand_id: v }))}>
                  <SelectTrigger id="brand_id">
                    <SelectValue placeholder="Pilih Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brandOptions.map((b) => (
                      <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.brand_id && <p className="text-xs text-destructive">{errors.brand_id}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category_id">Kategori *</Label>
                <Select value={form.category_id} onValueChange={(v) => setForm((f) => ({ ...f, category_id: v }))}>
                  <SelectTrigger id="category_id">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category_id && <p className="text-xs text-destructive">{errors.category_id}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price">Harga *</Label>
                <Input
                  id="price"
                  type="number"
                  value={form.price || ""}
                  onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                  placeholder="0"
                />
                {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="original_price">Harga Asli</Label>
                <Input
                  id="original_price"
                  type="number"
                  value={form.original_price || ""}
                  onChange={(e) => setForm((f) => ({ ...f, original_price: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  max="5"
                  value={form.rating || ""}
                  onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="review_count">Jumlah Review</Label>
                <Input
                  id="review_count"
                  type="number"
                  value={form.review_count || ""}
                  onChange={(e) => setForm((f) => ({ ...f, review_count: Number(e.target.value) }))}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Deskripsi produk"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefits">Manfaat</Label>
              <textarea
                id="benefits"
                value={form.benefits}
                onChange={(e) => setForm((f) => ({ ...f, benefits: e.target.value }))}
                placeholder="Manfaat produk (pisahkan dengan newline)"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="how_to_use">Cara Pakai</Label>
              <textarea
                id="how_to_use"
                value={form.how_to_use}
                onChange={(e) => setForm((f) => ({ ...f, how_to_use: e.target.value }))}
                placeholder="Cara penggunaan"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specifications">Spesifikasi</Label>
              <textarea
                id="specifications"
                value={form.specifications}
                onChange={(e) => setForm((f) => ({ ...f, specifications: e.target.value }))}
                placeholder="Spesifikasi produk"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="affiliate_url">URL Afiliasi *</Label>
                <Input
                  id="affiliate_url"
                  value={form.affiliate_url}
                  onChange={(e) => setForm((f) => ({ ...f, affiliate_url: e.target.value }))}
                  placeholder="https://"
                />
                {errors.affiliate_url && <p className="text-xs text-destructive">{errors.affiliate_url}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="affiliate_platform">Platform Afiliasi</Label>
                <Select value={form.affiliate_platform} onValueChange={(v: Product["affiliate_platform"]) => setForm((f) => ({ ...f, affiliate_platform: v }))}>
                  <SelectTrigger id="affiliate_platform">
                    <SelectValue placeholder="Pilih Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {AFFILIATE_PLATFORMS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Gambar</Label>
              {form.images.map((img, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    value={img}
                    onChange={(e) => handleImageChange(i, e.target.value)}
                    placeholder="URL gambar"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 shrink-0"
                    onClick={() => removeImageField(i)}
                    disabled={form.images.length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addImageField} className="mt-1">
                <Plus className="mr-1 h-3 w-3" /> Tambah Gambar
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={form.tags}
                onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                placeholder="skincare, serum, vitamin-c"
              />
              <p className="text-xs text-muted-foreground">Pisahkan dengan koma</p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="is_published"
                  checked={form.is_published}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, is_published: v }))}
                />
                <Label htmlFor="is_published">Published</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Simpan Perubahan" : "Tambah Produk"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hapus Produk</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak bisa dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
