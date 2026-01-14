# CPU Academy - Plateforme de Formation

## 📋 Description

CPU Academy est une plateforme de formation en ligne dédiée aux PME ivoiriennes. Elle offre des formations pratiques, certifiantes et ancrées dans la réalité du terrain.

## 🚀 Fonctionnalités principales

### 1. **Écran d'accueil (Vitrine)**
- Hero avec recherche rapide (mot-clé, objectif, région)
- 6 parcours recommandés
- Section experts
- Carte des régions
- Certifications disponibles
- Liens de navigation et passerelles vers modules

### 2. **Catalogue des formations**
- Filtres avancés (compétence, objectif, module, filière, région, niveau, format, durée, prix, expert)
- Affichage en cartes avec badges
- Recherche et sauvegarde de recherches

### 3. **Fiche formation**
- Informations complètes (objectifs, programme, expert, certification, avis)
- CTA d'inscription avec gating (SSO, prérequis)
- Passerelles vers actions (AO, Marketplace, Financement, etc.)

### 4. **Espace cours**
- Lecteur vidéo et contenus
- Progression et chapitres
- Quiz et devoirs
- Certification

### 5. **Espace Entreprise**
- Dashboard RH avec KPIs
- Gestion collaborateurs
- Attribution de parcours
- Suivi et reporting

### 6. **Dashboard Formateur**
- Création de formations
- Gestion cohortes et sessions
- Évaluations
- Revenus

## 🛠️ Stack technique

- **Framework**: Next.js 16 (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS v4
- **Composants UI**: Radix UI (style shadcn/ui)
- **Icônes**: Lucide React
- **Fonts**: Inter

## 📁 Structure du projet

```
cpu_academy/
├── app/                      # App Router Next.js
│   ├── layout.tsx           # Layout principal avec Navbar/Footer
│   ├── page.tsx             # Page d'accueil
│   ├── globals.css          # Styles globaux
│   ├── catalogue/           # Page catalogue
│   ├── parcours/            # Pages parcours
│   ├── certifications/      # Pages certifications
│   ├── experts/             # Pages experts
│   ├── regions/             # Pages régions
│   ├── entreprises/         # Espace entreprise
│   ├── ressources/          # Ressources
│   └── support/             # Support
│
├── components/              # Composants réutilisables
│   ├── ui/                  # Composants UI de base
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   └── label.tsx
│   ├── layout/              # Composants layout
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── home/                # Composants page d'accueil
│       ├── Hero.tsx
│       ├── ParcoursSection.tsx
│       ├── StatsSection.tsx
│       └── CertificationsSection.tsx
│
├── types/                   # Types TypeScript
│   └── index.ts            # Types: Formation, Expert, User, etc.
│
├── data/                    # Données et constantes
│   └── constants.ts        # Parcours, régions, certifications
│
├── lib/                     # Utilitaires
│   └── utils.ts            # Fonction cn() pour classes CSS
│
├── hooks/                   # Hooks React personnalisés
│
└── public/                  # Assets statiques
```

## 🎨 Types principaux

### Formation
```typescript
interface Formation {
  id: string;
  titre: string;
  resume: string;
  objectifs: string[];
  competences: string[];
  niveau: "Débutant" | "Intermédiaire" | "Avancé";
  format: "Vidéo" | "Live" | "Présentiel" | "Hybride";
  duree: number;
  expertId: string;
  certifiant: boolean;
  gratuit: boolean;
  chapitres: Chapitre[];
  // ...
}
```

### Expert
```typescript
interface Expert {
  id: string;
  nom: string;
  prenom: string;
  photo: string;
  bio: string;
  domaines: string[];
  region: string;
  // ...
}
```

### Parcours
```typescript
type ParcoursType = 
  | "Accès Marchés (AO)"
  | "Vente & Marketplace"
  | "Financement & Bancabilité"
  | "Production++ (Qualité, certif, PI)"
  | "Pilotage & Data"
  | "Leadership & RH";
```

## 🎯 Modules liés (Passerelles)

- **AO** : Accès Marchés (préparation soumissions)
- **Marketplace** : Vente en ligne
- **Financement** : Demandes de crédit
- **Incubateur** : Production++
- **Data** : KPI et tableaux de bord
- **Événements** : Networking et webinaires
- **Affiliation** : Programme partenaires

## 🚦 Installation et démarrage

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build production
npm run build

# Lancer en production
npm start
```

Le projet sera accessible sur [http://localhost:3000](http://localhost:3000)

## 🔑 Fonctionnalités à implémenter

### Priorité haute
- [ ] Page catalogue avec filtres complets
- [ ] Fiche détaillée de formation
- [ ] Système d'authentification SSO
- [ ] Espace apprenant avec progression
- [ ] Système de paiement

### Priorité moyenne
- [ ] Espace entreprise complet
- [ ] Dashboard formateur
- [ ] Système de certification
- [ ] Gestion des sessions live/présentiel
- [ ] Check-in QR code

### Priorité basse
- [ ] Système de recommandation
- [ ] Analytics avancés
- [ ] Application mobile
- [ ] API publique

## 🌈 Charte graphique

### Couleurs principales
- **Primary**: Bleu #2563EB (pour CTAs et éléments importants)
- **Success**: Vert #16A34A (formations gratuites, succès)
- **Warning**: Orange #F59E0B (alertes)
- **Danger**: Rouge #EF4444 (erreurs)
- **Purple**: #A855F7 (certifications)

### Badges de formation
- **Certifiant**: Badge purple
- **Gratuit**: Badge vert
- **Live**: Badge rouge
- **Présentiel**: Badge bleu

## 📝 Convention de code

- Utiliser TypeScript strict
- Composants fonctionnels avec hooks
- "use client" pour composants interactifs
- Nommage : PascalCase pour composants, camelCase pour variables
- Imports organisés (React, Next, UI, lib, types, data)

## 🤝 Contribution

Ce projet est en développement actif. Pour contribuer :
1. Créer une branche feature
2. Développer et tester
3. Soumettre une pull request

## 📄 Licence

Propriétaire - CPU Academy © 2026

---

**Contact** : contact@cpuacademy.ci
**Site web** : https://cpuacademy.ci (à venir)
