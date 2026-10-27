# Storyboard écrit — Blockchain 3D (R507)

Issue #14 : storyboard du parcours complet. Ce document décrit, plan par plan, ce que voit et fait l'utilisateur. Il est écrit pour être donné tel quel à une IA qui génère les images : chaque plan a une description de scène et un **prompt image** (en anglais, qui marche mieux avec les générateurs). Les textes affichés sont ceux de `src/sequences.js` au 27/10/2026.

- **Public :** 16–25 ans, hors informatique. **Durée visée :** 10 à 15 minutes, 8 étapes.
- **Fil rouge :** une transaction, « Dylan envoie 5 jetons à Maxens », de sa création jusqu'à une tentative de double dépense.
- **Métaphore :** un registre de coffres en carton scellés par des tampons, recopié dans un archipel d'îles en papier (CHOIX §2.2).

## 0. Direction visuelle commune (à coller en tête de chaque prompt)

**Style prompt :** `paper-cut diorama on a warm cream desk, soft lamp light from the top left, handmade cardboard and tracing paper, matte textures, subtle paper grain, hard offset drop shadows, one coral accent color (#a8442c), no text, no logo, 3D isometric three-quarter view, clean and playful, educational`

| Élément | Description |
|:---|:---|
| Bureau | Crème `#e9dfcc`, grain de papier, lumière de lampe chaude en haut à gauche, vignette douce |
| Coffre (bloc) | Boîte en carton kraft à nervures, une **fenêtre en papier calque** sur la face avant, une lampe à l'intérieur qui s'allume à l'inspection |
| Sceau | **Tampon encreur rond**, couleur et motif propres à chaque bloc (jamais deux pareils) ; le sceau du parent est un tampon deux fois plus petit, dans le coin avant gauche |
| Corde | Corde corail nouée au flanc de deux coffres, un peu détendue ; elle devient rouge et se coupe en cas de falsification |
| Île | Feuilles de papier découpées empilées, avec un décor pop-up (phare, arbres, cabane) qui se relève à l'arrivée |
| Avion | Avion en papier plié, messages qui voyagent d'île en île |
| Interface | Fiche cartonnée **lignée** à gauche (ou en bas sur téléphone), tenue par deux bouts de ruban corail ; boutons en carton à ombre découpée ; post-it jaune pour « En vrai… » ; barre de 8 pastilles numérotées |
| Palette | Encre `#3a2f26`, fiche `#f7f1e6`, post-it `#fff1b0`, corail `#a8442c` (liens, titres de champs, boutons), rouge `#b3261e` réservé à la fraude |
| Typo | Alegreya Sans (texte), Courier Prime (valeurs, hashes, étiquettes) |

**Règles de cohérence entre plans :** la chaîne va toujours de gauche (ancien) à droite (récent) ; corail = ce qui relie ou demande l'attention ; rouge = fraude seulement ; un même coffre garde le même tampon d'un plan à l'autre.

## 1. Vue d'ensemble du parcours

| # | Notion | Titre à l'écran | Caméra | Action de l'utilisateur | Ce qui change |
|:-:|:---|:---|:---|:---|:---|
| 1 | Introduction | Une chaîne de coffres en carton | Large, un peu en hauteur | Lire, passer à la suite | Rien : on découvre la chaîne |
| 2 | 1 · Structure d'un bloc | Le coffre | Face au coffre n°2 | Clic sur le coffre ou « Allumer la lampe du coffre » | Le calque s'éclaire, 4 étiquettes apparaissent |
| 3 | 2 · Chaînage | Chaque coffre garde le sceau du précédent | Les 3 coffres de face | « Comparer les sceaux » | Anneaux corail autour des sceaux jumeaux |
| 4 | 3 · Immutabilité | Trafiquer un coffre, ça se voit | Idem | « Falsifier le bloc 1 » | Nouveau tampon, corde coupée, anneaux rouges |
| 5 | 4 · Réseau | L'archipel | Plongée sur l'archipel | « Envoyer la transaction de Dylan », éteindre des îles | Avions de papier d'île en île |
| 6 | 5 · Minage | La course au sceau | Gros plan sur un nouveau coffre au bout de la chaîne | « Lancer le minage », choix de difficulté | Tampons pâles qui défilent, puis un tampon net |
| 7 | 6 · Consensus | Qui scelle le bloc ? | Plongée sur l'archipel | Course (preuve de travail) puis tirage (preuve d'enjeu) | Une île gagne |
| 8 | 7 · Transaction et attaque | La double dépense | Plongée, deux branches | Choix de la puissance, « Lancer la course » | Deux branches avancent, une l'emporte |

## 2. Plans détaillés

Chaque plan donne : **Cadre** (ce qu'on voit), **Panneau** (texte affiché), **Action**, **Transition** vers le plan suivant, **Prompt image**. Les textes sont raccourcis ; le texte complet est dans `src/sequences.js`.

### Plan 1 — Avant de commencer : « Une chaîne de coffres en carton »
- **Cadre :** vue large, légèrement en plongée. Trois coffres en carton alignés sur le bureau, reliés par une corde corail, chacun avec son tampon. Aucun coffre mis en avant. Étiquettes « Bloc n°1, n°2, n°3 » sur de petits papiers un peu de travers.
- **Panneau :** badge rond « 0 » (introduction), titre, trois paragraphes : le cahier de comptes que personne ne peut modifier en douce ; chaque page est un coffre fermé par un tampon ; on suit « Dylan envoie 5 jetons à Maxens ». Post-it « En vrai… » fermé.
- **Action :** aucune, bouton « Suivant → ».
- **Transition :** la caméra glisse (1,4 s) vers le coffre du milieu.
- **Prompt image :** `[style] wide three-quarter view of three cardboard chests in a row on a cream desk, each with a round colorful ink stamp on a tracing-paper window, connected by a loose coral rope, small paper tags above them, soft lamp light`

### Plan 2 — Notion 1 : « Le coffre »
- **Cadre :** gros plan sur un coffre. Une bulle post-it « Clique sur le coffre » se balance dessous. Au survol, le verre du coffre prend une teinte.
- **Panneau :** « Ce coffre, c'est un bloc. Il contient une transaction : Thomas envoie 3 jetons à Julien. » Il a une fenêtre en papier calque ; l'ouvrir casserait le sceau. Bouton « Allumer la lampe du coffre ».
- **Action :** clic sur le coffre ou sur le bouton.
- **Après l'action :** la lampe s'allume, le calque devient lisible. Quatre étiquettes de papier (tenues par du ruban corail) pointent chaque champ par un trait corail : **transaction**, **nonce** (une pièce), **sceau**, **sceau du coffre d'avant**. Le panneau liste ces champs et les 64 caractères du vrai hash. Légende : la couleur et le motif du tampon viennent du code.
- **Transition :** la caméra recule pour montrer 3 coffres.
- **Prompts image :**
  - Avant : `[style] close-up of one cardboard chest with a tracing-paper window, dark inside, a small yellow sticky note bouncing above it`
  - Après : `[style] same chest, lamp lit inside, the tracing paper glows warm, four paper labels taped around it with thin coral leader lines pointing to a small gold coin, a large round ink stamp, and a smaller stamp in the front left corner`

### Plan 3 — Notion 2 : « Chaque coffre garde le sceau du précédent »
- **Cadre :** les trois coffres de face (blocs 1, 2, 3), corde corail entre eux. Dans le coin avant gauche de chaque coffre, un petit tampon : copie du grand tampon du coffre précédent.
- **Panneau :** « Regarde le petit sceau dans le coin de chaque coffre : c'est une copie du sceau du coffre d'avant. » Bouton « Comparer les sceaux ».
- **Action :** clic sur le bouton.
- **Après l'action :** des anneaux corail entourent les sceaux jumeaux (grand sceau du bloc 1 et petit sceau du bloc 2, etc.). Le panneau écrit « parent du bloc N = sceau du bloc N−1 ». Bouton devient « C'est bon, j'ai vu ».
- **Transition :** même cadre, pour que la falsification se fasse sur la même image.
- **Prompt image :** `[style] three cardboard chests in a row, each with a big round stamp and a small identical copy of the previous chest's stamp in its front-left corner, glowing coral rings around each pair of identical stamps, coral rope between chests`

### Plan 4 — Notion 3 : « Trafiquer un coffre, ça se voit »
- **Cadre :** mêmes trois coffres.
- **Panneau :** « Quelqu'un veut tricher : il change la transaction du bloc 1 […]. Essaie. » Bouton « Falsifier le bloc 1 ».
- **Action :** clic sur le bouton.
- **Après l'action :** un nouveau tampon, totalement différent, s'imprime sur le bloc 1 (le coffre s'écrase légèrement, des gouttes d'encre giclent puis s'effacent). Plaque « falsifié » rouge. La corde entre le bloc 1 et le bloc 2 devient rouge, **se coupe** et ses deux moitiés retombent en se balançant. Le sceau copié dans le bloc 2 ne correspond plus (anneaux rouges). Le panneau liste les écarts. Bouton « Remettre comme avant » : la corde se renoue et se retend.
- **Transition :** la caméra monte vers l'archipel, les îles se déplient.
- **Prompts image :**
  - `[style] a cardboard chest being hit by a big round ink stamp from above, ink droplets flying, the new stamp is a completely different color, a small red paper tag reading nothing, three-quarter view`
  - `[style] two cardboard chests side by side, the coral rope between them is cut and red, both halves hanging down and swinging, red rings around two stamps that no longer match`

### Plan 5 — Notion 4 : « L'archipel »
- **Cadre :** plongée sur sept îles en papier découpé dispersées, sans île au centre. Dylan à gauche, Maxens à droite. Décors pop-up qui se relèvent (phare, arbres, cabane). Étiquette « Île de Dylan », etc. Bulle post-it sur l'île de Dylan.
- **Panneau :** « Qui garde cette chaîne ? Personne en particulier : tout le monde. Chaque île est un ordinateur du réseau, avec sa propre copie. » Bouton « Envoyer la transaction de Dylan ».
- **Action :** envoyer, puis cliquer une île pour l'éteindre (ou bouton « Éteindre une île »), puis renvoyer.
- **Après l'action :** des avions en papier partent de l'île de Dylan et passent d'île en île ; chaque île touchée s'illumine. Une île éteinte s'affaisse, grisée, étiquette « · éteinte », ses routes pâlissent ; la transaction trouve un autre chemin.
- **Transition :** la transaction attend au-dessus des îles ; le plan suivant la range dans un coffre.
- **Prompts image :**
  - `[style] top-down three-quarter view of seven small paper islands scattered on a blue paper sea, pop-up lighthouse, trees and a hut standing up on each island, dotted paths between neighbors, no central island`
  - `[style] same archipelago, small paper airplanes flying along the dotted paths from the left island to the right island, touched islands glow coral, one island dimmed and sunken (switched off)`

### Plan 6 — Notion 5 : « La course au sceau »
- **Cadre :** gros plan sur un **nouveau coffre au bout de la chaîne** (bloc 4), sans sceau. Un bandeau de petites étiquettes : « Bloc n°4 · sans sceau ».
- **Panneau :** « La transaction de Dylan est rangée dans un nouveau coffre. Il lui manque un sceau. Règle : le sceau doit commencer par 00. » Bouton « Lancer le minage », choix de difficulté `00` / `000`.
- **Action :** lancer le minage.
- **Pendant :** le nonce (pièce) change à chaque essai, un tampon **pâle** se pose et s'efface sans cesse, compteur d'essais qui grimpe.
- **Après :** un tampon **net et plein** s'imprime, étiquette « Bloc n°4 · scellé », anneaux corail ; le panneau donne le nonce trouvé et le nombre d'essais. Essayer `000` : environ 16 fois plus d'essais.
- **Transition :** retour sur l'archipel.
- **Prompts image :**
  - `[style] close-up of a new cardboard chest at the end of a chain, empty tracing paper window, a gold coin floating above it, many faint pale stamp ghosts overlapping on the window`
  - `[style] same chest after success: a crisp bold round ink stamp printed on the window, coral rings around it, ink droplets, a small tag saying sealed`

### Plan 7 — Notion 6 : « Qui scelle le bloc ? »
- **Cadre :** plongée sur l'archipel, avec des **machines** posées sur chaque île (nombre différent selon l'île) pour la preuve de travail, et des **jetons** pour la preuve d'enjeu.
- **Panneau :** deux choix : « Preuve de travail » (course au sceau, plus de machines = plus vite) et « Preuve d'enjeu » (tirage au sort, chaque jeton misé est un ticket). Boutons « Lancer la course » / « Faire le tirage ».
- **Action :** choisir la méthode, lancer, relancer plusieurs fois.
- **Après :** en PoW, toutes les îles calculent, **une seule** gagne (étiquette gagnante corail), le travail des autres est perdu. En PoS, un seul tirage, presque aucun calcul, l'île la plus dotée gagne plus souvent mais pas toujours.
- **Prompts image :**
  - PoW : `[style] archipel of paper islands each with a different number of small cardboard calculating machines, tiny sparks, one island on the left is crowned with a coral winner tag`
  - PoS : `[style] archipel of paper islands each holding a different pile of paper tokens, one big ticket drawer above, a single island highlighted by a spotlight`

### Plan 8 — Notion 7 : « La double dépense »
- **Cadre :** plongée sur deux branches de coffres qui partent du même bloc 3 : la chaîne honnête (blocs 4, 5, 6…) et la **branche secrète de Dylan** (un autre bloc 4). Une jauge de puissance.
- **Panneau :** « Dylan veut tricher. En secret, il fabrique un autre bloc 4, où les mêmes jetons lui reviennent. […] On garde toujours la chaîne la plus longue. » Choix de la puissance (30 % par défaut, 60 %), bouton « Lancer la course ». Liste du cycle de vie de la transaction : ✓ signée, ✓ envoyée, ✓ en attente, ✓ dans un bloc.
- **Action :** choisir la puissance, lancer.
- **Après (30 %) :** la branche de Dylan reste plus courte, les îles la **rejettent** : elle bascule en arrière, et la transaction de Maxens reste. Les confirmations s'ajoutent.
- **Après (60 %) :** la branche de Dylan devient la plus longue, les îles l'adoptent, le bloc 4 de Maxens est abandonné (✗, barré) : « C'est l'attaque des 51 % ».
- **Fin :** le parcours s'arrête là ; bouton « Suivant » désactivé, on peut tout rejouer avec les pastilles.
- **Prompts image :**
  - `[style] two chains of cardboard chests splitting from the same block, a long honest chain on top with four chests, a short secret chain below with two chests, a paper gauge showing 30 percent`
  - `[style] attack succeeds: the lower secret chain is now longer, the upper honest chest crossed out and tilted, coral and red tags, confetti-free, serious tone`

## 3. Transitions et rythme

| Passage | Durée | Effet |
|:---|:---|:---|
| Toutes les étapes | 1,4 s | La caméra glisse vers le nouveau point de vue |
| Étape 4 → 5 | 1,4 s | La caméra quitte la chaîne ; l'archipel grandit vers le centre de l'écran, les décors se relèvent un à un |
| Étape 5 → 6 | 1,4 s | L'archipel rétrécit, le coffre à miner grandit au bout de la chaîne |
| Étiquettes | 250 ms | Apparaissent après l'objet qu'elles décrivent et disparaissent avant lui |

**Interactions de secours :** boutons « Précédent / Suivant », pastilles numérotées, flèches ← → du clavier, `?etape=N` pour ouvrir directement une étape. Avec `prefers-reduced-motion`, les transitions sont instantanées.

## 4. Variante téléphone (≤ 760 px)

La fiche cartonnée passe **en bas de l'écran** (52 % de la hauteur au plus, elle défile), sans rubans ni inclinaison. La scène occupe le haut, le centre de la vue est décalé pour que l'objet concerné ne soit pas caché. Mêmes plans, cadrés plus serrés.

## 5. Ce qu'il faut demander à l'IA

1. **Une planche par plan** (8 images, ou 12 avec les états avant/après des plans 2, 4, 5, 6, 8), même style, même caméra par plan.
2. **Une planche d'interface** : la fiche cartonnée lignée avec le badge rond, le titre, le texte, un bouton en carton, un post-it « En vrai… » et la barre de 8 pastilles.
3. **Garder les mêmes tampons** d'un plan à l'autre (donner à l'IA les couleurs des trois premiers coffres : par exemple rouge, bleu, vert).
4. **Ne pas faire écrire de texte** par l'IA : les textes viennent du panneau, les images ne contiennent pas de lettres lisibles.
