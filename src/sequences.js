// Le parcours, une séquence par étape. Chaque séquence fixe le point de vue de la caméra
// et le coffre mis en avant (focus = index du bloc, ou null).
// `chain` : blocs dont on compare les sceaux (le bouton allume les liens), `cameraOn` : coffre au centre du cadre,
// `tamper` : le bouton falsifie les données de ce bloc et on recalcule le vrai sceau.
// `network` : la caméra part sur l'archipel, le bouton envoie la transaction de Dylan d'île en île.
// `mining` : un nouveau coffre au bout de la chaîne, le bouton lance la recherche du nonce (textRunning pendant les essais).
// Les notions 6 et 7 viendront s'ajouter ici.

export const SEQUENCES = [
  {
    id: 'intro',
    step: 'Avant de commencer',
    title: 'Une chaîne de coffres en verre',
    text: [
      'Une blockchain, c’est un cahier de comptes que tout le monde peut lire, et que personne ne peut modifier en douce.',
      'Ici, chaque page du cahier est un <strong>coffre en verre</strong>, fermé par un sceau. Les coffres sont accrochés les uns aux autres, dans l’ordre.',
      'On va suivre une transaction : <strong>Dylan envoie 5 jetons à Maxens</strong>.',
    ],
    enVrai:
      'Les coffres sont une image. En vrai, ce sont des données copiées sur des milliers d’ordinateurs. Bitcoin ajoute un bloc toutes les 10 minutes environ, depuis 2009.',
    camera: { position: [0.5, 3.4, 11], target: [0, 0, 0] },
    focus: null,
  },
  {
    id: 'coffre',
    notion: 1,
    step: 'Notion 1 · Structure d’un bloc',
    title: 'Le coffre',
    text: [
      'Ce coffre, c’est un <strong>bloc</strong>. Il contient une transaction : <strong>Thomas envoie 3 jetons à Julien</strong>.',
      'Il est en verre : on voit dedans sans l’ouvrir. L’ouvrir casserait le sceau.',
    ],
    textInspected: [
      'Un bloc, c’est 4 choses : la <strong>transaction</strong>, un <strong>nombre</strong> (le nonce), son <strong>sceau</strong>, et le <strong>sceau du coffre d’avant</strong>.',
      'Le sceau est un code unique calculé à partir de tout le contenu, un peu comme une empreinte digitale. Change une seule lettre dedans et le sceau devient complètement différent.',
    ],
    enVrai:
      'Ce « sceau » s’appelle un <strong>hash</strong> (ici SHA-256) : 64 caractères calculés par ton navigateur, écrits à côté du dessin. Chez Bitcoin, un bloc contient plusieurs milliers de transactions et une date ; ici, une seule.',
    camera: { position: [0.3, 0.9, 4.7], target: [0, -0.05, 0] },
    focus: 2,
  },
  {
    id: 'chainage',
    notion: 2,
    step: 'Notion 2 · Chaînage',
    title: 'Chaque coffre garde le sceau du précédent',
    text: [
      'Regarde le petit sceau dans le coin de chaque coffre : c’est une <strong>copie du sceau du coffre d’avant</strong>.',
      'C’est ça qui forme la <strong>chaîne</strong> : chaque bloc sait quel bloc le précède.',
    ],
    textInspected: [
      'Les sceaux allumés sont jumeaux : le sceau du bloc 1 est recopié dans le bloc 2, celui du bloc 2 dans le bloc 3.',
      'Si on change un vieux bloc, son sceau change, et la copie dans le suivant ne correspond plus. C’est l’idée de la notion 3.',
    ],
    button: ['Comparer les sceaux', 'C’est bon, j’ai vu'],
    enVrai:
      'Dans une vraie blockchain, l’en-tête d’un bloc contient le hash du bloc précédent. Le tout premier bloc (genèse) n’a pas de parent : on y met des zéros.',
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
      'Quelqu’un veut tricher : il change la transaction du <strong>bloc 1</strong>, pour que Nicolas envoie 200 jetons au lieu de 2.',
      'Essaie, et regarde ce qui se passe.',
    ],
    textInspected: [
      'Le sceau du bloc 1 a complètement changé. Le bloc 2 en gardait une copie : <strong>elles ne correspondent plus</strong>. La chaîne est cassée, et tout le monde le voit.',
      'Pour cacher la triche, il faudrait refaire le bloc 1, puis le 2, puis le 3, jusqu’au bout. Pas impossible, mais beaucoup trop long.',
    ],
    button: ['Falsifier le bloc 1', 'Remettre comme avant'],
    enVrai:
      'Sur Bitcoin, refaire un vieux bloc oblige à refaire tout le travail des suivants, pendant que le réseau en ajoute de nouveaux. Seul un attaquant avec plus de la moitié de la puissance de calcul pourrait y arriver : l’attaque des 51 % (notion 7).',
    camera: { position: [0, 1.5, 6.4], target: [0, 0, 0] },
    focus: null,
    cameraOn: 2,
    chain: [1, 2, 3],
    tamper: { index: 1, data: 'Nicolas → Pierre : 200 jetons' },
  },
  {
    id: 'reseau',
    notion: 4,
    step: 'Notion 4 · Réseau',
    title: 'L’archipel',
    text: [
      'Qui garde cette chaîne ? Personne en particulier : <strong>tout le monde</strong>.',
      'Chaque île est un ordinateur du réseau, avec sa propre copie de la chaîne (mêmes sceaux partout).',
      'Dylan est sur son île. Envoie sa transaction et regarde-la voyager jusqu’à Maxens.',
    ],
    textInspected: [
      'Pas de chef, pas de serveur central : chaque île vérifie la transaction puis la passe à ses voisines.',
      '<strong>Clique sur une île pour l’éteindre</strong> et renvoie la transaction : elle trouve un autre chemin. Aucune île n’est indispensable.',
      'La transaction attend encore au-dessus des îles : elle n’est pas dans un bloc. Le minage va l’y ranger (notion 5).',
    ],
    button: ['Envoyer la transaction de Dylan', 'Renvoyer la transaction'],
    enVrai:
      'Une île, c’est un <strong>nœud</strong> : un ordinateur qui garde une copie complète de la chaîne. Bitcoin en compte des dizaines de milliers. Les messages passent de proche en proche, comme le bouche-à-oreille (<em>gossip</em>). En attendant d’être dans un bloc, une transaction patiente dans la <strong>mempool</strong>, une salle d’attente.',
    camera: { position: [0, 7.5, 8.5], target: [0, -0.3, 0.4] },
    focus: null,
    network: true,
  },
  {
    id: 'minage',
    notion: 5,
    step: 'Notion 5 · Minage',
    title: 'La course au sceau',
    text: [
      'Pour entrer dans la chaîne, la transaction de Dylan est rangée dans un <strong>nouveau coffre</strong>, au bout. Il lui manque un sceau.',
      'Règle : le sceau doit commencer par <strong>00</strong>. On ne peut pas le choisir : on change seulement le <strong>nonce</strong> (la pièce) et on recalcule. Lance le minage !',
    ],
    textRunning: [
      'Chaque essai change le nonce, donc le sceau, au hasard. Impossible de deviner : on essaie, encore et encore.',
      '<strong>Miner</strong>, c’est ça : faire le plus d’essais possible, le plus vite possible.',
    ],
    textInspected: [
      'Trouvé ! Il a fallu beaucoup d’essais pour <strong>trouver</strong> le bon nonce, mais un seul calcul suffit pour le <strong>vérifier</strong>. Chaque île le fait avant d’accepter le bloc.',
      'Essaie la difficulté <strong>000</strong> : un zéro de plus, environ 16 fois plus d’essais. Environ, car c’est un tirage au sort.',
    ],
    button: ['Lancer le minage', 'Miner à nouveau'],
    enVrai:
      'Chez Bitcoin, le hash doit commencer par une vingtaine de zéros. Les mineurs du monde font en tout des milliards de milliards d’essais par seconde, et il faut quand même <strong>10 minutes</strong> en moyenne. Le gagnant reçoit des bitcoins neufs : d’où le mot « minage ». Ici, les blocs déjà posés sont en <strong>00</strong> ; passer à <strong>000</strong> durcit la règle pour les blocs à venir, comme Bitcoin le fait quand il réajuste la difficulté.',
    camera: { position: [-0.4, 1.3, 5.6], target: [-0.4, -0.05, 0] },
    focus: 4,
    mining: true,
  },
];
