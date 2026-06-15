"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
import { toast } from "sonner"
import { Link, Loader2, ShoppingBag, Store, Star, Package, RefreshCw, ChevronLeft, Image as ImageIcon } from "lucide-react"
import type { ScrapedProduct } from "@/types"

const brandOptions = [
  { id: "b1", name: "Skintific" },
  { id: "b2", name: "Somethinc" },
  { id: "b3", name: "Wardah" },
  { id: "b4", name: "Scarlett" },
  { id: "b5", name: "Emina" },
  { id: "b6", name: "The Originote" },
]

const categoryOptions = [
  { id: "c1", name: "Skincare" },
  { id: "c2", name: "Fragrance" },
  { id: "c3", name: "Makeup" },
  { id: "c4", name: "Bodycare" },
  { id: "c5", name: "Haircare" },
  { id: "c6", name: "Fashion" },
  { id: "c7", name: "Bags" },
  { id: "c8", name: "Shoes" },
  { id: "c9", name: "Beauty Tools" },
]

export default function ImportProdukPage() {
  const [url, setUrl] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<ScrapedProduct | null>(null)
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [saving, setSaving] = React.useState(false)
  const [categoryId, setCategoryId] = React.useState("")
  const [brandId, setBrandId] = React.useState("")

  const handleScrape = async () => {
    if (!url.trim()) {
      toast.error("Masukkan URL produk Shopee")
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const res = await fetch("/api/scrape-shopee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || "Gagal mengambil data")
        return
      }

      setResult(data.product)
      setCategoryId(data.product.category_id)
      setBrandId(data.product.brand_id)
      toast.success("Data produk berhasil diambil!")
    } catch {
      toast.error("Gagal terhubung ke server")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    if (!result) return
    if (!brandId) {
      toast.error("Pilih brand terlebih dahulu")
      return
    }
    if (!categoryId) {
      toast.error("Pilih kategori terlebih dahulu")
      return
    }
    setConfirmOpen(true)
  }

  const confirmSave = () => {
    if (!result) return
    setSaving(true)

    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem("imported_products") || "[]")
      const newProduct = {
        id: String(Date.now()),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        name: result.name,
        slug: result.slug,
        brand_id: brandId,
        category_id: categoryId,
        description: result.description,
        benefits: "",
        how_to_use: "",
        specifications: result.specifications,
        price: result.price,
        original_price: result.original_price,
        rating: result.rating,
        review_count: result.review_count,
        images: result.images,
        gallery_images: result.gallery_images,
        affiliate_url: url,
        affiliate_platform: "shopee",
        is_published: true,
        is_featured: false,
        is_viral: false,
        is_new: true,
        viral_score: Math.floor(result.rating * 20),
        tags: result.tags,
        click_count: 0,
        store_name: result.store_name,
        items_sold: result.items_sold,
        last_synced: new Date().toISOString(),
      }

      existing.unshift(newProduct)
      localStorage.setItem("imported_products", JSON.stringify(existing))
      setConfirmOpen(false)
      setSaving(false)
      setResult(null)
      setUrl("")
      toast.success("Produk berhasil diimpor!")
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <a href="/admin/produk">
            <ChevronLeft className="h-5 w-5" />
          </a>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Import Produk dari Shopee</h2>
          <p className="text-sm text-muted-foreground">
            Tempel URL produk Shopee untuk mengambil data secara otomatis
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Label htmlFor="shopee-url">URL Produk Shopee</Label>
            <div className="mt-1.5 flex gap-2">
              <Input
                id="shopee-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://shopee.co.id/...-i.123456789.1234567890"
                className="flex-1"
              />
              <Button onClick={handleScrape} disabled={loading} className="gap-2 shrink-0">
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                {loading ? "Mengambil..." : "Ambil Data"}
              </Button>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Masukkan URL produk dari Shopee Indonesia. Sistem akan otomatis mengambil data produk.
            </p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">Mengambil data produk dari Shopee...</p>
          <p className="text-xs text-muted-foreground">Mohon tunggu sebentar</p>
        </div>
      )}

      {result && !loading && (
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="border-b bg-muted/30 px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Preview Data Produk</h3>
              <Badge variant="secondary" className="ml-auto text-xs">
                {result.store_name}
              </Badge>
            </div>
          </div>

          <div className="grid gap-6 p-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-1">
              <div className="overflow-hidden rounded-xl border">
                <img
                  src={result.images[0]}
                  alt={result.name}
                  className="h-64 w-full object-cover"
                />
              </div>
              {result.gallery_images.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-medium text-muted-foreground">Galeri Gambar</p>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {result.gallery_images.map((img, i) => (
                      <div
                        key={i}
                        className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border"
                      >
                        <img
                          src={img}
                          alt={`Gallery ${i + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4 lg:col-span-2">
              <div>
                <h3 className="text-xl font-bold">{result.name}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                  <span className="inline-flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    {result.rating}
                  </span>
                  <span className="text-muted-foreground">
                    {result.review_count.toLocaleString()} reviews
                  </span>
                  <span className="text-muted-foreground">
                    {result.items_sold.toLocaleString()} terjual
                  </span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Store className="h-4 w-4" />
                    {result.store_name}
                  </span>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">
                  Rp{result.price.toLocaleString()}
                </span>
                {result.original_price && (
                  <span className="text-sm text-muted-foreground line-through">
                    Rp{result.original_price.toLocaleString()}
                  </span>
                )}
              </div>

              <div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {result.description}
                </p>
              </div>

              <div>
                <p className="mb-1 text-xs font-medium text-muted-foreground">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="import-brand">Brand *</Label>
                  <Select value={brandId} onValueChange={setBrandId}>
                    <SelectTrigger id="import-brand">
                      <SelectValue placeholder="Pilih Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brandOptions.map((b) => (
                        <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="import-category">Kategori *</Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger id="import-category">
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setResult(null)}>
                  Batal
                </Button>
                <Button onClick={handleSave} className="gap-2">
                  <Package className="h-4 w-4" />
                  Simpan ke Database
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Konfirmasi Import</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menyimpan produk ini ke database? Produk akan langsung muncul di website.
            </DialogDescription>
          </DialogHeader>

          {result && (
            <div className="flex items-center gap-3 rounded-lg border p-3">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                <img src={result.images[0]} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{result.name}</p>
                <p className="text-xs text-muted-foreground">{result.store_name}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)} disabled={saving}>
              Batal
            </Button>
            <Button onClick={confirmSave} disabled={saving} className="gap-2">
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Package className="h-4 w-4" />
              )}
              {saving ? "Menyimpan..." : "Ya, Simpan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
