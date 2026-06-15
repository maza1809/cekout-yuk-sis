"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { Brand } from "@/types"
import { defaultBrands } from "@/lib/data/brands"
import { db } from "@/lib/services/supabase-service"

interface BrandContextType {
  brands: Brand[]
  setBrands: React.Dispatch<React.SetStateAction<Brand[]>>
  addBrand: (brand: Brand) => void
  updateBrand: (id: string, updates: Partial<Brand>) => void
  deleteBrand: (id: string) => void
}

const BrandContext = createContext<BrandContextType | undefined>(undefined)

const STORAGE_KEY = "cekoutyuk_brands"

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    async function init() {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try { setBrands(JSON.parse(stored)); return }
        catch { /* ignore */ }
      }
      const data = await db.brands()
      if (data && data.length > 0) {
        setBrands(data)
      } else {
        setBrands(defaultBrands)
      }
    }
    init()
  }, [])

  useEffect(() => {
    if (brands.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(brands))
    }
  }, [brands])

  const addBrand = useCallback((brand: Brand) => {
    setBrands((prev) => [brand, ...prev])
    const { id: _id, ...brandData } = brand
    db.upsertBrand(brandData as Brand)
  }, [])

  const updateBrand = useCallback((id: string, updates: Partial<Brand>) => {
    setBrands((prev) => {
      const updated = prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
      const found = updated.find((b) => b.id === id)
      if (found) db.upsertBrand(found)
      return updated
    })
  }, [])

  const deleteBrand = useCallback((id: string) => {
    setBrands((prev) => prev.filter((b) => b.id !== id))
    db.deleteBrand(id)
  }, [])

  return (
    <BrandContext.Provider value={{ brands, setBrands, addBrand, updateBrand, deleteBrand }}>
      {children}
    </BrandContext.Provider>
  )
}

export function useBrands() {
  const ctx = useContext(BrandContext)
  if (!ctx) throw new Error("useBrands must be used within BrandProvider")
  return ctx
}
