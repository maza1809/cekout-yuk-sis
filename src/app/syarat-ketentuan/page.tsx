"use client"

import { motion } from "framer-motion"
import { fadeIn } from "@/lib/animations"
import { SITE_NAME, SITE_URL } from "@/lib/constants"

const sections = [
  {
    title: "Ketentuan Umum",
    content: `Dengan mengakses dan menggunakan platform ${SITE_NAME} ("kami", "platform"), Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan sebagian atau seluruh syarat dan ketentuan ini, mohon untuk tidak menggunakan platform kami.

Kami berhak untuk mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Perubahan akan berlaku segera setelah dipublikasikan di halaman ini.`,
  },
  {
    title: "Pendaftaran Akun",
    content: `Untuk mengakses beberapa fitur di platform, Anda mungkin diminta untuk mendaftar akun. Dengan mendaftar, Anda menyetujui bahwa:
• Informasi yang Anda berikan adalah benar, akurat, dan terkini.
• Anda bertanggung jawab penuh atas kerahasiaan kata sandi dan aktivitas akun Anda.
• Anda akan segera memberi tahu kami jika ada penggunaan tidak sah atas akun Anda.
Kami berhak menangguhkan atau menghapus akun jika ditemukan pelanggaran terhadap syarat dan ketentuan ini.`,
  },
  {
    title: "Penggunaan Layanan",
    content: `Anda setuju untuk menggunakan platform kami hanya untuk tujuan yang sah dan sesuai dengan syarat dan ketentuan ini. Anda dilarang untuk:
• Menggunakan platform untuk aktivitas ilegal atau terlarang.
• Menyebarkan konten yang melanggar hukum, mengancam, fitnah, atau diskriminatif.
• Melakukan tindakan yang dapat merusak, mengganggu, atau membebani infrastruktur platform.
• Mengakses atau mencoba mengakses area terbatas tanpa izin.
• Menggunakan robot, spider, atau alat otomatis lainnya untuk mengakses platform tanpa izin tertulis.`,
  },
  {
    title: "Hak Kekayaan Intelektual",
    content: `Semua konten di platform ini, termasuk namun tidak terbatas pada teks, gambar, logo, grafik, video, dan perangkat lunak, dilindungi oleh hak cipta dan undang-undang kekayaan intelektual lainnya.

Anda tidak diperbolehkan untuk mereproduksi, mendistribusikan, menampilkan, atau membuat karya turunan dari konten platform tanpa izin tertulis dari kami.

Nama produk, merek, dan logo yang disebutkan di platform ini adalah milik dari pemiliknya masing-masing.`,
  },
  {
    title: "Pembatasan Tanggung Jawab",
    content: `Platform ${SITE_NAME} adalah platform kurasi produk afiliasi. Kami tidak menjual produk secara langsung dan tidak bertanggung jawab atas transaksi yang terjadi di platform eksternal.

Informasi produk yang ditampilkan bersifat informatif dan dapat berubah sewaktu-waktu. Kami tidak memberikan jaminan atas keakuratan, kelengkapan, atau keandalan informasi tersebut.

Kami tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan platform ini.

Platform ini menyediakan tautan afiliasi ke situs pihak ketiga. Kami tidak bertanggung jawab atas konten, kebijakan privasi, atau praktik dari situs pihak ketiga tersebut.`,
  },
  {
    title: "Hukum yang Berlaku",
    content: `Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum yang berlaku di Republik Indonesia. Setiap sengketa yang timbul dari penggunaan platform ini akan diselesaikan melalui musyawarah untuk mufakat, dan jika tidak tercapai, akan diselesaikan di pengadilan yang berwenang di Indonesia.

Jika sebagian dari syarat dan ketentuan ini dinyatakan tidak sah atau tidak dapat ditegakkan, ketentuan lainnya tetap berlaku dan mengikat.`,
  },
]

export default function SyaratKetentuanPage() {
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
            Legal
          </span>
        </div>
        <h1 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl">
          Syarat & Ketentuan
        </h1>
        <p className="mb-8 text-muted-foreground">
          Terakhir diperbarui: Juni 2026
        </p>
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              variants={fadeIn}
              className="rounded-2xl border bg-card p-6 md:p-8"
            >
              <h2 className="mb-4 text-xl font-semibold md:text-2xl">
                Pasal {index + 1}: {section.title}
              </h2>
              <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
