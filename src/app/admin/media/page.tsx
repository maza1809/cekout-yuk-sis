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
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"
import { Plus, Trash2, Copy, Image as ImageIcon, FileText, Video, Music } from "lucide-react"

type MediaItem = {
  id: string
  name: string
  url: string
  size: string
  type: string
  created_at: string
}

const fileIcons: Record<string, React.ReactNode> = {
  image: <ImageIcon className="h-6 w-6" />,
  video: <Video className="h-6 w-6" />,
  audio: <Music className="h-6 w-6" />,
  document: <FileText className="h-6 w-6" />,
}

const defaultMedia: MediaItem[] = [
  { id: "m1", name: "banner-skincare.jpg", url: "https://placehold.co/400x300/6366f1/ffffff?text=Skincare", size: "245 KB", type: "image", created_at: "2025-05-01T10:00:00Z" },
  { id: "m2", name: "banner-bodycare.jpg", url: "https://placehold.co/400x300/ec4899/ffffff?text=Bodycare", size: "189 KB", type: "image", created_at: "2025-05-02T10:00:00Z" },
  { id: "m3", name: "logo-cekout.png", url: "https://placehold.co/400x300/f59e0b/ffffff?text=Logo", size: "56 KB", type: "image", created_at: "2025-05-03T10:00:00Z" },
  { id: "m4", name: "produk-skintific.jpg", url: "https://placehold.co/400x300/10b981/ffffff?text=Skintific", size: "312 KB", type: "image", created_at: "2025-05-04T10:00:00Z" },
  { id: "m5", name: "produk-somethinc.jpg", url: "https://placehold.co/400x300/8b5cf6/ffffff?text=Somethinc", size: "278 KB", type: "image", created_at: "2025-05-05T10:00:00Z" },
  { id: "m6", name: "banner-promo.jpg", url: "https://placehold.co/400x300/06b6d4/ffffff?text=Promo", size: "423 KB", type: "image", created_at: "2025-05-06T10:00:00Z" },
]

export default function MediaPage() {
  const [media, setMedia] = React.useState<MediaItem[]>(defaultMedia)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [uploadUrl, setUploadUrl] = React.useState("")
  const [uploadDialogOpen, setUploadDialogOpen] = React.useState(false)

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success("URL berhasil disalin")
    } catch {
      toast.error("Gagal menyalin URL")
    }
  }

  const handleDelete = () => {
    if (!deleteId) return
    setMedia((prev) => prev.filter((m) => m.id !== deleteId))
    toast.success("Media berhasil dihapus")
    setDeleteDialogOpen(false)
    setDeleteId(null)
  }

  const handleUpload = () => {
    if (!uploadUrl.trim()) return
    const now = new Date().toISOString()
    const newItem: MediaItem = {
      id: `m${Date.now()}`,
      name: `upload-${Date.now()}.jpg`,
      url: uploadUrl,
      size: "0 KB",
      type: "image",
      created_at: now,
    }
    setMedia((prev) => [newItem, ...prev])
    setUploadUrl("")
    setUploadDialogOpen(false)
    toast.success("Media berhasil ditambahkan")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Media Library</h2>
          <p className="text-sm text-muted-foreground">Kelola file gambar dan media</p>
        </div>
        <Button onClick={() => setUploadDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {media.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
          >
            <div className="relative aspect-square overflow-hidden bg-muted">
              <img
                src={item.url}
                alt={item.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => handleCopyUrl(item.url)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => {
                    setDeleteId(item.id)
                    setDeleteDialogOpen(true)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium truncate" title={item.name}>{item.name}</p>
              <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>{item.size}</span>
                <span>{formatDate(item.created_at)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
            <DialogDescription>
              Masukkan URL gambar untuk ditambahkan ke library.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="upload_url">Image URL</Label>
            <Input
              id="upload_url"
              value={uploadUrl}
              onChange={(e) => setUploadUrl(e.target.value)}
              placeholder="https://placehold.co/400x300"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>Batal</Button>
            <Button onClick={handleUpload}>Tambah</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hapus Media</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus media ini? Tindakan ini tidak bisa dibatalkan.
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
