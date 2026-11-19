# Soutenance — plan minuté (20 min)

Issues #23 (support), #24 (vidéo de secours), #25 (répétition). Durée totale : **20 minutes**.

**Support : https://dyzlek.github.io/r507-blockchain-3d/soutenance/diapo.html** (16 diapos, en ligne ; source : [`public/soutenance/diapo.html`](../public/soutenance/diapo.html)). Flèches ou Espace pour avancer, **N** ouvre les notes dans une autre fenêtre (qui parle, créneau, texte à dire, chronomètre ; à mettre sur l'écran de l'ordinateur, sans la montrer au jury ; elle fait aussi avancer les diapos), **F** pour le plein écran. Chaque diapo de notion a un lien direct vers l'étape de la démo. On alterne les parleurs à chaque partie : chacun présente la moitié des notions, mais **chacun doit pouvoir répondre sur les 7** (questions du jury).

## Avant de commencer (la veille et 10 min avant)

- [ ] Démo ouverte sur https://dyzlek.github.io/r507-blockchain-3d/ **et** en local (`npm run dev`), au cas où le réseau tombe.
- [ ] Vidéo de secours (#24) sur le bureau et sur une clé USB : tout le parcours, 3 à 4 min, sans son.
- [ ] Onglets prêts : démo, board GitHub Projects, `CHOIX-MODELISATION.md`, `TEST-UTILISATEUR-RESULTATS.md`.
- [ ] Liens directs : `?etape=1` … `?etape=8` pour sauter à une notion si le temps manque.
- [ ] Rafraîchir la page juste avant (les résultats de la course de la notion 7 repartent de zéro).

## Déroulé

| Temps | Partie | Qui | Ce qu'on montre | Phrase clé |
|:---|:---|:---|:---|:---|
| 0:00 – 0:45 | Titre, présentation | Maxens | Diapo 1 ; se présenter, lancer la démo en ligne | « On a voulu expliquer la blockchain à quelqu'un qui n'y connaît rien. » |
| 0:45 – 1:15 | Public et idées à retenir | Maxens | Diapo « public 16-25 ans » ; fil rouge d'une transaction | « Ils connaissent le mot Bitcoin, pas le fonctionnement. » |
| 1:15 – 1:30 | La métaphore | Maxens | Diapo des 8 cartes ; alternatives écartées (livre de comptes, Lego) | « Une blockchain, c'est un cahier de comptes recopié partout, où chaque page est scellée à la précédente. » |
| 1:30 – 4:00 | Notions 1 et 2 : le coffre, la corde | Maxens | Allumer la lampe ; « Comparer les sceaux » | « Le sceau est calculé à partir de tout le contenu : c'est un vrai SHA-256. Le coffre suivant recopie ce sceau. » |
| 4:00 – 5:30 | Notion 3 : la falsification | Dylan | « Falsifier » : le sceau change, la corde se coupe | « Changer une lettre change tout le sceau : la copie dans le coffre suivant ne correspond plus. » |
| 5:30 – 7:30 | Notion 4 : l'archipel | Dylan | Traversée des nuages ; éteindre une île ; envoyer le bloc 1 falsifié (avion rouge, îles qui refusent) | « Chaque île garde sa copie et compare : un bloc truqué est refusé. Une île en panne ne bloque rien. » |
| 7:30 – 9:00 | Notion 5 : le minage | Maxens | Miner en `00`, puis `000` ; montrer le compteur d'essais | « Trouver demande des centaines d'essais. Vérifier n'en demande qu'un. » |
| 9:00 – 10:30 | Notion 6 : le consensus | Maxens | Course (preuve de travail) puis tirage (preuve d'enjeu) ; ligne « Bilan » | « Course : sûre mais gourmande. Tirage : sobre mais favorise les plus riches. Ici la course est simulée, c'est dit dans "En vrai". » |
| 10:30 – 12:30 | Notion 7 : la double dépense | Dylan | Les deux transactions en conflit ; course à 30 % deux ou trois fois, puis à 60 % ; ligne « Résultats » | « À 30 %, Dylan gagne parfois par chance sur une course courte : c'est pour ça qu'on attend 6 confirmations. Au-delà de 50 %, il gagne presque toujours. » |
| 12:30 – 13:45 | Choix de modélisation | Maxens | Fiches CHOIX (3 alternatives écartées), charte graphique | « Un seul accent, corail = ce qui relie ; rouge réservé à la fraude. » |
| 13:45 – 15:00 | Tests utilisateurs | Maxens | `TEST-UTILISATEUR-RESULTATS.md` : session 1 puis session 2 ; corrections #45 #46 #47 ; limite : #55 non retesté | « Critère 6/8 non atteint en session 1 ; en session 2, T4 à 7/8, T3 reste à 0/8 : on le dit. » |
| 15:00 – 16:00 | Gestion de projet | Dylan | Board, milestones, labels, fiches `docs/suivi` ; répartition des commits (README) | « Chaque retour de test devient une issue, une PR, fermée avec sa preuve. » |
| 16:00 – 16:45 | Performance (FPS) | Dylan | Script `scripts/mesure-fps.mjs` ; compteur R + P en direct ; carte intégrée, à froid, moyenne d'au moins 46 (Chrome), 67 (Edge), 49 (Firefox) ; pire seconde 37, 46 et 40 | « Notre première mesure était fausse, on l'a refaite. Pas mesuré sur un vrai poste de TP. » |
| 16:45 – 17:30 | Usage de l'IA | Dylan | CHOIX §6, label « ia » | « L'IA a écrit une grande partie du code ; nous avons choisi, vérifié à l'écran et corrigé, par exemple la course sans hasard. » |
| 17:30 – 18:30 | Bilan et limites | Les deux | Maxens : ce qui marche, notion la plus fragile ; Dylan : ce qu'on referait ; chacun une phrase sur ce qu'il a appris | « Avec une semaine de plus : tester plus tôt, animer la copie du sceau. » |
| 18:30 – 20:00 | Marge, questions | Les deux | Chacun répond sur les 7 notions | |

Si on prend du retard : sauter la 2e course de la notion 6 et ne faire qu'une course à 60 % à la notion 7.

## Questions probables du jury (chacun doit savoir répondre)

| Question | Réponse courte | Où le montrer |
|:---|:---|:---|
| Les hash sont-ils réels ? | Oui, SHA-256 via `crypto.subtle`, sur l'index, le sceau d'avant, la transaction et le nonce | `src/chain.js` |
| Pourquoi des coffres et pas des cubes ? | On voit le contenu par le calque sans ouvrir, et un sceau qu'on ne peut pas recoller | CHOIX §2.2, 2.4 |
| Pourquoi la falsification n'est-elle détectée par les îles qu'à la notion 4 ? | L'archipel n'existe pas encore à la notion 3 ; la notion 3 l'annonce, la 4 le montre | CHOIX §4.3 |
| La course de la notion 6 est-elle réelle ? | Non, simulée : gagnante tirée au sort selon la puissance, essais ralentis. Le minage réel est à la notion 5 | CHOIX §4.6 g) |
| Pourquoi seulement 3 blocs dans la course de la notion 7 ? | Pour que la démo dure quelques secondes ; on dit que Bitcoin en attend 6 | CHOIX §4.7 g) |
| Qu'est-ce qui n'a pas marché aux tests ? | Le chaînage (copie du sceau) et les étapes 4 à 7 pour T2 ; ce qu'on a corrigé | `TEST-UTILISATEUR-RESULTATS.md` |
| Qui a fait quoi ? | Dylan : 3D, intégration, board, déploiement. Maxens : design, contenu, tests, documents. Les commits ne montrent pas tout le travail de Maxens (tests, formulaire, relectures) | README, CHOIX §1 |
| Comment avez-vous mesuré les FPS ? | Avec notre script `scripts/mesure-fps.mjs` : navigateur piloté sur les 9 étapes, action déclenchée, 5 s par étape. Carte intégrée (remesuré le 18/11) : à froid, moyenne d'au moins 46 images/s dans Chrome, Edge et Firefox, pire seconde entre 37 et 46 ; processeur ralenti 4 fois : moyennes de 32 à 42. Mesure locale sur la version finale : Chrome 72 à 98 de moyenne, pire seconde 65. Portable chaud, la pire seconde peut descendre à 26 : à dire franchement. Notre première mesure (« plus de 60 ») était fausse : on l'a refaite. En direct : R + P | CHOIX §3, #57 |

## Répétition (#25)

| Essai | Date | Durée | Ce qui a débordé | Correction |
|:---|:---|:---|:---|:---|
| 1 | | | | |
| 2 (en échangeant les parties) | | | | |

Le 2e essai se fait en **échangeant les parleurs** : c'est le meilleur test pour savoir si chacun maîtrise tout le projet.
