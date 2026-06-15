"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, SearchX, Clock, TrendingUp, Sparkles } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const RECENT_KEY = "cekout-recent-searches"
const MAX_RECENT = 5

const popularSearches = [
  "Skincare wajah",
  "Parfum wanita",
  "Lipstik tahan lama",
  "Tas kerja",
  "Sepatu sneakers",
]

interface SearchResult {
  type: "product" | "category" | "brand"
  label: string
  href: string
}

export function SearchCommand() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [recent, setRecent] = useState<string[]>(() => {
    if (typeof window === "undefined") return []
    try {
      const stored = localStorage.getItem(RECENT_KEY)
      if (stored) return JSON.parse(stored)
    } catch {}
    return []
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const saveRecent = useCallback((term: string) => {
    setRecent((prev) => {
      const next = [term, ...prev.filter((r) => r !== term)].slice(0, MAX_RECENT)
      localStorage.setItem(RECENT_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const clearRecent = useCallback(() => {
    localStorage.removeItem(RECENT_KEY)
    setRecent([])
  }, [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = useCallback(
    (term: string) => {
      saveRecent(term)
      setOpen(false)
      router.push(`/produk?search=${encodeURIComponent(term)}`)
    },
    [saveRecent, router]
  )

  const handleOpenChange = (val: boolean) => {
    setOpen(val)
    if (val) {
      setQuery("")
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }

  const results: SearchResult[] = query
    ? [
        { type: "product", label: `Cari produk "${query}"`, href: `/produk?search=${encodeURIComponent(query)}` },
        { type: "category", label: `Kategori "${query}"`, href: `/kategori?search=${encodeURIComponent(query)}` },
        { type: "brand", label: `Brand "${query}"`, href: `/brand?search=${encodeURIComponent(query)}` },
      ]
    : []

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="top-[15%] max-w-lg gap-0 p-0 sm:top-[20%]">
        <div className="flex items-center gap-2 border-b px-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk, kategori, brand..."
            className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
          />
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          <AnimatePresence mode="wait">
            {query ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-0.5"
              >
                <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Hasil Pencarian</p>
                {results.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => handleSelect(r.label)}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent"
                  >
                    {r.type === "product" && <Search className="h-3.5 w-3.5 text-muted-foreground" />}
                    {r.type === "category" && <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />}
                    {r.type === "brand" && <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />}
                    {r.label}
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="popular"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div>
                  <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Pencarian Populer</p>
                  <div className="space-y-0.5">
                    {popularSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSelect(term)}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent"
                      >
                        <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {recent.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between px-2 py-1.5">
                      <p className="text-xs font-medium text-muted-foreground">Pencarian Terakhir</p>
                      <button
                        onClick={clearRecent}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Hapus semua
                      </button>
                    </div>
                    <div className="space-y-0.5">
                      {recent.map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSelect(term)}
                          className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent"
                        >
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {query && results.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <SearchX className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Tidak ada hasil untuk &quot;{query}&quot;</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
