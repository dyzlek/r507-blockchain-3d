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
| #15 Nuages en volume (boules de papier mâché) au lieu de disques plats, dessinés en 2 appels (InstancedMesh) ; scène préparée au chargement (`compileAsync`) pour supprimer la saccade de la première traversée | 4 | Fonctionnel | Plus de 60 images/s sur tout le parcours, PC ralenti (CPU 6x) compris, mesuré le 09/11 par Dylan ; issue #19 fermée |
| #15 Traits sombres dans les nuages : brume appliquée aux pointillés des routes, biais d'ombre adapté au recul de la caméra | 4 | En cours | Cause supposée, à confirmer à l'écran |
| #16 Décors des îles : repère par île (cabane, arbre, phare), palmiers et buissons, plantés dans le sol (motte au pied) et relevés à l'arrivée sur l'archipel | 4 | Fonctionnel | `src/archipel.js` (`decorFor`), `src/papier.js` (`createCutout`) |
| #16 Mer agrandie (60 × 50) : son bord ne se voit plus en vue d'ensemble ; trois bateaux en papier mâché (un autour de l'île de Dylan, deux au large) qui ne traversent aucune île | 4 | Fonctionnel | `src/bateau.js` ; trajet calculé à ≥ 0,6 rayon d'île des rivages |
| #7 Lampe placée dans le coffre, flèche au pochoir sur le couvercle (sens de la chaîne) | 1, 2 | Fonctionnel | `src/coffre.js` |
| Étape finale « Vue d'ensemble » : toute la chaîne et tout l'archipel d'un regard | Toutes | Fonctionnel | `src/sequences.js` (`overview`) |
| #9 #10 Bloc 1 falsifié envoyé aux autres îles : avion rouge, les voisines comparent et refusent (« refuse le bloc ✗ »), sans faire suivre | 3, 4 | Fonctionnel | `src/archipel.js` (`send(instant, asForged)`), PR #40 ; rendu validé à l'écran par Dylan |
| #12 #13 Textes des notions 6 et 7 réécrits en mots simples, avec un « À retenir » (retours de la session 1) | 6, 7 | Fonctionnel | `src/sequences.js`, PR #40 |
| #13 Course de la notion 7 au hasard (temps de bloc tiré au sort) : à 30 %, Dylan gagne parfois ; résultats cumulés dans le panneau ; les deux transactions en conflit sont affichées dès le départ ; le cycle de vie avance pendant la course | 7 | Fonctionnel | `src/race.js`, `src/main.js` ; 300 courses simulées : 23 % de victoires à 30 %, 69 % à 60 % |
| #12 Encart « En vrai… » de la notion 6 : la course est dite simulée (gagnante tirée au sort, essais ralentis) | 6 | Fonctionnel | `src/sequences.js` |
| #7 « Sceau » renommé « Sceau de ce coffre » dans la fiche du coffre (T2 confondait les deux sceaux) | 1 | Fonctionnel | `src/main.js` |
| #20 CHOIX v0.11 : session 1 reportée dans les 7 fiches, §3 fluidité (FPS), §5 cohérence, §6 IA, §7 sources, gabarit 4.X retiré | Toutes | Fonctionnel | `docs/MMI-R507-projet-blockchain-CHOIX-MODELISATION.md` |
| #22 Grille d'auto-évaluation pré-remplie (parties 1 à 4 avec preuves) ; #18 protocole de la session 2 ; #23 plan de soutenance | — | En cours | `docs/…GRILLE-AUTOEVAL.md`, `docs/TEST-UTILISATEUR.md`, `docs/SOUTENANCE.md` ; à relire ensemble |

### 1.2 Prévu mais non réalisé
| Tâche | Cause | Report |
|:---|:---|:---|
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
| Fiches de `MMI-R507-projet-blockchain-CHOIX-MODELISATION.md` complétées | v0.11 : les 7 fiches f) ont leur ligne « Session 1 » (observation et modification) ; §3 fluidité ; §5, §6 et §7 rédigés ; gabarit 4.X retiré |
| Choix important et justification | La triche est détectée par les autres îles (notion 4), comme le demande le sujet : l'archipel n'existe pas encore à la notion 3, donc on renvoie le bloc falsifié depuis la notion 4 |
| Choix remis en question | La course à vitesse fixe de la notion 7 : elle faisait dire « sous 50 %, Dylan perd toujours », ce qui est faux. Remplacée par une course au hasard |

## 5. Tests utilisateurs

| Question | Réponse |
|:---|:---|
| Nombre de testeurs extérieurs cette semaine | 0 (session 2 préparée, à faire) |
| Compréhension ou problème observé | Retours de la session 1 traités : notions 6 et 7 réécrites, falsification refusée par les îles, deux sceaux mieux nommés. Non traité : la copie du sceau (notion 2) |
| Issue corrective | #18 (session 2), #7, #9, #10, #12, #13 |

## 6. IA, difficultés et besoins

| Question | Réponse |
|:---|:---|
| Usage de l'IA et vérifications effectuées | Claude : code des transitions, bateaux, avion rouge, course au hasard ; textes 6 et 7 ; premières versions de CHOIX §5 à 7, de la grille et du plan de soutenance. Vérifié : rendus validés à l'écran par Dylan, course simulée 300 fois, 0 erreur console ; documents à relire par le groupe |
| Blocage technique | Aucun |
| Blocage pédagogique ou organisationnel | Trouver 2 testeurs qui n'ont jamais vu le projet avant le 15/11 |
| Besoin d'un point enseignant | Non |

## 7. Objectifs de la semaine suivante

| Objectif | Responsable | Issue |
|:---|:---|:---|
| Session 2 de tests, résultats reportés dans CHOIX et la grille | Maxens et Dylan | #18 |
| Board à jour : fermer les issues terminées avec la preuve ; relire CHOIX, README et la grille | Dylan, Maxens | #20 #21 #22 |
| Support, vidéo de secours, répétition chronométrée | Maxens et Dylan | #23 #24 #25 |

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
