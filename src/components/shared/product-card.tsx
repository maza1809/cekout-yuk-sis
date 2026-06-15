"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, ShoppingBag, Eye, TrendingUp } from "lucide-react"
import { type Product } from "@/types"
import { cn, formatPrice, truncate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductCardProps {
  product: Product
  index?: number
  isTrending?: boolean
}

export function ProductCard({ product, index = 0, isTrending }: ProductCardProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-gray-800">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
          />

          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              variant="secondary"
              size="sm"
              className="gap-1.5 shadow-lg"
              asChild
            >
              <Link href={product.affiliate_url} target="_blank" rel="noopener noreferrer">
                <Eye className="h-4 w-4" />
                Lihat Produk
              </Link>
            </Button>
          </div>

          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {isTrending && (
              <Badge variant="destructive" className="gap-1 px-2 py-0.5 text-xs font-bold animate-pulse">
                <TrendingUp className="h-3 w-3" />
                Trending
              </Badge>
            )}
            {product.is_new && (
              <Badge variant="default" className="gap-1 border-0 bg-green-500 px-2 py-0.5 text-xs font-bold text-white hover:bg-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5 h-3 w-3" aria-hidden="true">
                  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
                  <path d="M20 2v4"></path>
                  <path d="M22 4h-4"></path>
                  <circle cx="4" cy="20" r="2"></circle>
                </svg>
                New
              </Badge>
            )}
          </div>

          <div className="absolute right-2 top-2">
            <Badge variant="secondary" className="px-2 py-0.5 text-xs capitalize">
              {product.category_id}
            </Badge>
          </div>

          {product.original_price && product.original_price > product.price && (
            <div className="absolute left-2 bottom-2">
              <Badge variant="default" className="border-0 bg-primary px-2 py-0.5 text-xs font-bold">
                -{Math.round((1 - product.price / product.original_price) * 100)}%
              </Badge>
            </div>
          )}
        </div>

        <div className="space-y-2 p-3">
          <p className="text-xs font-medium text-muted-foreground">{product.brand_id}</p>

          <h3 className="line-clamp-2 text-sm font-semibold leading-tight">
            {product.name}
          </h3>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => {
              const starValue = i + 1
              return (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    starValue <= Math.round(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-muted text-muted-foreground"
                  )}
                />
              )
            })}
            <span className="ml-1 text-xs text-muted-foreground">
              ({product.review_count})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>

          <Button
            variant="default"
            size="sm"
            className="w-full gap-1.5"
            asChild
          >
            <Link href={product.affiliate_url} target="_blank" rel="noopener noreferrer">
              <ShoppingBag className="h-4 w-4" />
              Lihat Produk
            </Link>
          </Button>
        </div>


      </div>
    </motion.div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card dark:border-gray-800">
      <Skeleton className="aspect-[4/5] rounded-none" />
      <div className="space-y-2 p-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </div>
  )
}
