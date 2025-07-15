// ./schemas/tailwindColor.ts
import { HexToTailwindColorPicker } from '../components/HexToTailwindColorPicker'
import TailwindColorInput from '../components/TailwindColorInput'



export default {
  name: 'backgroundColor',
  type: 'string',
  title: 'Couleur avec Tailwind CSS',
  components: {
    input: TailwindColorInput,
  },
}
