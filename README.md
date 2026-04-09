# Data Entry

Application TypeScript dédiée à la saisie, validation et gestion d’enregistrements (data entry), avec une base de code structurée et des standards de qualité adaptés à un contexte entreprise.

## Objectifs

- Fournir une interface et/ou une API permettant la création, modification, validation et consultation d’enregistrements.
- Garantir la fiabilité des données via des règles de validation (côté client et/ou serveur).
- Maintenir un code lisible, testable et évolutif (TypeScript, conventions, CI).

## Périmètre fonctionnel (à adapter)

- Authentification (optionnel)
- Création / édition / suppression d’un enregistrement
- Recherche, filtres, tri, pagination
- Validation des champs et gestion des erreurs
- Journalisation (optionnel)
- Export (CSV/JSON) (optionnel)

## Stack technique

- Langage : TypeScript
- Runtime : Node.js (version recommandée : >= 18)
- Gestionnaire de paquets : npm (ou yarn/pnpm)
- (À compléter) Framework : React / Next.js / NestJS / Express
- (À compléter) Base de données : SQLite / PostgreSQL / MongoDB
- (À compléter) Qualité : ESLint, Prettier, tests, CI

## Prérequis

- Node.js >= 18
- npm >= 9

Vérification :
```bash
node -v
npm -v
```

## Installation

```bash
git clone https://github.com/YoussefChlih/data_entry.git
cd data_entry
npm install
```

## Configuration

Créer un fichier `.env` à la racine (si applicable) :

```bash
# Exemple (à adapter)
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=

# Auth (optionnel)
JWT_SECRET=
```

Remarque : ne jamais committer les secrets. Utiliser un `.env.example` si nécessaire.

## Lancer le projet

Développement :
```bash
npm run dev
```

Build :
```bash
npm run build
```

Production :
```bash
npm run start
```

## Scripts

- `npm run dev` : lance le projet en mode développement
- `npm run build` : compile/build pour production
- `npm run start` : démarre la version compilée
- `npm run lint` : analyse statique du code
- `npm run test` : exécute les tests

(Adapter la liste à ce qui existe réellement dans `package.json`.)

## Structure du projet

Exemple de structure (à adapter au repo) :

- `src/` : code source
  - `components/` : composants UI (si front)
  - `pages/` ou `app/` : routing (Next.js)
  - `routes/` / `controllers/` : endpoints (si backend)
  - `services/` : logique métier / accès données
  - `lib/` : utilitaires partagés
  - `types/` : types et contrats TypeScript
- `tests/` : tests unitaires/integration
- `public/` : assets statiques (si front)

## Qualité et standards

- TypeScript strict (recommandé)
- Linting et formatage cohérents (ESLint/Prettier)
- Revue de code via PR
- CI : lint + tests + build sur chaque push/PR (recommandé)

## Tests

```bash
npm run test
```

## Déploiement (optionnel)

Décrire l’approche de déploiement cible :
- Front : Vercel / Netlify / serveur Node
- Backend : Docker / VM / PaaS
- Variables d’environnement : via plateforme (secrets)

## Roadmap (optionnel)

- [ ] Stabiliser les règles de validation
- [ ] Ajouter tests unitaires sur la logique métier
- [ ] Ajouter CI GitHub Actions (lint/test/build)
- [ ] Ajouter documentation API (OpenAPI) si backend

## Contribution

- Créer une branche : `feature/<nom>` ou `fix/<nom>`
- Ouvrir une Pull Request avec :
  - description claire
  - captures si UI
  - étapes de test
  - lien vers issue si applicable

## Licence

À définir.
