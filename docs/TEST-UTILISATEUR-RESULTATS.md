# Résultats des tests utilisateurs

- Session 1 (#17) : ci-dessous.
- Session 2 (#18) : en fin de fichier.

# Session 1

Synthèse des réponses du formulaire (`docs/creer-formulaire-test.gs`). Les testeurs sont désignés par code (T1, T2) ; les noms et les horodatages ne sont pas reportés ici. Les réponses brutes restent dans le tableur du formulaire, hors dépôt.

Le PDF exporté ne permet pas d'attribuer avec certitude deux réponses ouvertes (« moment le plus perdu », « mieux compris ») : elles ne sont pas reprises ci-dessous.

## Profils

| Testeur | Tranche d'âge | Métier | Appareil / navigateur | Connaît la blockchain | Cryptomonnaies | Aisance numérique |
|:---|:---|:---|:---|:---|:---|:---:|
| T1 | 41-60 ans | Technicien | Ordinateur, Chrome | « J'en ai entendu parler » | Non | 4 |
| T2 | 18-25 ans | Assistante de direction | Ordinateur, Opera | « Pas du tout » | Non | 3 |

## Compréhension (8 questions du protocole)

Notation : 2 = réponse juste, 1 = partielle, 0 = fausse ou « je ne sais pas ». Les réponses sont résumées, la notation est une lecture provisoire à valider par le groupe avec la grille du protocole.

| Question | T1 | T2 |
|:---|:---|:---|
| Qu'est-ce que la blockchain, selon vous ? | 1 (« un livre de comptes », partiel) | 0 (« des données sécurisées ») |
| Que contient un bloc ? | 2 (transaction, sceau d'avant, sceau du bloc, nonce) | 1 (« les deux sceaux ») |
| Qu'est-ce qui relie deux blocs ? | 1 (« les sceaux », sans dire que le sceau est recopié) | 1 (« le sceau sert à relier ») |
| Que se passe-t-il si quelqu'un modifie un ancien bloc ? | 2 (« l'ancien sceau change, ça casse la chaîne ») | 1 (« la chaîne est cassée », sans raison) |
| Pourquoi les données sont-elles copiées chez plusieurs participants ? | 1 (« pour la sécurité ») | 0 (« je sais pas ») |
| Qu'est-ce que « miner » un bloc ? | 1 (« générer un sceau ») | 0 (« je ne sais pas ») |
| Deux manières de se mettre d'accord sur la chaîne | 0 (« je ne sais pas ») | 0 (« je sais pas ») |
| Qu'est-ce qu'une double dépense ? | 0 (« je ne sais pas ») | 0 (« je ne sais pas ») |

Lecture rapide : T1 répond juste sur la structure du bloc et la falsification, T2 a du mal dès la définition. Les deux ne savent pas expliquer le consensus ni la double dépense : ce sont les questions de la fin, après l'étape 6 et 7.

Notation révisée après relecture des critères du protocole : Q3 de T1 et Q3 et Q4 de T2 ne donnent pas la raison du lien ou de la détection, donc 1 (et non 2 comme dans la première lecture).

## Analyse par notion (critères du protocole et hypothèses de CHOIX §f)

| Notion | Question (partie C) | Critère | T1 | T2 |
|:---|:---|:---|:---:|:---:|
| 1 Structure d'un bloc | Q2 | Nomme au moins 3 éléments | Atteint (4) | Non (2 : « les deux sceaux ») |
| 2 Chaînage | Q3 | Dit que le sceau du parent est recopié | Non | Non |
| 3 Falsification | Q4 | Explique la détection par les sceaux | Atteint | Non (pas de raison) |
| 4 Réseau | Q5 | Explique la copie chez plusieurs participants | Partiel (« pour la sécurité ») | Non |
| 5 Minage | Q6 | Définit miner par des essais de nonce | Partiel (« générer un sceau ») | Non |
| 6 Consensus | Q7 | Cite les deux méthodes et leur avantage | Non en partie C, mais décrit les deux méthodes à l'étape 6 | Non |
| 7 Attaque | Q8 | Définit la double dépense | Non | Non |

Lecture :
- **Ce qui marche** : la structure du bloc et la détection de falsification sont comprises par T1. Les deux testeurs sont au même niveau sur la cassure de la chaîne sans en donner la raison.
- **Écart perçu / compris** : T1 note les étapes 4 à 7 « claires », mais répond « je ne sais pas » à Q7 et Q8 en fin de test. La clarté perçue ne dit pas si le contenu est retenu. À mesurer par les questions de compréhension, pas par les notes de ressenti.
- **Hypothèses non testées** : le protocole demande d'observer si le testeur éteint une île sans consigne (notion 4) et s'il trouve la lampe du coffre seul (notion 1). Le formulaire ne le mesure pas, il faut les observations de l'animateur.

## Par étape

Réponses à « Cette étape était… » (Claire / Un peu confuse / Incompréhensible) :

| Étape | T1 | T2 |
|:---|:---|:---|
| 0 Avant de commencer | Claire | Claire |
| 1 Le coffre | Claire | Un peu confuse |
| 2 La corde | Claire | Claire |
| 3 La falsification | Un peu confuse | Un peu confuse |
| 4 Le réseau (îles et avions) | Claire | Incompréhensible |
| 5 La course (minage) | Claire | Incompréhensible |
| 6 Le consensus | Claire | Incompréhensible |
| 7 L'attaque | Claire | Incompréhensible |

Ce qui a été compris et ce qui ne l'a pas été :
- **T1** : sceau, corde et falsification sont compris. Le rôle des îles et des avions est dit (« nœud », « transaction »). La course est comprise (calcul, premier à trouver). Le consensus est résumé comme « puissance de calcul ou mise », mais la question sur les deux manières reste sans réponse.
- **T2** : la corde et la cassure de la chaîne sont comprises. Le rôle des sceaux est confus (« les deux sceaux, je sais pas »). Les étapes 4 à 7 sont jugées incompréhensibles ; l'objectif de la course est formulé comme « avoir le plus de jetons ».

## Avis sur l'expérience (1 à 5)

| Affirmation | T1 | T2 |
|:---|:---:|:---:|
| J'ai compris où cliquer sans aide | 5 | 4 |
| Les textes sont faciles à lire | 4 | 5 |
| Les animations m'ont aidé à comprendre | 5 | 2 |
| Le rythme est bon | 5 | 1 |
| Je me suis repéré avec la barre de progression | 5 | 4 |
| L'univers en papier m'a plu | 5 | 4 |
| Je pourrais expliquer la blockchain à quelqu'un | 4 | 1 |
| J'ai eu envie d'aller jusqu'au bout | 4 | 1 |

## Retours ouverts

- **T1** : sur les 8 questions ouvertes de fin, T1 n'en a rempli que 3 ; le PDF supprime les cellules vides, donc la colonne exacte de chacune reste à confirmer dans le tableur :
  - « les termes techniques » : réponse placée avant le bouton « En vrai… », donc une des questions sur ce qui a perdu ou manqué (mot ou phrase non compris, ce qui manque) ; elle indique que le vocabulaire a gêné ;
  - bouton « En vrai… » (explication technique) : **« Aidé »** ;
  - « bon tuto sur la blockchain » : dernière réponse, donc « ce que vous retenez, en une phrase » (ou « changer une seule chose » si la question de fin est vide).
  - Pas de réponse à « moment le plus perdu », « mieux compris », « en trop » : à ne pas interpréter comme « rien ».
- **T2** : les sceaux sont « trop lourds, trop compacts » ; il faudrait des animations plus détaillées qui servent davantage ; « trouver un autre exemple » ; les sceaux montrent mal la liaison entre blocs (« l'exemple que les sceaux font la liaison » pour la retenue).
- **T2, « que retenez-vous »** : « les sceaux font la liaison ».
- **Bouton « En vrai… »** : T1 et T2 répondent tous deux « Aidé ». À conserver tel quel.

## Ce que ça change pour le projet

1. **Lenteur et densité** : le rythme (1/5 pour T2) et les animations (2/5) pointent surtout les étapes 4 à 7.
2. **Vocabulaire** : « sceau », « nonce », « consensus » et « double dépense » ne sont pas compris. Un glossaire ou des reformulations sont à envisager avant la session 2.
3. **Sceaux** : les deux testeurs ont trouvé le rôle des sceaux confus à un degré ou à un autre. Piste : une présentation plus visuelle du lien entre les blocs (issue à créer).
4. **Taille de l'échantillon** : 2 testeurs, dont un seul n'a aucune connaissance préalable. Insuffisant pour conclure ; la session 2 (#18) est nécessaire.

## Limites

- 2 testeurs seulement, dont un seul sans aucune connaissance préalable.
- Le critère du protocole (« 6 réponses sur 8 notées 2 ») n'est pas atteint : T1 a 2 réponses notées 2 sur 8, T2 n'en a aucune. La notation est à valider par le groupe.
- Les observations de l'animateur (temps, clics, blocages) ne figurent pas dans le formulaire ; elles sont à compléter dans `docs/TEST-UTILISATEUR.md`.

# Session 2 (#18)

Date : 11/11/2026 · Version testée : démo publiée à 9 étapes (après #45 à #47) · Formulaire : `docs/creer-formulaire-session-2.gs`

Deux testeurs, appelés T3 et T4 dans la suite de la session 1 (codes testeurs et horodatages non reportés).

## Profils

| Testeur | Tranche d'âge | Métier | Appareil / navigateur | Connaît la blockchain | Cryptomonnaies | Aisance numérique |
|:---|:---|:---|:---|:---|:---|:---:|
| T3 | 18-25 ans | M1, en réorientation | Ordinateur, Chrome | « Pas du tout » | Non | 5 |
| T4 | 18-25 ans | Sans emploi | Ordinateur, Opera GX | « Pas du tout » | Non | 5 |

Les deux partent de zéro, alors qu'en session 1 un seul testeur était dans ce cas.

## Compréhension (0 / 1 / 2), comparée à la session 1

Même grille qu'en session 1 ; notation provisoire à valider par le groupe.

| Question | T1 (s1) | T2 (s1) | T3 | T4 |
|:---|:-:|:-:|:-:|:-:|
| C1 Blockchain | 1 | 0 | 1 (« des boîtes » qui sécurisent les transactions) | 1 (validation entre ordinateurs, sans parler de registre chaîné) |
| C2 Contenu d'un bloc | 2 | 1 | 1 (« une chaîne et des sceaux ») | 2 (deux sceaux, transaction, nonce) |
| C3 Lien entre blocs | 1 | 1 | 0 (« chaîne ») | 2 (le sceau du précédent est recopié) |
| C4 Modification d'un ancien bloc | 2 | 1 | 1 (« on le remarque », sans raison) | 2 (le sceau ne correspond plus, les autres refusent) |
| C5 Copies chez plusieurs participants | 1 | 0 | 1 (« s'assurer que tout est en règle ») | 2 (sinon personne ne peut vérifier) |
| C6 Miner | 1 | 0 | 0 (« idk ») | 2 (essais jusqu'à un sceau qui respecte la règle des 0) |
| C7 Deux manières de se mettre d'accord | 0 | 0 | 0 (« les mêmes sceaux ») | 2 (course au calcul, tirage selon la mise) |
| C8 Double dépense | 0 | 0 | 1 (récupérer son argent en allant plus vite, flou) | 2 (refaire la fin de la chaîne pour réutiliser ses jetons ; la plus longue gagne) |
| **Réponses notées 2** | 2 / 8 | 0 / 8 | 0 / 8 | 7 / 8 |

Lecture :
- **T4 atteint le critère du protocole** (6 réponses sur 8 notées 2), une première. Les notions de fin (minage, consensus, double dépense), à 0 pour tout le monde en session 1, sont expliquées avec ses mots.
- **T3 reste au niveau de T2 (s1)** sur les questions de fin. Pourtant, pendant le parcours, T3 décrit bien la cassure (« le code ne correspond plus ») et les deux méthodes de consensus (« travail » et « tiré au sort ») : compris sur le moment, pas retenu à la fin.
- C7 : T4 donne l'avantage de la mise (« la plus économe ») à l'étape 7, pas dans C7 ; noté 2 quand même.

## Analyse par notion

| Notion | Critère | T3 | T4 |
|:---|:---|:---:|:---:|
| 1 Structure d'un bloc | Nomme au moins 3 éléments | Non | Atteint |
| 2 Chaînage | Dit que le sceau du parent est recopié | Non (pendant le parcours : « le code ne correspond plus ») | Atteint |
| 3 Falsification | Explique la détection par les sceaux | Partiel | Atteint |
| 4 Réseau | Explique la copie chez plusieurs participants | Partiel | Atteint |
| 5 Minage | Définit miner par des essais de nonce | Non (« idk » aussi à l'étape 6) | Atteint |
| 6 Consensus | Cite les deux méthodes et leur avantage | Non en partie C, oui à l'étape 7 | Atteint |
| 7 Attaque | Définit la double dépense | Partiel | Atteint |

Le chaînage (notion 2), raté par les deux testeurs de la session 1, est atteint par T4, et T3 désigne l'étape 3 comme celle qui l'a le mieux fait comprendre : les changements sur le sceau recopié (#45 à #47) semblent porter.

## Par étape (Claire / Un peu confuse / Incompréhensible)

| Étape | T3 | T4 |
|:---|:---|:---|
| 1 Avant de commencer | Un peu confuse | Claire |
| 2 Le coffre | Claire | Un peu confuse |
| 3 La corde | Claire | Claire |
| 4 La falsification | Claire | Un peu confuse |
| 5 Le réseau | Claire | Un peu confuse |
| 6 La course (minage) | Claire | Un peu confuse |
| 7 Le consensus | Claire | Un peu confuse |
| 8 L'attaque | Claire | Claire |
| 9 La fin | Claire | Claire |

Aucune étape « Incompréhensible » (T2 en avait 4 en session 1). L'écart perçu / compris se retrouve dans les deux sens : T3 trouve presque tout clair mais n'a aucune réponse notée 2 ; T4 trouve 5 étapes un peu confuses mais en a 7.

Pendant le parcours :
- **Étape 1** : T3 ne sait pas quoi faire pour continuer sans aide et voit « des boîtes » ; T4 trouve seul.
- **Étape 5** : pour T3, les îles sont des banques et les avions de l'argent ; pour T4, îles = ordinateurs, avions = chaînes envoyées.
- **Étape 6** : T3 ne sait pas quel est le but de la course (« idk »). Le minage reste son point faible, comme pour T2 en session 1.
- **Étape 8** : les deux comprennent le but de l'attaquant ; T3 relie 30 % / 60 % à la difficulté.

## Ce qu'ils ont fait (cases cochées)

| Action | T3 | T4 |
|:---|:-:|:-:|
| Lampe du coffre (étape 2) | oui | oui |
| Comparer les sceaux (étape 3) | oui | oui |
| Falsifier le bloc 1 (étape 4) | oui | oui |
| Éteindre une île (étape 5) | oui | non |
| Envoyer le bloc falsifié (étape 5) | oui | oui |
| Minage ou 000 (étape 6) | oui | oui |
| Course ET tirage (étape 7) | oui | oui |
| Rejouer la double dépense ou 60 % (étape 8) | oui | oui |
| Tourner autour de la scène | oui | non |
| Ouvrir « En vrai… » | non | oui |
| Ouvrir « Les mots de cette étape » | non | oui |
| Indice de l'accompagnateur | une ou deux fois | jamais |

T4, le seul à avoir ouvert « En vrai… » et le lexique, est aussi celui qui répond le mieux. Avec deux testeurs, ce n'est qu'un indice.

## Avis sur l'expérience (1 à 5)

| Affirmation | T1 (s1) | T2 (s1) | T3 | T4 |
|:---|:-:|:-:|:-:|:-:|
| J'ai compris où cliquer sans aide | 5 | 4 | 3 | 5 |
| Les textes sont faciles à lire | 4 | 5 | 5 | 4 |
| Les animations m'ont aidé à comprendre | 5 | 2 | 5 | 1 |
| Le rythme est bon | 5 | 1 | 4 | 4 |
| Je me suis repéré avec la barre de progression | 5 | 4 | 2 | 1 |
| L'univers en papier m'a plu | 5 | 4 | 4 | 3 |
| Je pourrais expliquer la blockchain à quelqu'un | 4 | 1 | 3 | 2 |
| J'ai eu envie d'aller jusqu'au bout | 4 | 1 | 4 | 3 |
| La liste « Les mots de cette étape » m'a aidé | — | — | 2 | 4 |

- **Rythme** : 4 et 4, contre 1 pour T2 en session 1.
- **Barre de progression** : 2 et 1, contre 5 et 4 en session 1. Elle est passée de 7 à 9 étapes entre les deux sessions : à regarder.
- **« Je pourrais expliquer »** : T4 se note 2 avec 7 réponses sur 8 justes. La confiance ne suit pas la compréhension.
- **T3 et le lexique** : note 2, mais T3 dit ne pas l'avoir ouvert ; la note dit surtout qu'il ne l'a pas vu ou pas utilisé.

## Retours ouverts

| | T3 | T4 |
|:---|:---|:---|
| Étape la plus perdante | 8, double dépense : « pas du milieu », donc les mots | 6, course au sceau (« rien » ne l'a perdu) |
| Étape la mieux comprise | 3, sceau du précédent : les animations sont plus pédagogiques | 4, trafiquer un coffre : refaire un vieux bloc oblige à refaire les suivants |
| Mot non compris / manque / en trop | aucun / rien / rien | aucun / rien / rien |
| « En vrai… » | pas utilisé | Aidé |
| « Les mots de cette étape » | pas utilisée | Aidé |
| Une seule chose à changer | texte plus grand | « petite latence générale » |
| Ce qu'il retient | c'est sûr, mais vols et fraudes restent possibles | la manière dont les transactions sont traitées |

## Observations de l'animateur (partie F du protocole)

Non fournies avec les réponses du formulaire ; à compléter si elles ont été prises.

| Élément | T3 | T4 |
|:---|:---|:---|
| Durée totale | | |
| Blocages de plus de 30 s | | |
| Lampe trouvée seul / île éteinte seul / bloc falsifié envoyé | les trois cochés (indice 1 ou 2 fois) | lampe et envoi cochés, île non |
| Courses jouées à l'étape 8 | | |
| FPS ressentis | | « petite latence » (Opera GX) |

## Ce que ça change

1. **Les changements après la session 1 portent en partie** : plus d'étape « incompréhensible », rythme à 4, chaînage compris par T4 et cité par T3 comme l'étape la plus claire. Un testeur sans aucune connaissance atteint 7/8.
2. **Le minage reste le point faible** quand on ne lit pas les explications : T3 ne sait dire ni le but de la course ni ce que veut dire miner. Piste : une phrase à l'écran à l'étape 6, « miner = essayer des nombres jusqu'à trouver un sceau qui commence par 000 ».
3. **Compris sur le moment, oublié à la fin (T3)** : l'étape 9 pourrait reprendre chaque notion en une ligne pour ancrer avant les questions.
4. **Démarrage (étape 1)** : T3 ne sait pas quoi faire sans aide. Rendre la première action plus visible.
5. **Barre de progression** : notes en forte baisse (2 et 1). Vérifier qu'elle se lit avec 9 étapes (libellés, étape en cours).
6. **Lisibilité et fluidité** : T3 veut un texte plus grand, T4 signale une latence (Opera GX). Vérifier la taille de police et les FPS sur un autre navigateur.
7. **« En vrai… » et le lexique** : utiles quand on les ouvre (T4), ignorés sinon (T3). Les rendre plus visibles plutôt que d'alourdir le texte principal.

## Limites

- 2 testeurs, 18-25 ans, très à l'aise avec le numérique (5/5) : aucun profil moins à l'aise.
- Écart très fort entre les deux (0 et 7 réponses notées 2) : impossible de dire si c'est la version qui progresse ou le profil de T4 (lecture attentive, usage de « En vrai… »).
- Notation provisoire, à valider par le groupe.
- Pas d'observations de l'animateur dans les réponses.
