/**
 * Crée le Google Form de la SESSION 2 du test utilisateur (voir TEST-UTILISATEUR.md, issue #18).
 *
 * Par rapport à la session 1 (creer-formulaire-test.gs) :
 *  - les 8 questions de compréhension et les 8 affirmations de ressenti gardent les mêmes mots :
 *    on peut comparer les deux sessions ;
 *  - les étapes portent le nom affiché à l'écran (badge « Notion 4 · Réseau »), 9 étapes au lieu de 8 ;
 *  - chaque question dit en une ligne ce qu'on attend, et « je ne sais pas » est une réponse permise ;
 *  - « le moment le plus perdu » et « le moment où j'ai le mieux compris » sont des listes d'étapes
 *    (un seul clic), suivies d'un « pourquoi » ;
 *  - « ce qui manque » et « ce qui est en trop » sont deux questions séparées ;
 *  - une partie « Ce que vous avez fait » (cases à cocher) remplace une partie des observations
 *    que l'animateur n'avait pas pu noter en session 1 ;
 *  - les questions clés sont obligatoires, pour qu'une réponse vide ne soit pas confondue avec « rien ».
 *
 * Utilisation :
 *   1. Ouvrir https://script.google.com puis « Nouveau projet ».
 *   2. Coller ce fichier à la place du contenu, enregistrer.
 *   3. Lancer la fonction creerFormulaireSession2 (autoriser l'accès à Google Forms et Google Sheets).
 *   4. Les liens (modification, réponse, tableur) s'affichent dans Affichage > Journaux.
 *   5. Reporter les liens dans la section « Liens » de TEST-UTILISATEUR.md.
 */
function creerFormulaireSession2() {
  var form = FormApp.create('Test utilisateur, session 2 — Blockchain 3D (R507)');
  form.setDescription(
    'Merci de tester notre expérience web qui explique la blockchain.\n\n' +
    'Ce qu\'on teste, c\'est l\'expérience, pas vous. Il n\'y a ni bonne ni mauvaise réponse. ' +
    'Écrivez « je ne sais pas » quand c\'est le cas : c\'est une réponse utile pour nous.\n\n' +
    'Déroulé (environ 20 minutes) :\n' +
    '1. Quelques questions sur vous, avant de commencer.\n' +
    '2. Le parcours en 9 étapes. À la fin de chaque étape, 2 ou 3 questions courtes, puis on passe à la suivante.\n' +
    '3. Quelques questions de mémoire, puis votre avis.\n\n' +
    'Vos réponses ne servent que pour notre projet de cours.'
  );
  form.setCollectEmail(false);
  form.setProgressBar(true);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage('Merci pour votre aide, c\'est terminé !');

  var requis = function (q) { return q.setRequired(true); };
  var texte = function (titre, aide, obligatoire) {
    var q = form.addParagraphTextItem().setTitle(titre);
    if (aide) q.setHelpText(aide);
    if (obligatoire) q.setRequired(true);
    return q;
  };
  var choix = function (titre, valeurs, obligatoire) {
    var q = form.addMultipleChoiceItem().setTitle(titre).setChoiceValues(valeurs);
    if (obligatoire) q.setRequired(true);
    return q;
  };

  var ETAPES = [
    'Étape 1 — Avant de commencer',
    'Étape 2 — Notion 1 : le coffre',
    'Étape 3 — Notion 2 : chaque coffre garde le sceau du précédent',
    'Étape 4 — Notion 3 : trafiquer un coffre',
    'Étape 5 — Notion 4 : l\'archipel',
    'Étape 6 — Notion 5 : la course au sceau',
    'Étape 7 — Notion 6 : qui scelle le bloc ?',
    'Étape 8 — Notion 7 : la double dépense',
    'Étape 9 — Vue d\'ensemble'
  ];

  // ---- Partie 1 : avant le parcours -------------------------------------
  form.addSectionHeaderItem()
    .setTitle('Partie 1 sur 4 — Avant de commencer')
    .setHelpText('Ne lancez pas encore l\'expérience : répondez d\'abord à ces questions.');
  requis(form.addTextItem().setTitle('Votre code testeur')
    .setHelpText('Donné par la personne qui vous accompagne (par exemple T3 ou T4). Pas besoin de votre nom.'));
  requis(choix('Votre tranche d\'âge', ['Moins de 18 ans', '18-25 ans', '26-40 ans', '41-60 ans', 'Plus de 60 ans']));
  requis(form.addTextItem().setTitle('Votre formation ou votre métier'));
  requis(choix('Sur quel appareil testez-vous ?', ['Ordinateur', 'Téléphone', 'Tablette']));
  requis(form.addTextItem().setTitle('Quel navigateur ? (Chrome, Firefox, Safari…)')
    .setHelpText('Si vous ne savez pas, écrivez « je ne sais pas ».'));
  requis(choix('Connaissiez-vous la blockchain avant aujourd\'hui ?',
    ['Pas du tout', 'J\'en ai entendu parler', 'Je sais l\'expliquer']));
  requis(choix('Avez-vous déjà utilisé des cryptomonnaies ?', ['Oui', 'Non']));
  requis(form.addScaleItem().setTitle('Êtes-vous à l\'aise avec les outils numériques ?')
    .setBounds(1, 5).setLabels('Pas du tout', 'Très à l\'aise'));
  requis(texte('Avec vos mots, qu\'est-ce que la blockchain, selon vous ?',
    'En une ou deux phrases. Écrivez « je ne sais pas » si c\'est le cas.'));

  // ---- Partie 2 : pendant le parcours -----------------------------------
  var etapes = [
    [ETAPES[0], [
      ['Selon vous, à quoi sert ce que vous voyez ?', 'En une phrase.'],
      ['Avez-vous su quoi faire pour continuer, sans aide ?', 'Oui, non, ou après un indice.']]],
    [ETAPES[1], [
      ['Qu\'y a-t-il dans un coffre ?', 'Citez ce que vous reconnaissez.'],
      ['À quoi sert le sceau, d\'après vous ?', null]]],
    [ETAPES[2], [
      ['Pourquoi les coffres sont-ils reliés par une corde ?', null],
      ['Si on change le premier coffre, que se passe-t-il pour les suivants ?', null]]],
    [ETAPES[3], [
      ['Qu\'avez-vous vu après avoir falsifié le coffre ?', 'Décrivez ce qui a changé à l\'écran.'],
      ['Pourrait-on tricher sans que ça se voie ? Pourquoi ?', null]]],
    [ETAPES[4], [
      ['Que représentent les îles et les avions en papier ?', null],
      ['Pourquoi y a-t-il plusieurs copies de la chaîne ?', null],
      ['Quand Dylan envoie le bloc falsifié, que font les autres îles ?',
        'Si vous n\'avez pas essayé de l\'envoyer, écrivez « pas essayé ».']]],
    [ETAPES[5], [
      ['Que font les îles dans la course ? Quel est le but ?', null],
      ['Pourquoi est-ce difficile de trouver le sceau, alors que vérifier est facile ?', null]]],
    [ETAPES[6], [
      ['Décrivez avec vos mots les deux façons de choisir qui scelle le bloc.', null],
      ['Laquelle vous paraît la plus juste ? La plus économe ?', null]]],
    [ETAPES[7], [
      ['Que cherche à faire Dylan, l\'attaquant ?', null],
      ['Pourquoi la chaîne la plus longue gagne-t-elle ?', null],
      ['Que s\'est-il passé quand Dylan avait 30 % de la puissance ? Et avec 60 % ?',
        'Si vous n\'avez essayé qu\'une des deux, dites laquelle.']]],
    [ETAPES[8], [
      ['En une phrase : qu\'est-ce que vous venez de voir ?', null]]]
  ];
  etapes.forEach(function (e, i) {
    form.addPageBreakItem()
      .setTitle('Partie 2 sur 4 — ' + e[0])
      .setHelpText(i === 0
        ? 'Lancez maintenant l\'expérience. À la fin de chaque étape, revenez ici répondre, puis passez à l\'étape suivante. ' +
          'Le numéro de l\'étape est dans le petit rond en haut de la fiche.'
        : 'Vous venez de finir cette étape ? Répondez ici, puis passez à la suivante.');
    e[1].forEach(function (q) { texte(q[0], q[1], true); });
    requis(choix('Cette étape était…', ['Claire', 'Un peu confuse', 'Incompréhensible']));
  });

  // ---- Partie 3 : de mémoire --------------------------------------------
  form.addPageBreakItem()
    .setTitle('Partie 3 sur 4 — De mémoire')
    .setHelpText('Fermez l\'expérience et répondez sans y retourner. Une ou deux phrases suffisent, ' +
      '« je ne sais pas » est une réponse permise.');
  [
    'Avec vos mots, qu\'est-ce que la blockchain ?',
    'Que contient un bloc ?',
    'Qu\'est-ce qui relie deux blocs entre eux ?',
    'Que se passe-t-il si quelqu\'un modifie un ancien bloc ?',
    'Pourquoi les données sont-elles copiées chez plusieurs participants ?',
    'Qu\'est-ce que « miner » un bloc ?',
    'Citez deux manières de se mettre d\'accord sur la chaîne à garder.',
    'Qu\'est-ce qu\'une double dépense et comment la blockchain l\'empêche-t-elle ?'
  ].forEach(function (q) { texte(q, null, true); });

  // ---- Partie 4 : avis ---------------------------------------------------
  form.addPageBreakItem()
    .setTitle('Partie 4 sur 4 — Votre avis')
    .setHelpText('Dites ce que vous avez fait, ce que vous en pensez, et ce qu\'on doit changer.');

  var faits = form.addCheckboxItem()
    .setTitle('Qu\'avez-vous fait pendant le parcours ? Cochez tout ce qui est vrai.')
    .setHelpText('Cochez même si vous avez eu besoin d\'un indice : précisez-le dans la dernière question.')
    .setChoiceValues([
      'J\'ai allumé la lampe du coffre (étape 2)',
      'J\'ai comparé les sceaux (étape 3)',
      'J\'ai falsifié le bloc 1 (étape 4)',
      'J\'ai éteint une île (étape 5)',
      'J\'ai envoyé le bloc falsifié aux autres îles (étape 5)',
      'J\'ai lancé le minage, ou essayé 000 (étape 6)',
      'J\'ai essayé la course ET le tirage au sort (étape 7)',
      'J\'ai rejoué la course de la double dépense, ou essayé 60 % (étape 8)',
      'J\'ai ouvert au moins une fois « En vrai… »',
      'J\'ai ouvert au moins une fois « Les mots de cette étape »',
      'J\'ai tourné autour de la scène avec la souris ou le doigt'
    ]);
  faits.setRequired(false);
  requis(choix('Avez-vous eu besoin d\'un indice de la personne qui vous accompagne ?',
    ['Non, jamais', 'Une ou deux fois', 'Souvent']));

  var grille = form.addGridItem()
    .setTitle('Votre avis sur l\'expérience')
    .setHelpText('1 = pas du tout d\'accord, 5 = tout à fait d\'accord.');
  grille.setRows([
    'J\'ai compris où cliquer sans aide',
    'Les textes sont faciles à lire',
    'Les animations m\'ont aidé à comprendre',
    'Le rythme est bon (ni trop long ni trop rapide)',
    'Je me suis repéré avec la barre de progression',
    'L\'univers en papier m\'a plu',
    'Je pourrais expliquer la blockchain à quelqu\'un',
    'J\'ai eu envie d\'aller jusqu\'au bout',
    'La liste « Les mots de cette étape » m\'a aidé'
  ]).setColumns(['1', '2', '3', '4', '5']).setRequired(true);

  requis(form.addListItem().setTitle('Quelle étape vous a le plus perdu ?').setChoiceValues(ETAPES.concat(['Aucune'])));
  requis(texte('Qu\'est-ce qui vous a perdu ?', 'Un mot, une phrase, une image, un bouton. Écrivez « rien » si aucune étape ne vous a perdu.'));
  requis(form.addListItem().setTitle('Quelle étape vous a le mieux fait comprendre ?').setChoiceValues(ETAPES));
  requis(texte('Qu\'est-ce qui a aidé ?', 'Une animation, un exemple, une phrase.'));
  requis(texte('Y a-t-il un mot ou une phrase que vous n\'avez pas compris ?', 'Recopiez-le. Écrivez « aucun » sinon.'));
  requis(texte('Qu\'est-ce qui manque pour mieux comprendre ?', 'Écrivez « rien » sinon.'));
  requis(texte('Qu\'est-ce qui est en trop, ou trop long ?', 'Écrivez « rien » sinon.'));
  requis(choix('Le bouton « En vrai… » (explication technique) vous a-t-il…', ['Aidé', 'Gêné', 'Je ne l\'ai pas utilisé']));
  requis(choix('La liste « Les mots de cette étape » vous a-t-elle…', ['Aidé', 'Gêné', 'Je ne l\'ai pas utilisée']));
  requis(texte('Si vous ne deviez changer qu\'une seule chose, laquelle ?', null));
  requis(texte('Ce que vous retenez, en une phrase', null));

  // ---- Tableur de réponses ----------------------------------------------
  var tableur = SpreadsheetApp.create('Réponses — Test utilisateur session 2, Blockchain 3D');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, tableur.getId());

  Logger.log('Modifier le formulaire : ' + form.getEditUrl());
  Logger.log('Lien à envoyer aux testeurs : ' + form.getPublishedUrl());
  Logger.log('Tableur des réponses : ' + tableur.getUrl());
}
