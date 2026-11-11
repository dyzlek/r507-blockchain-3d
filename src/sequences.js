// Le parcours, une séquence par étape. Chaque séquence fixe le point de vue de la caméra
// et le coffre mis en avant (focus = index du bloc, ou null).
// `chain` : blocs dont on compare les sceaux (le bouton allume les liens), `cameraOn` : coffre au centre du cadre,
// `tamper` : le bouton falsifie les données de ce bloc et on recalcule le vrai sceau.
// `network` : la caméra part sur l'archipel, le bouton envoie la transaction de Dylan d'île en île.
// `mining` : un nouveau coffre au bout de la chaîne, le bouton lance la recherche du nonce (textRunning pendant les essais).
// `consensus` : sur l'archipel, une course (preuve de travail) ou un tirage (preuve d'enjeu) désigne l'île qui scelle.
// `race` : la branche secrète de Dylan fait la course contre la chaîne honnête (double dépense).
// `words` : « Les mots de cette étape », courte définition de chaque terme nouveau (issue #46).
// `overview` : dézoom final, on voit toutes les îles (la chaîne et l'archipel) d'un seul regard.

export const SEQUENCES = [
  {
    id: 'intro',
    step: 'Avant de commencer',
    title: 'Une chaîne de coffres en carton',
    text: [
      'Une blockchain, c’est un cahier de comptes. Tout le monde peut le lire, personne ne peut le modifier en douce.',
      'Chaque <strong>coffre</strong> est un bloc, fermé par un tampon : son <strong>sceau</strong>. Une <strong>corde</strong> les relie dans l’ordre.',
      'Les <strong>jetons</strong> sont une monnaie. Une <strong>transaction</strong>, c’est un paiement. On va en suivre un : <strong>Dylan paie 5 jetons à Maxens pour son vélo</strong>. Il arrivera dans un coffre à l’étape 5.',
    ],
    words: [
      ['Bloc', 'une page du cahier : un coffre qui contient une transaction.'],
      ['Sceau', 'le tampon qui ferme un coffre. Il change si on touche au contenu.'],
      ['Jeton', 'l’unité qu’on s’envoie, comme une pièce.'],
    ],
    enVrai:
      'Les coffres ne sont qu’un dessin. En vrai, ce sont des données sur des ordinateurs. Des milliers d’ordinateurs gardent la même copie. Sur Bitcoin, un nouveau bloc s’ajoute toutes les 10 minutes environ, depuis 2009.',
    camera: { position: [0.5, 3.4, 11], target: [0, 0, 0] },
    focus: null,
  },
  {
    id: 'coffre',
    notion: 1,
    step: 'Notion 1 · Structure d’un bloc',
    title: 'Le coffre',
    text: [
      'Le coffre marqué d’une flèche est un <strong>bloc</strong>. Il contient une transaction : <strong>Thomas envoie 3 jetons à Julien</strong>.',
      'Sa fenêtre est en <strong>papier calque</strong> : on devine l’intérieur sans l’ouvrir (l’ouvrir casserait le sceau). Allume la <strong>lampe</strong> cachée dans le coffre pour mieux voir.',
    ],
    textInspected: [
      'Un bloc, c’est 4 choses : la <strong>transaction</strong>, un <strong>nombre</strong> (le nonce, la pièce numérotée, qui servira à l’étape 5), son <strong>sceau</strong>, et le <strong>sceau du coffre d’avant</strong>.',
      'Le sceau est un code unique calculé à partir de tout le contenu, un peu comme une empreinte digitale. Change une seule lettre dedans et le sceau devient complètement différent. Sa couleur et son motif viennent de ce code : autre code, autre tampon.',
    ],
    words: [
      ['Transaction', 'un envoi de jetons : qui donne, qui reçoit, combien.'],
      ['Nonce', 'un nombre qu’on ajoute dans le coffre. On le change pour obtenir un autre sceau.'],
      ['Sceau', 'l’empreinte du coffre, calculée à partir de tout son contenu.'],
    ],
    enVrai:
      'Le « sceau » s’appelle un <strong>hash</strong>. C’est un code de 64 caractères, calculé par ton navigateur avec une formule (SHA-256). L’étiquette « Sceau » n’en montre que le début et la fin. Chez Bitcoin, un bloc contient des milliers de transactions et une date. Ici, une seule, pour rester simple.',
    camera: { position: [0.3, 0.9, 4.7], target: [0, -0.05, 0] },
    focus: 2,
  },
  {
    id: 'chainage',
    notion: 2,
    step: 'Notion 2 · Chaînage',
    title: 'Chaque coffre garde le sceau du précédent',
    text: [
      'Regarde le petit sceau dans le coin de chaque coffre : c’est une <strong>copie du sceau du coffre d’avant</strong>. Chaque coffre a <strong>recopié</strong> le sceau du précédent, comme on recopie le numéro de la page d’avant en haut d’une page.',
      'C’est ça qui forme la <strong>chaîne</strong> : chaque bloc sait quel bloc le précède.',
    ],
    textInspected: [
      'Les sceaux allumés sont jumeaux : le sceau du bloc 1 est recopié dans le bloc 2, celui du bloc 2 dans le bloc 3.',
      'Si on change un vieux bloc, son sceau change, et la copie dans le suivant ne correspond plus. C’est l’idée de la notion 3.',
    ],
    button: ['Comparer les sceaux', 'C’est bon, j’ai vu'],
    words: [
      ['Chaîne', 'les coffres reliés dans l’ordre, du plus ancien au plus récent.'],
      ['Sceau du coffre d’avant', 'la copie, dans un coffre, du sceau du coffre précédent. C’est elle qui les relie.'],
    ],
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
      'Pour cacher la triche, il faudrait refaire le bloc 1, puis le 2, puis le 3, jusqu’au bout. Pas impossible, mais beaucoup trop long : tu verras à l’étape 5 que sceller un seul bloc demande des centaines d’essais.',
      'Et les autres ordinateurs ont leur propre copie : à la notion 4, tu verras qu’ils <strong>refusent</strong> le bloc trafiqué.',
    ],
    button: ['Falsifier le bloc 1', 'Remettre comme avant'],
    words: [
      ['Falsifier', 'changer le contenu d’un coffre déjà fermé pour tricher.'],
      ['Immuable', 'qu’on ne peut pas modifier sans que ça se voie.'],
    ],
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
      'Recule : la chaîne était posée sur <strong>l’île de Dylan</strong>. Et ce n’est qu’une île parmi d’autres.',
      'Chaque île est un participant, avec ses ordinateurs. Elle a sa propre copie de la chaîne, avec les mêmes sceaux. Personne n’est le chef : <strong>tout le monde</strong> garde le cahier.',
      'Clique sur l’île de Dylan : sa transaction part et voyage jusqu’à Maxens.',
    ],
    textInspected: [
      'Pas de chef. Chaque île vérifie la transaction, puis la transmet à ses voisines. Une île ne sait pas ce qu’elles ont déjà reçu : si l’avion arrive chez une île qui l’a déjà, elle <strong>ignore le doublon</strong>. C’est ce qui arrête la propagation.',
      '<strong>Clique sur une île pour l’éteindre</strong>, puis renvoie la transaction : elle passe par un autre chemin. Aucune île n’est obligatoire.',
      'Et si Dylan envoyait le <strong>bloc trafiqué</strong> de la notion 3 ? Choisis « Bloc 1 falsifié » plus bas, puis envoie-le.',
    ],
    textForged: [
      'Les voisines de Dylan comparent ce bloc avec leur copie : <strong>le sceau ne correspond pas</strong>. Elles le refusent et ne le font pas suivre.',
      'Le faux bloc s’arrête là. Maxens ne le reçoit jamais.',
      '<strong>À retenir :</strong> chaque île vérifie tout ce qu’elle reçoit. Pour faire passer une triche, il faudrait tromper presque toutes les îles en même temps.',
    ],
    button: ['Envoyer la transaction de Dylan', 'Renvoyer la transaction'],
    buttonForged: 'Envoyer le bloc 1 falsifié',
    words: [
      ['Nœud', 'une île : un ordinateur qui garde toute la chaîne.'],
      ['Doublon', 'la même transaction reçue une deuxième fois. L’île l’ignore.'],
      ['Mempool', 'la salle d’attente des transactions qui ne sont pas encore dans un bloc.'],
    ],
    enVrai:
      'Une île s’appelle un <strong>nœud</strong> : un ordinateur qui garde toute la chaîne. Bitcoin en a des dizaines de milliers. La transaction qui attend s’appelle la <strong>mempool</strong> : une salle d’attente.',
    camera: { position: [0, 94, 88], target: [0, 0, 22] },
    focus: null,
    network: true,
  },
  {
    id: 'minage',
    notion: 5,
    step: 'Notion 5 · Minage',
    title: 'La course au sceau',
    text: [
      'La transaction de Dylan va dans un <strong>nouveau coffre</strong>, au bout de la chaîne. Il manque son sceau.',
      'La règle : le sceau doit commencer par <strong>00</strong>. On ne peut pas le choisir. On change seulement le <strong>nonce</strong> (le nombre sur la pièce), et on recalcule.',
      'Pourquoi rendre ça difficile exprès ? Pour qu’un tricheur ne puisse pas refaire les blocs en vitesse (étape 3) : chaque bloc coûte du travail. Lance le minage !',
    ],
    textRunning: [
      'Chaque essai change le nonce, donc le sceau. On ne peut pas deviner : on essaie, encore et encore.',
      '<strong>Miner</strong>, c’est ça : faire le plus d’essais possible, le plus vite possible.',
    ],
    textInspected: [
      'Trouvé ! Il a fallu beaucoup d’essais pour <strong>trouver</strong> le bon nonce. Mais un seul calcul suffit pour <strong>vérifier</strong> qu’il est bon.',
      'Essaie <strong>000</strong> : un zéro de plus, environ 16 fois plus d’essais. « Environ », car c’est du hasard.',
    ],
    button: ['Lancer le minage', 'Miner à nouveau'],
    words: [
      ['Miner', 'essayer des nonces, encore et encore, jusqu’à trouver un sceau qui respecte la règle.'],
      ['Règle du 00', 'le sceau doit commencer par deux zéros. Plus de zéros, plus d’essais.'],
      ['Vérifier', 'un seul calcul : on regarde si le sceau respecte la règle.'],
    ],
    enVrai:
      'Chez Bitcoin, le sceau doit commencer par une vingtaine de zéros, et il faut en moyenne 10 minutes pour trouver le bon. Le gagnant reçoit des bitcoins neufs : d’où le mot « minage ». Ici, passer à 000 durcit la règle pour les blocs suivants, comme Bitcoin le fait.',
    camera: { position: [-0.4, 1.3, 5.6], target: [-0.4, -0.05, 0] },
    focus: 4,
    mining: true,
  },
  {
    id: 'consensus',
    notion: 6,
    step: 'Notion 6 · Consensus',
    title: 'Qui scelle le bloc ?',
    text: [
      'Toutes les îles peuvent proposer le prochain bloc. Il en faut <strong>un seul</strong>. Sans chef, comment se mettre d’accord ? C’est le <strong>consensus</strong>.',
      'Méthode 1, la <strong>course</strong> (preuve de travail) : la première île qui trouve un bon sceau gagne. Une île peut avoir plusieurs ordinateurs : plus elle en a, plus elle fait d’essais.',
      'Méthode 2, le <strong>tirage au sort</strong> (preuve d’enjeu) : chaque île mise des jetons. Plus elle mise, plus elle a de chances. <strong>Essaie les deux.</strong>',
    ],
    textDone: {
      pow: [
        'Une seule île gagne. Les autres ont calculé pour rien : <strong>beaucoup d’électricité perdue</strong>.',
        'L’île qui a le plus d’ordinateurs gagne plus souvent. Essaie maintenant le tirage au sort.',
        '<strong>À retenir :</strong> la course est très sûre, mais elle consomme beaucoup d’énergie.',
      ],
      pos: [
        'Un seul tirage, presque aucun calcul : <strong>très peu d’électricité</strong>.',
        'Si l’île tirée triche, les autres refusent son bloc et elle <strong>perd sa mise</strong>. Elle a donc intérêt à rester honnête.',
        '<strong>À retenir :</strong> le tirage est économe, mais les plus riches gagnent plus souvent.',
      ],
    },
    buttons: {
      pow: ['Lancer la course', 'Course en cours…', 'Relancer la course'],
      pos: ['Faire le tirage', 'Tirage en cours…', 'Refaire le tirage'],
    },
    words: [
      ['Consensus', 'la règle qui fait que tout le monde se met d’accord sur le prochain bloc.'],
      ['Preuve de travail', 'la course : la première île qui trouve un bon sceau gagne.'],
      ['Preuve d’enjeu', 'le tirage au sort : on mise des jetons, plus on mise, plus on a de chances.'],
    ],
    enVrai:
      'Le <strong>consensus</strong> est la règle qui fait que des milliers d’ordinateurs se mettent d’accord sur le bloc suivant. Bitcoin utilise la <strong>preuve de travail</strong> (<em>Proof of Work</em>) : elle consomme autant d’électricité qu’un pays entier. Ethereum est passé à la <strong>preuve d’enjeu</strong> (<em>Proof of Stake</em>) en 2022 et a réduit sa consommation de plus de 99 %. Limite : en PoW, les plus grosses machines gagnent plus souvent ; en PoS, les plus riches. Ici, c’est une simulation : la gagnante est tirée au sort selon ses chances, puis la course est jouée, et les compteurs d’essais sont très ralentis (une vraie machine fait des milliards d’essais par seconde). La récompense du gagnant n’est pas montrée.',
    camera: { position: [0, 94, 88], target: [0, 0, 22] },
    focus: null,
    consensus: true,
  },
  {
    id: 'attaque',
    notion: 7,
    step: 'Notion 7 · Transaction et attaque',
    title: 'La double dépense',
    text: [
      'Le paiement de Dylan est dans le <strong>bloc 4</strong>. Maxens a reçu ses 5 jetons et a donné <strong>le vélo</strong> à Dylan.',
      'Mais Dylan triche. En secret, il fabrique <strong>un autre bloc 4</strong> où les 5 jetons lui reviennent. S’il réussit, il garde le vélo <strong>et</strong> ses jetons, qu’il peut dépenser une deuxième fois : c’est la <strong>double dépense</strong>.',
      'Les îles suivent toujours <strong>la chaîne la plus longue</strong>, car c’est celle qui a demandé le plus de travail. Pour gagner, Dylan doit ajouter des blocs plus vite que toutes les autres îles réunies. Sa <strong>puissance</strong>, c’est le nombre d’ordinateurs qui calculent pour lui. Lance la course.',
    ],
    textRunning: [
      'Les autres îles ajoutent des blocs après celui de Maxens. Dylan, seul, ajoute des blocs à sa chaîne secrète.',
      'Chaque bloc ajouté après celui de Maxens est une <strong>confirmation</strong> : le paiement devient de plus en plus sûr.',
    ],
    textInspected: [
      'Raté : la chaîne de Dylan est <strong>plus courte</strong>. Les îles l’ignorent. Maxens garde ses jetons, Dylan a payé le vélo.',
      'Seul contre tous, Dylan est trop lent. Rejoue plusieurs fois, puis essaie avec <strong>60 %</strong> de la puissance.',
      '<strong>À retenir :</strong> la double dépense, c’est payer avec des jetons puis les récupérer pour les dépenser encore. Avec moins de la moitié de la puissance, le tricheur perd presque toujours.',
    ],
    // Ajouté après le premier paragraphe quand le hasard contredit la règle.
    textLucky:
      'Coup de chance : avec 30 %, Dylan a trouvé ses blocs plus vite cette fois. Sur une course courte, ça arrive (environ 1 fois sur 5). Plus on attend de <strong>confirmations</strong>, plus la chance devient rare : c’est pour ça que Bitcoin en attend 6.',
    textUnlucky:
      'Pas de chance pour Dylan : même avec 60 %, il a perdu cette course. Mais rejoue : il gagne environ 2 fois sur 3, et sur une longue course presque toujours. C’est l’<strong>attaque des 51 %</strong>.',
    textAttack: [
      'Dylan a gagné : sa chaîne est <strong>plus longue</strong>, les îles la suivent. Le bloc de Maxens disparaît, et ses 5 jetons avec. Maxens a perdu son vélo pour rien.',
      '<strong>À retenir :</strong> pour tricher à coup sûr, il faut plus de la moitié de la puissance du réseau. C’est l’<strong>attaque des 51 %</strong>. Sur Bitcoin, ça coûterait des milliards.',
    ],
    button: ['Lancer la course', 'Rejouer la course'],
    words: [
      ['Double dépense', 'payer deux fois avec les mêmes jetons.'],
      ['Confirmation', 'un bloc ajouté après le tien. Plus il y en a, plus le paiement est sûr.'],
      ['Attaque des 51 %', 'tricher à coup sûr en ayant plus de la moitié de la puissance du réseau.'],
    ],
    enVrai:
      'Sur Bitcoin, on considère une transaction sûre après environ <strong>6 confirmations</strong>, soit une heure. Ici, comme en vrai, chaque bloc arrive au hasard : un tricheur peut avoir de la chance sur un bloc ou deux, jamais sur six. La course est seulement accélérée (une seconde au lieu de 10 minutes). L’attaque des 51 % est déjà arrivée sur de petites blockchains, comme Ethereum Classic en 2019 et 2020.',
    camera: { position: [0.3, 7, 8.8], target: [0.3, -0.2, 0] },
    focus: null,
    race: true,
  },
  {
    id: 'ensemble',
    step: 'Vue d’ensemble',
    title: 'Tout l’archipel',
    text: [
      'Voilà tout le chemin parcouru. La <strong>chaîne de coffres</strong> qu’on a ouverte est sur l’île de Dylan, et chaque île de l’<strong>archipel</strong> en garde la même copie.',
      'Une blockchain, c’est ça : un cahier de comptes recopié partout, où chaque page est scellée à la précédente.',
      'Tu peux tourner autour de la scène pour tout revoir.',
    ],
    enVrai:
      'Bitcoin compte des dizaines de milliers d’« îles » (des nœuds) réparties dans le monde, qui gardent toutes la même chaîne de plus de 900 000 blocs.',
    camera: { position: [-46, 92, 76], target: [0, 0, 4] },
    focus: null,
    overview: true,
  },
];
