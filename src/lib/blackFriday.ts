export function isBlackFridayActive() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Lisbon', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date())
  const today = `${parts.find(p => p.type === 'year')?.value}-${parts.find(p => p.type === 'month')?.value}-${parts.find(p => p.type === 'day')?.value}`
  return today >= '2026-11-17' && today <= '2026-11-27'
}

const EXCLUDED_UNIVERSES = new Set(['cozinha', 'sala', 'escritorio'])
const EXCLUDED_COLLECTIONS = new Set(['cozinha', 'sala', 'escritório', 'escritorio'])

export function blackFridayPrice(price: number, category?: string) {
  if (!isBlackFridayActive() || (category && (EXCLUDED_UNIVERSES.has(category.toLowerCase()) || EXCLUDED_COLLECTIONS.has(category.toLowerCase())))) return price
  return Math.round(price * 0.7 * 100) / 100
}

export function blackFridayBusinessPrice(id: string, regularPrice: number) {
  if (!isBlackFridayActive()) return regularPrice
  if (id === 'kit-pedi-instrutor') return 54.9
  if (id === 'organizador-atendimento-f1') return 11.9
  return Math.round(regularPrice * 0.7 * 100) / 100
}
