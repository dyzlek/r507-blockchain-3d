# Résultats du test utilisateur — session 1

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

- **T1** : « les termes techniques » ont gêné la compréhension.
- **T2** : les sceaux sont « trop lourds, trop compacts » ; il faudrait des animations plus détaillées qui servent davantage ; « trouver un autre exemple » ; les sceaux montrent mal la liaison entre blocs (« l'exemple que les sceaux font la liaison » pour la retenue).
- **T2, « que retenez-vous »** : « les sceaux font la liaison ».

## Ce que ça change pour le projet

1. **Lenteur et densité** : le rythme (1/5 pour T2) et les animations (2/5) pointent surtout les étapes 4 à 7.
2. **Vocabulaire** : « sceau », « nonce », « consensus » et « double dépense » ne sont pas compris. Un glossaire ou des reformulations sont à envisager avant la session 2.
3. **Sceaux** : les deux testeurs ont trouvé le rôle des sceaux confus à un degré ou à un autre. Piste : une présentation plus visuelle du lien entre les blocs (issue à créer).
4. **Taille de l'échantillon** : 2 testeurs, dont un seul n'a aucune connaissance préalable. Insuffisant pour conclure ; la session 2 (#18) est nécessaire.

## Limites

- 2 testeurs seulement, dont un seul sans aucune connaissance préalable.
- Le critère du protocole (« 6 réponses sur 8 notées 2 ») n'est pas atteint : T1 a 2 réponses notées 2 sur 8, T2 n'en a aucune. La notation est à valider par le groupe.
- Les observations de l'animateur (temps, clics, blocages) ne figurent pas dans le formulaire ; elles sont à compléter dans `docs/TEST-UTILISATEUR.md`.
