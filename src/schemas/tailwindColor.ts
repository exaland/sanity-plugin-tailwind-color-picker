// ./schemas/tailwindColor.ts
import { HexToTailwindColorPicker } from './components/HexToTailwindColorPicker'

export default {
  name: 'tailwindColor',
  type: 'string',
  title: 'Couleur avec Tailwind CSS',
  components: {
    input: HexToTailwindColorPicker,
  },
}
