// Le parcours, une séquence par étape. Chaque séquence fixe le point de vue de la caméra
// et le coffre mis en avant (focus = index du bloc, ou null).
// `chain` : blocs dont on compare les sceaux (le bouton allume les liens), `cameraOn` : coffre au centre du cadre,
// `tamper` : le bouton falsifie les données de ce bloc et on recalcule le vrai sceau.
// `network` : la caméra part sur l'archipel, le bouton envoie la transaction d'Alice d'île en île.
// `mining` : un nouveau coffre au bout de la chaîne, le bouton lance la recherche du nonce (textRunning pendant les essais).
// Les notions 6 et 7 viendront s'ajouter ici.

export const SEQUENCES = [
  {
    id: 'intro',
    step: 'Avant de commencer',
    title: 'Une chaîne de coffres en verre',
    text: [
      'Une blockchain, c’est un registre que tout le monde peut lire, mais que personne ne peut trafiquer en douce.',
      'Ici, chaque page de ce registre est un <strong>coffre en verre</strong> fermé par un sceau. Les coffres sont accrochés les uns aux autres, dans l’ordre où on les a ajoutés.',
      'On va suivre une seule transaction du début à la fin : <strong>Alice envoie 5 jetons à Bob</strong>.',
    ],
    enVrai:
      'Les coffres, c’est une image. Une vraie blockchain, ce sont des données numériques recopiées sur des milliers d’ordinateurs. Bitcoin ajoute un bloc toutes les 10 minutes environ, et ça dure depuis 2009 : sa chaîne dépasse les 900 000 blocs.',
    camera: { position: [0.5, 3.4, 11], target: [0, 0, 0] },
    focus: null,
  },
  {
    id: 'coffre',
    notion: 1,
    step: 'Notion 1 · Structure d’un bloc',
    title: 'Le coffre',
    text: [
      'Ce coffre, c’est un <strong>bloc</strong>. La transaction d’Alice est dedans.',
      'Pas besoin de l’ouvrir pour voir ce qu’il contient : il est en verre. Tant mieux, d’ailleurs, parce que l’ouvrir casserait le sceau.',
    ],
    textInspected: [
      'Tous les blocs contiennent ces quatre choses. Le sceau, lui, est calculé à partir de <strong>tout</strong> ce qu’il y a dans le coffre.',
    ],
    enVrai:
      'Un bloc, c’est un paquet de données. Chez Bitcoin, il contient souvent plusieurs milliers de transactions ; ici, on n’en a mis qu’une. Son empreinte est un <strong>hash SHA-256</strong> : 64 caractères calculés à partir de tout le contenu du bloc. Le sceau coloré sert juste à la rendre visible, et la vraie empreinte, calculée par ton navigateur, est écrite à côté. Le nonce sert au minage, on y revient à la notion 5. Un vrai bloc note aussi la date et l’heure ; on a laissé ça de côté.',
    camera: { position: [0.3, 0.9, 4.7], target: [0, -0.05, 0] },
    focus: 2,
  },
  {
    id: 'chainage',
    notion: 2,
    step: 'Notion 2 · Chaînage cryptographique',
    title: 'Chaque coffre porte le sceau du précédent',
    text: [
      'Regarde le petit sceau gravé dans le coin de chaque coffre : c’est une <strong>copie du sceau du coffre d’avant</strong>.',
      'C’est ça, le chaînage. Pour savoir où est ta place dans la chaîne, il suffit de regarder qui est ton parent.',
    ],
    textInspected: [
      'Les sceaux allumés sont jumeaux : le sceau du bloc 1 est recopié dans le bloc 2, celui du bloc 2 dans le bloc 3.',
      'Et comme le sceau dépend de <strong>tout</strong> le contenu, changer un seul caractère d’un vieux bloc change son sceau, donc ne correspond plus à la copie du suivant. On y vient à la notion 3.',
    ],
    button: ['Comparer les sceaux', 'C’est bon, j’ai vu'],
    enVrai:
      'Dans une vraie blockchain, le bloc contient l’empreinte (hash) du bloc précédent dans son en-tête. C’est ce qui fait de l’ensemble une <strong>chaîne</strong> et pas un simple tas de blocs : modifier un bloc ancien obligerait à refaire le calcul de tous ceux qui suivent. Le premier bloc (genèse) n’a pas de parent, on met des zéros à la place.',
    camera: { position: [0, 1.5, 6.4], target: [0, 0, 0] },
    focus: null,
    cameraOn: 2,
    chain: [1, 2, 3],
  },
  {
    id: 'immutabilite',
    notion: 3,
    step: 'Notion 3 · Immutabilité',
    title: 'Trafiquer un coffre, ça se voit',
    text: [
      'Imagine que quelqu’un veuille tricher : changer en douce la transaction du <strong>bloc 1</strong>, pour que Carla envoie 200 jetons au lieu de 2.',
      'Essaie. Le contenu du coffre change, donc son sceau est recalculé.',
    ],
    textInspected: [
      'Le sceau du bloc 1 a complètement changé. Or le bloc 2 en gardait une copie : <strong>les deux ne correspondent plus</strong>, la chaîne est cassée à cet endroit, et tout le monde peut le voir.',
      'Pour cacher la triche, il faudrait refaire le sceau du bloc 1, puis celui du bloc 2, puis du bloc 3… et ainsi de suite jusqu’au bout de la chaîne. C’est ça, l’immutabilité : pas impossible, mais beaucoup trop coûteux.',
    ],
    button: ['Falsifier le bloc 1', 'Remettre comme avant'],
    enVrai:
      'Sur le vrai Bitcoin, refaire un bloc demande de refaire le travail de minage de tous les suivants, pendant que le reste du réseau continue d’en ajouter. Le seul cas où ça marche, c’est quand un attaquant contrôle plus de la moitié de la puissance de calcul : c’est l’attaque des 51 %, qu’on voit à la notion 7. Ici, le nouveau sceau est calculé pour de vrai par ton navigateur : change un caractère et il ne ressemble plus à l’ancien.',
    camera: { position: [0, 1.5, 6.4], target: [0, 0, 0] },
    focus: null,
    cameraOn: 2,
    chain: [1, 2, 3],
    tamper: { index: 1, data: 'Carla → David : 200 jetons' },
  },
  {
    id: 'reseau',
    notion: 4,
    step: 'Notion 4 · Réseau et décentralisation',
    title: 'L’archipel',
    text: [
      'Cette chaîne, qui la garde ? Personne en particulier : <strong>tout le monde</strong>.',
      'Chaque île de cet archipel est un ordinateur du réseau. Elle a sa propre copie de la chaîne : regarde, ce sont les mêmes sceaux sur toutes les îles.',
      'Alice est sur son île. Envoie sa transaction et regarde comment elle voyage jusqu’à Bob.',
    ],
    textInspected: [
      'Pas de chef ni de serveur central : Alice prévient ses voisines, qui vérifient la transaction puis la font suivre aux leurs, et ainsi de suite. Une île qui l’a déjà reçue ignore les doublons.',
      'Maintenant, <strong>clique sur une île pour l’éteindre</strong>, puis renvoie la transaction : elle passe par un autre chemin. Aucune île n’est indispensable.',
      'Pour l’instant, la transaction attend au-dessus de chaque île : elle n’est pas encore dans un bloc. C’est le minage qui va l’y ranger (notion 5).',
    ],
    button: ['Envoyer la transaction d’Alice', 'Renvoyer la transaction'],
    enVrai:
      'Une île, c’est un <strong>nœud</strong> : un ordinateur qui fait tourner le logiciel de la blockchain et garde une copie complète de la chaîne. Bitcoin en compte des dizaines de milliers dans le monde. Chaque nœud n’est relié qu’à quelques autres (8 au départ, par défaut), et les messages passent de proche en proche : c’est le <strong>bouche-à-oreille</strong> (<em>gossip</em>). Ici, 7 îles et une seconde par saut ; en vrai, une transaction fait le tour du réseau en quelques secondes. En attendant d’être mise dans un bloc, elle patiente dans une salle d’attente que chaque nœud garde, la <strong>mempool</strong>.',
    camera: { position: [0, 7.5, 8.5], target: [0, -0.3, 0.4] },
    focus: null,
    network: true,
  },
  {
    id: 'minage',
    notion: 5,
    step: 'Notion 5 · Validation et minage',
    title: 'La course au sceau',
    text: [
      'Pour entrer dans la chaîne, la transaction d’Alice doit être rangée dans un <strong>nouveau coffre</strong>, au bout. Il ne lui manque que son propre sceau.',
      'Règle du jeu : le sceau doit commencer par <strong>00</strong>. On ne peut pas le choisir, seulement changer le <strong>nonce</strong> (la pièce) et recalculer. Lance le minage !',
    ],
    textRunning: [
      'Chaque essai change le nonce, donc tout le sceau, au hasard. Aucun moyen de deviner le bon : on essaie, encore et encore.',
      'C’est ça, <strong>miner</strong> : une course où l’on fait le plus d’essais possible, le plus vite possible.',
    ],
    textInspected: [
      'Trouvé ! Il a fallu de nombreux essais pour <strong>trouver</strong> ce nonce, mais un seul calcul suffit pour le <strong>vérifier</strong>. C’est ce que fait chaque île avant d’accepter le bloc.',
      'Tricher demanderait de refaire tout ce travail (notion 3). Essaie la difficulté <strong>000</strong> : un zéro de plus, 16 fois plus d’essais en moyenne. En moyenne seulement : c’est un tirage au sort.',
    ],
    button: ['Lancer le minage', 'Miner à nouveau'],
    enVrai:
      'Chez Bitcoin, l’empreinte doit commencer par une vingtaine de zéros (en hexadécimal). Les mineurs du monde entier font ensemble environ mille milliards de milliards d’essais… par seconde, et il faut quand même en moyenne <strong>10 minutes</strong> pour trouver. La difficulté est réajustée tous les 2 016 blocs (environ deux semaines) pour garder ce rythme. Le gagnant touche une récompense en bitcoins neufs, plus les frais des transactions : d’où le mot <strong>minage</strong>. Un vrai bloc contient aussi des milliers de transactions, choisies par le mineur dans sa mempool. Ici, ton navigateur calcule de vrais SHA-256, mais au ralenti pour que tu puisses suivre.',
    camera: { position: [-0.4, 1.3, 5.6], target: [-0.4, -0.05, 0] },
    focus: 4,
    mining: true,
  },
];
