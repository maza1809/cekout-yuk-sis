"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { SocialMedia } from "@/types"
import { db } from "@/lib/services/supabase-service"

import { toast } from "sonner"
import { Pencil, AtSign } from "lucide-react"
import { FaInstagram, FaFacebook, FaXTwitter, FaYoutube, FaTiktok, FaThreads } from "react-icons/fa6"

const iconMap: Record<string, React.ReactNode> = {
  Instagram: <FaInstagram className="h-5 w-5" />,
  Facebook: <FaFacebook className="h-5 w-5" />,
  AtSign: <FaThreads className="h-5 w-5" />,
  Music2: <FaTiktok className="h-5 w-5" />,
  Twitter: <FaXTwitter className="h-5 w-5" />,
  Youtube: <FaYoutube className="h-5 w-5" />,
}

const defaultSocialMedia: SocialMedia[] = [
  { id: "sm1", platform: "Instagram", url: "https://www.instagram.com/cekoutyuksis_?igsh=MTR5ZzByYnR6aDE0bA==", icon: "Instagram", followers: "", description: "Follow Instagram kami untuk update produk terbaru", is_active: true, sort_order: 1 },
  { id: "sm2", platform: "Facebook", url: "https://www.facebook.com/share/17d7Lcm4Tw/", icon: "Facebook", followers: "", description: "Gabung di Facebook untuk info promo", is_active: true, sort_order: 2 },
  { id: "sm3", platform: "Threads", url: "https://www.threads.com/@cekoutyuksis_", icon: "AtSign", followers: "", description: "Ikuti Threads untuk tips dan rekomendasi", is_active: true, sort_order: 3 },
  { id: "sm4", platform: "TikTok", url: "https://www.tiktok.com/@cekout.yuk.sis?_r=1&_t=ZS-979GcEiX8pY", icon: "Music2", followers: "", description: "Tonton video review produk viral di TikTok", is_active: true, sort_order: 4 },
  { id: "sm5", platform: "X", url: "https://x.com/CekoutYukSis", icon: "Twitter", followers: "", description: "Ikuti X untuk berita terbaru", is_active: false, sort_order: 5 },
  { id: "sm6", platform: "YouTube", url: "https://youtube.com/@cekoutyuksis?si=PT2IGKZw5ytSBUA1", icon: "Youtube", followers: "", description: "Subscribe YouTube untuk konten eksklusif", is_active: true, sort_order: 6 },
]

type FormData = {
  url: string
  description: string
}

export default function SosialMediaPage() {
  const [platforms, setPlatforms] = React.useState<SocialMedia[]>(defaultSocialMedia)
  const [editDialogOpen, setEditDialogOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [form, setForm] = React.useState<FormData>({ url: "", description: "" })
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    db.socialMedia(false).then((data) => {
      if (data.length > 0) setPlatforms(data)
    })
  }, [])

  const handleOpenEdit = (item: SocialMedia) => {
    setEditingId(item.id)
    setForm({ url: item.url, description: item.description })
    setErrors({})
    setEditDialogOpen(true)
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.url.trim()) errs.url = "URL wajib diisi"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    if (!editingId) return
    setPlatforms((prev) =>
      prev.map((p) =>
        p.id === editingId
          ? { ...p, url: form.url, description: form.description, updated_at: new Date().toISOString() }
          : p
      )
    )
    await db.upsertSocialMedia({ ...form, id: editingId, updated_at: new Date().toISOString() })
    toast.success("Platform berhasil diperbarui")
    setEditDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Sosial Media</h2>
        <p className="text-sm text-muted-foreground">Kelola tautan media sosial</p>
      </div>

      <div className="grid gap-4">
        {platforms.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-sm sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {iconMap[item.icon] || <AtSign className="h-5 w-5" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{item.platform}</h3>
                </div>
                <p className="text-sm text-muted-foreground truncate max-w-md">{item.url}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
              </div>
              <div className="hidden items-center gap-2 sm:flex" />
            </div>
            <div className="flex items-center gap-2 sm:shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleOpenEdit(item)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Platform</DialogTitle>
            <DialogDescription>
              Perbarui informasi platform media sosial.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL *</Label>
              <Input
                id="url"
                value={form.url}
                onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                placeholder="https://"
              />
              {errors.url && <p className="text-xs text-destructive">{errors.url}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <textarea
                id="description"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Deskripsi platform"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
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
