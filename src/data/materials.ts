export const MATERIALS = [
  'PLA Basic',
  'PLA Mate',
  'PLA Silk',
  'PLA Translucent',
  'PETG HF',
  'PETG Basic',
  'PETG Translucent',
] as const

export type Material = typeof MATERIALS[number]

export type ColorOption = {
  color: string
  materials: string[]
}
