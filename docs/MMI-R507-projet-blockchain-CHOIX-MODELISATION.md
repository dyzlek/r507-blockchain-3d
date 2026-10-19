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
| Version et date de mise à jour | v0.8 — 13/10/2026 (branche `styleV2`) |

## 2. Univers visuel et métaphore principale

### 2.1 Public cible et objectif
Le public visé est fait de lycéens et d'étudiants hors informatique (16–25 ans). Ils connaissent le mot « Bitcoin » mais pas le fonctionnement. À la fin, l'utilisateur doit retenir trois idées :
1. un bloc est scellé par une empreinte, et toute modification casse ce sceau et ceux de tous les blocs suivants ;
2. personne ne commande : chaque nœud garde une copie et vérifie lui-même ;
3. ajouter un bloc demande un effort (PoW) ou une mise en jeu (PoS), ce qui rend la triche coûteuse.

### 2.2 Métaphore retenue
**Un registre de coffres scellés, recopié dans un archipel, le tout en papier découpé.** Le fil rouge suit une transaction, « Dylan envoie 5 jetons à Maxens », de sa création jusqu'à sa confirmation, puis montre une tentative de double dépense.

- **Bloc = coffre en carton à fenêtre de calque** : on devine le contenu (données, nonce) sans ouvrir, et la lampe du coffre le rend lisible (notion 1).
- **Empreinte = sceau**, un coup de tampon encreur à motif et couleur générés depuis le vrai hash (SHA-256 calculé dans le navigateur). Une modification minime donne un sceau totalement différent (notion 2).
- **Chaînage** : le sceau du parent est gravé sur le coffre suivant. Une incohérence se voit comme une corde qui se coupe et devient rouge (notion 3).
- **Nœud = île** qui possède sa propre copie de la chaîne. Les transactions voyagent en avions en papier d'île en île (notion 4).
- **Minage** : on fait défiler les essais de nonce jusqu'à obtenir un sceau qui respecte la difficulté (« commence par 00 ») (notion 5).
- **Consensus** : une course entre îles (PoW) est comparée à un tirage pondéré par la mise (PoS) (notion 6).
- **Attaque** : une double dépense est tentée sur une île minoritaire, puis rejetée par la chaîne majoritaire (notion 7).

Pour ne pas confondre la métaphore et la réalité, chaque étape affiche un encart « En vrai… » qui donne le terme technique exact (hash, nœud, nonce…) et la limite de l'image.

### 2.3 Justification et limites
| Question | Réponse |
|:---|:---|
| Quelles propriétés deviennent évidentes ? | Le chaînage (sceau gravé sur le suivant), l'effet avalanche d'une modification, la distribution des copies (une île = une copie), l'absence de centre |
| Quelles propriétés sont difficiles à représenter ou risquent d'être déformées ? | Un sceau suggère un objet physique qu'on pourrait recoller ou imiter, alors qu'un hash ne s'inverse pas. La fenêtre du coffre laisse penser que tout est lisible (vrai pour Bitcoin, pas pour toutes les blockchains). La difficulté réelle du minage, des milliards d'essais, est incomparable avec quelques secondes d'animation |
| Comment ces limites sont-elles compensées ? | Un encart « En vrai… » à chaque notion, un compteur d'essais avec ordre de grandeur réel, le vrai hash hexadécimal affiché à côté du sceau, et des tests utilisateurs pour vérifier les idées fausses retenues |

### 2.4 Métaphores écartées
| Métaphore | Points forts | Pourquoi écartée |
|:---|:---|:---|
| Livre de comptes partagé (pages reliées) | Très familier, colle au mot « registre » | Plat et peu spatial, il exploite mal la 3D. Il ne montre ni le réseau ni le minage, et une page se réécrit facilement, ce qui contredit l'immutabilité |
| Tour de briques / Lego empilés | Très visuel, on voit bien l'empilement | Suggère qu'on peut retirer ou échanger une brique sans conséquence. Pas d'équivalent naturel au hash ni à la copie distribuée |

### 2.5 Charte visuelle
| Élément | Choix | Justification pédagogique |
|:---|:---|:---|
| Palette et signification des couleurs | Papiers et cartons naturels : bureau crème, carton kraft, calque blanc cassé, mer de papier bleu, îles sable et vert. Un seul accent, le corail de la corde, pour ce qui relie ou demande l'attention (liens entre coffres, titres de champs, boutons, routes empruntées). Le rouge est réservé à la fraude. La couleur d'un tampon vient de l'empreinte du bloc | Les papiers sont tous doux et proches : les seules couleurs franches à l'écran sont les tampons, donc l'œil va vers l'empreinte, l'élément clé de la blockchain. Le corail relie : la corde de la chaîne et les libellés des champs ont la même couleur |
| Formes, style et niveau d'abstraction | **Maquette en papier découpé** posée sur un bureau. Bloc = coffre en carton avec une fenêtre en papier calque ; sceau = coup de tampon encreur ; lien = corde corail nouée au flanc de deux coffres, un peu détendue entre les deux ; îles = feuilles découpées empilées, avec un phare, des arbres ou une cabane qui se relèvent comme dans un livre pop-up ; messages = avions en papier. Interface : fiche cartonnée lignée tenue par du ruban, boutons en carton à ombre découpée, post-it pour « En vrai… » | Le papier rend tout « fait main » et accessible, loin de l'image froide et spéculative de la crypto. Chaque objet garde son sens : le calque laisse deviner le contenu sans ouvrir (lire ne casse pas le sceau), le tampon s'imprime une fois et ne se recolle pas, la corde n'est qu'un repère posé par-dessus |
| Éclairage et ambiance | Lumière chaude de lampe de bureau, en haut à gauche, dans la scène comme sur le papier de la page (dégradé CSS) ; le sol est invisible et ne garde que les ombres. Inspecter un coffre, c'est allumer sa lampe : le calque s'éclaire par derrière | Une seule source de lumière cohérente entre la 3D et l'interface. La lampe du coffre transforme l'inspection en geste concret : on éclaire pour lire, sans ouvrir |
| Typographie et lisibilité | Alegreya Sans (humaniste) pour le titre et le texte, Courier Prime (machine à écrire) pour les empreintes, les valeurs et les étiquettes. Chiffres alignés sur les capitales | L'humaniste garde un ton chaleureux et accessible. La machine à écrire va avec l'univers papier (étiquettes, registre) et distingue toujours les vraies données techniques (hash, nonce) du texte d'explication |
| Échelle et rapport de taille | Coffres identiques ; le tampon du parent est environ deux fois plus petit que celui du bloc | Même structure pour tous les blocs ; la taille distingue « mon sceau » et « celui de mon parent » |
| Mouvement | Corde coupée : quand un bloc est falsifié, la corde qui le relie au suivant se coupe et ses deux moitiés retombent avec la gravité (petite simulation physique), puis se balancent. Coup de tampon : un vrai tampon encreur vient s'imprimer sur le calque, le coffre s'écrase légèrement et quelques gouttes d'encre giclent autour puis s'effacent (minage réussi, falsification). À l'arrivée sur l'archipel, les décors des îles se relèvent un à un. Un essai de minage raté laisse un tampon pâle | L'instant où un bloc est scellé devient physique et marquant ; le tampon pâle dit « pas valide » sans texte |

> v0.8 (13/10/2026), branche `styleV2` : direction « maquette en papier découpé » proposée par Maxens, réalisée avec l'aide de l'IA (Claude) (#16).
>
> v0.9 (19/10/2026) : la page d'aperçu papier (`apercu-papier.html`) est retenue par Dylan et Maxens comme direction de tout le parcours. Repris de l'aperçu : le tampon encreur qui s'imprime, les décors pop-up des îles, et le bureau toujours clair (le thème sombre, un bureau marron foncé, alourdissait la maquette et a été retiré). Réalisé avec l'aide de l'IA (Claude).
>
> **Direction écartée : le neumorphisme** (v0.4 à v0.7). Une surface gris-bleu unique où les éléments sortent en relief ou s'enfoncent en creux. Calme et cohérent, mais froid et peu attractif pour des 16-25 ans ; surtout, son contraste était faible (un relief seul ne suffit pas à repérer un bouton) et le coffre de verre se lisait mal sur un fond presque de la même couleur. Avant lui, une direction « registre de bord » (papier, cire, laiton) avait été essayée puis abandonnée.
>
> **Limites connues du papier.** Le calque laisse moins bien voir le contenu que le verre : la lampe du coffre compense à l'inspection. Les textures étant générées dans le code, le rendu reste un peu « propre ». Le contraste du texte reste foncé sur clair (encre sur papier crème) ; les boutons ont un bord et une ombre découpée, donc ils se repèrent sans relief. À vérifier pendant les tests utilisateurs.
>
> Les textes sont écrits en tutoiement, avec des phrases courtes et parlées, pour un public de 16 à 25 ans.

## 3. Caméra, espace et navigation

| Question | Réponse et justification |
|:---|:---|
| Caméra libre, guidée ou mixte ? | **Mixte.** Chaque séquence place la caméra sur un point de vue choisi (transition douce de 1,4 s), puis l'utilisateur peut tourner autour et zoomer (pas de déplacement latéral, angle limité pour ne pas passer sous le sol). Une caméra entièrement libre perdrait un public non initié ; une caméra figée empêcherait d'explorer les coffres en 3D |
| Comment l'utilisateur sait-il où regarder ? | Le coffre concerné est cadré au centre de la zone visible, la vue étant décalée pour ne pas être cachée par le panneau. Une bulle « Clique sur le coffre » s'anime sous lui et le contour du coffre s'éclaire au survol |
| Organisation spatiale et signification des positions | La chaîne est alignée de gauche à droite, dans l'ordre d'ajout des blocs (sens de lecture). L'archipel (notion 4) est placé à l'écart de la chaîne, et la caméra s'y rend : le placer autour de la chaîne aurait fait de celle-ci un centre, l'inverse de l'idée à transmettre. Les îles sont dispersées irrégulièrement, sans île au milieu |
| Représentation du temps | Gauche = plus ancien, droite = plus récent. Le bloc n°0 (genèse) est le premier à gauche |
| Passage d'une notion à l'autre | Panneau fixe avec boutons « Précédent / Suivant », points d'étape cliquables et flèches du clavier. Le lien `?etape=N` ouvre directement une séquence (tests utilisateurs, soutenance). Sur téléphone, le panneau passe en bas de l'écran |

## 4. Fiches des 7 notions obligatoires

Dupliquez la fiche suivante pour chacune des 7 notions, en reprenant exactement leur intitulé ci-dessus.

### 4.1 — Structure d'un bloc

> v0.5 (13/10/2026), rédigé avec l'aide de l'IA, relu par Maxens. Les tests utilisateurs restent à faire.

**Issues liées :** #7 (et #15 pour la navigation)  
**Séquence(s) concernée(s) :** séquence 2 « Le coffre » (`?etape=2`)

#### a) Objectif pédagogique
> L'utilisateur doit comprendre qu'un bloc contient des données (ici une transaction entre deux autres personnes : Thomas → Julien), un nonce, sa propre empreinte et l'empreinte du bloc précédent, et que l'empreinte est calculée à partir de tout ce contenu.

#### b) Risque de mauvaise compréhension
> L'utilisateur ne doit pas comprendre que le bloc est un objet physique qu'on ouvre, que le sceau est une décoration choisie librement, ni qu'un bloc ne contient qu'une seule transaction.

#### c) Représentation choisie
| Dimension | Choix | Pourquoi ce choix sert la compréhension |
|:---|:---|:---|
| Forme / géométrie | Coffre en carton (pavé) avec une fenêtre en papier calque ; un rouleau (données) et une pièce (nonce) à l'intérieur ; un grand tampon et un petit tampon sur la face avant | Le coffre évoque un contenant qu'on ferme ; chaque champ a un objet distinct, donc on peut les compter (4) |
| Taille et échelle | Tous les coffres ont la même taille ; le sceau du parent est plus petit que le sien | Les blocs ont la même structure ; la taille distingue « mon empreinte » de « celle de mon parent » |
| Couleur / matériau / texture | Carton kraft et calque translucide ; tampon encreur dont la teinte, les anneaux et les rayons sont tirés des octets du vrai hash. Inspecter = allumer la lampe du coffre, le calque s'éclaire | Le calque laisse deviner le contenu sans ouvrir, la lampe le rend lisible ; le sceau rend le hash comparable d'un coup d'œil (le petit sceau violet du bloc 2 est identique au grand sceau du bloc 1) |
| Position | Le coffre « Thomas → Julien » (bloc n°2) est au centre de la vue, ses voisins restent visibles de chaque côté | On voit que le bloc fait partie d'une chaîne, ce qui prépare la notion 2 |
| Mouvement / animation | À l'inspection, le contenu se soulève légèrement et s'éclaire ; les étiquettes apparaissent en fondu | Le changement d'état est visible, pas seulement textuel |
| Interaction et retour visuel | Clic sur le coffre (ou bouton « Allumer la lampe du coffre ») ; contour éclairé au survol | Interaction directe sur l'objet 3D, avec une alternative au clavier |
| Son, si utilisé | Aucun pour l'instant | — |
| Texte d'accompagnement | Deux phrases courtes, puis la liste des 4 champs avec leur valeur et leur rôle ; encart « En vrai… » | Le texte nomme ce que l'image montre, l'encart corrige la métaphore |

#### d) Correspondance avec la réalité technique
| Élément visuel | Élément réel | Fidélité (exacte / simplifiée / approximative) |
|:---|:---|:---|
| Rouleau « Thomas → Julien : 3 jetons » | Liste des transactions du bloc | Simplifiée (une seule transaction au lieu de milliers) |
| Pièce gravée d'un nombre | Nonce | Exacte (le nonce a été réellement trouvé pour que le hash commence par `00`) |
| Grand sceau + valeur affichée | Hash SHA-256 du bloc, calculé dans le navigateur | Exacte pour la valeur, approximative pour le motif (représentation visuelle du hash) |
| Petit sceau dans le coin | Hash du bloc précédent stocké dans l'en-tête | Exacte |
| Coffre en carton à fenêtre | Bloc de données numériques | Approximative (métaphore) |

#### e) Alternative écartée
| Alternative | Raison du rejet |
|:---|:---|
| Coffre qui s'ouvre avec un couvercle (première idée de l'issue #7) | Ouvrir le coffre voudrait dire briser le sceau : l'utilisateur pourrait croire que lire un bloc le modifie. La fenêtre permet de lire sans ouvrir |
| Coffre entièrement en verre (versions v0.4 à v0.7) | Il montrait bien le contenu, mais se fondait dans le fond gris-bleu et collait mal à l'univers papier de la v0.8. Remplacé par un coffre en carton avec une fenêtre de calque et une lampe : on garde l'idée « lire sans ouvrir »
| Sceau en « camembert » de 12 couleurs | Lisible mais gadget, sans lien avec l'idée de cachet. Remplacé par un sceau de cire, puis par un tampon encreur dans la version papier. Premier essai : la teinte venait du 1er octet du hash, toujours `00` à cause de la difficulté, donc tous les sceaux étaient rouges. Elle vient maintenant du dernier octet |
| Sceau du parent gravé sur la face latérale gauche | Testé : depuis la caméra, il était caché par le coffre voisin. Déplacé dans le coin avant gauche, côté du lien |

#### f) Tests utilisateurs
| Observation | Modification | Issue |
|:---|:---|:---|
| À faire (session 1) | | #17 |

#### g) Limites assumées
Un seul champ de données au lieu de nombreuses transactions, pas d'horodatage ni de racine de Merkle : ces éléments n'apportent rien à la compréhension du chaînage visé ici et sont signalés dans l'encart « En vrai… ». La difficulté (`00`) est très inférieure à celle de Bitcoin pour que les blocs se calculent instantanément.

### 4.2 — Chaînage cryptographique

> v0.5 (13/10/2026), rédigé avec l'aide de l'IA (Claude) à partir du code de la séquence 3. Relu par Maxens, à confirmer par Dylan. Les tests utilisateurs restent à faire.

**Issues liées :** #8
**Séquence(s) concernée(s) :** séquence 3 « Chaque coffre garde le sceau du précédent » (`?etape=3`)

#### a) Objectif pédagogique
> L'utilisateur doit comprendre que chaque bloc contient l'empreinte du bloc précédent, que c'est cette empreinte (et non leur position) qui relie les blocs dans un ordre fixe, et que changer un bloc changerait son empreinte, qui ne correspondrait plus à la copie gardée par le suivant.

#### b) Risque de mauvaise compréhension
> L'utilisateur ne doit pas comprendre que les blocs sont reliés par un objet physique (le tube corail), qu'un bloc contient une copie entière du bloc précédent, ni que le petit sceau est une simple décoration.

#### c) Représentation choisie
| Dimension | Choix | Pourquoi ce choix sert la compréhension |
|:---|:---|:---|
| Forme / géométrie | Sur chaque coffre, un petit sceau dans le coin avant gauche : la copie du grand sceau du coffre précédent. Une corde corail relie les coffres, du côté de ce petit sceau | Le petit sceau est la preuve du lien ; la corde n'est qu'un repère de lecture |
| Taille et échelle | Le petit sceau fait environ la moitié du grand | On distingue d'un coup d'œil « mon empreinte » et « celle de mon parent » |
| Couleur / matériau / texture | Le petit sceau a exactement la même teinte, le même bord et les mêmes rayons que le grand sceau du coffre d'avant. Le bloc de genèse porte un sceau gris (empreinte faite de zéros) | La correspondance se voit sans lire de hash : deux sceaux jumeaux = deux blocs liés. Le gris signale qu'il n'y a pas de parent |
| Position | Caméra centrée sur le bloc 2, les blocs 1 et 3 visibles de chaque côté. Chaîne de gauche (ancien) à droite (récent) | On voit trois liens à la fois, donc que le principe se répète tout au long de la chaîne |
| Mouvement / animation | Au clic, des anneaux corail pulsent autour de chaque grand sceau et de sa copie dans le coffre suivant (blocs 1 à 3) | L'animation désigne les paires à comparer, l'œil fait lui-même la comparaison |
| Interaction et retour visuel | Bouton « Comparer les sceaux » ou clic sur un des coffres 1 à 3 ; le panneau affiche pour chaque bloc « parent `xxxx` = sceau du bloc précédent `xxxx` » avec les vraies empreintes | L'utilisateur vérifie l'égalité sur le visuel puis sur les valeurs réelles |
| Son, si utilisé | Aucun | — |
| Texte d'accompagnement | Deux phrases avant, deux après, dont l'annonce de la notion 3 (« changer un seul caractère… »). Encart « En vrai… » : en-tête, hash du précédent, bloc de genèse | Le texte fait le pont vers l'immutabilité |

#### d) Correspondance avec la réalité technique
| Élément visuel | Élément réel | Fidélité (exacte / simplifiée / approximative) |
|:---|:---|:---|
| Petit sceau du parent | Champ « hash du bloc précédent » de l'en-tête | Exacte (vraie valeur SHA-256 du bloc précédent) |
| Égalité des sceaux jumeaux | Vérification faite par chaque nœud que le hash précédent correspond | Exacte |
| Tube corail entre coffres | Aucun objet réel : le lien n'existe que par l'empreinte | Approximative (repère visuel) |
| Sceau gris du bloc 0 | Hash précédent du bloc de genèse, rempli de zéros | Exacte |

#### e) Alternative écartée
| Alternative | Raison du rejet |
|:---|:---|
| Sceau du parent gravé sur la face latérale gauche du coffre (voir aussi 4.1) | Caché par le coffre voisin depuis la caméra : la comparaison était impossible. Déplacé dans le coin avant gauche |
| Le tube comme seul lien entre les blocs | Il suggère un lien mécanique qu'on pourrait détacher et raccrocher. La preuve du lien reste le sceau, le tube n'est qu'un repère |

#### f) Tests utilisateurs
| Observation | Modification | Issue |
|:---|:---|:---|
| À faire (session 1) : vérifier que le testeur relie le petit sceau au coffre précédent sans aide | | #17 |

#### g) Limites assumées
Le hash du précédent est montré seul : le vrai en-tête contient aussi la date, la racine de Merkle et la difficulté. Le sceau n'affiche que les 4 premiers caractères de l'empreinte, mais sa couleur et ses rayons viennent des autres octets, et l'empreinte complète est donnée dans le panneau. Le tube corail est un repère qui n'existe pas en vrai ; l'encart « En vrai… » le précise.

### 4.3 — Immutabilité et détection de falsification

> v0.5 (13/10/2026), rédigé avec l'aide de l'IA (Claude) à partir du code de la séquence 4. Relu par Maxens, à confirmer par Dylan. Les tests utilisateurs restent à faire.

**Issues liées :** #9
**Séquence(s) concernée(s) :** séquence 4 « Trafiquer un coffre, ça se voit » (`?etape=4`)

#### a) Objectif pédagogique
> L'utilisateur doit comprendre que modifier un ancien bloc change son empreinte, que la copie gardée par le bloc suivant ne correspond plus et que la triche se voit donc immédiatement. Pour la cacher, il faudrait recalculer tous les blocs suivants : l'immutabilité vient du coût, pas d'une impossibilité.

#### b) Risque de mauvaise compréhension
> L'utilisateur ne doit pas comprendre qu'il est techniquement impossible de modifier un bloc, que le bloc est verrouillé ou chiffré, ni que toute la chaîne après le bloc modifié devient « fausse » : seul le lien suivant est cassé.

#### c) Représentation choisie
| Dimension | Choix | Pourquoi ce choix sert la compréhension |
|:---|:---|:---|
| Forme / géométrie | Les mêmes coffres que les notions 1 et 2 ; seul le contenu du bloc 1 change | Rien d'autre ne bouge : l'effet observé vient uniquement de la modification |
| Taille et échelle | Inchangées | — |
| Couleur / matériau / texture | Le grand sceau du bloc 1 est redessiné depuis le nouveau hash (nouvelle teinte, nouveaux rayons). Le rouge (seule apparition de cette couleur) marque le lien cassé : un anneau autour du nouveau sceau du bloc 1 et un autour de sa copie dans le bloc 2 (et seulement ceux-là), tube 1→2, plaque « Bloc n°1 · falsifié » | Le changement du sceau montre l'effet avalanche ; le rouge est réservé à la fraude, donc il attire l'œil sans ambiguïté |
| Position | Même cadrage qu'à la notion 2 (bloc 2 au centre) | L'utilisateur compare l'avant et l'après au même endroit |
| Mouvement / animation | Le sceau change au moment du clic, les anneaux rouges pulsent sur la paire qui ne correspond plus | La cause (modification) et la conséquence (lien rouge) sont simultanées. Un premier essai allumait les deux sceaux des blocs 1 et 2 : on croyait que le lien 0→1 était cassé lui aussi, d’où la correction |
| Interaction et retour visuel | Bouton « Falsifier le bloc 1 » (ou clic sur un coffre) : « Nicolas → Pierre : 2 jetons » devient « 200 jetons ». Le panneau affiche les données avant/après, le nouveau sceau et l'ancien, si la difficulté est encore respectée et « Copie dans le bloc 2 ≠ nouveau sceau : la chaîne est cassée ». « Remettre comme avant » annule | L'utilisateur provoque lui-même la triche et peut recommencer ; tout est réversible |
| Son, si utilisé | Aucun | — |
| Texte d'accompagnement | Avant : le scénario du tricheur. Après : pourquoi ça se voit, et pourquoi la cacher coûterait trop cher. Encart « En vrai… » : re-minage, attaque des 51 % (annonce de la notion 7) | Le texte transforme l'observation en règle générale |

#### d) Correspondance avec la réalité technique
| Élément visuel | Élément réel | Fidélité (exacte / simplifiée / approximative) |
|:---|:---|:---|
| Nouveau sceau du bloc 1 | Nouveau hash SHA-256 après modification des données | Exacte (recalculé dans le navigateur) |
| « le sceau ne commence plus par 00 : le bloc serait refusé » | Preuve de travail invalide : le bloc serait rejeté | Exacte |
| Corde 1→2 coupée et rouge | Le hash précédent stocké dans le bloc 2 ne correspond plus : les nœuds rejettent la chaîne | Exacte dans le principe |
| Seul le lien suivant devient rouge | Les blocs 2 et 3 restent cohérents entre eux | Exacte |
| Bouton « Falsifier » | Un attaquant qui modifie sa propre copie | Simplifiée (on ne montre pas qui triche ni sur quelle copie) |

#### e) Alternative écartée
| Alternative | Raison du rejet |
|:---|:---|
| Laisser l'utilisateur taper librement le nouveau contenu | Saisie lente sur téléphone, résultats imprévisibles (texte vide, très long) et scénario moins parlant. Une triche préréglée (2 → 200 jetons) reste dans le fil rouge |
| Rougir toute la chaîne à partir du bloc modifié | Plus spectaculaire mais faux : seul le lien vers le bloc suivant est cassé. Une représentation fausse aurait contredit la notion 2 |

#### f) Tests utilisateurs
| Observation | Modification | Issue |
|:---|:---|:---|
| À faire (session 1) : vérifier que le testeur explique pourquoi la triche se voit, et qu'il ne conclut pas que c'est « impossible » | | #17 |

#### g) Limites assumées
La séquence ne montre pas le tricheur qui recalcule les blocs suivants ni la course contre le reste du réseau : c'est le sujet de la notion 7 (double dépense, attaque des 51 %). La falsification ne touche qu'une seule copie de la chaîne et le cadrage prévoyait que « les autres îles le signalent » ; l'archipel n'arrivant qu'à la notion 4, ce signalement n'est pas montré ici. Le tricheur n'est pas représenté : c'est l'utilisateur qui joue son rôle.

### 4.4 — Réseau et décentralisation

> v0.5 (13/10/2026), rédigé avec l'aide de l'IA (Claude) à partir du cadrage, relu par Maxens. Les tests utilisateurs restent à faire.

**Issues liées :** #10
**Séquence(s) concernée(s) :** séquence 5 « L'archipel » (`?etape=5`)

#### a) Objectif pédagogique
> L'utilisateur doit comprendre qu'il n'y a pas de chef : chaque nœud garde sa propre copie de la chaîne, une transaction se propage de voisin en voisin, chaque nœud la vérifie avant de la faire suivre, et le réseau continue de fonctionner si un nœud s'éteint.

#### b) Risque de mauvaise compréhension
> L'utilisateur ne doit pas comprendre qu'un serveur central (ou l'île de Dylan) distribue les données à tout le monde, que tous les nœuds sont reliés directement entre eux, ni que la transaction est déjà « gravée » dans la chaîne dès qu'elle est reçue.

#### c) Représentation choisie
| Dimension | Choix | Pourquoi ce choix sert la compréhension |
|:---|:---|:---|
| Forme / géométrie | 7 îles (feuilles de papier découpées) reliées par des routes en pointillés. Sur chaque île, une copie miniature des 4 coffres de la chaîne. La transaction circule sous la forme d'un avion en papier, puis flotte en rouleau au-dessus de l'île qui l'a reçue | Une île est un lieu séparé et autonome, qui a « ses » coffres : une île = un nœud = une copie. Le rouleau reprend l'objet « données » de la notion 1 |
| Taille et échelle | Toutes les îles ont la même taille ; aucune n'est plus grosse ni plus haute | Tous les nœuds ont le même rôle : aucun ne domine |
| Couleur / matériau / texture | Îles en feuilles découpées (sable, herbe) sur une mer de papier froissé ; copie de la chaîne en petites boîtes de carton. Les sceaux miniatures reprennent les vraies couleurs de la chaîne. Corail (l'accent) pour ce qui a reçu la transaction : anneau de l'île, étiquette, routes empruntées. Une île éteinte passe en papier grisé et s'enfonce ; les messages sont des avions en papier | Les mêmes sceaux sur toutes les îles montrent que les copies sont identiques. Le corail garde son sens de « lien actif » (notions 2 et 3) et dessine le chemin réellement pris |
| Position | Îles dispersées irrégulièrement, Dylan à gauche et Maxens à droite, sans île au centre. Chaque île n'est reliée qu'à 2 à 4 voisines. Les décors (phare, arbres, cabane) ne servent qu'à reconnaître les îles : ils ne donnent aucun rôle particulier. L'archipel est placé à l'écart de la grande chaîne | La disposition sans centre rend visible l'absence de chef. Gauche → droite reprend le sens de lecture de la chaîne. Le message doit passer par des intermédiaires pour atteindre Maxens |
| Mouvement / animation | L'avion part de l'île de Dylan ; chaque île qui la reçoit s'allume, attend un court instant (elle vérifie), puis l'envoie à toutes ses voisines sauf celle qui la lui a transmise. Une île qui l'a déjà reçue ignore le doublon | La propagation de proche en proche (gossip) se voit au lieu d'être racontée. Le délai matérialise la vérification. Les doublons montrent la redondance du réseau |
| Interaction et retour visuel | Bouton « Envoyer la transaction de Dylan » (ou clic sur l'île de Dylan). Clic sur une autre île pour l'éteindre ou la rallumer, puis « Renvoyer la transaction ». Le panneau compte les îles jointes, dit si Maxens a reçu et liste les îles éteintes ou injoignables | En éteignant une île, l'utilisateur découvre lui-même que le message passe ailleurs : aucune île n'est indispensable. S'il en éteint trop, il voit aussi la limite (une île coupée de tout ne reçoit rien) |
| Son, si utilisé | Aucun | — |
| Texte d'accompagnement | Trois phrases avant l'envoi, trois après (propagation, invitation à éteindre une île, transaction pas encore dans un bloc). Encart « En vrai… » : nœud, gossip, nombre de connexions, mempool | Le texte nomme ce que l'animation montre et prépare la notion 5 |

#### d) Correspondance avec la réalité technique
| Élément visuel | Élément réel | Fidélité (exacte / simplifiée / approximative) |
|:---|:---|:---|
| Île | Nœud complet (ordinateur qui fait tourner le logiciel et garde toute la chaîne) | Simplifiée (7 nœuds au lieu de dizaines de milliers) |
| Copie miniature de la chaîne sur chaque île | Copie locale de la blockchain, identique sur chaque nœud | Exacte (mêmes empreintes que la grande chaîne) |
| Routes entre îles | Connexions pair à pair entre nœuds | Simplifiée (2 à 4 voisines ici, 8 connexions sortantes par défaut chez Bitcoin) |
| Avion en papier qui vole d'île en île | Annonce de la transaction de proche en proche (gossip) | Simplifiée (le vrai protocole annonce d'abord l'identifiant, puis envoie la transaction si le voisin la demande) |
| Pause avant de faire suivre | Vérification de la transaction (signature, solde suffisant) | Approximative (la durée est symbolique) |
| Rouleau qui flotte au-dessus de l'île | Transaction en attente dans la mempool du nœud | Simplifiée |
| Île éteinte | Nœud hors ligne | Exacte dans le principe |

#### e) Alternative écartée
| Alternative | Raison du rejet |
|:---|:---|
| Îles disposées en cercle autour de la grande chaîne (idée du cadrage, §3) | La chaîne au milieu devenait un centre et suggérait une copie « officielle » que les îles consultent : l'inverse de la décentralisation. L'archipel est donc placé à part |
| Tous les nœuds reliés à tous les autres (graphe complet) | Plus simple à dessiner, mais la transaction arrivait partout en un seul saut : on ne voyait plus la propagation de proche en proche, et ce n'est pas le fonctionnement réel |
| Réseau en étoile avec un serveur au milieu, pour comparer centralisé et décentralisé | Montrer un serveur central, même pour le critiquer, risquait de fixer la mauvaise image. Le contraste passe par l'interaction « éteindre une île » : rien ne s'arrête |

#### f) Tests utilisateurs
| Observation | Modification | Issue |
|:---|:---|:---|
| À faire (session 1) : vérifier que le testeur comprend qu'il n'y a pas de chef et qu'il pense à éteindre une île | | #17 |

#### g) Limites assumées
Le réseau compte 7 îles au lieu de dizaines de milliers, et un saut prend environ une seconde au lieu de quelques millisecondes : il faut pouvoir suivre le message des yeux. La vérification est réduite à une courte pause, sans montrer les signatures. Les îles sont toutes honnêtes et complètes : les nœuds malveillants sont traités à la notion 7 (double dépense), et les nœuds « légers » ne sont pas représentés. Ces simplifications sont signalées dans l'encart « En vrai… ».

### 4.5 — Validation et minage

> Brouillon v0.6 (13/10/2026), rédigé avec l'aide de l'IA (Claude) à partir du code de la séquence 6. À relire par Maxens et Dylan. Les tests utilisateurs restent à faire.

**Issues liées :** #11
**Séquence(s) concernée(s) :** séquence 6 « La course au sceau » (`?etape=6`)

#### a) Objectif pédagogique
> L'utilisateur doit comprendre que, pour être accepté, un bloc doit avoir une empreinte qui respecte une règle (commencer par des zéros), que le seul moyen d'y arriver est d'essayer des nonces un par un, que trouver demande beaucoup d'essais alors que vérifier n'en demande qu'un, et qu'un zéro de plus multiplie le travail.

#### b) Risque de mauvaise compréhension
> L'utilisateur ne doit pas comprendre que le mineur résout un calcul « intelligent » ou choisit le sceau, que miner veut dire créer la transaction, ni qu'un bloc trouvé vite est moins valable (c'est un tirage au sort, seul le résultat compte).

#### c) Représentation choisie
| Dimension | Choix | Pourquoi ce choix sert la compréhension |
|:---|:---|:---|
| Forme / géométrie | Un 5e coffre (bloc n°4) au bout de la chaîne, même forme que les autres : rouleau de la transaction, pièce du nonce, petit sceau du bloc 3 dans le coin. Au départ, pas de grand sceau | Le bloc est déjà rempli et déjà accroché à son parent : il ne manque que le sceau, donc l'œil va au seul élément qui change |
| Taille et échelle | Identique aux autres coffres | Un bloc miné est un bloc comme les autres |
| Couleur / matériau / texture | Pendant les essais, chaque sceau est dessiné depuis le vrai hash mais reste pâle (transparent). Le sceau valide est opaque, entouré des anneaux corail, la plaque passe en accent « Bloc n°4 · scellé » | Pâle = refusé, plein = accepté, sans texte. Le corail garde son sens de « lien valide » (notions 2 et 4) |
| Position | Caméra centrée sur le bloc n°4, le bloc 3 visible à gauche avec le lien | On voit que le nouveau bloc s'ajoute à droite, dans le sens du temps (§3) |
| Mouvement / animation | Le nonce et le sceau changent à chaque essai : environ 60 essais par seconde pour `00`, 600 pour `000` | Le défilement montre le hasard : chaque sceau est sans rapport avec le précédent. Plus rapide en `000` pour que l'attente reste supportable, mais le compteur montre bien 16 fois plus d'essais |
| Interaction et retour visuel | Bouton « Lancer le minage » (ou clic sur le coffre), puis « Miner à nouveau ». Choix de la difficulté `00` / `000` dans le panneau, avec le nombre moyen d'essais (256 / 4 096). Le panneau affiche les essais, le nonce essayé et le sceau obtenu, puis le nonce trouvé et la vérification | L'utilisateur provoque lui-même la course et compare deux difficultés |
| Son, si utilisé | Aucun | — |
| Texte d'accompagnement | Avant : la règle du jeu. Pendant : « on essaie, encore et encore ». Après : trouver est long, vérifier est immédiat, invitation à essayer `000`. Encart « En vrai… » : difficulté de Bitcoin, puissance du réseau, 10 minutes, ajustement, récompense | Le texte change avec l'état de la course |

#### d) Correspondance avec la réalité technique
| Élément visuel | Élément réel | Fidélité (exacte / simplifiée / approximative) |
|:---|:---|:---|
| Sceau recalculé à chaque essai | SHA-256 du bloc avec le nonce essayé | Exacte (vrai calcul dans le navigateur) |
| Règle « commence par 00 » | Cible de difficulté (le hash doit être inférieur à une valeur) | Simplifiée (préfixe hexadécimal au lieu d'une cible numérique) |
| Pièce dont le nombre change | Nonce | Exacte |
| Départ à un nonce au hasard | Chaque mineur cherche dans un espace différent (adresse de récompense, horodatage…) | Approximative |
| « Un seul calcul pour vérifier » | Validation du bloc par chaque nœud | Simplifiée (un nœud vérifie aussi les transactions et les signatures) |
| 60 à 600 essais par seconde | Environ 10²¹ essais par seconde sur tout le réseau Bitcoin | Approximative (ralenti volontaire) |

#### e) Alternative écartée
| Alternative | Raison du rejet |
|:---|:---|
| Toujours partir du nonce 0 | Les données étant fixes, le résultat était toujours le même, et par malchance `000` se trouvait en 469 essais contre 420 pour `00` : la démo contredisait le « 16 fois plus ». Le départ au hasard fait voir la moyenne et le côté tirage au sort |
| Curseur de difficulté libre (1 à 5 zéros) | Avec 4 ou 5 zéros, des dizaines de secondes ou des minutes d'attente ; avec 1 zéro, trouvé presque tout de suite. Deux niveaux suffisent pour montrer l'effet d'un zéro de plus |
| Plusieurs îles qui minent en même temps | C'est la course entre mineurs, sujet de la notion 6 (consensus PoW) : la montrer ici mélangerait les deux notions |

#### f) Tests utilisateurs
| Observation | Modification | Issue |
|:---|:---|:---|
| À faire (session 1) : vérifier que le testeur comprend qu'on ne peut pas choisir le sceau, et que vérifier est facile | | #17 |

#### g) Limites assumées
Le minage est ralenti des milliards de fois et la difficulté est minuscule. Un seul mineur est montré : la course entre mineurs et la récompense ne sont que dans l'encart « En vrai… », la compétition étant le sujet de la notion 6. Le bloc ne contient qu'une transaction. Le fil rouge est cohérent : le bloc n°2 contient une autre transaction (Thomas → Julien), et celle de Dylan n'entre dans la chaîne qu'ici, dans le bloc n°4. Les blocs déjà présents sont scellés en `00` ; la difficulté `000` est présentée comme un durcissement pour les blocs à venir (comme le réajustement de Bitcoin), sans remettre en cause les anciens.

### 4.6 — Comparaison d'au moins deux mécanismes de consensus

> Brouillon v0.7 (13/10/2026), rédigé avec l'aide de l'IA (Claude) à partir du code de la séquence 7. À relire par Maxens et Dylan. Les tests utilisateurs restent à faire.

**Issues liées :** #12
**Séquence(s) concernée(s) :** séquence 7 « Qui scelle le bloc ? » (`?etape=7`)

#### a) Objectif pédagogique
> L'utilisateur doit comprendre que, sans chef, les nœuds ont besoin d'une règle commune pour désigner celui qui scelle le prochain bloc, et que deux règles existent : la preuve de travail (une course où compte la puissance de calcul, et où le travail des perdants est perdu) et la preuve d'enjeu (un tirage au sort où comptent les jetons mis en jeu, avec la mise comme garantie). Il doit retenir l'échange entre les deux : sécurité par la dépense d'énergie contre sobriété, et le risque de concentration propre à chacune.

#### b) Risque de mauvaise compréhension
> L'utilisateur ne doit pas comprendre que l'île la plus puissante (ou la plus riche) gagne à chaque fois, que la preuve d'enjeu revient à « acheter » le droit de tricher, ni que le consensus est un vote où chaque île donne son avis.

#### c) Représentation choisie
| Dimension | Choix | Pourquoi ce choix sert la compréhension |
|:---|:---|:---|
| Forme / géométrie | Le même archipel qu'à la notion 4. En preuve de travail, chaque île a une rangée de machines (de 1 à 4) derrière sa copie de la chaîne. En preuve d'enjeu, une pile de jetons dorés (de 1 à 4) au même endroit | On reste dans le réseau sans centre : ce sont les mêmes îles qui doivent se mettre d'accord. Le nombre d'objets se compte d'un coup d'œil |
| Taille et échelle | La rangée de machines ou la hauteur de la pile est proportionnelle au poids de l'île. Les poids ne sont pas les mêmes dans les deux méthodes (Thomas a 4 machines mais 1 jeton, Dylan 1 machine mais 4 jetons) | On voit que « ce qui compte » change d'une méthode à l'autre |
| Couleur / matériau / texture | Machines en carton avec un voyant vert qui clignote pendant la course ; jetons dorés, comme la pièce du nonce. Un anneau corail désigne l'île gagnante | Le voyant montre que toutes les machines travaillent en même temps. Le corail garde son sens de « ce qui est retenu » |
| Position | Vue d'ensemble de l'archipel, comme à la notion 4 | Toutes les îles sont visibles : on voit qu'une seule gagne |
| Mouvement / animation | Preuve de travail : les compteurs d'essais de toutes les îles défilent, plus vite là où il y a plus de machines, puis une île trouve le sceau. Preuve d'enjeu : un anneau passe d'île en île de plus en plus lentement (une roue) et s'arrête sur l'île tirée | La course rend visible le travail perdu par les perdantes ; la roue rend visible le tirage, sans calcul |
| Interaction et retour visuel | Choix de la méthode (« Travail (PoW) » / « Enjeu (PoS) »), bouton « Lancer la course » ou « Faire le tirage », relance possible. Le panneau donne la gagnante et sa probabilité, le nombre total d'essais (PoW), la sanction en cas de triche, le décompte des victoires sur plusieurs tours, puis un bilan une fois les deux méthodes essayées | En relançant, l'utilisateur constate lui-même que les victoires suivent les poids sans être certaines (une île à 1 machine peut gagner) |
| Son, si utilisé | Aucun | — |
| Texte d'accompagnement | Trois phrases avant (le problème, puis une phrase par méthode), deux après chaque méthode. Encart « En vrai… » : Bitcoin, Ethereum et le passage à la preuve d'enjeu en 2022, la mise de 32 ethers, la limite des deux méthodes | Le texte pose la question « qui scelle ? » avant de montrer les réponses |

#### d) Correspondance avec la réalité technique
| Élément visuel | Élément réel | Fidélité (exacte / simplifiée / approximative) |
|:---|:---|:---|
| Machines d'une île | Puissance de calcul d'un mineur (hashrate) | Simplifiée (1 à 4 machines, au lieu de fermes de milliers de machines spécialisées) |
| Course aux essais | Recherche du nonce par tous les mineurs en parallèle (notion 5) | Exacte dans le principe, ralentie |
| Probabilité de gagner ∝ machines | Probabilité de miner le bloc ∝ part du hashrate | Exacte |
| Pile de jetons | Mise (stake) bloquée par un validateur | Simplifiée |
| Roue du tirage | Sélection pseudo-aléatoire du validateur, pondérée par la mise | Simplifiée (le vrai tirage utilise un aléa partagé et des comités de validateurs) |
| « Perd sa mise » | Slashing : destruction d'une partie de la mise d'un validateur malhonnête | Simplifiée (en vrai, seule une partie est retirée, selon la faute) |

#### e) Alternative écartée
| Alternative | Raison du rejet |
|:---|:---|
| Montrer les deux méthodes côte à côte sur deux archipels | Deux fois plus d'objets à l'écran et deux réseaux différents : l'utilisateur aurait pu croire qu'il existe deux réseaux. Un seul archipel et un sélecteur de méthode gardent la comparaison sur les mêmes îles |
| Faire gagner à coup sûr l'île la plus puissante ou la plus riche | Plus simple à lire, mais faux : c'est une probabilité. Le décompte des victoires sur plusieurs tours montre la proportion sans la transformer en certitude |
| Un vote à main levée entre les îles | Ce n'est pas ainsi que fonctionnent Bitcoin ou Ethereum, et cela aurait créé la fausse idée que le consensus est un vote d'opinion |

#### f) Tests utilisateurs
| Observation | Modification | Issue |
|:---|:---|:---|
| À faire (session 1) : vérifier que le testeur sait dire ce qui compte dans chaque méthode et pourquoi la preuve de travail consomme plus | | #17 |

#### g) Limites assumées
La récompense du gagnant (bitcoins neufs, frais de transaction) n'est pas montrée, ni la vérification du bloc par les autres îles après la victoire (vue à la notion 5). Les poids sont fixes et les îles toutes honnêtes. La preuve d'enjeu est réduite à un tirage pondéré, sans comités ni attestations. Ces simplifications sont signalées dans l'encart « En vrai… ».

### 4.7 — Cycle de vie d'une transaction et scénario d'attaque illustré

> Brouillon v0.7 (13/10/2026), rédigé avec l'aide de l'IA (Claude) à partir du code de la séquence 8. À relire par Maxens et Dylan. Les tests utilisateurs restent à faire.

**Issues liées :** #13
**Séquence(s) concernée(s) :** séquence 8 « La double dépense » (`?etape=8`)

#### a) Objectif pédagogique
> L'utilisateur doit pouvoir retracer la vie de la transaction de Dylan (signée, diffusée, en attente, rangée dans un bloc, confirmée) et comprendre qu'une double dépense consiste à faire adopter une autre version de l'histoire. Les nœuds gardant la chaîne la plus longue, l'attaque échoue tant que le tricheur a moins de la moitié de la puissance, et chaque confirmation rend le retour en arrière plus difficile.

#### b) Risque de mauvaise compréhension
> L'utilisateur ne doit pas comprendre qu'une transaction est définitive dès qu'elle est envoyée, qu'on peut annuler une transaction en la « supprimant » d'un bloc, ni que l'attaque des 51 % permet de voler les jetons de n'importe qui (elle ne permet que de réécrire ses propres transactions récentes).

#### c) Représentation choisie
| Dimension | Choix | Pourquoi ce choix sert la compréhension |
|:---|:---|:---|
| Forme / géométrie | La chaîne de coffres de la notion 5, avec le bloc 4 de Dylan désormais scellé. La branche secrète de Dylan est faite des mêmes coffres, accrochés au bloc 3 par un lien rouge | La fourche se lit comme deux suites possibles de la même histoire. Les coffres de Dylan sont de vrais blocs, avec de vrais sceaux : la triche n'est pas visible au premier coup d'œil |
| Taille et échelle | Mêmes coffres partout | Aucune branche n'est « plus officielle » que l'autre par son apparence ; seule la longueur compte |
| Couleur / matériau / texture | Plaques et liens rouges pour la branche de Dylan (« secret », puis « rejeté » ou « adopté »), comme le bloc falsifié de la notion 3. Les plaques de la branche perdante passent en rouge avec « abandonné » | Le rouge garde le même sens partout : la fraude |
| Position | Chaîne honnête en arrière, branche de Dylan devant, alignée bloc à bloc | On compare la longueur des deux branches d'un coup d'œil, comme deux colonnes |
| Mouvement / animation | Les blocs apparaissent au rythme de chaque camp (plus vite pour celui qui a le plus de puissance) ; à la fin, la branche perdante s'enfonce dans le sol | La course rend visible le rapport de puissance ; l'enfoncement montre ce que les îles abandonnent |
| Interaction et retour visuel | Choix de la puissance de Dylan (30 % ou 60 %), bouton « Lancer la course ». Le panneau affiche le cycle de vie coché étape par étape, le nombre de confirmations, la longueur de chaque branche et la règle des îles. Si Dylan gagne, les deux dernières étapes passent en rouge (« Annulée ») | En essayant les deux puissances, l'utilisateur découvre lui-même le seuil de la moitié : c'est l'attaque des 51 % |
| Son, si utilisé | Aucun | — |
| Texte d'accompagnement | Avant : le chemin parcouru par la transaction, puis le plan de Dylan et la règle de la chaîne la plus longue. Pendant : ce qu'est une confirmation. Après : un texte selon le résultat. Encart « En vrai… » : 6 confirmations, vitesse moyenne et hasard, attaques réelles sur Ethereum Classic | Le cycle de vie relie les notions 4 et 5 ; le texte d'issue explique pourquoi on a gagné ou perdu |

#### d) Correspondance avec la réalité technique
| Élément visuel | Élément réel | Fidélité (exacte / simplifiée / approximative) |
|:---|:---|:---|
| Cycle de vie coché | Signature, diffusion, mempool, inclusion dans un bloc, confirmations | Exacte dans les étapes (la signature n'est pas montrée en détail) |
| Branche secrète accrochée au bloc 3 | Fork : chaîne concurrente minée en privé | Exacte dans le principe |
| « Dylan → Dylan : 5 jetons » | Transaction concurrente qui dépense les mêmes jetons | Exacte dans le principe |
| Règle de la chaîne la plus longue | Les nœuds suivent la chaîne qui a demandé le plus de travail | Simplifiée (« la plus longue » au lieu de « le plus de travail cumulé ») |
| Course à vitesse fixe | Minage : tirage au sort dont la vitesse moyenne dépend de la puissance | Approximative (pas de hasard ici) |
| 3 blocs pour finir la course | Nombre de confirmations attendu par le destinataire (6 chez Bitcoin) | Simplifiée |

#### e) Alternative écartée
| Alternative | Raison du rejet |
|:---|:---|
| Course au hasard (comme le vrai minage) | Avec quelques blocs seulement, un tricheur à 30 % gagnait parfois et un tricheur à 60 % perdait souvent : le message principal (le seuil de la moitié) devenait illisible. La course montre la vitesse moyenne, et le hasard est expliqué dans l'encart « En vrai… » |
| Jouer l'attaque sur l'archipel (îles qui changent de chaîne) | Plus proche du réseau, mais la comparaison des deux branches demandait de dessiner une fourche sur chacune des 7 îles : illisible. La fourche est montrée une seule fois sur la grande chaîne, et le texte dit que toutes les îles l'adoptent |
| Un voleur extérieur qui prend les jetons de Maxens | Faux : l'attaque des 51 % ne permet pas de dépenser les jetons des autres, seulement de réécrire ses propres transactions. Le tricheur est donc l'émetteur, Dylan |

#### f) Tests utilisateurs
| Observation | Modification | Issue |
|:---|:---|:---|
| À faire (session 1) : vérifier que le testeur sait citer les étapes de la vie d'une transaction et expliquer pourquoi Dylan perd à 30 % | | #17 |

#### g) Limites assumées
La signature de la transaction n'est pas montrée (pas de clés publiques ni privées). La course n'a pas de hasard et s'arrête à 3 blocs au lieu de 6 confirmations. L'adoption de la branche gagnante par les îles est dite dans le texte, mais n'est pas animée sur l'archipel. Ces simplifications sont signalées dans l'encart « En vrai… ».

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
