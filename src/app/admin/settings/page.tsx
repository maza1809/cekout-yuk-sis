"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { toast } from "sonner"
import { Save, Globe, Search, Share2, Code, RefreshCw } from "lucide-react"

type GeneralSettings = {
  site_name: string
  site_description: string
  logo_url: string
  favicon_url: string
}

type SEOSettings = {
  default_meta_title: string
  default_meta_description: string
  keywords: string
  og_image: string
}

type ScriptSettings = {
  google_analytics_id: string
  facebook_pixel_id: string
  google_search_console: string
  microsoft_clarity_id: string
  custom_head_scripts: string
}

type SocialSettings = {
  instagram: string
  facebook: string
  threads: string
  tiktok: string
  twitter: string
  youtube: string
}

const defaultGeneral: GeneralSettings = {
  site_name: "Cekout Yuk Sis",
  site_description: "Platform kurasi produk pilihan untuk wanita Indonesia. Temukan produk terbaik, viral, dan terpercaya dari berbagai marketplace.",
  logo_url: "/logo.svg",
  favicon_url: "/favicon.ico",
}

const defaultSEO: SEOSettings = {
  default_meta_title: "Cekout Yuk Sis - Produk Viral & Terpercaya untuk Wanita Indonesia",
  default_meta_description: "Temukan produk skincare, makeup, bodycare, fashion dan lainnya yang sedang viral dan terpercaya di Indonesia.",
  keywords: "skincare, makeup, beauty, viral, produk kecantikan, rekomendasi produk",
  og_image: "/og-image.png",
}

const defaultScripts: ScriptSettings = {
  google_analytics_id: "",
  facebook_pixel_id: "",
  google_search_console: "",
  microsoft_clarity_id: "",
  custom_head_scripts: "",
}

const defaultSocial: SocialSettings = {
  instagram: "https://www.instagram.com/cekoutyuksis_?igsh=MTR5ZzByYnR6aDE0bA==",
  facebook: "https://www.facebook.com/share/17d7Lcm4Tw/",
  threads: "https://www.threads.com/@cekoutyuksis_",
  tiktok: "https://www.tiktok.com/@cekout.yuk.sis?_r=1&_t=ZS-979GcEiX8pY",
  twitter: "https://x.com/CekoutYukSis",
  youtube: "https://youtube.com/@cekoutyuksis?si=PT2IGKZw5ytSBUA1",
}

function loadSavedSettings() {
  if (typeof window === "undefined") return null
  try {
    const saved = localStorage.getItem("admin_settings")
    if (saved) return JSON.parse(saved)
  } catch {}
  return null
}

export default function SettingsPage() {
  const [general, setGeneral] = React.useState<GeneralSettings>(() => {
    const saved = loadSavedSettings()
    return saved?.general || defaultGeneral
  })
  const [seo, setSeo] = React.useState<SEOSettings>(() => {
    const saved = loadSavedSettings()
    return saved?.seo || defaultSEO
  })
  const [scripts, setScripts] = React.useState<ScriptSettings>(() => {
    const saved = loadSavedSettings()
    return saved?.scripts || defaultScripts
  })
  const [social, setSocial] = React.useState<SocialSettings>(() => {
    const saved = loadSavedSettings()
    return saved?.social || defaultSocial
  })

  const handleSave = () => {
    const data = { general, seo, scripts, social }
    localStorage.setItem("admin_settings", JSON.stringify(data))
    toast.success("Pengaturan berhasil disimpan")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pengaturan</h2>
          <p className="text-sm text-muted-foreground">Kelola pengaturan website</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Simpan Pengaturan
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">
            <Globe className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="seo">
            <Search className="mr-2 h-4 w-4" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="social">
            <Share2 className="mr-2 h-4 w-4" />
            Social Media
          </TabsTrigger>
          <TabsTrigger value="scripts">
            <Code className="mr-2 h-4 w-4" />
            Scripts
          </TabsTrigger>
          <TabsTrigger value="sync">
            <RefreshCw className="mr-2 h-4 w-4" />
            Auto Sync
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="site_name">Site Name</Label>
                <Input
                  id="site_name"
                  value={general.site_name}
                  onChange={(e) => setGeneral((f) => ({ ...f, site_name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo_url">Logo URL</Label>
                <Input
                  id="logo_url"
                  value={general.logo_url}
                  onChange={(e) => setGeneral((f) => ({ ...f, logo_url: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="favicon_url">Favicon URL</Label>
                <Input
                  id="favicon_url"
                  value={general.favicon_url}
                  onChange={(e) => setGeneral((f) => ({ ...f, favicon_url: e.target.value }))}
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="site_description">Site Description</Label>
              <textarea
                id="site_description"
                value={general.site_description}
                onChange={(e) => setGeneral((f) => ({ ...f, site_description: e.target.value }))}
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="default_meta_title">Default Meta Title</Label>
                <Input
                  id="default_meta_title"
                  value={seo.default_meta_title}
                  onChange={(e) => setSeo((f) => ({ ...f, default_meta_title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="default_meta_description">Default Meta Description</Label>
                <textarea
                  id="default_meta_description"
                  value={seo.default_meta_description}
                  onChange={(e) => setSeo((f) => ({ ...f, default_meta_description: e.target.value }))}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  value={seo.keywords}
                  onChange={(e) => setSeo((f) => ({ ...f, keywords: e.target.value }))}
                  placeholder="Pisahkan dengan koma"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="og_image">OG Image URL</Label>
                <Input
                  id="og_image"
                  value={seo.og_image}
                  onChange={(e) => setSeo((f) => ({ ...f, og_image: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(social).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                  <Input
                    id={key}
                    value={value}
                    onChange={(e) => setSocial((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={`https://${key}.com/...`}
                  />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scripts" className="space-y-4">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                <Input
                  id="google_analytics_id"
                  value={scripts.google_analytics_id}
                  onChange={(e) => setScripts((f) => ({ ...f, google_analytics_id: e.target.value }))}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook_pixel_id">Facebook Pixel ID</Label>
                <Input
                  id="facebook_pixel_id"
                  value={scripts.facebook_pixel_id}
                  onChange={(e) => setScripts((f) => ({ ...f, facebook_pixel_id: e.target.value }))}
                  placeholder="XXXXXXXXXXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="google_search_console">Google Search Console</Label>
                <Input
                  id="google_search_console"
                  value={scripts.google_search_console}
                  onChange={(e) => setScripts((f) => ({ ...f, google_search_console: e.target.value }))}
                  placeholder="XXXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="microsoft_clarity_id">Microsoft Clarity ID</Label>
                <Input
                  id="microsoft_clarity_id"
                  value={scripts.microsoft_clarity_id}
                  onChange={(e) => setScripts((f) => ({ ...f, microsoft_clarity_id: e.target.value }))}
                  placeholder="XXXXXXXX"
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="custom_head_scripts">Custom Head Scripts</Label>
              <textarea
                id="custom_head_scripts"
                value={scripts.custom_head_scripts}
                onChange={(e) => setScripts((f) => ({ ...f, custom_head_scripts: e.target.value }))}
                placeholder="<script>...</script>"
                className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
          </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="font-semibold mb-1">Auto-Sync Produk Shopee</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Sinkronisasi otomatis memperbarui harga, rating, review, dan jumlah terjual setiap 6 jam.
            </p>
            <div className="space-y-3">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm font-medium">Cron Job Endpoint</p>
                <div className="mt-1 flex items-center gap-2">
                  <code className="flex-1 rounded bg-background px-3 py-2 text-xs font-mono border">
                    https://cekoutyuksis.com/api/sync-all
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText("https://cekoutyuksis.com/api/sync-all")
                      toast.success("URL disalin")
                    }}
                  >
                    Copy
                  </Button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Gunakan layanan cron-job.org atau service serupa untuk memanggil endpoint ini setiap 6 jam.
                  Method: <strong>POST</strong>
                </p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 p-4">
                <p className="text-xs text-amber-800 dark:text-amber-200">
                  <strong>Catatan:</strong> Saat ini scraping menggunakan data simulasi. Untuk scraping
                  Shopee secara real, dibutuhkan proxy/API scraping eksternal seperti Bright Data,
                  ScrapingBee, atau Puppeteer di server.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
