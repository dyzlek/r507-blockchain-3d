# BUT MMI 3e année — R507

## Projet Three.js — Visualisation pédagogique de la blockchain

### `SUIVI-HEBDO.md` — modèle des 8 fiches

Dupliquez ce modèle en `docs/suivi/SEMAINE-01.md` à `SEMAINE-08.md`. Déposez chaque fiche et envoyez-la avant l'échéance du calendrier. Elle doit refléter le board réellement mis à jour, pas une reconstitution a posteriori.

## 0. Informations générales

| Champ | Contenu |
|:---|:---|
| Groupe | Maxens, Dylan |
| Semaine | 6 |
| Dates couvertes | 07/11 – 13/11/2026 (mise à jour le 11/11, à compléter avant l'envoi) |
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
| #13 #12 #11 #10 #9 #8 #7 Textes de toutes les notions relus pour des non-initiés : jetons et transaction définis dès l'étape 0, « corde » au lieu de « ruban rouge », nonce = nombre sur la pièce, pourquoi le minage est difficile, îles = participants avec plusieurs ordinateurs, exemple du vélo pour la double dépense (retours de T1 et T2) | Toutes | Fonctionnel | `src/sequences.js`, `src/main.js`, `src/consensus.js`, CHOIX §4.7 f) ; PR #42 ouverte, non fusionnée |
| #10 Notion 4 : explication des avions en double (une île ne sait pas ce que ses voisines ont reçu, elle ignore le doublon) | 4 | En cours | `src/sequences.js` ; texte non revu à l'écran, pas encore commité |
| #8 Sceaux colorés selon leur bloc (deux blocs voisins n'ont jamais la même couleur), copie du sceau et cercles de comparaison de la même couleur | 1, 2 | En cours | `src/coffre.js`, `src/papier.js`, `src/main.js` ; PR #43 ouverte, rendu à confirmer à l'écran |
| #14 Storyboard réécrit en texte seul, aligné sur le parcours actuel (9 étapes, plan par plan, transitions, navigation) | Toutes | Fonctionnel | `docs/STORYBOARD.md` ; pas encore commité ; issue à fermer par le groupe |
| #45 #46 #47 Lexique replié « Les mots de cette étape » à chaque étape, textes des notions 4 et 6 raccourcis | 2, 4, 5, 6, 7 | Fonctionnel | `src/sequences.js` (`words`), `src/main.js`, `index.html`, `src/style.css` ; PR #48, à retester en session 2 (#18) |
| #17 Retours ouverts de T1 attribués depuis le formulaire (« termes techniques », bouton « En vrai… » : « Aidé » pour T1 et T2) ; commentaire de synthèse sur l'issue avec lien vers la PR #42 | Toutes | Fonctionnel | `docs/TEST-UTILISATEUR-RESULTATS.md`, commit `d80e5d6` (PR #42) ; commentaire sur #17 le 11/11 |
| #22 Grille d'auto-évaluation pré-remplie (parties 1 à 4 avec preuves) ; #18 protocole de la session 2 ; #23 plan de soutenance | — | En cours | `docs/…GRILLE-AUTOEVAL.md`, `docs/TEST-UTILISATEUR.md`, `docs/SOUTENANCE.md` ; à relire ensemble |

### 1.2 Prévu mais non réalisé
| Tâche | Cause | Report |
|:---|:---|:---|
| Session 2 de tests utilisateurs (#18) | Corrections de la session 1 en cours | Semaine 7 |
| Observations de l'animateur de la session 1 (#17), issues par problème relevé (rythme des étapes 4 à 7, vocabulaire, rôle des sceaux) | Non saisies, issues non créées au 11/11 | Avant la fermeture de #17 |
| Fusion des PR #42 (textes) et #43 (sceaux colorés) | Rendu de #43 à confirmer ; #43 n'a pas les textes de #42 | À faire avant le 15/11 |

### 1.3 État des 7 notions

| Notion obligatoire | État | Remarque / preuve |
|:---|:---|:---|
| Structure d'un bloc | Testé | Session 1 : T1 nomme les 4 éléments, T2 les deux sceaux ; sceaux colorés par bloc en cours (PR #43) |
| Chaînage cryptographique | Testé | Session 1 : personne ne dit que le sceau est recopié ; texte réécrit (PR #42), à retester (#18) |
| Immutabilité et détection de falsification | Testé | Session 1 : T1 explique la détection, T2 dit « chaîne cassée » sans raison ; refus par les autres îles ajouté à la notion 4 |
| Réseau et décentralisation | Testé | Archipel retravaillé (une seule scène, traversée des nuages, décors, bateau, avion rouge) ; explication des doublons ajoutée ; session 1 : T2 jugeait l'étape incompréhensible, à retester (#18) |
| Validation et minage | Testé | Session 1 : T1 « générer un sceau », T2 « je ne sais pas » ; texte sur la difficulté du minage ajouté (PR #42), à retester (#18) |
| Comparaison d'au moins deux mécanismes de consensus | Testé | Session 1 : étape jugée incompréhensible par T2 ; textes simplifiés, course dite simulée, à retester (#18) |
| Cycle de vie d'une transaction et scénario d'attaque illustré | Testé | Session 1 : double dépense non définie par T1 et T2 ; course au hasard, exemple du vélo, « À retenir », à retester (#18) |

**Définitions des états :**

- `En cours` = une partie est implémentée mais incomplète ou non vérifiée ;
- `Fonctionnel` = le parcours prévu fonctionne localement au moins une fois ; 
- `Testé` = il a été vérifié par au moins un test documenté (et, pour les tests externes, par une personne extérieure au groupe). 
- `Non commencé` et `Bloqué` peuvent aussi être utilisés.

## 2. Répartition du travail

| Membre | Tâches / issues | Issues traitées | Commits |
|:---|:---|:---:|:---:|
| Dylan (compte Moxolote) | Archipel, nuages, bateaux, notions 4, 6 et 7, textes relus, documents (CHOIX, grille, soutenance, storyboard, résultats) | #7 #9 #10 #12 #13 #14 #15 #16 #17 #19 #20 #22 #23 | 10 (hors fusions, relevé git du 07 au 11/11) |
| Maxens (compte MaxX-J) | Sceaux colorés par paire (PR #43) | #8 | 1 (`d7a0eed`, 10/11) |

## 3. GitHub Projects

| Question | Réponse |
|:---|:---|
| Issues créées | 3 le 11/11 : #45 (rythme des étapes 4 à 7), #46 (vocabulaire), #47 (rôle des sceaux), issues par problème relevé de la session 1, assignées à Dylan ; PR #42, #43, #44 et #48 ouvertes |
| Issues fermées | #19 (fermée le 09/11). #17 commentée le 11/11, non fermée (observations de l'animateur et issues par problème manquantes) |
| Nombre dans `Backlog` / `À faire` / `En cours` / `À vérifier` / `Terminé` | Non relevé le 11/11 : à relever sur le board avant l'envoi (#17 est encore en `Backlog`) |
| Board mis à jour pendant la semaine ? | Partiellement : #19 fermée, #17 commentée ; les autres issues à déplacer avec la preuve (PR #42, #43) |
| Milestone concerné et état | M2 — Livraison (15/11) : ouvert |

## 4. Choix de modélisation

| Question | Réponse |
|:---|:---|
| Fiches de `MMI-R507-projet-blockchain-CHOIX-MODELISATION.md` complétées | v0.11 : les 7 fiches f) ont leur ligne « Session 1 » (observation et modification) ; §3 fluidité ; §5, §6 et §7 rédigés ; gabarit 4.X retiré |
| Choix important et justification | Une île envoie la transaction à toutes ses voisines sans savoir ce qu'elles ont reçu, et le doublon est ignoré à l'arrivée : gardé tel quel (réaliste) et expliqué dans le panneau plutôt que supprimé. La triche est détectée par les autres îles (notion 4), comme le demande le sujet : l'archipel n'existe pas encore à la notion 3, donc on renvoie le bloc falsifié depuis la notion 4 |
| Choix remis en question | La course à vitesse fixe de la notion 7 : elle faisait dire « sous 50 %, Dylan perd toujours », ce qui est faux. Remplacée par une course au hasard |

## 5. Tests utilisateurs

| Question | Réponse |
|:---|:---|
| Nombre de testeurs extérieurs cette semaine | 0 (session 2 préparée, à faire) |
| Compréhension ou problème observé | Retours de la session 1 traités : notions 6 et 7 réécrites, falsification refusée par les îles, deux sceaux mieux nommés. Textes de toutes les notions relus (PR #42). Retours ouverts de T1 attribués. Non traité : la copie du sceau (notion 2), partiellement reprise par les sceaux colorés (PR #43) |
| Issue corrective | #18 (session 2), #7, #9, #10, #12, #13 |

## 6. IA, difficultés et besoins

| Question | Réponse |
|:---|:---|
| Usage de l'IA et vérifications effectuées | Claude : code des transitions, bateaux, avion rouge, course au hasard ; textes 6 et 7, relecture des textes pour non-initiés, storyboard écrit, mise à jour des fiches ; premières versions de CHOIX §5 à 7, de la grille et du plan de soutenance. Vérifié : rendus validés à l'écran par Dylan, course simulée 300 fois, 0 erreur console ; documents à relire par le groupe |
| Blocage technique | Aucun |
| Blocage pédagogique ou organisationnel | Trouver 2 testeurs qui n'ont jamais vu le projet avant le 15/11 |
| Besoin d'un point enseignant | Non |

## 7. Objectifs de la semaine suivante

| Objectif | Responsable | Issue |
|:---|:---|:---|
| Session 2 de tests, résultats reportés dans CHOIX et la grille | Maxens et Dylan | #18 |
| Board à jour : fermer les issues terminées avec la preuve ; relire CHOIX, README et la grille ; fusionner les PR #42 et #43 | Dylan, Maxens | #20 #21 #22 |
| Saisir les observations de l'animateur de la session 1 et créer une issue par problème relevé | Maxens et Dylan | #17 |
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
