import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Providers from "./providers"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BottomNav } from "@/components/layout/bottom-nav"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Cekout Yuk Sis - Temukan Produk Viral Favorit Para Sis",
  description:
    "Platform kurasi produk pilihan untuk wanita Indonesia. Temukan produk terbaik, viral, dan terpercaya dari berbagai marketplace.",
  openGraph: {
    title: "Cekout Yuk Sis",
    description:
      "Platform kurasi produk pilihan untuk wanita Indonesia. Temukan produk terbaik, viral, dan terpercaya dari berbagai marketplace.",
    url: "https://cekoutyuk.sis",
    siteName: "Cekout Yuk Sis",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cekout Yuk Sis",
    description:
      "Platform kurasi produk pilihan untuk wanita Indonesia. Temukan produk terbaik, viral, dan terpercaya dari berbagai marketplace.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-dvh flex flex-col`}>
        <Providers>
          <Header />
          <main className="flex-1 pb-16 sm:pb-0">{children}</main>
          <BottomNav />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
