import { useSyncExternalStore } from 'react'
import { getLanguage, isLanguage, LANGUAGES, setLanguage, subscribeLanguage } from './translate'

export function LanguageSelector() {
  const language = useSyncExternalStore(subscribeLanguage, getLanguage)
  return (
    <label className="language-selector" translate="no">
      <span aria-hidden="true">◎</span>
      <select aria-label="Idioma / Language" value={language} onChange={event => { if (isLanguage(event.target.value)) setLanguage(event.target.value) }}>
        {LANGUAGES.map(item => <option key={item.code} value={item.code}>{item.label}</option>)}
      </select>
    </label>
  )
}
