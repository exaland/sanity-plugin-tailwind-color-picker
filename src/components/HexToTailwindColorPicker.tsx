import React, { useState, useEffect } from 'react'
import { ChromePicker } from 'react-color'
import { Stack, Card, Text, Box, Badge } from '@sanity/ui'
import { set, unset } from 'sanity'
import {
  findClosestTailwindClass,
  findClosestTailwindClassesWithValidity,
  isValidTailwindClass,
  tailwindColors,
  bgTailwindColors,
} from '../utils/findClosestTailwindClass'
export function HexToTailwindColorPicker(props) {
  const { value, onChange } = props
  const [tailwindClass, setTailwindClass] = useState('')
  const [hex, setHex] = useState('#ffffff')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if (value) {
      const hexColor = Object.entries(bgTailwindColors).find(
        ([hexCode, className]) => className === `bg-${value}`
      )?.[0]

      if (hexColor) {
        setHex(hexColor)
        setTailwindClass(value)
      }
    } else {
      setHex('#ffffff')
      setTailwindClass('')
    }
  }, [value])

  const handleColorChange = (color) => {
    const newHex = color.hex
    if (newHex) {
      setHex(newHex)
      // Obtenir les 5 classes Tailwind les plus proches (triées par validité)
      const closest = findClosestTailwindClassesWithValidity(newHex, 5)
      setSuggestions(closest)
      setShowSuggestions(true)
      
      // Sélectionner la meilleure classe (valide si possible)
      if (closest.length > 0) {
        const bestClass = closest[0].className.replace('bg-', '')
        setTailwindClass(bestClass)
        onChange(set(bestClass))
      }
    } else {
      onChange(unset())
    }
  }

  const handleSuggestionClick = (className: string) => {
    const cleanClass = className.replace('bg-', '')
    setTailwindClass(cleanClass)
    onChange(set(cleanClass))
    setShowSuggestions(false)
  }

  return (
    <Stack space={4}>
      <ChromePicker
        color={hex}
        onChange={handleColorChange}
        disableAlpha
      />

      <Box>
        <Text>
          Classe Tailwind sélectionnée :{' '}
          <strong style={{ fontFamily: 'monospace' }}>
            {tailwindClass || 'Aucune'}
            {tailwindClass && !isValidTailwindClass(tailwindClass) && (
              <Badge tone="caution" style={{ marginLeft: '8px' }}>
                Non disponible
              </Badge>
            )}
            {tailwindClass && isValidTailwindClass(tailwindClass) && (
              <Badge tone="positive" style={{ marginLeft: '8px' }}>
                Valide
              </Badge>
            )}
          </strong>
        </Text>
      </Box>

      {showSuggestions && suggestions.length > 0 && (
        <Card padding={3} radius={2} border>
          <Stack space={3}>
            <Text size={0} weight="semibold">
              Suggestions (triées par validité) :
            </Text>
            <Stack space={2}>
              {suggestions.map((suggestion, idx) => (
                <Card
                  key={idx}
                  padding={2}
                  radius={1}
                  tone={suggestion.isValid ? 'positive' : 'caution'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSuggestionClick(suggestion.className)}
                >
                  <Stack space={1}>
                    <Text>
                      <strong style={{ fontFamily: 'monospace' }}>
                        {suggestion.className}
                      </strong>
                      {!suggestion.isValid && (
                        <span style={{ marginLeft: '8px', fontSize: '12px', color: '#f59e0b' }}>
                          ⚠️ Non disponible
                        </span>
                      )}
                    </Text>
                    <Text size={0} style={{ color: 'gray' }}>
                      Distance: {suggestion.distance.toFixed(0)}
                    </Text>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Card>
      )}

      {hex && (
        <Card
          padding={2}
          radius={2}
          shadow={1}
          style={{ backgroundColor: hex, color: '#fff' }}
        >
          <Text>Prévisualisation couleur</Text>
        </Card>
      )}
    </Stack>
  )
}
