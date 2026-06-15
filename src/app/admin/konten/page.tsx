"use client"

import * as React from "react"
import { db } from "@/lib/services/supabase-service"
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
import { PageContent } from "@/types"
import { toast } from "sonner"
import { Pencil, FileText } from "lucide-react"

const defaultPages: PageContent[] = [
  {
    id: "p1",
    slug: "tentang-kami",
    title: "Tentang Kami",
    content: "<h2>Selamat Datang di Cekout Yuk Sis</h2>\n<p>Cekout Yuk Sis adalah platform kurasi produk pilihan untuk wanita Indonesia. Kami membantu Anda menemukan produk terbaik, viral, dan terpercaya dari berbagai marketplace seperti Shopee, Tokopedia, dan TikTok Shop.</p>\n<p>Visi kami adalah menjadi destinasi utama bagi wanita Indonesia dalam mencari rekomendasi produk berkualitas.</p>\n<h3>Misi Kami</h3>\n<ul>\n<li>Mengkurasi produk-produk terbaik dari berbagai kategori</li>\n<li>Memberikan informasi yang akurat dan terpercaya</li>\n<li>Memudahkan pengguna menemukan produk viral dan trending</li>\n<li>Mendukung produk lokal Indonesia</li>\n</ul>",
    meta_title: "Tentang Kami - Cekout Yuk Sis",
    meta_description: "Pelajari lebih lanjut tentang Cekout Yuk Sis, platform kurasi produk pilihan untuk wanita Indonesia.",
    is_published: true,
  },
  {
    id: "p2",
    slug: "kebijakan-privasi",
    title: "Kebijakan Privasi",
    content: "<h2>Kebijakan Privasi</h2>\n<p>Kebijakan Privasi ini menjelaskan bagaimana Cekout Yuk Sis mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.</p>\n<h3>Informasi yang Kami Kumpulkan</h3>\n<p>Kami mengumpulkan informasi yang Anda berikan secara sukarela, seperti nama dan alamat email saat Anda menghubungi kami.</p>\n<h3>Penggunaan Informasi</h3>\n<p>Informasi yang kami kumpulkan digunakan untuk meningkatkan layanan dan pengalaman pengguna di platform kami.</p>",
    meta_title: "Kebijakan Privasi - Cekout Yuk Sis",
    meta_description: "Kebijakan privasi Cekout Yuk Sis platform kurasi produk.",
    is_published: true,
  },
  {
    id: "p3",
    slug: "syarat-ketentuan",
    title: "Syarat & Ketentuan",
    content: "<h2>Syarat & Ketentuan</h2>\n<p>Dengan menggunakan Cekout Yuk Sis, Anda menyetujui syarat dan ketentuan yang berlaku.</p>\n<h3>Penggunaan Platform</h3>\n<p>Platform ini disediakan untuk tujuan informasi dan rekomendasi produk. Kami tidak menjual produk secara langsung.</p>\n<h3>Link Afiliasi</h3>\n<p>Beberapa tautan di platform ini merupakan tautan afiliasi. Kami dapat menerima komisi dari pembelian yang dilakukan melalui tautan tersebut.</p>",
    meta_title: "Syarat & Ketentuan - Cekout Yuk Sis",
    meta_description: "Syarat dan ketentuan penggunaan Cekout Yuk Sis.",
    is_published: true,
  },
  {
    id: "p4",
    slug: "disclaimer",
    title: "Disclaimer",
    content: "<h2>Disclaimer</h2>\n<p>Informasi yang disajikan di Cekout Yuk Sis bersifat informatif dan tidak dimaksudkan sebagai saran profesional.</p>\n<h3>Akurasi Informasi</h3>\n<p>Kami berusaha menyajikan informasi yang akurat, namun tidak menjamin kelengkapan dan keakuratan semua informasi.</p>\n<h3>Harga dan Ketersediaan</h3>\n<p>Harga dan ketersediaan produk dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.</p>",
    meta_title: "Disclaimer - Cekout Yuk Sis",
    meta_description: "Disclaimer Cekout Yuk Sis platform kurasi produk.",
    is_published: false,
  },
]

type FormData = {
  title: string
  meta_title: string
  meta_description: string
  content: string
  is_published: boolean
}

export default function KontenPage() {
  const [pages, setPages] = React.useState<PageContent[]>(defaultPages)
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [form, setForm] = React.useState<FormData>({
    title: "", meta_title: "", meta_description: "", content: "", is_published: true,
  })
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    db.pages(false).then((rows) => {
      if (rows.length) setPages(rows)
    })
  }, [])

  const handleOpenEdit = (page: PageContent) => {
    setEditingId(page.id)
    setForm({
      title: page.title,
      meta_title: page.meta_title,
      meta_description: page.meta_description,
      content: page.content,
      is_published: page.is_published,
    })
    setErrors({})
    setEditDialogOpen(true)
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.title.trim()) errs.title = "Judul wajib diisi"
    if (!form.content.trim()) errs.content = "Konten wajib diisi"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    if (!editingId) return
    const page = pages.find((p) => p.id === editingId)
    if (!page) return
    const updatedPage = {
      ...page,
      title: form.title,
      meta_title: form.meta_title,
      meta_description: form.meta_description,
      content: form.content,
      is_published: form.is_published,
    }
    setPages((prev) => prev.map((p) => (p.id === editingId ? updatedPage : p)))
    await db.upsertPage({
      id: updatedPage.id,
      slug: updatedPage.slug,
      title: updatedPage.title,
      content: updatedPage.content,
      meta_title: updatedPage.meta_title,
      meta_description: updatedPage.meta_description,
      is_published: updatedPage.is_published,
    })
    setEditDialogOpen(false)
    toast.success("Halaman berhasil diperbarui")
  }

  const togglePublish = async (id: string) => {
    const page = pages.find((p) => p.id === id)
    if (!page) return
    const updated = { ...page, is_published: !page.is_published }
    setPages((prev) => prev.map((p) => (p.id === id ? updated : p)))
    await db.upsertPage({
      id: updated.id,
      slug: updated.slug,
      title: updated.title,
      content: updated.content,
      meta_title: updated.meta_title,
      meta_description: updated.meta_description,
      is_published: updated.is_published,
    })
    toast.success("Status publikasi diubah")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Manajemen Konten</h2>
        <p className="text-sm text-muted-foreground">Kelola halaman statis website</p>
      </div>

      <div className="grid gap-4">
        {pages.map((page) => (
          <div
            key={page.id}
            className="rounded-xl border bg-card p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{page.title}</h3>
                    <Badge
                      variant={page.is_published ? "default" : "secondary"}
                      className="text-[10px]"
                    >
                      {page.is_published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">/{page.slug}</p>
                  <div className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {page.content.replace(/<[^>]*>/g, "").slice(0, 150)}
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Meta Title: {page.meta_title}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Switch
                  checked={page.is_published}
                  onCheckedChange={() => togglePublish(page.id)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleOpenEdit(page)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Halaman</DialogTitle>
            <DialogDescription>
              Perbarui konten halaman statis.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Halaman *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Judul halaman"
              />
              {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={form.meta_title}
                onChange={(e) => setForm((f) => ({ ...f, meta_title: e.target.value }))}
                placeholder="Meta title untuk SEO"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta Description</Label>
              <textarea
                id="meta_description"
                value={form.meta_description}
                onChange={(e) => setForm((f) => ({ ...f, meta_description: e.target.value }))}
                placeholder="Meta description untuk SEO"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Konten (HTML) *</Label>
              <textarea
                id="content"
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="<h2>Judul</h2><p>Konten halaman...</p>"
                className="flex min-h-[250px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              {errors.content && <p className="text-xs text-destructive">{errors.content}</p>}
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="is_published"
                checked={form.is_published}
                onCheckedChange={(v) => setForm((f) => ({ ...f, is_published: v }))}
              />
              <Label htmlFor="is_published">Published</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSave}>Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
