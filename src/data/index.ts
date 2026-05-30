export type Product = {
  id: string
  name: string
  collection: string
  price: number
  img: string
  tag?: string
}

export type Universo = {
  id: string
  nome: string
  cnt: number
  img: string
  hue: string
  overlay: string
}

export type DiarioPost = {
  id: string
  ttl: string
  cat: string
  date: string
  img: string
  lead: string
  body: string
}

export const PRODUCTS: Product[] = [
  { id: 'arco',              name: 'Candeeiro Arco',       collection: 'Sala',          price: 68, img: '/assets/products/arch-lamp.png',                                       tag: 'NOVO' },
  { id: 'estatua-familia',   name: 'Estátua Toda Família', collection: 'Decoração',     price: 26, img: '/assets/products/familia/estatua-familia-1.png',                       tag: 'EDIÇÃO LIMITADA' },
  { id: 'suporte-vinho',     name: 'Suporte Vinho',        collection: 'Cozinha',       price: 38, img: '/assets/products/cozinha-real/suporte-vinho-1.png' },
  { id: 'boleira-geometric', name: 'Boleira Geometric',    collection: 'Cozinha',       price: 48, img: '/assets/products/cozinha-real/boleira-geometrica-1.png',               tag: 'NOVO' },
  { id: 'escrita-sophia',    name: 'Escrita Sophia',       collection: 'Bebés',         price: 38, img: '/assets/products/bebe-crianca/escrita-sophia-1.png',                   tag: 'PERSONALIZÁVEL' },
  { id: 'joias',             name: 'Bandeja Laço',         collection: 'Quarto',        price: 34, img: '/assets/products/jewelry-tray.png' },
  { id: 'auscultador',       name: 'Suporte Auscultador',  collection: 'Escritório',    price: 38, img: '/assets/products/headphone.png' },
  { id: 'letreiro-arco-iris', name: 'Letreiro Arco-Íris',  collection: 'Bebés',         price: 38, img: '/assets/products/bebe-crianca/letreiro-arco-iris-1.png',               tag: 'PERSONALIZÁVEL' },
  { id: 'organiz',           name: 'Estação Mesa',         collection: 'Organização',   price: 46, img: '/assets/products/desk-organizer.png' },
  { id: 'mini-adega',        name: 'Mini Adega',           collection: 'Cozinha',       price: 58, img: '/assets/products/cozinha-real/mini-adega-1.png',                       tag: 'EDIÇÃO LIMITADA' },
  { id: 'quadro-dino',       name: 'Quadro Dino',          collection: 'Crianças',      price: 28, img: '/assets/products/bebe-crianca/quadro-dino-1.png' },
  { id: 'aparalivros',       name: 'Aparalivros Curva',    collection: 'Sala',          price: 58, img: '/assets/products/bookends.png' },
  { id: 'calendario',        name: 'Calendário Madeira',   collection: 'Escritório',    price: 36, img: '/assets/products/calendar.png' },
  { id: 'porta-talheres',    name: 'Porta Talheres',       collection: 'Cozinha',       price: 32, img: '/assets/products/cozinha-real/porta-talheres-1.png' },
  { id: 'porta-capsulas',    name: 'Porta Cápsulas',       collection: 'Cozinha',       price: 24, img: '/assets/products/cozinha-real/porta-capsulas-1.png' },
  { id: 'cortador-patrulha', name: 'Cortador Patrulha Pata', collection: 'Crianças',   price: 19, img: '/assets/products/bebe-crianca/cortador-patrulha-1.png' },
  { id: 'quadro-flores',     name: 'Quadro Flores Vintage',collection: 'Crianças',      price: 34, img: '/assets/products/bebe-crianca/quadro-flores-vintage-1.jpg',             tag: 'NOVO' },
  { id: 'letreiro-cecilia',  name: 'Letreiro Cecília',     collection: 'Bebés',         price: 38, img: '/assets/products/bebe-crianca/letreiro-cecilia-1.png',                  tag: 'PERSONALIZÁVEL' },
  { id: 'vive',              name: 'Lettering Vive',       collection: 'Decoração',     price: 42, img: '/assets/products/vive-letters.png' },
  { id: 'estatua-fams2',     name: 'Estátua Família S2',   collection: 'Decoração',     price: 32, img: '/assets/products/familia/estatua-fams2-1.png' },
]

export const UNIVERSOS: Universo[] = [
  { id: 'mamaes',     nome: 'Família',         cnt: 2,  img: '/assets/products/familia/estatua-fams2-1.png',                   hue: 'var(--terracotta)', overlay: 'rgba(201,130,110,0.32)' },
  { id: 'bebes',      nome: 'Bebés & Crianças',cnt: 10, img: '/assets/products/bebe-crianca/letreiro-heitor-dino-1.png',        hue: 'var(--cream)',      overlay: 'rgba(217,206,188,0.30)' },
  { id: 'brinquedos', nome: 'Brinquedos',      cnt: 6,  img: '/assets/products/brinquedos/arco-sensorial-1.png',                hue: 'var(--terracotta)', overlay: 'rgba(201,130,110,0.28)' },
  { id: 'cozinha',    nome: 'Cozinha',          cnt: 8,  img: '/assets/products/cozinha-real/boleira-geometrica-1.png',          hue: 'var(--blue-gray)',  overlay: 'rgba(168,180,179,0.36)' },
  { id: 'sala',       nome: 'Sala',             cnt: 7,  img: '/assets/products/sala/vaso-portal-1.png',                         hue: 'var(--linen)',      overlay: 'rgba(232,225,210,0.30)' },
  { id: 'quarto',     nome: 'Quarto',           cnt: 5,  img: '/assets/products/quarto/bandeja-porta-joias-folha-1.png',         hue: 'var(--cream)',      overlay: 'rgba(217,206,188,0.32)' },
  { id: 'escrit',     nome: 'Escritório',       cnt: 7,  img: '/assets/products/escrit/stand-headphone-1.png',                   hue: 'var(--olive)',      overlay: 'rgba(141,146,116,0.38)' },
  { id: 'organiz',    nome: 'Organização',      cnt: 6,  img: '/assets/products/organiz/aparador-livros-balloon-1.png',          hue: 'var(--olive)',      overlay: 'rgba(141,146,116,0.30)' },
  { id: 'deco',       nome: 'Decoração',        cnt: 5,  img: '/assets/products/deco/candeeiro-fluxo-1.png',                     hue: 'var(--terracotta)', overlay: 'rgba(201,130,110,0.32)' },
]

export const DIARIO: DiarioPost[] = [
  {
    id: 'mesa-posta',
    ttl: 'A boleira que transforma um simples bolo numa cerimónia.',
    cat: 'Slow Living', date: 'Março 2026', img: '/assets/products/cozinha-real/boleira-geometrica-1.png',
    lead: 'Servir bem não é exibição — é uma forma de dizer que quem vem merece o melhor que tens.',
    body: `Há domingos em que a tarde parece pedir mais do que uma fatia de bolo numa travessa qualquer. Há visitas que merecem a cerimónia de um bolo a postos antes de chegarem, velas acesas, o melhor serviço de chávenas tirado da prateleira. É nesses momentos que percebemos que os objetos têm o poder de transformar o comum em especial.

A Boleira Geométrica nasceu desse entendimento. Com a sua base em forma de diamante — facetada, precisa, quase escultórica — e o plateau branco que paira no topo, não é apenas uma boleira: é uma declaração de intenção. Diz, sem palavras, que o que está em cima foi feito com cuidado e merece ser apresentado com o mesmo cuidado.

Impressa a 3D no nosso atelier em Lisboa, cada peça tem a solidez de algo que ficará décadas na tua cozinha e o charme de algo que nunca passa de moda. Disponível em sete cores — do amarelo-gengibre ao verde-salva — para se integrar ou contrastar com o teu espaço, sempre com personalidade.

Colocar o bolo na boleira antes de os convidados chegarem não é vaidade. É hospitalidade. É a diferença entre receber e fazer sentir bem-vindo.`,
  },
  {
    id: 'canto-leitura',
    ttl: 'Os Aparadores Nuvem e a arte de dar um sítio aos livros que amamos.',
    cat: 'Interiores', date: 'Fevereiro 2026', img: '/assets/products/organiz/aparador-livros-nuvem-1.png',
    lead: 'Uma prateleira com bons aparadores não guarda apenas livros — guarda a história de quem os leu.',
    body: `Os livros que guardamos dizem muito sobre quem somos. A forma como os arrumamos diz o resto. Há pessoas que os empilham com abandono — o charme do caos habitado. Há quem os organize por cor, por tamanho, por data de leitura. Mas os melhores cantos de leitura que conhecemos têm sempre um elemento em comum: um objeto bom a marcar cada extremidade da prateleira.

Os Aparadores Nuvem surgiram de uma observação muito simples: que a linha suave de uma nuvem é o antídoto perfeito para a verticalidade rígida dos livros. A sua forma arredondada, impressa em branco mate, traz leveza e fantasia a uma estante sem a infantilizar.

Cada par é impresso individualmente no nosso atelier, com uma base larga que garante estabilidade mesmo para coleções mais pesadas. Não escorregam. Não tomam demasiado espaço. E têm a elegância discreta de quem não precisa de se impor para ser notado.

Coloca-os numa prateleira com os teus cinco livros favoritos. Vê o que acontece à sala.`,
  },
  {
    id: 'lugar-do-nome',
    ttl: 'O letreiro do Heitor — quando o nome de um filho ganha forma e cor.',
    cat: 'Personalização', date: 'Janeiro 2026', img: '/assets/products/bebe-crianca/letreiro-heitor-dino-1.png',
    lead: 'Dar o nome a um espaço é dizer à criança: este sítio foi feito a pensar em ti.',
    body: `Quando a Carolina nos enviou a foto do quarto do Heitor já montado, com o letreiro a ocupar a parede acima da cama, não conseguimos não sorrir. Não era apenas a peça que ficou bem — era o que ela representava: que aquele quarto tinha sido pensado para ele, especificamente, pelo nome que escolheram com tanta atenção durante nove meses.

O Letreiro Personalizado nasceu de conversas com pais e mães que queriam algo mais do que um nome numa parede. Queriam uma peça que crescesse com a criança, que resistisse ao tempo, que parecesse cara mas não fosse. E que, acima de tudo, fosse única.

Cada letreiro é desenhado à medida do nome escolhido, impresso letra a letra no nosso atelier, e enviado numa caixa que já muitas mães nos disseram guardar. O tema — dinossauros, estrelas, flores, arco-íris — é escolhido por ti. As cores também.

O Heitor tem dois anos. Ainda não sabe ler o próprio nome. Mas aponta para o letreiro todos os dias e sorri. Isso é tudo o que precisamos de saber.`,
  },
  {
    id: 'geometria-organizacao',
    ttl: 'A secretária que querias ter — como a Porta-Canetas Agenda muda o teu dia.',
    cat: 'Organização', date: 'Dezembro 2025', img: '/assets/products/escrit/porta-canetas-agenda-1.png',
    lead: 'Não é superstição: uma secretária bem composta muda a qualidade do trabalho que se faz nela.',
    body: `Existe um momento, reconhecível por quem trabalha em casa, em que a secretária deixa de ser um espaço de trabalho e passa a ser um campo de batalha. Cabos emaranhados, canetas sem tampa, o bloco de notas enterrado debaixo de três camadas de papéis que "precisam de ser arquivados". Não é por falta de intenção — é por falta de estrutura.

A Porta-Canetas Agenda foi desenhada para resolver esse problema com elegância. Com os seus compartimentos de diferentes alturas, acomoda canetas, tesouras, post-its e uma agenda de bolso sem criar caos visual. A textura canelada — inspirada na cerâmica artesanal — torna-a num objeto que apetece ter à vista, não esconder numa gaveta.

Disponível em bege-areia, branco-creme e verde-musgo, integra-se em qualquer estilo de secretária. Impressa em PLA+, o plástico de origem vegetal que usamos em todas as nossas peças, é leve, resistente e livre de BPA.

A diferença entre uma secretária onde te sentes bem e uma onde lutas para te concentrar raramente é grande. Às vezes é apenas uma peça bem colocada no sítio certo.`,
  },
  {
    id: 'quarto-refugio',
    ttl: 'A bandeja de folha e o ritual de fim de dia que mereces.',
    cat: 'Interiores', date: 'Novembro 2025', img: '/assets/products/quarto/bandeja-porta-joias-folha-1.png',
    lead: 'Tirar as joias antes de dormir é um gesto pequeno. A bandeja certa transforma-o num ritual.',
    body: `Há momentos do dia que são invisíveis — não porque não aconteçam, mas porque os fazemos tão mecanicamente que deixámos de os notar. Tirar o anel antes de deitar. Pousar os brincos na mesinha de cabeceira. Retirar o fio que usámos o dia todo. São gestos de segundos que, com o objeto certo, se tornam a pausa que o final do dia merece.

A Bandeja Porta-Joias Folha foi desenhada para esse momento. Com a sua forma de folha — as nervuras impressas com o detalhe que só a impressão 3D permite — e o verde profundo que lembra plantas de interior bem tratadas, é um objeto que transforma a mesinha de cabeceira num canto de intenção.

Não é grande. Não precisa de ser. Tem o tamanho certo para segurar o que carregas ao longo do dia — as joias, a aliança, o elástico do cabelo — sem ocupar o espaço que uma chávena de chá e um livro também precisam.

O quarto que nos abraça quando entramos não precisa de ser o quarto das revistas. Precisa de ter os objetos certos nos lugares certos. Às vezes, começa por uma bandeja bonita no canto da mesinha.`,
  },
  {
    id: 'forma-ao-nome',
    ttl: 'O Candeeiro Fluxo — quando a luz de um espaço muda tudo o resto.',
    cat: 'Design', date: 'Outubro 2025', img: '/assets/products/deco/candeeiro-fluxo-1.png',
    lead: 'A luz certa não ilumina apenas uma divisão. Transforma-a.',
    body: `Há casas que parecem sempre acolhedoras, independentemente da hora do dia ou da estação do ano. Se as observarmos com atenção, descobrimos quase sempre o mesmo segredo: sabem usar a luz. Não a luz de teto que tudo esmaga com uniformidade — a luz lateral, a luz baixa, a luz que cria sombra e profundidade e faz os espaços parecerem habitados por alguém que sabe viver.

O Candeeiro Fluxo surgiu da obsessão com essa qualidade de luz. O seu abajur em espiral — impresso numa única peça contínua que leva horas a produzir no nosso atelier — filtra e difunde a luz de forma que um abajur sólido nunca consegue. O resultado é um brilho suave, quase orgânico, que aquece qualquer divisão sem a tornar pesada.

Desenhado para pousar numa mesa de apoio ou num canto de sala, o Fluxo é simultaneamente uma fonte de luz e uma escultura. Apagado, é uma peça de design que merece atenção. Aceso, transforma o espaço à sua volta.

Há objetos que compramos por necessidade. E há objetos que compramos porque, da primeira vez que os vemos acesos, percebemos que sempre faltou algo — e era isto.`,
  },
]

export const NAV_LINKS: [string, string][] = [
  ['Universos', '/#universos'],
  ['Diário', '/#diario'],
  ['Atelier', '/#atelier'],
  ['Contacto', '/#contacto'],
]
