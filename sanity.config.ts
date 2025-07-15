import { defineConfig } from 'sanity'
import { tailwindColorField } from './plugins/sanity-plugin-tailwind-color-picker/src'

export default defineConfig({
  // ...
  plugins: [
    // autres plugins éventuels
  ],
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
