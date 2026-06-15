"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { db } from "@/lib/services/supabase-service"
import { Button } from "@/components/ui/button"
import type { Banner } from "@/types"

const demoBanners: Banner[] = [
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
    cta_link: "/produk",
    sort_order: 3,
    is_active: true,
  },
]

export function BannerSection() {
  const [banners, setBanners] = React.useState<Banner[]>([])
  const [current, setCurrent] = React.useState(0)
  const [direction, setDirection] = React.useState(0)
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  React.useEffect(() => {
    async function fetchBanners() {
      const data = await db.banners()
      if (data && data.length > 0) {
        setBanners(data)
      } else {
        setBanners(demoBanners)
      }
    }
    fetchBanners()
  }, [])

  React.useEffect(() => {
    if (banners.length <= 1) return
    timerRef.current = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [banners.length])

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const next = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % banners.length)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const prev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  if (banners.length === 0) return null

  const banner = banners[current]

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl">
          <div className="relative aspect-[21/9]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={banner.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Link href={banner.cta_link || "/"}>
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${banner.image})` }}
                  >
                    <div className="flex h-full w-full items-center bg-gradient-to-r from-black/60 via-black/30 to-transparent p-6 sm:p-10">
                      <div className="max-w-lg">
                        <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                          {banner.title}
                        </h3>
                        {banner.subtitle && (
                          <p className="mt-2 text-sm text-white/80 sm:text-base">
                            {banner.subtitle}
                          </p>
                        )}
                        {banner.cta_text && (
                          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-white/90">
                            {banner.cta_text}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {banners.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 text-gray-800 backdrop-blur hover:bg-white"
                onClick={prev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 text-gray-800 backdrop-blur hover:bg-white"
                onClick={next}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === current
                        ? "w-6 bg-white"
                        : "w-2 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
