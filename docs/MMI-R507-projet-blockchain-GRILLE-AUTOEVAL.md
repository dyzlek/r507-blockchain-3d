# BUT MMI 3e année — R507

## Projet Three.js — Visualisation pédagogique de la blockchain

### `MMI-R507-projet-blockchain-GRILLE-AUTOEVAL.md`

À remplir en groupe puis individuellement avant la soutenance, dans le dépôt. Elle sert à repérer les lacunes et préparer la soutenance ; elle n'est pas notée en elle-même. Toute note cochée doit être justifiée par une phrase ou une preuve.

> **Remplie en groupe le 16/11/2026, après les deux sessions de tests (#17, #18) et les mesures de FPS (#57).** Chaque note renvoie à une preuve dans le dépôt (fichier, issue, PR ou commit). Les notes sont prudentes : quand une correction n'a pas été retestée avec des testeurs, la note reste à 3. La partie 5 se note après la répétition (#25). Les bilans individuels sont à écrire par chacun (dernière section).

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
| 1.4 | L'ordre est pédagogique et progressif. | 3 | Du bloc seul à l'attaque, chaque notion réutilise la précédente (CHOIX §5), et l'étape 9 reprend chaque notion en une ligne. La montée trop rapide après l'étape 4 (T2, session 1) a été traitée (#45) : en session 2, aucune étape n'est jugée incompréhensible, et T4 explique minage, consensus et double dépense. Pas 4 : T4 trouve encore les étapes 4 à 7 « un peu confuses », et T3 cite l'étape 8 comme la plus perdante |
| 1.5 | Le fil rouge est cohérent. | 4 | Un seul fil rouge : la transaction de Dylan à Maxens, de la notion 1 à la 7 ; le bloc 4 miné à la notion 5 est celui de la course de la notion 7 |
| 1.6 | Les métaphores ne créent pas de fausse compréhension. | 3 | Limites de chaque métaphore écrites dans les fiches g) de CHOIX et dans les encarts « En vrai… ». Le risque de la session 1 (la corde vue comme un simple lien) est levé en session 2 : T4 explique que le sceau du précédent est recopié. Nouveau risque observé : pour T3, les îles sont des banques et les avions de l'argent (notion 4, noté dans CHOIX §4.4 f). Pas 4 tant que ce risque n'est pas traité et retesté |
| 1.7 | Au moins 2 testeurs extérieurs ont été sollicités et leurs retours intégrés. | 4 | **4 testeurs extérieurs** non initiés, en deux sessions (#17, #18), avec le même protocole (`TEST-UTILISATEUR.md`) et les résultats détaillés dans `TEST-UTILISATEUR-RESULTATS.md`. Chaque retour est devenu une issue puis une correction : session 1 → #45, #46, #47 (PR #48, #49, #51) ; session 2 → #55 (PR #54), #56 (report dans les 7 fiches f de CHOIX), #57 (latence, PR #61 et #62). L'effet des corrections de la session 1 est mesuré en session 2 (0/8 et 2/8 → 7/8 pour T4) |

## Partie 2 — Argumentation des choix (25 %)

| # | Critère | Score 0-4 | Justification / preuve |
|:---|:---|:---:|:---|
| 2.1 | `MMI-R507-projet-blockchain-CHOIX-MODELISATION.md` est complet et couvre les 7 notions. | 4 | v0.15 du 17/11 : les 7 fiches sont remplies de a) à g), avec les sessions 1 et 2 dans chaque tableau f) (#56) ; §3 avec les FPS mesurés le 17/11 dans trois navigateurs (#57), §5 cohérence (mise à jour avec la session 2), §6 IA et §7 sources |
| 2.2 | Formes et échelles sont justifiées. | 4 | CHOIX §2.5 et tableaux c) : coffres identiques, tampon du parent deux fois plus petit, îles dispersées sans centre, chaîne de gauche à droite = ordre du temps |
| 2.3 | Couleurs et codes sont cohérents et accessibles. | 4 | Un seul accent (corail = lien), rouge réservé à la fraude ; contrastes mesurés ≥ 4,5 (WCAG 2.2) ; aucune information portée par la couleur seule (CHOIX §2.5) |
| 2.4 | Animations et interactions servent la compréhension. | 3 | Corde qui se coupe, copie du sceau qui s'envole vers le coffre suivant, tampon qui s'imprime, avions entre les îles, compteur d'essais en direct. T3 cite l'étape 3 (copie du sceau) comme la mieux comprise grâce aux animations. Mais « les animations m'ont aidé » est noté 5, 2, 5 et 1 sur les deux sessions : avis partagés |
| 2.5 | Une alternative écartée est documentée par notion. | 4 | Chaque fiche a un tableau e) Alternative écartée, avec la raison du rejet (ex. course à vitesse fixe remplacée par une course au hasard) |
| 2.6 | Les risques de mauvaise interprétation sont traités. | 4 | Chaque fiche a son b) Risque de mauvaise compréhension et une parade. Le risque principal relevé en session 1 (la corde vue comme un lien, pas comme une copie du sceau) a été traité par l'animation de la copie (#47) et vérifié en session 2 : T4 l'explique, T3 cite cette étape comme la plus claire. Nouveau risque noté à la notion 4 (« île = banque ») |
| 2.7 | Les décisions s'appuient sur les tests utilisateurs. | 4 | Deux sessions (#17, #18) reportées dans les 7 fiches f) sous la forme observation → modification → issue. Les corrections de la session 1 (#45 à #47) ont été mesurées en session 2 (chaînage atteint par T4, plus d'étape incompréhensible) ; celles de la session 2 sont dans #55 (PR #54). Limite : ces dernières n'ont pas été retestées avec des testeurs |

## Partie 3 — GitHub Projects (20 %)

| # | Critère | Score 0-4 | Justification / preuve |
|:---|:---|:---:|:---|
| 3.1 | Le board existe depuis la semaine 1 et utilise les 5 colonnes communes. | 4 | Board créé en semaine 1 (09/10, voir README) avec les colonnes Backlog / À faire / En cours / À vérifier / Terminé |
| 3.2 | Issues granulaires et assignées. | 3 | Une issue par notion et par livrable (#7 à #25), assignées. Certaines sont larges (#15, #16) et regroupent plusieurs semaines de travail |
| 3.3 | Labels cohérents. | 4 | Labels « notion : 1 à 7 », « type : dev / doc / design / gestion / test / bug », « priorité : haute / moyenne / basse », « ia » |
| 3.4 | Milestones obligatoires correspondant au calendrier. | 4 | M1 Cadrage (09/10, 6 issues, fermé), M2 Livraison (15/11, 19 issues, fermé le 16/11), M3 Soutenance (19/11, 7 issues : 3 fermées, 4 en cours, le support, la vidéo, la répétition et cette grille) |
| 3.5 | Commits réguliers et liés aux issues. | 3 | Commits réguliers du 01/10 au 16/11 (8 fiches de suivi). 46 commits sur 57 (hors fusions) citent leur issue ; les 11 autres sont rattachés après coup dans le README (section « Commits sans numéro d'issue »), et tous les commits citent leur issue depuis le 10/11. Pas 4 : le lien manquait au moment du commit |
| 3.6 | Le board reflète l'état réel. | 4 | Vérifié le 17/11 : les 28 issues fermées sont en « Terminé » (#1 à #21, #45 à #47, #55 à #58), le travail restant est en « En cours » (#22, cette grille) ou « À faire » (#23 à #25). Chaque issue fermée renvoie à sa preuve (PR, résultats, commentaire de fermeture, par exemple #57 qui dit ce qui n'a pas été mesuré) |
| 3.7 | Répartition visible et expliquée. | 3 | Rôles dans le README et CHOIX §1 ; tableau « Répartition du travail » du README : issues assignées et domaine de chacun. Écart de commits (71 pour Dylan, 15 pour Maxens) expliqué dans le README, ainsi que le commit 651209c au nom de « Claude ». Reste visible et sera à défendre à l'oral |
| 3.8 | Retours transformés en issues puis traités. | 4 | Session 1 : #45 (rythme), #46 (vocabulaire), #47 (copie du sceau), toutes fermées avec leurs PR (#48, #49, #51). Session 2 : #55 (6 corrections, PR #54, fermée), puis #56 (report dans CHOIX, PR #60) et #57 (latence signalée par T4 : mesure et optimisations, PR #61, #62, #64, #65), toutes fermées |
| 3.9 | Usage de l'IA déclaré. | 4 | Tableau daté dans le README, CHOIX §6 (ce que l'IA a fait, erreurs détectées, décisions du groupe), label « ia » |
| 3.10 | README complet. | 4 | Lancement, démo, board, `?etape=1` à 9, parcours, captures refaites le 16/11 avec l'interface actuelle (#58), accessibilité, structure, tests (sessions 1 et 2), organisation et répartition, commits sans issue, usage de l'IA daté jusqu'au 16/11 |

## Partie 4 — Interaction, UX et finition (15 %)

| # | Critère | Score 0-4 | Justification / preuve |
|:---|:---|:---:|:---|
| 4.1 | Navigation intuitive et éléments identifiables. | 3 | « Où cliquer sans aide » noté 5, 4, 3 et 5 sur les deux sessions ; bulles « Clique… » sur l'objet à manipuler ; T4 n'a eu besoin d'aucun indice. Deux défauts relevés en session 2 et corrigés (#55, PR #54) : la barre de progression (notée 2 et 1) affiche maintenant « Étape X sur 9 » et des points numérotés, et le bouton Suivant est mis en avant à l'étape 1, où T3 ne savait pas quoi faire. Pas 4 : ces corrections n'ont pas été retestées |
| 4.2 | Textes lisibles et contrastés. | 4 | Contrastes mesurés ≥ 4,5 (WCAG 2.2, CHOIX §2.5) ; « textes faciles à lire » noté 4, 5, 5 et 4 sur les deux sessions ; texte passé de 17 à 18 px après la demande de T3 (#55) ; mots clés mis en évidence et lexique ouvert par défaut |
| 4.3 | Rythme des animations compréhensible. | 3 | **Problème relevé, corrigé, puis vérifié** : en session 1, T2 note le rythme 1/5 (« trop lourd, trop compact ») → issue #45, étapes 4 à 7 allégées (PR #42, #48) et copie du sceau animée pas à pas (PR #51) → en session 2, **rythme noté 4 et 4** par les deux nouveaux testeurs, et plus aucune étape jugée incompréhensible (`TEST-UTILISATEUR-RESULTATS.md`). Mouvements réduits respectés (`prefers-reduced-motion` : caméra et animations sautent directement à leur état final). La « petite latence » signalée par T4 a été traitée par deux passages d'optimisation mesurés (#57, PR #61 et #62). Pas 4 : les animations aident peu T4 (1/5) et ces derniers changements n'ont pas été retestés |
| 4.4 | Au moins 30 FPS sur ordinateur standard type poste de TP. | 4 | Remesuré le 18/11 sur la démo en ligne (#57, `scripts/mesure-fps.mjs`, CHOIX §3), 9 étapes avec leur action, carte graphique intégrée (la plus proche d'un poste de TP) : **moyenne d'au moins 46 images/s à chaque étape dans les trois navigateurs** (Chrome 46, Edge 67, Firefox 49, premier passage à froid) ; pire seconde 37 dans Chrome, 46 dans Edge, 40 dans Firefox. Portable chaud, passages suivants : moyennes de 36 à 46 et pire seconde de 26 à 38 dans Chrome et Edge. Processeur ralenti 4 fois (plus lent qu'un poste de TP) : moyennes de 32 à 42, pire seconde 27. Série prise avec d'autres programmes ouverts et un portable qui chauffe : le critère est tenu en moyenne, la pire seconde peut passer sous 30 à chaud. Optimisations (PR #54 à #80) : ombres, résolution, objets instanciés. Compteur caché (R + P) pour le montrer en direct. Reste à confirmer sur un vrai poste de TP |
| 4.5 | Aucun bug bloquant le parcours principal. | 4 | Les 4 testeurs sont allés jusqu'au bout et ont fait les actions de chaque étape (cases cochées, `TEST-UTILISATEUR-RESULTATS.md`) ; parcours des 9 étapes sans erreur dans la console, revérifié le 16/11 après les optimisations (PR #61, #62) ; bugs trouvés corrigés (bulle de la notion 5, bloc 4 scellé trop tôt, bateaux) |
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

Estimation au 16/11 (partie 5 pas encore notée, comptée à 12 / 24 en attendant la répétition) : P1 = 25 / 28, P2 = 27 / 28, P3 = 37 / 40, P4 = 22 / 24, P5 = 12 / 24.

`Note ≈ 4,46 + 4,82 + 3,70 + 2,75 + 1,50 = 17,2 / 20` (à recalculer après la répétition : chaque point gagné en partie 5 vaut 0,125).

## Bilan individuel et actions

Chacun écrit son bilan à la première personne, en 5 à 8 lignes. Il doit couvrir : ce que j'ai fait (avec 2 ou 3 preuves : issues, PR, fichiers), ce que j'ai appris, comment j'ai utilisé l'IA et ce que j'ai vérifié moi-même, et la difficulté que je crains pour la soutenance. Les faits pré-remplis viennent du README (« Répartition du travail ») et du board ; la partie personnelle est à écrire par chacun.

| Nom / prénom | Contribution, apprentissages, usage de l'IA, difficulté pour la soutenance |
|:---|:---|
| Dylan | **Contribution** : scène 3D et intégration Three.js, notions 1, 2, 3 et 5, caméra et transitions, performances et mesure des FPS (#19, #57, PR #61, #62), déploiement sur Pages, board et suivi (#6, #21) ; corrections tirées des deux sessions de tests (#45 à #47, #55). **Ce que j'ai appris** : utiliser Three.js ; le fonctionnement de la blockchain ; travailler en groupe et m'organiser avec GitHub (issues, board, PR) ; avancer régulièrement sur la durée du projet plutôt que tout faire d'un coup. **Usage de l'IA** : je m'en suis servi pour aller plus vite, pour apprendre et comprendre ce que je codais, et pour avoir un point de vue extérieur sur mon travail (usages détaillés et datés dans le README). **Difficulté pour l'oral** : certaines notions sont compliquées, et il faudra savoir les expliquer clairement |
| Maxens | **Faits (à vérifier)** : direction « maquette en papier », charte et accessibilité, notions 4, 6 et 7, storyboard (#14), CHOIX-MODELISATION (#20), protocole, formulaires et animation des deux sessions de tests (#17, #18). **À écrire par Maxens** : Ce que j'ai appris : je connaissais mal la blockchain, et je sais maintenant que c'est un registre partagé où chaque bloc est scellé au précédent par un hash, donc une modification casse toute la suite, comme un sceau de cire brisé. Les idées de départ, les îles et les boîtes, viennent de moi, et pour le code je me suis appuyé sur l'IA. J'ai fait des résumés de ce qui n'allait pas, testé moi-même si tout marchait et si c'était logique, par exemple en changeant les couleurs pour que les sceaux d'une paire soient ensemble, et j'ai refusé ce qui ajoutait trop de texte alors que c'était déjà long pour les utilisateurs. Les tests ont montré que les gens ne restaient pas concentrés longtemps et retenaient mal, donc on a refait toutes les explications, alors que pour nous c'était logique. Le design final, on l'a choisi nous-mêmes, et le test rapide de mon coté avec mon frère, qui n'y connaît rien, a prouvé qu'il comprend quasiment tout. Ce qui me fait peur pour l'oral : c'est le code, et surtout les notions 1, 2, 3 et 5 que je n'ai pas codées. |

| Les 3 actions prioritaires (au 16/11) | Responsable | Échéance |
|:---|:---|:---|
| Support de soutenance, vidéo de secours du parcours et répétition chronométrée où chacun explique les notions qu'il n'a pas faites (#23, #24, #25) ; puis noter la partie 5 | Maxens et Dylan | 18/11 |
| Mini-test sur la version actuelle avec 1 ou 2 nouveaux non-initiés, mêmes questions (pour confirmer 1.3, 4.1 et 4.3) ; en salle de TP, relever les FPS avec le compteur caché (R + P) pour confirmer 4.4 (#57, mesures faites sur 3 navigateurs) | Maxens (test), Dylan (FPS) | 18/11 |
| Écrire les deux bilans individuels ci-dessus et relire ensemble toutes les notes de cette grille | Chacun | 18/11 |
