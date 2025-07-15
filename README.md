# sanity-plugin-tailwind-color-picker

🎨 Plugin de sélection de couleur pour Sanity v3 qui convertit une couleur HEX en la classe Tailwind CSS la plus proche (`bg-blue-400`, etc.), facilitant ainsi la synchronisation avec votre design system Tailwind.

## 🧑‍💻 Auteur

Alexandre MAGNIER - Exaland Concept

## 🔌 Installation

```bash
npm install sanity-plugin-tailwind-color-picker
````

🚀 Utilisation
Intégrez le composant HexToTailwindColorPicker dans votre schéma ou votre plugin personnalisé pour permettre aux utilisateurs de choisir une couleur et d’obtenir automatiquement la classe Tailwind la plus adaptée.

Exemple d’intégration dans un schéma Sanity
```
import { defineField } from 'sanity'
import { HexToTailwindColorPicker } from 'sanity-plugin-tailwind-color-picker'

export default defineField({
  name: 'backgroundColor',
  title: 'Couleur de fond',
  type: 'object',
  components: {
    input: HexToTailwindColorPicker,
  },
  options: {
    // options supplémentaires si nécessaire
  }
})
```
