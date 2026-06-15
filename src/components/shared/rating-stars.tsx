"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingStarsProps {
  rating: number
  reviewCount?: number
  showCount?: boolean
}

export function RatingStars({
  rating,
  reviewCount = 0,
  showCount = true,
}: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(rating)
        const half = !filled && star - 0.5 <= rating

        return (
          <Star
            key={star}
            className={cn(
              "h-4 w-4",
              filled
                ? "fill-yellow-400 text-yellow-400"
                : half
                  ? "fill-yellow-400/50 text-yellow-400"
                  : "fill-muted text-muted-foreground"
            )}
          />
        )
      })}
      {showCount && reviewCount > 0 && (
        <span className="ml-1 text-xs text-muted-foreground">
          ({reviewCount})
        </span>
      )}
    </div>
  )
}
