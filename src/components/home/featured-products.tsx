"use client"

import { type Product } from "@/types"
import { ProductCard } from "@/components/shared/product-card"
import { SectionHeader } from "@/components/shared/section-header"

interface FeaturedProductsProps {
  title: string
  subtitle: string
  products: Product[]
  isTrending?: boolean
}

export function FeaturedProducts({ title, subtitle, products, isTrending }: FeaturedProductsProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          link="/produk"
        />
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.map((product, i) => (
            <div key={product.id} className="min-w-[260px] snap-start sm:min-w-0">
              <ProductCard product={product} index={i} isTrending={isTrending} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
