export const TYPE_COLORS = {
  typeless: '#68a090',
  normal: '#a8a77a',
  fire: '#ee8130',
  water: '#6390f0',
  grass: '#7ac74c',
  electric: '#f7d02c',
  ice: '#96d9d6',
  fighting: '#c22e28',
  poison: '#a33ea1',
  ground: '#e2bf65',
  flying: '#a98ff3',
  psychic: '#f95587',
  bug: '#a6b91a',
  rock: '#b6a136',
  ghost: '#735797',
  dark: '#705746',
  dragon: '#6f35fc',
  steel: '#b7b7ce',
}

export const STATS = [
  { key: 'hp', label: 'HP', short: 'HP' },
  { key: 'attack', label: 'Ataque', short: 'ATK' },
  { key: 'defense', label: 'Defesa', short: 'DEF' },
  { key: 'specialAttack', label: 'Ataque Esp.', short: 'SP.A' },
  { key: 'specialDefense', label: 'Defesa Esp.', short: 'SP.D' },
  { key: 'speed', label: 'Velocidade', short: 'SPD' },
]

export const SORT_OPTIONS = [
  { value: 'id', label: 'Número' },
  { value: 'name', label: 'Nome' },
  ...STATS.map((s) => ({ value: s.key, label: s.label })),
]

export const MAX_STAT = 255

export const formatId = (id) => `#${String(id).padStart(3, '0')}`

export const typeColor = (name) => TYPE_COLORS[name.toLowerCase()] ?? TYPE_COLORS.typeless

export const totalStats = (pokemon) =>
  STATS.reduce((sum, { key }) => sum + pokemon.stats[key], 0)

// remove acentos e normaliza caixa para a pesquisa
export const normalize = (text) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()

// escolhe texto claro ou escuro conforme a luminância do fundo
export const readableOn = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.62 ? '#1b1f33' : '#ffffff'
}

// Imagens: PokéAPI sprites (opcional, documentado no README)
const SPRITES = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'
export const artworkUrl = (id) => `${SPRITES}/other/official-artwork/${id}.png`
export const spriteUrl = (id) => `${SPRITES}/${id}.png`
