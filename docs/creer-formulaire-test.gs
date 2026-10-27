/**
 * Crée le Google Form du test utilisateur (voir TEST-UTILISATEUR.md).
 *
 * Utilisation :
 *   1. Ouvrir https://script.google.com puis « Nouveau projet ».
 *   2. Coller ce fichier à la place du contenu, enregistrer.
 *   3. Lancer la fonction creerFormulaire (autoriser l'accès à Google Forms).
 *   4. Les liens (modification et réponse) s'affichent dans Affichage > Journaux.
 */
function creerFormulaire() {
  var form = FormApp.create('Test utilisateur — Blockchain 3D (R507)');
  form.setDescription(
    'Merci de tester notre expérience web qui explique la blockchain. ' +
    'C\'est l\'expérience qu\'on teste, pas vous : il n\'y a pas de bonne ou mauvaise réponse. ' +
    'Durée : environ 15 minutes. Les réponses restent dans le cadre du projet de cours.'
  );
  form.setCollectEmail(false);
  form.setProgressBar(true);
  form.setConfirmationMessage('Merci pour votre aide !');

  var oui = function (q) { return q.setRequired(true); };

  // ---- Avant le parcours -------------------------------------------------
  form.addSectionHeaderItem().setTitle('Avant le parcours');
  oui(form.addTextItem().setTitle('Prénom ou code testeur (T1, T2…)'));
  form.addMultipleChoiceItem().setTitle('Tranche d\'âge')
    .setChoiceValues(['Moins de 18 ans', '18-25 ans', '26-40 ans', '41-60 ans', 'Plus de 60 ans']);
  form.addTextItem().setTitle('Formation ou métier');
  oui(form.addMultipleChoiceItem().setTitle('Appareil utilisé')
    .setChoiceValues(['Ordinateur', 'Téléphone', 'Tablette']));
  form.addTextItem().setTitle('Navigateur (Chrome, Firefox, Safari…)');
  oui(form.addMultipleChoiceItem().setTitle('Connaissez-vous la blockchain ?')
    .setChoiceValues(['Pas du tout', 'J\'en ai entendu parler', 'Je sais l\'expliquer']));
  form.addMultipleChoiceItem().setTitle('Avez-vous déjà utilisé des cryptomonnaies ?')
    .setChoiceValues(['Oui', 'Non']);
  form.addScaleItem().setTitle('Aisance avec les outils numériques')
    .setBounds(1, 5).setLabels('Peu à l\'aise', 'Très à l\'aise');
  oui(form.addParagraphTextItem()
    .setTitle('Avec vos mots, qu\'est-ce que la blockchain, selon vous ?')
    .setHelpText('Répondez avant de lancer l\'expérience. Si vous ne savez pas, écrivez « je ne sais pas ».'));

  // ---- Pendant le parcours ----------------------------------------------
  var etapes = [
    ['Étape 0 — Introduction', [
      'À quoi sert ce que vous voyez, selon vous ?',
      'Saviez-vous quoi faire pour continuer sans aide ?']],
    ['Étape 1 — Le coffre', [
      'Qu\'y a-t-il dans un coffre ?',
      'À quoi sert le sceau, d\'après vous ?']],
    ['Étape 2 — Chaque coffre garde le sceau du précédent', [
      'Pourquoi les coffres sont-ils reliés par une corde ?',
      'Si on change le premier coffre, que se passe-t-il pour les suivants ?']],
    ['Étape 3 — Trafiquer un coffre, ça se voit', [
      'Qu\'avez-vous observé après avoir falsifié un coffre ?',
      'Pourrait-on tricher sans que ça se voie ? Pourquoi ?']],
    ['Étape 4 — L\'archipel', [
      'Que représentent les îles et les avions en papier ?',
      'Pourquoi y a-t-il plusieurs copies de la chaîne ?']],
    ['Étape 5 — La course au sceau', [
      'Que font les îles dans la course ? Quel est l\'objectif ?',
      'Pourquoi la course est-elle difficile alors que vérifier est facile ?']],
    ['Étape 6 — Qui scelle le bloc ?', [
      'Décrivez avec vos mots les deux façons de choisir qui scelle le bloc.',
      'Laquelle vous paraît la plus juste ? La plus économe ?']],
    ['Étape 7 — La double dépense', [
      'Que cherche à faire l\'attaquant ?',
      'Pourquoi la branche la plus longue gagne-t-elle ?']]
  ];
  etapes.forEach(function (e) {
    form.addPageBreakItem().setTitle(e[0])
      .setHelpText('Répondez à la fin de cette étape, avant de passer à la suivante.');
    e[1].forEach(function (q) { form.addParagraphTextItem().setTitle(q); });
    form.addMultipleChoiceItem().setTitle('Cette étape était…')
      .setChoiceValues(['Claire', 'Un peu confuse', 'Incompréhensible']);
  });

  // ---- Après le parcours -------------------------------------------------
  form.addPageBreakItem().setTitle('Après le parcours')
    .setHelpText('Répondez de mémoire, sans retourner voir l\'expérience.');
  [
    'Avec vos mots, qu\'est-ce que la blockchain ?',
    'Que contient un bloc ?',
    'Qu\'est-ce qui relie deux blocs entre eux ?',
    'Que se passe-t-il si quelqu\'un modifie un ancien bloc ?',
    'Pourquoi les données sont-elles copiées chez plusieurs participants ?',
    'Qu\'est-ce que « miner » un bloc ?',
    'Citez deux manières de se mettre d\'accord sur la chaîne à garder.',
    'Qu\'est-ce qu\'une double dépense et comment la blockchain l\'empêche-t-elle ?'
  ].forEach(function (q) { form.addParagraphTextItem().setTitle(q); });

  // ---- Ressenti ----------------------------------------------------------
  form.addPageBreakItem().setTitle('Votre ressenti')
    .setHelpText('1 = pas du tout d\'accord, 5 = tout à fait d\'accord.');
  var grille = form.addGridItem().setTitle('Votre avis sur l\'expérience');
  grille.setRows([
    'J\'ai compris où cliquer sans aide',
    'Les textes sont faciles à lire',
    'Les animations m\'ont aidé à comprendre',
    'Le rythme est bon (ni trop long ni trop rapide)',
    'Je me suis repéré avec la barre de progression',
    'L\'univers en papier m\'a plu',
    'Je pourrais expliquer la blockchain à quelqu\'un',
    'J\'ai eu envie d\'aller jusqu\'au bout'
  ]).setColumns(['1', '2', '3', '4', '5']).setRequired(true);

  form.addParagraphTextItem().setTitle('Quel est le moment où vous avez été le plus perdu ?');
  form.addParagraphTextItem().setTitle('Quel est le moment où vous avez le mieux compris ?');
  form.addParagraphTextItem().setTitle('Y a-t-il un mot ou une phrase que vous n\'avez pas compris ?');
  form.addParagraphTextItem().setTitle('Qu\'est-ce qui manque pour mieux comprendre ? Qu\'est-ce qui est en trop ?');
  form.addMultipleChoiceItem().setTitle('Le bouton « En vrai… » (explication technique) vous a-t-il…')
    .setChoiceValues(['Aidé', 'Gêné', 'Je ne l\'ai pas utilisé']);
  form.addParagraphTextItem().setTitle('Si vous deviez changer une seule chose, laquelle ?');
  form.addParagraphTextItem().setTitle('Ce que vous retenez, en une phrase');

  // ---- Tableur de réponses ----------------------------------------------
  var tableur = SpreadsheetApp.create('Réponses — Test utilisateur Blockchain 3D');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, tableur.getId());

  Logger.log('Modifier le formulaire : ' + form.getEditUrl());
  Logger.log('Lien à envoyer aux testeurs : ' + form.getPublishedUrl());
  Logger.log('Tableur des réponses : ' + tableur.getUrl());
}
