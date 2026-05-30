import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Row = { material: string; color: string; available: boolean }

type MaterialsCtx = {
  isColorAvailable: (color: string, materials: string[]) => boolean
  setAvailable: (material: string, color: string, available: boolean) => Promise<void>
  rows: Row[]
  loading: boolean
}

const Ctx = createContext<MaterialsCtx>({
  isColorAvailable: () => true,
  setAvailable: async () => {},
  rows: [],
  loading: true,
})

export function useMaterials() { return useContext(Ctx) }

export function MaterialsProvider({ children }: { children: React.ReactNode }) {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('material_colors').select('*').then(({ data }) => {
      if (data) setRows(data)
      setLoading(false)
    })

    const channel = supabase
      .channel('material_colors_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'material_colors' }, payload => {
        if (payload.eventType === 'UPDATE') {
          const r = payload.new as Row
          setRows(prev => prev.map(row =>
            row.material === r.material && row.color === r.color ? r : row
          ))
        }
        if (payload.eventType === 'INSERT') {
          setRows(prev => [...prev, payload.new as Row])
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const map: Record<string, Record<string, boolean>> = {}
  for (const r of rows) {
    if (!map[r.material]) map[r.material] = {}
    map[r.material][r.color] = r.available
  }

  function isColorAvailable(color: string, materials: string[]): boolean {
    if (loading || rows.length === 0) return true
    return materials.some(mat => map[mat]?.[color] !== false)
  }

  async function setAvailable(material: string, color: string, available: boolean) {
    await supabase.from('material_colors').upsert({ material, color, available })
    setRows(prev => {
      const exists = prev.find(r => r.material === material && r.color === color)
      if (exists) return prev.map(r => r.material === material && r.color === color ? { ...r, available } : r)
      return [...prev, { material, color, available }]
    })
  }

  return <Ctx.Provider value={{ isColorAvailable, setAvailable, rows, loading }}>{children}</Ctx.Provider>
}
