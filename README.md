# Data Entry

Application TypeScript dédiée à la saisie, validation et gestion d’enregistrements (data entry), avec une base de code structurée et des standards de qualité adaptés à un contexte entreprise.

## Objectifs

- Fournir une interface et/ou une API permettant la création, modification, validation et consultation d’enregistrements.
- Garantir la fiabilité des données via des règles de validation (côté client et/ou serveur).
- Maintenir un code lisible, testable et évolutif (TypeScript, conventions, CI).

## Périmètre fonctionnel 

- Authentification 
- Création / édition / suppression d’un enregistrement
- Validation des champs et gestion des erreurs
- Export (CSV/JSON) 

## Stack technique

- Langage : TypeScript
- Runtime : Node.js (version recommandée : >= 18)
- Gestionnaire de paquets : npm (ou yarn/pnpm)
-  Framework : React / Next.js / NestJS / Express
-  Base de données : SQLite / PostgreSQL / MongoDB
-  Qualité : ESLint, Prettier, tests, CI

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

Créer un fichier `.env` à la racine :

```bash
# Exemple 
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=
```


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

## Contribution

- Créer une branche : `feature/<nom>` ou `fix/<nom>`
- Ouvrir une Pull Request avec :
  - description claire
  - captures si UI
  - étapes de test
  - lien vers issue si applicable


