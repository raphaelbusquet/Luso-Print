import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function randomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function randomCoupon() {
  return 'LUSO' + Math.random().toString(36).substring(2, 7).toUpperCase()
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {

  let action: string, email: string, code: string | undefined
  try {
    const body = await req.json()
    action = body.action
    email = body.email
    code = body.code
  } catch {
    return new Response('invalid JSON', { status: 400, headers: CORS })
  }

  if (!action || !email) {
    return new Response('missing fields', { status: 400, headers: CORS })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

  // ── SEND: gera e envia código de verificação ──────────────────────────────
  if (action === 'send') {
    // Only block if already has a coupon (newsletter + coupon = fully subscribed)
    const { data: existingCoupon } = await supabase
      .from('coupons')
      .select('code')
      .eq('email', email)
      .single()

    if (existingCoupon) {
      return new Response(JSON.stringify({ status: 'already_subscribed' }), {
        headers: { ...CORS, 'Content-Type': 'application/json' }, status: 200,
      })
    }

    const verificationCode = randomCode()

    // Upsert verification record (expires in 15 min)
    await supabase.from('newsletter_verifications').upsert({
      email,
      code: verificationCode,
      expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    })

    // Send verification email
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Lusoprint <noreply@lusoprint.com>',
        reply_to: 'geral@lusoprint.com',
        to: [email],
        subject: 'O seu código de verificação — Lusoprint',
        text: `O seu código de verificação é: ${verificationCode}\n\nVálido por 15 minutos.\n\n—\nLusoprint`,
        html: `
          <div style="font-family:Georgia,serif;max-width:420px;margin:0 auto;padding:48px 24px;color:#2b2722">
            <div style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#a09488;margin-bottom:32px">Lusoprint</div>
            <h2 style="font-weight:400;font-size:22px;margin:0 0 12px">Confirme o seu email</h2>
            <p style="color:#6b6059;font-size:14px;line-height:1.7;margin:0 0 24px">
              Introduza este código no site para receber o seu cupão de 10% OFF:
            </p>
            <div style="background:#f8f5f1;border-radius:8px;padding:20px 24px;margin-bottom:24px;text-align:center">
              <div style="font-family:Georgia,serif;font-size:36px;letter-spacing:0.24em;color:#2b2722;font-weight:400">${verificationCode}</div>
              <div style="font-size:11px;color:#a09488;letter-spacing:0.14em;text-transform:uppercase;margin-top:6px">válido 15 minutos</div>
            </div>
            <hr style="border:none;border-top:1px solid #e8e0d8;margin:32px 0 16px">
            <p style="font-size:11px;color:#c4b8ae;margin:0">Lusoprint · Portugal · <a href="https://lusoprint.com" style="color:#c4b8ae">lusoprint.com</a></p>
          </div>
        `,
      }),
    })

    return new Response(JSON.stringify({ status: 'sent' }), {
      headers: { ...CORS, 'Content-Type': 'application/json' }, status: 200,
    })
  }

  // ── VERIFY: valida código e cria cupão ────────────────────────────────────
  if (action === 'verify') {
    if (!code) return new Response('missing code', { status: 400, headers: CORS })

    const { data: record } = await supabase
      .from('newsletter_verifications')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (!record) {
      return new Response(JSON.stringify({ status: 'invalid_code' }), {
        headers: { ...CORS, 'Content-Type': 'application/json' }, status: 200,
      })
    }

    // Delete verification record
    await supabase.from('newsletter_verifications').delete().eq('email', email)

    // Subscribe to newsletter (ignore duplicate)
    await supabase.from('newsletter').insert({ email })

    // Generate coupon (or fetch existing)
    let coupon = randomCoupon()
    const { error: cpError } = await supabase.from('coupons').insert({ code: coupon, email })
    if (cpError?.code === '23505') {
      const { data: existing } = await supabase.from('coupons').select('code').eq('email', email).single()
      if (existing) coupon = existing.code
    }

    // Send coupon email
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Lusoprint <noreply@lusoprint.com>',
        reply_to: 'geral@lusoprint.com',
        to: [email],
        subject: 'O seu cupão de 10% OFF — Lusoprint',
        text: `Bem-vinda à família!\n\nO seu cupão: ${coupon}\n\nAplique no carrinho.\n\nhttps://lusoprint.com/loja\n\n—\nLusoprint`,
        html: `
          <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:48px 24px;color:#2b2722">
            <div style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#a09488;margin-bottom:32px">Lusoprint</div>
            <h2 style="font-weight:400;font-size:26px;margin:0 0 12px">Bem-vinda à família.</h2>
            <p style="color:#6b6059;font-size:14px;line-height:1.7;margin:0 0 24px">
              O seu cupão de <strong style="color:#2b2722">10% OFF</strong>:
            </p>
            <div style="background:#f8f5f1;border-radius:8px;padding:20px 24px;margin-bottom:28px;text-align:center">
              <div style="font-family:Georgia,serif;font-size:28px;letter-spacing:0.18em;color:#2b2722">${coupon}</div>
              <div style="font-size:11px;color:#a09488;letter-spacing:0.14em;text-transform:uppercase;margin-top:6px">Aplique no carrinho antes de finalizar</div>
            </div>
            <a href="https://lusoprint.com/loja" style="display:inline-block;padding:13px 28px;background:#2b2722;color:#fff;text-decoration:none;border-radius:999px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase">Ver loja</a>
            <hr style="border:none;border-top:1px solid #e8e0d8;margin:40px 0 20px">
            <p style="font-size:11px;color:#c4b8ae;margin:0">Lusoprint · Portugal · <a href="https://lusoprint.com" style="color:#c4b8ae">lusoprint.com</a></p>
          </div>
        `,
        headers: { 'List-Unsubscribe': '<mailto:geral@lusoprint.com?subject=unsubscribe>' },
      }),
    })

    return new Response(JSON.stringify({ status: 'verified', coupon }), {
      headers: { ...CORS, 'Content-Type': 'application/json' }, status: 200,
    })
  }

  return new Response('unknown action', { status: 400, headers: CORS })

  } catch (err) {
    console.error('verify-newsletter error:', err)
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
})
