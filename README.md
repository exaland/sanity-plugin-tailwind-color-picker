# sanity-plugin-tailwind-color-picker

🎨 Plugin Sanity v3 pour sélectionner une couleur et obtenir automatiquement la classe Tailwind CSS la plus proche (`bg-blue-500`, etc.). Ajoute suggestions triées par proximité, opacité (`/50`) et une prévisualisation.

## 🧑‍💻 Auteur

Alexandre MAGNIER — Exaland Concept

## 🔌 Installation

```bash
npm install sanity-plugin-tailwind-color-picker
```

## 🚀 Utilisation

Ce plugin expose un type de champ prêt à l’emploi `tailwindColor` (type `string`). Il stocke la classe Tailwind complète, par ex. `bg-blue-500` ou `bg-blue-500/60`.

### Dans votre `sanity.config.ts`

```ts
import {defineConfig} from 'sanity'
import tailwindColorPlugin from './plugins/sanity-plugin-tailwind-color-picker'

export default defineConfig({
  // ...
  plugins: [tailwindColorPlugin],
})
```

### Dans un schéma

```ts
import {defineField} from 'sanity'

export default defineField({
  name: 'backgroundColor',
  title: 'Couleur de fond',
  type: 'tailwindColor',
})
```

### Type “token” (objet)

Ce plugin ajoute aussi `tailwindColorToken` (type `object`) qui stocke plusieurs attributs pour des requêtes plus flexibles.

```ts
import {defineField} from 'sanity'

export default defineField({
  name: 'backgroundColorToken',
  title: 'Couleur de fond (Token)',
  type: 'tailwindColorToken',
})
```

### Dégradés

Le type `tailwindGradient` (type `string`) permet de choisir une couleur de départ, d’arrivée et, en option, une couleur intermédiaire, avec un aperçu du dégradé. Il stocke les classes Tailwind, par ex. `from-amber-400 to-yellow-500` ou `from-amber-400 via-orange-500 to-yellow-500`.

```ts
import {defineField} from 'sanity'

export default defineField({
  name: 'gradient',
  title: 'Dégradé',
  type: 'tailwindGradient',
})
```

Côté front, il suffit de combiner la valeur avec une direction :

```tsx
<div className={`bg-gradient-to-r ${doc.gradient}`} />
```

La fonction `generateTailwindGradient` est aussi exportée pour générer ces classes par code. Chaque couleur peut être un hex, une classe (`bg-amber-400`) ou un nom (`amber-400`) ; les hex sont convertis vers la classe Tailwind la plus proche.

```ts
import {generateTailwindGradient} from 'sanity-plugin-tailwind-color-picker'

generateTailwindGradient({from: 'amber-400', to: 'yellow-500'})
// 'from-amber-400 to-yellow-500'

generateTailwindGradient({from: '#fbbf24', via: 'bg-orange-500', to: '#eab308'})
// 'from-amber-400 via-orange-500 to-yellow-500'
```

> Tailwind ne génère que les classes présentes en toutes lettres dans le code source. Les valeurs venant de Sanity doivent être ajoutées à la `safelist` de votre config Tailwind (ex. motif `/^(from|via|to)-/`).

## ✨ Fonctionnalités

- Suggestions triées par validité et distance couleur.
- Opacité supportée via la syntaxe Tailwind `bg-xxx/NN` (0–100).
- Prévisualisation immédiate et bouton “Copier la classe”.
- Accessibilité basique (navigation clavier sur les suggestions).

Algorithme de correspondance: distance perceptuelle OKLab pour des résultats plus naturels.

## ⚙️ Composants

- `TailwindColorPicker`: composant d’input utilisé par défaut pour le type `tailwindColor`.
- `TailwindColorInput` et `HexToTailwindColorPicker` restent disponibles mais sont supplantés par `TailwindColorPicker`.

## 📦 Notes

- Les HEX → classes utilisent une palette complète Tailwind v3 et une distance rapide RGB. Vous pouvez adapter l’algorithme si besoin.
- Les couleurs doublonnées (ex. `neutral-50` et `zinc-50`) sont dédupliquées côté mapping HEX.

---

MIT © Alexandre MAGNIER — Exaland Concept
