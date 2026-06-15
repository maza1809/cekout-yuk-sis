"use client"

import * as React from "react"
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
import { slugify } from "@/lib/utils"
import { CATEGORY_ICONS } from "@/lib/constants"
import { Category } from "@/types"
import { db } from "@/lib/services/supabase-service"
import { toast } from "sonner"
import {
  Plus,
  Pencil,
  Trash2,
  GripVertical,
  Sparkles,
  Flower2,
  Paintbrush,
  Heart,
  Scissors,
  Shirt,
  ShoppingBag,
  Footprints,
  Wand,
} from "lucide-react"

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="h-4 w-4" />,
  Flower2: <Flower2 className="h-4 w-4" />,
  Paintbrush: <Paintbrush className="h-4 w-4" />,
  Heart: <Heart className="h-4 w-4" />,
  Scissors: <Scissors className="h-4 w-4" />,
  Shirt: <Shirt className="h-4 w-4" />,
  ShoppingBag: <ShoppingBag className="h-4 w-4" />,
  Footprints: <Footprints className="h-4 w-4" />,
  Wand: <Wand className="h-4 w-4" />,
}

const predefinedIcons = [
  "Sparkles", "Flower2", "Paintbrush", "Heart",
  "Scissors", "Shirt", "ShoppingBag", "Footprints", "Wand",
]

const defaultCategories: Category[] = [
  { id: "c1", created_at: "2025-01-01T10:00:00Z", updated_at: "2025-06-01T10:00:00Z", name: "Skincare", slug: "skincare", description: "Produk perawatan kulit wajah dan tubuh", image: "", icon: "Sparkles", is_active: true, sort_order: 1 },
  { id: "c2", created_at: "2025-01-01T10:00:00Z", updated_at: "2025-06-01T10:00:00Z", name: "Fragrance", slug: "fragrance", description: "Parfum dan wewangian", image: "", icon: "Flower2", is_active: true, sort_order: 2 },
  { id: "c3", created_at: "2025-01-01T10:00:00Z", updated_at: "2025-06-01T10:00:00Z", name: "Makeup", slug: "makeup", description: "Produk kosmetik dan riasan", image: "", icon: "Paintbrush", is_active: true, sort_order: 3 },
  { id: "c4", created_at: "2025-01-01T10:00:00Z", updated_at: "2025-06-01T10:00:00Z", name: "Bodycare", slug: "bodycare", description: "Perawatan tubuh", image: "", icon: "Heart", is_active: true, sort_order: 4 },
  { id: "c5", created_at: "2025-01-01T10:00:00Z", updated_at: "2025-06-01T10:00:00Z", name: "Haircare", slug: "haircare", description: "Perawatan rambut", image: "", icon: "Scissors", is_active: true, sort_order: 5 },
  { id: "c6", created_at: "2025-01-01T10:00:00Z", updated_at: "2025-06-01T10:00:00Z", name: "Fashion", slug: "fashion", description: "Pakaian dan aksesoris fashion", image: "", icon: "Shirt", is_active: false, sort_order: 6 },
  { id: "c7", created_at: "2025-01-01T10:00:00Z", updated_at: "2025-06-01T10:00:00Z", name: "Bags", slug: "bags", description: "Tas dan dompet", image: "", icon: "ShoppingBag", is_active: true, sort_order: 7 },
  { id: "c8", created_at: "2025-01-01T10:00:00Z", updated_at: "2025-06-01T10:00:00Z", name: "Shoes", slug: "shoes", description: "Sepatu dan alas kaki", image: "", icon: "Footprints", is_active: true, sort_order: 8 },
  { id: "c9", created_at: "2025-01-01T10:00:00Z", updated_at: "2025-06-01T10:00:00Z", name: "Beauty Tools", slug: "beautytools", description: "Alat kecantikan dan perawatan", image: "", icon: "Wand", is_active: true, sort_order: 9 },
]

type FormData = {
  name: string
  slug: string
  description: string
  icon: string
  image: string
  sort_order: number
  is_active: boolean
}

const emptyForm: FormData = {
  name: "",
  slug: "",
  description: "",
  icon: "Sparkles",
  image: "",
  sort_order: 0,
  is_active: true,
}

export default function KategoriPage() {
  const [categories, setCategories] = React.useState<Category[]>(defaultCategories)
  const [search, setSearch] = React.useState("")
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [form, setForm] = React.useState<FormData>(emptyForm)
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    async function fetchData() {
      const data = await db.categories(false)
      if (data && data.length > 0) setCategories(data)
    }
    fetchData()
  }, [])

  const sorted = [...categories].sort((a, b) => a.sort_order - b.sort_order)
  const filtered = sorted.filter((c) => {
    const q = search.toLowerCase()
    return !q || c.name.toLowerCase().includes(q) || c.slug.includes(q)
  })

  const handleOpenAdd = () => {
    setEditingId(null)
    setForm({ ...emptyForm, sort_order: categories.length + 1 })
    setErrors({})
    setDialogOpen(true)
  }

  const handleOpenEdit = (cat: Category) => {
    setEditingId(cat.id)
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      icon: cat.icon,
      image: cat.image,
      sort_order: cat.sort_order,
      is_active: cat.is_active,
    })
    setErrors({})
    setDialogOpen(true)
  }

  const handleNameChange = (name: string) => {
    setForm((f) => ({ ...f, name, slug: slugify(name) }))
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = "Nama kategori wajib diisi"
    if (!form.slug.trim()) errs.slug = "Slug wajib diisi"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    const now = new Date().toISOString()

    if (editingId) {
      const updated = { ...form, id: editingId, updated_at: now }
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingId
            ? { ...c, ...updated }
            : c
        )
      )
      await db.upsertCategory(updated)
      toast.success("Kategori berhasil diperbarui")
    } else {
      const newCat: Category = {
        id: `c${Date.now()}`,
        created_at: now,
        updated_at: now,
        name: form.name,
        slug: form.slug,
        description: form.description,
        image: form.image,
        icon: form.icon,
        is_active: form.is_active,
        sort_order: form.sort_order,
      }
      setCategories((prev) => [...prev, newCat])
      await db.upsertCategory(newCat)
      toast.success("Kategori berhasil ditambahkan")
    }
    setDialogOpen(false)
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setCategories((prev) => prev.filter((c) => c.id !== deleteId))
    await db.deleteCategory(deleteId)
    toast.success("Kategori berhasil dihapus")
    setDeleteDialogOpen(false)
    setDeleteId(null)
  }

  const toggleActive = async (id: string) => {
    const now = new Date().toISOString()
    let updated: Category | undefined
    setCategories((prev) => {
      const next = prev.map((c) => {
        if (c.id === id) {
          updated = { ...c, is_active: !c.is_active, updated_at: now }
          return updated
        }
        return c
      })
      return next
    })
    if (updated) await db.upsertCategory(updated)
  }

  const updateSortOrder = async (id: string, newOrder: number) => {
    const now = new Date().toISOString()
    let updated: Category | undefined
    setCategories((prev) => {
      const next = prev.map((c) => {
        if (c.id === id) {
          updated = { ...c, sort_order: newOrder, updated_at: now }
          return updated
        }
        return c
      })
      return next
    })
    if (updated) await db.upsertCategory(updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Kategori</h2>
          <p className="text-sm text-muted-foreground">Kelola kategori produk</p>
        </div>
        <Button onClick={handleOpenAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Kategori
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Input
          placeholder="Cari kategori..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="w-10 px-2 py-3"></th>
                <th className="px-4 py-3 text-left font-medium">Icon</th>
                <th className="px-4 py-3 text-left font-medium">Name</th>
                <th className="px-4 py-3 text-left font-medium">Slug</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
                <th className="px-4 py-3 text-center font-medium">Sort Order</th>
                <th className="px-4 py-3 text-center font-medium">Active</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    Tidak ada kategori ditemukan
                  </td>
                </tr>
              )}
              {filtered.map((cat) => (
                <tr key={cat.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-2 py-3">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {iconMap[cat.icon] || <Sparkles className="h-4 w-4" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{cat.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{cat.slug}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">{cat.description}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateSortOrder(cat.id, Math.max(0, cat.sort_order - 1))}
                      >
                        -
                      </Button>
                      <span className="w-6 text-center text-sm">{cat.sort_order}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateSortOrder(cat.id, cat.sort_order + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={cat.is_active}
                        onCheckedChange={() => toggleActive(cat.id)}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleOpenEdit(cat)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => {
                          setDeleteId(cat.id)
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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Kategori" : "Tambah Kategori"}</DialogTitle>
            <DialogDescription>
              Isi form berikut untuk {editingId ? "memperbarui" : "menambahkan"} kategori.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Kategori *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Nama kategori"
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  placeholder="nama-kategori"
                />
                {errors.slug && <p className="text-xs text-destructive">{errors.slug}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Deskripsi kategori"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select value={form.icon} onValueChange={(v) => setForm((f) => ({ ...f, icon: v }))}>
                  <SelectTrigger id="icon">
                    <SelectValue placeholder="Pilih Icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {predefinedIcons.map((iconName) => (
                      <SelectItem key={iconName} value={iconName}>
                        <span className="flex items-center gap-2">
                          {iconMap[iconName]}
                          {iconName}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                placeholder="https://example.com/image.png"
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="is_active"
                checked={form.is_active}
                onCheckedChange={(v) => setForm((f) => ({ ...f, is_active: v }))}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSave}>{editingId ? "Simpan Perubahan" : "Tambah Kategori"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hapus Kategori</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus kategori ini? Tindakan ini tidak bisa dibatalkan.
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
