import React, {useState} from 'react'
import {Box, Card, Checkbox, Code, Flex, Stack, Text} from '@sanity/ui'
import {set, unset} from 'sanity'
import {tailwindClassToHex} from '../utils/findClosestTailwindClass'
import {generateTailwindGradient} from '../utils/generateTailwindGradient'

type Props = {
  value?: string
  onChange: (patch: any) => void
}

// 'from-amber-400 via-orange-500 to-yellow-500' -> {from, via, to} en hex
function parseGradient(value?: string): {from: string; via?: string; to: string} {
  const find = (prefix: string) => {
    const match = value?.match(new RegExp(`${prefix}-([a-z]+(?:-\\d{2,3})?)`))
    return match ? tailwindClassToHex(`bg-${match[1]}`) : undefined
  }
  return {
    from: find('from') ?? '#fbbf24',
    via: find('via'),
    to: find('to') ?? '#eab308',
  }
}

export default function TailwindGradientInput({value, onChange}: Props) {
  const initial = parseGradient(value)
  const [from, setFrom] = useState(initial.from)
  const [via, setVia] = useState(initial.via ?? '#f97316')
  const [to, setTo] = useState(initial.to)
  const [useVia, setUseVia] = useState(Boolean(initial.via))

  const update = (next: {from: string; via: string; to: string; useVia: boolean}) => {
    setFrom(next.from)
    setVia(next.via)
    setTo(next.to)
    setUseVia(next.useVia)
    onChange(
      set(
        generateTailwindGradient({
          from: next.from,
          via: next.useVia ? next.via : undefined,
          to: next.to,
        }),
      ),
    )
  }

  const current = {from, via, to, useVia}
  const stops = useVia ? [from, via, to] : [from, to]

  return (
    <Stack space={4}>
      <Flex gap={4} align="center">
        <label>
          <Text size={1}>Départ</Text>
          <input type="color" value={from} onChange={(e) => update({...current, from: e.target.value})} />
        </label>
        {useVia && (
          <label>
            <Text size={1}>Milieu</Text>
            <input type="color" value={via} onChange={(e) => update({...current, via: e.target.value})} />
          </label>
        )}
        <label>
          <Text size={1}>Arrivée</Text>
          <input type="color" value={to} onChange={(e) => update({...current, to: e.target.value})} />
        </label>
        <Flex gap={2} align="center">
          <Checkbox checked={useVia} onChange={(e) => update({...current, useVia: e.currentTarget.checked})} />
          <Text size={1}>Couleur intermédiaire</Text>
        </Flex>
      </Flex>

      <Card
        radius={2}
        shadow={1}
        style={{height: 80, background: `linear-gradient(to right, ${stops.join(', ')})`}}
      />

      <Box>
        <Text size={1}>
          Classes : <Code>{value || '—'}</Code>
        </Text>
        {value && (
          <Box marginTop={2}>
            <button type="button" onClick={() => onChange(unset())}>
              Effacer
            </button>
          </Box>
        )}
      </Box>
    </Stack>
  )
}
