# Guide de développement CPU Academy

## 🎯 Vue d'ensemble

Ce document fournit des directives techniques pour le développement du projet CPU Academy.

## 🏗️ Architecture

### App Router (Next.js 16)
Le projet utilise le nouveau App Router de Next.js 16 avec Turbopack pour un hot-reload ultra-rapide.

**Conventions de routing :**
- `app/page.tsx` → `/`
- `app/catalogue/page.tsx` → `/catalogue`
- `app/formations/[slug]/page.tsx` → `/formations/:slug` (paramètre dynamique)

### Server Components vs Client Components

**Server Components** (par défaut)
- Pas besoin de "use client"
- Utilisés pour : fetching data, SEO, performance
- Exemples : pages, layouts, composants statiques

**Client Components** (avec "use client")
- Nécessitent "use client" en haut du fichier
- Utilisés pour : interactivité, hooks, événements
- Exemples : formulaires, boutons interactifs, composants avec useState/useEffect

```tsx
// Server Component (par défaut)
export default function FormationsList({ formations }) {
  return <div>...</div>;
}

// Client Component
"use client";
import { useState } from "react";

export function SearchForm() {
  const [query, setQuery] = useState("");
  // ...
}
```

## 📦 Composants UI

### Utilisation des composants de base

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// Exemple d'utilisation
<Button variant="primary" size="lg">
  S'inscrire
</Button>

<Badge variant="certifiant">Certifiant</Badge>
```

### Variantes disponibles

**Button :**
- `default` : Gris foncé (défaut)
- `primary` : Bleu (CTA principal)
- `secondary` : Gris clair
- `outline` : Bordure
- `ghost` : Transparent
- `link` : Style lien
- `destructive` : Rouge (danger)

**Badge :**
- `default`, `secondary`, `outline`, `success`, `warning`, `info`
- `certifiant` (purple), `gratuit` (vert), `live` (rouge), `presentiel` (bleu)

## 🎨 Styling avec Tailwind

### Classes utilitaires courantes

```tsx
// Conteneur responsive
<div className="container mx-auto px-4">

// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Flexbox
<div className="flex items-center justify-between">

// Espacement
<div className="py-16 lg:py-24"> // Padding vertical responsive
<div className="mb-4"> // Margin bottom

// Texte
<h1 className="text-3xl lg:text-4xl font-bold">
<p className="text-slate-600">

// Hover et transitions
<button className="hover:bg-slate-100 transition-colors">
```

### Variables CSS personnalisées

Définies dans `app/globals.css` :

```css
:root {
  --primary: 217 91% 60%;      /* Bleu */
  --success: 142 76% 36%;      /* Vert */
  --warning: 38 92% 50%;       /* Orange */
  --danger: 0 84% 60%;         /* Rouge */
}
```

## 📝 Types TypeScript

### Import des types

```tsx
import type { Formation, Expert, Utilisateur } from "@/types";
import type { Metadata } from "next";
```

### Définition de métadonnées (SEO)

```tsx
export const metadata: Metadata = {
  title: "Page titre - CPU Academy",
  description: "Description pour SEO",
  keywords: ["formation", "PME", "Côte d'Ivoire"],
};
```

### Typage des props

```tsx
interface FormationCardProps {
  formation: Formation;
  variant?: "default" | "compact";
  onSelect?: (id: string) => void;
}

export function FormationCard({ formation, variant = "default", onSelect }: FormationCardProps) {
  // ...
}
```

## 🔄 Gestion des données

### Données statiques (constants.ts)

```tsx
import { parcours, regions, certifications, objectifsMetier } from "@/data/constants";

// Utilisation
{regions.map(region => (
  <option key={region.id} value={region.id}>
    {region.nom}
  </option>
))}
```

### Fetching de données (Server Components)

```tsx
// app/formations/page.tsx
async function getFormations() {
  const res = await fetch('https://api.cpuacademy.ci/formations', {
    cache: 'force-cache' // ou 'no-store' pour data dynamique
  });
  return res.json();
}

export default async function FormationsPage() {
  const formations = await getFormations();
  return <FormationsList formations={formations} />;
}
```

### State management (Client Components)

```tsx
"use client";
import { useState, useEffect } from "react";

export function SearchResults() {
  const [results, setResults] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Fetch data
  }, []);
  
  return <div>...</div>;
}
```

## 🎯 Patterns courants

### Card de formation

```tsx
<Card className="hover:shadow-lg transition-shadow">
  <CardHeader>
    <div className="flex items-start justify-between mb-2">
      <Badge variant="certifiant">Certifiant</Badge>
      <Badge variant="gratuit">Gratuit</Badge>
    </div>
    <CardTitle>{formation.titre}</CardTitle>
    <CardDescription>
      {formation.expert.nom} • {formation.region} • {formation.duree}h
    </CardDescription>
  </CardHeader>
  <CardContent>
    <ul className="space-y-2 mb-4">
      {formation.objectifs.slice(0, 2).map((obj, i) => (
        <li key={i} className="text-sm">✓ {obj}</li>
      ))}
    </ul>
    <Button variant="outline" className="w-full">
      Voir la fiche
    </Button>
  </CardContent>
</Card>
```

### Hero avec recherche

```tsx
<section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
  <div className="container mx-auto px-4">
    <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-center">
      Titre principal
    </h1>
    <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto">
      {/* Formulaire de recherche */}
    </div>
  </div>
</section>
```

### Navigation avec links

```tsx
import Link from "next/link";

<Link href="/catalogue" className="hover:text-blue-600 transition-colors">
  Catalogue
</Link>

// Avec Button
<Button asChild>
  <Link href="/inscription">S'inscrire</Link>
</Button>
```

## 🚀 Commandes utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Lancer en production
npm start

# Lint
npm run lint

# Installer une nouvelle dépendance
npm install [package]

# Désinstaller
npm uninstall [package]
```

## 🐛 Debugging

### Console logs
```tsx
console.log('Debug:', data);
console.error('Erreur:', error);
```

### React DevTools
Installer l'extension React DevTools sur Chrome/Firefox pour inspecter les composants.

### Next.js Error Overlay
En développement, les erreurs s'affichent automatiquement avec stack trace.

## ✅ Checklist avant commit

- [ ] Code compilé sans erreurs TypeScript
- [ ] Pas d'erreurs ESLint
- [ ] Composants testés dans le navigateur
- [ ] Responsive vérifié (mobile, tablet, desktop)
- [ ] Imports organisés et inutilisés supprimés
- [ ] Variables CSS utilisées correctement
- [ ] Types TypeScript corrects

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)

---

**Note** : Ce document est en constante évolution. Mettez-le à jour au fur et à mesure des nouvelles patterns et conventions adoptés.
