"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { LogIn, Eye, EyeOff } from "lucide-react"

const DEMO_CREDENTIALS = [
  { email: "admin@cekoutyuksis.web.id", password: "Pa55word", name: "Super Admin", role: "superadmin" },
  { email: "audy@cekoutyuksis.web.id", password: "Pa55word", name: "Audy", role: "admin" },
  { email: "ali@cekoutyuksis.web.id", password: "Pa55word", name: "Ali", role: "admin" },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      const stored = localStorage.getItem("cekoutyuk_admin_users")
      let adminUsers: { email: string; password?: string; name: string; role: string }[] = []
      if (stored) {
        try { adminUsers = JSON.parse(stored) } catch { adminUsers = [] }
      }

      const allCredentials = [
        ...DEMO_CREDENTIALS,
        ...adminUsers.filter((u) => u.password).map((u) => ({
          email: u.email,
          password: u.password!,
          name: u.name,
          role: u.role,
        })),
      ]

      const user = allCredentials.find(
        (c) => c.email === email && c.password === password
      )

      if (user) {
        localStorage.setItem(
          "admin_user",
          JSON.stringify({
            id: email,
            email: user.email,
            name: user.name,
            role: user.role,
            is_active: true,
          })
        )
        toast.success(`Selamat datang, ${user.name}!`)
        router.push("/admin/dashboard")
      } else {
        toast.error("Email atau password salah")
      }

      setLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/5 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border bg-card p-8 shadow-lg">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground text-xl font-bold">
              CY
            </div>
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Masuk ke panel admin Cekout Yuk Sis
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@cekoutyuk.sis"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
