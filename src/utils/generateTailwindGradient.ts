import { findClosestTailwindClass } from './findClosestTailwindClass'

// Accepte un hex ('#f59e0b'), une classe ('bg-amber-400') ou un nom ('amber-400')
// et renvoie le nom Tailwind sans préfixe ('amber-400').
function toColorName(color: string): string {
  const value = color.trim()
  if (/^#?[a-f\d]{6}$/i.test(value)) {
    const hex = value.startsWith('#') ? value : `#${value}`
    return findClosestTailwindClass(hex.toLowerCase()).replace(/^bg-/, '')
  }
  return value.replace(/^(bg|from|via|to)-/, '')
}

export interface TailwindGradientOptions {
  from: string
  to: string
  via?: string
}

// generateTailwindGradient({ from: 'amber-400', to: '#eab308' }) -> 'from-amber-400 to-yellow-500'
// Avec via : 'from-amber-400 via-orange-500 to-yellow-500'
export function generateTailwindGradient({ from, to, via }: TailwindGradientOptions): string {
  const parts = [`from-${toColorName(from)}`]
  if (via) parts.push(`via-${toColorName(via)}`)
  parts.push(`to-${toColorName(to)}`)
  return parts.join(' ')
}
