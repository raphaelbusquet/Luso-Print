# /adicionarproduto

Guia interativo para adicionar um novo produto à loja Lusoprint.

Quando este comando é invocado, segue este processo exato:

---

## Passo 1 — Recolher informação

Faz estas perguntas ao utilizador, uma de cada vez (ou em grupo se fizerem sentido juntas):

1. **Nome do produto** — ex: "Vaso Onda", "Porta-Livros Lua"
2. **Universo** — mostrar lista: Família (mamaes) / Bebés & Crianças (bebes) / Brinquedos (brinquedos) / Cozinha (cozinha) / Sala (sala) / Quarto (quarto) / Escritório (escrit) / Organização (organiz) / Decoração (deco)
3. **Preço** — em euros, número inteiro
4. **Cores disponíveis para o cliente escolher** — mostrar lista de VISUAL_COLORS: branco, cinza, preto, bege, marrom, vermelho, laranja, amarelo, verde, azul, rosa, lilás. Dizer "nenhuma" se não tem escolha de cor.
5. **Materiais disponíveis** — mostrar lista: PLA Basic, PLA Mate, PLA Silk, PLA Translucent, PETG HF, PETG Basic, PETG Translucent. Dizer "nenhum" se não aplicável.
6. **Cores dominantes visualmente** — quais as cores visualmente presentes no produto (para o filtro da loja), da mesma lista de VISUAL_COLORS
7. **Tag** — NOVO / PERSONALIZÁVEL / EDIÇÃO LIMITADA / nenhuma
8. **Produto tem campo de nome personalizado?** (ex: letreiro com nome da criança) — sim/não

---

## Passo 2 — Gerir as imagens

Perguntar: **"Onde estão as imagens agora?"**

Opções comuns:
- Downloads (`~/Downloads/`)
- Desktop (`~/Desktop/`)
- Outro caminho (pedir ao utilizador que indique)

Com base no universo escolhido, a pasta de destino é:

| universoId   | Pasta de destino                              |
|--------------|-----------------------------------------------|
| `mamaes`     | `public/assets/products/familia/`             |
| `bebes`      | `public/assets/products/bebe-crianca/`        |
| `brinquedos` | `public/assets/products/brinquedos/`          |
| `cozinha`    | `public/assets/products/cozinha-real/`        |
| `sala`       | `public/assets/products/sala/`                |
| `quarto`     | `public/assets/products/quarto/`              |
| `escrit`     | `public/assets/products/escrit/`              |
| `organiz`    | `public/assets/products/organiz/`             |
| `deco`       | `public/assets/products/deco/`                |

**Listar os ficheiros na pasta de origem** (usar `ls` ou `find`) para ver os nomes exatos e a extensão (`.png` ou `.jpg`).

Perguntar ao utilizador qual ficheiro corresponde a qual foto (1ª, 2ª, 3ª…), ou assumir ordem alfabética/numérica se os nomes já forem sequenciais.

**Copiar e renomear** cada ficheiro para o destino com o nome correto:
```
{slug}-1.png
{slug}-2.png
{slug}-3.png
...
```

Usar `cp` (não `mv`) para preservar o original caso o utilizador queira reverter.

Confirmar após cópia: "X imagens copiadas para `public/assets/products/{pasta}/`."

O número de imagens copiadas é o valor de **N** usado no helper `i4`.

---

## Passo 3 — Derivar campos automaticamente

Com base nas respostas:

- **`id`**: `{universoId}-{slug}` onde slug = nome em lowercase, sem acentos, espaços → hífens. Brinquedos usa prefixo `brinq-`.
- **`color`** (chip do card): escolher o valor de `COLOR_OPTIONS` mais próximo da cor predominante das `dominantColors`. Mapeamento orientativo:
  - branco/cinza claro → `'Branco'` ou `'Creme'`
  - bege/natural → `'Natural'` ou `'Creme'`
  - verde → `'Olive'` ou `'Sage'`
  - terracota/marrom/laranja → `'Terracota'`
  - azul/cinza → `'Azul-cinza'`
  - rosa/lilás → `'Creme'` ou `'Sage'`
- **`imgs`**: usar `i4('pasta/slug', N)` onde N = número de imagens copiadas
- **`img`**: `${ap}/pasta/slug-1.png`

---

## Passo 4 — Mostrar preview e confirmar

Mostrar ao utilizador o objeto TypeScript completo que vai ser inserido:
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

Mostrar também a tabela de combinações cor × material para referência ao configurar o admin:

```
Combinações a ativar em /admin:
  branco  × PLA Mate  ✓
  bege    × PLA Mate  ✓
  preto   × PLA Mate  ✓
```

Perguntar: "Está correto? Posso inserir?"

---

## Passo 5 — Fazer as alterações

Se confirmado, executar:

1. **`src/data/shop.ts`** — adicionar o objeto ao array correto do universo
2. **`src/data/index.ts`** — incrementar `cnt` do universo correspondente em `UNIVERSOS`
3. **`src/components/ui/ProductModal.tsx`** — se produto tem nome personalizado, adicionar o ID ao Set `NOME_IDS`

---

## Passo 6 — Resumo final

Mostrar o que foi feito e os próximos passos manuais:

```
✓ Imagens copiadas para public/assets/products/{pasta}/
✓ Produto adicionado a src/data/shop.ts
✓ Contagem atualizada em src/data/index.ts
[✓ ID adicionado a NOME_IDS]  ← só se aplicável

Próximos passos:
  1. Abrir /admin → ativar as combinações cor × material listadas acima
  2. Verificar em /loja que o produto aparece, modal abre e imagens carregam
  3. Remover tag 'NOVO' após ~4 semanas
```
