
# sanity-plugin-tailwind-color-picker

[](https://github.com/exaland/sanity-plugin-tailwind-color-picker#sanity-plugin-tailwind-color-picker)

🎨 Plugin de sélection de couleur pour Sanity v3 qui convertit une couleur HEX en la classe Tailwind CSS la plus proche (`bg-blue-400`, etc.), facilitant ainsi la synchronisation avec votre design system Tailwind.

## 🧑‍💻 Auteur

[](https://github.com/exaland/sanity-plugin-tailwind-color-picker#-auteur)

Alexandre MAGNIER - Exaland Concept
----------

```md
# sanity-plugin-tailwind-color-picker

Un plugin Sanity pour sélectionner une couleur via un `ChromePicker` (comme dans Figma) et obtenir automatiquement la classe Tailwind CSS la plus proche (`bg-blue-500`, `bg-red-200`, etc).

## 🚀 Installation

```bash
npm install sanity-plugin-tailwind-color-picker
# ou
yarn add sanity-plugin-tailwind-color-picker

```

## 🔌 Utilisation

Ajoute le plugin dans ton fichier `sanity.config.ts` ou `sanity.config.js` :

```ts
import { tailwindColorPlugin } from 'sanity-plugin-tailwind-color-picker'

export default defineConfig({
  // ...
  plugins: [tailwindColorPlugin()],
})

```

## 🧩 Définir un champ de couleur Tailwind dans ton schéma

Utilise le type `tailwindColor` dans tes types de documents :

```ts
{
  name: 'backgroundColor',
  title: 'Couleur de fond (Tailwind)',
  type: 'tailwindColor',
}
```

## 🎯 Tri des couleurs non disponibles

Le plugin trie automatiquement les suggestions de couleurs Tailwind en **priorisant les couleurs valides** (disponibles dans Tailwind CSS) par rapport aux couleurs non disponibles.

### Comportement :

1. **Couleurs valides d'abord** : Les classes comme `bg-blue-500`, `bg-violet-800` sont prioritaires si elles correspondent à Tailwind CSS officiel
2. **Couleurs non disponibles après** : Si aucune couleur valide ne correspond, le plugin suggère les plus proches, même si elles n'existent pas dans Tailwind (`bg-violet-800` ne serait affichée que si violet-800 n'existe pas en tant que classe valide)
3. **Indication visuelle** : Un badge ⚠️ indique les couleurs non disponibles

### Exemple :

```typescript
// Couleur sélectionnée : #5b21b6 (violet-800)

// Suggestions affichées (triées) :
1. bg-violet-800         ✓ Valide   (distance: 0)
2. bg-indigo-800         ✓ Valide   (distance: 142)
3. bg-purple-800         ✓ Valide   (distance: 284)
```
  type: 'tailwindColor', // 🟡 ce type est défini par le plugin
}

```

## ✨ Fonctionnement

-   Tu sélectionnes une couleur avec un `ChromePicker`.
    
-   Elle est automatiquement convertie en classe Tailwind proche (`bg-indigo-500`, `bg-gray-100`, etc).
    
-   La valeur enregistrée dans Sanity est une `string` comme `bg-blue-500`.
    

## 🧠 Personnalisation

Tu peux adapter le comportement :

-   Modifier la liste des couleurs Tailwind dans `findClosestTailwindClass.js`
    
-   Afficher un `text` preview ou un échantillon de couleur (`Card` avec `backgroundColor`)
    

## 📦 Contenu du plugin

-   `tailwindColorPlugin.ts` : enregistre le type personnalisé
    
-   `TailwindColorInput.tsx` : composant d'entrée avec ChromePicker
    
-   `utils/findClosestTailwindClass.ts` : utilitaire pour convertir HEX → classe Tailwind
    

## ✅ Exemple de valeur enregistrée

```json
{
  "_type": "myDoc",
  "backgroundColor": "bg-green-400"
}

```

## 🛠 Dépendances

-   [`react-color`](https://github.com/casesandberg/react-color)
    
-   [`@sanity/ui`](https://www.sanity.io/ui)
    

```

```