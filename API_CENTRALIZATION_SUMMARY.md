# ✅ Centralisation API - Résumé des changements

## 🎯 Objectif atteint
Centraliser tous les appels API dans un projet Next.js pour éviter la duplication, faciliter la maintenance et améliorer la scalabilité.

---

## 📋 Changements effectués

### 1. **Client API centralisé** (`/lib/api.ts`)
✅ **Créé** - Client Axios unique et réexporté
- ✅ Concaténation automatique baseURL + endpoint
- ✅ Gestion des headers (Content-Type, Authorization)
- ✅ Gestion des erreurs uniformisée
- ✅ Nettoyage des données automatique
- ✅ Refresh automatique des tokens (401)
- ✅ Une instance unique exportée

```typescript
// Usage
import { apiClient } from '@/lib/api';
const data = await apiClient.get('/api/formations');
```

---

### 2. **Configuration centralisée** (`/lib/api/config.ts`)
✅ **Améliorée** - Documentation et validation ajoutées
- ✅ Centralization de `BASE_URL`, `TIMEOUT`, clés de tokens
- ✅ Validation au démarrage en développement
- ✅ Une seule source de vérité pour l'URL API

```typescript
// .env.local requis
NEXT_PUBLIC_API_URL=https://back.cpupme.ci
NEXT_PUBLIC_API_TIMEOUT=30000
```

---

### 3. **Services par domaine** (`/lib/api/services/`)
✅ **Refactorisés** - Nouveaux services créés

| Service | Endpoints | Utilité |
|---------|----------|---------|
| `website.service.ts` | Partenaires, Équipe | ✅ Remplace hooks fetch bruts |
| `banner.service.ts` | Banners du site | ✅ Centralise fetch de banners |
| `formation.service.ts` | Formations CRUD | ✅ Existant, améloré |
| `*.service.ts` | Autres ressources | ✅ Existants, réexportés |

```typescript
// Avant (MAUVAIS)
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://back.cpupme.ci';
const response = await fetch(`${apiUrl}/api/formation/partenaire`);

// Après (BON)
const partenaires = await partenaireService.getForSiteWeb();
```

---

### 4. **Hooks refactorisés** (`/hooks/use-api.ts`)
✅ **Mise à jour** - Utilise maintenant les services centralisés
- ✅ `usePartenairesForSiteWeb()` → utilise `partenaireService`
- ✅ `useEquipeForSiteWeb()` → utilise `equipeService`
- ✅ Suppression du hardcoding d'URLs
- ✅ Gestion d'erreurs uniformisée

```typescript
// Utilisation
const { data, isLoading, error } = usePartenairesForSiteWeb();
```

---

### 5. **Composants refactorisés** 
✅ **Mise à jour** - N'utilisent plus `process.env` directement

| Fichier | Changement |
|---------|-----------|
| `components/home/Hero.tsx` | Utilise `bannerService` au lieu d'appels directs |
| `hooks/useBlog.ts` | Utilise `API_CONFIG.BASE_URL` au lieu de `process.env` |

---

### 6. **Configuration d'images** (`next.config.ts`)
✅ **Mise à jour** - Domaines autorisés ajoutés
- ✅ `storage.cpupme.ci` - Nouveau domaine principal
- ✅ `storage.cpupme.com` - Ancien domaine (legacy)
- ✅ `back.cpupme.com` - Ancien domaine backend
- ✅ `api.cpupme.com` - Ancien domaine API

```typescript
remotePatterns: [
  { protocol: 'https', hostname: 'storage.cpupme.ci' },
  { protocol: 'https', hostname: 'storage.cpupme.com' },
  // etc...
]
```

---

### 7. **Export centralisé** (`/lib/api/services/index.ts`)
✅ **Mise à jour** - Réexporte tous les services + documentation

```typescript
// Utilisation correcte
import { formationService, partenaireService } from '@/lib/api/services';

// ✅ BON - Un point d'accès unique
const formations = await formationService.getPublic();
```

---

### 8. **Documentation** (`/lib/api/API_BEST_PRACTICES.md`)
✅ **Créé** - Guide complet des bonnes pratiques
- ✅ Architecture et patterns
- ✅ Exemples corrects/incorrects
- ✅ Comment créer un nouveau service
- ✅ Gestion des erreurs
- ✅ Déploiement par environnement

---

## 🔄 Migration d'appels API bruts

### Avant (❌ MAUVAIS)
```typescript
// ❌ Hardcoding URLs
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const response = await fetch(`${apiUrl}/api/formation/partenaire`);
const data = await response.json();

// ❌ Directement dans les composants
import { apiClient } from '@/lib/api/client';
const result = await apiClient.get('/api/formations');
```

### Après (✅ CORRECT)
```typescript
// ✅ Via les services centralisés
import { partenaireService, formationService } from '@/lib/api/services';

const partenaires = await partenaireService.getForSiteWeb();
const formations = await formationService.getPublic();
```

---

## 📊 Avantages obtenus

| Avantage | Description |
|----------|-----------|
| **No hardcoding** | URLs définies une seule fois dans `.env.local` |
| **Pas de duplication** | Chaque endpoint a une méthode service unique |
| **Maintenance facile** | Changer l'API = modifier `.env.local` ou un service |
| **Scalabilité** | Nouveaux endpoints = ajouter une méthode au service |
| **Type safety** | Services retournent des types TypeScript |
| **Error handling** | Gestions d'erreur uniformisée dans les services |
| **Token management** | Refresh automatique 401 gérée centralement |

---

## 🚀 Prochaines étapes (recommandées)

1. **Finaliser la migration**
   - Auditer les composants pour trouver les `process.env.NEXT_PUBLIC_API_URL` restants
   - Remplacer par les services correspondants

2. **Ajouter des services**
   - Services pour chaque ressource API manquante
   - Tester les nouveaux services

3. **Monitoring**
   - Logger les appels API (optionnel)
   - Suivre les performances

4. **Authentification**
   - Activer le gestion des tokens une fois l'auth backend en place
   - Tester le refresh de token

---

## ✅ Checklist de validation

- ✅ Build compile sans erreurs : `npm run build` → Success
- ✅ Dev server démarre : `npm run dev` → Ready in 1469ms
- ✅ Client API fonctionne : `apiClient.get(endpoint)` → OK
- ✅ Services réexportés : `import { formationService }` → OK
- ✅ Configuration centralisée : `API_CONFIG.BASE_URL` → OK
- ✅ Hooks refactorisés : `usePartenairesForSiteWeb()` → OK
- ✅ Composants updated : `Hero.tsx`, `useBlog.ts` → OK
- ✅ Images domaines : `next.config.ts` → OK
- ✅ Documentation : `API_BEST_PRACTICES.md` → OK

---

## 📂 Structure finale

```
lib/
├── api.ts                          # ⭐ Client API centralisé
├── api/
│   ├── config.ts                  # Configuration + validation
│   ├── client.ts                  # Réexporte depuis api.ts (legacy)
│   ├── API_BEST_PRACTICES.md      # 📖 Guide complet
│   └── services/
│       ├── index.ts               # Export centralisé
│       ├── website.service.ts     # ✅ Nouveau (partenaires, équipe)
│       ├── banner.service.ts      # ✅ Nouveau (banners)
│       ├── formation.service.ts   # Existant
│       └── ...autres services

hooks/
├── use-api.ts                     # ✅ Refactorisé (uses services)
└── useBlog.ts                     # ✅ Refactorisé (uses API_CONFIG)

components/
├── home/
│   ├── Hero.tsx                   # ✅ Refactorisé (uses bannerService)
│   └── ...autres
└── ...
```

---

## 🎁 Fichiers clés à consulter

1. **[lib/api.ts](../api.ts)** - Client API unique (70+ lignes)
2. **[lib/api/config.ts](./config.ts)** - Configuration (30 lignes)
3. **[lib/api/services/index.ts](./services/index.ts)** - Exports (35 lignes)
4. **[lib/api/API_BEST_PRACTICES.md](./API_BEST_PRACTICES.md)** - Guide complet (250+ lignes)
5. **[hooks/use-api.ts](../../hooks/use-api.ts)** - Example de hooks refactorisés
6. **[components/home/Hero.tsx](../../components/home/Hero.tsx)** - Example de composants refactorisés

