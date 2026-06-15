"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import {
  LayoutDashboard,
  Package,
  Building2,
  Tags,
  Image,
  FileText,
  Share2,
  Users,
  Search,
  BarChart3,
  Settings,
  Menu,
  Bell,
  Sun,
  Moon,
  LogOut,
  ChevronLeft,
} from "lucide-react"

const allNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["superadmin", "admin"] },
  { href: "/admin/produk", label: "Produk", icon: Package, roles: ["superadmin", "admin"] },
  { href: "/admin/brand", label: "Brand", icon: Building2, roles: ["superadmin", "admin"] },
  { href: "/admin/kategori", label: "Kategori", icon: Tags, roles: ["superadmin", "admin"] },
  { href: "/admin/banner", label: "Banner", icon: Image, roles: ["superadmin", "admin"] },
  { href: "/admin/konten", label: "Konten", icon: FileText, roles: ["superadmin"] },

  { href: "/admin/sosial-media", label: "Sosial Media", icon: Share2, roles: ["superadmin"] },
  { href: "/admin/admin-pengguna", label: "Admin Pengguna", icon: Users, roles: ["superadmin"] },
  { href: "/admin/seo", label: "SEO", icon: Search, roles: ["superadmin"] },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3, roles: ["superadmin", "admin"] },
  { href: "/admin/settings", label: "Settings", icon: Settings, roles: ["superadmin"] },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false)
  const [adminUser, setAdminUser] = React.useState<{ name: string; role: string; avatar?: string; email: string } | null>(null)
  const [authReady, setAuthReady] = React.useState(false)

  React.useEffect(() => {
    const stored = localStorage.getItem("admin_user")
    if (!stored) {
      router.replace("/auth/login")
    } else {
      try {
        setAdminUser(JSON.parse(stored))
      } catch {
        router.replace("/auth/login")
        return
      }
      setAuthReady(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("admin_user")
    toast.success("Berhasil logout")
    router.push("/auth/login")
  }

  if (!authReady) {
    return null
  }

  const navItems = allNavItems.filter((item) => item.roles.includes(adminUser?.role ?? ""))

  const pageTitle = allNavItems.find((item) => pathname.startsWith(item.href))?.label ?? "Dashboard"

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center gap-2 px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
          CY
        </div>
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="text-sm font-semibold whitespace-nowrap overflow-hidden"
            >
              Cekout Yuk Sis
              <span className="text-muted-foreground font-normal"> - Admin</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-2 py-2">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <AnimatePresence mode="wait">
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      <Separator />

      <div className="p-3">
        <AnimatePresence mode="wait">
          {sidebarOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={adminUser?.avatar} />
                <AvatarFallback className="text-xs">
                  {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{adminUser?.name ?? "Admin"}</p>
                <p className="text-xs text-muted-foreground truncate">{adminUser?.role ?? "admin"}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={adminUser?.avatar} />
                <AvatarFallback className="text-xs">
                  {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : "A"}
                </AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-card transition-all duration-300",
          "lg:static lg:z-auto",
          sidebarOpen ? "w-60" : "w-16",
          "hidden lg:flex"
        )}
      >
        <div className="flex h-full flex-col">
          {sidebarContent}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-3 top-20 h-6 w-6 rounded-full border bg-background shadow-sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <ChevronLeft className={cn("h-3 w-3 transition-transform", !sidebarOpen && "rotate-180")} />
          </Button>
        </div>
      </aside>

      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 w-60 border-r bg-card lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <h1 className="text-lg font-semibold flex-1">{pageTitle}</h1>

          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              3
            </span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </header>

        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
