# Lusoprint — Framework de Produtos

Guia completo para adicionar novos produtos à loja. Leia antes de qualquer trabalho em `src/data/shop.ts`.

---

## Estrutura do tipo `ShopProduct`

```ts
type ShopProduct = {
  id: string            // kebab-case, prefixo do universo (ex: 'sala-vaso-onda')
  name: string          // Nome comercial curto (ex: 'Vaso Onda')
  universoId: string    // ID do universo (ver tabela abaixo)
  price: number         // Preço em euros (inteiro)
  img: string           // Caminho da imagem principal (1ª foto)
  imgs?: string[]       // Array de 4 imagens — usar fill4() / i4()
  tag?: string          // Opcional: 'PERSONALIZÁVEL' | 'NOVO' | 'EDIÇÃO LIMITADA'
  color: string         // Cor do chip no card (ver COLOR_OPTIONS)
  dominantColors: string[] // Cores para filtro visual (ver VISUAL_COLORS)
  colorOptions?: ColorOption[] // Cores + materiais disponíveis para escolha
}
```

---

## Universos disponíveis

| `universoId` | Nome exibido        | Pasta de imagens       | Array no ficheiro         |
|--------------|---------------------|------------------------|---------------------------|
| `mamaes`     | Família             | `familia/`             | `FAMILIA_PRODUCTS`        |
| `bebes`      | Bebés & Crianças    | `bebe-crianca/`        | `BEBES_PRODUCTS` / `CRIANCAS_PRODUCTS` |
| `brinquedos` | Brinquedos          | `brinquedos/`          | `BRINQUEDOS_PRODUCTS`     |
| `cozinha`    | Cozinha             | `cozinha-real/`        | `COZINHA_PRODUCTS`        |
| `sala`       | Sala                | `sala/`                | `SALA_PRODUCTS`           |
| `quarto`     | Quarto              | `quarto/`              | `QUARTO_PRODUCTS`         |
| `escrit`     | Escritório          | `escrit/`              | `ESCRIT_PRODUCTS`         |
| `organiz`    | Organização         | `organiz/`             | `ORGANIZ_PRODUCTS`        |
| `deco`       | Decoração           | `deco/`                | `DECO_PRODUCTS`           |

---

## Convenção de IDs

Formato: `{universoId}-{slug-do-produto}`

Exemplos:
- `sala-vaso-onda`
- `cozinha-boleira-torre`
- `brinq-arco-sensorial` ← `brinquedos` usa prefixo `brinq-`
- `escrit-stand-headphone`
- `organiz-aparador-nuvem`
- `quarto-porta-joias-folha`

Regra: sem acentos, sem maiúsculas, hífens em vez de espaços.

---

## Campo `color` — chip no card

Valores válidos (de `COLOR_OPTIONS` em `shop.ts`):

| Valor         | Hex       |
|---------------|-----------|
| `Terracota`   | `#C9826E` |
| `Azul-cinza`  | `#A8B4B3` |
| `Creme`       | `#D9CEBC` |
| `Olive`       | `#8D9274` |
| `Sage`        | `#BEC1AE` |
| `Branco`      | `#F2F0EC` |
| `Natural`     | `#C8B89A` |

Escolha a cor mais próxima da tonalidade predominante do produto.

---

## Campo `dominantColors` — filtro da loja

Valores válidos (de `VISUAL_COLORS` em `shop.ts`):
`branco`, `cinza`, `preto`, `bege`, `marrom`, `vermelho`, `laranja`, `amarelo`, `verde`, `azul`, `rosa`, `lilás`

Lista as cores visualmente presentes no produto (1–5 cores). Usado para o filtro de cor na loja.

---

## Campo `colorOptions` — seletor de cor no modal

Usar o helper `co(colors, materials)`:

```ts
colorOptions: co(['branco', 'preto', 'cinza'], ['PLA Mate'])
// ou com múltiplos materiais:
colorOptions: co(['preto', 'branco'], ['PLA Basic', 'PLA Mate'])
```

As cores em `colorOptions` devem ser valores de `VISUAL_COLORS` (lowercase).

**Materiais disponíveis** (de `src/data/materials.ts`):
- `PLA Basic` — uso geral, acabamento standard
- `PLA Mate` — acabamento mate, produtos decorativos e infantis
- `PLA Silk` — acabamento sedoso/brilhante
- `PLA Translucent` — translúcido
- `PETG HF` — resistência mecânica elevada
- `PETG Basic` — uso geral resistente
- `PETG Translucent` — translúcido resistente

Se o produto não tem escolha de cor, omitir `colorOptions`.

---

## Tags disponíveis

| Tag               | Quando usar                                          |
|-------------------|------------------------------------------------------|
| `'PERSONALIZÁVEL'`| Produto tem campo de nome ou configuração específica |
| `'NOVO'`          | Produto recém-adicionado ao catálogo                 |
| `'EDIÇÃO LIMITADA'`| Stock limitado ou série especial                    |

Se nenhuma aplica, omitir o campo `tag`.

---

## Imagens

### Localização
`public/assets/products/{pasta-do-universo}/{slug-do-produto}-{n}.png`

Exemplos:
- `public/assets/products/sala/vaso-onda-1.png`
- `public/assets/products/bebe-crianca/letreiro-heitor-dino-2.png`
- `public/assets/products/brinquedos/arco-sensorial-1.png`

### Número de imagens
- Mínimo recomendado: 3–4 por produto
- O helper `fill4()` repete a última imagem até ter 4 — produto com 3 fotos fica com a 3ª repetida

### Helper `i4`
```ts
// i4(base, n) — gera array de n imagens com extensão .png
imgs: i4('sala/vaso-onda', 4)
// → ['.../sala/vaso-onda-1.png', '...2.png', '...3.png', '...4.png']

// Para jpg (exceção):
imgs: fill4([`${ap}/pasta/produto-1.jpg`, `${ap}/pasta/produto-2.png`, ...])
```

O campo `img` (imagem principal) usa sempre a primeira foto:
```ts
img: `${ap}/sala/vaso-onda-1.png`
```

---

## Casos especiais

### 1. Produtos com nome personalizado (letreiros)
Produtos onde o cliente escolhe um nome têm IDs registados em `NOME_IDS` no `ProductModal.tsx`:
```ts
const NOME_IDS = new Set([
  'bebes-heitor-dino',
  'bebes-cecilia',
  'bebes-arco-iris',
  'bebes-escrita-sophia',
  'bebes-porta-maternidade',
])
```
Ao adicionar um produto deste tipo, adicionar o seu ID a este Set.

### 2. Produtos de família (Estátua Família)
Apenas `familia-estatua-familia` e `familia-estatua-fams2`. Ativam o configurador de família (pai/mãe/crianças). Não criar novos sem discutir a lógica no `ProductModal.tsx`.

### 3. Letreiro AI (gerador de imagens)
Produtos do tipo letreiro gerado por IA existem como imagens guardadas no perfil do utilizador. Não têm produto próprio em `shop.ts` — o utilizador encomenda via carrinho a partir da galeria de imagens geradas.

---

## Checklist — Adicionar novo produto

1. **Imagens**: colocar em `public/assets/products/{pasta}/` com nomes `{slug}-1.png`, `{slug}-2.png`, etc.

2. **Entrada em `shop.ts`**: adicionar ao array correto (`COZINHA_PRODUCTS`, `SALA_PRODUCTS`, etc.)
   ```ts
   { 
     id: 'universo-nome-produto',
     name: 'Nome Comercial',
     universoId: 'universo',
     price: 00,
     img: `${ap}/pasta/nome-produto-1.png`,
     imgs: i4('pasta/nome-produto', N),
     tag: 'NOVO',                 // opcional
     color: 'Natural',            // chip do card
     dominantColors: ['branco'],  // filtro de cor
     colorOptions: co(['branco', 'preto'], ['PLA Mate']),  // opcional
   }
   ```

3. **Atualizar contagem no universo**: em `src/data/index.ts`, campo `cnt` do universo correspondente em `UNIVERSOS`.

4. **Se produto tem nome personalizado**: adicionar ID a `NOME_IDS` em `src/components/ui/ProductModal.tsx`.

5. **Se produto é novo**: tag `'NOVO'`. Remover após ~4 semanas.

6. **Admin — disponibilidade**: na página `/admin`, ativar as combinações de cor + material disponíveis para o novo produto (guarda em Supabase, tabela `material_availability`).

7. **Verificar na loja**: abrir `/loja`, filtrar pelo universo, confirmar que o produto aparece, abre modal, imagens carregam, filtro de cor funciona.

---

## Exemplo completo

```ts
{ 
  id: 'quarto-porta-livros-lua',
  name: 'Porta-Livros Lua',
  universoId: 'quarto',
  price: 28,
  img: `${ap}/quarto/porta-livros-lua-1.png`,
  imgs: i4('quarto/porta-livros-lua', 3),
  tag: 'NOVO',
  color: 'Creme',
  dominantColors: ['branco', 'bege'],
  colorOptions: co(['branco', 'bege', 'preto'], ['PLA Mate']),
}
```

---

## Referências rápidas

| Ficheiro                                    | O que contém                                   |
|---------------------------------------------|------------------------------------------------|
| `src/data/shop.ts`                          | Todos os produtos, tipos, helpers              |
| `src/data/index.ts`                         | UNIVERSOS (com cnt), NAV_LINKS, DIARIO         |
| `src/data/materials.ts`                     | Lista de materiais disponíveis                 |
| `src/components/ui/ProductModal.tsx`        | Modal do produto, NOME_IDS, lógica de família  |
| `src/pages/AdminPage.tsx`                   | Gestão de disponibilidade de cor + material    |
| `public/assets/products/`                   | Todas as imagens de produtos                   |
