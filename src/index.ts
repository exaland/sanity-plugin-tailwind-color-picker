// import { HexToTailwindColorPicker } from './components/HexToTailwindColorPicker'
import TailwindColorInput  from './components/TailwindColorInput'
import { definePlugin } from 'sanity'


export const tailwindColorField = {
  name: 'tailwindColor',
  title: 'Couleur (Tailwind)',
  type: 'string',
  components: {
    input: TailwindColorInput,
  },
}


export const tailwindColorPlugin = definePlugin({
  name: 'sanity-plugin-tailwind-color-picker',
  schema: {
    types: [tailwindColorField],
  },
})

export default tailwindColorPlugin
