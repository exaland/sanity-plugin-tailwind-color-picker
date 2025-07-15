import { defineConfig } from 'sanity'
import { tailwindColorField } from './src'

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
