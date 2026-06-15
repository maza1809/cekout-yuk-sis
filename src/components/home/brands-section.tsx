"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "@/components/shared/section-header"
import { useBrands } from "@/contexts/brand-context"

const gradients = [
  "from-pink-400 to-rose-500",
  "from-green-400 to-emerald-500",
  "from-pink-300 to-pink-500",
  "from-blue-400 to-indigo-500",
  "from-red-400 to-rose-500",
  "from-purple-400 to-violet-500",
  "from-gray-400 to-gray-600",
  "from-yellow-400 to-orange-500",
  "from-teal-400 to-cyan-500",
  "from-orange-400 to-red-500",
  "from-violet-400 to-purple-500",
  "from-pink-400 to-purple-500",
]

export function BrandsSection() {
  const { brands } = useBrands()

  return (
    <section className="py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Brand Favorit"
          subtitle="Brand-brand favorit para Sis"
        />
      </div>
      <div className="group relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="flex w-max gap-8 [animation:marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]"
          >
            {[...brands, ...brands].map((brand, i) => (
              <a
                key={`${brand.id}-${i}`}
                href={brand.shopee_url || "#"}
                target={brand.shopee_url ? "_blank" : undefined}
                rel={brand.shopee_url ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center gap-3 min-w-[120px]"
              >
                <div
                  className={`h-16 w-16 rounded-full bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center text-lg font-bold text-white shadow-md transition-transform hover:scale-110`}
                >
                  {brand.name.charAt(0)}
                </div>
                <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                  {brand.name}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
