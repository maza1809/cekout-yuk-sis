"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { slugify, truncate } from "@/lib/utils"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Building2 } from "lucide-react"
import { useBrands } from "@/contexts/brand-context"

const categoryOptions = [
  { id: "skincare", name: "Skincare" },
  { id: "fragrance", name: "Fragrance" },
  { id: "makeup", name: "Makeup" },
  { id: "bodycare", name: "Body Care" },
  { id: "haircare", name: "Hair Care" },
  { id: "fashion", name: "Fashion" },
  { id: "bags", name: "Bags" },
  { id: "shoes", name: "Shoes" },
  { id: "beautytools", name: "Beauty Tools" },
]

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

type FormData = {
  name: string
  slug: string
  logo_url: string
  description: string
  categories: string[]
  shopee_url: string
}

const emptyForm: FormData = {
  name: "",
  slug: "",
  logo_url: "",
  description: "",
  categories: [],
  shopee_url: "",
}

export default function BrandPage() {
  const { brands, addBrand, updateBrand, deleteBrand } = useBrands()
  const [search, setSearch] = React.useState("")
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [form, setForm] = React.useState<FormData>(emptyForm)
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const filtered = brands.filter((b) => {
    const q = search.toLowerCase()
    return !q || b.name.toLowerCase().includes(q) || b.slug.includes(q)
  })

  const handleOpenAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setErrors({})
    setDialogOpen(true)
  }

  const handleOpenEdit = (brand: typeof brands[number]) => {
    setEditingId(brand.id)
    setForm({
      name: brand.name,
      slug: brand.slug,
      logo_url: brand.logo,
      description: brand.description,
      categories: brand.categories,
      shopee_url: brand.shopee_url || "",
    })
    setErrors({})
    setDialogOpen(true)
  }

  const handleNameChange = (name: string) => {
    setForm((f) => ({ ...f, name, slug: slugify(name) }))
  }

  const toggleCategory = (catId: string) => {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(catId)
        ? f.categories.filter((c) => c !== catId)
        : [...f.categories, catId],
    }))
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = "Nama brand wajib diisi"
    if (!form.slug.trim()) errs.slug = "Slug wajib diisi"
    if (form.categories.length === 0) errs.categories = "Pilih minimal 1 kategori"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    const now = new Date().toISOString()

    if (editingId) {
      updateBrand(editingId, {
        name: form.name,
        slug: form.slug,
        logo: form.logo_url,
        description: form.description,
        categories: form.categories,
        shopee_url: form.shopee_url,
        updated_at: now,
      })
      toast.success("Brand berhasil diperbarui")
    } else {
      const newBrand = {
        id: `b${Date.now()}`,
        created_at: now,
        updated_at: now,
        name: form.name,
        slug: form.slug,
        logo: form.logo_url,
        description: form.description,
        categories: form.categories,
        shopee_url: form.shopee_url,
        is_featured: false,
        click_count: 0,
        product_count: 0,
      }
      addBrand(newBrand)
      toast.success("Brand berhasil ditambahkan")
    }
    setDialogOpen(false)
  }

  const handleDelete = () => {
    if (!deleteId) return
    deleteBrand(deleteId)
    toast.success("Brand berhasil dihapus")
    setDeleteDialogOpen(false)
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Brand</h2>
          <p className="text-sm text-muted-foreground">Kelola brand-brand produk</p>
        </div>
        <Button onClick={handleOpenAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Brand
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Input
          placeholder="Cari brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 && (
          <div className="col-span-full py-8 text-center text-muted-foreground">
            Tidak ada brand ditemukan
          </div>
        )}
        {filtered.map((brand, idx) => (
          <div
            key={brand.id}
            className="group relative rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[idx % gradients.length]} text-white text-lg font-bold`}
              >
                {brand.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{brand.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{brand.product_count || 0} produk</p>
                <p className="text-sm mt-1 text-muted-foreground line-clamp-2">
                  {truncate(brand.description, 80)}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {brand.categories.map((catId) => (
                    <Badge key={catId} variant="secondary" className="text-[10px]">
                      {categoryOptions.find((c) => c.id === catId)?.name || catId}
                    </Badge>
                  ))}
                </div>
                {brand.shopee_url && (
                  <a
                    href={brand.shopee_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline block mt-1"
                  >
                    Toko Shopee ↗
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t">
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleOpenEdit(brand)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => {
                    setDeleteId(brand.id)
                    setDeleteDialogOpen(true)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Brand" : "Tambah Brand"}</DialogTitle>
            <DialogDescription>
              Isi form berikut untuk {editingId ? "memperbarui" : "menambahkan"} brand.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Brand *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Nama brand"
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="nama-brand"
                />
                {errors.slug && <p className="text-xs text-destructive">{errors.slug}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo_url">URL Logo</Label>
              <Input
                id="logo_url"
                value={form.logo_url}
                onChange={(e) => setForm((f) => ({ ...f, logo_url: e.target.value }))}
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shopee_url">Link Toko Shopee</Label>
              <Input
                id="shopee_url"
                value={form.shopee_url}
                onChange={(e) => setForm((f) => ({ ...f, shopee_url: e.target.value }))}
                placeholder="https://shopee.co.id/nama_toko"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Deskripsi brand"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="space-y-2">
              <Label>Kategori *</Label>
              {errors.categories && <p className="text-xs text-destructive">{errors.categories}</p>}
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((cat) => (
                  <Badge
                    key={cat.id}
                    variant={form.categories.includes(cat.id) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleCategory(cat.id)}
                  >
                    {cat.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSave}>{editingId ? "Simpan Perubahan" : "Tambah Brand"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hapus Brand</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus brand ini? Tindakan ini tidak bisa dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
