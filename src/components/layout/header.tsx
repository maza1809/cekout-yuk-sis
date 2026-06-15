"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Search, Sun, Moon, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { SITE_NAME } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MobileNav } from "./mobile-nav"

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Kategori", href: "/kategori" },
  { label: "Brand Favorit", href: "/brand" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Sosial Media", href: "/sosial-media" },
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [visible, setVisible] = useState(true)
  const [showAnnouncement, setShowAnnouncement] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("announcement-dismissed") !== "true"
    }
    return true
  })
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 10)
      setVisible(currentScrollY < lastScrollY || currentScrollY < 80)
      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    if (!showAnnouncement) return
    const timer = setTimeout(() => {
      setShowAnnouncement(false)
      localStorage.setItem("announcement-dismissed", "true")
    }, 10000)
    return () => clearTimeout(timer)
  }, [showAnnouncement])

  return (
    <>
      <div className="relative z-50">
        <motion.div
          initial={{ height: "auto", opacity: 1 }}
          animate={showAnnouncement ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white text-center text-xs py-1.5 px-4 tracking-wide">
            Selamat datang di {SITE_NAME}, Temukan produk viral favoritmu!
          </div>
        </motion.div>

        <motion.header
          initial={{ y: 0 }}
          animate={{ y: visible ? 0 : -120 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "sticky top-0 z-40 w-full border-b transition-all duration-300",
            scrolled
              ? "bg-white/80 backdrop-blur-lg dark:bg-gray-900/80 border-gray-200/50 dark:border-gray-700/50 shadow-sm"
              : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
          )}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Heart className="h-6 w-6 text-pink-500 fill-pink-500" />
              <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {SITE_NAME}
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={link.href === "/sosial-media" || link.href === "/tentang-kami" ? () => { setShowAnnouncement(false); localStorage.setItem("announcement-dismissed", "true") } : undefined}
                  className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-950/30 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300">
                    <Search className="h-5 w-5" />
                    <span className="sr-only">Cari produk</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-xl">
                  <DialogHeader>
                    <DialogTitle className="text-left">Cari Produk</DialogTitle>
                  </DialogHeader>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Cari produk viral favoritmu..."
                      className="pl-10 h-12"
                      autoFocus
                    />
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-gray-600 dark:text-gray-300"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle tema</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-600 dark:text-gray-300"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </motion.header>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} onDismissAnnouncement={() => setShowAnnouncement(false)} />
    </>
  )
}
