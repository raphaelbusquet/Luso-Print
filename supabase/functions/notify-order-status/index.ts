import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const STEPS: Record<string, { label: string; message: string }> = {
  received:  { label: 'Pedido Recebido',   message: 'Recebemos o seu pedido! Iremos tratá-lo em breve.' },
  processed: { label: 'Pedido Processado', message: 'O seu pedido foi processado e está a ser tratado.' },
  preparing: { label: 'Em Preparação',     message: 'O seu pedido está a ser preparado com cuidado.' },
  shipped:   { label: 'Enviado',           message: 'O seu pedido foi enviado! Chegará em breve.' },
  delivered: { label: 'Entregue',          message: 'O seu pedido foi entregue. Obrigado por escolher a Lusoprint!' },
}

Deno.serve(async (req) => {
  const payload = await req.json()
  const record = payload.record
  const oldRecord = payload.old_record

  if (!record || record.status === oldRecord?.status) {
    return new Response('ok', { status: 200 })
  }

  const step = STEPS[record.status]
  if (!step) return new Response('unknown status', { status: 200 })

  const allSteps = Object.entries(STEPS)
  const currentIdx = allSteps.findIndex(([k]) => k === record.status)

  // Row 1: circles + connector lines
  const circleRow = allSteps.map(([_key, _s], i) => {
    const done = i <= currentIdx
    const isActive = i === currentIdx
    const bg = done ? (isActive ? '#c9826e' : '#9e8a7a') : '#c8bdb6'
    const lineColor = i < currentIdx ? '#9e8a7a' : '#c8bdb6'
    const inner = done
      ? `<span style="font-family:Arial,sans-serif;font-size:14px;color:#fff;font-weight:bold">&#10003;</span>`
      : `<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#a09488"></span>`
    const circle = `<td align="center" valign="middle" style="padding:0;width:40px">
      <table cellpadding="0" cellspacing="0" style="margin:0 auto"><tr>
        <td align="center" valign="middle" style="width:32px;height:32px;border-radius:50%;background:${bg};text-align:center;line-height:32px">${inner}</td>
      </tr></table>
    </td>`
    const line = i < allSteps.length - 1
      ? `<td valign="middle" style="padding:0"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="height:2px;background:${lineColor};font-size:0;line-height:0">&nbsp;</td></tr></table></td>`
      : ''
    return circle + line
  }).join('')

  // Row 2: labels
  const labelRow = allSteps.map(([_key, s], i) => {
    const done = i <= currentIdx
    const isActive = i === currentIdx
    const label = `<td align="center" style="padding:6px 2px 0;font-size:9px;color:${isActive ? '#c9826e' : done ? '#9e8a7a' : '#a09488'};font-weight:${isActive ? 'bold' : 'normal'};line-height:1.3;font-family:Arial,sans-serif">${s.label}</td>`
    const spacer = i < allSteps.length - 1 ? `<td></td>` : ''
    return label + spacer
  }).join('')

  const timelineHtml = `<tr>${circleRow}</tr><tr>${labelRow}</tr>`

  const html = `
    <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;padding:48px 24px;color:#2b2722">
      <div style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#a09488;margin-bottom:32px">Lusoprint</div>
      <h2 style="font-weight:400;font-size:24px;margin:0 0 8px">${step.label}</h2>
      <p style="color:#6b6059;font-size:14px;line-height:1.7;margin:0 0 28px">${step.message}</p>

      <div style="background:#f8f5f1;border-radius:8px;padding:20px 16px;margin-bottom:28px;overflow:hidden">
        <table style="width:100%;border-collapse:collapse;position:relative"><tr>${timelineHtml}</tr></table>
      </div>

      <div style="background:#f8f5f1;border-radius:8px;padding:16px 20px;margin-bottom:28px;font-size:12px">
        <div style="color:#a09488;letter-spacing:0.14em;text-transform:uppercase;font-size:10px;margin-bottom:10px">Detalhes do pedido</div>
        <div style="display:flex;justify-content:space-between;margin-bottom:6px">
          <span style="color:#6b6059">Nº Pedido</span><span style="color:#2b2722">#${record.order_number}</span>
        </div>
        <div style="display:flex;justify-content:space-between">
          <span style="color:#6b6059">Total</span><span style="color:#2b2722;font-family:Georgia,serif;font-size:14px">€${parseFloat(record.total).toFixed(2)}</span>
        </div>
      </div>

      <a href="https://lusoprint.com" style="display:inline-block;padding:13px 28px;background:#2b2722;color:#fff;text-decoration:none;border-radius:999px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase">
        Ver loja
      </a>
      <hr style="border:none;border-top:1px solid #e8e0d8;margin:40px 0 20px">
      <p style="font-size:11px;color:#c4b8ae;margin:0">Lusoprint · Portugal · <a href="https://lusoprint.com" style="color:#c4b8ae">lusoprint.com</a></p>
    </div>
  `

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Lusoprint <noreply@lusoprint.com>',
      reply_to: 'geral@lusoprint.com',
      to: [record.customer_email],
      subject: `${step.label} — Pedido #${record.order_number}`,
      text: `${step.label}\n\n${step.message}\n\nNº Pedido: #${record.order_number}\nTotal: €${parseFloat(record.total).toFixed(2)}\n\n—\nLusoprint · https://lusoprint.com`,
      html,
      headers: { 'List-Unsubscribe': '<mailto:geral@lusoprint.com?subject=unsubscribe>' },
    }),
  })

  return new Response(JSON.stringify({ sent: true, status: record.status }), {
    headers: { 'Content-Type': 'application/json' }, status: 200,
  })
})
