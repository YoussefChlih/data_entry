# 🔧 FIX: Erreur net::ERR_NAME_NOT_RESOLVED

## ❌ Problème

Vous aviez cette erreur dans la console:
```
GET https://your-project-id.supabase.co/rest/v1/users?...
net::ERR_NAME_NOT_RESOLVED
```

## 🔍 Cause

Le fichier `.env.local` contient le **placeholder** `https://your-project-id.supabase.co` au lieu d'une **vraie URL Supabase**.

Quand vous cliquez sur "Se connecter", l'app essaie de se connecter à cette URL invalide, ce qui cause l'erreur `ERR_NAME_NOT_RESOLVED`.

## ✅ Solution Implémentée

### Versión 1: Automatique (Implémentée!)

Le système détecte automatiquement si Supabase n'est pas configuré et **force le mode démo**:

```javascript
// src/lib/supabase.ts
function isSupabaseConfigured(): boolean {
  // Vérifie que:
  // - L'URL ne contient pas le placeholder "your-project-id"
  // - La clé ne contient pas le placeholder "your_actual_key_here"
  // - Les deux sont présentes et valides
  
  // Si l'une de ces conditions échoue → fallback au mode démo!
}
```

### Flux Automatique

```
1. Utilisateur clique "Se connecter" ou Test User
   ↓
2. App vérifie si Supabase est configuré
   ↓
3a. Si OUI → Utilise Supabase
3b. Si NON → Force le mode démo automatiquement
   ↓
4. Connexion réussie! ✅
```

## 🎯 Comment Utiliser Maintenant

### ✨ Scenario 1: Mode Démo (IMMÉDIAT!)

```bash
npm run dev
```

La page de login s'affiche. **Cliquez sur un test user** et vous êtes connecté! 🎉

L'app détecte automatiquement que Supabase n'est pas configuré et utilise le mode démo.

### ⚙️ Scenario 2: Configurer Supabase (POUR PRODUCTION)

1. **Ouvrez `.env.local`** à la racine du projet
2. **Remplacez les placeholders**:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGci...
   ```

   Par vos vraies valeurs:
   ```env
   VITE_SUPABASE_URL=https://xyzabc123.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5...
   ```

3. **Consultez [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** pour obtenir ces valeurs

4. **Redémarrez le serveur**:
   ```bash
   npm run dev
   ```

Maintenant Supabase sera utilisé pour l'authentification!

## ✅ Vérification

Pour vérifier quel mode est utilisé, **ouvrez la console du navigateur** (F12):

### Mode Démo (Supabase pas configuré):
```
⚠️ Supabase pas configuré correctement
📝 Pour configurer Supabase:
   1. Ouvrez .env.local
   2. Remplissez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY
   3. Consultez SUPABASE_SETUP.md pour les instructions
💡 Mode démo local sera utilisé automatiquement
```

### Mode Production (Supabase configuré):
```
✓ (Aucun warning - Supabase connexion établie)
```

## 📝 N'oubliez pas!

### Avant de commit/push à git:
1. **Ne commitez JAMAIS les vraies credentials!**
2. Créez un fichier `.env.local.example` avec les placeholders
3. Ajoutez `.env.local` à `.gitignore` (déjà fait)

```bash
# Vérifier que .env.local est ignoré
git status
# Ne devrait PAS afficher .env.local
```

## 🚀 Prochaines Étapes

**Maintenant vous avez deux options:**

### Option 1: Développement (Rapide)
```bash
npm run dev
# Mode démo fonctionne immédiatement
# Parfait pour tester les features
```

### Option 2: Production (Recommandé)
1. Créez un compte Supabase
2. Configurez la BD et les tables
3. Remplissez `.env.local` avec vos credentials
4. L'app utilisera Supabase au lieu du mode démo

## 💡 Conseil

**Le mode démo est PARFAIT pour:**
- ✅ Développement initial
- ✅ Test des features
- ✅ Démonstration aux stakeholders
- ✅ Documentation
- ✅ CI/CD sans base de données

**Supabase est NÉCESSAIRE pour:**
- ✅ Production
- ✅ Data persistante en base
- ✅ Authentification réelle
- ✅ Gestion des utilisateurs
- ✅ Storage de fichiers

---

**Vous êtes maintenant prêt!** 🎉 Lancez `npm run dev` et profitez!
