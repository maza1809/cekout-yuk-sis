"use client"

import { motion } from "framer-motion"
import { staggerContainer } from "@/lib/animations"
import { ShoppingBag, Eye, ChevronLeft, Home, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { truncate, getInitials } from "@/lib/utils"
import { useBrands } from "@/contexts/brand-context"

const gradients = [
  "from-pink-500 to-rose-500",
  "from-purple-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-red-500",
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-purple-500",
  "from-amber-500 to-yellow-500",
  "from-lime-500 to-green-500",
  "from-pink-400 to-purple-500",
  "from-teal-400 to-cyan-500",
  "from-fuchsia-500 to-pink-500",
  "from-sky-500 to-blue-500",
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function BrandPage() {
  const { brands } = useBrands()

  return (
    <div className="min-h-dvh">
      <div className="bg-gradient-to-b from-secondary/30 to-background px-4 pb-8 pt-6 sm:pt-10">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Home className="h-3.5 w-3.5" />
              Beranda
            </Link>
            <span>/</span>
            <span className="font-medium text-foreground">Brand</span>
          </nav>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Brand Favorit
            </h1>
            <p className="text-sm text-muted-foreground">
              Brand-brand terpopuler dan terpercaya
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
          className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {brands.map((brand, index) => (
            <motion.div key={brand.id} variants={cardVariants}>
              <Link href={`/brand/${brand.slug}`} className="group block h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 dark:border-gray-800">
                  <div className="flex flex-col items-center p-6 text-center sm:p-8">
                    <div className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${gradients[index % gradients.length]} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      <span className="text-2xl font-bold text-white">
                        {getInitials(brand.name)}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold transition-colors group-hover:text-primary">
                      {brand.name}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {truncate(brand.description, 80)}
                    </p>

                    <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                      {brand.categories.map((cat) => (
                        <Badge key={cat} variant="secondary" className="text-xs capitalize">
                          {cat}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ShoppingBag className="h-3.5 w-3.5" />
                        {brand.product_count || 0} produk
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        {brand.click_count.toLocaleString("id-ID")}
                      </span>
                    </div>

                    {brand.shopee_url && (
                      <div className="mt-3 w-full">
                        <a
                          href={brand.shopee_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                          Toko Shopee
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto border-t px-6 py-3">
                    <span className="flex items-center justify-center gap-1 text-xs font-medium text-primary opacity-0 transition-all group-hover:opacity-100">
                      Lihat Brand
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
