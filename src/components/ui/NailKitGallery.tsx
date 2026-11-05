import { useState } from 'react'

const PHOTOS = [
  { src: '/assets/empresas/kit-nail-novo-conjunto.png', alt: 'Conjunto didático Kit Nail Instrutor com dedo 3D, unhas, brocas e lixas' },
  { src: '/assets/empresas/kit-nail-novo-unhas.png', alt: 'Detalhe do dedo didático e dos diferentes formatos de unhas' },
  { src: '/assets/empresas/kit-nail-novo-tamanhos.png', alt: 'Comparação dos dedos didáticos de 15 cm e 20 cm' },
  { src: '/assets/empresas/kit-nail-novo-brocas.png', alt: 'Modelos ampliados de brocas didáticas demonstrativas' },
  { src: '/assets/empresas/kit-nail-modelos-brocas.png', alt: 'Guia dos dez modelos de brocas e respetivas funções' },
]

export function NailKitGallery() {
  const [active, setActive] = useState(0)
  return (
    <figure style={{ margin: 0 }}>
      <a href={PHOTOS[active].src} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar: ${PHOTOS[active].alt}`}>
        <img src={PHOTOS[active].src} alt={PHOTOS[active].alt} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'contain', display: 'block', borderRadius: 8 }} />
      </a>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 8, marginTop: 12 }}>
        {PHOTOS.map((photo, i) => (
          <button key={photo.src} type="button" onClick={() => setActive(i)} aria-label={`Ver imagem ${i + 1}: ${photo.alt}`} aria-pressed={active === i} style={{ minWidth: 0, padding: 3, background: 'transparent', cursor: 'pointer', border: `1px solid ${active === i ? 'var(--terracotta)' : 'var(--rule)'}`, borderRadius: 4 }}>
            <img src={photo.src} alt="" style={{ display: 'block', width: '100%', aspectRatio: '1/1', objectFit: 'contain' }} />
          </button>
        ))}
      </div>
      <figcaption style={{ fontSize: 12, color: 'var(--ink-soft)', lineHeight: 1.6, marginTop: 12 }}>Clique na imagem para ampliar. As fotografias ilustram as peças didáticas; os componentes incluídos dependem do kit selecionado. Consulte também o guia dos 10 modelos de brocas na última imagem.</figcaption>
    </figure>
  )
}
