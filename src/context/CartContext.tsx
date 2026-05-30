import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { supabase } from '../lib/supabase'

export type CartItem = {
  id: string
  name: string
  price: number
  qty: number
  productId?: string
  img?: string
  letraColorName?: string; letraHex?: string
  nomeColorName?: string;  nomeHex?: string
  size?: 15 | 23; mono?: boolean; previewUrl?: string
  note?: string
}

type CouponStatus = 'valid' | 'invalid' | 'used' | 'error'

type CartCtx = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'id' | 'qty'>, qty?: number) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  count: number
  total: number
  couponCode: string | null
  discount: number
  finalTotal: number
  applyCoupon: (code: string) => Promise<CouponStatus>
  removeCoupon: () => void
  markCouponUsed: () => Promise<void>
}

const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('lp_cart') ?? '[]') }
    catch { return [] }
  })
  const [couponCode, setCouponCode] = useState<string | null>(() =>
    localStorage.getItem('lp_coupon')
  )
  const [discount, setDiscount] = useState<number>(() =>
    localStorage.getItem('lp_coupon') ? 0.1 : 0
  )

  useEffect(() => {
    localStorage.setItem('lp_cart', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    if (couponCode) localStorage.setItem('lp_coupon', couponCode)
    else localStorage.removeItem('lp_coupon')
  }, [couponCode])

  const addItem = (item: Omit<CartItem, 'id' | 'qty'>, qty = 1) =>
    setItems(prev => {
      if (item.productId && !item.note) {
        const existing = prev.find(i => i.productId === item.productId)
        if (existing) return prev.map(i => i.id === existing.id ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { ...item, id: crypto.randomUUID(), qty }]
    })

  const removeItem = (id: string) =>
    setItems(prev => prev.filter(i => i.id !== id))

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) { removeItem(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clearCart = () => setItems([])

  const applyCoupon = async (code: string): Promise<CouponStatus> => {
    const normalized = code.trim().toUpperCase()
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('used')
        .eq('code', normalized)
        .single()
      if (error || !data) return 'invalid'
      if (data.used) return 'used'
      setCouponCode(normalized)
      setDiscount(0.1)
      return 'valid'
    } catch {
      return 'error'
    }
  }

  const removeCoupon = () => { setCouponCode(null); setDiscount(0) }

  const markCouponUsed = async () => {
    if (!couponCode) return
    await supabase
      .from('coupons')
      .update({ used: true, used_at: new Date().toISOString() })
      .eq('code', couponCode)
    removeCoupon()
  }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const finalTotal = discount > 0 ? Math.round(total * (1 - discount) * 100) / 100 : total
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      count, total, couponCode, discount, finalTotal,
      applyCoupon, removeCoupon, markCouponUsed,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
