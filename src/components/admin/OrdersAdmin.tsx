import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

type OrderItem = { name: string; qty: number; price: number }

type Order = {
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  items: OrderItem[]
  total: number
  notes?: string
  status: string
  created_at: string
}

const STEPS = [
  { id: 'received',  label: 'Pedido Recebido' },
  { id: 'processed', label: 'Pedido Processado' },
  { id: 'preparing', label: 'Em Preparação' },
  { id: 'shipped',   label: 'Enviado' },
  { id: 'delivered', label: 'Entregue' },
]

const stepIndex = (status: string) => STEPS.findIndex(s => s.id === status)

function genOrderNumber() {
  const d = new Date()
  const date = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`
  const rand = Math.random().toString(36).slice(2,6).toUpperCase()
  return `LP-${date}-${rand}`
}

/* ─── Timeline ─── */
function Timeline({ status, onAdvance }: { status: string; onAdvance: (s: string) => void }) {
  const current = stepIndex(status)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, overflowX: 'auto', padding: '8px 0 16px' }}>
      {STEPS.map((step, i) => {
        const done = i <= current
        const isActive = i === current
        const canClick = i !== current

        return (
          <div key={step.id} style={{ display: 'flex', alignItems: 'flex-start', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            {/* Node + label */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 80 }}>
              <button
                onClick={() => canClick && onAdvance(step.id)}
                title={canClick ? (i < current ? `Voltar para "${step.label}"` : `Avançar para "${step.label}"`) : step.label}
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: done ? (isActive ? 'var(--terracotta)' : 'var(--ink)') : 'var(--linen)',
                  outline: isActive ? '3px solid rgba(201,130,110,0.3)' : 'none',
                  outlineOffset: 2,
                  border: done ? 'none' : '2px solid var(--rule)',
                  cursor: canClick ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 200ms',
                  flexShrink: 0,
                }}
              >
                {done
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  : <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--rule)' }} />
                }
              </button>
              <span style={{
                fontSize: 10, letterSpacing: '0.08em', textAlign: 'center',
                color: done ? 'var(--ink)' : 'var(--ink-mute)',
                fontWeight: isActive ? 600 : 400,
                lineHeight: 1.3, maxWidth: 76,
              }}>
                {step.label}
              </span>
            </div>
            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div style={{
                flex: 1, height: 2, marginTop: 17,
                background: i < current ? 'var(--ink)' : 'var(--rule)',
                transition: 'background 300ms',
                minWidth: 24,
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ─── Add Order Modal ─── */
function AddOrderModal({ onClose, onCreated }: { onClose: () => void; onCreated: (o: Order) => void }) {
  const [form, setForm] = useState({
    customer_name: '', customer_email: '', customer_phone: '', notes: '',
  })
  const [items, setItems] = useState<OrderItem[]>([{ name: '', qty: 1, price: 0 }])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const total = items.reduce((s, i) => s + i.qty * i.price, 0)

  const setItem = (idx: number, field: keyof OrderItem, val: string | number) =>
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: val } : it))

  const addItem = () => setItems(prev => [...prev, { name: '', qty: 1, price: 0 }])
  const removeItem = (idx: number) => setItems(prev => prev.filter((_, i) => i !== idx))

  const handleSubmit = async () => {
    if (!form.customer_name.trim() || !form.customer_email.trim()) {
      setError('Nome e email são obrigatórios.')
      return
    }
    const validItems = items.filter(i => i.name.trim())
    if (validItems.length === 0) { setError('Adicione pelo menos um item.'); return }

    setSaving(true)
    const order_number = genOrderNumber()
    const { data, error: err } = await supabase.from('orders').insert({
      order_number,
      customer_name: form.customer_name.trim(),
      customer_email: form.customer_email.trim(),
      customer_phone: form.customer_phone.trim() || null,
      items: validItems,
      total,
      notes: form.notes.trim() || null,
      status: 'received',
    }).select().single()

    if (err) { setError(err.message); setSaving(false); return }
    onCreated(data)
    onClose()
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', border: '1px solid var(--rule)',
    borderRadius: 4, fontSize: 13, color: 'var(--ink)', background: 'var(--paper)',
    fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
  }

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(43,39,34,0.5)', backdropFilter: 'blur(4px)' }} />
      <div style={{
        position: 'fixed', zIndex: 401, top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 'min(600px, 96vw)', maxHeight: '90vh', overflowY: 'auto',
        background: 'var(--paper)', borderRadius: 8,
        boxShadow: '0 32px 80px -12px rgba(43,39,34,0.3)',
        padding: '32px 32px 28px',
      }}>
        <div className="serif" style={{ fontSize: 22, fontWeight: 400, marginBottom: 24 }}>Novo pedido</div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)', display: 'block', marginBottom: 6 }}>Nome *</label>
            <input style={inputStyle} value={form.customer_name} onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))} placeholder="Nome do cliente" />
          </div>
          <div>
            <label style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)', display: 'block', marginBottom: 6 }}>Email *</label>
            <input style={inputStyle} type="email" value={form.customer_email} onChange={e => setForm(f => ({ ...f, customer_email: e.target.value }))} placeholder="email@exemplo.com" />
          </div>
          <div>
            <label style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)', display: 'block', marginBottom: 6 }}>Telefone</label>
            <input style={inputStyle} value={form.customer_phone} onChange={e => setForm(f => ({ ...f, customer_phone: e.target.value }))} placeholder="+351 9xx xxx xxx" />
          </div>
        </div>

        {/* Items */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)', display: 'block', marginBottom: 8 }}>Itens</label>
          {items.map((item, idx) => (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 32px', gap: 8, marginBottom: 8, alignItems: 'center' }}>
              <input style={inputStyle} value={item.name} onChange={e => setItem(idx, 'name', e.target.value)} placeholder="Nome do produto" />
              <input style={{ ...inputStyle, textAlign: 'center' }} type="number" min={1} value={item.qty} onChange={e => setItem(idx, 'qty', parseInt(e.target.value) || 1)} />
              <input style={{ ...inputStyle, textAlign: 'right' }} type="number" min={0} step={0.01} value={item.price || ''} onChange={e => setItem(idx, 'price', parseFloat(e.target.value) || 0)} placeholder="€" />
              <button onClick={() => removeItem(idx)} style={{ width: 32, height: 32, border: '1px solid var(--rule)', borderRadius: 4, background: 'transparent', cursor: 'pointer', color: 'var(--ink-mute)', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
            </div>
          ))}
          <button onClick={addItem} style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-soft)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', fontFamily: 'inherit' }}>
            + Adicionar item
          </button>
        </div>

        {/* Total */}
        {total > 0 && (
          <div style={{ textAlign: 'right', fontFamily: 'var(--serif)', fontSize: 18, marginBottom: 12 }}>
            Total: €{total.toFixed(2)}
          </div>
        )}

        {/* Notes */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-mute)', display: 'block', marginBottom: 6 }}>Notas</label>
          <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 64 }} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Observações, cor escolhida, personalização…" />
        </div>

        {error && <div style={{ fontSize: 12, color: 'var(--terracotta)', marginBottom: 12 }}>{error}</div>}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '11px 24px', borderRadius: 999, border: '1px solid var(--rule)', background: 'transparent', cursor: 'pointer', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'inherit', color: 'var(--ink-soft)' }}>Cancelar</button>
          <button onClick={handleSubmit} disabled={saving} style={{ padding: '11px 28px', borderRadius: 999, border: 'none', background: 'var(--ink)', color: '#fff', cursor: 'pointer', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'inherit' }}>
            {saving ? 'A criar…' : 'Criar pedido'}
          </button>
        </div>
      </div>
    </>
  )
}

/* ─── Order Detail ─── */
function OrderDetail({ order, onBack, onUpdate }: { order: Order; onBack: () => void; onUpdate: (o: Order) => void }) {
  const [pendingStatus, setPendingStatus] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const displayStatus = pendingStatus ?? order.status
  const isDirty = pendingStatus !== null && pendingStatus !== order.status

  const handleSave = async () => {
    if (!pendingStatus) return
    setSaving(true)
    const { data } = await supabase.from('orders').update({ status: pendingStatus }).eq('id', order.id).select().single()
    if (data) onUpdate(data)
    setPendingStatus(null)
    setSaving(false)
  }

  return (
    <div>
      {/* Back */}
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-soft)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'inherit', marginBottom: 24, padding: 0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M19 12H5M5 12l7-7M5 12l7 7"/></svg>
        Todos os pedidos
      </button>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
        <div>
          <div className="serif" style={{ fontSize: 24, fontWeight: 400 }}>{order.customer_name}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 4 }}>#{order.order_number}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 22 }}>€{order.total.toFixed(2)}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 2 }}>
            {new Date(order.created_at).toLocaleDateString('pt-PT')}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ background: 'var(--paper)', borderRadius: 8, padding: '20px 24px', marginBottom: 20, boxShadow: '0 1px 4px rgba(43,39,34,0.06)' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 16 }}>Estado do pedido</div>
        <Timeline status={displayStatus} onAdvance={s => setPendingStatus(s)} />
      </div>

      {/* Customer info + Items */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ background: 'var(--paper)', borderRadius: 8, padding: '20px 24px', boxShadow: '0 1px 4px rgba(43,39,34,0.06)' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 14 }}>Cliente</div>
          {([
            ['Email', order.customer_email],
            order.customer_phone ? ['Telefone', order.customer_phone] : null,
            order.notes ? ['Notas', order.notes] : null,
          ].filter(Boolean) as string[][]).map(([label, val]) => (
            <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--rule)', fontSize: 12 }}>
              <span style={{ color: 'var(--ink-mute)' }}>{label}</span>
              <span style={{ color: 'var(--ink)', textAlign: 'right', maxWidth: '60%', wordBreak: 'break-word' }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--paper)', borderRadius: 8, padding: '20px 24px', boxShadow: '0 1px 4px rgba(43,39,34,0.06)' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 14 }}>Itens</div>
          {order.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--rule)', fontSize: 12 }}>
              <span style={{ color: 'var(--ink)' }}>{item.qty}× {item.name}</span>
              <span style={{ color: 'var(--ink-mute)' }}>€{(item.qty * item.price).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 0', fontSize: 13 }}>
            <span style={{ color: 'var(--ink-mute)' }}>Total</span>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 16 }}>€{order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleSave}
          disabled={!isDirty || saving}
          style={{
            padding: '13px 32px', borderRadius: 999, border: 'none',
            background: isDirty ? 'var(--ink)' : 'var(--rule)',
            color: isDirty ? '#fff' : 'var(--ink-mute)',
            cursor: isDirty ? 'pointer' : 'default',
            fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
            fontFamily: 'inherit', transition: 'all 200ms',
          }}
        >
          {saving ? 'A guardar…' : 'Guardar alterações'}
        </button>
      </div>
    </div>
  )
}

/* ─── Orders List ─── */
export function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Order | null>(null)
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => {
    supabase.from('orders').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setOrders(data)
      setLoading(false)
    })
  }, [])

  const filtered = orders.filter(o => {
    const q = search.toLowerCase()
    return !q || o.customer_name.toLowerCase().includes(q)
      || o.customer_email.toLowerCase().includes(q)
      || o.order_number.toLowerCase().includes(q)
      || (o.customer_phone ?? '').includes(q)
  })

  const statusLabel = (s: string) => STEPS.find(st => st.id === s)?.label ?? s

  const statusColor = (s: string) => {
    if (s === 'delivered') return 'rgba(60,160,80,0.12)'
    if (s === 'received') return 'rgba(43,39,34,0.06)'
    return 'rgba(201,130,110,0.10)'
  }
  const statusTextColor = (s: string) => {
    if (s === 'delivered') return 'rgb(50,140,70)'
    if (s === 'received') return 'var(--ink-mute)'
    return 'var(--terracotta)'
  }

  if (selected) {
    return (
      <OrderDetail
        order={selected}
        onBack={() => setSelected(null)}
        onUpdate={updated => {
          setSelected(updated)
          setOrders(prev => prev.map(o => o.id === updated.id ? updated : o))
        }}
      />
    )
  }

  return (
    <div>
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-mute)', pointerEvents: 'none' }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Pesquisar por nome, email, nº pedido ou telefone…"
            style={{
              width: '100%', padding: '11px 14px 11px 40px', border: '1px solid var(--rule)',
              borderRadius: 8, fontSize: 13, color: 'var(--ink)', background: 'var(--paper)',
              fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          onClick={() => setShowAdd(true)}
          style={{
            padding: '11px 24px', borderRadius: 8, border: 'none', background: 'var(--ink)', color: '#fff',
            cursor: 'pointer', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0,
          }}
        >
          + Novo pedido
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div style={{ color: 'var(--ink-mute)', fontSize: 13, padding: '40px 0' }}>A carregar…</div>
      ) : filtered.length === 0 ? (
        <div style={{ color: 'var(--ink-mute)', fontSize: 13, padding: '40px 0', textAlign: 'center' }}>
          {search ? 'Nenhum pedido encontrado.' : 'Nenhum pedido ainda.'}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(order => (
            <button
              key={order.id}
              onClick={() => setSelected(order)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 20px', background: 'var(--paper)', borderRadius: 8,
                border: '1px solid var(--rule)', cursor: 'pointer', textAlign: 'left',
                boxShadow: '0 1px 3px rgba(43,39,34,0.05)', transition: 'box-shadow 160ms',
                fontFamily: 'inherit', width: '100%',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(43,39,34,0.10)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 3px rgba(43,39,34,0.05)')}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 14, color: 'var(--ink)', fontWeight: 500 }}>{order.customer_name}</span>
                <span style={{ fontSize: 11, color: 'var(--ink-mute)' }}>#{order.order_number} · {order.customer_email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--ink)' }}>€{order.total.toFixed(2)}</span>
                <span style={{
                  fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
                  padding: '4px 10px', borderRadius: 999,
                  background: statusColor(order.status), color: statusTextColor(order.status),
                }}>
                  {statusLabel(order.status)}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink-mute)" strokeWidth="1.8"><path d="M9 18l6-6-6-6"/></svg>
              </div>
            </button>
          ))}
        </div>
      )}

      {showAdd && (
        <AddOrderModal
          onClose={() => setShowAdd(false)}
          onCreated={order => setOrders(prev => [order, ...prev])}
        />
      )}
    </div>
  )
}
