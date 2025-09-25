# WEEK-NUMBER

## Description

**Week-Number** est une application web simple et élégante développée en React et TypeScript qui affiche le numéro de la semaine courante selon le calendrier ISO 8601. L'application calcule automatiquement :

- Le numéro de semaine de la date actuelle (1-52/53)
- Les dates de début et fin de la semaine courante
- Un affichage formaté en français des dates

L'interface présente ces informations dans une carte claire et lisible, parfaite pour connaître rapidement dans quelle semaine de l'année nous nous trouvons.

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet**

   ```bash
   git clone <url-du-repository>
   cd week-number
   ```

2. **Installer les dépendances**

   ```bash
   yarn
   ```

3. **Lancer en mode développement**

   ```bash
   yarn dev
   ```

   L'application sera accessible à l'adresse `http://localhost:5173`

4. **Construire pour la production**

   ```bash
   yarn build
   ```

   Les fichiers de production seront générés dans le dossier `dist/`

### Scripts disponibles

- `yarn dev` : Lance le serveur de développement
- `yarn build` : Construit l'application pour la production
- `yarn lint` : Vérifie le code avec ESLint
- `yarn lint:fix` : Corrige automatiquement les erreurs ESLint
- `yarn format` : Formate le code avec Prettier
- `yarn format:check` : Vérifie le formatage du code
- `yarn preview` : Prévisualise la version de production

## Technologies utilisées

- **React 19** - Interface utilisateur
- **TypeScript** - Typage statique
- **Vite** - Outil de build rapide
- **ESLint** - Analyse statique du code
- **Prettier** - Formatage du code
