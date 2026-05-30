import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { ALL_SHOP_PRODUCTS } from '../data/shop'
import { MUNDIAL_PRODUCTS } from '../data/mundial'

const VALID_IDS = new Set([...ALL_SHOP_PRODUCTS, ...MUNDIAL_PRODUCTS].map(p => p.id))

type FavCtx = {
  isFav: (id: string) => boolean
  toggle: (id: string) => void
  favIds: string[]
  count: number
}

const FavoritesContext = createContext<FavCtx>(null!)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      const stored: string[] = JSON.parse(localStorage.getItem('lp-favs') ?? '[]')
      return stored.filter(id => VALID_IDS.has(id))
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('lp-favs', JSON.stringify(ids))
  }, [ids])

  const toggle = (id: string) =>
    setIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <FavoritesContext.Provider value={{ isFav: id => ids.includes(id), toggle, favIds: ids, count: ids.length }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
