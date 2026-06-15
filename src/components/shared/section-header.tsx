"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  link?: string
  linkText?: string
  icon?: LucideIcon
}

export function SectionHeader({
  title,
  subtitle,
  link,
  linkText = "Lihat Semua",
  icon: Icon,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-primary" />}
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            {title}
          </h2>
        </div>
        <div className="h-1 w-12 rounded-full bg-gradient-to-r from-primary to-primary/40" />
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      {link && (
        <Link
          href={link}
          className="group flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          {linkText}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </motion.div>
  )
}
