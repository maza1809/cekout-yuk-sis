"use client"

import { type Product } from "@/types"
import { ProductCard } from "@/components/shared/product-card"
import { SectionHeader } from "@/components/shared/section-header"
import { Flame } from "lucide-react"

interface ViralProductsProps {
  title: string
  subtitle: string
  products: Product[]
}

export function ViralProducts({ title, subtitle, products }: ViralProductsProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          link="/produk"
          linkText="Lihat Semua"
          icon={Flame}
        />
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:hidden">
          {products.map((product, i) => (
            <div key={product.id} className="min-w-[280px] snap-start">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
        <div className="hidden grid-cols-1 gap-6 sm:grid-cols-2 md:grid lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
