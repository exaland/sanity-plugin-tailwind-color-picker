import React, {useEffect, useMemo, useRef, useState} from 'react'
import {ChromePicker} from 'react-color'
import {Badge, Box, Button, Card, Code, Grid, Stack, Text} from '@sanity/ui'
import {set} from 'sanity'
import {
  findClosestTailwindClassesWithValidity,
  isValidTailwindClass,
  tailwindClassToHex,
} from '../utils/findClosestTailwindClass'

type Props = {
  value?: string
  onChange: (patch: any) => void
}

function parseOpacity(className?: string): number {
  if (!className) return 100
  const match = className.match(/\/(\d{1,3})$/)
  if (match) {
    const v = parseInt(match[1], 10)
    return Math.max(0, Math.min(100, v))
  }
  return 100
}

function applyOpacity(className: string, opacity: number): string {
  const base = className.replace(/\/(\d{1,3})$/, '')
  return opacity < 100 ? `${base}/${opacity}` : base
}

export default function TailwindColorPicker({value, onChange}: Props) {
  const [hex, setHex] = useState<string>(tailwindClassToHex((value ?? '').replace(/\/(\d{1,3})$/, '')))
  const [opacity, setOpacity] = useState<number>(parseOpacity(value))
  const [selectedClass, setSelectedClass] = useState<string>(value ?? '')
  const [suggestions, setSuggestions] = useState<Array<{hex: string; className: string; distance: number; isValid: boolean}>>([])
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Sync depuis la valeur externe
    setHex(tailwindClassToHex((value ?? '').replace(/\/(\d{1,3})$/, '')))
    setOpacity(parseOpacity(value))
    setSelectedClass(value ?? '')
  }, [value])

  // Met à jour les suggestions quand le hex change
  useEffect(() => {
    if (!hex) return
    const closest = findClosestTailwindClassesWithValidity(hex, 7)
    setSuggestions(closest)
    setShowSuggestions(true)
  }, [hex])

  const previewStyle = useMemo(() => ({
    backgroundColor: hex || '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }), [hex])

  const handleColorChange = (color: any) => {
    const newHex = color.hex
    setHex(newHex)
    // La classe sélectionnée sera mise à jour via suggestions
  }

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = parseInt(e.target.value, 10)
    setOpacity(next)
    if (selectedClass) {
      const withOpacity = applyOpacity(selectedClass, next)
      setSelectedClass(withOpacity)
      onChange(set(withOpacity))
    }
  }

  const handleSuggestionClick = (className: string) => {
    const next = applyOpacity(className, opacity)
    setSelectedClass(next)
    onChange(set(next))
    setShowSuggestions(false)
  }

  const handleSuggestionKeyDown = (evt: React.KeyboardEvent<HTMLDivElement>, className: string) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault()
      handleSuggestionClick(className)
    }
  }

  const copyToClipboard = async () => {
    if (!selectedClass) return
    try {
      await navigator.clipboard.writeText(selectedClass)
    } catch {
      // ignore
    }
  }

  return (
    <Stack space={4}>
      <ChromePicker color={hex} onChange={handleColorChange} disableAlpha={true} />

      <Card padding={3} radius={2} shadow={1} style={previewStyle}>
        <Stack space={3}>
          <Text size={1}>Prévisualisation</Text>
          <Box style={{width: '100%', height: 80, borderRadius: 8}} />
        </Stack>
        <Stack space={2}>
          <Text size={1}>
            Classe sélectionnée :{' '}
            <Code>{selectedClass || '—'}</Code>
            {selectedClass && (
              isValidTailwindClass(selectedClass.replace('bg-', '').replace(/\/(\d{1,3})$/, '')) ? (
                <Badge tone="positive" style={{marginLeft: 8}}>Valide</Badge>
              ) : (
                <Badge tone="caution" style={{marginLeft: 8}}>Non disponible</Badge>
              )
            )}
          </Text>
          <Grid columns={[1, 1, 2]} gap={3}>
            <Box>
              <Text size={1}>Opacité ({opacity}%)</Text>
              <input
                type="range"
                min={0}
                max={100}
                value={opacity}
                onChange={handleOpacityChange}
                aria-label="Opacité de la couleur"
                style={{width: '100%'}}
              />
            </Box>
            <Box style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
              <Button text="Copier la classe" onClick={copyToClipboard} mode="ghost" />
            </Box>
          </Grid>
        </Stack>
      </Card>

      {showSuggestions && suggestions.length > 0 && (
        <Card padding={3} radius={2} border>
          <Stack space={3}>
            <Text size={1} weight="semibold">Suggestions (proximité perceptuelle)</Text>
            <Box
              ref={listRef}
              role="listbox"
              aria-label="Suggestions de classes Tailwind"
              style={{display: 'grid', gap: 8}}
            >
              {suggestions.map((sugg, idx) => (
                <Card
                  key={`${sugg.className}-${idx}`}
                  padding={2}
                  radius={1}
                  role="option"
                  tabIndex={0}
                  tone={sugg.isValid ? 'positive' : 'caution'}
                  onClick={() => handleSuggestionClick(sugg.className)}
                  onKeyDown={(e) => handleSuggestionKeyDown(e, sugg.className)}
                  style={{cursor: 'pointer'}}
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
