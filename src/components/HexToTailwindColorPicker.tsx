import React, { useState, useEffect } from 'react'
import { ChromePicker } from 'react-color'
import { Stack, Card, Text, Box } from '@sanity/ui'
import { set, unset } from 'sanity'



// Fonction pour convertir hex en RGB
function hexToRgb(hex) {
  const sanitizedHex = hex.replace('#', '')
  const bigint = parseInt(sanitizedHex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return { r, g, b }
}

// Calculer la distance Euclidienne entre deux couleurs RGB
function colorDistance(c1, c2) {
  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  )
}

// Trouver la classe Tailwind la plus proche
function findClosestTailwindClass(hex) {
  const rgbColor = hexToRgb(hex)
  let minDistance = Infinity
  let closestClass = ''
  for (const [hexCode, className] of Object.entries(tailwindColors)) {
    const rgb = hexToRgb(hexCode)
    const dist = colorDistance(rgbColor, rgb)
    if (dist < minDistance) {
      minDistance = dist
      closestClass = className
    }
  }
  return closestClass
}
export function HexToTailwindColorPicker(props) {
  const { value, onChange } = props
  const [tailwindClass, setTailwindClass] = useState('')
  const [hex, setHex] = useState('#ffffff')

  useEffect(() => {
    if (value) {
      const hexColor = Object.entries(tailwindColors).find(
        ([hexCode, className]) => className === value
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
      const closestClass = findClosestTailwindClass(newHex)
      setTailwindClass(closestClass)
      setHex(newHex)
      onChange(set(closestClass)) // <== ici on envoie directement "blue-500", etc.
    } else {
      onChange(unset())
    }
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
          <strong style={{ fontFamily: 'monospace' }}>{tailwindClass || 'Aucune'}</strong>
        </Text>
      </Box>

      {hex && (
        <Card
          padding={2}
          radius={2}
          shadow={1}
          style={{ backgroundColor: hex, color: '#000' }}
        >
          <Text>Prévisualisation couleur</Text>
        </Card>
      )}
    </Stack>
  )
}
