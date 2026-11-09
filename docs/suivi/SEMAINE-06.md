# BUT MMI 3e année — R507

## Projet Three.js — Visualisation pédagogique de la blockchain

### `SUIVI-HEBDO.md` — modèle des 8 fiches

Dupliquez ce modèle en `docs/suivi/SEMAINE-01.md` à `SEMAINE-08.md`. Déposez chaque fiche et envoyez-la avant l'échéance du calendrier. Elle doit refléter le board réellement mis à jour, pas une reconstitution a posteriori.

## 0. Informations générales

| Champ | Contenu |
|:---|:---|
| Groupe | Maxens, Dylan |
| Semaine | 6 |
| Dates couvertes | 07/11 – 13/11/2026 (rédigée le 09/11, à compléter avant l'envoi) |
| Membres présents | |
| Lien dépôt / GitHub Projects | https://github.com/dyzlek/r507-blockchain-3d |
| Lien démo (si disponible) | https://dyzlek.github.io/r507-blockchain-3d/ |

## 1. Avancement

### 1.1 Réalisé
| Issue / tâche | Notion concernée | Statut | Preuve |
|:---|:---|:---|:---|
| #15 Une seule scène : la chaîne de coffres est posée sur l'île de Dylan, une île de l'archipel comme les autres (archipel agrandi ×14, copies de la chaîne à la taille réelle sur chaque île) | 4, 7 | Fonctionnel | `src/archipel.js`, `src/main.js` (PR de la semaine) |
| #15 Au départ on ne voit que l'île de Dylan ; au dézoom (notion 3 → 4), la caméra traverse une couche de nuages et découvre les 6 autres îles en sortant ; même chose au retour (notion 4 → 5) | 4 | Fonctionnel | `src/nuages.js`, `src/main.js` (`CLOUDS`, brume `scene.fog`) |
| #15 Nuages en volume (boules de papier mâché) au lieu de disques plats, dessinés en 2 appels (InstancedMesh) ; scène préparée au chargement (`compileAsync`) pour supprimer la saccade de la première traversée | 4 | Fonctionnel | Parcours testé sur une petite configuration le 09/11 par Dylan : fluide (#19) |
| #15 Traits sombres dans les nuages : brume appliquée aux pointillés des routes, biais d'ombre adapté au recul de la caméra | 4 | En cours | Cause supposée, à confirmer à l'écran |
| #16 Décors des îles : repère par île (cabane, arbre, phare), palmiers et buissons, plantés dans le sol (motte au pied) et relevés à l'arrivée sur l'archipel | 4 | Fonctionnel | `src/archipel.js` (`decorFor`), `src/papier.js` (`createCutout`) |
| #16 Mer agrandie (60 × 50) : son bord ne se voit plus en vue d'ensemble ; bateau en papier mâché qui fait le tour de l'archipel sans traverser d'île | 4 | En cours | `src/bateau.js` ; trajet calculé à ≥ 0,6 rayon d'île des rivages |
| #7 Lampe placée dans le coffre, flèche au pochoir sur le couvercle (sens de la chaîne) | 1, 2 | Fonctionnel | `src/coffre.js` |
| Étape finale « Vue d'ensemble » : toute la chaîne et tout l'archipel d'un regard | Toutes | Fonctionnel | `src/sequences.js` (`overview`) |

### 1.2 Prévu mais non réalisé
| Tâche | Cause | Report |
|:---|:---|:---|
| Mesure chiffrée des FPS sur un poste de TP (#19) | Test fait sur petite configuration (fluide, validé par Dylan le 09/11), sans relevé chiffré | Relevé du compteur d'images/s sur un poste de TP |
| Session 2 de tests utilisateurs (#18) | Corrections de la session 1 en cours | Semaine 7 |

### 1.3 État des 7 notions

| Notion obligatoire | État | Remarque / preuve |
|:---|:---|:---|
| Structure d'un bloc | | |
| Chaînage cryptographique | | |
| Immutabilité et détection de falsification | | |
| Réseau et décentralisation | Fonctionnel | Archipel retravaillé (une seule scène, traversée des nuages, décors, bateau) ; à retester (#18) |
| Validation et minage | | |
| Comparaison d'au moins deux mécanismes de consensus | | |
| Cycle de vie d'une transaction et scénario d'attaque illustré | | |

**Définitions des états :**

- `En cours` = une partie est implémentée mais incomplète ou non vérifiée ;
- `Fonctionnel` = le parcours prévu fonctionne localement au moins une fois ; 
- `Testé` = il a été vérifié par au moins un test documenté (et, pour les tests externes, par une personne extérieure au groupe). 
- `Non commencé` et `Bloqué` peuvent aussi être utilisés.

## 2. Répartition du travail

| Membre | Tâches / issues | Issues traitées | Commits |
|:---|:---|:---:|:---:|
| | | | |
| | | | |
| | | | |

## 3. GitHub Projects

| Question | Réponse |
|:---|:---|
| Issues créées | |
| Issues fermées | |
| Nombre dans `Backlog` / `À faire` / `En cours` / `À vérifier` / `Terminé` | |
| Board mis à jour pendant la semaine ? | |
| Milestone concerné et état | |

## 4. Choix de modélisation

| Question | Réponse |
|:---|:---|
| Fiches de `MMI-R507-projet-blockchain-CHOIX-MODELISATION.md` complétées | |
| Choix important et justification | |
| Choix remis en question | |

## 5. Tests utilisateurs

| Question | Réponse |
|:---|:---|
| Nombre de testeurs extérieurs cette semaine | |
| Compréhension ou problème observé | |
| Issue corrective | |

## 6. IA, difficultés et besoins

| Question | Réponse |
|:---|:---|
| Usage de l'IA et vérifications effectuées | |
| Blocage technique | |
| Blocage pédagogique ou organisationnel | |
| Besoin d'un point enseignant | |

## 7. Objectifs de la semaine suivante

| Objectif | Responsable | Issue |
|:---|:---|:---|
| | | |
| | | |
| | | |

## 8. Signaux d'alerte

- [ ] Le board n'a été mis à jour qu'aujourd'hui.
- [ ] La répartition est fortement déséquilibrée et non expliquée.
- [ ] Nous n'avons pas encore atteint les 2 testeurs extérieurs requis.
- [ ] Un choix de modélisation important n'est pas justifié.
- [ ] Une notion n'a pas avancé depuis 2 semaines.

**Règle vérifiable d'absence d'avancement depuis 2 semaines :** cocher cette case si, entre les deux dernières fiches hebdomadaires successives, aucune évolution visible n'est constatée pour la notion concernée dans le code, l'interface, `CHOIX-MODELISATION.md`, les issues ou les tests (aucun commit, issue déplacée/fermée, preuve ajoutée ou observation nouvelle). Nommer la notion et la preuve vérifiée : ...

## 9. Validation

| Élément | Réponse |
|:---|:---|
| Fiche relue par tous | Oui / Non |
| Date d'envoi | |
| Noms des membres | |
