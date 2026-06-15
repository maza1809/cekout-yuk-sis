"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Grid3X3, HeartHandshake, Info, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Beranda", href: "/", icon: Home },
  { label: "Kategori", href: "/kategori", icon: Grid3X3 },
  { label: "Brand", href: "/brand", icon: HeartHandshake },
  { label: "Tentang", href: "/tentang-kami", icon: Info },
  { label: "Sosial", href: "/sosial-media", icon: Share2 },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-xl sm:hidden safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <span className="absolute -top-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-primary" />
              )}
              <item.icon className={cn("h-6 w-6", isActive && "fill-primary/10")} />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
