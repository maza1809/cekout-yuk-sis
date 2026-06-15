import { NextResponse } from "next/server"

const demoProducts = [
  {
    name: "Skintific 5X Ceramide Low PH Cleanser",
    description: "Skintific 5X Ceramide Low PH Cleanser adalah facial wash dengan 5X Ceramide untuk memperbaiki skin barrier. Cocok untuk kulit sensitif dan kering.",
    price: 45000,
    original_price: 60000,
    rating: 4.8,
    review_count: 15200,
    items_sold: 34200,
    store_name: "Skintific Official Shop",
    images: ["https://placehold.co/600x600/6366f1/ffffff?text=Skintific+Main"],
    gallery_images: [
      "https://placehold.co/600x600/6366f1/ffffff?text=Skintific+1",
      "https://placehold.co/600x600/818cf8/ffffff?text=Skintific+2",
      "https://placehold.co/600x600/a5b4fc/ffffff?text=Skintific+3",
    ],
    specifications: "Volume: 100ml\npH: 5.5\nKulit: Normal, Kering, Sensitif\nManfaat: Membersihkan tanpa membuat kering",
    tags: ["skincare", "facial-wash", "ceramide"],
    category_id: "c1",
    brand_id: "b1",
  },
  {
    name: "Somethinc Niacinamide + Moisture Beet Serum",
    description: "Serum dengan Niacinamide 10% dan Moisture Beet untuk mencerahkan dan melembapkan kulit secara intensif.",
    price: 85000,
    original_price: 100000,
    rating: 4.7,
    review_count: 8900,
    items_sold: 21500,
    store_name: "Somethinc Official Shop",
    images: ["https://placehold.co/600x600/ec4899/ffffff?text=Somethinc+Main"],
    gallery_images: [
      "https://placehold.co/600x600/ec4899/ffffff?text=Somethinc+1",
      "https://placehold.co/600x600/f472b6/ffffff?text=Somethinc+2",
      "https://placehold.co/600x600/f9a8d4/ffffff?text=Somethinc+3",
    ],
    specifications: "Volume: 30ml\nKandungan: 10% Niacinamide\nKulit: Berminyak, Kombinasi",
    tags: ["skincare", "serum", "niacinamide"],
    category_id: "c1",
    brand_id: "b2",
  },
  {
    name: "Wardah Lightening Day Cream SPF 30",
    description: "Krim siang dengan SPF 30 PA+++ yang mencerahkan dan melindungi kulit dari sinar UV serta polusi.",
    price: 32000,
    original_price: 38000,
    rating: 4.6,
    review_count: 12400,
    items_sold: 56700,
    store_name: "Wardah Beauty",
    images: ["https://placehold.co/600x600/10b981/ffffff?text=Wardah+Main"],
    gallery_images: [
      "https://placehold.co/600x600/10b981/ffffff?text=Wardah+1",
      "https://placehold.co/600x600/34d399/ffffff?text=Wardah+2",
      "https://placehold.co/600x600/6ee7b7/ffffff?text=Wardah+3",
    ],
    specifications: "Volume: 30g\nSPF: 30 PA+++\nKulit: Semua jenis kulit",
    tags: ["skincare", "day-cream", "spf"],
    category_id: "c1",
    brand_id: "b3",
  },
]

const storeNames = [
  "Official Store",
  "Brand Official Shop",
  "Authorized Store",
  "Beauty Official Store",
]

function generateDemoProduct(url: string) {
  const base = demoProducts[Math.floor(Math.random() * demoProducts.length)]
  const randomSuffix = Math.floor(Math.random() * 10000)
  const slug = base.name.toLowerCase().replace(/\s+/g, "-") + "-" + randomSuffix

  return {
    name: base.name,
    slug,
    description: base.description,
    price: base.price + Math.floor(Math.random() * 5000),
    original_price: base.original_price,
    rating: +(base.rating + (Math.random() * 0.4 - 0.2)).toFixed(1),
    review_count: base.review_count + Math.floor(Math.random() * 2000),
    items_sold: base.items_sold + Math.floor(Math.random() * 5000),
    store_name: storeNames[Math.floor(Math.random() * storeNames.length)],
    images: base.images,
    gallery_images: base.gallery_images,
    specifications: base.specifications,
    tags: base.tags,
    category_id: base.category_id,
    brand_id: base.brand_id,
  }
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL produk Shopee wajib diisi" }, { status: 400 })
    }

    if (!url.includes("shopee.co.id")) {
      return NextResponse.json({ error: "URL harus dari Shopee Indonesia (shopee.co.id)" }, { status: 400 })
    }

    await new Promise((r) => setTimeout(r, 1500))

    const product = generateDemoProduct(url)

    return NextResponse.json({ success: true, product })
  } catch {
    return NextResponse.json({ error: "Gagal mengambil data produk" }, { status: 500 })
  }
}
