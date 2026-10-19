# BUT MMI 3e année — R507

## Projet Three.js — Visualisation pédagogique de la blockchain

### `SUIVI-HEBDO.md` — modèle des 8 fiches

Dupliquez ce modèle en `docs/suivi/SEMAINE-01.md` à `SEMAINE-08.md`. Déposez chaque fiche et envoyez-la avant l'échéance du calendrier. Elle doit refléter le board réellement mis à jour, pas une reconstitution a posteriori.

## 0. Informations générales

| Champ | Contenu |
|:---|:---|
| Groupe | Maxens, Dylan |
| Semaine | 2 |
| Dates couvertes | 10/10 – 16/10/2026 |
| Membres présents | |
| Lien dépôt / GitHub Projects | https://github.com/dyzlek/r507-blockchain-3d |
| Lien démo (si disponible) | https://dyzlek.github.io/r507-blockchain-3d/ |

## 1. Avancement

### 1.1 Réalisé
| Issue / tâche | Notion concernée | Statut | Preuve |
|:---|:---|:---|:---|
| #15 Parcours par séquences, caméra guidée | Toutes | En cours | `b506ce9`, `05d6863` |
| #7 Coffre de verre | Structure d'un bloc | Fonctionnel | `b506ce9`, `c11af28` (PR #26) |
| #8 / #9 Chaînage et falsification | Chaînage, immutabilité | Fonctionnel | `ce0c1c2` |
| #10 Archipel et propagation | Réseau | Fonctionnel | `43ad833` (PR #27) |
| #11 Course au sceau | Validation et minage | Fonctionnel | `651209c`, `52d1608` (PR #28) |
| #12 / #13 PoW-PoS, double dépense | Consensus, transaction et attaque | Fonctionnel | `8c16cc2` (PR #29) |
| #16 Direction visuelle neumorphique | — | En cours | `e9d437f` |
| #20 Fiches 4.1 à 4.7 de CHOIX-MODELISATION | Toutes | En cours | `60f667d`, `9f8386d` |

### 1.2 Prévu mais non réalisé
| Tâche | Cause | Report |
|:---|:---|:---|
| Tests utilisateurs — session 1 (#17) | Priorité donnée au code des 7 notions | Semaine 3 |
| Storyboard complet (#14) | Parcours construit directement dans le code | Semaine 3 |

### 1.3 État des 7 notions

| Notion obligatoire | État | Remarque / preuve |
|:---|:---|:---|
| Structure d'un bloc | Fonctionnel | Étape 1-2, coffre de verre |
| Chaînage cryptographique | Fonctionnel | Étape 3, sceaux jumeaux |
| Immutabilité et détection de falsification | Fonctionnel | Étape 4, « Falsifier le bloc 1 » |
| Réseau et décentralisation | Fonctionnel | Étape 5, archipel |
| Validation et minage | Fonctionnel | Étape 6, minage réel SHA-256 |
| Comparaison d'au moins deux mécanismes de consensus | Fonctionnel | Étape 7, PoW / PoS |
| Cycle de vie d'une transaction et scénario d'attaque illustré | Fonctionnel | Étape 8, double dépense |

**Définitions des états :**

- `En cours` = une partie est implémentée mais incomplète ou non vérifiée ;
- `Fonctionnel` = le parcours prévu fonctionne localement au moins une fois ; 
- `Testé` = il a été vérifié par au moins un test documenté (et, pour les tests externes, par une personne extérieure au groupe). 
- `Non commencé` et `Bloqué` peuvent aussi être utilisés.

## 2. Répartition du travail

| Membre | Tâches / issues | Issues traitées | Commits |
|:---|:---|:---:|:---:|
| Maxens | Notions 4, 6, 7, fiches CHOIX 4.2 à 4.7, navigation | #10 #12 #13 #15 #20 | 8 |
| Dylan | Parcours, notions 1, 2, 3, 5, design, relecture des textes | #7 #8 #9 #11 #15 #16 | 9 (dont 1 commit IA) |

## 3. GitHub Projects

| Question | Réponse |
|:---|:---|
| Issues créées | 0 |
| Issues fermées | 1 (#6) |
| Nombre dans `Backlog` / `À faire` / `En cours` / `À vérifier` / `Terminé` | |
| Board mis à jour pendant la semaine ? | En partie : notions 1 à 4 en `À vérifier`, notions 5 à 7 déplacées le 19/10 |
| Milestone concerné et état | |

## 4. Choix de modélisation

| Question | Réponse |
|:---|:---|
| Fiches de `MMI-R507-projet-blockchain-CHOIX-MODELISATION.md` complétées | 4.1 à 4.7 |
| Choix important et justification | Coffre de verre : on lit le bloc sans « briser le sceau » (fiche 4.1) |
| Choix remis en question | Direction « registre de bord » abandonnée pour le neumorphisme ; sceau « camembert » remplacé par un sceau de cire |

## 5. Tests utilisateurs

| Question | Réponse |
|:---|:---|
| Nombre de testeurs extérieurs cette semaine | 0 |
| Compréhension ou problème observé | |
| Issue corrective | |

## 6. IA, difficultés et besoins

| Question | Réponse |
|:---|:---|
| Usage de l'IA et vérifications effectuées | Claude : squelette du parcours, notion 5, aide au design ; tout relu et testé sur ordinateur et téléphone (voir README) |
| Blocage technique | |
| Blocage pédagogique ou organisationnel | |
| Besoin d'un point enseignant | |

## 7. Objectifs de la semaine suivante

| Objectif | Responsable | Issue |
|:---|:---|:---|
| Session 1 de tests utilisateurs | Maxens | #17 |
| Relire et confirmer les fiches 4.2 et 4.3 | Dylan | #20 |
| Mettre le board à jour | Dylan | — |

## 8. Signaux d'alerte

- [ ] Le board n'a été mis à jour qu'aujourd'hui.
- [ ] La répartition est fortement déséquilibrée et non expliquée.
- [x] Nous n'avons pas encore atteint les 2 testeurs extérieurs requis.
- [ ] Un choix de modélisation important n'est pas justifié.
- [ ] Une notion n'a pas avancé depuis 2 semaines.

**Règle vérifiable d'absence d'avancement depuis 2 semaines :** cocher cette case si, entre les deux dernières fiches hebdomadaires successives, aucune évolution visible n'est constatée pour la notion concernée dans le code, l'interface, `CHOIX-MODELISATION.md`, les issues ou les tests (aucun commit, issue déplacée/fermée, preuve ajoutée ou observation nouvelle). Nommer la notion et la preuve vérifiée : ...

## 9. Validation

| Élément | Réponse |
|:---|:---|
| Fiche relue par tous | Oui / Non |
| Date d'envoi | |
| Noms des membres | |
