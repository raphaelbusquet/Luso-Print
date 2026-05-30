import { supabase } from './supabase'

type GenerateParams = {
  name: string
  letraColorName: string
  letraHex: string
  nomeColorName: string
  nomeHex: string
  mono: boolean
  size: 15 | 23
}

export async function generateSignImage(params: GenerateParams): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession()

  const res = await supabase.functions.invoke('generate-sign-image', {
    body: params,
    headers: session?.access_token
      ? { Authorization: `Bearer ${session.access_token}` }
      : {},
  })

  if (res.error) throw new Error(res.error.message)

  const { image, error } = res.data as { image?: string; error?: string }
  if (error) throw new Error(error)
  if (!image) throw new Error('No image in response')

  return image
}
