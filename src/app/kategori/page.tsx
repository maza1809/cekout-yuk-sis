"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Sparkles,
  Flower2,
  Paintbrush,
  Heart,
  Scissors,
  Shirt,
  ShoppingBag,
  Footprints,
  Wand,
  ChevronLeft,
  Home,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { db } from "@/lib/services/supabase-service"
import type { Category } from "@/types"
import { staggerContainer } from "@/lib/animations"

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Flower2,
  Paintbrush,
  Heart,
  Scissors,
  Shirt,
  ShoppingBag,
  Footprints,
  Wand,
}

const defaultCategories = [
  { slug: "skincare", name: "Skincare", icon: "Sparkles", description: "Rawat kulit wajahmu dengan produk skincare terbaik dari berbagai brand ternama. Temukan moisturizer, serum, sunscreen, dan lainnya untuk kulit sehat bercahaya.", productCount: 5 },
  { slug: "fragrance", name: "Fragrance", icon: "Flower2", description: "Temukan wewangian favoritmu, dari parfum lokal hingga import. Aroma tahan lama yang bikin kamu percaya diri sepanjang hari.", productCount: 1 },
  { slug: "makeup", name: "Makeup", icon: "Paintbrush", description: "Lengkapi makeup look-mu dengan koleksi kosmetik terbaru dan viral. Dari lip cream hingga foundation, semua ada di sini.", productCount: 3 },
  { slug: "bodycare", name: "Body Care", icon: "Heart", description: "Rawat tubuhmu dari ujung rambut sampai ujung kaki dengan produk body care terbaik. Body lotion, scrub, sabun, dan lainnya.", productCount: 1 },
  { slug: "haircare", name: "Hair Care", icon: "Scissors", description: "Dapatkan rambut indah dan sehat dengan produk haircare pilihan. Hair vitamin, shampoo, conditioner, dan treatment.", productCount: 1 },
  { slug: "fashion", name: "Fashion", icon: "Shirt", description: "Tampil stylish setiap hari dengan koleksi fashion terkini. Pakaian, aksesoris, dan outfit kekinian untuk segala acara.", productCount: 0 },
  { slug: "bags", name: "Tas", icon: "ShoppingBag", description: "Koleksi tas untuk segala acara, dari casual hingga formal. Temukan tas impianmu dengan harga terbaik.", productCount: 0 },
  { slug: "shoes", name: "Sepatu", icon: "Footprints", description: "Langkah percaya diri dengan sepatu kekinian dan nyaman. Sneakers, heels, flats, dan sandal untuk setiap momen.", productCount: 0 },
  { slug: "beautytools", name: "Beauty Tools", icon: "Wand", description: "Tools dan aksesoris kecantikan untuk mendukung rutinitas skincare-mu. Setting spray, kuas, sponge, dan lainnya.", productCount: 1 },
] as Category[]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function KategoriPage() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories)

  useEffect(() => {
    async function fetchData() {
      const data = await db.categories()
      if (data && data.length > 0) setCategories(data)
    }
    fetchData()
  }, [])

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-6">
          <nav className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
            <Link href="/" className="flex items-center gap-1 hover:text-primary">
              <Home className="h-3.5 w-3.5" />
              Beranda
            </Link>
            <ChevronLeft className="h-3.5 w-3.5 -rotate-180" />
            <span className="font-medium text-foreground">Kategori</span>
          </nav>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Semua Kategori
            </h1>
            <p className="text-sm text-muted-foreground">
              Jelajahi produk berdasarkan kategori pilihan
            </p>
          </div>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary/40" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((category) => {
            const Icon = iconMap[category.icon]
            return (
              <motion.div key={category.slug} variants={cardVariants}>
                <Link href={`/kategori/${category.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl border bg-card transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 dark:border-gray-800">
                    <div className="bg-gradient-to-br from-primary/5 via-primary/[0.02] to-transparent p-6 sm:p-8">
                      <div className="flex items-start gap-5">
                        {Icon && (
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                            <Icon className="h-7 w-7 text-primary" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                            {category.description}
                          </p>
                          <div className="mt-4 flex items-center gap-3">
                            <span className="text-xs font-medium text-muted-foreground">
                              {category.productCount && category.productCount > 0
                                ? `${category.productCount} produk`
                                : "Segera hadir"}
                            </span>
                            <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1">
                              Lihat Produk
                              <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.div>
  )
}
