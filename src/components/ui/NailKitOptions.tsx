import { NAIL_BITS } from '../../data/nail-bits'
import { useState } from 'react'

const KITS = [
  { id: 'master', name: 'Kit Master', detail: 'O kit mais completo', contents: '1 dedo didático 3D · 6 modelos de unha · 5 brocas com suporte · 2 lixas' },
  { id: 'pro', name: 'Kit Pro', detail: '', contents: '1 dedo didático 3D · 4 modelos de unha · 4 brocas com suporte · 2 lixas' },
  { id: 'basic', name: 'Kit Basic', detail: '', contents: '1 dedo didático 3D · 2 modelos de unha · 2 brocas · 1 lixa' },
] as const
export type NailKitVersion = typeof KITS[number]['id']
const SIZES = [20, 15] as const

// Prices will be provided for each kit and size combination.
export const NAIL_KIT_PRICES: { master: Record<typeof SIZES[number], number | null>; pro: { 20: number | null }; basic: { 20: number | null } } = {
  master: { 20: 109, 15: 89 },
  pro: { 20: 99 },
  basic: { 20: 59 },
}

export function NailKitOptions({ kit, onKitChange }: { kit: NailKitVersion; onKitChange: (kit: NailKitVersion) => void }) {
  const [size, setSize] = useState<typeof SIZES[number]>(20)
  const [selectedBits, setSelectedBits] = useState<string[]>([])
  const [extras, setExtras] = useState<Record<string, number>>({})
  const [personalization, setPersonalization] = useState<'none' | 'custom'>('none')
  const [customName, setCustomName] = useState('')
  const includedCount = kit === 'master' ? 5 : kit === 'pro' ? 4 : 2
  const included = selectedBits.slice(0, includedCount)
  const extrasCount = Object.values(extras).reduce((sum, value) => sum + value, 0)
  const selectedKit = KITS.find(option => option.id === kit)!
  const price = size === 20 ? NAIL_KIT_PRICES[kit][20] : NAIL_KIT_PRICES.master[size]
  const extraCost = extrasCount * 7
  const personalizationCost = personalization === 'none' ? 0 : 10
  const total = (price ?? 0) + extraCost + personalizationCost
  const money = (value: number) => `€${value.toFixed(2).replace('.', ',')}`
  const ready = included.length === includedCount
  const includedNames = NAIL_BITS.filter(bit => included.includes(bit.id)).map(bit => bit.name).join(', ')
  const extraNames = NAIL_BITS.filter(bit => extras[bit.id] > 0).map(bit => `${extras[bit.id]} × ${bit.name}`).join(', ')
  const message = `Olá! Gostaria de encomendar o Kit Nail Instrutor — ${selectedKit.name}, ${size} cm.\nBrocas incluídas: ${includedNames}.\nExtras: ${extraNames || 'nenhum'} (${money(extraCost)}).\nPersonalização: ${personalization === 'none' ? 'sem personalização' : `nome ou logótipo (+€10)${customName.trim() ? ` — ${customName.trim()}` : ''}; confirmarei o nome ou enviarei o logótipo nesta conversa`}.\nTotal: ${money(total)}.`
  const contact = `https://wa.me/351939158345?text=${encodeURIComponent(message)}`

  return (
    <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 24, marginTop: 24 }}>
      <fieldset style={{ border: 0, padding: 0, margin: '0 0 24px' }}>
        <legend className="kicker" style={{ marginBottom: 12 }}>Escolha o tamanho</legend>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {SIZES.map(option => (
            <label key={option} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', border: `1px solid ${size === option ? 'var(--ink)' : 'var(--rule)'}`, borderRadius: 30, cursor: 'pointer', fontSize: 14 }}>
              <input type="radio" name="nail-kit-size" value={option} checked={size === option} onChange={() => { setSize(option); if (option !== 20) { onKitChange('master'); setSelectedBits([]) } }} style={{ accentColor: 'var(--terracotta)' }} />
              {option} cm
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset style={{ border: 0, padding: 0, margin: '0 0 24px' }}>
        <legend className="kicker" style={{ marginBottom: 12 }}>Escolha o kit</legend>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {KITS.filter(option => size === 20 || option.id === 'master').map(option => (
            <label key={option.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '12px 14px', border: `1px solid ${kit === option.id ? 'var(--ink)' : 'var(--rule)'}`, borderRadius: 6, cursor: 'pointer', background: kit === option.id ? 'var(--linen)' : 'transparent' }}>
              <input type="radio" name="nail-kit-version" value={option.id} checked={kit === option.id} onChange={() => { onKitChange(option.id); setSelectedBits([]) }} style={{ accentColor: 'var(--terracotta)', marginTop: 3 }} />
              <span style={{ fontSize: 14 }}>{option.name}{option.detail && <small style={{ display: 'block', color: 'var(--ink-soft)', fontSize: 11, marginTop: 5 }}>{option.detail}</small>}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {size !== 20 && <p style={{ fontSize: 12, color: 'var(--ink-soft)', margin: '0 0 16px' }}>No tamanho de 15 cm, está disponível apenas o Kit Master.</p>}
      <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.7, margin: '0 0 20px' }}>{selectedKit.contents}</p>
      <fieldset style={{ border: '1px solid var(--rule)', padding: 16, margin: '24px 0', borderRadius: 6 }}>
        <legend style={{ fontSize: 14 }}>Escolha as {includedCount} brocas incluídas</legend>
        <p aria-live="polite" style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{included.length} de {includedCount} selecionadas · 10 modelos disponíveis</p>
        {NAIL_BITS.map(bit => (
          <label key={bit.id} style={{ display: 'flex', gap: 10, padding: '9px 0', cursor: 'pointer', lineHeight: 1.5 }}>
            <input type="checkbox" checked={included.includes(bit.id)} disabled={!included.includes(bit.id) && included.length >= includedCount} onChange={e => setSelectedBits(e.target.checked ? [...included, bit.id] : included.filter(id => id !== bit.id))} style={{ marginTop: 5, accentColor: 'var(--terracotta)' }} />
            <span style={{ fontSize: 13 }}>{bit.name}</span>
          </label>
        ))}
      </fieldset>
      <fieldset style={{ border: '1px solid var(--rule)', padding: 16, margin: '24px 0', borderRadius: 6 }}>
        <legend style={{ fontSize: 14 }}>Brocas extras · €7 por unidade</legend>
        <p style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Escolha os modelos e quantidades adicionais. Duas brocas extras acrescentam €14 ao kit.</p>
        {NAIL_BITS.map(bit => (
          <label key={bit.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, margin: '10px 0', fontSize: 13 }}>
            {bit.name}
            <input type="number" min={0} step={1} value={extras[bit.id] ?? 0} onChange={e => setExtras(current => ({ ...current, [bit.id]: Math.max(0, Math.floor(Number(e.target.value) || 0)) }))} style={{ width: 64, flexShrink: 0, padding: 8, fontFamily: 'inherit', border: '1px solid var(--rule)', borderRadius: 4 }} />
          </label>
        ))}
      </fieldset>
      <fieldset style={{ border: '1px solid var(--rule)', padding: 16, margin: '24px 0', borderRadius: 6 }}>
        <legend style={{ fontSize: 14 }}>Personalizar o kit</legend>
        {([['none', 'Sem personalização'], ['custom', 'Nome ou logótipo (+€10)']] as const).map(([value, label]) => (
          <label key={value} style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '12px 0', fontSize: 13 }}>
            <input type="radio" name="nail-personalization" checked={personalization === value} onChange={() => setPersonalization(value)} style={{ accentColor: 'var(--terracotta)' }} />{label}
          </label>
        ))}
        {personalization === 'custom' && <label style={{ display: 'block', fontSize: 13 }}>Personalização desejada (opcional)<input value={customName} maxLength={60} onChange={e => setCustomName(e.target.value)} placeholder="Indique o nome ou escreva que pretende o logótipo" style={{ display: 'block', width: '100%', padding: 10, marginTop: 8, boxSizing: 'border-box', fontFamily: 'inherit', border: '1px solid var(--rule)', borderRadius: 4 }} /></label>}
        {personalization === 'custom' && <p style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Ao finalizar no WhatsApp, confirme o nome ou envie a imagem do seu logótipo. O acréscimo é de €10.</p>}
      </fieldset>
      <div aria-live="polite" style={{ background: 'var(--linen)', padding: 16, borderRadius: 6, marginBottom: 20, lineHeight: 1.8, fontSize: 14 }}>
        <strong>{selectedKit.name} · {size} cm</strong>
        <div>Kit: {money(price ?? 0)}</div>
        <div>Extras: {extrasCount} brocas · {money(extraCost)}</div>
        <div>Personalização: {money(personalizationCost)}</div>
        <div style={{ borderTop: '1px solid var(--rule)', marginTop: 10, paddingTop: 10, fontSize: 20 }}>Total: {money(total)}</div>
      </div>
      {!ready && <p style={{ fontSize: 12, color: 'var(--ink-soft)' }}>Selecione as {includedCount} brocas incluídas para continuar.</p>}
      <a href={ready ? contact : undefined} aria-disabled={!ready} onClick={e => { if (!ready) e.preventDefault() }} target="_blank" rel="noopener noreferrer" className="btn btn-solid" style={{ opacity: ready ? 1 : 0.5, cursor: ready ? 'pointer' : 'default' }}>Finalizar no WhatsApp →</a>
    </div>
  )
}
