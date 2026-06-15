import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { productId, url } = await request.json()

    if (!productId && !url) {
      return NextResponse.json({ error: "Product ID atau URL diperlukan" }, { status: 400 })
    }

    await new Promise((r) => setTimeout(r, 2000))

    const priceChange = Math.floor(Math.random() * 5000) - 2500
    const reviewChange = Math.floor(Math.random() * 500)
    const soldChange = Math.floor(Math.random() * 1000)

    const updated = {
      price: 45000 + priceChange,
      original_price: 60000,
      rating: +(4.5 + Math.random() * 0.5).toFixed(1),
      review_count: 15200 + reviewChange,
      items_sold: 34200 + soldChange,
      last_synced: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, product: updated, message: "Sinkronisasi berhasil" })
  } catch {
    return NextResponse.json({ error: "Gagal sinkronisasi produk" }, { status: 500 })
  }
}
