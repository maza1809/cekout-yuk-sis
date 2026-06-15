"use client"

import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "@/lib/animations"
import { ShieldCheck, Sparkles, Heart, Eye } from "lucide-react"
import { SITE_NAME } from "@/lib/constants"

const values = [
  {
    icon: ShieldCheck,
    title: "Terpercaya",
    description: "Setiap produk dikurasi dengan teliti untuk memastikan kualitas dan keaslian terbaik.",
  },
  {
    icon: Sparkles,
    title: "Kurasi Terbaik",
    description: "Kami memilih produk-produk viral dan berkualitas tinggi yang sesuai dengan kebutuhanmu.",
  },
  {
    icon: Heart,
    title: "Komunitas",
    description: "Membangun komunitas Sis yang saling mendukung dalam menemukan produk impian.",
  },
  {
    icon: Eye,
    title: "Transparan",
    description: "Informasi produk disajikan secara jujur dan transparan untuk membantu keputusan belanja.",
  },
]

const stats = [
  { value: "5K+", label: "Produk" },
  { value: "100+", label: "Brand" },
  { value: "50K+", label: "Pengunjung" },
  { value: "24/7", label: "Layanan" },
]

const team = [
  { name: "Tim Cekout Yuk Sis", role: "Founder & Creator", image: null },
]

export default function TentangKamiPage() {
  return (
    <div className="min-h-dvh">
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeIn} className="mb-4">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              Tentang Kami
            </span>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Tentang{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {SITE_NAME}
            </span>
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg"
          >
            Platform kurasi produk pilihan untuk wanita Indonesia. Kami membantu kamu menemukan
            produk terbaik, viral, dan terpercaya dari berbagai marketplace.
          </motion.p>
        </motion.div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid gap-12 md:grid-cols-2"
          >
            <motion.div variants={fadeIn} className="space-y-4">
              <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Misi Kami</h2>
              <div className="h-1 w-20 rounded-full bg-primary" />
              <p className="text-muted-foreground leading-relaxed">
                Misi kami adalah membantu wanita Indonesia menemukan produk-produk terbaik yang
                sesuai dengan kebutuhan dan anggaran mereka. Kami percaya setiap Sis berhak
                mendapatkan produk berkualitas tanpa harus menghabiskan waktu berjam-jam mencari.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Dengan kurasi yang teliti dan informasi yang transparan, kami ingin menjadi
                teman belanja terpercaya yang selalu siap membantu.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="rounded-2xl bg-card p-8 shadow-lg border">
              <h3 className="mb-4 text-xl font-semibold">Cerita Kami</h3>
              <p className="text-muted-foreground leading-relaxed">
                {SITE_NAME} lahir dari kegelisahan melihat banyaknya produk kecantikan dan fashion
                yang beredar tanpa informasi yang jelas. Kami ingin menciptakan platform yang
                menyajikan rekomendasi produk secara jujur dan terpercaya.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Berawal dari sekadar hobi berbagi rekomendasi dengan teman-teman, kini kami telah
                berkembang menjadi platform yang membantu ribuan Sis setiap harinya.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary/50 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-12 text-center"
          >
            <motion.h2 variants={fadeIn} className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
              Nilai-Nilai Kami
            </motion.h2>
            <motion.p variants={fadeIn} className="text-muted-foreground">
              Prinsip yang menjadi fondasi setiap langkah kami
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeIn}
                className="group rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-12 text-center"
          >
            <motion.h2 variants={fadeIn} className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl">
              Tim Kami
            </motion.h2>
            <motion.p variants={fadeIn} className="text-muted-foreground">
              Orang di balik {SITE_NAME}
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex justify-center"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeIn}
                className="text-center"
              >
                <div className="mx-auto mb-4 h-24 w-24 rounded-full overflow-hidden bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <img
                    src="https://lh3.googleusercontent.com/d/1qLtaP1IV-SP81wxBDWU7_vZKwbrHKd1w"
                    alt={SITE_NAME}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeIn}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary sm:text-4xl md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
