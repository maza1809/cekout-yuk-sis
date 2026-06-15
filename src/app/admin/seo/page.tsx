"use client"

import * as React from "react"
import { db } from "@/lib/services/supabase-service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Save } from "lucide-react"

const pages = [
  { value: "beranda", label: "Beranda" },
  { value: "produk", label: "Produk" },
  { value: "kategori", label: "Kategori" },
  { value: "brand", label: "Brand" },
  { value: "tentang", label: "Tentang Kami" },
  { value: "kebijakan", label: "Kebijakan Privasi" },
  { value: "syarat", label: "Syarat & Ketentuan" },
  { value: "disclaimer", label: "Disclaimer" },
]

type PageSEO = {
  title: string
  description: string
  keywords: string
  og_image: string
  canonical_url: string
  schema_markup: string
}

const defaultSEO: Record<string, PageSEO> = {
  beranda: {
    title: "Cekout Yuk Sis - Produk Viral & Terpercaya untuk Wanita Indonesia",
    description: "Temukan produk skincare, makeup, bodycare, fashion dan lainnya yang sedang viral dan terpercaya di Indonesia.",
    keywords: "skincare, makeup, beauty, viral, produk kecantikan, rekomendasi produk",
    og_image: "/og-image.png",
    canonical_url: "https://cekoutyuk.sis",
    schema_markup: '{\n  "@context": "https://schema.org",\n  "@type": "WebSite",\n  "name": "Cekout Yuk Sis"\n}',
  },
  produk: {
    title: "Semua Produk - Cekout Yuk Sis",
    description: "Koleksi lengkap produk skincare, makeup, bodycare, dan fashion untuk wanita Indonesia.",
    keywords: "produk, belanja, online, skincare, makeup",
    og_image: "/og-image.png",
    canonical_url: "https://cekoutyuk.sis/produk",
    schema_markup: "",
  },
  kategori: {
    title: "Kategori - Cekout Yuk Sis",
    description: "Jelajahi produk berdasarkan kategori.",
    keywords: "kategori, skincare, makeup, bodycare",
    og_image: "/og-image.png",
    canonical_url: "https://cekoutyuk.sis/kategori",
    schema_markup: "",
  },
  brand: {
    title: "Brand - Cekout Yuk Sis",
    description: "Lihat brand-brand produk terbaik di Cekout Yuk Sis.",
    keywords: "brand, merek, produk, skincare",
    og_image: "/og-image.png",
    canonical_url: "https://cekoutyuk.sis/brand",
    schema_markup: "",
  },
}

export default function SEOPage() {
  const [selectedPage, setSelectedPage] = React.useState("beranda")
  const [seoData, setSeoData] = React.useState<Record<string, PageSEO>>(() => {
    if (typeof window === "undefined") return defaultSEO
    try {
      const saved = localStorage.getItem("admin_seo")
      if (saved) return JSON.parse(saved)
    } catch {}
    return defaultSEO
  })
  const [form, setForm] = React.useState<PageSEO>(() => {
    if (typeof window === "undefined") return defaultSEO["beranda"]
    try {
      const saved = localStorage.getItem("admin_seo")
      if (saved) {
        const parsed = JSON.parse(saved)
        return parsed["beranda"] || defaultSEO["beranda"]
      }
    } catch {}
    return defaultSEO["beranda"]
  })

  React.useEffect(() => {
    db.seoMeta().then((rows) => {
      if (!rows.length) return
      const merged: Record<string, PageSEO> = { ...seoData }
      for (const row of rows) {
        merged[row.page] = {
          title: row.title,
          description: row.description,
          keywords: row.keywords,
          og_image: row.og_image,
          canonical_url: row.canonical_url,
          schema_markup: row.schema_markup,
        }
      }
      setSeoData(merged)
      setForm(merged[selectedPage] || merged["beranda"])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async () => {
    const updated = { ...seoData, [selectedPage]: form }
    setSeoData(updated)
    localStorage.setItem("admin_seo", JSON.stringify(updated))
    await db.upsertSeoMeta({
      page: selectedPage,
      title: form.title,
      description: form.description,
      keywords: form.keywords,
      og_image: form.og_image,
      canonical_url: form.canonical_url,
      schema_markup: form.schema_markup,
    })
    toast.success("SEO berhasil disimpan")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">SEO Manager</h2>
          <p className="text-sm text-muted-foreground">Kelola meta data SEO setiap halaman</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Simpan SEO
        </Button>
      </div>

      <div className="max-w-xs">
        <Select value={selectedPage} onValueChange={(val) => {
          setSelectedPage(val)
          setForm(seoData[val] || { title: "", description: "", keywords: "", og_image: "", canonical_url: "", schema_markup: "" })
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih Halaman" />
          </SelectTrigger>
          <SelectContent>
            {pages.map((p) => (
              <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-sm space-y-4">
          <h3 className="font-semibold">Meta Data</h3>

          <div className="space-y-2">
            <Label htmlFor="title">Meta Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Meta title"
            />
            <p className="text-xs text-muted-foreground">{form.title.length} karakter</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Meta Description</Label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Meta description"
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <p className="text-xs text-muted-foreground">{form.description.length} karakter</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              value={form.keywords}
              onChange={(e) => setForm((f) => ({ ...f, keywords: e.target.value }))}
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="og_image">OG Image URL</Label>
            <Input
              id="og_image"
              value={form.og_image}
              onChange={(e) => setForm((f) => ({ ...f, og_image: e.target.value }))}
              placeholder="/og-image.png"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="canonical_url">Canonical URL</Label>
            <Input
              id="canonical_url"
              value={form.canonical_url}
              onChange={(e) => setForm((f) => ({ ...f, canonical_url: e.target.value }))}
              placeholder="https://cekoutyuk.sis"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="schema_markup">Schema Markup (JSON-LD)</Label>
            <textarea
              id="schema_markup"
              value={form.schema_markup}
              onChange={(e) => setForm((f) => ({ ...f, schema_markup: e.target.value }))}
              placeholder="{ }"
              className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="font-semibold mb-4">Google Search Preview</h3>
            <div className="rounded-lg border bg-white p-4 dark:bg-neutral-900">
              <p className="text-xs text-green-700 dark:text-green-400 truncate">
                {form.canonical_url || "cekoutyuk.sis"}
              </p>
              <p className="text-lg text-blue-700 dark:text-blue-400 font-medium leading-tight truncate hover:underline cursor-pointer">
                {form.title || "Meta Title"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {form.description || "Meta description akan muncul di sini..."}
              </p>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="font-semibold mb-4">Tips SEO</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Meta Title idealnya 50-60 karakter
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Meta Description idealnya 150-160 karakter
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Gunakan keyword utama di awal title
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Pastikan setiap halaman memiliki meta unik
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                Gunakan canonical URL untuk hindari duplikasi
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
