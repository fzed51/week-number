# Tests

Ce projet utilise [Vitest](https://vitest.dev/) pour les tests unitaires.

## Structure des tests

- `src/utils/dateUtils.test.ts` - Tests pour les fonctions utilitaires de manipulation des dates
- `src/components/FormattedDate.test.tsx` - Tests pour le composant React FormattedDate
- `src/test/setup.ts` - Configuration des tests (setup de testing-library/jest-dom)

## Scripts de test disponibles

```bash
# Exécuter les tests en mode watch (redémarre automatiquement lors des changements)
npm test

# Exécuter les tests une seule fois
npm run test:run

# Exécuter les tests avec l'interface utilisateur
npm run test:ui

# Générer un rapport de couverture de code
npm run test:coverage
```

## Configuration

Les tests sont configurés dans `vite.config.ts` avec :

- **Environnement** : jsdom (pour simuler le DOM dans les tests React)
- **Globals** : `true` (pour utiliser `describe`, `it`, `expect` sans import)
- **Setup files** : `./src/test/setup.ts` (pour configurer testing-library/jest-dom)
- **Couverture** : Provider v8 avec rapports en texte, JSON et HTML

## Tests inclus

### dateUtils.test.ts

- Tests de la fonction `getWeekNumber()` :
  - Première semaine de l'année
  - Semaine en milieu d'année
  - Fin d'année
  - Années bissextiles
  - Cohérence entre différentes années

- Tests de la fonction `getWeekDates()` :
  - Dates de début et fin de semaine
  - Ordre correct des dates
  - Gestion de la semaine 53
  - Différentes années
  - Durée constante d'une semaine

- Tests d'intégration :
  - Cohérence entre `getWeekNumber()` et `getWeekDates()`
  - Gestion des cas limites autour du nouvel an

### FormattedDate.test.tsx

- Rendu correct de la date en français
- Attribut `datetime` correct
- Tous les jours de la semaine
- Tous les mois de l'année
- Années bissextiles
- Jours à un chiffre
- Différentes années

## Dépendances de test

- `vitest` - Framework de test
- `@vitest/ui` - Interface utilisateur pour les tests
- `@vitest/coverage-v8` - Couverture de code
- `jsdom` - Simulation du DOM
- `@testing-library/react` - Utilitaires pour tester React
- `@testing-library/jest-dom` - Matchers supplémentaires pour jest-dom
