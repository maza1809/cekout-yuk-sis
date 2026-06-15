"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Banner } from "@/types"
import { db } from "@/lib/services/supabase-service"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Eye } from "lucide-react"

const defaultBanners: Banner[] = [
  {
    id: "bn1",
    created_at: "2025-01-01T10:00:00Z",
    updated_at: "2025-06-01T10:00:00Z",
    title: "Promo Spesial Skincare",
    subtitle: "Dapatkan diskon hingga 50% untuk produk skincare terbaik",
    image: "https://placehold.co/800x400/6366f1/ffffff?text=Promo+Skincare",
    cta_text: "Belanja Sekarang",
    cta_link: "/kategori/skincare",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "bn2",
    created_at: "2025-02-01T10:00:00Z",
    updated_at: "2025-06-02T10:00:00Z",
    title: "New Collection Bodycare",
    subtitle: "Temukan koleksi bodycare terbaru dari brand favoritmu",
    image: "https://placehold.co/800x400/ec4899/ffffff?text=Bodycare+Collection",
    cta_text: "Lihat Koleksi",
    cta_link: "/kategori/bodycare",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "bn3",
    created_at: "2025-03-01T10:00:00Z",
    updated_at: "2025-06-03T10:00:00Z",
    title: "Viral Products 2025",
    subtitle: "Produk-produk viral yang lagi hits di kalangan wanita Indonesia",
    image: "https://placehold.co/800x400/f59e0b/ffffff?text=Viral+Products",
    cta_text: "Cek Produk Viral",
    cta_link: "/viral",
    sort_order: 3,
    is_active: false,
  },
]

type FormData = {
  image: string
  title: string
  subtitle: string
  cta_text: string
  cta_link: string
  sort_order: number
  is_active: boolean
}

const emptyForm: FormData = {
  image: "",
  title: "",
  subtitle: "",
  cta_text: "",
  cta_link: "",
  sort_order: 1,
  is_active: true,
}

export default function BannerPage() {
  const [banners, setBanners] = React.useState<Banner[]>(defaultBanners)
  const [search, setSearch] = React.useState("")
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [form, setForm] = React.useState<FormData>(emptyForm)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [previewOpen, setPreviewOpen] = React.useState<string | null>(null)

  React.useEffect(() => {
    db.banners(false).then((data) => {
      if (data.length > 0) setBanners(data)
    })
  }, [])

  const filtered = banners.filter((b) => {
    const q = search.toLowerCase()
    return !q || b.title.toLowerCase().includes(q) || b.subtitle.toLowerCase().includes(q)
  })

  const handleOpenAdd = () => {
    setEditingId(null)
    setForm({ ...emptyForm, sort_order: banners.length + 1 })
    setErrors({})
    setDialogOpen(true)
  }

  const handleOpenEdit = (banner: Banner) => {
    setEditingId(banner.id)
    setForm({
      image: banner.image,
      title: banner.title,
      subtitle: banner.subtitle,
      cta_text: banner.cta_text,
      cta_link: banner.cta_link,
      sort_order: banner.sort_order,
      is_active: banner.is_active,
    })
    setErrors({})
    setDialogOpen(true)
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.title.trim()) errs.title = "Judul wajib diisi"
    if (!form.cta_text.trim()) errs.cta_text = "Teks CTA wajib diisi"
    if (!form.cta_link.trim()) errs.cta_link = "Link CTA wajib diisi"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    const now = new Date().toISOString()

    if (editingId) {
      setBanners((prev) =>
        prev.map((b) =>
          b.id === editingId ? { ...b, ...form, updated_at: now } : b
        )
      )
      await db.upsertBanner({ ...form, id: editingId, updated_at: now })
      toast.success("Banner berhasil diperbarui")
    } else {
      const newBanner: Banner = {
        id: `bn${Date.now()}`,
        created_at: now,
        updated_at: now,
        ...form,
      }
      setBanners((prev) => [...prev, newBanner])
      const { id: _bid, ...bannerData } = newBanner
      await db.upsertBanner(bannerData as Banner)
      toast.success("Banner berhasil ditambahkan")
    }
    setDialogOpen(false)
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setBanners((prev) => prev.filter((b) => b.id !== deleteId))
    await db.deleteBanner(deleteId)
    toast.success("Banner berhasil dihapus")
    setDeleteDialogOpen(false)
    setDeleteId(null)
  }

  const toggleActive = async (id: string) => {
    const target = banners.find((b) => b.id === id)
    if (!target) return
    const updated = { ...target, is_active: !target.is_active, updated_at: new Date().toISOString() }
    setBanners((prev) => prev.map((b) => (b.id === id ? updated : b)))
    await db.upsertBanner(updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Banner</h2>
          <p className="text-sm text-muted-foreground">Kelola banner halaman utama</p>
        </div>
        <Button onClick={handleOpenAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Banner
        </Button>
      </div>

      <div className="grid gap-6">
        {filtered.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            Tidak ada banner ditemukan
          </div>
        )}
        {filtered.map((banner) => (
          <div
            key={banner.id}
            className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="relative h-48 w-full shrink-0 overflow-hidden bg-muted lg:h-auto lg:w-72">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                <Badge
                  className={`absolute left-3 top-3 border-0 ${
                    banner.is_active
                      ? "bg-emerald-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {banner.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">{banner.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{banner.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setPreviewOpen(banner.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleOpenEdit(banner)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => {
                          setDeleteId(banner.id)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      CTA: <strong>{banner.cta_text}</strong>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      Link: <span className="text-primary truncate max-w-[200px]">{banner.cta_link}</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      Sort Order: <strong>{banner.sort_order}</strong>
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Switch
                    checked={banner.is_active}
                    onCheckedChange={() => toggleActive(banner.id)}
                  />
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              </div>
            </div>

            {previewOpen === banner.id && (
              <div className="border-t bg-muted/30 p-5">
                <div className="mx-auto max-w-3xl overflow-hidden rounded-xl">
                  <div
                    className="relative flex h-48 items-center justify-center bg-cover bg-center sm:h-64"
                    style={{ backgroundImage: `url(${banner.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                    <div className="relative z-10 p-6 text-white">
                      <h3 className="text-xl font-bold sm:text-2xl">{banner.title}</h3>
                      {banner.subtitle && (
                        <p className="mt-2 text-sm opacity-90 max-w-md">{banner.subtitle}</p>
                      )}
                      <div className="mt-4 inline-block rounded-lg bg-white px-5 py-2 text-sm font-medium text-black">
                        {banner.cta_text}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Banner" : "Tambah Banner"}</DialogTitle>
            <DialogDescription>
              Isi form berikut untuk {editingId ? "memperbarui" : "menambahkan"} banner.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                placeholder="https://placehold.co/800x400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Judul *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Judul banner"
              />
              {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={form.subtitle}
                onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
                placeholder="Subtitle banner"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="cta_text">CTA Text *</Label>
                <Input
                  id="cta_text"
                  value={form.cta_text}
                  onChange={(e) => setForm((f) => ({ ...f, cta_text: e.target.value }))}
                  placeholder="Belanja Sekarang"
                />
                {errors.cta_text && <p className="text-xs text-destructive">{errors.cta_text}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta_link">CTA Link *</Label>
                <Input
                  id="cta_link"
                  value={form.cta_link}
                  onChange={(e) => setForm((f) => ({ ...f, cta_link: e.target.value }))}
                  placeholder="/kategori/skincare"
                />
                {errors.cta_link && <p className="text-xs text-destructive">{errors.cta_link}</p>}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <Switch
                  id="is_active"
                  checked={form.is_active}
                  onCheckedChange={(v) => setForm((f) => ({ ...f, is_active: v }))}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSave}>{editingId ? "Simpan Perubahan" : "Tambah Banner"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hapus Banner</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus banner ini? Tindakan ini tidak bisa dibatalkan.
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
