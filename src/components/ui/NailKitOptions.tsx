import { blackFridayPriceLabel } from '../../lib/blackFriday'
import { translate as t } from '../../i18n/translate'
import { NAIL_BITS } from '../../data/nail-bits'
import { useState } from 'react'
import { blackFridayNailKitPrice, isBlackFridayActive } from '../../lib/blackFriday'

const KITS = [
  { id: 'master', name: 'Kit Master', detail: 'O kit mais completo', contents: '1 dedo didático 3D · 6 modelos de unha · 5 brocas com suporte · 2 lixas' },
  { id: 'pro', name: 'Kit Pro', detail: '', contents: '1 dedo didático 3D · 4 modelos de unha · 4 brocas com suporte · 2 lixas' },
  { id: 'basic', name: 'Kit Basic', detail: '', contents: '1 dedo didático 3D · 2 modelos de unha · 2 brocas · 1 lixa' },
] as const
export type NailKitVersion = typeof KITS[number]['id']
const NAIL_COLORS = [
  { name: 'Rosa claro', hex: '#edbdcb' },
  { name: 'Vermelho', hex: '#c7212f' },
  { name: 'Vermelho escuro', hex: '#781c2b' },
  { name: 'Roxo', hex: '#774890' },
  { name: 'Branco pérolado', hex: '#f3efe7' },
  { name: 'Preto', hex: '#252323' },
  { name: 'Nude', hex: '#cdaa96' },
  { name: 'Marrom', hex: '#795443' },
] as const

const BIT_COLORS = [
  { name: 'Prata', hex: '#b9bdc5' },
  { name: 'Dourada', hex: '#c5a250' },
] as const

const SIZES = [15, 20] as const

// Prices will be provided for each kit and size combination.
export const NAIL_KIT_PRICES: { master: Record<typeof SIZES[number], number | null>; pro: { 20: number | null }; basic: { 20: number | null } } = {
  master: { 20: 109, 15: 89 },
  pro: { 20: 99 },
  basic: { 20: 59 },
}

export function NailKitOptions({ kit, onKitChange }: { kit: NailKitVersion; onKitChange: (kit: NailKitVersion) => void }) {
  const [size, setSize] = useState<typeof SIZES[number]>(15)
  const [nailColor, setNailColor] = useState('')
  const [bitColor, setBitColor] = useState('')
  const [selectedBits, setSelectedBits] = useState<string[]>([])
  const [extraModels, setExtraModels] = useState('')
  const [extrasCount, setExtrasCount] = useState(0)
  const [personalization, setPersonalization] = useState<'none' | 'custom'>('none')
  const [customName, setCustomName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const includedCount = kit === 'master' ? 5 : kit === 'pro' ? 4 : 2
  const included = selectedBits.slice(0, includedCount)
  const selectedKit = KITS.find(option => option.id === kit)!
  const regularPrice = size === 20 ? NAIL_KIT_PRICES[kit][20] : NAIL_KIT_PRICES.master[size]
  const price = regularPrice === null ? null : blackFridayNailKitPrice(regularPrice, size)
  const hasSecondUnitOffer = isBlackFridayActive() && kit === 'master' && size === 15
  const secondUnitPrice = hasSecondUnitOffer && price !== null ? Math.round(price * 90) / 100 : price
  const extraCost = extrasCount * 7
  const personalizationCost = personalization === 'none' ? 0 : 10
  const kitsTotal = (price ?? 0) + (quantity > 1 ? (secondUnitPrice ?? 0) : 0) + Math.max(0, quantity - 2) * (price ?? 0)
  const total = kitsTotal + quantity * (extraCost + personalizationCost)
  const money = (value: number) => `€${value.toFixed(2).replace('.', ',')}`
  const bitsReady = included.length === includedCount
  const ready = bitsReady && Boolean(nailColor) && Boolean(bitColor) && (extrasCount === 0 || Boolean(extraModels.trim()))
  const includedNames = NAIL_BITS.filter(bit => included.includes(bit.id)).map(bit => t(bit.name)).join(', ')
  const extraNames = extrasCount > 0 ? `${extrasCount} × ${extraModels.trim()}` : ''
  const personalisationLabel = personalization === 'none'
    ? t('Sem personalização')
    : `${t('Nome ou logótipo (+€10)')}${customName.trim() ? ` — ${customName.trim()}` : ''}. ${t('Ao finalizar no WhatsApp, confirme o nome ou envie a imagem do seu logótipo. O acréscimo é de €10.')}`
  const message = `${t('Olá! Gostaria de encomendar')} ${quantity} × Kit Nail Instrutor — ${t(selectedKit.name)}, ${size} cm.\n${quantity > 1 ? `${t('1.ª unidade')}: ${money(price ?? 0)} · ${t('2.ª unidade')}: ${money(secondUnitPrice ?? 0)}.\n` : ''}${t('Cor da unha:')} ${t(nailColor)}.\n${t('Cor das brocas:')} ${t(bitColor)}.\n${t('Brocas incluídas:')} ${includedNames}.\n${t('Extras:')} ${extraNames || t('Nenhum')} (${money(extraCost)} ${t('por kit')}).\n${t('Personalização:')} ${personalisationLabel}.\n${t('Total:')} ${money(total)}.`
  const contact = `https://wa.me/351928419522?text=${encodeURIComponent(message)}`

  return (
    <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 24, marginTop: 24 }}>
      <fieldset style={{ border: 0, padding: 0, margin: '0 0 24px' }}>
        <legend className="kicker" style={{ marginBottom: 12 }}>{t("Escolha o tamanho")}</legend>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {t(SIZES.map(option => (
            <label key={option} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', border: `1px solid ${size === option ? 'var(--ink)' : 'var(--rule)'}`, borderRadius: 30, cursor: 'pointer', fontSize: 14 }}>
              <input type="radio" name="nail-kit-size" value={option} checked={size === option} onChange={() => { setSize(option); if (option !== 20) { setQuantity(current => Math.min(current, 2)); onKitChange('master'); setSelectedBits([]) } }} style={{ accentColor: 'var(--terracotta)' }} />
              {t(option)}{t(" cm")}</label>
          )))}
        </div>
      </fieldset>
      <fieldset style={{ border: 0, padding: 0, margin: '0 0 24px' }}>
        <legend className="kicker" style={{ marginBottom: 12 }}>{t("Escolha o kit")}</legend>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {t(KITS.filter(option => size === 20 ? option.id !== 'pro' : option.id === 'master').map(option => (
            <label key={option.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '12px 14px', border: `1px solid ${kit === option.id ? 'var(--ink)' : 'var(--rule)'}`, borderRadius: 6, cursor: 'pointer', background: kit === option.id ? 'var(--linen)' : 'transparent' }}>
              <input type="radio" name="nail-kit-version" value={option.id} checked={kit === option.id} onChange={() => { onKitChange(option.id); setSelectedBits([]) }} style={{ accentColor: 'var(--terracotta)', marginTop: 3 }} />
              <span style={{ fontSize: 14 }}>{t(option.name)}{t(option.detail && <small style={{ display: 'block', color: 'var(--ink-soft)', fontSize: 11, marginTop: 5 }}>{t(option.detail)}</small>)}</span>
            </label>
          )))}
        </div>
      </fieldset>
      {t(size !== 20 && <p style={{ fontSize: 12, color: 'var(--ink-soft)', margin: '0 0 16px' }}>{t("No tamanho de 15 cm, está disponível apenas o Kit Master.")}</p>)}
      <p style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.7, margin: '0 0 20px' }}>{t(selectedKit.contents)}</p>
      {[
        { label: 'Escolha a cor da unha', colors: NAIL_COLORS, selection: nailColor, setColor: setNailColor },
        { label: 'Escolha a cor das brocas', colors: BIT_COLORS, selection: bitColor, setColor: setBitColor },
      ].map(({ label, colors, selection, setColor }) => (
        <fieldset key={label} style={{ border: 0, padding: 0, margin: '0 0 24px' }}>
          <legend className="kicker" style={{ marginBottom: 14 }}>
            {t(label)}{selection && <span style={{ letterSpacing: 0, textTransform: 'none' }}> — {t(selection)}</span>}
          </legend>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {colors.map(color => {
              const selected = selection === color.name
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setColor(color.name)}
                  aria-label={t(color.name)}
                  aria-pressed={selected}
                  title={t(color.name)}
                  style={{
                    width: 38, height: 38, borderRadius: '50%', background: color.hex,
                    border: selected ? '3px solid var(--linen)' : '1px solid rgba(40,36,32,.08)',
                    outline: selected ? '2px solid var(--ink)' : undefined, outlineOffset: 2,
                    boxShadow: '0 2px 5px rgba(30,26,22,.12)', cursor: 'pointer',
                  }}
                />
              )
            })}
          </div>
        </fieldset>
      ))}
      {hasSecondUnitOffer ? (
        <label style={{ display: 'grid', gap: 8, marginBottom: 20, fontSize: 14 }}>
          {t('Escolha a sua opção')}
          <select
            value={quantity}
            onChange={event => setQuantity(Number(event.target.value))}
            style={{ width: '100%', padding: 8, font: 'inherit', border: '1px solid var(--rule)', borderRadius: 4 }}
          >
            <option value={1}>{t('1 unidade')} · {money(price ?? 0)}</option>
            <option value={2}>{t('2 unidades')} · {money((price ?? 0) + (secondUnitPrice ?? 0))} ({t('2.ª unidade')}: {money(secondUnitPrice ?? 0)})</option>
          </select>
        </label>
      ) : (
        <label style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 20px', fontSize: 14 }}>{t('Quantidade')}<input type="number" min={1} step={1} value={quantity} onChange={event => setQuantity(Math.max(1, Math.floor(Number(event.target.value) || 1)))} style={{ width: 72, padding: 8, border: '1px solid var(--rule)', borderRadius: 4, font: 'inherit' }} /></label>
      )}
      <fieldset style={{ border: '1px solid var(--rule)', padding: 16, margin: '24px 0', borderRadius: 6 }}>
        <legend style={{ fontSize: 14 }}>{t("Escolha as ")}{t(includedCount)}{t(" brocas incluídas")}</legend>
        <p aria-live="polite" style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{t(included.length)}{t(" de ")}{t(includedCount)}{t(" selecionadas · 10 modelos disponíveis")}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gridTemplateRows: 'repeat(5, auto)', gridAutoFlow: 'column', columnGap: 12 }}>
        {t(NAIL_BITS.map(bit => (
          <label key={bit.id} style={{ display: 'flex', gap: 10, padding: '9px 0', cursor: 'pointer', lineHeight: 1.5 }}>
            <input type="checkbox" checked={included.includes(bit.id)} disabled={!included.includes(bit.id) && included.length >= includedCount} onChange={e => setSelectedBits(e.target.checked ? [...included, bit.id] : included.filter(id => id !== bit.id))} style={{ marginTop: 5, accentColor: 'var(--terracotta)' }} />
            <span style={{ fontSize: 13 }}>{t(bit.name)}</span>
          </label>
        )))}
        </div>
      </fieldset>
      <fieldset style={{ border: '1px solid var(--rule)', padding: 16, margin: '24px 0', borderRadius: 6 }}>
        <legend style={{ fontSize: 14 }}>{t("Brocas extras · €7 por unidade")}</legend>
        <label style={{ display: 'block', fontSize: 13 }}>
          {t('Escreva os modelos de brocas extras')}
          <input
            type="text"
            value={extraModels}
            onChange={event => setExtraModels(event.target.value)}
            style={{ display: 'block', width: '100%', boxSizing: 'border-box', marginTop: 6, padding: 8, font: 'inherit', border: '1px solid var(--rule)', borderRadius: 4 }}
          />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, fontSize: 13 }}>
          {t('Quantidade de extras')}
          <input
            type="number"
            min={0}
            step={1}
            value={extrasCount}
            onChange={event => setExtrasCount(Math.max(0, Math.floor(Number(event.target.value) || 0)))}
            style={{ width: 64, padding: 8, font: 'inherit', border: '1px solid var(--rule)', borderRadius: 4 }}
          />
        </label>
      </fieldset>
      <fieldset style={{ border: '1px solid var(--rule)', padding: 16, margin: '24px 0', borderRadius: 6 }}>
        <legend style={{ fontSize: 14 }}>{t("Personalizar o kit")}</legend>
        {t(([['none', 'Sem personalização'], ['custom', 'Nome ou logótipo (+€10)']] as const).map(([value, label]) => (
          <label key={value} style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '12px 0', fontSize: 13 }}>
            <input type="radio" name="nail-personalization" checked={personalization === value} onChange={() => setPersonalization(value)} style={{ accentColor: 'var(--terracotta)' }} />{t(label)}
          </label>
        )))}
        {t(personalization === 'custom' && <label style={{ display: 'block', fontSize: 13 }}>{t("Personalização desejada (opcional)")}<input value={customName} maxLength={60} onChange={e => setCustomName(e.target.value)} placeholder={t("Indique o nome ou escreva que pretende o logótipo")} style={{ display: 'block', width: '100%', padding: 10, marginTop: 8, boxSizing: 'border-box', fontFamily: 'inherit', border: '1px solid var(--rule)', borderRadius: 4 }} /></label>)}
        {t(personalization === 'custom' && <p style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{t("Ao finalizar no WhatsApp, confirme o nome ou envie a imagem do seu logótipo. O acréscimo é de €10.")}</p>)}
      </fieldset>
      <div aria-live="polite" style={{ background: 'var(--linen)', padding: 16, borderRadius: 6, marginBottom: 20, lineHeight: 1.8, fontSize: 14 }}>
        <strong>{t(selectedKit.name)}{t(" · ")}{t(size)}{t(" cm")}</strong>
        <div>{t("Kits: ")}{price !== regularPrice && regularPrice !== null && <s style={{ color: 'var(--ink-mute)', marginRight: 8 }}>{t(money(regularPrice))}</s>}{blackFridayPriceLabel(regularPrice ?? 0, price ?? 0)}{quantity > 1 && ` + ${money(secondUnitPrice ?? 0)} (${t('2.ª unidade')}${hasSecondUnitOffer ? ' · 10% OFF sobre a primeira' : ''})`}{quantity > 2 && ` + ${money((price ?? 0) * (quantity - 2))}`}</div>
        <div>{t("Extras: ")}{t(extrasCount)}{t(" brocas · ")}{t(money(extraCost))}</div>
        <div>{t("Personalização: ")}{t(money(personalizationCost))}</div>
        <div style={{ borderTop: '1px solid var(--rule)', marginTop: 10, paddingTop: 10, fontSize: 20 }}>{t("Total: ")}{t(money(total))}</div>
      </div>
      {!nailColor && <p style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{t('Escolha a cor da unha para continuar.')}</p>}
      {!bitColor && <p style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{t('Escolha a cor das brocas para continuar.')}</p>}
      {t(!bitsReady && <p style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{t("Selecione as ")}{t(includedCount)}{t(" brocas incluídas para continuar.")}</p>)}
      {extrasCount > 0 && !extraModels.trim() && <p style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{t('Escreva os modelos de brocas extras para continuar.')}</p>}
      <a href={ready ? contact : undefined} aria-disabled={!ready} onClick={e => { if (!ready) e.preventDefault() }} target="_blank" rel="noopener noreferrer" className="btn btn-solid" style={{ opacity: ready ? 1 : 0.5, cursor: ready ? 'pointer' : 'default' }}>{t("Finalizar no WhatsApp →")}</a>
    </div>
  )
}
