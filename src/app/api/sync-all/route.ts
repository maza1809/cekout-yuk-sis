import { NextResponse } from "next/server"

export async function POST() {
  try {
    await new Promise((r) => setTimeout(r, 3000))

    const syncedCount = Math.floor(Math.random() * 5) + 3
    const updates = Array.from({ length: syncedCount }, (_, i) => ({
      id: `sync-${i}`,
      price: 45000 + Math.floor(Math.random() * 20000),
      rating: +(4.0 + Math.random() * 1.0).toFixed(1),
      review_count: 10000 + Math.floor(Math.random() * 30000),
      items_sold: 20000 + Math.floor(Math.random() * 50000),
      last_synced: new Date().toISOString(),
    }))

    return NextResponse.json({
      success: true,
      message: `Sinkronisasi otomatis selesai. ${syncedCount} produk diperbarui.`,
      updates,
    })
  } catch {
    return NextResponse.json({ error: "Gagal sinkronisasi otomatis" }, { status: 500 })
  }
}
