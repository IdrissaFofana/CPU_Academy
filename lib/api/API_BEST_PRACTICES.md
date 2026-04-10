# 🚀 Guide d'API Centralisée - Meilleures Pratiques

## 📋 Vue d'ensemble

Ce projet utilise une architecture d'API centralisée pour éviter la duplication, faciliter la maintenance et améliorer la scalabilité.

---

## ✅ Architecture

```
lib/
├── api.ts                           # 🎯 Client API unique (point d'accès)
├── api/
│   ├── config.ts                   # Configuration centralisée (BASE_URL, timeouts, etc.)
│   └── services/
│       ├── index.ts                # Export centralisé des services
│       ├── formation.service.ts    # Méthodes pour formations
│       ├── website.service.ts      # Partenaires, équipe
│       ├── banner.service.ts       # Banners
│       └── ...autres.service.ts
```

---

## 🔧 Configuration requise (.env.local)

```bash
# URL du backend API
NEXT_PUBLIC_API_URL=https://back.cpupme.ci

# Timeout pour les requêtes (ms)
NEXT_PUBLIC_API_TIMEOUT=30000

# Clés de tokens d'authentification
NEXT_PUBLIC_TOKEN_KEY=cpu_access_token
NEXT_PUBLIC_REFRESH_TOKEN_KEY=cpu_refresh_token
```

**Important**: Tous les paramètres avec le préfixe `NEXT_PUBLIC_` sont visibles dans le navigateur (côté client).

---

## 📍 Usage - Composants et Hooks

### ✅ CORRECT - Utiliser les services

```typescript
// Dans un composant ou hook
import { formationService, partenaireService } from '@/lib/api/services';

// Récupérer des données
const formations = await formationService.getPublic({
  category: 'development',
  sort: 'name',
});

const partenaires = await partenaireService.getForSiteWeb();
```

### ✅ CORRECT - Créer un hook personnalisé

```typescript
// hooks/useFormations.ts
'use client';

import { useState, useEffect } from 'react';
import { formationService } from '@/lib/api/services';

export function useFormations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await formationService.getPublic();
        setData(result);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { data, loading };
}
```

### ❌ INCORRECT - Ne jamais hardcoder les URLs

```typescript
// ❌ MAUVAIS - URLs hardcodées
const response = await fetch('https://back.cpupme.ci/api/formations');

// ❌ MAUVAIS - Utiliser process.env directement dans les composants
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const response = await fetch(`${baseUrl}/api/formations`);

// ❌ MAUVAIS - Appeler apiClient directement
import { apiClient } from '@/lib/api/client';
const data = await apiClient.get('/api/formations');
```

---

## 📦 Créer un nouveau service

### Étape 1: Créer le fichier service

```typescript
// lib/api/services/product.service.ts
import { apiClient } from '@/lib/api';

export interface Product {
  id: string;
  name: string;
  price: number;
}

export const productService = {
  async getAll(): Promise<Product[]> {
    try {
      return await apiClient.get<Product[]>('/api/products');
    } catch (error) {
      console.error('❌ Erreur lors du chargement des produits:', error);
      return [];
    }
  },

  async getById(id: string): Promise<Product | null> {
    try {
      return await apiClient.get<Product>(`/api/products/${id}`);
    } catch (error) {
      console.error(`❌ Erreur lors du chargement de produit ${id}:`, error);
      return null;
    }
  },

  async create(data: Omit<Product, 'id'>): Promise<Product> {
    return await apiClient.post<Product>('/api/products', data);
  },

  async update(id: string, data: Partial<Product>): Promise<Product> {
    return await apiClient.put<Product>(`/api/products/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/products/${id}`);
  },
};
```

### Étape 2: Exporter depuis index.ts

```typescript
// lib/api/services/index.ts
export { productService } from './product.service';
export type { Product } from './product.service';
```

### Étape 3: Utiliser dans les composants

```typescript
// components/ProductList.tsx
'use client';

import { useEffect, useState } from 'react';
import { productService } from '@/lib/api/services';

export function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await productService.getAll();
      setProducts(data);
    };
    fetch();
  }, []);

  return (
    <div>
      {products.map(p => (
        <div key={p.id}>{p.name}: {p.price}€</div>
      ))}
    </div>
  );
}
```

---

## 🔐 Gestion de l'authentification

Le client API gère automatiquement:
- ✅ Ajout du token Bearer aux requêtes
- ✅ Refresh automatique du token en cas d'expiration (401)
- ✅ Redirection vers login si le refresh échoue

Mais cela nécessite que les tokens soient stockés dans localStorage aux clés configurées.

---

## 📊 Gestion des erreurs

### Patterns recommandés

```typescript
// Pattern 1: Try-catch avec console.error
async function loadData() {
  try {
    const data = await formationService.getPublic();
    setData(data);
  } catch (error) {
    console.error('Erreur fatal:', error);
    setError('Impossible de charger les données');
  }
}

// Pattern 2: Service gère les erreurs
export const productService = {
  async getAll(): Promise<Product[]> {
    try {
      return await apiClient.get('/api/products');
    } catch (error) {
      // Service log + retourne données vides
      console.error('Erreur produits:', error);
      return [];
    }
  },
};

// Pattern 3: Hook avec état d'erreur
export function useProducts() {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await productService.getAll();
        setData(data);
      } catch (e) {
        setError(e as Error);
      }
    };
    fetch();
  }, []);

  return { error };
}
```

---

## 🎯 Points clés à retenir

| ✅ À FAIRE | ❌ À ÉVITER |
|-----------|-----------|
| Utiliser les services (`formationService.getPublic()`) | Appeler `apiClient` directement |
| Définir l'URL dans `.env.local` | Hardcoder les URLs |
| Créer des services pour chaque ressource | Mélanger la logique API et composants |
| Gérer les erreurs dans les services | Ignorer les erreurs |
| Utiliser des types TypeScript | Oublier la typage |
| Exporter les services depuis `index.ts` | Importer depuis fichiers individuels |

---

## 🚢 Déploiement

### Variables d'environnement par environnement

```bash
# .env.local (développement)
NEXT_PUBLIC_API_URL=http://localhost:3001

# .env.staging
NEXT_PUBLIC_API_URL=https://staging-api.example.com

# .env.production
NEXT_PUBLIC_API_URL=https://api.example.com
```

Aucun code à modifier - tout se configure via `.env`.

---

## 📚 Ressources

- **Client API**: voir [lib/api.ts](../api.ts)
- **Configuration**: voir [lib/api/config.ts](./config.ts)
- **Services examples**: [lib/api/services/](.)
