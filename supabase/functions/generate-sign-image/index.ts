import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function buildPrompt(p: {
  name: string; letraColorName: string; letraHex: string
  nomeColorName: string; nomeHex: string; mono: boolean; size: 15 | 23
}): string {
  const colorDesc = p.mono
    ? `The entire piece is printed in a single color: ${p.nomeColorName} (${p.nomeHex}).`
    : `Two-tone: the large initial letter is printed in ${p.letraColorName} (${p.letraHex}), and the name "${p.name}" written across it is printed in ${p.nomeColorName} (${p.nomeHex}).`

  return `Product photo of a handmade 3D-printed wall decoration: a large bold block letter "${p.name.charAt(0).toUpperCase()}" approximately ${p.size}cm tall, with the name "${p.name}" written in a smaller flowing cursive script overlaid across the lower portion of the letter. ${colorDesc} Matte filament texture. The entire piece must be fully centered and visible in frame — nothing cropped. Warm natural background. Soft window light, shallow depth of field, premium lifestyle photography.`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Verify authenticated user
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } }
    )
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const params = await req.json()

    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-2',
        prompt: buildPrompt(params),
        n: 1,
        size: '1024x1024',
        quality: 'medium',
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return new Response(JSON.stringify({ error: err?.error?.message ?? `HTTP ${res.status}` }), {
        status: res.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const data = await res.json()
    const item = data.data[0]
    const image = item.b64_json
      ? `data:image/png;base64,${item.b64_json}`
      : item.url

    return new Response(JSON.stringify({ image }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
