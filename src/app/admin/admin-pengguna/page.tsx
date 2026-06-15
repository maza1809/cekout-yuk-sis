"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { db } from "@/lib/services/supabase-service"
import { AdminUser } from "@/types"
import { getInitials } from "@/lib/utils"
import { toast } from "sonner"
import { Plus, Pencil, Trash2 } from "lucide-react"

interface StoredUser extends AdminUser {
  password?: string
}

const STORAGE_KEY = "cekoutyuk_admin_users"

const defaultUsers: StoredUser[] = [
  { id: "u1", email: "admin@cekoutyuksis.web.id", name: "Super Admin", avatar: "", role: "superadmin", is_active: true, created_at: "2025-01-01T10:00:00Z", password: "Pa55word" },
  { id: "u2", email: "audy@cekoutyuksis.web.id", name: "Audy", avatar: "", role: "admin", is_active: true, created_at: "2025-02-01T10:00:00Z", password: "Pa55word" },
  { id: "u3", email: "ali@cekoutyuksis.web.id", name: "Ali", avatar: "", role: "admin", is_active: true, created_at: "2025-03-01T10:00:00Z", password: "Pa55word" },
]

type FormData = {
  name: string
  email: string
  password: string
  role: "superadmin" | "admin"
  is_active: boolean
}

const emptyForm: FormData = {
  name: "",
  email: "",
  password: "",
  role: "admin",
  is_active: true,
}

export default function AdminPenggunaPage() {
  const [users, setUsers] = React.useState<StoredUser[]>([])
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try { setUsers(JSON.parse(stored)) }
      catch { setUsers(defaultUsers) }
    } else {
      setUsers(defaultUsers)
    }
    db.adminUsers().then((supabaseUsers) => {
      if (supabaseUsers.length > 0) {
        setUsers((prev) => {
          const merged = [...supabaseUsers]
          for (const u of prev) {
            if (!merged.find((m) => m.id === u.id)) {
              merged.push(u)
            }
          }
          return merged
        })
      }
    })
  }, [])

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
  }, [users])
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [form, setForm] = React.useState<FormData>(emptyForm)
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const filtered = users.filter((u) => {
    const q = search.toLowerCase()
    return !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  })

  const handleOpenAdd = () => {
    setEditingId(null)
    setForm(emptyForm)
    setErrors({})
    setDialogOpen(true)
  }

  const handleOpenEdit = (user: StoredUser) => {
    setEditingId(user.id)
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      is_active: user.is_active,
    })
    setErrors({})
    setDialogOpen(true)
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = "Nama wajib diisi"
    if (!form.email.trim()) errs.email = "Email wajib diisi"
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email tidak valid"
    if (!editingId && !form.password.trim()) errs.password = "Password wajib diisi"
    if (form.password && form.password.length < 6) errs.password = "Password minimal 6 karakter"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    const now = new Date().toISOString()

    if (editingId) {
      const updates: Partial<StoredUser> = {
        name: form.name,
        email: form.email,
        role: form.role,
        is_active: form.is_active,
      }
      if (form.password) updates.password = form.password
      setUsers((prev) =>
        prev.map((u) => (u.id === editingId ? { ...u, ...updates } : u))
      )
      db.upsertAdminUser({ id: editingId, ...updates } as AdminUser)
      toast.success("Pengguna berhasil diperbarui")
    } else {
      const newUser: StoredUser = {
        id: `u${Date.now()}`,
        email: form.email,
        name: form.name,
        avatar: "",
        role: form.role,
        is_active: form.is_active,
        created_at: now,
        password: form.password,
      }
      setUsers((prev) => [...prev, newUser])
      db.upsertAdminUser(newUser as AdminUser)
      toast.success("Pengguna berhasil ditambahkan")
    }
    setDialogOpen(false)
  }

  const handleDelete = () => {
    if (!deleteId) return
    setUsers((prev) => prev.filter((u) => u.id !== deleteId))
    db.deleteAdminUser(deleteId)
    toast.success("Pengguna berhasil dihapus")
    setDeleteDialogOpen(false)
    setDeleteId(null)
  }

  const toggleActive = (id: string) => {
    setUsers((prev) => {
      const updated = prev.map((u) =>
        u.id === id ? { ...u, is_active: !u.is_active } : u
      )
      const toggled = updated.find((u) => u.id === id)
      if (toggled) db.upsertAdminUser({ id, is_active: toggled.is_active } as AdminUser)
      return updated
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Admin Pengguna</h2>
          <p className="text-sm text-muted-foreground">Kelola pengguna admin</p>
        </div>
        <Button onClick={handleOpenAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Admin
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Input
          placeholder="Cari pengguna..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">User</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-center font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    Tidak ada pengguna ditemukan
                  </td>
                </tr>
              )}
              {filtered.map((user) => (
                <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {getInitials(user.name)}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={user.role === "superadmin" ? "default" : "secondary"}>
                      {user.role === "superadmin" ? "Superadmin" : "Admin"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                      <Switch
                        checked={user.is_active}
                        onCheckedChange={() => toggleActive(user.id)}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleOpenEdit(user)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => {
                          setDeleteId(user.id)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Admin" : "Tambah Admin"}</DialogTitle>
            <DialogDescription>
              Isi form berikut untuk {editingId ? "memperbarui" : "menambahkan"} admin.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Nama lengkap"
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="email@example.com"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{editingId ? "Password (biarkan kosong jika tidak diubah)" : "Password *"}</Label>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder="Minimal 6 karakter"
              />
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={form.role} onValueChange={(v: "superadmin" | "admin") => setForm((f) => ({ ...f, role: v }))}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Pilih Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="superadmin">Superadmin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="is_active"
                checked={form.is_active}
                onCheckedChange={(v) => setForm((f) => ({ ...f, is_active: v }))}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSave}>{editingId ? "Simpan Perubahan" : "Tambah Admin"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Hapus Admin</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus admin ini? Tindakan ini tidak bisa dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
