import type { ShopProduct } from './shop'

export const MUNDIAL_PRODUCTS: ShopProduct[] = [
  { id: 'porta-lata',   name: 'Porta Lata Seleção',   universoId: 'mundial', price: 18, img: '/assets/products/mundial/porta-lata-1.png',   tag: 'EDIÇÃO LIMITADA', color: 'Vermelho', dominantColors: ['vermelho', 'verde'] },
  { id: 'porta-cromos', name: 'Porta Cromos Seleção',  universoId: 'mundial', price: 16, img: '/assets/products/mundial/porta-cromos-1.png', tag: 'EDIÇÃO LIMITADA', color: 'Verde',    dominantColors: ['verde', 'vermelho'] },
  { id: 'chaveiro',     name: 'Chaveiro FIFA 26',      universoId: 'mundial', price: 8,  img: '/assets/products/mundial/chaveiro-1.png',     tag: 'EDIÇÃO LIMITADA', color: 'Negro',    dominantColors: ['preto', 'vermelho'] },
  { id: 'petisqueira',  name: 'Petisqueira Seleção',   universoId: 'mundial', price: 16, img: '/assets/products/mundial/petisqueira-1.png',  tag: 'EDIÇÃO LIMITADA', color: 'Verde',    dominantColors: ['verde', 'vermelho'] },
]
