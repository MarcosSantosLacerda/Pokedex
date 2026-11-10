# Pokédex com React + Vite

Pokédex interativa da primeira geração (151 Pokémon) feita para a **Atividade 03** de Desenvolvimento e Integração de Aplicações Web.

**Integrantes da dupla:**

- Nome 1
- Nome 2

## Como executar

Pré-requisito: [Node.js](https://nodejs.org) 18 ou superior.

```bash
npm install
npm run dev
```

Depois abra **http://localhost:5173** no navegador.

Outros comandos:

```bash
npm run build     # gera a versão de produção em dist/
npm run preview   # serve a versão de produção localmente
```

## Funcionalidades

**Requisitos da atividade**

- Lista com os 151 Pokémon do `pokedex-data.json`, mostrando número, nome, tipos, HP, Ataque, Defesa, Ataque Especial, Defesa Especial e Velocidade em cada card.
- Pesquisa por nome ou número, atualizada a cada tecla. Ignora acentos e maiúsculas, e aceita `#25`.
- Filtro por tipo, com os tipos lidos do próprio JSON e a quantidade de Pokémon de cada um.
- Detalhes em modal, com barras de atributos, total e treinadores que possuem o Pokémon.
- Área de **Treinadores**: nome, insígnias (de 0 a 9) e Pokémon de cada um. Clicar em um Pokémon abre os detalhes.
- Mensagem de "nenhum Pokémon encontrado" com botão para limpar os filtros.
- Layout responsivo (desktop, tablet e celular).

**Desafios opcionais implementados**

- Favoritos (salvos no `localStorage`, com filtro "Favoritos").
- Comparação de dois Pokémon (botão ⚔ no card ou no modal).
- Ordenação por Número, Nome, HP, Ataque, Defesa, Ataque Esp., Defesa Esp. e Velocidade, crescente ou decrescente.
- Pokémon aleatório (a lente do cabeçalho pisca ao sortear).
- Tema claro e escuro (respeita a preferência do sistema e fica salvo).
- Navegação entre Pokémon no modal pelas setas ‹ › ou pelo teclado (← →). `Esc` fecha.

> **Observação sobre os dados:** no `pokedex-data.json` o Mew (#151) vem com a lista de tipos vazia. O app o exibe com o tipo `Typeless`, que já existe no próprio arquivo. O JSON original não foi alterado.

## Onde estão os dados

`src/data/pokedex-data.json`, com as listas `types`, `pokemon` e `trainers`. O arquivo é importado diretamente em `src/App.jsx`. Não há banco de dados nem requisição para os dados principais.

## Imagens e API externa

As imagens usam os sprites do repositório **[PokeAPI/sprites](https://github.com/PokeAPI/sprites)** (parte da [PokéAPI](https://pokeapi.co)), carregados pela URL pelo ID do Pokémon:

```text
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png
```

Se a imagem não carregar, o componente `PokemonImage` tenta o sprite pequeno e, se também falhar, mostra uma Pokébola. Sem internet, a Pokédex continua funcionando com os dados do JSON.

A fonte usada é a [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) (Google Fonts), com fallback para a fonte do sistema.

## Organização do projeto

```text
Pokedex/
├── public/
│   └── pokeball.svg
├── src/
│   ├── assets/images/        # reservado para imagens locais
│   ├── components/
│   │   ├── Header.jsx        # título, lente, abas e tema
│   │   ├── SearchBar.jsx
│   │   ├── TypeFilter.jsx
│   │   ├── SortControls.jsx
│   │   ├── PokemonList.jsx   # grade de cards (usa map)
│   │   ├── PokemonCard.jsx
│   │   ├── PokemonImage.jsx  # imagem com fallback
│   │   ├── PokemonDetails.jsx
│   │   ├── Modal.jsx         # base dos modais (Esc, foco, scroll)
│   │   ├── CompareTray.jsx
│   │   ├── CompareModal.jsx
│   │   ├── TrainerList.jsx
│   │   ├── TrainerCard.jsx
│   │   ├── TypeBadge.jsx
│   │   ├── StatBar.jsx
│   │   └── EmptyState.jsx
│   ├── css/                  # um arquivo de estilo por área
│   ├── data/pokedex-data.json
│   ├── hooks/useLocalStorage.js
│   ├── utils/pokemon.js      # cores dos tipos, rótulos e funções auxiliares
│   ├── App.jsx               # estado principal e composição
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Conceitos de React usados

| Conceito | Onde |
| --- | --- |
| Componentes funcionais e props | todos os arquivos de `src/components` |
| `useState` | `App.jsx` (busca, filtros, ordenação, modais, comparação) |
| `useMemo` e estado derivado | lista filtrada e ordenada em `App.jsx` |
| `useCallback` | handlers repassados aos modais |
| `useEffect` | `StatBar` (animação), `Modal` (teclado e scroll), `useLocalStorage` |
| Hook próprio | `useLocalStorage` (favoritos e tema) |
| Listas com `map()` e `key` | `PokemonList`, `TypeFilter`, `TrainerList` |
| Eventos | cliques, digitação, teclado e `select` |
| Renderização condicional | modais, estado vazio, bandeja de comparação |
