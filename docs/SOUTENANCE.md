# Soutenance — plan minuté (20 min)

Issues #23 (support), #24 (vidéo de secours), #25 (répétition). Durée totale : **20 minutes**. On alterne les parleurs à chaque partie : chacun présente la moitié des notions, mais **chacun doit pouvoir répondre sur les 7** (questions du jury).

## Avant de commencer (la veille et 10 min avant)

- [ ] Démo ouverte sur https://dyzlek.github.io/r507-blockchain-3d/ **et** en local (`npm run dev`), au cas où le réseau tombe.
- [ ] Vidéo de secours (#24) sur le bureau et sur une clé USB : tout le parcours, 3 à 4 min, sans son.
- [ ] Onglets prêts : démo, board GitHub Projects, `CHOIX-MODELISATION.md`, `TEST-UTILISATEUR-RESULTATS.md`.
- [ ] Liens directs : `?etape=1` … `?etape=8` pour sauter à une notion si le temps manque.
- [ ] Rafraîchir la page juste avant (les résultats de la course de la notion 7 repartent de zéro).

## Déroulé

| Temps | Partie | Qui | Ce qu'on montre | Phrase clé |
|:---|:---|:---|:---|:---|
| 0:00 – 1:30 | Le projet, le public, la métaphore | Maxens | Étape 0 ; diapo « public 16-25 ans, maquette en papier » | « Une blockchain, c'est un cahier de comptes recopié partout, où chaque page est scellée à la précédente. » |
| 1:30 – 4:00 | Notions 1 et 2 : le coffre, la corde | Maxens | Allumer la lampe ; « Comparer les sceaux » | « Le sceau est calculé à partir de tout le contenu : c'est un vrai SHA-256. Le coffre suivant recopie ce sceau. » |
| 4:00 – 5:30 | Notion 3 : la falsification | Dylan | « Falsifier » : le sceau change, la corde se coupe | « Changer une lettre change tout le sceau : la copie dans le coffre suivant ne correspond plus. » |
| 5:30 – 7:30 | Notion 4 : l'archipel | Dylan | Traversée des nuages ; éteindre une île ; envoyer le bloc 1 falsifié (avion rouge, îles qui refusent) | « Chaque île garde sa copie et compare : un bloc truqué est refusé. Une île en panne ne bloque rien. » |
| 7:30 – 9:00 | Notion 5 : le minage | Maxens | Miner en `00`, puis `000` ; montrer le compteur d'essais | « Trouver demande des centaines d'essais. Vérifier n'en demande qu'un. » |
| 9:00 – 10:30 | Notion 6 : le consensus | Maxens | Course (preuve de travail) puis tirage (preuve d'enjeu) ; ligne « Bilan » | « Course : sûre mais gourmande. Tirage : sobre mais favorise les plus riches. Ici la course est simulée, c'est dit dans "En vrai". » |
| 10:30 – 12:30 | Notion 7 : la double dépense | Dylan | Les deux transactions en conflit ; course à 30 % deux ou trois fois, puis à 60 % ; ligne « Résultats » | « À 30 %, Dylan gagne parfois par chance sur une course courte : c'est pour ça qu'on attend 6 confirmations. Au-delà de 50 %, il gagne presque toujours. » |
| 12:30 – 15:00 | Choix et tests | Maxens | `TEST-UTILISATEUR-RESULTATS.md` : tableau session 1 (et session 2) ; ce qu'on a changé | Les chiffres réels, même mauvais : « critère 6/8 non atteint en session 1, voici ce qu'on a corrigé et ce que la session 2 montre. » |
| 15:00 – 17:00 | Gestion de projet et technique | Dylan | Board, milestones, labels ; FPS (plus de 60 images/s, processeur ralenti 6 fois) ; usage de l'IA (CHOIX §6) | « L'IA a écrit une grande partie du code ; nous avons choisi, vérifié à l'écran et corrigé ses erreurs, par exemple la course sans hasard. » |
| 17:00 – 18:30 | Bilan et limites | Les deux | CHOIX §5 : notion la moins bien représentée, ce qu'on referait | « Avec une semaine de plus : tester plus tôt, animer la copie du sceau. » |
| 18:30 – 20:00 | Marge, questions | Les deux | | |

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
| Comment avez-vous mesuré les FPS ? | Outils de développement de Chrome, onglet Performance, processeur ralenti 6 fois : plus de 60 images/s | CHOIX §3, #19 |

## Répétition (#25)

| Essai | Date | Durée | Ce qui a débordé | Correction |
|:---|:---|:---|:---|:---|
| 1 | | | | |
| 2 (en échangeant les parties) | | | | |

Le 2e essai se fait en **échangeant les parleurs** : c'est le meilleur test pour savoir si chacun maîtrise tout le projet.
