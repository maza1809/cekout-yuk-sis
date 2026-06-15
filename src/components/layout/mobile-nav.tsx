"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sun, Moon, X, Home, Grid3X3, HeartHandshake, Info, Share2 } from "lucide-react"
import { SITE_NAME } from "@/lib/constants"
import { Button } from "@/components/ui/button"

const NAV_ITEMS = [
  { label: "Beranda", href: "/", icon: Home },
  { label: "Kategori", href: "/kategori", icon: Grid3X3 },
  { label: "Brand Favorit", href: "/brand", icon: HeartHandshake },
  { label: "Tentang Kami", href: "/tentang-kami", icon: Info },
  { label: "Sosial Media", href: "/sosial-media", icon: Share2 },
]

interface MobileNavProps {
  open: boolean
  onClose: () => void
  onDismissAnnouncement?: () => void
}

export function MobileNav({ open, onClose, onDismissAnnouncement }: MobileNavProps) {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw] bg-white dark:bg-gray-900 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 dark:border-gray-800">
              <Link href="/" className="flex items-center gap-2" onClick={onClose}>
                <Heart className="h-6 w-6 text-pink-500 fill-pink-500" />
                <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  {SITE_NAME}
                </span>
              </Link>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-600 dark:text-gray-300">
                <X className="h-5 w-5" />
                <span className="sr-only">Tutup menu</span>
              </Button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => {
                        onClose()
                        if ((item.href === "/sosial-media" || item.href === "/tentang-kami") && onDismissAnnouncement) {
                          onDismissAnnouncement()
                        }
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 dark:text-gray-300 dark:hover:text-pink-400 dark:hover:bg-pink-950/30 transition-colors"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 dark:text-gray-300 dark:hover:text-pink-400 dark:hover:bg-pink-950/30 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                {theme === "dark" ? "Mode Terang" : "Mode Gelap"}
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
