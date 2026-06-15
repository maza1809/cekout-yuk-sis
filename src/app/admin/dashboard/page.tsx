"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Package,
  Building2,
  Tags,
  MousePointerClick,
  Plus,
  TrendingUp,
  TrendingDown,
  BarChart3,
  ArrowRight,
  Activity,
  ShoppingCart,
  Eye,
} from "lucide-react"
import Link from "next/link"

const greeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return "Selamat Pagi"
  if (hour < 15) return "Selamat Siang"
  if (hour < 18) return "Selamat Sore"
  return "Selamat Malam"
}

const statCards = [
  {
    label: "Total Produk",
    value: "128",
    icon: Package,
    trend: 12,
    trendUp: true,
  },
  {
    label: "Total Brand",
    value: "24",
    icon: Building2,
    trend: 4,
    trendUp: true,
  },
  {
    label: "Total Kategori",
    value: "9",
    icon: Tags,
    trend: 2,
    trendUp: true,
  },
  {
    label: "Total Klik",
    value: "8.472",
    icon: MousePointerClick,
    trend: 8,
    trendUp: false,
  },
]

const recentActivities = [
  { action: "Produk baru ditambahkan", item: "Skintific Moisturizer", time: "5 menit lalu" },
  { action: "Brand diperbarui", item: "Wardah", time: "12 menit lalu" },
  { action: "Klik produk", item: "Somethinc Serum", time: "25 menit lalu" },
  { action: "Banner diaktifkan", item: "Promo Ramadhan", time: "1 jam lalu" },
  { action: "Kategori dibuat", item: "Bodycare", time: "2 jam lalu" },
]

const quickActions = [
  { label: "Tambah Produk", href: "/admin/produk/tambah", icon: Plus },
  { label: "Tambah Brand", href: "/admin/brand/tambah", icon: Building2 },
  { label: "Lihat Analytics", href: "/admin/analytics", icon: BarChart3 },
]

const clickData = [
  { day: "Sen", clicks: 240 },
  { day: "Sel", clicks: 320 },
  { day: "Rab", clicks: 280 },
  { day: "Kam", clicks: 410 },
  { day: "Jum", clicks: 380 },
  { day: "Sab", clicks: 520 },
  { day: "Min", clicks: 490 },
]

const maxClicks = Math.max(...clickData.map((d) => d.clicks))

export default function DashboardPage() {
  const adminName = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("admin_user") || "{}")?.name
    : null

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold tracking-tight">
          {greeting()}, {adminName ?? "Admin"}
        </h2>
        <p className="text-muted-foreground">
          Berikut ringkasan aktivitas admin Cekout Yuk Sis.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-primary/10 p-2.5">
                <card.icon className="h-5 w-5 text-primary" />
              </div>
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                  card.trendUp
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                    : "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
                )}
              >
                {card.trendUp ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {card.trend}%
              </span>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border bg-card p-5 shadow-sm lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Klik Analytics (7 Hari)</h3>
            <Link
              href="/admin/analytics"
              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
            >
              Lihat Detail <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="flex items-end gap-2 h-40">
            {clickData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.clicks / maxClicks) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="w-full rounded-md bg-primary/80"
                  style={{ minHeight: 4 }}
                />
                <span className="text-[10px] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border bg-card p-5 shadow-sm"
        >
          <h3 className="font-semibold mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{activity.item}</p>
                  <p className="text-[10px] text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border bg-card p-5 shadow-sm"
        >
          <h3 className="font-semibold mb-4">Aksi Cepat</h3>
          <div className="space-y-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="w-full justify-start gap-3"
                asChild
              >
                <Link href={action.href}>
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </Link>
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-xl border bg-card p-5 shadow-sm lg:col-span-2"
        >
          <h3 className="font-semibold mb-4">Gambaran Klik</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Shopee", value: "7.740", icon: ShoppingCart, pct: 96 },
              { label: "Lainnya", value: "390", icon: Activity, pct: 4 },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-lg font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
