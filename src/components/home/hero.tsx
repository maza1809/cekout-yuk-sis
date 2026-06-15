"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/10 dark:to-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                Temukan Produk Viral{" "}
                <br />
                Favorit Para Sis
              </span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              Kurasi produk terbaik, terpopuler, dan terpercaya untuk wanita Indonesia dari Shopee
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Button asChild size="lg" className="gap-2">
                  <Link href="/produk">
                    Jelajahi Produk
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Button asChild variant="outline" size="lg">
                  <Link href="/kategori">Lihat Kategori</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto h-96 w-96">
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-3xl bg-white shadow-2xl ring-4 ring-pink-200 dark:ring-pink-800">
                  <img
                    src="/logo-cekout.png"
                    alt="Cekout Yuk Sis"
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-4 top-4 h-32 w-32 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 opacity-60"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-8 top-12 h-24 w-24 rounded-full bg-gradient-to-br from-purple-300 to-pink-400 opacity-50"
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-12 h-20 w-20 rounded-full bg-gradient-to-br from-pink-200 to-purple-300 opacity-40"
              />
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="h-64 w-64 rounded-full border-2 border-dashed border-pink-300 dark:border-pink-700" />
              </motion.div>
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-16 right-16"
              >
                <Sparkles className="h-8 w-8 text-pink-400" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-20 top-2"
              >
                <Sparkles className="h-5 w-5 text-purple-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_50%)]" />
    </section>
  )
}
