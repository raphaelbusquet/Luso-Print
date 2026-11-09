import messages from './messages.json'

export const LANGUAGES = [
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'English' },
] as const
export type Language = typeof LANGUAGES[number]['code']
const STORAGE_KEY = 'lusoprint-language'
export const isLanguage = (value: string | null): value is Language => LANGUAGES.some(item => item.code === value)
let language: Language = 'pt'
try {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (isLanguage(stored)) language = stored
} catch { /* Storage may be unavailable in private browsing. */ }
const subscribers = new Set<() => void>()
export const subscribeLanguage = (listener: () => void) => { subscribers.add(listener); return () => { subscribers.delete(listener) } }
export const getLanguage = () => language
export function setLanguage(value: Language) {
  if (value === language) return
  language = value
  try { localStorage.setItem(STORAGE_KEY, value) } catch { /* The current session still works. */ }
  document.documentElement.lang = value === 'pt' ? 'pt-PT' : value
  subscribers.forEach(listener => listener())
}
const catalog = messages as Record<string, string[]>
const index: Record<Exclude<Language, 'pt'>, number> = { es: 0, fr: 1, it: 2, en: 3 }
const cache = new Map<string, string>()
const keys = Object.keys(catalog).filter(key => key.trim().length > 1 && key.length <= 240).sort((a,b) => b.length - a.length)
const escaped = keys.map(key => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
// Exact phrases first; fragments also cover dynamic prices, quantities and labels.
const fragments = new RegExp(`(?<![\\p{L}\\p{N}])(?:${escaped.join('|')})(?![\\p{L}\\p{N}])`, 'gu')
export function translate<T>(value: T): T {
  if (language === 'pt' || typeof value !== 'string' || !value.trim()) return value
  if (/^(?:\/\S|https?:\/\/|mailto:|[^\s@]+@[^\s@]+$|@[^\s]+$)/.test(value)) return value
  const key = `${language}:${value}`
  const cached = cache.get(key)
  if (cached !== undefined) return cached as T
  const column = index[language]
  const clean = value.trim()
  const exact = catalog[clean]
  const translated = exact
    ? value.replace(clean, exact[column])
    : /[\r\n]/.test(value)
      ? value.split(/(\r?\n)/).map(part => /[\r\n]/.test(part) ? part : translate(part)).join('')
      : value.replace(fragments, match => catalog[match][column])
  cache.set(key, translated)
  return translated as T
}

// Keep free-form names and theme requests exactly as entered by the customer.
export function translateOrderNote(note: string) {
  return note.split(' · ').map(part => {
    const custom = /^(Nome|Tema e cores|Tema|Nome ou logótipo):\s*(.*)$/s.exec(part)
    return custom ? `${translate(custom[1])}: ${custom[2]}` : translate(part)
  }).join(' · ')
}
