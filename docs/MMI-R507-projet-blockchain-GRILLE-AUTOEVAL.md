# BUT MMI 3e année — R507

## Projet Three.js — Visualisation pédagogique de la blockchain

### `MMI-R507-projet-blockchain-GRILLE-AUTOEVAL.md`

À remplir en groupe puis individuellement avant la soutenance, dans le dépôt. Elle sert à repérer les lacunes et préparer la soutenance ; elle n'est pas notée en elle-même. Toute note cochée doit être justifiée par une phrase ou une preuve.

> **Mise à jour le 16/11/2026 : partie 3 (board, issues #55 à #58, README), 1.3 et 4.3 (session 2), 2.1, 2.6, 2.7 (session 2 dans CHOIX, #56) et 4.4 (FPS remesurés après optimisation, #57). Le reste date du 09/11 et est à revoir avec la session 2.**
>
> **Pré-remplie le 09/11/2026 (avant la session 2 et la soutenance), à relire et corriger ensemble.** Chaque note est justifiée par une preuve dans le dépôt. La partie 5 se note après la répétition. Les notes sont volontairement prudentes là où les tests ne prouvent rien encore.

## Échelle

| Niveau | Signification |
|:---:|:---|
| 0 | Non fait / absent |
| 1 | Ébauché, insuffisant |
| 2 | Fait mais partiel |
| 3 | Fait et satisfaisant |
| 4 | Très abouti et défendable |

## Partie 1 — Pertinence pédagogique (25 %)

| # | Critère | Score 0-4 | Justification / preuve |
|:---|:---|:---:|:---|
| 1.1 | Les 7 notions obligatoires sont toutes représentées conformément à la liste commune. | 4 | Les 7 notions sont dans le parcours, dans l'ordre de la liste commune (étapes 1 à 7, `src/sequences.js`). Chacune a sa fiche §4.1 à §4.7 dans CHOIX |
| 1.2 | Chaque notion possède une animation ou interaction observable. | 4 | Chaque notion se joue : lampe du coffre (1), comparer les sceaux (2), falsifier (3), éteindre une île et envoyer un bloc falsifié (4), miner en `00` ou `000` (5), course ou tirage (6), course d'attaque à 30 % ou 60 % (7). Les SHA-256 sont calculés pour de vrai |
| 1.3 | Un utilisateur non initié comprend sans explication orale préalable. | 3 | **Progrès mesuré entre les deux sessions** (`TEST-UTILISATEUR-RESULTATS.md`), testeurs seuls face à la démo, sans aide : en session 1, personne n'atteint le critère du protocole « 6 réponses sur 8 notées 2 » (T1 : 2/8, T2 : 0/8, 4 étapes jugées incompréhensibles) ; en session 2, **T4, sans aucune connaissance de la blockchain, obtient 7/8**, y compris minage, consensus et double dépense (à 0 pour tous en session 1), et **plus aucune étape n'est jugée incompréhensible**. T3 reste à 0/8 mais explique sur le moment la cassure et les deux consensus. Ses points de blocage ont chacun reçu une correction (#55, PR #54) : première action mise en avant, définition du minage mise en évidence, lexique ouvert par défaut, récapitulatif d'une ligne par notion à l'étape 9. Pas 4 : un testeur sur deux seulement atteint le critère, et ces corrections n'ont pas été retestées |
| 1.4 | L'ordre est pédagogique et progressif. | 3 | Progression du bloc seul à l'attaque, chaque notion réutilise la précédente (CHOIX §5). Mais la difficulté monte trop vite à partir de l'étape 4 d'après la session 1 |
| 1.5 | Le fil rouge est cohérent. | 4 | Un seul fil rouge : la transaction de Dylan à Maxens, de la notion 1 à la 7 ; le bloc 4 miné à la notion 5 est celui de la course de la notion 7 |
| 1.6 | Les métaphores ne créent pas de fausse compréhension. | 3 | Limites signalées dans chaque fiche g) et dans les encarts « En vrai… ». Risque restant : la corde fait penser à un lien, pas à une copie du sceau (notion 2) ; la course de la notion 6 est une simulation, signalée dans le texte |
| 1.7 | Au moins 2 testeurs extérieurs ont été sollicités et leurs retours intégrés. | 2 | 2 testeurs extérieurs en session 1 (#17), retours reportés dans CHOIX §4.x f) et corrections faites (notions 3, 4, 6, 7). Session 2 (#18) à faire avant le rendu |

## Partie 2 — Argumentation des choix (25 %)

| # | Critère | Score 0-4 | Justification / preuve |
|:---|:---|:---:|:---|
| 2.1 | `MMI-R507-projet-blockchain-CHOIX-MODELISATION.md` est complet et couvre les 7 notions. | 4 | v0.13 du 16/11 : les 7 fiches sont remplies de a) à g), avec les sessions 1 et 2 dans chaque tableau f) (#56) ; §3 avec la mesure des FPS du 16/11, §5 cohérence (mise à jour avec la session 2), §6 IA et §7 sources |
| 2.2 | Formes et échelles sont justifiées. | 4 | CHOIX §2.5 et tableaux c) : coffres identiques, tampon du parent deux fois plus petit, îles dispersées sans centre, chaîne de gauche à droite = ordre du temps |
| 2.3 | Couleurs et codes sont cohérents et accessibles. | 4 | Un seul accent (corail = lien), rouge réservé à la fraude ; contrastes mesurés ≥ 4,5 (WCAG 2.2) ; aucune information portée par la couleur seule (CHOIX §2.5) |
| 2.4 | Animations et interactions servent la compréhension. | 3 | Corde qui se coupe, tampon qui s'imprime, avions entre les îles, compteur d'essais en direct. Mais T2 note « les animations m'ont aidé » 2/5 |
| 2.5 | Une alternative écartée est documentée par notion. | 4 | Chaque fiche a un tableau e) Alternative écartée, avec la raison du rejet (ex. course à vitesse fixe remplacée par une course au hasard) |
| 2.6 | Les risques de mauvaise interprétation sont traités. | 4 | Chaque fiche a son b) Risque de mauvaise compréhension et une parade. Le risque principal relevé en session 1 (la corde vue comme un lien, pas comme une copie du sceau) a été traité par l'animation de la copie (#47) et vérifié en session 2 : T4 l'explique, T3 cite cette étape comme la plus claire. Nouveau risque noté à la notion 4 (« île = banque ») |
| 2.7 | Les décisions s'appuient sur les tests utilisateurs. | 4 | Deux sessions (#17, #18) reportées dans les 7 fiches f) sous la forme observation → modification → issue. Les corrections de la session 1 (#45 à #47) ont été mesurées en session 2 (chaînage atteint par T4, plus d'étape incompréhensible) ; celles de la session 2 sont dans #55 (PR #54). Limite : ces dernières n'ont pas été retestées avec des testeurs |

## Partie 3 — GitHub Projects (20 %)

| # | Critère | Score 0-4 | Justification / preuve |
|:---|:---|:---:|:---|
| 3.1 | Le board existe depuis la semaine 1 et utilise les 5 colonnes communes. | 4 | Board créé en semaine 1 (09/10, voir README) avec les colonnes Backlog / À faire / En cours / À vérifier / Terminé |
| 3.2 | Issues granulaires et assignées. | 3 | Une issue par notion et par livrable (#7 à #25), assignées. Certaines sont larges (#15, #16) et regroupent plusieurs semaines de travail |
| 3.3 | Labels cohérents. | 4 | Labels « notion : 1 à 7 », « type : dev / doc / design / gestion / test / bug », « priorité : haute / moyenne / basse », « ia » |
| 3.4 | Milestones obligatoires correspondant au calendrier. | 4 | M1 Cadrage (09/10, 6 issues, fermé), M2 Livraison (15/11, 19 issues, fermé le 16/11), M3 Soutenance (19/11, 7 issues en cours) |
| 3.5 | Commits réguliers et liés aux issues. | 3 | Commits réguliers du 01/10 au 16/11 (8 fiches de suivi). 46 commits sur 57 (hors fusions) citent leur issue ; les 11 autres sont rattachés après coup dans le README (section « Commits sans numéro d'issue »), et tous les commits citent leur issue depuis le 10/11. Pas 4 : le lien manquait au moment du commit |
| 3.6 | Le board reflète l'état réel. | 4 | Mis à jour le 16/11 : les issues fermées sont en « Terminé » (#1 à #21, #45 à #47, #55), le travail restant en « À faire » ou « En cours » (#22 à #25, #56 à #58). #18 fermée avec sa preuve (résultats, PR #54) |
| 3.7 | Répartition visible et expliquée. | 3 | Rôles dans le README et CHOIX §1 ; tableau « Répartition du travail » du README : issues assignées et domaine de chacun. Écart de commits (71 pour Dylan, 15 pour Maxens) expliqué dans le README, ainsi que le commit 651209c au nom de « Claude ». Reste visible et sera à défendre à l'oral |
| 3.8 | Retours transformés en issues puis traités. | 4 | Session 1 : #45 (rythme), #46 (vocabulaire), #47 (copie du sceau), toutes fermées avec leurs PR (#48, #49, #51). Session 2 : #55 (6 corrections, PR #54, fermée), puis #56 (report dans CHOIX) et #57 (nouvelle mesure des FPS) pour ce qui reste |
| 3.9 | Usage de l'IA déclaré. | 4 | Tableau daté dans le README, CHOIX §6 (ce que l'IA a fait, erreurs détectées, décisions du groupe), label « ia » |
| 3.10 | README complet. | 4 | Lancement, démo, board, `?etape=1` à 9, parcours, captures refaites le 16/11 avec l'interface actuelle (#58), accessibilité, structure, tests (sessions 1 et 2), organisation et répartition, commits sans issue, usage de l'IA daté jusqu'au 16/11 |

## Partie 4 — Interaction, UX et finition (15 %)

| # | Critère | Score 0-4 | Justification / preuve |
|:---|:---|:---:|:---|
| 4.1 | Navigation intuitive et éléments identifiables. | 3 | Session 1 : « où cliquer » noté 5 et 4, barre de progression 5 et 4 ; bulles « Clique… » sur l'objet à manipuler |
| 4.2 | Textes lisibles et contrastés. | 4 | Contrastes mesurés ≥ 4,5, texte 17 px ; « textes faciles à lire » noté 4 et 5 en session 1 |
| 4.3 | Rythme des animations compréhensible. | 3 | **Problème relevé, corrigé, puis vérifié** : en session 1, T2 note le rythme 1/5 (« trop lourd, trop compact ») → issue #45, étapes 4 à 7 allégées (PR #42, #48) et copie du sceau animée pas à pas (PR #51) → en session 2, **rythme noté 4 et 4** par les deux nouveaux testeurs, et plus aucune étape jugée incompréhensible (`TEST-UTILISATEUR-RESULTATS.md`). Mouvements réduits respectés (`prefers-reduced-motion` : caméra et animations sautent directement à leur état final). La « petite latence » signalée par T4 a été traitée par deux passages d'optimisation mesurés (#57, PR #61 et #62). Pas 4 : les animations aident peu T4 (1/5) et ces derniers changements n'ont pas été retestés |
| 4.4 | Au moins 30 FPS sur ordinateur standard type poste de TP. | 4 | Mesuré le 17/11 sur la démo en ligne (#57, `scripts/mesure-fps.mjs`, CHOIX §3), sur les 9 étapes avec leur action, avec la carte graphique intégrée (la plus proche d'un poste de TP) : **jamais sous 30 images/s dans trois navigateurs** (pire seconde 52 dans Chrome, 56 dans Edge, 34 dans Firefox) ; processeur ralenti 4 fois, donc plus lent qu'un poste de TP : moyenne d'au moins 35 à chaque étape, pire seconde 27. Obtenu par des optimisations mesurées (PR #61, #62) : appels de dessin de l'archipel divisés par 2, temps de calcul par image réduit d'un tiers, qualité adaptative. Compteur caché (R + P) pour le montrer en direct à la soutenance. Reste à confirmer sur un vrai poste de TP |
| 4.5 | Aucun bug bloquant le parcours principal. | 4 | Parcours des étapes 0 à 8 sans erreur dans la console ; bugs trouvés corrigés (bulle de la notion 5, bloc 4 scellé trop tôt, bateaux) |
| 4.6 | Déploiement en ligne réalisé. | 4 | GitHub Pages, déployé à chaque fusion sur main : https://dyzlek.github.io/r507-blockchain-3d/ |

## Partie 5 — Soutenance (15 %)

| # | Critère | Score 0-4 | Justification / preuve |
|:---|:---|:---:|:---|
| 5.1 | Démo répétée et plan B prévu. | 0 | À faire : répétition (#25) et vidéo de secours (#24) |
| 5.2 | Chaque membre justifie tous les choix. |  | À évaluer après la répétition |
| 5.3 | Chaque membre explique les 7 notions. |  | À évaluer après la répétition |
| 5.4 | Bilan du projet appuyé sur des preuves. |  | Plan de soutenance prêt (`docs/SOUTENANCE.md`), preuves : tests, FPS, board |
| 5.5 | Temps de parole réparti dans les 20 minutes imparties. |  | Partage prévu dans `docs/SOUTENANCE.md`, à chronométrer |
| 5.6 | Support dans le temps imparti. |  | Support à faire (#23), plan minuté dans `docs/SOUTENANCE.md` |

## Estimation de votre note

Additionnez les scores obtenus dans chaque partie : `P1 / 28`, `P2 / 28`, `P3 / 40`, `P4 / 24`, `P5 / 24`. La note sur 20 est :

`Note / 20 = (P1/28 × 5) + (P2/28 × 5) + (P3/40 × 4) + (P4/24 × 3) + (P5/24 × 3)`.

Estimation provisoire (partie 5 non notée, comptée à 12 / 24) : P1 = 23 / 28, P2 = 27 / 28, P3 = 37 / 40, P4 = 22 / 24 (1.3, 4.3 et parties 2 à 4 mises à jour le 16/11), P5 = 12 / 24.

`Note ≈ 4,11 + 4,82 + 3,70 + 2,75 + 1,50 = 16,9 / 20` (à recalculer après la session 2 et la répétition).

## Bilan individuel et actions

| Nom / prénom | Contribution, apprentissages, usage de l'IA, difficulté pour la soutenance |
|:---|:---|
| Dylan | (à écrire par Dylan) |
| Maxens | (à écrire par Maxens) |

| Les 3 actions prioritaires | Responsable | Échéance |
|:---|:---|:---|
| Session 2 de tests avec 2 testeurs neufs, résultats dans `TEST-UTILISATEUR-RESULTATS.md` et CHOIX f) (#18) | Maxens et Dylan | 13/11 |
| Board à jour : fermer #7 à #13 et #19 à #21 avec la preuve (PR, commit) | Dylan | 14/11 |
| Support, vidéo de secours et répétition chronométrée, chacun présente la moitié des notions (#23 à #25) | Maxens et Dylan | 18/11 |
