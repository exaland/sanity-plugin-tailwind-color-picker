// ./schemas/tailwindColor.ts
import TailwindColorPicker from '../components/TailwindColorPicker'



export default {
  name: 'backgroundColor',
  type: 'string',
  title: 'Couleur avec Tailwind CSS',
  components: {
    input: TailwindColorPicker,
  },
}
