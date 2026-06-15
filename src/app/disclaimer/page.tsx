"use client"

import { motion } from "framer-motion"
import { fadeIn } from "@/lib/animations"
import { SITE_NAME } from "@/lib/constants"
import { ShieldCheck, Info } from "lucide-react"

export default function DisclaimerPage() {
  return (
    <div className="min-h-dvh px-4 py-16 md:py-24">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-4">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            Pengungkapan Afiliasi
          </span>
        </div>
        <h1 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl">
          Disclaimer Afiliasi
        </h1>
        <p className="mb-8 text-muted-foreground">
          Terakhir diperbarui: Juni 2026
        </p>

        <motion.div
          variants={fadeIn}
          className="mb-8 rounded-2xl border-l-4 border-primary bg-card p-6 md:p-8"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Info className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium">
              Penting untuk diketahui
            </p>
          </div>
          <p className="leading-relaxed text-muted-foreground">
            {SITE_NAME} adalah situs afiliasi. Kami berpartisipasi dalam program afiliasi,
            termasuk Shopee Afiliasi.
          </p>
        </motion.div>

        <div className="space-y-6">
          <motion.div variants={fadeIn} className="rounded-2xl border bg-card p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold">Komisi Afiliasi</h2>
            <p className="leading-relaxed text-muted-foreground">
              Ketika Anda mengklik tautan produk di platform kami dan melakukan pembelian melalui
              tautan tersebut, kami dapat memperoleh komisi afiliasi tanpa biaya tambahan untuk
              Anda. Komisi ini membantu kami menjaga dan mengembangkan platform agar terus dapat
              memberikan rekomendasi produk terbaik untuk Anda.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="rounded-2xl border bg-card p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold">Transparansi</h2>
            <p className="leading-relaxed text-muted-foreground">
              Kami berkomitmen untuk selalu transparan. Rekomendasi produk yang kami berikan
              didasarkan pada kualitas, popularitas, dan relevansi produk, bukan semata-mata
              karena komisi afiliasi. Kami tidak menerima bayaran untuk menampilkan atau
              memberikan ulasan positif terhadap suatu produk.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="rounded-2xl border bg-card p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold">Tautan Eksternal</h2>
            <p className="leading-relaxed text-muted-foreground">
              Platform kami berisi tautan ke situs pihak ketiga seperti Shopee. Kami tidak memiliki kendali atas konten, kebijakan privasi, atau
              praktik dari situs-situs tersebut. Kami tidak bertanggung jawab atas kerugian atau
              kerusakan yang mungkin timbul dari penggunaan situs pihak ketiga.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="rounded-2xl border bg-card p-6 md:p-8">
            <h2 className="mb-4 text-xl font-semibold">Ketidakberpihakan</h2>
            <p className="leading-relaxed text-muted-foreground">
              Kami berusaha menyajikan informasi produk yang akurat dan tidak memihak. Meskipun
              kami dapat memperoleh komisi dari beberapa tautan, hal ini tidak memengaruhi
              kurasi atau rekomendasi produk kami. Prioritas utama kami adalah memberikan nilai
              terbaik untuk pengguna.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn}
          className="mt-8 flex items-center gap-3 rounded-2xl bg-primary/5 p-6"
        >
          <ShieldCheck className="h-6 w-6 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            Jika Anda memiliki pertanyaan tentang hubungan afiliasi kami, jangan ragu untuk
            menghubungi kami melalui halaman Kontak.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
