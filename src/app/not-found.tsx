"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Frown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Frown className="mx-auto h-24 w-24 text-primary mb-6" />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
      >
        Halaman Tidak Ditemukan
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="mt-4 max-w-md text-muted-foreground"
      >
        Maaf, halaman yang kamu cari tidak tersedia.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
        className="mt-8"
      >
        <Button asChild>
          <Link href="/">Kembali ke Beranda</Link>
        </Button>
      </motion.div>
    </div>
  )
}
