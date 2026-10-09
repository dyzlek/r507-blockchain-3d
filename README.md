# Blockchain 3D — R507

Expérience web interactive en 3D (Three.js) pour faire comprendre une blockchain à un public non initié.
Projet du module R507, BUT MMI 3e année.

- **Démo en ligne** : https://dyzlek.github.io/r507-blockchain-3d/
- **Board GitHub Projects** : https://github.com/users/dyzlek/projects/3

## Équipe

| Membre | GitHub | Rôle |
|:---|:---|:---|
| Maxens | [@MaxX-J](https://github.com/MaxX-J) | Design, UX et contenu pédagogique · documentation et tests utilisateurs |
| Dylan | [@dyzlek](https://github.com/dyzlek) | Développement 3D et intégration Three.js · board GitHub Projects et déploiement |

## Lancer le projet en local

Prérequis : Node.js 20 ou plus.

```bash
npm install
npm run dev
```

Puis ouvrir l'URL affichée (par défaut http://localhost:5173/r507-blockchain-3d/).

`npm run build` produit la version statique dans `dist/`.

## Déploiement

Chaque push sur `main` déclenche le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), qui construit le site et le publie sur GitHub Pages.

## Structure

```
src/                 code de l'application Three.js
docs/
  CADRAGE.md         document de cadrage
  MMI-R507-projet-blockchain-CHOIX-MODELISATION.md   livrable officiel des choix
  MMI-R507-projet-blockchain-GRILLE-AUTOEVAL.md      auto-évaluation avant soutenance
  suivi/SEMAINE-01.md … SEMAINE-08.md                fiches hebdomadaires
```

## Notions couvertes

1. Structure d'un bloc
2. Chaînage cryptographique
3. Immutabilité et détection de falsification
4. Réseau et décentralisation
5. Validation et minage
6. Comparaison d'au moins deux mécanismes de consensus
7. Cycle de vie d'une transaction et scénario d'attaque illustré

## Usage de l'IA générative

L'IA générative (Claude) est utilisée comme assistant. Tout code ou texte généré est relu, testé et compris par le groupe. Les usages sont signalés dans les issues et commits concernés, et détaillés dans la section 6 de `CHOIX-MODELISATION.md`.

| Date | Usage | Vérification |
|:---|:---|:---|
| 01/10/2026 | Mise en place du dépôt (Vite, workflow Pages, structure docs, issues initiales) | Relu par le groupe, build et déploiement testés |
| 09/10/2026 | Création du board GitHub Projects, assignation des issues, première rédaction du cadrage (public, métaphore, fil rouge) et de la fiche semaine 1 | Relu et validé par le groupe |
