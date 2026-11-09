# BUT MMI 3e année — R507

## Projet Three.js — Visualisation pédagogique de la blockchain

### `MMI-R507-projet-blockchain-GRILLE-AUTOEVAL.md`

À remplir en groupe puis individuellement avant la soutenance, dans le dépôt. Elle sert à repérer les lacunes et préparer la soutenance ; elle n'est pas notée en elle-même. Toute note cochée doit être justifiée par une phrase ou une preuve.

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
| 1.3 | Un utilisateur non initié comprend sans explication orale préalable. | 2 | Session 1 : T1 comprend les notions 1 à 3, T2 juge les étapes 4 à 7 incompréhensibles ; le critère « 6 réponses sur 8 notées 2 » n'est atteint par personne (T1 : 2/8, T2 : 0/8). Textes 6 et 7 réécrits depuis : à confirmer en session 2 (#18) |
| 1.4 | L'ordre est pédagogique et progressif. | 3 | Progression du bloc seul à l'attaque, chaque notion réutilise la précédente (CHOIX §5). Mais la difficulté monte trop vite à partir de l'étape 4 d'après la session 1 |
| 1.5 | Le fil rouge est cohérent. | 4 | Un seul fil rouge : la transaction de Dylan à Maxens, de la notion 1 à la 7 ; le bloc 4 miné à la notion 5 est celui de la course de la notion 7 |
| 1.6 | Les métaphores ne créent pas de fausse compréhension. | 3 | Limites signalées dans chaque fiche g) et dans les encarts « En vrai… ». Risque restant : la corde fait penser à un lien, pas à une copie du sceau (notion 2) ; la course de la notion 6 est une simulation, signalée dans le texte |
| 1.7 | Au moins 2 testeurs extérieurs ont été sollicités et leurs retours intégrés. | 2 | 2 testeurs extérieurs en session 1 (#17), retours reportés dans CHOIX §4.x f) et corrections faites (notions 3, 4, 6, 7). Session 2 (#18) à faire avant le rendu |

## Partie 2 — Argumentation des choix (25 %)

| # | Critère | Score 0-4 | Justification / preuve |
|:---|:---|:---:|:---|
| 2.1 | `MMI-R507-projet-blockchain-CHOIX-MODELISATION.md` est complet et couvre les 7 notions. | 3 | Les 7 fiches sont remplies (a à g), ainsi que §5 cohérence, §6 IA et §7 sources (v0.11 du 09/11). Les lignes « Session 2 » restent à remplir |
| 2.2 | Formes et échelles sont justifiées. | 4 | CHOIX §2.5 et tableaux c) : coffres identiques, tampon du parent deux fois plus petit, îles dispersées sans centre, chaîne de gauche à droite = ordre du temps |
| 2.3 | Couleurs et codes sont cohérents et accessibles. | 4 | Un seul accent (corail = lien), rouge réservé à la fraude ; contrastes mesurés ≥ 4,5 (WCAG 2.2) ; aucune information portée par la couleur seule (CHOIX §2.5) |
| 2.4 | Animations et interactions servent la compréhension. | 3 | Corde qui se coupe, tampon qui s'imprime, avions entre les îles, compteur d'essais en direct. Mais T2 note « les animations m'ont aidé » 2/5 |
| 2.5 | Une alternative écartée est documentée par notion. | 4 | Chaque fiche a un tableau e) Alternative écartée, avec la raison du rejet (ex. course à vitesse fixe remplacée par une course au hasard) |
| 2.6 | Les risques de mauvaise interprétation sont traités. | 3 | Chaque fiche a son b) Risque de mauvaise compréhension et une parade ; les tests montrent que le risque de la notion 2 n'est pas encore traité |
| 2.7 | Les décisions s'appuient sur les tests utilisateurs. | 2 | Session 1 reportée dans les 7 fiches f) avec la modification faite. Une seule session à ce jour ; la notion 2 n'a pas encore été corrigée |

## Partie 3 — GitHub Projects (20 %)

| # | Critère | Score 0-4 | Justification / preuve |
|:---|:---|:---:|:---|
| 3.1 | Le board existe depuis la semaine 1 et utilise les 5 colonnes communes. | 4 | Board créé en semaine 1 (09/10, voir README) avec les colonnes Backlog / À faire / En cours / À vérifier / Terminé |
| 3.2 | Issues granulaires et assignées. | 3 | Une issue par notion et par livrable (#7 à #25), assignées. Certaines sont larges (#15, #16) et regroupent plusieurs semaines de travail |
| 3.3 | Labels cohérents. | 4 | Labels « notion : 1 à 7 », « type : dev / doc / design / gestion / test / bug », « priorité : haute / moyenne / basse », « ia » |
| 3.4 | Milestones obligatoires correspondant au calendrier. | 4 | M1 Cadrage (09/10, fermé), M2 Livraison (15/11), M3 Soutenance (19/11) |
| 3.5 | Commits réguliers et liés aux issues. | 3 | Commits réguliers depuis le 01/10, la plupart avec un numéro d'issue (#7 à #19). Quelques commits de correction sans issue |
| 3.6 | Le board reflète l'état réel. | 2 | Au 09/11, les issues des notions (#7 à #13) sont encore ouvertes alors que les notions marchent : à fermer avec un lien vers la PR comme preuve avant le 15/11 |
| 3.7 | Répartition visible et expliquée. | 2 | Rôles écrits (README, CHOIX §1). Mais la répartition des commits est déséquilibrée (environ 40 pour Dylan, 13 pour Maxens) : à expliquer (Maxens : design, contenu, tests, documents) |
| 3.8 | Retours transformés en issues puis traités. | 3 | Retours de la session 1 traduits en corrections dans #9, #10, #12, #13 et notés dans CHOIX ; pas d'issue créée pour la notion 2 (copie du sceau) |
| 3.9 | Usage de l'IA déclaré. | 4 | Tableau daté dans le README, CHOIX §6 (ce que l'IA a fait, erreurs détectées, décisions du groupe), label « ia » |
| 3.10 | README complet. | 3 | Lancement, liens démo et board, `?etape=N`, accessibilité, structure, usage de l'IA. À relire pour #21 (état final, tests) |

## Partie 4 — Interaction, UX et finition (15 %)

| # | Critère | Score 0-4 | Justification / preuve |
|:---|:---|:---:|:---|
| 4.1 | Navigation intuitive et éléments identifiables. | 3 | Session 1 : « où cliquer » noté 5 et 4, barre de progression 5 et 4 ; bulles « Clique… » sur l'objet à manipuler |
| 4.2 | Textes lisibles et contrastés. | 4 | Contrastes mesurés ≥ 4,5, texte 17 px ; « textes faciles à lire » noté 4 et 5 en session 1 |
| 4.3 | Rythme des animations compréhensible. | 2 | Rythme noté 5 par T1 mais 1 par T2 ; transitions accélérées et textes raccourcis depuis, à revérifier en session 2 |
| 4.4 | Au moins 30 FPS sur ordinateur standard type poste de TP. | 4 | Plus de 60 images/s sur tout le parcours, y compris processeur ralenti 6 fois dans Chrome, mesuré le 09/11 (#19 fermée, CHOIX §3) |
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

Estimation provisoire (partie 5 non notée, comptée à 12 / 24) : P1 = 22 / 28, P2 = 23 / 28, P3 = 32 / 40, P4 = 21 / 24, P5 = 12 / 24.

`Note ≈ 3,93 + 4,11 + 3,20 + 2,63 + 1,50 = 15,4 / 20` (à recalculer après la session 2 et la répétition).

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
