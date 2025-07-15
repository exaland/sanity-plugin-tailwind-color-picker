import React from 'react'
import { Stack, Text, Box, Card } from '@sanity/ui'
import { ChromePicker } from 'react-color'
import { set, unset } from 'sanity'
import { hexToRgb, findClosestTailwindClass, tailwindClassToHex } from '../utils/findClosestTailwindClass' // sépare tes utilitaires si besoin

export default function TailwindColorInput(props) {
  const { value, onChange } = props

    const [hex, setHex] = React.useState(tailwindClassToHex(value))

const handleColorChange = (color) => {
  const hex = color.hex
  console.log('Nouvelle couleur HEX sélectionnée:', hex)
    setHex(hex)

  const closest = findClosestTailwindClass(hex)
  console.log('Classe Tailwind la plus proche:', closest)

    setTimeout(() => {
        onChange(set(closest)) // Envoie la classe Tailwind
    }, 0)   
}

const handleChangecolorComplete = (color) => {
  const hex = color.hex
  console.log('Nouvelle couleur HEX sélectionnée:', hex)
  setHex(hex)   
}


  

  return (
    <Stack space={3}>
        <ChromePicker
            color={tailwindClassToHex(value)}
            onChange={handleColorChange}
            onChangeComplete={handleChangecolorComplete}
            disableAlpha
        />
      <Box>
        <Text>
          Classe Tailwind sélectionnée :{' '}
          <strong style={{ fontFamily: 'monospace' }}>{value || 'Aucune'}</strong>
        </Text>
      </Box>
      {value && (
        console.log('Prévisualisation de la couleur'),
        console.log('Valeur actuelle:', value),
        <Card
          padding={3}
          radius={2}
          style={{ backgroundColor: tailwindClassToHex(value) }}
        >
            <Text>Prévisualisation couleur</Text>
            <Box
              style={{
                width: '100%',
                height: '100px',
                backgroundColor: hex ? hex : '#fff',
              }}
            />
        </Card>
      )}
    </Stack>
  )
}
