# Document de cadrage — Blockchain 3D (R507)

> Version 0.1 — 01/10/2026. À compléter par le groupe avant le 9 octobre.

## 1. Équipe

| Membre | GitHub | Rôle principal | Rôle transverse |
|:---|:---|:---|:---|
| Maxens | [@MaxX-J](https://github.com/MaxX-J) | à définir | à définir |
| Dylan | [@dyzlek](https://github.com/dyzlek) | à définir | à définir |
| Nicolas | [@hextravagance](https://github.com/hextravagance) | à définir | à définir |

Chaque membre doit pouvoir expliquer l'ensemble du projet et les 7 notions en soutenance.

## 2. Objectif

Faire comprendre le fonctionnement d'une blockchain à un utilisateur non initié, grâce à une expérience web 3D interactive (Three.js). Il ne s'agit pas de coder une vraie blockchain.

## 3. Public cible

À préciser (ex. : grand public adulte, lycéens, étudiants hors informatique…).

## 4. Fil rouge narratif

À définir : métaphore principale et parcours reliant les 7 notions. Les choix détaillés sont argumentés dans [`MMI-R507-projet-blockchain-CHOIX-MODELISATION.md`](MMI-R507-projet-blockchain-CHOIX-MODELISATION.md).

## 5. Les 7 notions obligatoires

1. Structure d'un bloc
2. Chaînage cryptographique
3. Immutabilité et détection de falsification
4. Réseau et décentralisation
5. Validation et minage
6. Comparaison d'au moins deux mécanismes de consensus
7. Cycle de vie d'une transaction et scénario d'attaque illustré

## 6. Choix techniques

| Élément | Choix | Raison |
|:---|:---|:---|
| Moteur 3D | Three.js | Imposé par le sujet |
| Outil de build | Vite | Démarrage rapide, rechargement à chaud, build statique |
| Hébergement | GitHub Pages via GitHub Actions | Déploiement automatique à chaque push sur `main` |
| Gestion de projet | GitHub Projects | Imposé : colonnes Backlog, À faire, En cours, À vérifier, Terminé |

## 7. Organisation

- **Branches** : `main` est déployée ; une branche par issue (`12-structure-bloc`), fusion par pull request relue par un autre membre.
- **Commits** : référencer l'issue (`#12`), ex. `feat: hash du bloc recalculé au clic (#12)`.
- **Board** : mis à jour au fil de l'eau, pas seulement le jour de la fiche hebdo.
- **Fiches hebdo** : `docs/suivi/SEMAINE-0X.md`, remplies et envoyées chaque vendredi.

## 8. Jalons

| Milestone | Date | Attendu |
|:---|:---|:---|
| M1 — Cadrage | 09/10/2026, 17h | Groupe, dépôt, GitHub Projects, premières issues |
| M2 — Livraison | 15/11/2026, 23h59 | Application en ligne, GitHub, board à jour, docs complètes |
| M3 — Soutenance | 19/11/2026 | Répétition 9h30, soutenance 20 min entre 11h et 12h30 |

⚠️ Le sujet mentionne aussi un rendu final le 18/11 à 17h : date à confirmer avec l'enseignant.

## 9. Risques identifiés

| Risque | Parade |
|:---|:---|
| Métaphore qui crée une fausse compréhension | Tests utilisateurs tôt, section « limites » par notion |
| Performances < 30 FPS sur poste de TP | Formes simples, mesure FPS régulière |
| Démo qui plante en soutenance | Version en ligne + vidéo de secours |
| Répartition déséquilibrée | Issues assignées, point hebdo |
