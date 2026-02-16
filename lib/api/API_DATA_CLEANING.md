# Nettoyage Automatique des Données API

## 🎯 Objectif

Ce système gère automatiquement le décodage des caractères spéciaux et entités HTML dans toutes les réponses de l'API. Plus besoin de nettoyer manuellement les données dans chaque composant ou hook.

## 🔧 Fonctionnement

### 1. Nettoyage Automatique au Niveau du Client API

Le client API (`lib/api/client.ts`) utilise un **intercepteur de réponse Axios** qui nettoie automatiquement toutes les données reçues :

```typescript
// Response interceptor
this.client.interceptors.response.use(
  (response) => {
    // Nettoyage automatique des caractères spéciaux
    if (response.data) {
      response.data = cleanObjectStrings(response.data);
    }
    return response;
  },
  // ... gestion des erreurs
);
```

### 2. Fonctions de Nettoyage Disponibles

Toutes les fonctions sont dans `lib/utils.ts` :

#### `decodeHtmlEntities(text: string): string`
Décode les entités HTML, même en cas de double encodage.

**Exemples de transformations :**
- `&amp;#x27;` → `'`
- `&#x27;` → `'`
- `&amp;quot;` → `"`
- `&amp;amp;` → `&`
- `&lt;` → `<`
- `&gt;` → `>`

**Gestion du double encodage :**
Le backend peut parfois encoder plusieurs fois les caractères. Cette fonction détecte et corrige automatiquement :
```
"d&amp;amp;#x27;Ivoire" → "d'Ivoire"
```

#### `cleanApiText(text: string): string`
Nettoyage complet d'un texte :
1. Décode les entités HTML
2. Supprime les balises HTML si présentes
3. Normalise les espaces multiples

**Exemple :**
```typescript
const raw = "La CPU-PME s&amp;#x27;engage à créer";
const clean = cleanApiText(raw);
// Résultat: "La CPU-PME s'engage à créer"
```

#### `cleanObjectStrings<T>(obj: T): T`
Nettoie récursivement tous les strings dans un objet ou un tableau.

**Exemple :**
```typescript
const apiData = {
  mission: {
    titre: "Notre&amp;#x27;Mission",
    objectifs: [
      { texte: "Renforcer l&amp;#x27;innovation" },
      { texte: "Faciliter l&amp;#x27;accès" }
    ]
  }
};

const cleaned = cleanObjectStrings(apiData);
// Tous les strings sont automatiquement nettoyés
```

## 🚀 Utilisation

### Pour les Nouveaux Endpoints

**Vous n'avez rien à faire !** Le nettoyage est automatique pour toutes les requêtes API.

```typescript
// Dans votre service
export const monService = {
  async getData(): Promise<ApiResponse<MonType[]>> {
    // Les données retournées sont déjà nettoyées automatiquement
    return apiClient.get<ApiResponse<MonType[]>>('/api/mon-endpoint');
  }
};

// Dans votre hook
const response = await monService.getData();
// response.data contient des données propres, sans caractères spéciaux encodés
```

### Cas Particuliers : Nettoyage Manuel

Si vous devez nettoyer des données qui ne proviennent pas de l'API (localStorage, props, etc.) :

```typescript
import { cleanApiText, cleanObjectStrings } from '@/lib/utils';

// Pour un texte simple
const cleanText = cleanApiText(userInput);

// Pour un objet complet
const cleanData = cleanObjectStrings(localStorageData);
```

## 🧪 Tests et Vérification

### Vérifier le Nettoyage dans la Console

Pour voir les données avant/après nettoyage dans un hook :

```typescript
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await monService.getData();
      console.log('✅ Données nettoyées:', response.data);
      setData(response.data);
    } catch (err) {
      console.error('❌ Erreur:', err);
    }
  };
  
  fetchData();
}, []);
```

### Test Manuel via PowerShell

```powershell
# Récupérer les données brutes de l'API
$response = Invoke-WebRequest -Uri "https://api.cpupme.com/api/missionvision/for-site-web"
$json = $response.Content | ConvertFrom-Json
$json | ConvertTo-Json -Depth 10

# Comparer avec ce qui s'affiche dans votre application
```

## 📝 Exemples Concrets

### Avant le Nettoyage (données brutes de l'API)
```json
{
  "mission": {
    "textePrincipal": "La CPU-PME s&amp;#x27;engage à créer un environnement d&amp;#x27;affaires favorable"
  },
  "vision": {
    "aspirations": [
      {
        "texte": "Encourager l&amp;#x27;émergence d&amp;#x27;entrepreneurs"
      }
    ]
  }
}
```

### Après le Nettoyage (données utilisées dans l'app)
```json
{
  "mission": {
    "textePrincipal": "La CPU-PME s'engage à créer un environnement d'affaires favorable"
  },
  "vision": {
    "aspirations": [
      {
        "texte": "Encourager l'émergence d'entrepreneurs"
      }
    ]
  }
}
```

## 🛠️ Architecture

```
Requête API
    ↓
axios.get()
    ↓
Response Interceptor (lib/api/client.ts)
    ↓
cleanObjectStrings() (lib/utils.ts)
    ↓
    ├─ cleanApiText() pour chaque string
    │   ├─ decodeHtmlEntities()
    │   ├─ Suppression balises HTML
    │   └─ Normalisation espaces
    ↓
Données propres retournées au hook/composant
```

## ✅ Avantages de cette Approche

1. **Automatique** : Fonctionne pour tous les endpoints sans code supplémentaire
2. **Centralisé** : Un seul endroit pour gérer le nettoyage
3. **Performant** : Nettoyage une seule fois à la réception
4. **Type-safe** : Préserve les types TypeScript
5. **Maintenable** : Facile d'ajouter de nouveaux cas de décodage

## 🔄 Cas Spéciaux Gérés

### Double Encodage
```
Backend encode : ' → &#x27;
Puis re-encode : & → &amp;
Résultat : &amp;#x27;
Notre système : &amp;#x27; → '
```

### Balises HTML Résiduelles
```
"<p>Texte avec &lt;balise&gt;</p>" → "Texte avec <balise>"
```

### Espaces Multiples
```
"Texte    avec     espaces" → "Texte avec espaces"
```

## 📚 Références

- **Client API** : `lib/api/client.ts` (ligne 42-48)
- **Fonctions Utils** : `lib/utils.ts` (lignes 8-100)
- **Hook Mission/Vision** : `hooks/useMissionVision.ts` (exemple d'utilisation)

## 🐛 Dépannage

### Les caractères spéciaux s'affichent toujours mal

1. Vérifier que vous utilisez `apiClient` de `lib/api/client.ts`
2. Vérifier que le service hérite bien de `apiClient.get()` ou `apiClient.post()`
3. Vérifier la console pour des erreurs TypeScript

### Performances : Le nettoyage est-il coûteux ?

Non, le nettoyage est très rapide :
- Opérations de string simple (regex, replace)
- Exécuté une seule fois à la réception
- Pas de boucles infinies (détection de profondeur)

### Comment désactiver le nettoyage pour un endpoint spécifique ?

Si nécessaire (très rare), créer un client Axios séparé sans intercepteur.
