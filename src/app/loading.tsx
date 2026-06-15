"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center px-4">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart className="h-16 w-16 text-primary fill-primary" />
      </motion.div>
      <p className="mt-6 text-sm text-muted-foreground animate-pulse">
        Memuat...
      </p>
    </div>
  )
}
