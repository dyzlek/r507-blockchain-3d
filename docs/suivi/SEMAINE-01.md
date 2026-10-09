# BUT MMI 3e année — R507

## Projet Three.js — Visualisation pédagogique de la blockchain

### `SUIVI-HEBDO.md` — modèle des 8 fiches

Dupliquez ce modèle en `docs/suivi/SEMAINE-01.md` à `SEMAINE-08.md`. Déposez chaque fiche et envoyez-la avant l'échéance du calendrier. Elle doit refléter le board réellement mis à jour, pas une reconstitution a posteriori.

## 0. Informations générales

| Champ | Contenu |
|:---|:---|
| Groupe | Maxens, Dylan |
| Semaine | 1 |
| Dates couvertes | 01/10 – 09/10/2026 |
| Membres présents | Maxens, Dylan |
| Lien dépôt / GitHub Projects | https://github.com/dyzlek/r507-blockchain-3d · https://github.com/users/dyzlek/projects/3 |
| Lien démo (si disponible) | https://dyzlek.github.io/r507-blockchain-3d/ |

## 1. Avancement

### 1.1 Réalisé
| Issue / tâche | Notion concernée | Statut | Preuve |
|:---|:---|:---|:---|
| #1 Mise en place du dépôt (Vite, Three.js, déploiement Pages) | — | Fonctionnel | Démo en ligne, commit `20549df` |
| #3 Board GitHub Projects (5 colonnes, issues, milestones) | — | Fonctionnel | Board lié au dépôt |
| #2 Rôles de l'équipe | — | Fonctionnel | `README.md`, `CADRAGE.md` §1 |
| #4 Public cible, métaphore, fil rouge | Toutes | Fonctionnel | `CHOIX-MODELISATION.md` §2.1–2.4 |
| #5 Document de cadrage | — | Fonctionnel | `docs/CADRAGE.md` v1.0 |

### 1.2 Prévu mais non réalisé
| Tâche | Cause | Report |
|:---|:---|:---|
| Board créé tardivement (prévu dès le 01/10) | Recomposition du groupe : passage de 3 à 2 membres | Fait le 09/10, mis à jour en continu à partir de maintenant |

### 1.3 État des 7 notions

| Notion obligatoire | État | Remarque / preuve |
|:---|:---|:---|
| Structure d'un bloc | Non commencé | Représentation choisie dans `CADRAGE.md` §4 |
| Chaînage cryptographique | Non commencé | Représentation choisie dans `CADRAGE.md` §4 |
| Immutabilité et détection de falsification | Non commencé | Représentation choisie dans `CADRAGE.md` §4 |
| Réseau et décentralisation | Non commencé | Représentation choisie dans `CADRAGE.md` §4 |
| Validation et minage | Non commencé | Représentation choisie dans `CADRAGE.md` §4 |
| Comparaison d'au moins deux mécanismes de consensus | Non commencé | Représentation choisie dans `CADRAGE.md` §4 |
| Cycle de vie d'une transaction et scénario d'attaque illustré | Non commencé | Représentation choisie dans `CADRAGE.md` §4 |

**Définitions des états :**

- `En cours` = une partie est implémentée mais incomplète ou non vérifiée ;
- `Fonctionnel` = le parcours prévu fonctionne localement au moins une fois ; 
- `Testé` = il a été vérifié par au moins un test documenté (et, pour les tests externes, par une personne extérieure au groupe). 
- `Non commencé` et `Bloqué` peuvent aussi être utilisés.

## 2. Répartition du travail

| Membre | Tâches / issues | Issues traitées | Commits |
|:---|:---|:---:|:---:|
| Dylan | Dépôt, déploiement, board, issues | #1, #3 | 2 |
| Maxens | Public cible, métaphore, fil rouge | #4 | 0 |
| Dylan et Maxens | Rôles, cadrage | #2, #5 | — |

## 3. GitHub Projects

| Question | Réponse |
|:---|:---|
| Issues créées | 25 |
| Issues fermées | 5 (#1 à #5) |
| Nombre dans `Backlog` / `À faire` / `En cours` / `À vérifier` / `Terminé` | 15 / 4 / 0 / 1 / 5 |
| Board mis à jour pendant la semaine ? | Non, créé le 09/10 ; les issues existaient depuis le 01/10 |
| Milestone concerné et état | M1 — Cadrage : atteint (5/6 issues fermées, la fiche #6 est en vérification) |

## 4. Choix de modélisation

| Question | Réponse |
|:---|:---|
| Fiches de `MMI-R507-projet-blockchain-CHOIX-MODELISATION.md` complétées | §1 (informations) et §2.1 à 2.4 (public, métaphore, limites, métaphores écartées) |
| Choix important et justification | Registre de coffres de verre scellés dans un archipel : le sceau rend le hash visible et l'archipel montre l'absence de centre |
| Choix remis en question | Livre de comptes et tour de briques, écartés (voir §2.4) |

## 5. Tests utilisateurs

| Question | Réponse |
|:---|:---|
| Nombre de testeurs extérieurs cette semaine | 0 (pas encore de prototype) |
| Compréhension ou problème observé | — |
| Issue corrective | — |

## 6. IA, difficultés et besoins

| Question | Réponse |
|:---|:---|
| Usage de l'IA et vérifications effectuées | Claude : structure du dépôt, workflow Pages, création du board, première rédaction du cadrage. Relu et corrigé par le groupe, build et déploiement testés |
| Blocage technique | Aucun |
| Blocage pédagogique ou organisationnel | Départ d'un membre : le groupe passe à 2, les rôles et les assignations ont été revus |
| Besoin d'un point enseignant | Confirmer la date de rendu final : 15/11 à 23h59 ou 18/11 à 17h |

## 7. Objectifs de la semaine suivante

| Objectif | Responsable | Issue |
|:---|:---|:---|
| Storyboard du parcours complet | Maxens | #14 |
| Prototype : bloc cliquable avec données et hash | Dylan | #7 |
| Chaînage et effet d'une modification | Dylan | #8 |

## 8. Signaux d'alerte

- [x] Le board n'a été mis à jour qu'aujourd'hui.
- [ ] La répartition est fortement déséquilibrée et non expliquée.
- [x] Nous n'avons pas encore atteint les 2 testeurs extérieurs requis.
- [ ] Un choix de modélisation important n'est pas justifié.
- [ ] Une notion n'a pas avancé depuis 2 semaines.

**Règle vérifiable d'absence d'avancement depuis 2 semaines :** cocher cette case si, entre les deux dernières fiches hebdomadaires successives, aucune évolution visible n'est constatée pour la notion concernée dans le code, l'interface, `CHOIX-MODELISATION.md`, les issues ou les tests (aucun commit, issue déplacée/fermée, preuve ajoutée ou observation nouvelle). Nommer la notion et la preuve vérifiée : ...

## 9. Validation

| Élément | Réponse |
|:---|:---|
| Fiche relue par tous | Oui / Non |
| Date d'envoi | 09/10/2026 |
| Noms des membres | Maxens, Dylan |
