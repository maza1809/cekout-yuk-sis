"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Loader2, CheckCircle } from "lucide-react"
import { FaInstagram, FaFacebook, FaXTwitter, FaYoutube, FaTiktok, FaThreads } from "react-icons/fa6"
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants"
import { db } from "@/lib/services/supabase-service"

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Kategori", href: "/kategori" },
  { label: "Brand Favorit", href: "/brand" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Sosial Media", href: "/sosial-media" },
]

const SERVICE_LINKS = [
  { label: "Hubungi Kami", href: "/hubungi-kami" },
  { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
  { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
  { label: "Disclaimer", href: "/disclaimer" },
]

const SOCIAL_ICONS = [
  { icon: FaInstagram, href: "https://www.instagram.com/cekoutyuksis_?igsh=MTR5ZzByYnR6aDE0bA==", label: "Instagram" },
  { icon: FaFacebook, href: "https://www.facebook.com/share/17d7Lcm4Tw/", label: "Facebook" },
  { icon: FaThreads, href: "https://www.threads.com/@cekoutyuksis_", label: "Threads" },
  { icon: FaTiktok, href: "https://www.tiktok.com/@cekout.yuk.sis?_r=1&_t=ZS-979GcEiX8pY", label: "TikTok" },
  { icon: FaYoutube, href: "https://youtube.com/@cekoutyuksis?si=PT2IGKZw5ytSBUA1", label: "YouTube" },
  { icon: FaXTwitter, href: "https://x.com/CekoutYukSis", label: "X" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubscribe = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    setLoading(true)
    try {
      const ok = await db.addSubscriber(email)
      if (!ok) throw new Error("Gagal subscribe")
      setSuccess(true)
      setEmail("")
      setTimeout(() => setSuccess(false), 3000)
    } catch {
      alert("Gagal subscribe. Coba lagi nanti.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-pink-500 fill-pink-500" />
              <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {SITE_DESCRIPTION}
            </p>
            <div className="flex items-center gap-2 pt-2">
              {SOCIAL_ICONS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-pink-100 hover:text-pink-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-pink-950 dark:hover:text-pink-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Navigasi
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Layanan
            </h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Subscribe
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Dapatkan info produk viral terbaru langsung di email kamu.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email kamu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
              />
              <button
                onClick={handleSubscribe}
                disabled={loading || success}
                className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-medium text-white hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : success ? <CheckCircle className="h-4 w-4" /> : "Kirim"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Dibuat dengan &#9829; untuk wanita Indonesia
          </p>
        </div>
      </div>
    </footer>
  )
}
