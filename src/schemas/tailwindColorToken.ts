import TailwindColorTokenInput from '../components/TailwindColorTokenInput'

export default {
  name: 'tailwindColorToken',
  title: 'Couleur (Token Tailwind)',
  type: 'object',
  components: {
    input: TailwindColorTokenInput,
  },
  fields: [
    { name: 'hex', type: 'string', title: 'HEX' },
    { name: 'class', type: 'string', title: 'Classe Tailwind' },
    { name: 'color', type: 'string', title: 'Couleur' },
    { name: 'shade', type: 'string', title: 'Nuance' },
    { name: 'opacity', type: 'number', title: 'Opacité', validation: (Rule: any) => Rule.min(0).max(100) },
  ],
}
