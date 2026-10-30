import TailwindColorPicker from './components/TailwindColorPicker'
import tailwindColorToken from './schemas/tailwindColorToken'
import TailwindGradientInput from './components/TailwindGradientInput'
import { definePlugin } from 'sanity'

export { generateTailwindGradient } from './utils/generateTailwindGradient'
export type { TailwindGradientOptions } from './utils/generateTailwindGradient'


export const tailwindColorField = {
  name: 'tailwindColor',
  title: 'Couleur (Tailwind)',
  type: 'string',
  components: {
    input: TailwindColorPicker,
  },
}


export const tailwindGradientField = {
  name: 'tailwindGradient',
  title: 'Dégradé (Tailwind)',
  type: 'string',
  components: {
    input: TailwindGradientInput,
  },
}

export const tailwindColorPlugin = definePlugin({
  name: 'sanity-plugin-tailwind-color-picker',
  schema: {
    types: [tailwindColorField, tailwindColorToken, tailwindGradientField],
  },
})

export default tailwindColorPlugin
