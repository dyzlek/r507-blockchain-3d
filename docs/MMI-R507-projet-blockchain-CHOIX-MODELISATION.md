# BUT MMI 3e année — R507

## Projet Three.js — Visualisation pédagogique de la blockchain

### `MMI-R507-projet-blockchain-CHOIX-MODELISATION.md` — livrable officiel

Ce document détaillé est le **livrable officiel** consacré aux choix de modélisation. Il compte pour 25 % de la note. Il doit être complété au fur et à mesure du projet, avec une section par notion, au format `docs/MMI-R507-projet-blockchain-CHOIX-MODELISATION.md`. Chaque choix doit expliquer sa valeur pédagogique, une alternative écartée et l'effet des tests utilisateurs.

## 1. Informations générales

| Champ | Contenu |
|:---|:---|
| Groupe | Maxens, Dylan |
| Membres et rôles | Dylan (@dyzlek) : développement 3D et intégration, board et déploiement — Maxens (@MaxX-J) : design, UX et contenu pédagogique, documentation et tests |
| Public cible | Lycéens et étudiants hors informatique (16–25 ans), sans connaissance préalable de la blockchain |
| Lien vers la démo | https://dyzlek.github.io/r507-blockchain-3d/ |
| Lien vers GitHub Projects | https://github.com/users/dyzlek/projects/3 |
| Version et date de mise à jour | v0.3 — 12/10/2026 |

## 2. Univers visuel et métaphore principale

### 2.1 Public cible et objectif
Le public visé est fait de lycéens et d'étudiants hors informatique (16–25 ans). Ils connaissent le mot « Bitcoin » mais pas le fonctionnement. À la fin, l'utilisateur doit retenir trois idées :
1. un bloc est scellé par une empreinte, et toute modification casse ce sceau et ceux de tous les blocs suivants ;
2. personne ne commande : chaque nœud garde une copie et vérifie lui-même ;
3. ajouter un bloc demande un effort (PoW) ou une mise en jeu (PoS), ce qui rend la triche coûteuse.

### 2.2 Métaphore retenue
**Un registre de coffres de verre scellés, recopié dans un archipel.** Le fil rouge suit une transaction, « Alice envoie 5 jetons à Bob », de sa création jusqu'à sa confirmation, puis montre une tentative de double dépense.

- **Bloc = coffre de verre** : le contenu est visible (données, nonce), ce qui rend la structure lisible (notion 1).
- **Empreinte = sceau** à motif et couleur générés depuis le vrai hash (SHA-256 calculé dans le navigateur). Une modification minime donne un sceau totalement différent (notion 2).
- **Chaînage** : le sceau du parent est gravé sur le coffre suivant. Une incohérence se voit comme un lien qui devient rouge (notion 3).
- **Nœud = île** qui possède sa propre copie de la chaîne. Les transactions et les blocs voyagent sous forme de messages lumineux entre îles (notion 4).
- **Minage** : on fait défiler les essais de nonce jusqu'à obtenir un sceau qui respecte la difficulté (« commence par 00 ») (notion 5).
- **Consensus** : une course entre îles (PoW) est comparée à un tirage pondéré par la mise (PoS) (notion 6).
- **Attaque** : une double dépense est tentée sur une île minoritaire, puis rejetée par la chaîne majoritaire (notion 7).

Pour ne pas confondre la métaphore et la réalité, chaque étape affiche un encart « En vrai… » qui donne le terme technique exact (hash, nœud, nonce…) et la limite de l'image.

### 2.3 Justification et limites
| Question | Réponse |
|:---|:---|
| Quelles propriétés deviennent évidentes ? | Le chaînage (sceau gravé sur le suivant), l'effet avalanche d'une modification, la distribution des copies (une île = une copie), l'absence de centre |
| Quelles propriétés sont difficiles à représenter ou risquent d'être déformées ? | Un sceau suggère un objet physique qu'on pourrait recoller ou imiter, alors qu'un hash ne s'inverse pas. Le verre laisse penser que tout est lisible (vrai pour Bitcoin, pas pour toutes les blockchains). La difficulté réelle du minage, des milliards d'essais, est incomparable avec quelques secondes d'animation |
| Comment ces limites sont-elles compensées ? | Un encart « En vrai… » à chaque notion, un compteur d'essais avec ordre de grandeur réel, le vrai hash hexadécimal affiché à côté du sceau, et des tests utilisateurs pour vérifier les idées fausses retenues |

### 2.4 Métaphores écartées
| Métaphore | Points forts | Pourquoi écartée |
|:---|:---|:---|
| Livre de comptes partagé (pages reliées) | Très familier, colle au mot « registre » | Plat et peu spatial, il exploite mal la 3D. Il ne montre ni le réseau ni le minage, et une page se réécrit facilement, ce qui contredit l'immutabilité |
| Tour de briques / Lego empilés | Très visuel, on voit bien l'empilement | Suggère qu'on peut retirer ou échanger une brique sans conséquence. Pas d'équivalent naturel au hash ni à la copie distribuée |

### 2.5 Charte visuelle
| Élément | Choix | Justification pédagogique |
|:---|:---|:---|
| Palette et signification des couleurs | | |
| Formes, style et niveau d'abstraction | | |
| Éclairage et ambiance | | |
| Typographie et lisibilité | | |
| Échelle et rapport de taille | | |

## 3. Caméra, espace et navigation

| Question | Réponse et justification |
|:---|:---|
| Caméra libre, guidée ou mixte ? | **Mixte.** Chaque séquence place la caméra sur un point de vue choisi (transition douce de 1,4 s), puis l'utilisateur peut tourner autour et zoomer (pas de déplacement latéral, angle limité pour ne pas passer sous le sol). Une caméra entièrement libre perdrait un public non initié ; une caméra figée empêcherait d'explorer les coffres en 3D |
| Comment l'utilisateur sait-il où regarder ? | Le coffre concerné est cadré au centre de la zone visible, la vue étant décalée pour ne pas être cachée par le panneau. Une bulle « Cliquez sur le coffre » s'anime sous lui et le contour du coffre s'éclaire au survol |
| Organisation spatiale et signification des positions | La chaîne est alignée de gauche à droite, dans l'ordre d'ajout des blocs (sens de lecture). Les îles de l'archipel (notion 4) viendront se placer autour de cette chaîne |
| Représentation du temps | Gauche = plus ancien, droite = plus récent. Le bloc n°0 (genèse) est le premier à gauche |
| Passage d'une notion à l'autre | Panneau fixe avec boutons « Précédent / Suivant », points d'étape cliquables et flèches du clavier. Le lien `?etape=N` ouvre directement une séquence (tests utilisateurs, soutenance). Sur téléphone, le panneau passe en bas de l'écran |

## 4. Fiches des 7 notions obligatoires

Dupliquez la fiche suivante pour chacune des 7 notions, en reprenant exactement leur intitulé ci-dessus.

### 4.1 — Structure d'un bloc

> Brouillon v0.3 (12/10/2026), rédigé avec l'aide de l'IA et à relire par Maxens. Les tests utilisateurs restent à faire.

**Issues liées :** #7 (et #15 pour la navigation)  
**Séquence(s) concernée(s) :** séquence 2 « Le coffre » (`?etape=2`)

#### a) Objectif pédagogique
> L'utilisateur doit comprendre qu'un bloc contient des données (ici la transaction d'Alice), un nonce, sa propre empreinte et l'empreinte du bloc précédent, et que l'empreinte est calculée à partir de tout ce contenu.

#### b) Risque de mauvaise compréhension
> L'utilisateur ne doit pas comprendre que le bloc est un objet physique qu'on ouvre, que le sceau est une décoration choisie librement, ni qu'un bloc ne contient qu'une seule transaction.

#### c) Représentation choisie
| Dimension | Choix | Pourquoi ce choix sert la compréhension |
|:---|:---|:---|
| Forme / géométrie | Coffre en verre (pavé) avec un rouleau (données) et une pièce gravée (nonce) à l'intérieur ; un grand sceau et un petit sceau sur la face avant | Le coffre évoque un contenant qu'on ferme ; chaque champ a un objet distinct, donc on peut les compter (4) |
| Taille et échelle | Tous les coffres ont la même taille ; le sceau du parent est plus petit que le sien | Les blocs ont la même structure ; la taille distingue « mon empreinte » de « celle de mon parent » |
| Couleur / matériau / texture | Verre transparent ; sceau à 12 secteurs dont les couleurs sont tirées des octets du vrai hash | Le verre montre le contenu sans l'ouvrir ; le motif rend le hash comparable d'un coup d'œil (le petit sceau du bloc 2 est identique au grand sceau du bloc 1) |
| Position | Le coffre d'Alice (bloc n°2) est au centre de la vue, ses voisins restent visibles de chaque côté | On voit que le bloc fait partie d'une chaîne, ce qui prépare la notion 2 |
| Mouvement / animation | À l'inspection, le contenu se soulève légèrement et s'éclaire ; les étiquettes apparaissent en fondu | Le changement d'état est visible, pas seulement textuel |
| Interaction et retour visuel | Clic sur le coffre (ou bouton « Inspecter le coffre ») ; contour éclairé au survol | Interaction directe sur l'objet 3D, avec une alternative au clavier |
| Son, si utilisé | Aucun pour l'instant | — |
| Texte d'accompagnement | Deux phrases courtes, puis la liste des 4 champs avec leur valeur et leur rôle ; encart « En vrai… » | Le texte nomme ce que l'image montre, l'encart corrige la métaphore |

#### d) Correspondance avec la réalité technique
| Élément visuel | Élément réel | Fidélité (exacte / simplifiée / approximative) |
|:---|:---|:---|
| Rouleau « Alice → Bob : 5 jetons » | Liste des transactions du bloc | Simplifiée (une seule transaction au lieu de milliers) |
| Pièce gravée d'un nombre | Nonce | Exacte (le nonce a été réellement trouvé pour que le hash commence par `00`) |
| Grand sceau + valeur affichée | Hash SHA-256 du bloc, calculé dans le navigateur | Exacte pour la valeur, approximative pour le motif (représentation visuelle du hash) |
| Petit sceau dans le coin | Hash du bloc précédent stocké dans l'en-tête | Exacte |
| Coffre de verre | Bloc de données numériques | Approximative (métaphore) |

#### e) Alternative écartée
| Alternative | Raison du rejet |
|:---|:---|
| Coffre qui s'ouvre avec un couvercle (première idée de l'issue #7) | Ouvrir le coffre voudrait dire briser le sceau : l'utilisateur pourrait croire que lire un bloc le modifie. Le verre permet de lire sans ouvrir |
| Sceau du parent gravé sur la face latérale gauche | Testé : depuis la caméra, il était caché par le coffre voisin. Déplacé dans le coin avant gauche, côté du lien |

#### f) Tests utilisateurs
| Observation | Modification | Issue |
|:---|:---|:---|
| À faire (session 1) | | #17 |

#### g) Limites assumées
Un seul champ de données au lieu de nombreuses transactions, pas d'horodatage ni de racine de Merkle : ces éléments n'apportent rien à la compréhension du chaînage visé ici et sont signalés dans l'encart « En vrai… ». La difficulté (`00`) est très inférieure à celle de Bitcoin pour que les blocs se calculent instantanément.

### 4.X — [intitulé exact de la notion]

**Issues liées :**  
**Séquence(s) concernée(s) :**

#### a) Objectif pédagogique
> L'utilisateur doit comprendre que…

#### b) Risque de mauvaise compréhension
> L'utilisateur ne doit pas comprendre que…

#### c) Représentation choisie
| Dimension | Choix | Pourquoi ce choix sert la compréhension |
|:---|:---|:---|
| Forme / géométrie | | |
| Taille et échelle | | |
| Couleur / matériau / texture | | |
| Position | | |
| Mouvement / animation | | |
| Interaction et retour visuel | | |
| Son, si utilisé | | |
| Texte d'accompagnement | | |

#### d) Correspondance avec la réalité technique
| Élément visuel | Élément réel | Fidélité (exacte / simplifiée / approximative) |
|:---|:---|:---|
| | | |
| | | |

#### e) Alternative écartée
| Alternative | Raison du rejet |
|:---|:---|
| | |

#### f) Tests utilisateurs
| Observation | Modification | Issue |
|:---|:---|:---|
| | | |

Le test doit concerner **au moins** 2 personnes extérieures au groupe à l'échelle du projet. Précisez les incompréhensions et les corrections réalisées.

#### g) Limites assumées
Expliquez ce qui est simplifié et pourquoi cette simplification reste acceptable.

## 5. Cohérence globale

| Question | Réponse |
|:---|:---|
| Les codes visuels sont-ils constants ? | |
| Un même élément est-il représenté de la même façon partout ? | |
| L'ordre des séquences est-il progressif ? | |
| Quelle notion est la moins bien représentée ? | |
| Quelle décision reverriez-vous avec une semaine de plus ? | |

## 6. Rôle de l'IA générative

Indiquez les idées retenues ou rejetées, les erreurs détectées et les décisions qui restent celles du groupe. Toute utilisation doit être signalée dans les issues, commits ou README.

## 7. Sources

Références techniques, cours, documentation, sources d'inspiration visuelle et comptes rendus de tests.
