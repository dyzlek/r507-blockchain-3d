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
| Version et date de mise à jour | v0.2 — 09/10/2026 |

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
| Caméra libre, guidée ou mixte ? | |
| Comment l'utilisateur sait-il où regarder ? | |
| Organisation spatiale et signification des positions | |
| Représentation du temps | |
| Passage d'une notion à l'autre | |

## 4. Fiches des 7 notions obligatoires

Dupliquez la fiche suivante pour chacune des 7 notions, en reprenant exactement leur intitulé ci-dessus.

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
