import TailwindColorPicker from './components/TailwindColorPicker'
import tailwindColorToken from './schemas/tailwindColorToken'
import { definePlugin } from 'sanity'


export const tailwindColorField = {
  name: 'tailwindColor',
  title: 'Couleur (Tailwind)',
  type: 'string',
  components: {
    input: TailwindColorPicker,
  },
}


export const tailwindColorPlugin = definePlugin({
  name: 'sanity-plugin-tailwind-color-picker',
  schema: {
    types: [tailwindColorField, tailwindColorToken],
  },
})

export default tailwindColorPlugin
