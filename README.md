# 🚀 DÉMARRAGE RAPIDE - DataIngest Platform

## Mode Démo (Pas besoin de Supabase)

### ✨ La plus simple façon de commencer!

```bash
# 1. Installation des dépendances
npm install

# 2. Démarrer le serveur de développement
npm run dev

# 3. Ouvrir dans le navigateur
# http://localhost:3000
```

### 🧪 Tester avec les utilisateurs de démo

Une fois sur la page de login, **cliquez sur un bouton de test user**:

| Bouton | Email | Mot de passe | Rôle |
|--------|-------|--------------|------|
| 🔵 Admin | admin@mentora.com | admin123 | Administrateur |
| 🟢 Youssef | youssef@mentora.com | user123 | Data Entry |
| 🟡 Amina | amina@mentora.com | user123 | Data Entry |
| 🔴 Karim | karim@mentora.com | user123 | Data Entry |
| 🟣 Salma | salma@mentora.com | user123 | Data Entry |

**Ce qui se passe?**
1. App détecte que Supabase n'est pas configuré
2. Bascule automatiquement en **mode démo local**
3. Utilise les credentials en dur pour tester
4. Tout fonctionne! ✅

---

## Mode Production (Avec Supabase)

### 🔧 Configurer Supabase

Consultez le fichier **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** pour:
1. Créer un compte Supabase
2. Obtenir les credentials
3. Créer la table `users`
4. Créer la fonction RPC `verify_password`
5. Configurer les buckets de stockage

### 📝 Remplir `.env.local`

Une fois Supabase configuré, remplissez:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

### Redémarrer le serveur

```bash
npm run dev
```

Maintenant l'app utilise Supabase pour l'authentification! 🎉

---

## 📚 Documentation Complète

- **[instructions.md](./instructions.md)** - Documentation technique complète
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Guide de configuration Supabase
- **[README.md](./README.md)** - Vue d'ensemble du projet

---

## ❓ Questions?

### Erreur 400 (Bad Request)?
→ Consultez [SOLUTION À L'ERREUR 400](./instructions.md#solution-à-lerreur-400-bad-request)

### Comment fonctionne le mode démo?
→ Consultez [MODE DÉMO](./instructions.md#solution-à-lerreur-400-bad-request)

### Besoin d'aide avec Supabase?
→ Consultez [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) > Troubleshooting

---

## 🎯 Commandes Utiles

```bash
# Démarrer en développement
npm run dev

# Compiler pour production
npm run build

# Prévisualiser le build
npm run preview

# Vérifier les erreurs TypeScript
npm run lint

# Nettoyer le dossier dist
npm run clean
```

---

## 🎨 Features

- ✅ **Authentification Sécurisée** (Supabase ou mode démo)
- ✅ **Design Modern** (Blue/Slate theme)
- ✅ **Responsive** (Mobile, tablet, desktop)
- ✅ **Gestion Multi-Utilisateurs** (Admin et Data Entry)
- ✅ **Dashboard Admin** avec métriques et stats
- ✅ **Formulaire Complexe** pour saisie de données
- ✅ **Gestion de Documents** (CRUD)
- ✅ **Export/Import** de données

---

**Prêt à commencer? Lancez `npm run dev` et cliquez sur un test user!** 🚀
