import { useEffect, useSyncExternalStore, type ReactNode } from 'react'
import { getLanguage, subscribeLanguage, translate } from './translate'

export function LanguageRoot({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribeLanguage, getLanguage)
  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-PT' : language
    document.title = translate('Lusoprint — Dê forma à sua imaginação')
  }, [language])
  // Remount display components when changing language. Persistent basket and favourites
  // are restored by their existing providers, without translating stored identifiers.
  return <div key={language} style={{ display: 'contents' }}>{children}</div>
}
