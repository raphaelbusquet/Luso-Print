import { PET_FRAME_OPTIONS } from './pets'
import type { ColorOption } from './materials'

export type { ColorOption }

export type ShopProduct = {
  id: string
  name: string
  petCount?: number
  quoteOnly?: boolean
  comingSoon?: boolean
  description?: string
  universoId: string
  price: number
  img: string
  imgs?: string[]
  tag?: string
  color: string
  dominantColors: string[]
  colorOptions?: ColorOption[]
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

export const VISUAL_COLORS: { name: string; hex: string }[] = [
  { name: 'branco',   hex: '#F5F1EC' },
  { name: 'cinza',    hex: '#C8C8C8' },
  { name: 'preto',    hex: '#4A4A4A' },
  { name: 'bege',     hex: '#DDD0B8' },
  { name: 'marrom',   hex: '#C4967A' },
  { name: 'vermelho', hex: '#ECA8A8' },
  { name: 'laranja',  hex: '#F5C8A0' },
  { name: 'amarelo',  hex: '#F5E4A0' },
  { name: 'verde',    hex: '#AECDA8' },
  { name: 'azul',     hex: '#A8C0D8' },
  { name: 'rosa',     hex: '#F2B8C6' },
  { name: 'lilás',    hex: '#C8B0D8' },
]

// helper: build imgs array from numbered files
const ap = '/assets/products'
function i4(base: string, n: number, ext = 'png'): string[] {
  return fill4(Array.from({ length: n }, (_, i) => `${ap}/${base}-${i + 1}.${ext}`))
}

// helper: build colorOptions array
const co = (colors: string[], materials: string[]): ColorOption[] =>
  colors.map(color => ({ color, materials }))

// ─── Bebés ────────────────────────────────────────────────────────────────────
const BEBES_PRODUCTS: ShopProduct[] = [
  { id: 'bebes-bubble-layers', name: 'Escrita Bubble Layers', description: 'Letras arredondadas cheias de cor e personalidade, criadas para tornar cada nome especial. Personalizável com o nome, as cores e o tema que o cliente desejar — fazendinha, unicórnio, princesas, dinossauros ou outra ideia à sua escolha. Escrita simples a partir de €30, com valor dependente do nome da criança. A versão com tema personalizado custa €45, um acréscimo de €15 face ao valor base.', universoId: 'bebes', price: 30, img: `${ap}/bebe-crianca/bubble-layers-1.jpg`, imgs: [`${ap}/bebe-crianca/bubble-layers-1.jpg`, `${ap}/bebe-crianca/bubble-layers-2.jpg`, `${ap}/bebe-crianca/bubble-layers-3.png`, `${ap}/bebe-crianca/bubble-layers-4.png`], tag: 'PERSONALIZÁVEL', color: 'Terracota', dominantColors: ['rosa', 'lilás', 'azul', 'amarelo'] },
  { id: 'bebes-letreiro-mesa-daniel', name: 'Letreiro de Mesa Daniel', description: 'Um nome que ganha forma e cor. Letreiro de mesa personalizado com inicial e nome em destaque, pensado para dar um toque especial à cómoda, à secretária ou à prateleira do quarto dos mais pequenos.', universoId: 'bebes', price: 29, img: `${ap}/bebe-crianca/letreiro-mesa-daniel-1.png`, imgs: Array.from({ length: 3 }, (_, i) => `${ap}/bebe-crianca/letreiro-mesa-daniel-${i + 1}.png`), tag: 'PERSONALIZÁVEL', color: 'Azul-cinza', dominantColors: ['azul', 'branco'], colorOptions: co(['verde', 'azul', 'amarelo', 'rosa', 'lilás'], ['PLA Mate']) },
  { id: 'bebes-heitor-dino',       name: 'Letreiro Heitor Dino',   universoId: 'bebes', price: 36, img: `${ap}/bebe-crianca/letreiro-heitor-dino-1.png`,  imgs: i4('bebe-crianca/letreiro-heitor-dino', 4),  tag: 'PERSONALIZÁVEL', color: 'Natural',    dominantColors: ['verde'],           colorOptions: co(['verde', 'azul', 'amarelo', 'rosa', 'lilás'], ['PLA Mate']) },
  { id: 'bebes-cecilia',           name: 'Letreiro Cecília',       universoId: 'bebes', price: 44, img: `${ap}/bebe-crianca/letreiro-cecilia-1.png`,       imgs: i4('bebe-crianca/letreiro-cecilia', 4),       tag: 'PERSONALIZÁVEL', color: 'Creme',      dominantColors: ['rosa', 'branco'],  colorOptions: co(['rosa', 'lilás'], ['PLA Mate']) },
  { id: 'bebes-arco-iris',         name: 'Letreiro Arco-íris',     universoId: 'bebes', price: 42, img: `${ap}/bebe-crianca/letreiro-arco-iris-1.png`,     imgs: i4('bebe-crianca/letreiro-arco-iris', 4),     tag: 'PERSONALIZÁVEL', color: 'Sage',       dominantColors: ['rosa', 'azul', 'amarelo', 'branco'] },
  { id: 'bebes-escrita-sophia',    name: 'Escrita Sophia',         universoId: 'bebes', price: 32, img: `${ap}/bebe-crianca/escrita-sophia-1.png`,         imgs: i4('bebe-crianca/escrita-sophia', 4),         tag: 'PERSONALIZÁVEL', color: 'Terracota',  dominantColors: ['rosa'],            colorOptions: co(['verde', 'azul', 'amarelo', 'rosa', 'lilás'], ['PLA Mate']) },
  { id: 'bebes-porta-maternidade', name: 'Porta Maternidade Boho', universoId: 'bebes', price: 44, img: `${ap}/bebe-crianca/porta-maternidade-boho-1.png`, imgs: i4('bebe-crianca/porta-maternidade-boho', 4), tag: 'PERSONALIZÁVEL', color: 'Azul-cinza', dominantColors: ['branco', 'rosa'],  colorOptions: co(['rosa', 'cinza', 'azul', 'verde', 'amarelo', 'lilás'], ['PLA Mate']) },
]

// ─── Crianças ─────────────────────────────────────────────────────────────────
const CRIANCAS_PRODUCTS: ShopProduct[] = [
  { id: 'criancas-quadro-dino',           name: 'Quadro Dino',            universoId: 'bebes', price: 54, img: `${ap}/bebe-crianca/quadro-dino-1.png`,          imgs: i4('bebe-crianca/quadro-dino', 3),          color: 'Natural',    dominantColors: ['verde', 'azul', 'amarelo', 'bege'] },
  { id: 'criancas-quadro-fazendinha',     name: 'Quadro Fazendinha',      universoId: 'bebes', price: 64, img: `${ap}/bebe-crianca/quadro-fazendinha-1.png`,     imgs: i4('bebe-crianca/quadro-fazendinha', 2),     color: 'Creme',      dominantColors: ['verde', 'rosa', 'amarelo', 'lilás', 'bege', 'azul'] },
  { id: 'criancas-kit-flores-cute',       name: 'Kit Flores Cute',        universoId: 'bebes', price: 54, img: `${ap}/bebe-crianca/kit-flores-cute-1.png`,       imgs: i4('bebe-crianca/kit-flores-cute', 4),       color: 'Sage',       dominantColors: ['rosa', 'lilás', 'amarelo', 'verde'] },
  { id: 'criancas-quadro-flores-vintage', name: 'Quadro Flores Vintage',  universoId: 'bebes', price: 32, img: `${ap}/bebe-crianca/quadro-flores-vintage-1.jpg`, imgs: fill4([`${ap}/bebe-crianca/quadro-flores-vintage-1.jpg`, `${ap}/bebe-crianca/quadro-flores-vintage-2.png`, `${ap}/bebe-crianca/quadro-flores-vintage-3.png`, `${ap}/bebe-crianca/quadro-flores-vintage-4.png`]), tag: 'NOVO', color: 'Terracota', dominantColors: ['rosa', 'verde', 'marrom'] },
  { id: 'criancas-cortador-patrulha',     name: 'Cortador Patrulha Pata', universoId: 'bebes', price: 14, img: `${ap}/bebe-crianca/cortador-patrulha-1.png`,     imgs: i4('bebe-crianca/cortador-patrulha', 3),     color: 'Azul-cinza', dominantColors: ['cinza'] },
]

// ─── Cozinha ──────────────────────────────────────────────────────────────────
const COZINHA_PRODUCTS: ShopProduct[] = [
  { id: 'cozinha-apoio-talheres',    name: 'Apoio Talheres',    universoId: 'cozinha', price: 9,  img: `${ap}/cozinha-real/apoio-talheres-1.png`,    imgs: i4('cozinha-real/apoio-talheres', 3),    color: 'Natural',    dominantColors: ['branco'],               colorOptions: co(['branco', 'preto', 'cinza'], ['PLA Mate']) },
  { id: 'cozinha-boleira-geometrica',name: 'Boleira Geométrica',universoId: 'cozinha', price: 27, img: `${ap}/cozinha-real/boleira-geometrica-1.png`, imgs: i4('cozinha-real/boleira-geometrica', 4), tag: 'NOVO',         color: 'Creme',      dominantColors: ['amarelo', 'branco'],    colorOptions: co(['amarelo', 'cinza', 'preto', 'branco', 'rosa', 'azul'], ['PLA Mate']) },
  { id: 'cozinha-boleira-torre',     name: 'Boleira Torre',     universoId: 'cozinha', price: 27, img: `${ap}/cozinha-real/boleira-torre-1.png`,      imgs: i4('cozinha-real/boleira-torre', 4),      color: 'Sage',       dominantColors: ['amarelo'],              colorOptions: co(['amarelo', 'cinza', 'preto', 'branco', 'rosa', 'azul'], ['PLA Mate']) },
  { id: 'cozinha-mini-adega',        name: 'Mini Adega',        universoId: 'cozinha', price: 49, img: `${ap}/cozinha-real/mini-adega-1.png`,         imgs: i4('cozinha-real/mini-adega', 3),         tag: 'EDIÇÃO LIMITADA', color: 'Terracota', dominantColors: ['branco'],               colorOptions: co(['branco', 'cinza'], ['PLA Mate']) },
  { id: 'cozinha-porta-capsulas',    name: 'Porta Cápsulas',    universoId: 'cozinha', price: 19, img: `${ap}/cozinha-real/porta-capsulas-1.png`,     imgs: i4('cozinha-real/porta-capsulas', 4),     color: 'Azul-cinza', dominantColors: ['preto'],                colorOptions: co(['preto', 'cinza'], ['PLA Mate']) },
  { id: 'cozinha-porta-talheres',    name: 'Porta Talheres',    universoId: 'cozinha', price: 32, img: `${ap}/cozinha-real/porta-talheres-1.png`,     imgs: i4('cozinha-real/porta-talheres', 3),     color: 'Olive',      dominantColors: ['cinza', 'branco', 'preto'], colorOptions: co(['cinza', 'branco', 'preto'], ['PLA Mate']) },
  { id: 'cozinha-suporte-tabua',     name: 'Suporte Tábua',     universoId: 'cozinha', price: 24, img: `${ap}/cozinha-real/suporte-tabua-1.png`,      imgs: i4('cozinha-real/suporte-tabua', 4),      color: 'Natural',    dominantColors: ['branco'],               colorOptions: co(['branco', 'preto', 'cinza'], ['PLA Mate']) },
  { id: 'cozinha-suporte-vinho',     name: 'Suporte Vinho',     universoId: 'cozinha', price: 14, img: `${ap}/cozinha-real/suporte-vinho-1.png`,      imgs: i4('cozinha-real/suporte-vinho', 4),      color: 'Creme',      dominantColors: ['branco'],               colorOptions: co(['branco', 'preto', 'cinza'], ['PLA Mate']) },
]

// ─── Família ──────────────────────────────────────────────────────────────────
const FAMILIA_PRODUCTS: ShopProduct[] = [
  { id: 'familia-funko', name: 'Sua Família em Funko', description: 'A sua família numa versão cheia de personalidade. Em breve, descubra os detalhes desta peça personalizada.', comingSoon: true, universoId: 'mamaes', price: 0, img: `${ap}/familia/familia-funko-em-breve.svg`, tag: 'PERSONALIZÁVEL', color: 'Natural', dominantColors: [] },
  { id: 'familia-estatua-familia', name: 'Estátua Toda Família', universoId: 'mamaes', price: 26, img: `${ap}/familia/estatua-toda-familia-capa.png`, imgs: [`${ap}/familia/estatua-toda-familia-capa.png`, ...i4('familia/estatua-familia', 4)], color: 'Natural', tag: 'PERSONALIZÁVEL', dominantColors: ['branco'], colorOptions: co(['branco', 'preto', 'cinza'], ['PLA Mate']) },
  { id: 'familia-estatua-fams2',   name: 'Estátua Família S2',   universoId: 'mamaes', price: 32, img: `${ap}/familia/estatua-fams2-1.png`,   imgs: i4('familia/estatua-fams2', 4),   color: 'Creme',   tag: 'PERSONALIZÁVEL', dominantColors: ['branco'], colorOptions: co(['branco', 'preto', 'cinza'], ['PLA Mate']) },
]

// ─── Decoração ────────────────────────────────────────────────────────────────
const DECO_PRODUCTS: ShopProduct[] = [
  { id: 'deco-candeeiro-fluxo',    name: 'Candeeiro Fluxo',          universoId: 'deco', price: 35, img: `${ap}/deco/candeeiro-fluxo-1.png`,    imgs: i4('deco/candeeiro-fluxo', 4),    tag: 'NOVO',            color: 'Olive',      dominantColors: ['branco', 'marrom'] },
  { id: 'deco-mini-adega-vertice', name: 'Mini Adega Vértice',        universoId: 'deco', price: 58, img: `${ap}/deco/mini-adega-vertice-1.png`, imgs: i4('deco/mini-adega-vertice', 4), tag: 'EDIÇÃO LIMITADA', color: 'Terracota',  dominantColors: ['cinza'],           colorOptions: co(['cinza', 'preto', 'branco'], ['PLA Basic']) },
  { id: 'deco-peca-horizonte',     name: 'Peça Decorativa Horizonte', universoId: 'deco', price: 32, img: `${ap}/deco/peca-horizonte-1.png`,     imgs: i4('deco/peca-horizonte', 4),     color: 'Azul-cinza', dominantColors: ['cinza'] },
]

// ─── Sala ─────────────────────────────────────────────────────────────────────
const SALA_PRODUCTS: ShopProduct[] = [
  { id: 'sala-conjunto-arco',       name: 'Conjunto Arco',       universoId: 'sala', price: 39, img: `${ap}/sala/conjunto-arco-2.png`,        imgs: [2, 1, 3, 4].map(n => `${ap}/sala/conjunto-arco-${n}.png`),       tag: 'NOVO',         color: 'Creme',      dominantColors: ['bege'] },
  { id: 'sala-vaso-onda',           name: 'Vaso Onda',           universoId: 'sala', price: 18, img: `${ap}/sala/vaso-onda-1.png`,            imgs: i4('sala/vaso-onda', 4),           color: 'Azul-cinza', dominantColors: ['branco'],  colorOptions: co(['branco', 'azul', 'verde', 'cinza'], ['PLA Mate']) },
  { id: 'sala-porta-chaves-aurora', name: 'Porta-chaves Aurora', universoId: 'sala', price: 28, img: `${ap}/sala/porta-chaves-aurora-1.png`,  imgs: i4('sala/porta-chaves-aurora', 4), color: 'Olive',      dominantColors: ['bege'] },
  { id: 'sala-bandeja-trevo',       name: 'Kit Bandeja Trevo', description: 'Duas bandejas em forma de trevo para organizar e decorar com harmonia. Escolha uma cor para cada unidade: combine branco e preto, bege e branco ou crie a combinação que mais gosta entre as cores disponíveis. O kit inclui duas bandejas.',       universoId: 'sala', price: 18, img: `${ap}/sala/bandeja-trevo-2.png`,       imgs: [2, 1, 3, 4].map(n => `${ap}/sala/bandeja-trevo-${n}.png`),       color: 'Natural',    dominantColors: ['bege'],   colorOptions: co(['branco', 'preto', 'marrom', 'bege'], ['PLA Basic']) },
  { id: 'sala-conjunto-linea',      name: 'Conjunto Linea',      universoId: 'sala', price: 29, img: `${ap}/sala/conjunto-linea-2.png`,       imgs: [2, 3, 4].map(n => `${ap}/sala/conjunto-linea-${n}.png`),      color: 'Sage',       dominantColors: ['bege'] },
  { id: 'sala-trio-serena',         name: 'Trio Serena',         universoId: 'sala', price: 23, img: `${ap}/sala/trio-serena-4.png`,          imgs: [4, 1, 3].map(n => `${ap}/sala/trio-serena-${n}.png`),         tag: 'EDIÇÃO LIMITADA', color: 'Terracota', dominantColors: ['bege'] },
  { id: 'sala-vaso-portal',         name: 'Vaso Portal',         universoId: 'sala', price: 25, img: `${ap}/sala/vaso-portal-1.png`,          imgs: i4('sala/vaso-portal', 4),         color: 'Natural',    dominantColors: ['branco'],  colorOptions: co(['branco', 'preto', 'verde'], ['PLA Mate']) },
]

// ─── Escritório ───────────────────────────────────────────────────────────────
const ESCRIT_PRODUCTS: ShopProduct[] = [
  { id: 'escrit-stand-headphone',   name: 'Stand Headphone',        universoId: 'escrit', price: 32, img: `${ap}/escrit/stand-headphone-1.png`,     imgs: i4('escrit/stand-headphone', 4),     tag: 'NOVO', color: 'Natural',    dominantColors: ['preto'], colorOptions: co(['preto', 'branco', 'rosa', 'verde', 'cinza'], ['PLA Basic', 'PLA Mate']) },
  { id: 'escrit-suporte-ipad-tab',  name: 'Suporte iPad & Tablet',  universoId: 'escrit', price: 15, img: `${ap}/escrit/suporte-ipad-tablet-1.png`,  imgs: i4('escrit/suporte-ipad-tablet', 4),  color: 'Creme',      dominantColors: ['preto'], colorOptions: co(['preto', 'branco', 'rosa', 'verde', 'azul'], ['PLA Basic', 'PLA Mate']) },
  { id: 'escrit-porta-can-agenda',  name: 'Porta-canetas & Agenda', universoId: 'escrit', price: 21, img: `${ap}/escrit/porta-canetas-agenda-1.png`, imgs: i4('escrit/porta-canetas-agenda', 3), color: 'Sage',       dominantColors: ['bege'],  colorOptions: co(['bege', 'branco', 'preto', 'cinza'], ['PLA Basic', 'PLA Mate']) },
  { id: 'escrit-porta-can-no',      name: 'Porta-canetas Nó',       universoId: 'escrit', price: 13, img: `${ap}/escrit/porta-canetas-no-1.png`,     imgs: i4('escrit/porta-canetas-no', 4),     color: 'Olive',      dominantColors: ['preto'], colorOptions: co(['preto', 'branco', 'bege', 'cinza'], ['PLA Basic', 'PLA Mate']) },
  { id: 'escrit-porta-treco-basic', name: 'Porta-treco Basic',      universoId: 'escrit', price: 13, img: `${ap}/escrit/porta-treco-basic-1.png`,    imgs: i4('escrit/porta-treco-basic', 3),    color: 'Terracota',  dominantColors: ['cinza'], colorOptions: co(['cinza', 'branco', 'preto', 'bege'], ['PLA Basic', 'PLA Mate']) },
  { id: 'escrit-suporte-ipad',      name: 'Suporte iPad',           universoId: 'escrit', price: 19, img: `${ap}/escrit/suporte-ipad-1.png`,         imgs: i4('escrit/suporte-ipad', 4),         color: 'Azul-cinza', dominantColors: ['cinza'], colorOptions: co(['cinza', 'preto', 'branco', 'rosa', 'azul'], ['PLA Basic', 'PLA Mate']) },
  { id: 'escrit-suporte-telemovel', name: 'Suporte Telemóvel',      universoId: 'escrit', price: 13, img: `${ap}/escrit/suporte-telemovel-1.png`,    imgs: i4('escrit/suporte-telemovel', 4),    color: 'Natural',    dominantColors: ['branco'], colorOptions: co(['branco', 'cinza', 'rosa', 'azul', 'preto'], ['PLA Basic', 'PLA Mate']) },
]

// ─── Organização ──────────────────────────────────────────────────────────────
const ORGANIZ_PRODUCTS: ShopProduct[] = [
  { id: 'organiz-aparador-balloon', name: 'Aparador de Livros Balloon',   universoId: 'organiz', price: 19, img: `${ap}/organiz/aparador-livros-balloon-1.png`,  imgs: i4('organiz/aparador-livros-balloon', 4),  color: 'Natural',    dominantColors: ['preto'],  colorOptions: co(['preto', 'branco', 'cinza'], ['PLA Basic']) },
  { id: 'organiz-aparador-nuvem',   name: 'Aparador de Livros Nuvem',     universoId: 'organiz', price: 24, img: `${ap}/organiz/aparador-livros-nuvem-1.png`,    imgs: i4('organiz/aparador-livros-nuvem', 4),    color: 'Creme',      dominantColors: ['branco'] },
  { id: 'organiz-capitonne',        name: 'Organizador Capitonné',        universoId: 'organiz', price: 22, img: `${ap}/organiz/organizador-capitonne-1.png`,     imgs: i4('organiz/organizador-capitonne', 4),    tag: 'EDIÇÃO LIMITADA', color: 'Sage', dominantColors: ['branco'], colorOptions: co(['branco', 'bege'], ['PLA Basic']) },
  { id: 'organiz-cintos',           name: 'Organizador Slim para Cintos', universoId: 'organiz', price: 12, img: `${ap}/organiz/organizador-cintos-1.png`,        imgs: i4('organiz/organizador-cintos', 4),       color: 'Olive',      dominantColors: ['preto'],  colorOptions: co(['preto', 'cinza', 'branco'], ['PLA Basic']) },
  { id: 'organiz-vertical-luxe',    name: 'Organizador Vertical Luxe',    universoId: 'organiz', price: 24, img: `${ap}/organiz/organizador-vertical-luxe-1.png`, imgs: i4('organiz/organizador-vertical-luxe', 4), color: 'Terracota',  dominantColors: ['branco', 'cinza'] },
  { id: 'organiz-cha-ondine',       name: 'Organizador de Chá Ondine',    universoId: 'organiz', price: 26, img: `${ap}/organiz/organizador-cha-ondine-1.png`,    imgs: i4('organiz/organizador-cha-ondine', 4),   color: 'Azul-cinza', dominantColors: ['amarelo'], colorOptions: co(['amarelo', 'verde', 'preto', 'cinza', 'branco'], ['PLA Basic']) },
]

// ─── Quarto ───────────────────────────────────────────────────────────────────
const QUARTO_PRODUCTS: ShopProduct[] = [
  { id: 'quarto-oculos-elefante',   name: 'Aparador de Óculos Elefante', universoId: 'quarto', price: 16, img: `${ap}/quarto/aparador-oculos-elefante-1.png`,  imgs: i4('quarto/aparador-oculos-elefante', 4),  color: 'Natural',    dominantColors: ['azul'],  colorOptions: co(['azul', 'rosa', 'branco'], ['PLA Mate']) },
  { id: 'quarto-porta-joias-folha', name: 'Bandeja Porta-Joias Folha',   universoId: 'quarto', price: 19, img: `${ap}/quarto/bandeja-porta-joias-folha-1.png`, imgs: i4('quarto/bandeja-porta-joias-folha', 4), color: 'Creme',      dominantColors: ['verde'] },
  { id: 'quarto-escultura-sintonia',name: 'Escultura Sintonia',           universoId: 'quarto', price: 22, img: `${ap}/quarto/escultura-sintonia-1.png`,        imgs: i4('quarto/escultura-sintonia', 4),        tag: 'EDIÇÃO LIMITADA', color: 'Sage', dominantColors: ['branco', 'marrom'], colorOptions: co(['branco', 'preto'], ['PLA Mate']) },
  { id: 'quarto-organizador-lume',  name: 'Organizador Lume',             universoId: 'quarto', price: 19, img: `${ap}/quarto/organizador-lume-1.png`,          imgs: i4('quarto/organizador-lume', 4),          color: 'Olive',      dominantColors: ['branco'] },
  { id: 'quarto-aparador-cabana',   name: 'Aparador de Livros Cabana',    universoId: 'quarto', price: 37, img: `${ap}/quarto/aparador-livros-cabana-1.png`,    imgs: i4('quarto/aparador-livros-cabana', 4),    color: 'Terracota',  dominantColors: ['bege', 'marrom'] },
]

// ─── Brinquedos ───────────────────────────────────────────────────────────────
const BRINQUEDOS_PRODUCTS: ShopProduct[] = [
  { id: 'brinq-arco-sensorial',     name: 'Arco Sensorial Montessori',    universoId: 'bebes', price: 28, img: `${ap}/brinquedos/arco-sensorial-1.png`,         imgs: i4('brinquedos/arco-sensorial', 4),         tag: 'NOVO', color: 'Natural',    dominantColors: ['vermelho', 'laranja', 'amarelo', 'verde', 'azul'] },
  { id: 'brinq-cubo-sensorial',     name: 'Cubo Sensorial Infantil',      universoId: 'bebes', price: 8,  img: `${ap}/brinquedos/cubo-sensorial-1.png`,         imgs: i4('brinquedos/cubo-sensorial', 4),         color: 'Creme',      dominantColors: ['rosa'],  colorOptions: co(['rosa', 'azul', 'amarelo', 'verde'], ['PLA Mate']) },
  { id: 'brinq-plaquinhas-abelhas', name: 'Kit Plaquinhas Abelhinhas',    universoId: 'bebes', price: 10, img: `${ap}/brinquedos/kit-plaquinhas-abelhas-1.png`,  imgs: i4('brinquedos/kit-plaquinhas-abelhas', 4),  color: 'Sage',       dominantColors: ['branco'] },
  { id: 'brinq-plaquinhas-patrol',  name: 'Kit Plaquinhas Patrulha Pata', universoId: 'bebes', price: 14, img: `${ap}/brinquedos/kit-plaquinhas-patrulha-1.png`, imgs: i4('brinquedos/kit-plaquinhas-patrulha', 4), color: 'Olive',      dominantColors: ['branco'] },
  { id: 'brinq-dino-articulado',    name: 'Dino Articulado',              universoId: 'bebes', price: 8,  img: `${ap}/brinquedos/dino-articulado-1.png`,        imgs: i4('brinquedos/dino-articulado', 4),        color: 'Terracota',  dominantColors: ['rosa'],  colorOptions: co(['rosa', 'azul', 'amarelo', 'verde'], ['PLA Mate']) },
  { id: 'brinq-lagartixa',          name: 'Lagartixa Articulada',         universoId: 'bebes', price: 7,  img: `${ap}/brinquedos/lagartixa-articulada-1.png`,   imgs: i4('brinquedos/lagartixa-articulada', 4),   color: 'Azul-cinza', dominantColors: ['azul', 'rosa'], colorOptions: co(['azul', 'rosa', 'verde', 'amarelo', 'cinza'], ['PLA Mate']) },
]

const PETS_PRODUCTS: ShopProduct[] = PET_FRAME_OPTIONS.map(option => ({
  id: `pets-quadro-busto-${option.count}`,
  name: `Quadro com ${option.count} ${option.count === 1 ? 'Pet' : 'Pets'}`,
  description: `Há companheiros que fazem parte da família. Um quadro com ${option.count === 1 ? 'busto em relevo do seu cão ou gato' : `os bustos em relevo dos seus ${option.count} pets, cães ou gatos`}, pensado para dar um lugar especial a esse carinho na decoração da sua casa. Uma peça personalizada para celebrar ${option.count === 1 ? 'o seu melhor amigo' : 'os seus melhores amigos'} ou oferecer a quem partilha a vida com animais.`,
  petCount: option.count,
  universoId: 'pets',
  price: [19, 32, 40, 49][option.count - 1],
  img: option.images[0],
  imgs: option.images,
  tag: 'PERSONALIZÁVEL',
  color: 'Creme',
  dominantColors: ['branco', 'bege', 'preto'],
}))

export const SHOP_PRODUCTS: Record<string, ShopProduct[]> = {
  mamaes:      FAMILIA_PRODUCTS,
  pets:        PETS_PRODUCTS,
  bebes:       [...BEBES_PRODUCTS, ...CRIANCAS_PRODUCTS, ...BRINQUEDOS_PRODUCTS],
  cozinha:     COZINHA_PRODUCTS,
  sala:        SALA_PRODUCTS,
  escrit:      ESCRIT_PRODUCTS,
  organiz:     ORGANIZ_PRODUCTS,
  quarto:      QUARTO_PRODUCTS,
  deco:        DECO_PRODUCTS,
}

export const ALL_SHOP_PRODUCTS: ShopProduct[] = Object.values(SHOP_PRODUCTS).flat()
