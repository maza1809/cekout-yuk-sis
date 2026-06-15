"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/animations"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { SITE_NAME } from "@/lib/constants"
import { Mail, Camera, MessageCircle, Send } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "support@cekoutyuk.sis",
    href: "mailto:support@cekoutyuk.sis",
  },
  {
    icon: Camera,
    title: "Instagram",
    value: "@cekoutyuk.sis",
    href: "https://www.instagram.com/cekoutyuksis_?igsh=MTR5ZzByYnR6aDE0bA==",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+62 812-3456-7890",
    href: "https://wa.me/6281234567890",
  },
]

export default function KontakPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Pesan berhasil dikirim!", {
        description: "Terima kasih telah menghubungi kami. Kami akan merespon segera.",
      })
      setForm({ name: "", email: "", subject: "", message: "" })
    }, 1000)
  }

  return (
    <div className="min-h-dvh px-4 py-16 md:py-24">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mx-auto max-w-6xl"
      >
        <div className="mb-4 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Hubungi Kami
          </span>
        </div>
        <h1 className="mb-4 text-center text-4xl font-bold tracking-tight md:text-5xl">
          Hubungi {SITE_NAME}
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          Punya pertanyaan, saran, atau ingin bekerja sama? Jangan ragu untuk menghubungi kami!
        </p>

        <div className="grid gap-8 lg:grid-cols-3">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4 lg:col-span-1"
          >
            {contactInfo.map((item) => (
              <motion.a
                key={item.title}
                variants={fadeIn}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.value}</div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.form
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="rounded-2xl border bg-card p-6 md:p-8 lg:col-span-2"
          >
            <h2 className="mb-6 text-xl font-semibold">Kirim Pesan</h2>
            <div className="space-y-4">
              <motion.div variants={fadeIn} className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nama</label>
                  <Input
                    name="name"
                    placeholder="Nama lengkap"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </motion.div>
              <motion.div variants={fadeIn} className="space-y-2">
                <label className="text-sm font-medium">Subjek</label>
                <Input
                  name="subject"
                  placeholder="Subjek pesan"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </motion.div>
              <motion.div variants={fadeIn} className="space-y-2">
                <label className="text-sm font-medium">Pesan</label>
                <textarea
                  name="message"
                  placeholder="Tulis pesan Anda di sini..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </motion.div>
              <motion.div variants={fadeIn}>
                <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                  <Send className="mr-2 h-4 w-4" />
                  {loading ? "Mengirim..." : "Kirim Pesan"}
                </Button>
              </motion.div>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  )
}
