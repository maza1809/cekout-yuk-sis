"use client"

import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/animations"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { FaInstagram, FaFacebook, FaXTwitter, FaYoutube, FaTiktok, FaThreads } from "react-icons/fa6"

interface SocialPlatform {
  name: string
  username: string
  description: string
  gradient: string
  icon: React.ElementType
  url: string
}

const platforms: SocialPlatform[] = [
  {
    name: "Instagram",
    username: "@cekoutyuksis_",
    description: "Konten visual produk terbaru, behind the scenes, dan daily updates.",
    gradient: "from-pink-500 via-purple-500 to-orange-400",
    icon: FaInstagram,
    url: "https://www.instagram.com/cekoutyuksis_?igsh=MTR5ZzByYnR6aDE0bA==",
  },
  {
    name: "Facebook",
    username: "Cekout Yuk Sis",
    description: "Gabung grup komunitas untuk diskusi dan rekomendasi produk.",
    gradient: "from-blue-600 to-blue-800",
    icon: FaFacebook,
    url: "https://www.facebook.com/share/17d7Lcm4Tw/",
  },
  {
    name: "Threads",
    username: "@cekoutyuksis_",
    description: "Tips cepat dan thread rekomendasi produk viral.",
    gradient: "from-neutral-900 to-neutral-700",
    icon: FaThreads,
    url: "https://www.threads.com/@cekoutyuksis_",
  },
  {
    name: "TikTok",
    username: "@cekout.yuk.sis",
    description: "Video review produk, haul, dan konten viral terbaru.",
    gradient: "from-black via-cyan-500 to-pink-500",
    icon: FaTiktok,
    url: "https://www.tiktok.com/@cekout.yuk.sis?_r=1&_t=ZS-979GcEiX8pY",
  },
  {
    name: "X",
    username: "@CekoutYukSis",
    description: "Update cepat, thread produk, dan interaksi real-time.",
    gradient: "from-neutral-950 to-neutral-800",
    icon: FaXTwitter,
    url: "https://x.com/CekoutYukSis",
  },
  {
    name: "YouTube",
    username: "Cekout Yuk Sis",
    description: "Video review mendalam, tutorial, dan rekomendasi produk.",
    gradient: "from-red-600 to-red-800",
    icon: FaYoutube,
    url: "https://youtube.com/@cekoutyuksis?si=PT2IGKZw5ytSBUA1",
  },
]

export default function SosialMediaPage() {
  return (
    <div className="min-h-dvh px-4 py-16 md:py-24">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={fadeIn} className="mb-4 text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Sosial Media
          </span>
        </motion.div>
        <motion.h1
          variants={fadeIn}
          className="mb-3 text-center text-4xl font-bold tracking-tight md:text-5xl"
        >
          Ikuti Kami
        </motion.h1>
        <motion.p
          variants={fadeIn}
          className="mx-auto mb-12 max-w-xl text-center text-muted-foreground"
        >
          Dapatkan informasi terbaru dan konten eksklusif dari kami di berbagai platform
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {platforms.map((platform) => (
            <motion.div
              key={platform.name}
              variants={fadeIn}
              className="group relative overflow-hidden rounded-2xl border bg-card transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <div className={`bg-gradient-to-br ${platform.gradient} p-6 text-white`}>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                  <platform.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold">{platform.name}</h3>
                <p className="mt-1 text-sm text-white/80">{platform.username}</p>
              </div>
              <div className="p-5">
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  {platform.description}
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={platform.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Kunjungi
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
