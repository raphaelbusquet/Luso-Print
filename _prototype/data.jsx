/* Shared data: products, collections, universes */

const PRODUCTS = [
  { id: 'arco', name: 'Candeeiro Arco', collection: 'Sala', price: 68, img: 'assets/products/arch-lamp.png', tag: 'NOVO' },
  { id: 'familia', name: 'Família', collection: 'Decoração', price: 84, img: 'assets/products/family.png', tag: 'EDIÇÃO LIMITADA' },
  { id: 'phone', name: 'Suporte Onda', collection: 'Escritório', price: 22, img: 'assets/products/phone-stand.png' },
  { id: 'lapis', name: 'Pote Colina', collection: 'Escritório', price: 18, img: 'assets/products/pen-holders.png' },
  { id: 'elisa', name: 'Placa Elisa', collection: 'Bebés', price: 28, img: 'assets/products/name-elisa.png', tag: 'PERSONALIZÁVEL' },
  { id: 'joias', name: 'Bandeja Laço', collection: 'Quarto', price: 34, img: 'assets/products/jewelry-tray.png' },
  { id: 'auscultador', name: 'Suporte Auscultador', collection: 'Escritório', price: 38, img: 'assets/products/headphone.png' },
  { id: 'vasos-rosa', name: 'Vasos Onda', collection: 'Sala', price: 52, img: 'assets/products/vases-pink.png' },
  { id: 'organiz', name: 'Estação Mesa', collection: 'Organização', price: 46, img: 'assets/products/desk-organizer.png' },
  { id: 'vive', name: 'Lettering Vive', collection: 'Decoração', price: 42, img: 'assets/products/vive-letters.png' },
  { id: 'luca', name: 'Placa Luca', collection: 'Crianças', price: 26, img: 'assets/products/luca-name.png', tag: 'PERSONALIZÁVEL' },
  { id: 'aparalivros', name: 'Aparalivros Curva', collection: 'Sala', price: 58, img: 'assets/products/bookends.png' },
  { id: 'calendario', name: 'Calendário Madeira', collection: 'Escritório', price: 36, img: 'assets/products/calendar.png' },
  { id: 'discos', name: 'Vasos Disco', collection: 'Cozinha', price: 44, img: 'assets/products/stack-disks.png' },
  { id: 'monstera', name: 'Base Monstera', collection: 'Cozinha', price: 16, img: 'assets/products/monstera.png' },
  { id: 'tags', name: 'Etiquetas Nome', collection: 'Crianças', price: 14, img: 'assets/products/name-tags.png', tag: 'PERSONALIZÁVEL' },
  { id: 'cortantes', name: 'Cortantes Animais', collection: 'Crianças', price: 19, img: 'assets/products/cookie-cutters.png' },
  { id: 'letterN', name: 'Aparalivros N', collection: 'Bebés', price: 38, img: 'assets/products/letter-N.png', tag: 'PERSONALIZÁVEL' },
  { id: 'tulipa', name: 'Vaso Tulipa', collection: 'Sala', price: 32, img: 'assets/products/pink-vase.png' },
  { id: 'bolo', name: 'Prato Bolo', collection: 'Cozinha', price: 48, img: 'assets/products/cake-stand.png', tag: 'NOVO' },
];

const UNIVERSOS = [
  { id: 'mamaes',   nome: 'Mamãs',        cnt: 24,  img: 'assets/products/family.png',         hue: 'var(--terracotta)' },
  { id: 'bebes',    nome: 'Bebés',        cnt: 18,  img: 'assets/products/letter-N.png',       hue: 'var(--cream)' },
  { id: 'criancas', nome: 'Crianças',     cnt: 32,  img: 'assets/products/name-tags.png',      hue: 'var(--sage)' },
  { id: 'escrit',   nome: 'Escritório',   cnt: 41,  img: 'assets/products/pen-holders.png',    hue: 'var(--olive)' },
  { id: 'cozinha',  nome: 'Cozinha',      cnt: 27,  img: 'assets/products/cake-stand.png',     hue: 'var(--blue-gray)' },
  { id: 'sala',     nome: 'Sala',         cnt: 38,  img: 'assets/products/arch-lamp.png',      hue: 'var(--linen)' },
  { id: 'quarto',   nome: 'Quarto',       cnt: 22,  img: 'assets/products/jewelry-tray.png',   hue: 'var(--cream)' },
  { id: 'deco',     nome: 'Decoração',    cnt: 56,  img: 'assets/products/vive-letters.png',   hue: 'var(--terracotta)' },
  { id: 'organiz',  nome: 'Organização',  cnt: 29,  img: 'assets/products/desk-organizer.png', hue: 'var(--olive)' },
];

const DIARIO = [
  { ttl: 'Os detalhes da mesa posta — pequenos gestos, grandes momentos.',
    cat: 'Slow Living', date: 'Março 2026', img: 'assets/diario/03-mesa-posta.jpg' },
  { ttl: 'Como compor um canto de leitura que respira sossego.',
    cat: 'Interiores',  date: 'Fevereiro 2026', img: 'assets/diario/01-bookends.jpg' },
  { ttl: 'Presentes que falam de quem somos — o lugar do nome.',
    cat: 'Personalização', date: 'Janeiro 2026', img: 'assets/diario/02-olivia.jpg' },
];

window.LUSO_DATA = { PRODUCTS, UNIVERSOS, DIARIO };
