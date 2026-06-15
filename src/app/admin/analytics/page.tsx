"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { db } from "@/lib/services/supabase-service"
import { AnalyticsData } from "@/types"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  MousePointerClick,
  TrendingUp,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  ShoppingCart,
  Eye,
} from "lucide-react"

const COLORS = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#8b5cf6", "#06b6d4"]

const dateRanges = [
  { value: "7", label: "7 Hari" },
  { value: "30", label: "30 Hari" },
  { value: "90", label: "90 Hari" },
]

const demoAnalytics: Record<string, AnalyticsData> = {
  "7": {
    total_clicks: 8472,
    popular_products: [
      { name: "Scarlett Whitening Body Lotion", clicks: 1234 },
      { name: "Skintific 5X Ceramide Cleanser", clicks: 987 },
      { name: "Somethinc Niacinamide Serum", clicks: 876 },
      { name: "Wardah Lightening Day Cream", clicks: 654 },
      { name: "The Originote HA Serum", clicks: 543 },
    ],
    popular_categories: [
      { name: "Skincare", clicks: 3456 },
      { name: "Bodycare", clicks: 2134 },
      { name: "Makeup", clicks: 1234 },
      { name: "Fragrance", clicks: 876 },
      { name: "Haircare", clicks: 772 },
    ],
    popular_brands: [
      { name: "Scarlett", clicks: 2134 },
      { name: "Skintific", clicks: 1876 },
      { name: "Somethinc", clicks: 1543 },
      { name: "Wardah", clicks: 1232 },
      { name: "Emina", clicks: 987 },
    ],
    traffic_sources: [
      { source: "Instagram", count: 3200 },
      { source: "TikTok", count: 2400 },
      { source: "Google", count: 1500 },
      { source: "Facebook", count: 872 },
      { source: "Direct", count: 500 },
    ],
    devices: [
      { device: "Mobile", count: 5800 },
      { device: "Desktop", count: 1800 },
      { device: "Tablet", count: 872 },
    ],
    clicks_by_date: [
      { date: "Sen", count: 1240 },
      { date: "Sel", count: 1120 },
      { date: "Rab", count: 1380 },
      { date: "Kam", count: 1210 },
      { date: "Jum", count: 1450 },
      { date: "Sab", count: 980 },
      { date: "Min", count: 1092 },
    ],
  },
  "30": {
    total_clicks: 32150,
    popular_products: [
      { name: "Scarlett Whitening Body Lotion", clicks: 4534 },
      { name: "Skintific 5X Ceramide Cleanser", clicks: 3987 },
      { name: "Somethinc Niacinamide Serum", clicks: 2876 },
      { name: "Wardah Lightening Day Cream", clicks: 2654 },
      { name: "The Originote HA Serum", clicks: 1543 },
    ],
    popular_categories: [
      { name: "Skincare", clicks: 12456 },
      { name: "Bodycare", clicks: 8134 },
      { name: "Makeup", clicks: 5234 },
      { name: "Fragrance", clicks: 3876 },
      { name: "Haircare", clicks: 2450 },
    ],
    popular_brands: [
      { name: "Scarlett", clicks: 7134 },
      { name: "Skintific", clicks: 6876 },
      { name: "Somethinc", clicks: 4543 },
      { name: "Wardah", clicks: 4232 },
      { name: "Emina", clicks: 2987 },
    ],
    traffic_sources: [
      { source: "Instagram", count: 12200 },
      { source: "TikTok", count: 8400 },
      { source: "Google", count: 6500 },
      { source: "Facebook", count: 2872 },
      { source: "Direct", count: 2178 },
    ],
    devices: [
      { device: "Mobile", count: 21800 },
      { device: "Desktop", count: 6800 },
      { device: "Tablet", count: 3550 },
    ],
    clicks_by_date: [
      { date: "Minggu 1", count: 8450 },
      { date: "Minggu 2", count: 7890 },
      { date: "Minggu 3", count: 8230 },
      { date: "Minggu 4", count: 7580 },
    ],
  },
  "90": {
    total_clicks: 89200,
    popular_products: [
      { name: "Scarlett Whitening Body Lotion", clicks: 12534 },
      { name: "Skintific 5X Ceramide Cleanser", clicks: 10987 },
      { name: "Somethinc Niacinamide Serum", clicks: 8876 },
      { name: "Wardah Lightening Day Cream", clicks: 7654 },
      { name: "Emina Bright Stuff Face Mist", clicks: 5543 },
    ],
    popular_categories: [
      { name: "Skincare", clicks: 35456 },
      { name: "Bodycare", clicks: 22134 },
      { name: "Makeup", clicks: 15234 },
      { name: "Fragrance", clicks: 9876 },
      { name: "Haircare", clicks: 6500 },
    ],
    popular_brands: [
      { name: "Scarlett", clicks: 20134 },
      { name: "Skintific", clicks: 18876 },
      { name: "Somethinc", clicks: 12543 },
      { name: "Wardah", clicks: 11232 },
      { name: "Emina", clicks: 8987 },
    ],
    traffic_sources: [
      { source: "Instagram", count: 34200 },
      { source: "TikTok", count: 22400 },
      { source: "Google", count: 17500 },
      { source: "Facebook", count: 8872 },
      { source: "Direct", count: 6228 },
    ],
    devices: [
      { device: "Mobile", count: 61200 },
      { device: "Desktop", count: 18200 },
      { device: "Tablet", count: 9800 },
    ],
    clicks_by_date: [
      { date: "Bulan 1", count: 32100 },
      { date: "Bulan 2", count: 29800 },
      { date: "Bulan 3", count: 27300 },
    ],
  },
}

const deviceIcons: Record<string, React.ReactNode> = {
  Mobile: <Smartphone className="h-4 w-4" />,
  Desktop: <Monitor className="h-4 w-4" />,
  Tablet: <Tablet className="h-4 w-4" />,
}

export default function AnalyticsPage() {
  const [range, setRange] = React.useState("7")
  const [analytics, setAnalytics] = React.useState<AnalyticsData | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    db.getAnalytics().then((data) => {
      if (data) setAnalytics(data)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const data = analytics || demoAnalytics[range] || demoAnalytics["7"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-sm text-muted-foreground">Statistik klik dan performa produk</p>
        </div>
        <div className="flex gap-1 rounded-lg border p-1 bg-muted/50">
          {dateRanges.map((dr) => (
            <Button
              key={dr.value}
              variant={range === dr.value ? "default" : "ghost"}
              size="sm"
              className="px-3"
              onClick={() => setRange(dr.value)}
            >
              {dr.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <MousePointerClick className="h-5 w-5 text-primary" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold">{data.total_clicks.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Total Klik</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-2.5 dark:bg-emerald-950">
              <ShoppingCart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold">{data.traffic_sources[0].count.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Top Source: {data.traffic_sources[0].source}</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-50 p-2.5 dark:bg-amber-950">
              <Eye className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold">{data.devices[0].count.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Top Device: {data.devices[0].device}</p>
        </div>
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-50 p-2.5 dark:bg-purple-950">
              <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold">{data.popular_products[0].clicks.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Top Product Clicks</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 font-semibold">Klik per Hari</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.clicks_by_date}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 font-semibold">Traffic Sources</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.traffic_sources}
                  dataKey="count"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  label={(entry: { name?: string; percent?: number }) => `${entry.name || ""} ${((entry.percent || 0) * 100).toFixed(0)}%`}
                >
                  {data.traffic_sources.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 font-semibold">Top Products</h3>
          <div className="space-y-3">
            {data.popular_products.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm truncate">{p.name}</p>
                </div>
                <Badge variant="secondary" className="shrink-0">{p.clicks.toLocaleString()} klik</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 font-semibold">Top Categories</h3>
          <div className="space-y-3">
            {data.popular_categories.map((c, i) => (
              <div key={c.name} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm">{c.name}</p>
                </div>
                <Badge variant="secondary" className="shrink-0">{c.clicks.toLocaleString()} klik</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 font-semibold">Top Brands</h3>
          <div className="space-y-3">
            {data.popular_brands.map((b, i) => (
              <div key={b.name} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm">{b.name}</p>
                </div>
                <Badge variant="secondary" className="shrink-0">{b.clicks.toLocaleString()} klik</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <h3 className="mb-4 font-semibold">Device Breakdown</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          {data.devices.map((d) => (
            <div key={d.device} className="flex items-center gap-3 rounded-lg border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {deviceIcons[d.device] || <Globe className="h-5 w-5" />}
              </div>
              <div>
                <p className="text-lg font-bold">{d.count.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{d.device}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
