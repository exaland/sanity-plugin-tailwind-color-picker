import React from 'react'
import {Stack, Text, Box, Card} from '@sanity/ui'
import {ChromePicker, ColorResult} from 'react-color'
import {set} from 'sanity'
import {findClosestTailwindClass, tailwindClassToHex} from '../utils/findClosestTailwindClass'

type Props = {
  value?: string
  onChange: (patch: any) => void
}

export default function TailwindColorInput(props: Props) {
  const { value, onChange } = props

  const [hex, setHex] = React.useState(tailwindClassToHex(value ?? ''))

const handleColorChange = (color: ColorResult) => {
  const hex = color.hex
  setHex(hex)

  const closest = findClosestTailwindClass(hex)
  onChange(set(closest))
}

const handleChangecolorComplete = (color: ColorResult) => {
  const hex = color.hex
  setHex(hex)
}


  

  return (
    <Stack space={3}>
        <ChromePicker
          color={tailwindClassToHex(value ?? '')}
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
