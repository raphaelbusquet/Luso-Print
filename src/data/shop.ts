export type ShopProduct = {
  id: string
  name: string
  universoId: string
  price: number
  img: string
  imgs?: string[]
  tag?: string
  color: string
}

function fill4(imgs: string[]): string[] {
  const r = [...imgs]
  while (r.length < 4) r.push(imgs[r.length % imgs.length])
  return r.slice(0, 4)
}

export const COLOR_OPTIONS: { name: string; hex: string }[] = [
  { name: 'Terracota',  hex: '#C9826E' },
  { name: 'Azul-cinza', hex: '#A8B4B3' },
  { name: 'Creme',      hex: '#D9CEBC' },
  { name: 'Olive',      hex: '#8D9274' },
  { name: 'Sage',       hex: '#BEC1AE' },
  { name: 'Branco',     hex: '#F2F0EC' },
  { name: 'Natural',    hex: '#C8B89A' },
]

// helper: build imgs array from numbered files
const ap = '/assets/products'
function i4(base: string, n: number, ext = 'png'): string[] {
  return fill4(Array.from({ length: n }, (_, i) => `${ap}/${base}-${i + 1}.${ext}`))
}

// ─── Bebés ────────────────────────────────────────────────────────────────────
const BEBES_PRODUCTS: ShopProduct[] = [
  { id: 'bebes-heitor-dino',        name: 'Letreiro Heitor Dino',    universoId: 'bebes', price: 36, img: `${ap}/bebe-crianca/letreiro-heitor-dino-1.png`,    imgs: i4('bebe-crianca/letreiro-heitor-dino', 4),    tag: 'PERSONALIZÁVEL', color: 'Natural' },
  { id: 'bebes-cecilia',            name: 'Letreiro Cecília',        universoId: 'bebes', price: 44, img: `${ap}/bebe-crianca/letreiro-cecilia-1.png`,         imgs: i4('bebe-crianca/letreiro-cecilia', 4),         tag: 'PERSONALIZÁVEL', color: 'Creme' },
  { id: 'bebes-arco-iris',          name: 'Letreiro Arco-íris',      universoId: 'bebes', price: 42, img: `${ap}/bebe-crianca/letreiro-arco-iris-1.png`,       imgs: i4('bebe-crianca/letreiro-arco-iris', 4),       tag: 'PERSONALIZÁVEL', color: 'Sage' },
  { id: 'bebes-escrita-sophia',     name: 'Escrita Sophia',          universoId: 'bebes', price: 32, img: `${ap}/bebe-crianca/escrita-sophia-1.png`,           imgs: i4('bebe-crianca/escrita-sophia', 4),           tag: 'PERSONALIZÁVEL', color: 'Terracota' },
  { id: 'bebes-porta-maternidade',  name: 'Porta Maternidade Boho',  universoId: 'bebes', price: 44, img: `${ap}/bebe-crianca/porta-maternidade-boho-1.png`,   imgs: i4('bebe-crianca/porta-maternidade-boho', 4),   tag: 'NOVO',           color: 'Azul-cinza' },
]

// ─── Crianças ─────────────────────────────────────────────────────────────────
const CRIANCAS_PRODUCTS: ShopProduct[] = [
  { id: 'criancas-quadro-dino',            name: 'Quadro Dino',            universoId: 'bebes', price: 54, img: `${ap}/bebe-crianca/quadro-dino-1.png`,               imgs: i4('bebe-crianca/quadro-dino', 3),               color: 'Natural' },
  { id: 'criancas-quadro-fazendinha',      name: 'Quadro Fazendinha',      universoId: 'bebes', price: 64, img: `${ap}/bebe-crianca/quadro-fazendinha-1.png`,          imgs: i4('bebe-crianca/quadro-fazendinha', 2),          color: 'Creme' },
  { id: 'criancas-kit-flores-cute',        name: 'Kit Flores Cute',        universoId: 'bebes', price: 54, img: `${ap}/bebe-crianca/kit-flores-cute-1.png`,            imgs: i4('bebe-crianca/kit-flores-cute', 4),            color: 'Sage' },
  { id: 'criancas-quadro-flores-vintage',  name: 'Quadro Flores Vintage',  universoId: 'bebes', price: 32, img: `${ap}/bebe-crianca/quadro-flores-vintage-1.jpg`,      imgs: fill4([`${ap}/bebe-crianca/quadro-flores-vintage-1.jpg`, `${ap}/bebe-crianca/quadro-flores-vintage-2.png`, `${ap}/bebe-crianca/quadro-flores-vintage-3.png`, `${ap}/bebe-crianca/quadro-flores-vintage-4.png`]), tag: 'NOVO', color: 'Terracota' },
  { id: 'criancas-cortador-patrulha',      name: 'Cortador Patrulha Pata', universoId: 'bebes', price: 14, img: `${ap}/bebe-crianca/cortador-patrulha-1.png`,          imgs: i4('bebe-crianca/cortador-patrulha', 3),          color: 'Azul-cinza' },
]

// ─── Cozinha ──────────────────────────────────────────────────────────────────
const COZINHA_PRODUCTS: ShopProduct[] = [
  { id: 'cozinha-apoio-talheres',    name: 'Apoio Talheres',    universoId: 'cozinha', price: 9,  img: `${ap}/cozinha-real/apoio-talheres-1.png`,    imgs: i4('cozinha-real/apoio-talheres', 3),    color: 'Natural' },
  { id: 'cozinha-boleira-geometrica',name: 'Boleira Geométrica',universoId: 'cozinha', price: 27, img: `${ap}/cozinha-real/boleira-geometrica-1.png`, imgs: i4('cozinha-real/boleira-geometrica', 4), tag: 'NOVO', color: 'Creme' },
  { id: 'cozinha-boleira-torre',     name: 'Boleira Torre',     universoId: 'cozinha', price: 27, img: `${ap}/cozinha-real/boleira-torre-1.png`,      imgs: i4('cozinha-real/boleira-torre', 4),      color: 'Sage' },
  { id: 'cozinha-mini-adega',        name: 'Mini Adega',        universoId: 'cozinha', price: 49, img: `${ap}/cozinha-real/mini-adega-1.png`,         imgs: i4('cozinha-real/mini-adega', 3),         tag: 'EDIÇÃO LIMITADA', color: 'Terracota' },
  { id: 'cozinha-porta-capsulas',    name: 'Porta Cápsulas',    universoId: 'cozinha', price: 19, img: `${ap}/cozinha-real/porta-capsulas-1.png`,     imgs: i4('cozinha-real/porta-capsulas', 4),     color: 'Azul-cinza' },
  { id: 'cozinha-porta-talheres',    name: 'Porta Talheres',    universoId: 'cozinha', price: 32, img: `${ap}/cozinha-real/porta-talheres-1.png`,     imgs: i4('cozinha-real/porta-talheres', 3),     color: 'Olive' },
  { id: 'cozinha-suporte-tabua',     name: 'Suporte Tábua',     universoId: 'cozinha', price: 24, img: `${ap}/cozinha-real/suporte-tabua-1.png`,      imgs: i4('cozinha-real/suporte-tabua', 4),      color: 'Natural' },
  { id: 'cozinha-suporte-vinho',     name: 'Suporte Vinho',     universoId: 'cozinha', price: 14, img: `${ap}/cozinha-real/suporte-vinho-1.png`,      imgs: i4('cozinha-real/suporte-vinho', 4),      color: 'Creme' },
]

// ─── Família (estatuas) ───────────────────────────────────────────────────────
const FAMILIA_PRODUCTS: ShopProduct[] = [
  { id: 'familia-estatua-familia', name: 'Estátua Toda Família', universoId: 'mamaes', price: 26, img: `${ap}/familia/estatua-familia-1.png`, imgs: i4('familia/estatua-familia', 4), color: 'Natural', tag: 'PERSONALIZÁVEL' },
  { id: 'familia-estatua-fams2',   name: 'Estátua Família S2', universoId: 'mamaes', price: 32, img: `${ap}/familia/estatua-fams2-1.png`,   imgs: i4('familia/estatua-fams2', 4),   color: 'Creme',   tag: 'PERSONALIZÁVEL' },
]

const DECO_PRODUCTS: ShopProduct[] = [
  { id: 'deco-candeeiro-fluxo',   name: 'Candeeiro Fluxo',           universoId: 'deco', price: 35, img: `${ap}/deco/candeeiro-fluxo-1.png`,   imgs: i4('deco/candeeiro-fluxo', 4),   tag: 'NOVO',           color: 'Olive' },
  { id: 'deco-mini-adega-vertice',name: 'Mini Adega Vértice',         universoId: 'deco', price: 58, img: `${ap}/deco/mini-adega-vertice-1.png`, imgs: i4('deco/mini-adega-vertice', 4), tag: 'EDIÇÃO LIMITADA', color: 'Terracota' },
  { id: 'deco-peca-horizonte',    name: 'Peça Decorativa Horizonte',  universoId: 'deco', price: 32, img: `${ap}/deco/peca-horizonte-1.png`,     imgs: i4('deco/peca-horizonte', 4),     color: 'Azul-cinza' },
]

// ─── Sala ─────────────────────────────────────────────────────────────────────
const SALA_PRODUCTS: ShopProduct[] = [
  { id: 'sala-bandeja-trevo',       name: 'Bandeja Trevo',              universoId: 'sala', price: 18, img: `${ap}/sala/bandeja-trevo-1.png`,       imgs: i4('sala/bandeja-trevo', 4),       color: 'Natural' },
  { id: 'sala-conjunto-arco',       name: 'Conjunto Arco',              universoId: 'sala', price: 59, img: `${ap}/sala/conjunto-arco-1.png`,        imgs: i4('sala/conjunto-arco', 4),       tag: 'NOVO',           color: 'Creme' },
  { id: 'sala-conjunto-linea',      name: 'Conjunto Linea',             universoId: 'sala', price: 32, img: `${ap}/sala/conjunto-linea-1.png`,       imgs: i4('sala/conjunto-linea', 4),      color: 'Sage' },
  { id: 'sala-porta-chaves-aurora', name: 'Porta-chaves Aurora',        universoId: 'sala', price: 28, img: `${ap}/sala/porta-chaves-aurora-1.png`,  imgs: i4('sala/porta-chaves-aurora', 4), color: 'Olive' },
  { id: 'sala-trio-serena',         name: 'Trio Serena',                universoId: 'sala', price: 23, img: `${ap}/sala/trio-serena-1.png`,          imgs: i4('sala/trio-serena', 4),         tag: 'EDIÇÃO LIMITADA', color: 'Terracota' },
  { id: 'sala-vaso-onda',           name: 'Vaso Onda',                  universoId: 'sala', price: 22, img: `${ap}/sala/vaso-onda-1.png`,            imgs: i4('sala/vaso-onda', 4),           color: 'Azul-cinza' },
  { id: 'sala-vaso-portal',         name: 'Vaso Portal',                universoId: 'sala', price: 38, img: `${ap}/sala/vaso-portal-1.png`,          imgs: i4('sala/vaso-portal', 4),         color: 'Natural' },
]

// ─── Escritório ───────────────────────────────────────────────────────────────
const ESCRIT_PRODUCTS: ShopProduct[] = [
  { id: 'escrit-stand-headphone',   name: 'Stand Headphone',          universoId: 'escrit', price: 32, img: `${ap}/escrit/stand-headphone-1.png`,    imgs: i4('escrit/stand-headphone', 4),    tag: 'NOVO', color: 'Natural' },
  { id: 'escrit-suporte-ipad-tab',  name: 'Suporte iPad & Tablet',    universoId: 'escrit', price: 15, img: `${ap}/escrit/suporte-ipad-tablet-1.png`, imgs: i4('escrit/suporte-ipad-tablet', 4), color: 'Creme' },
  { id: 'escrit-porta-can-agenda',  name: 'Porta-canetas & Agenda',   universoId: 'escrit', price: 21, img: `${ap}/escrit/porta-canetas-agenda-1.png`, imgs: i4('escrit/porta-canetas-agenda', 3), color: 'Sage' },
  { id: 'escrit-porta-can-no',      name: 'Porta-canetas Nó',         universoId: 'escrit', price: 13, img: `${ap}/escrit/porta-canetas-no-1.png`,    imgs: i4('escrit/porta-canetas-no', 4),   color: 'Olive' },
  { id: 'escrit-porta-treco-basic', name: 'Porta-treco Basic',        universoId: 'escrit', price: 13, img: `${ap}/escrit/porta-treco-basic-1.png`,   imgs: i4('escrit/porta-treco-basic', 3),  color: 'Terracota' },
  { id: 'escrit-suporte-ipad',      name: 'Suporte iPad',             universoId: 'escrit', price: 19, img: `${ap}/escrit/suporte-ipad-1.png`,        imgs: i4('escrit/suporte-ipad', 4),       color: 'Azul-cinza' },
  { id: 'escrit-suporte-telemovel', name: 'Suporte Telemóvel',        universoId: 'escrit', price: 13, img: `${ap}/escrit/suporte-telemovel-1.png`,   imgs: i4('escrit/suporte-telemovel', 4),  color: 'Natural' },
]

// ─── Organização ──────────────────────────────────────────────────────────────
const ORGANIZ_PRODUCTS: ShopProduct[] = [
  { id: 'organiz-aparador-balloon', name: 'Aparador de Livros Balloon',  universoId: 'organiz', price: 19, img: `${ap}/organiz/aparador-livros-balloon-1.png`, imgs: i4('organiz/aparador-livros-balloon', 4), color: 'Natural' },
  { id: 'organiz-aparador-nuvem',   name: 'Aparador de Livros Nuvem',    universoId: 'organiz', price: 24, img: `${ap}/organiz/aparador-livros-nuvem-1.png`,   imgs: i4('organiz/aparador-livros-nuvem', 4),   color: 'Creme' },
  { id: 'organiz-capitonne',        name: 'Organizador Capitonné',       universoId: 'organiz', price: 22, img: `${ap}/organiz/organizador-capitonne-1.png`,    imgs: i4('organiz/organizador-capitonne', 4),   tag: 'EDIÇÃO LIMITADA', color: 'Sage' },
  { id: 'organiz-cintos',           name: 'Organizador Slim para Cintos',universoId: 'organiz', price: 12, img: `${ap}/organiz/organizador-cintos-1.png`,       imgs: i4('organiz/organizador-cintos', 4),      color: 'Olive' },
  { id: 'organiz-vertical-luxe',    name: 'Organizador Vertical Luxe',   universoId: 'organiz', price: 24, img: `${ap}/organiz/organizador-vertical-luxe-1.png`,imgs: i4('organiz/organizador-vertical-luxe', 4),color: 'Terracota' },
  { id: 'organiz-cha-ondine',       name: 'Organizador de Chá Ondine',   universoId: 'organiz', price: 26, img: `${ap}/organiz/organizador-cha-ondine-1.png`,   imgs: i4('organiz/organizador-cha-ondine', 4),  color: 'Azul-cinza' },
]

// ─── Quarto ───────────────────────────────────────────────────────────────────
const QUARTO_PRODUCTS: ShopProduct[] = [
  { id: 'quarto-oculos-elefante',   name: 'Aparador de Óculos Elefante', universoId: 'quarto', price: 16, img: `${ap}/quarto/aparador-oculos-elefante-1.png`, imgs: i4('quarto/aparador-oculos-elefante', 4), color: 'Natural' },
  { id: 'quarto-porta-joias-folha', name: 'Bandeja Porta-Joias Folha',   universoId: 'quarto', price: 19, img: `${ap}/quarto/bandeja-porta-joias-folha-1.png`,imgs: i4('quarto/bandeja-porta-joias-folha', 4),color: 'Creme' },
  { id: 'quarto-escultura-sintonia',name: 'Escultura Sintonia',           universoId: 'quarto', price: 22, img: `${ap}/quarto/escultura-sintonia-1.png`,       imgs: i4('quarto/escultura-sintonia', 4),       tag: 'EDIÇÃO LIMITADA', color: 'Sage' },
  { id: 'quarto-organizador-lume',  name: 'Organizador Lume',             universoId: 'quarto', price: 19, img: `${ap}/quarto/organizador-lume-1.png`,         imgs: i4('quarto/organizador-lume', 4),         color: 'Olive' },
  { id: 'quarto-aparador-cabana',   name: 'Aparador de Livros Cabana',    universoId: 'quarto', price: 37, img: `${ap}/quarto/aparador-livros-cabana-1.png`,    imgs: i4('quarto/aparador-livros-cabana', 4),   color: 'Terracota' },
]

// ─── Brinquedos ───────────────────────────────────────────────────────────────
const BRINQUEDOS_PRODUCTS: ShopProduct[] = [
  { id: 'brinq-arco-sensorial',    name: 'Arco Sensorial Montessori',      universoId: 'brinquedos', price: 28, img: `${ap}/brinquedos/arco-sensorial-1.png`,        imgs: i4('brinquedos/arco-sensorial', 4),        tag: 'NOVO', color: 'Natural' },
  { id: 'brinq-cubo-sensorial',    name: 'Cubo Sensorial Infantil',        universoId: 'brinquedos', price: 8, img: `${ap}/brinquedos/cubo-sensorial-1.png`,        imgs: i4('brinquedos/cubo-sensorial', 4),        color: 'Creme' },
  { id: 'brinq-plaquinhas-abelhas',name: 'Kit Plaquinhas Abelhinhas',      universoId: 'brinquedos', price: 10, img: `${ap}/brinquedos/kit-plaquinhas-abelhas-1.png`, imgs: i4('brinquedos/kit-plaquinhas-abelhas', 4), color: 'Sage' },
  { id: 'brinq-plaquinhas-patrol', name: 'Kit Plaquinhas Patrulha Pata',   universoId: 'brinquedos', price: 14, img: `${ap}/brinquedos/kit-plaquinhas-patrulha-1.png`,imgs: i4('brinquedos/kit-plaquinhas-patrulha', 4),color: 'Olive' },
  { id: 'brinq-dino-articulado',   name: 'Dino Articulado',                universoId: 'brinquedos', price: 8, img: `${ap}/brinquedos/dino-articulado-1.png`,       imgs: i4('brinquedos/dino-articulado', 4),       color: 'Terracota' },
  { id: 'brinq-lagartixa',         name: 'Lagartixa Articulada',           universoId: 'brinquedos', price: 7, img: `${ap}/brinquedos/lagartixa-articulada-1.png`,  imgs: i4('brinquedos/lagartixa-articulada', 4),  color: 'Azul-cinza' },
]

export const SHOP_PRODUCTS: Record<string, ShopProduct[]> = {
  mamaes:      FAMILIA_PRODUCTS,
  bebes:       [...BEBES_PRODUCTS, ...CRIANCAS_PRODUCTS],
  cozinha:     COZINHA_PRODUCTS,
  sala:        SALA_PRODUCTS,
  escrit:      ESCRIT_PRODUCTS,
  organiz:     ORGANIZ_PRODUCTS,
  quarto:      QUARTO_PRODUCTS,
  deco:        DECO_PRODUCTS,
  brinquedos:  BRINQUEDOS_PRODUCTS,
}

export const ALL_SHOP_PRODUCTS: ShopProduct[] = Object.values(SHOP_PRODUCTS).flat()
