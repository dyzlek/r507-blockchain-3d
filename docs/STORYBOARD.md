# Storyboard écrit — Blockchain 3D (R507)

Issue #14 : storyboard du parcours complet. Ce document décrit, étape par étape, ce que voit et fait l'utilisateur, de l'arrivée sur la page jusqu'à la vue d'ensemble finale. Il est **écrit, sans dessins** : chaque plan dit ce qu'on voit, ce qu'on lit, ce qu'on fait, ce qui change et comment on passe au plan suivant. Les textes affichés sont ceux de `src/sequences.js` au 11/11/2026 (ils y sont repris en version courte ; le texte complet est dans le fichier).

- **Public :** 16–25 ans, hors informatique. **Durée visée :** 10 à 15 minutes.
- **Parcours :** 9 étapes = une introduction, les 7 notions, une vue d'ensemble.
- **Fil rouge :** une transaction, « Dylan envoie 5 jetons à Maxens ». Elle est annoncée dès l'introduction, voyage dans le réseau (notion 4), est rangée dans un bloc (notion 5), puis Dylan essaie de la défaire par une double dépense (notion 7).
- **Métaphore :** un registre de coffres en carton scellés par des tampons (les sceaux), recopié sur un archipel d'îles en papier (CHOIX §2.2).

## 1. Principes de l'ordre

1. **Du petit au grand.** On commence par un seul coffre (notions 1 à 3, sur l'île de Dylan), puis on recule pour voir le réseau (notions 4 à 7). Chaque notion s'appuie sur la précédente et n'utilise aucun mot que la précédente n'a pas défini.
2. **Chaque étape répond à une question** posée par la précédente :

| Étape | Question à laquelle elle répond | Question qu'elle laisse ouverte |
|:---|:---|:---|
| 0 Intro | C'est quoi, l'idée ? | Qu'y a-t-il dans un coffre ? |
| 1 Structure | Que contient un bloc ? | Comment les blocs tiennent-ils ensemble ? |
| 2 Chaînage | Qu'est-ce qui relie deux blocs ? | Et si quelqu'un modifie un vieux bloc ? |
| 3 Immutabilité | Pourquoi on ne peut pas tricher ? | Qui garde cette chaîne ? |
| 4 Réseau | Pourquoi plusieurs copies ? | Qui crée le prochain bloc ? |
| 5 Minage | Comment un bloc est-il scellé ? | Qui scelle, quand tout le monde peut ? |
| 6 Consensus | Comment se mettre d'accord sans chef ? | Peut-on quand même tricher ? |
| 7 Attaque | Que faut-il pour tricher à coup sûr ? | Qu'a-t-on vu au total ? |
| 8 Ensemble | Tout le chemin, d'un seul regard | — |

3. **Une action par étape.** À chaque étape, un bouton ou un clic fait « jouer » la notion. On comprend en le faisant, pas en lisant. Le panneau change après l'action (texte « inspecté »).
4. **Chaque notion finit par un « À retenir »** (notions 4, 6, 7), une phrase à garder.
5. **Un post-it « En vrai… »** donne, sur demande, la version technique (hash, nœud, mempool, Bitcoin). Il n'est jamais nécessaire pour comprendre.

## 2. Direction visuelle

| Élément | Description |
|:---|:---|
| Bureau | Crème, grain de papier, lumière de lampe chaude en haut à gauche |
| Coffre (bloc) | Boîte en carton kraft, une **fenêtre en papier calque** devant, une lampe à l'intérieur qui s'allume à l'inspection |
| Sceau | **Tampon encreur rond**, couleur et motif propres à chaque bloc ; le sceau du parent est un tampon plus petit dans le coin avant gauche |
| Corde | Corde corail qui relie deux coffres ; elle devient rouge et se coupe en cas de falsification |
| Île | Feuilles de papier découpées empilées, décor pop-up qui se relève |
| Avion | Avion en papier plié : les messages voyagent d'île en île (rouge pour un bloc falsifié) |
| Interface | Fiche cartonnée lignée (à gauche, en bas sur téléphone), boutons en carton, post-it jaune « En vrai… », barre de 9 pastilles numérotées |
| Couleurs | Encre sombre, fiche crème, post-it jaune, **corail** = ce qui relie ou demande l'attention, **rouge réservé à la fraude** |

**Règles de cohérence :** la chaîne va toujours de gauche (ancien) à droite (récent) ; un même coffre garde le même tampon d'une étape à l'autre ; le rouge ne sert qu'à la triche.

## 3. Vue d'ensemble du parcours

| # | Étape | Titre à l'écran | Où est la caméra | Action de l'utilisateur | Ce qui change |
|:-:|:---|:---|:---|:---|:---|
| 1 | Avant de commencer | Une chaîne de coffres en carton | Large, face à la chaîne | Lire, « Suivant » | Rien, on découvre la chaîne |
| 2 | Notion 1 · Structure | Le coffre | Gros plan sur le coffre n°2 | Clic sur le coffre ou sur la lampe | Le calque s'éclaire, 4 étiquettes apparaissent |
| 3 | Notion 2 · Chaînage | Chaque coffre garde le sceau du précédent | Les 3 coffres de face | « Comparer les sceaux » | Anneaux corail autour des sceaux jumeaux |
| 4 | Notion 3 · Immutabilité | Trafiquer un coffre, ça se voit | Idem | « Falsifier le bloc 1 » | Nouveau sceau, corde coupée, anneaux rouges |
| 5 | Notion 4 · Réseau | L'archipel | Plongée sur l'archipel | Envoyer la transaction, éteindre une île, envoyer le bloc falsifié | Avions de papier d'île en île |
| 6 | Notion 5 · Minage | La course au sceau | Gros plan sur un nouveau coffre (bloc 4) | « Lancer le minage », difficulté 00 / 000 | Sceaux pâles qui défilent, puis un sceau net |
| 7 | Notion 6 · Consensus | Qui scelle le bloc ? | Plongée sur l'archipel | Course (preuve de travail), puis tirage (preuve d'enjeu) | Une île gagne |
| 8 | Notion 7 · Attaque | La double dépense | Vue au-dessus de deux branches | Choix de la puissance, « Lancer la course » | Deux branches avancent, une l'emporte |
| 9 | Vue d'ensemble | Tout l'archipel | Dézoom total | Tourner autour de la scène | Rien, on revoit tout |

## 4. Plans détaillés

Pour chaque plan : **Cadre**, **Panneau**, **Action**, **Après l'action**, **Transition**, **Objectif de compréhension**.

### Plan 1 — Avant de commencer : « Une chaîne de coffres en carton »
- **Cadre :** vue large. Trois coffres en carton alignés, reliés par une corde, chacun avec son tampon. Aucun n'est mis en avant.
- **Panneau :** « Une blockchain, c'est un cahier de comptes. Tout le monde peut le lire, personne ne peut le modifier en douce. » Chaque coffre est un bloc fermé par un sceau. On va suivre « Dylan envoie 5 jetons à Maxens ».
- **Action :** aucune. Bouton « Suivant ».
- **Transition :** la caméra glisse jusqu'au coffre du milieu.
- **Objectif :** l'utilisateur a l'image de départ et sait quelle histoire on va suivre.

### Plan 2 — Notion 1 : « Le coffre »
- **Cadre :** gros plan sur un coffre. Une bulle « Clique sur le coffre » flotte dessous.
- **Panneau :** ce coffre est un bloc, il contient « Thomas envoie 3 jetons à Julien ». Sa fenêtre est en papier calque (l'ouvrir casserait le sceau). On peut allumer la lampe pour mieux voir.
- **Action :** clic sur le coffre, ou bouton « Allumer la lampe ».
- **Après l'action :** la lampe s'allume, quatre étiquettes pointent chaque champ : **la transaction**, **le nombre (nonce)**, **le sceau**, **le sceau du coffre d'avant**. Le panneau explique que le sceau est une empreinte : une lettre changée, un sceau totalement différent.
- **Transition :** la caméra recule pour montrer les trois coffres.
- **Objectif :** retenir que le bloc a 4 éléments et que le sceau dépend de tout le contenu.

### Plan 3 — Notion 2 : « Chaque coffre garde le sceau du précédent »
- **Cadre :** les trois coffres de face. Dans le coin de chaque coffre, un petit sceau : la copie du sceau du coffre d'avant.
- **Panneau :** « C'est une copie du sceau du coffre d'avant. C'est ça qui forme la chaîne. »
- **Action :** bouton « Comparer les sceaux ».
- **Après l'action :** des anneaux corail entourent les sceaux jumeaux (le grand du bloc 1 et le petit du bloc 2, puis 2 et 3).
- **Transition :** même cadre, pour que la falsification se joue sur la même image.
- **Objectif :** comprendre que « chaîne » veut dire « chaque bloc contient le sceau du précédent ».

### Plan 4 — Notion 3 : « Trafiquer un coffre, ça se voit »
- **Cadre :** mêmes trois coffres.
- **Panneau :** « Quelqu'un veut tricher : il change la transaction du bloc 1, pour que Nicolas envoie 200 jetons au lieu de 2. Essaie. »
- **Action :** « Falsifier le bloc 1 ».
- **Après l'action :** le bloc 1 reçoit un nouveau sceau, très différent ; la corde vers le bloc 2 devient rouge et se coupe ; les anneaux rouges montrent que la copie dans le bloc 2 ne correspond plus. Le panneau explique qu'il faudrait refaire tous les blocs suivants pour cacher la triche, et annonce que les autres ordinateurs refuseront le bloc trafiqué. Le bouton devient « Remettre comme avant ».
- **Transition :** la caméra monte, traverse des nuages et arrive sur l'archipel (la chaîne n'était qu'une île).
- **Objectif :** la falsification se voit tout de suite, parce que les sceaux ne correspondent plus.

### Plan 5 — Notion 4 : « L'archipel »
- **Cadre :** plongée sur un archipel d'îles en papier, sans île au centre. Dylan à gauche, Maxens à droite. Les décors se relèvent à l'arrivée.
- **Panneau :** « Chaque île est un ordinateur. Il a sa propre copie de la chaîne. Personne n'est le chef. » Consigne : cliquer sur l'île de Dylan.
- **Action :** envoyer la transaction de Dylan. Puis, au choix : éteindre une île (clic) et renvoyer, ou choisir « Bloc 1 falsifié » et l'envoyer.
- **Après l'action :**
  - Transaction normale : des avions en papier partent de l'île de Dylan et passent d'île en île, chacune vérifie puis la transmet. Une île qui a déjà la transaction ignore le doublon, c'est ce qui arrête la propagation. Une île éteinte est contournée.
  - Bloc falsifié : l'avion est rouge, les voisines de Dylan comparent avec leur copie, **refusent** (anneau rouge, « refuse le bloc ✗ ») et ne le transmettent pas. Maxens ne le reçoit jamais.
- **Transition :** la transaction attend au-dessus des îles (la « salle d'attente »). La caméra redescend à travers les nuages vers la chaîne, au bout de laquelle apparaît un nouveau coffre.
- **Objectif :** comprendre pourquoi il y a plusieurs copies (pas de chef, pas de point faible) et que chaque île vérifie ce qu'elle reçoit.

### Plan 6 — Notion 5 : « La course au sceau »
- **Cadre :** gros plan sur un **nouveau coffre au bout de la chaîne** (bloc 4), sans sceau. Plaque « Bloc n°4 · sans sceau ».
- **Panneau :** la transaction de Dylan est rangée dans un nouveau coffre. Règle : le sceau doit commencer par **00**. On ne le choisit pas, on change le nonce et on recalcule.
- **Action :** « Lancer le minage ». Option de difficulté : `000`.
- **Pendant :** le nonce change à chaque essai, un sceau pâle se pose et s'efface, un compteur d'essais grimpe.
- **Après :** un sceau net s'imprime, plaque « Bloc n°4 · scellé ». Le panneau donne le nombre d'essais : beaucoup pour trouver, un seul calcul pour vérifier. Avec `000`, environ 16 fois plus d'essais.
- **Transition :** la caméra remonte, à travers les nuages, vers l'archipel.
- **Objectif :** « miner », c'est faire beaucoup d'essais ; trouver est difficile, vérifier est facile.

### Plan 7 — Notion 6 : « Qui scelle le bloc ? »
- **Cadre :** plongée sur l'archipel, avec des ordinateurs sur chaque île (en nombre différent) pour la course, et des jetons pour le tirage au sort.
- **Panneau :** toutes les îles peuvent proposer le prochain bloc, il en faut un seul. Méthode 1 : la **course** (preuve de travail). Méthode 2 : le **tirage au sort** (preuve d'enjeu). « Essaie les deux. »
- **Action :** lancer la course, puis le tirage, rejouer à volonté.
- **Après :**
  - Course : une seule île gagne, les autres ont calculé pour rien (beaucoup d'électricité). L'île qui a le plus d'ordinateurs gagne plus souvent.
  - Tirage : un seul tirage, presque aucun calcul. Une île qui triche perd sa mise. Les plus riches gagnent plus souvent.
- **Transition :** la caméra redescend, à travers les nuages, vers la chaîne.
- **Objectif :** il existe plusieurs façons de se mettre d'accord sans chef, chacune avec ses avantages et ses limites.

### Plan 8 — Notion 7 : « La double dépense »
- **Cadre :** vue au-dessus de deux branches de coffres : la chaîne honnête (la transaction de Maxens dans le bloc 4) et la **branche secrète de Dylan**, un autre bloc 4. Lignes « Résultats » et deux transactions en conflit.
- **Panneau :** « Dylan triche : en secret, il fabrique un autre bloc 4 où il garde ses 5 jetons. » Les îles suivent la chaîne la plus longue. Choix de la puissance de Dylan (30 % ou 60 %).
- **Action :** « Lancer la course » (temps de bloc tirés au hasard). Rejouer plusieurs fois.
- **Après :**
  - Dylan perd (cas habituel à 30 %) : sa chaîne est plus courte, les îles l'ignorent, Maxens garde ses jetons. Les confirmations s'ajoutent.
  - Dylan gagne (cas habituel à 60 %) : sa chaîne est plus longue, les îles la suivent, le bloc de Maxens disparaît. C'est l'**attaque des 51 %**.
  - Coup de chance ou de malchance : un texte explique que le hasard peut contredire la règle sur une course courte, et pourquoi Bitcoin attend 6 confirmations.
- **Transition :** la caméra remonte, à travers les nuages, pour le dézoom final.
- **Objectif :** définir la double dépense et comprendre qu'il faut plus de la moitié de la puissance pour tricher à coup sûr.

### Plan 9 — Vue d'ensemble : « Tout l'archipel »
- **Cadre :** dézoom total. On voit l'île de Dylan avec sa chaîne et tout l'archipel.
- **Panneau :** « Une blockchain, c'est un cahier de comptes recopié partout, où chaque page est scellée à la précédente. » On peut tourner autour de la scène pour tout revoir.
- **Action :** aucune obligatoire (le bouton « Suivant » est désactivé, c'est la fin).
- **Objectif :** boucler le parcours en une phrase, et laisser l'utilisateur explorer.

## 5. Transitions et rythme

| Passage | Effet de caméra |
|:---|:---|
| Entre deux étapes proches (chaîne ↔ chaîne) | La caméra glisse, 0,8 à 1,8 s selon la distance |
| Chaîne ↔ archipel (étapes 4→5, 5→6, 6→7, 7→8, 8→9) | Traversée d'une nappe de nuages (environ 2,3 s) : montée, passage dans les nuages, sortie. Les étiquettes se cachent pendant la traversée et reviennent à l'arrivée |
| Étiquettes et bulles | Elles apparaissent après l'objet qu'elles décrivent |

**Rythme visé :** 1 à 2 minutes par étape. Les étapes 5 à 8 (réseau, minage, consensus, attaque) sont les plus denses : c'est là que les tests utilisateurs ont signalé un rythme trop rapide (TEST-UTILISATEUR-RESULTATS.md), d'où les textes raccourcis, les « À retenir » et les exemples du quotidien.

**Navigation :** boutons « Précédent / Suivant », pastilles numérotées (9), flèches ← → du clavier, `?etape=N` dans l'adresse pour ouvrir directement une étape. Avec `prefers-reduced-motion`, la caméra saute directement au point de vue suivant.

## 6. Variante téléphone (≤ 760 px)

La fiche passe **en bas de l'écran** (elle défile), la scène occupe le haut, la caméra est un peu plus reculée sur l'archipel, la course et la vue d'ensemble pour que l'objet concerné ne soit pas caché par la fiche. Mêmes étapes, mêmes textes.

## 7. Ce qui a changé depuis la première version (27/10/2026)

- Une étape en plus : la **vue d'ensemble** (9 étapes au lieu de 8).
- **Notion 4** : l'avion rouge et le refus du bloc falsifié par les autres îles ; l'explication des doublons.
- **Notion 7** : course au hasard avec résultats cumulés, deux transactions en conflit, textes de chance et de malchance.
- **Notion 6** : course simulée (la gagnante est tirée au sort selon ses chances).
- **Textes** relus pour des non-initiés (jetons et transaction définis, « corde » au lieu de « ruban », exemple du vélo).
- Les **prompts d'images** de la première version ont été retirés : le storyboard est maintenant purement écrit, la référence visuelle est la démo elle-même.
