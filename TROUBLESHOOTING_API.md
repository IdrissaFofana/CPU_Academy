# Guide de Dépannage API

## ❌ Erreur "Network Error"

### Symptôme
Console du navigateur affiche :
```
⚠️ API Mission/Vision non accessible.
Vérifiez que l'API backend est démarrée et accessible.
URL configurée: http://localhost:3001
→ Le site affichera le contenu statique par défaut.
```

### Causes possibles

#### 1. L'API backend n'est pas démarrée
**Solution :**
- Démarrez le serveur backend sur le port 3001
- Vérifiez avec : `curl http://localhost:3001/health`
- Vous devriez recevoir une réponse 200 OK

#### 2. L'API est sur un port différent
**Solution :**
- Vérifiez sur quel port le backend écoute
- Modifiez `.env.local` :
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:VOTRE_PORT
  ```
- Redémarrez le serveur Next.js : `npm run dev`

#### 3. L'API est hébergée ailleurs (pas en local)
**Solution :**
- Obtenez l'URL de l'API auprès de l'équipe backend
- Modifiez `.env.local` :
  ```env
  NEXT_PUBLIC_API_URL=https://api.exemple.com
  ```
- Redémarrez le serveur Next.js : `npm run dev`

#### 4. Problème de CORS (Cross-Origin Resource Sharing)
**Symptôme :** L'API répond mais le navigateur bloque la requête

**Solution :** Configurez le backend pour autoriser l'origine frontend
```javascript
// Exemple configuration backend (Express.js)
app.use(cors({
  origin: 'http://localhost:3000', // URL du frontend
  credentials: true
}));
```

### Tests de diagnostic

#### 1. Vérifier la configuration
```bash
# Afficher l'URL configurée
cat .env.local | grep NEXT_PUBLIC_API_URL
```

#### 2. Tester la connexion API
```bash
# Test endpoint health
curl http://localhost:3001/health

# Test endpoint mission/vision
curl http://localhost:3001/api/missionvision/for-site-web
```

#### 3. Vérifier les logs backend
- Consultez les logs du serveur backend
- Recherchez les erreurs ou rejets de connexion

### Comportement attendu

✅ **Quand l'API est accessible :**
- La section Mission/Vision affiche le contenu dynamique de l'API
- Pas de warning dans la console
- Les données correspondent à la base de données backend

⚠️ **Quand l'API n'est pas accessible :**
- Le site reste fonctionnel
- La section Mission/Vision affiche le contenu statique par défaut
- Un warning informatif apparaît dans la console
- Aucune erreur bloquante pour l'utilisateur

## 🔧 Configuration complète

### Fichiers à vérifier

1. **`.env.local`** - Configuration API
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_API_TIMEOUT=30000
   ```

2. **`lib/api/config.ts`** - Lit la configuration
   ```typescript
   BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
   ```

3. **`hooks/useMissionVision.ts`** - Gère les erreurs gracieusement

4. **`components/about/MissionVisionSection.tsx`** - Affiche le fallback si erreur

### Après modification de .env.local

⚠️ **Important :** Toujours redémarrer le serveur après avoir modifié `.env.local`

```bash
# Arrêter le serveur (Ctrl+C)
# Redémarrer
npm run dev
```

Les variables `NEXT_PUBLIC_*` sont injectées au build time, pas au runtime !

## 📞 Besoin d'aide ?

### Checklist avant de demander de l'aide

- [ ] L'API backend est démarrée
- [ ] `curl http://localhost:3001/health` fonctionne
- [ ] `.env.local` contient la bonne URL
- [ ] Le serveur Next.js a été redémarré après modification de `.env.local`
- [ ] Aucune erreur dans les logs du backend
- [ ] Le navigateur n'affiche pas d'erreur CORS

### Informations à fournir

1. **Environnement :**
   - OS : Windows / macOS / Linux
   - Node version : `node --version`
   - npm version : `npm --version`

2. **Configuration :**
   - Contenu de `.env.local` (sans informations sensibles)
   - Résultat de `curl http://localhost:3001/health`

3. **Erreurs :**
   - Messages dans la console du navigateur
   - Logs du serveur backend
   - Capture d'écran si pertinent

## ✅ État actuel du projet

### Phase 1 : Mode Public (Actuel)
- ✅ Infrastructure API complète
- ✅ Types TypeScript depuis Swagger
- ✅ Services API implémentés
- ✅ Hooks React pour la gestion d'état
- ✅ Gestion d'erreur avec fallback
- ⚠️ **Authentification désactivée** (commentée)
- ⚠️ **Backend requis pour tester**

### Phase 2 : Authentification (Futur)
- ⏳ En attente de livraison par l'équipe backend
- ⏳ Décommenter les intercepteurs d'authentification
- ⏳ Activer AuthContext
- ⏳ Implémenter login/logout

### Prochaines intégrations
- ⏳ Autres sections de la page À propos (valeurs, équipe, partenaires)
- ⏳ Page Catalogue avec données réelles
- ⏳ Détail des formations
- ⏳ Filtres de catégories
