"use client"

import Link from "next/link"
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
} from "lucide-react"
import { SectionHeader } from "@/components/shared/section-header"

const categories = [
  { name: "Skincare", slug: "skincare", icon: Sparkles },
  { name: "Fragrance", slug: "fragrance", icon: Flower2 },
  { name: "Makeup", slug: "makeup", icon: Paintbrush },
  { name: "Body Care", slug: "bodycare", icon: Heart },
  { name: "Hair Care", slug: "haircare", icon: Scissors },
  { name: "Fashion", slug: "fashion", icon: Shirt },
  { name: "Bags", slug: "bags", icon: ShoppingBag },
  { name: "Shoes", slug: "shoes", icon: Footprints },
  { name: "Beauty Tools", slug: "beautytools", icon: Wand },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function CategoriesSection() {
  return (
    <section className="py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Kategori Produk"
          subtitle="Jelajahi produk berdasarkan kategori"
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.div key={category.slug} variants={item}>
                  <Link
                    href={`/kategori/${category.slug}`}
                    className="group relative flex w-24 flex-col items-center gap-2 rounded-xl border border-border bg-card p-3 text-center transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg sm:w-28 sm:gap-3 sm:p-4"
                  >
                  <div className="relative">
                    <div className="absolute inset-0 scale-0 rounded-full bg-primary/10 transition-transform group-hover:scale-100" />
                    <Icon className="relative h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                  </div>
                  <span className="text-[0.65rem] font-medium text-muted-foreground transition-colors group-hover:text-foreground whitespace-nowrap sm:text-xs">
                    {category.name}
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
