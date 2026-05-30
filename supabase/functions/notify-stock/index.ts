import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

Deno.serve(async (req) => {
  const payload = await req.json()
  const record = payload.record

  if (!record || record.available !== true) {
    return new Response('ok', { status: 200 })
  }

  const { material, color } = record as { material: string; color: string }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  const { data: notifications } = await supabase
    .from('stock_notifications')
    .select('*')
    .eq('material', material)
    .eq('color', color)

  if (!notifications || notifications.length === 0) {
    return new Response('ok', { status: 200 })
  }

  // Deduplicate por email + produto
  const seen = new Set<string>()
  const toSend = notifications.filter((n: { email: string; product_id: string }) => {
    const key = `${n.email}:${n.product_id}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  const colorLabel = color.charAt(0).toUpperCase() + color.slice(1)

  for (const n of toSend) {
    const productName = n.product_name ?? 'Produto'

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Lusoprint <noreply@lusoprint.com>',
        reply_to: 'geral@lusoprint.com',
        to: [n.email],
        subject: `${productName} voltou ao stock`,
        text: `Olá,\n\n${productName} na cor ${colorLabel} que pediu para ser notificado voltou ao stock na Lusoprint.\n\nVer produto: https://lusoprint.com/loja?produto=${n.product_id}\n\n—\nLusoprint · Portugal\nhttps://lusoprint.com`,
        html: `
          <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:48px 24px;color:#2b2722">
            <div style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#a09488;margin-bottom:32px">Lusoprint</div>
            <h2 style="font-weight:400;font-size:26px;margin:0 0 12px">Boa notícia!</h2>
            <p style="color:#6b6059;font-size:14px;line-height:1.7;margin:0 0 28px">
              <strong style="color:#2b2722">${productName}</strong> na cor
              <strong style="color:#2b2722">${colorLabel}</strong>
              que pediu para ser notificado voltou ao stock.
            </p>
            <a href="https://lusoprint.com/loja?produto=${n.product_id}"
              style="display:inline-block;padding:13px 28px;background:#2b2722;color:#fff;text-decoration:none;border-radius:999px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase">
              Ver produto
            </a>
            <hr style="border:none;border-top:1px solid #e8e0d8;margin:40px 0 20px">
            <p style="font-size:11px;color:#c4b8ae;margin:0">Lusoprint · Portugal · <a href="https://lusoprint.com" style="color:#c4b8ae">lusoprint.com</a></p>
          </div>
        `,
        headers: {
          'List-Unsubscribe': '<mailto:geral@lusoprint.com?subject=unsubscribe>',
        },
      }),
    })
  }

  // Apagar notificações enviadas
  await supabase
    .from('stock_notifications')
    .delete()
    .eq('material', material)
    .eq('color', color)

  return new Response(JSON.stringify({ sent: toSend.length }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
})
