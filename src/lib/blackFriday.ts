import { ALL_SHOP_PRODUCTS } from '../data/shop'
import { PRODUCTS } from '../data'

export function isBlackFridayActive() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Lisbon', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date())
  const today = `${parts.find(p => p.type === 'year')?.value}-${parts.find(p => p.type === 'month')?.value}-${parts.find(p => p.type === 'day')?.value}`
  return today >= '2026-11-17' && today <= '2026-11-28'
}

const FAMILY_PRODUCT_IDS = new Set([
  'familia-funko', 'familia-estatua-familia', 'familia-estatua-fams2', 'estatua-familia', 'estatua-fams2',
])

const PRODUCT_CATEGORIES = new Map([
  ...PRODUCTS.map(product => [product.id, product.collection.toLowerCase()] as const),
  ...ALL_SHOP_PRODUCTS.map(product => [product.id, product.universoId] as const),
])

const PERCENTAGE_TO_PAY: Record<string, number> = {
  mamaes: 95,
  pets: 90,
  bebes: 75,
  'bebés': 75,
  'crianças': 75,
  cozinha: 75,
  organiz: 80,
  'organização': 80,
}

export function blackFridayPrice(regularPrice: number, productId?: string) {
  if (!isBlackFridayActive()) return regularPrice
  if (productId && FAMILY_PRODUCT_IDS.has(productId)) return Math.round(regularPrice * 95) / 100
  const category = PRODUCT_CATEGORIES.get(productId ?? '') ?? ''
  return Math.round(regularPrice * (PERCENTAGE_TO_PAY[category] ?? 60)) / 100
}

export function blackFridayBusinessPrice(regularPrice: number) {
  return isBlackFridayActive() ? Math.round(regularPrice * 75) / 100 : regularPrice
}

export function blackFridayNailKitPrice(regularPrice: number, size: 15 | 20) {
  const percentageToPay = size === 15 ? 80 : 85
  return isBlackFridayActive() ? Math.round(regularPrice * percentageToPay) / 100 : regularPrice
}

export function blackFridayOff(regularPrice: number, salePrice: number) {
  if (salePrice >= regularPrice || regularPrice <= 0) return ''
  return `${Math.round(100 * (1 - salePrice / regularPrice))}% OFF · `
}

export function blackFridayPriceLabel(regularPrice: number, salePrice: number) {
  return `${blackFridayOff(regularPrice, salePrice)}€${salePrice.toFixed(2).replace('.', ',')}`
}
