# BUT MMI 3e année — R507

## Projet Three.js — Visualisation pédagogique de la blockchain

### `SUIVI-HEBDO.md` — modèle des 8 fiches

Dupliquez ce modèle en `docs/suivi/SEMAINE-01.md` à `SEMAINE-08.md`. Déposez chaque fiche et envoyez-la avant l'échéance du calendrier. Elle doit refléter le board réellement mis à jour, pas une reconstitution a posteriori.

## 0. Informations générales

| Champ | Contenu |
|:---|:---|
| Groupe | Maxens, Dylan |
| Semaine | 3 |
| Dates couvertes | 17/10 – 23/10/2026 |
| Membres présents | |
| Lien dépôt / GitHub Projects | https://github.com/dyzlek/r507-blockchain-3d |
| Lien démo (si disponible) | https://dyzlek.github.io/r507-blockchain-3d/ |

## 1. Avancement

### 1.1 Réalisé
| Issue / tâche | Notion concernée | Statut | Preuve |
|:---|:---|:---|:---|
| #16 Page d'aperçu papier (île avec phare, avion en papier, coffre en calque) | Structure d'un bloc, réseau | En cours | `d8a1f77` (branche `apercu-ile-papier`) |
| #20 Citations de CHOIX réalignées sur les textes affichés (version papier) | Toutes | Fonctionnel | branche `apercu-ile-papier` |
| Fiches de suivi semaines 2 et 3, board mis à jour | — | Fonctionnel | `50421f3`, `96c3860` |
| #16 Direction de l'aperçu papier étendue à tout le parcours (tampon, décors pop-up, bureau clair) | Toutes | Fonctionnel | `ca51564`, PR #31 fusionnée le 19/10 |
| #16 Corrections visuelles : sceaux nets devant le calque, avions orientés vers leur cible, encre qui s'efface | Chaînage, réseau | Fonctionnel | `bdeb912`, PR #32 |
| #16 Corde physique entre les coffres, qui retombe quand la chaîne est coupée ; branche rejetée qui bascule | Chaînage, immutabilité, attaque | Fonctionnel | `baca4bb`, PR #32 fusionnée le 19/10 |
| Déploiement de la version papier sur GitHub Pages | Toutes | Fonctionnel | action « Déploiement GitHub Pages » réussie le 19/10 |

### 1.2 Prévu mais non réalisé
| Tâche | Cause | Report |
|:---|:---|:---|
| Tests utilisateurs — session 1 (#17) | Pas encore organisée | Semaine 4 au plus tard |
| Mesure des FPS sur un poste de TP (#19) | Priorité donnée à la direction papier | Semaine 4 |
| Test de la version papier sur téléphone | Non fait | Semaine 4 |

### 1.3 État des 7 notions

| Notion obligatoire | État | Remarque / preuve |
|:---|:---|:---|
| Structure d'un bloc | Fonctionnel | Coffre de verre, étape 1 (#7, `b506ce9`) ; pas de test documenté |
| Chaînage cryptographique | Fonctionnel | Étape 3 (#8, `ce0c1c2`) ; fiche 4.2 rédigée |
| Immutabilité et détection de falsification | Fonctionnel | Étape 4 (#9, `ce0c1c2`) ; fiche 4.3 mise à jour |
| Réseau et décentralisation | Fonctionnel | Archipel et propagation (#10, PR #27) ; fiche 4.4 |
| Validation et minage | Fonctionnel | Course au sceau, nonce en direct (#11, PR #28) ; fiche 4.5 |
| Comparaison d'au moins deux mécanismes de consensus | Fonctionnel | PoW / PoS sur l'archipel (#12, PR #29) ; fiche 4.6 |
| Cycle de vie d'une transaction et scénario d'attaque illustré | Fonctionnel | Double dépense, course entre deux branches (#13, PR #29) ; fiche 4.7 |

**Définitions des états :**

- `En cours` = une partie est implémentée mais incomplète ou non vérifiée ;
- `Fonctionnel` = le parcours prévu fonctionne localement au moins une fois ; 
- `Testé` = il a été vérifié par au moins un test documenté (et, pour les tests externes, par une personne extérieure au groupe). 
- `Non commencé` et `Bloqué` peuvent aussi être utilisés.

## 2. Répartition du travail

| Membre | Tâches / issues | Issues traitées | Commits |
|:---|:---|:---:|:---:|
| Maxens | Aperçu papier | #16 | 1 |
| Dylan | Fiches de suivi, board, réalignement de CHOIX, direction papier sur tout le parcours, corrections visuelles, corde | #16 #20 | 7 |

## 3. GitHub Projects

| Question | Réponse |
|:---|:---|
| Issues créées | 0 |
| Issues fermées | 0 (#7 à #13 encore ouvertes) |
| Nombre dans `Backlog` / `À faire` / `En cours` / `À vérifier` / `Terminé` | 9 / 2 / 0 / 7 / 7 (relevé du 24/10) |
| Board mis à jour pendant la semaine ? | Oui, le 19/10 : notions 5 à 7 passées en `À vérifier` |
| Milestone concerné et état | M2 — Livraison (15/11) : 15 issues ouvertes, 0 fermée ; M1 — Cadrage : 6/6 fermées |

## 4. Choix de modélisation

| Question | Réponse |
|:---|:---|
| Fiches de `MMI-R507-projet-blockchain-CHOIX-MODELISATION.md` complétées | 4.1 à 4.7 rédigées ; citations réalignées sur les textes à l'écran (#20, `96c3860`) ; §2.5 (direction papier) et §4.4 (avion au lieu de bille) mis à jour ; sections « Tests utilisateurs » encore vides |
| Choix important et justification | Direction de l'aperçu papier retenue pour tout le parcours : plus chaleureuse et plus lisible, chaque geste (tamponner, déplier une île, envoyer un avion) reste un objet qu'on connaît (CHOIX §2.5, v0.9) |
| Choix remis en question | Thème sombre retiré : le bureau marron foncé alourdissait la maquette |

## 5. Tests utilisateurs

| Question | Réponse |
|:---|:---|
| Nombre de testeurs extérieurs cette semaine | 0 |
| Compréhension ou problème observé | Aucun test extérieur cette semaine |
| Issue corrective | — |

## 6. IA, difficultés et besoins

| Question | Réponse |
|:---|:---|
| Usage de l'IA et vérifications effectuées | Claude : préparation de cette fiche à partir de `git log`, des issues et du board ; chiffres vérifiés par le groupe |
| Blocage technique | Aucun ; le calque transparent rendait les sceaux pâles, corrigé (`bdeb912`) |
| Blocage pédagogique ou organisationnel | Les tests utilisateurs n'ont pas encore été organisés |
| Besoin d'un point enseignant | Non |

## 7. Objectifs de la semaine suivante

| Objectif | Responsable | Issue |
|:---|:---|:---|
| Session 1 de tests utilisateurs (2 testeurs extérieurs) | Maxens | #17 |
| Reporter les retours dans les sections « Tests utilisateurs » de CHOIX | Maxens, Dylan | #20 |
| Mesurer les FPS sur un poste de TP et tester sur téléphone | Dylan | #19 |
| Passer #16 en `À vérifier` sur le board | Dylan | #16 |

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
| Date d'envoi | 24/10/2026 (dépôt dans le dépôt) |
| Noms des membres | Maxens, Dylan |
