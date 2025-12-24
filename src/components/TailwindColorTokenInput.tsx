import React, {useEffect, useMemo, useState} from 'react'
import {ChromePicker} from 'react-color'
import {Badge, Box, Card, Code, Grid, Stack, Text} from '@sanity/ui'
import {set} from 'sanity'
import {
  findClosestTailwindClassesWithValidity,
  isValidTailwindClass,
  tailwindClassToHex,
  parseTailwindClass,
} from '../utils/findClosestTailwindClass'

type Token = {
  hex?: string
  class?: string
  color?: string
  shade?: string
  opacity?: number
}

type Props = {
  value?: Token
  onChange: (patch: any) => void
}

function formatOpacity(opacity?: number): number {
  const v = Number(opacity ?? 100)
  return Math.max(0, Math.min(100, v))
}

function composeClass(color?: string, shade?: string, opacity?: number): string | undefined {
  if (!color || !shade) return undefined
  const base = `bg-${color}-${shade}`
  return opacity && opacity < 100 ? `${base}/${opacity}` : base
}

export default function TailwindColorTokenInput({value, onChange}: Props) {
  const currentClass = value?.class
  const baseClass = currentClass?.replace(/\/(\d{1,3})$/, '')
  const [hex, setHex] = useState<string>(tailwindClassToHex(baseClass as string))
  const [opacity, setOpacity] = useState<number>(formatOpacity(value?.opacity))
  const [suggestions, setSuggestions] = useState<Array<{hex: string; className: string; distance: number; isValid: boolean}>>([])

  useEffect(() => {
    setHex(tailwindClassToHex(baseClass as string))
    setOpacity(formatOpacity(value?.opacity))
  }, [currentClass])

  useEffect(() => {
    if (!hex) return
    const closest = findClosestTailwindClassesWithValidity(hex, 7)
    setSuggestions(closest)
  }, [hex])

  const previewStyle = useMemo(() => ({
    backgroundColor: hex || '#ffffff',
  }), [hex])

  const handleColorChange = (color: any) => {
    const newHex = color.hex
    setHex(newHex)
  }

  const updateToken = (className: string, nextHex?: string, nextOpacity?: number) => {
    const parsed = parseTailwindClass(className)
    const token: Token = {
      hex: nextHex ?? hex,
      class: composeClass(parsed.color, parsed.shade, nextOpacity ?? opacity),
      color: parsed.color,
      shade: parsed.shade,
      opacity: nextOpacity ?? opacity,
    }
    onChange(set(token))
  }

  const handleSuggestionClick = (className: string, hexCode: string) => {
    updateToken(className, hexCode)
  }

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = formatOpacity(parseInt(e.target.value, 10))
    setOpacity(next)
    if (value?.class) {
      const parsed = parseTailwindClass(value.class)
      const base = composeClass(parsed.color, parsed.shade, next)
      if (base) updateToken(base, undefined, next)
    }
  }

  return (
    <Stack space={4}>
      <ChromePicker color={hex} onChange={handleColorChange} disableAlpha={true} />

      <Card padding={3} radius={2} shadow={1} style={previewStyle}>
        <Stack space={2}>
          <Text size={1}>Classe sélectionnée</Text>
          <Text>
            <Code>{value?.class || '—'}</Code>
            {value?.class && (
              isValidTailwindClass(value.class.replace('bg-', '').replace(/\/(\d{1,3})$/, '')) ? (
                <Badge tone="positive" style={{marginLeft: 8}}>Valide</Badge>
              ) : (
                <Badge tone="caution" style={{marginLeft: 8}}>Non disponible</Badge>
              )
            )}
          </Text>
          <Grid columns={[1, 1, 2]} gap={3}>
            <Box>
              <Text size={1}>Opacité ({opacity}%)</Text>
              <input type="range" min={0} max={100} value={opacity} onChange={handleOpacityChange} style={{width: '100%'}} />
            </Box>
          </Grid>
        </Stack>
      </Card>

      {suggestions.length > 0 && (
        <Card padding={3} radius={2} border>
          <Stack space={3}>
            <Text size={1} weight="semibold">Suggestions</Text>
            <Box style={{display: 'grid', gap: 8}}>
              {suggestions.map((sugg, idx) => (
                <Card
                  key={`${sugg.className}-${idx}`}
                  padding={2}
                  radius={1}
                  tone={sugg.isValid ? 'positive' : 'caution'}
                  style={{cursor: 'pointer'}}
                  onClick={() => handleSuggestionClick(sugg.className, sugg.hex)}
                >
                  <Stack space={2}>
                    <Text>
                      <Code>{sugg.className}</Code>
                      {!sugg.isValid && (
                        <span style={{marginLeft: 8, fontSize: 12, color: '#f59e0b'}}>⚠️ Non disponible</span>
                      )}
                    </Text>
                    <Text size={0} style={{color: 'gray'}}>Distance: {sugg.distance.toFixed(0)}</Text>
                  </Stack>
                </Card>
              ))}
            </Box>
          </Stack>
        </Card>
      )}
    </Stack>
  )
}
