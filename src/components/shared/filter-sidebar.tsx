"use client"

import { Search, Sparkles, Flower2, Paintbrush, Heart, Scissors, Shirt, ShoppingBag, Footprints, Wand, type LucideIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const iconMap: Record<string, LucideIcon> = {
  Sparkles, Flower2, Paintbrush, Heart, Scissors, Shirt, ShoppingBag, Footprints, Wand,
}

interface FilterSidebarProps {
  search: string
  onSearchChange: (val: string) => void
  selectedCategories: string[]
  categoryList: string[]
  allCategories: { slug: string; name: string; icon: string }[]
  onToggleCategory: (slug: string) => void
  selectedBrands: string[]
  brandList: string[]
  onToggleBrand: (brand: string) => void
  priceMin: string
  priceMax: string
  onPriceMinChange: (val: string) => void
  onPriceMaxChange: (val: string) => void
  selectedRating: number
  onRatingChange: (val: number) => void
  onClear: () => void
}

export function FilterSidebar({
  search,
  onSearchChange,
  selectedCategories,
  categoryList,
  allCategories,
  onToggleCategory,
  selectedBrands,
  brandList,
  onToggleBrand,
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange,
  selectedRating,
  onRatingChange,
  onClear,
}: FilterSidebarProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold">Kategori</h4>
        <div className="space-y-2">
          {categoryList.map((slug) => {
            const cat = allCategories.find((c) => c.slug === slug)
            const Icon = cat ? iconMap[cat.icon] : null
            return (
              <label
                key={slug}
                className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(slug)}
                  onChange={() => onToggleCategory(slug)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {cat?.name ?? slug}
              </label>
            )
          })}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold">Brand</h4>
        <div className="space-y-2">
          {brandList.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => onToggleBrand(brand)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold">Harga</h4>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={priceMin}
            onChange={(e) => onPriceMinChange(e.target.value)}
            className="h-9 text-sm"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={priceMax}
            onChange={(e) => onPriceMaxChange(e.target.value)}
            className="h-9 text-sm"
          />
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold">Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((star) => (
            <label
              key={star}
              className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <input
                type="radio"
                name="rating"
                checked={selectedRating === star}
                onChange={() => onRatingChange(star)}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <span className="flex items-center gap-0.5">
                {"★".repeat(star)}
                {"☆".repeat(5 - star)}
              </span>
              <span className="text-xs">& up</span>
            </label>
          ))}
          <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <input
              type="radio"
              name="rating"
              checked={selectedRating === 0}
              onChange={() => onRatingChange(0)}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            Semua Rating
          </label>
        </div>
      </div>

      <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={onClear}>
        Hapus Semua Filter
      </Button>
    </div>
  )
}
