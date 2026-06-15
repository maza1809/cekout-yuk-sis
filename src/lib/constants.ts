export const SITE_NAME = "Cekout Yuk Sis"
export const SITE_DESCRIPTION = "Platform kurasi produk pilihan untuk wanita Indonesia. Temukan produk terbaik, viral, dan terpercaya dari berbagai marketplace."
export const SITE_URL = "https://cekoutyuk.sis"
export const SITE_LOGO = "/logo.svg"

export const CATEGORY_ICONS: Record<string, string> = {
  skincare: "Sparkles",
  fragrance: "Flower2",
  makeup: "Paintbrush",
  bodycare: "Heart",
  haircare: "Scissors",
  fashion: "Shirt",
  bags: "ShoppingBag",
  shoes: "Footprints",
  beautytools: "Wand",
}

export const SOCIAL_PLATFORMS = [
  { name: "Instagram", icon: "Instagram", url: "https://www.instagram.com/cekoutyuksis_?igsh=MTR5ZzByYnR6aDE0bA==" },
  { name: "Facebook", icon: "Facebook", url: "https://www.facebook.com/share/17d7Lcm4Tw/" },
  { name: "Threads", icon: "AtSign", url: "https://www.threads.com/@cekoutyuksis_" },
  { name: "TikTok", icon: "Music2", url: "https://www.tiktok.com/@cekout.yuk.sis?_r=1&_t=ZS-979GcEiX8pY" },
  { name: "X", icon: "Twitter", url: "https://x.com/CekoutYukSis" },
  { name: "YouTube", icon: "Youtube", url: "https://youtube.com/@cekoutyuksis?si=PT2IGKZw5ytSBUA1" },
]

export const AFFILIATE_PLATFORMS = [
  { value: "shopee", label: "Shopee" },
  { value: "other", label: "Lainnya" },
]

export const SORT_OPTIONS = [
  { value: "newest", label: "Terbaru" },
  { value: "trending", label: "Trending" },
  { value: "recommended", label: "Just For You" },
  { value: "price_asc", label: "Termurah" },
  { value: "price_desc", label: "Termahal" },
] as const
