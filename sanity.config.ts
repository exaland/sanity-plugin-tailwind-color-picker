import { defineConfig } from 'sanity'
import { tailwindColorField } from './plugins/sanity-plugin-tailwind-color-picker/src'
import { GenerateRandomCode } from './actions/actions'
export default defineConfig({
  // ...
  plugins: [
    // autres plugins éventuels
  ],
  document: {
    actions: [GenerateRandomCode]
  }
  schema: {
    types: [
      {
        name: 'tailwindColor',
        ...tailwindColorField,
      },
      // ou bien l’utiliser directement dans un document
    ]
  }
})
