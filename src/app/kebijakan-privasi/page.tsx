"use client"

import { motion } from "framer-motion"
import { fadeIn } from "@/lib/animations"
import { SITE_NAME, SITE_URL } from "@/lib/constants"

const sections = [
  {
    title: "Pendahuluan",
    content: `Kebijakan Privasi ini menjelaskan bagaimana ${SITE_NAME} ("kami", "kita", atau "platform") mengumpulkan, menggunakan, dan melindungi informasi pribadi yang Anda berikan saat menggunakan platform kami di ${SITE_URL}. Dengan menggunakan platform ini, Anda menyetujui pengumpulan dan penggunaan informasi sesuai dengan kebijakan ini.`,
  },
  {
    title: "Informasi yang Dikumpulkan",
    content: `Kami dapat mengumpulkan beberapa jenis informasi berikut:
• Informasi pribadi: nama, alamat email, dan informasi lain yang Anda berikan secara sukarela saat mendaftar atau menghubungi kami.
• Informasi penggunaan: data tentang bagaimana Anda berinteraksi dengan platform, termasuk halaman yang dikunjungi, produk yang dilihat, dan tautan yang diklik.
• Informasi perangkat: jenis perangkat, browser, alamat IP, dan sistem operasi yang Anda gunakan.
• Cookie dan teknologi pelacakan: kami menggunakan cookie untuk meningkatkan pengalaman pengguna.`,
  },
  {
    title: "Penggunaan Informasi",
    content: `Informasi yang kami kumpulkan digunakan untuk:
• Menyediakan, memelihara, dan meningkatkan layanan platform.
• Mengirimkan pembaruan, newsletter, atau informasi promosi (dengan persetujuan Anda).
• Menganalisis tren dan perilaku pengguna untuk meningkatkan kualitas layanan.
• Menyesuaikan konten dan rekomendasi produk sesuai preferensi Anda.
• Mendeteksi, mencegah, dan menangani masalah teknis atau keamanan.`,
  },
  {
    title: "Cookie",
    content: `Kami menggunakan cookie dan teknologi serupa untuk melacak aktivitas di platform kami. Cookie adalah file kecil yang disimpan di perangkat Anda. Anda dapat mengatur browser untuk menolak semua cookie atau memberi tahu saat cookie dikirim. Namun, jika Anda menolak cookie, beberapa bagian dari platform mungkin tidak berfungsi dengan baik.`,
  },
  {
    title: "Hak Pengguna",
    content: `Anda memiliki hak untuk:
• Mengakses informasi pribadi yang kami simpan tentang Anda.
• Meminta koreksi atau penghapusan data pribadi Anda.
• Menolak atau membatasi pemrosesan data Anda.
• Mencabut persetujuan yang telah diberikan sebelumnya.
• Meminta portabilitas data Anda ke penyedia lain.
Untuk menggunakan hak-hak ini, silakan hubungi kami melalui halaman Kontak.`,
  },
  {
    title: "Keamanan Data",
    content: `Kami menerapkan langkah-langkah keamanan yang wajar untuk melindungi informasi pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau penghancuran. Namun, tidak ada metode transmisi melalui internet atau penyimpanan elektronik yang 100% aman. Kami tidak dapat menjamin keamanan absolut.`,
  },
  {
    title: "Perubahan Kebijakan",
    content: `Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan diumumkan melalui halaman ini dengan memperbarui tanggal "Terakhir diperbarui". Kami menyarankan Anda untuk meninjau halaman ini secara berkala untuk mengetahui perubahan terbaru.`,
  },
  {
    title: "Kontak",
    content: `Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi ini, silakan hubungi kami melalui halaman Kontak atau kirim email ke support@cekoutyuk.sis.`,
  },
]

export default function KebijakanPrivasiPage() {
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
          Kebijakan Privasi
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
                {index + 1}. {section.title}
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
