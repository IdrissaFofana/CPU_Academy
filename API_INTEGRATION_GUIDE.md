# Configuration de l'API pour CPU Academy

## ⚠️ STATUT D'INTÉGRATION

### Authentification - EN ATTENTE ❌

**L'authentification ne sera PAS intégrée pour le moment.**

- L'API actuelle est réservée aux super admins uniquement
- Le système d'authentification frontend sera livré ultérieurement par l'équipe backend
- Les fichiers sont prêts mais ne doivent pas être utilisés :
  - ❌ `contexts/AuthContext.tsx` - Ne pas utiliser
  - ❌ `lib/api/services/auth.service.ts` - Ne pas utiliser
  - ❌ `hooks/useAuth` - Ne pas utiliser

### Services disponibles - PRÊTS ✅

Les autres services API sont prêts à être utilisés :
- ✅ Formations (formationService)
- ✅ Catégories (categoryService)
- ✅ Utilisateurs (userService) - CRUD seulement, pas d'auth

---

## 📁 Structure créée

```
lib/api/
├── config.ts              # Configuration et endpoints
├── client.ts              # Client Axios avec interceptors
├── types.ts               # Types TypeScript générés du Swagger
└── services/
    ├── index.ts           # Export centralisé
    ├── auth.service.ts    # Service d'authentification
    ├── formation.service.ts
    ├── user.service.ts
    └── category.service.ts

contexts/
└── AuthContext.tsx        # Context React pour l'authentification

hooks/
└── useFormations.ts       # Hooks pour les formations
```

## 🔧 Configuration

### Variables d'environnement (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_TOKEN_KEY=cpu_access_token
NEXT_PUBLIC_REFRESH_TOKEN_KEY=cpu_refresh_token
```

## 🚀 Utilisation

### ❌ 1. Authentification - EN ATTENTE

**Ne pas utiliser pour le moment.** L'authentification sera intégrée après la livraison du système frontend.

~~```typescript
// NE PAS UTILISER
import { authService } from '@/lib/api/services';
import { useAuth } from '@/contexts/AuthContext';
```~~

### ✅ 2. Formations - DISPONIBLE

```typescript
import { useFormations, useFormation } from '@/hooks/useFormations';

// Liste de formations
function FormationsList() {
  const { formations, isLoading, error } = useFormations({
    page: 1,
    limit: 10,
    search: 'marketing',
    featured: true
  });
  
  // ...
}

// Une formation
function FormationDetail({ id }: { id: string }) {
  const { formation, isLoading } = useFormation(id);
  
  // ...
}
```

### ✅ 3. Services directs - DISPONIBLE

```typescript
import { formationService, categoryService } from '@/lib/api/services';

// Récupérer les formations
const formations = await formationService.getAll({
  status: 'published',
  featured: true
});

// Récupérer les catégories
const categories = await categoryService.getAll();
```

## 🔐 Fonctionnalités

### Client API (lib/api/client.ts) - ✅ PRÊT

- ✅ **Auto-refresh token** : Prêt mais non utilisé pour le moment
- ✅ **Interceptors** : Configuration prête
- ✅ **Gestion d'erreurs** : Prête (redirect désactivé)
- ✅ **Types TypeScript** : Tous les endpoints sont typés

### Services disponibles

- ❌ **authService** : EN ATTENTE - Réservé super admin uniquement
- ✅ **formationService** : DISPONIBLE - CRUD formations, publish, archive
- ✅ **userService** : DISPONIBLE - CRUD utilisateurs (sans auth)
- ✅ **categoryService** : DISPONIBLE - CRUD catégories, reorder

## 📝 Prochaines étapes IMMÉDIATES

1. ✅ **Axios déjà installé**

2. ✅ **Configuration .env.local créée** - Mettre à jour l'URL de l'API :
   ```env
   NEXT_PUBLIC_API_URL=https://votre-api.com
   ```

3. **Commencer l'intégration des formations et catégories** :
   - Page catalogue avec vraies données
   - Page détail formation
   - Filtres et recherche

4. ⏳ **Attendre la livraison de l'authentification frontend** par l'équipe backend

## 🔍 Exemples d'intégration ACTUELS

### ✅ Page catalogue avec API

```typescript
"use client";

import { useFormations } from '@/hooks/useFormations';
import { FormationCard } from '@/components/formations/FormationCard';

export default function CataloguePage() {
  const { formations, isLoading, meta } = useFormations({
    page: 1,
    limit: 12,
    status: 'published'
  });

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {formations.map(formation => (
        <FormationCard key={formation.id} formation={formation} />
      ))}
    </div>
  );
}
```

### ✅ Page détail formation

```typescript
"use client";

import { useFormation } from '@/hooks/useFormations';

export default function FormationDetailPage({ params }: { params: { id: string } }) {
  const { formation, isLoading, error } = useFormation(params.id);

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;
  if (!formation) return <div>Formation non trouvée</div>;

  return (
    <div>
      <h1>{formation.title}</h1>
      <p>{formation.description}</p>
      {/* ... */}
    </div>
  );
}
```

### ✅ Récupérer les catégories

```typescript
"use client";

import { useEffect, useState } from 'react';
import { categoryService } from '@/lib/api/services';
import { Category } from '@/lib/api/types';

export default function CategoriesFilter() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await categoryService.getAll({ status: 'active' });
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur chargement catégories:', error);
      }
    }
    loadCategories();
  }, []);

  return (
    <div>
      {categories.map(cat => (
        <div key={cat.id}>{cat.name}</div>
      ))}
    </div>
  );
}
```

## ⚠️ Notes importantes

### Pour l'instant (Phase 1)
- ❌ **PAS d'authentification** - Système en attente de livraison backend
- ❌ **PAS de AuthProvider** - Ne pas ajouter au layout.tsx
- ❌ **PAS de useAuth** - Ne pas utiliser dans les composants
- ✅ **Formations publiques** - Utilisables via formationService
- ✅ **Catégories** - Utilisables via categoryService
- ✅ **Types TypeScript** - Tous disponibles

### Après livraison de l'auth frontend (Phase 2)
- ✅ Intégrer AuthProvider dans layout.tsx
- ✅ Utiliser useAuth pour la connexion/inscription
- ✅ Activer le refresh token automatique
- ✅ Redirection /connexion pour les pages protégées
- ✅ Tokens stockés dans localStorage

### Architecture actuelle
- Le client API est configuré mais n'utilise pas encore les tokens
- Les interceptors sont prêts mais non actifs
- Tous les appels API fonctionnent en mode "public" pour le moment

