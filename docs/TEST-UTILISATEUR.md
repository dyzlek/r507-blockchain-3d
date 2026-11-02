# Protocole de test utilisateur — R507 Blockchain 3D

Issue #17 (session 1) et #18 (session 2). À reporter ensuite dans les sections « f) Tests utilisateurs » de `MMI-R507-projet-blockchain-CHOIX-MODELISATION.md`.

## Liens

| Élément | Lien |
|:---|:---|
| Formulaire à envoyer aux testeurs | https://docs.google.com/forms/d/e/1FAIpQLSc5wDWqOnQ9Ya842eHVyp4aaJ88YnI1_qXA2nAswCi3u8raRQ/viewform |
| Modifier le formulaire | https://docs.google.com/forms/d/1RvyRuD78slNRSBKUptsF5aRRKAFSRK3UV2qla3SgOec/edit |
| Tableur des réponses | https://docs.google.com/spreadsheets/d/1M_KMPWr0hmK32URmU0iUn79o_bYktEq1eowm_BUGtr4/edit |

**Objectif :** vérifier qu'une personne qui ne connaît pas la blockchain comprend les 7 notions en parcourant l'expérience seule, sans explication orale.

**Durée :** 15 à 20 minutes par testeur. **Testeurs :** 2 personnes extérieures au groupe, idéalement non initiées à la blockchain (session 1), puis 2 autres ou les mêmes après corrections (session 2).

## Consignes pour l'animateur

- Ne rien expliquer pendant le parcours. Si le testeur est bloqué plus de 30 secondes, noter le blocage, puis donner un indice minimal.
- Demander de **penser à voix haute** (« dites ce que vous regardez, ce que vous attendez, ce qui vous surprend »).
- Noter les hésitations, les clics à côté, les étapes passées trop vite, les expressions du visage.
- Ne pas juger ses réponses : un mauvais résultat est une information sur l'expérience, pas sur la personne.
- Ne pas nommer les notions à l'avance (« hash », « minage », etc.).

Texte à lire au testeur :
> « On teste une expérience web qui explique un concept. Vous n'avez rien à réviser, c'est elle qu'on teste, pas vous. Parcourez-la à votre rythme et dites tout haut ce que vous pensez. Je ne répondrai pas aux questions pendant le parcours, je les noterai. »

## A. Fiche testeur (avant le parcours)

| Question | Réponse |
|:---|:---|
| Prénom ou code (T1, T2…) | |
| Âge / tranche | |
| Formation ou métier | |
| Appareil utilisé (ordinateur, téléphone, tablette) | |
| Navigateur | |
| Connaissez-vous la blockchain ? (pas du tout / j'en ai entendu parler / je sais l'expliquer) | |
| Avez-vous déjà utilisé des cryptomonnaies ? | |
| Aisance avec les outils numériques (1 à 5) | |

**Question de départ, avant de lancer :** « Avec vos mots, qu'est-ce que la blockchain, selon vous ? » (à comparer avec la même question à la fin)

## B. Questions pendant le parcours (par étape)

Poser chaque question **à la fin de l'étape**, avant de passer à la suivante. Noter la réponse mot pour mot.

### Étape 0 — Introduction (« Une chaîne de coffres en carton »)
1. Que pensez-vous voir à l'écran ? À quoi sert ce que vous voyez, selon vous ?
2. Savez-vous quoi faire pour continuer ? (repérer le bouton ou le geste sans aide)
3. La métaphore du coffre en carton vous parle-t-elle ?

### Étape 1 — Notion 1 : Structure d'un bloc (« Le coffre »)
1. Qu'y a-t-il dans un coffre ? Citez les éléments que vous reconnaissez.
2. À quoi sert le sceau, d'après vous ?
3. Que veut dire « sceau = code unique, comme une empreinte digitale » pour vous ? Reformulez.
4. Avez-vous trouvé comment lire un coffre sans l'ouvrir ? Qu'avez-vous cliqué ?

### Étape 2 — Notion 2 : Chaînage cryptographique (« Chaque coffre garde le sceau du précédent »)
1. Pourquoi les coffres sont-ils reliés par une corde ?
2. Que contient chaque coffre qui vient du coffre d'avant ?
3. Si on change quelque chose dans le premier coffre, que se passe-t-il à votre avis pour les suivants ?

### Étape 3 — Notion 3 : Immutabilité (« Trafiquer un coffre, ça se voit »)
1. Qu'avez-vous fait, et qu'avez-vous observé ? (après le bouton « Falsifier »)
2. Pourquoi la corde est-elle coupée ?
3. Comment se rend-on compte qu'un coffre a été trafiqué ?
4. Pourrait-on tricher sans que ça se voie ? Pourquoi ?

### Étape 4 — Notion 4 : Réseau et décentralisation (« L'archipel »)
1. Que représentent les îles ? Que représentent les avions en papier ?
2. Pourquoi y a-t-il plusieurs copies de la chaîne et non une seule ?
3. Que se passe-t-il si une île tombe en panne ou triche ?
4. Qui contrôle l'archipel, d'après vous ?

### Étape 5 — Notion 5 : Validation et minage (« La course au sceau »)
1. Que font les îles dans la course ? Quel est l'objectif ?
2. À quoi sert le nombre qui change en continu (le nonce) ?
3. Pourquoi la course est-elle difficile alors que vérifier le résultat est facile ?
4. Qui gagne et qu'est-ce que cela change ?

### Étape 6 — Notion 6 : Consensus (« Qui scelle le bloc ? »)
1. Quelles sont les deux façons de choisir qui scelle le bloc ? Décrivez-les avec vos mots.
2. Laquelle vous paraît la plus juste ? La plus économe ? Pourquoi ?
3. Quel est le point commun entre les deux ?

### Étape 7 — Notion 7 : Cycle de vie d'une transaction et attaque (« La double dépense »)
1. Décrivez le trajet de la transaction, de l'envoi jusqu'à son inscription définitive.
2. Que cherche à faire l'attaquant ?
3. Pourquoi la branche la plus longue gagne-t-elle ?
4. Pourquoi une attaque est-elle très difficile en pratique ?

## C. Questions de compréhension globale (après le parcours)

À poser sans montrer l'écran. Noter 0 (faux), 1 (partiel) ou 2 (juste).

| # | Question | Notion | Note 0-2 | Réponse |
|:-:|:---|:---|:-:|:---|
| 1 | Avec vos mots, qu'est-ce que la blockchain ? (comparer avec la question de départ) | Globale | | |
| 2 | Que contient un bloc ? | 1 | | |
| 3 | Qu'est-ce qui relie deux blocs entre eux ? | 2 | | |
| 4 | Que se passe-t-il si quelqu'un modifie un ancien bloc ? | 3 | | |
| 5 | Pourquoi les données sont-elles copiées chez plusieurs participants ? | 4 | | |
| 6 | Qu'est-ce que « miner » un bloc ? | 5 | | |
| 7 | Citez deux manières de se mettre d'accord sur la chaîne à garder. | 6 | | |
| 8 | Qu'est-ce qu'une double dépense et comment la blockchain l'empêche-t-elle ? | 7 | | |

## D. Questionnaire de ressenti

Échelle de 1 (pas du tout d'accord) à 5 (tout à fait d'accord).

| Affirmation | 1 | 2 | 3 | 4 | 5 |
|:---|:-:|:-:|:-:|:-:|:-:|
| J'ai compris où cliquer sans aide | | | | | |
| Les textes sont faciles à lire | | | | | |
| Les animations m'ont aidé à comprendre | | | | | |
| Le rythme est bon (ni trop long ni trop rapide) | | | | | |
| Je me suis repéré dans l'étape où j'étais (barre de progression) | | | | | |
| L'univers en papier m'a plu | | | | | |
| Je pourrais expliquer la blockchain à quelqu'un maintenant | | | | | |
| J'ai eu envie d'aller jusqu'au bout | | | | | |

## E. Questions ouvertes (fin d'entretien)

1. Quel est le moment où vous avez été le plus perdu ?
2. Quel est le moment où vous avez le mieux compris ?
3. Y a-t-il un mot ou une phrase que vous n'avez pas compris ?
4. Qu'est-ce qui manque pour mieux comprendre ?
5. Qu'est-ce qui est en trop ou ennuyeux ?
6. Qu'est-ce que vous retenez, en une phrase ?
7. Le bouton « En vrai… » (explication technique) vous a-t-il aidé ou gêné ?
8. Si vous deviez changer une seule chose, laquelle ?

## F. Observations de l'animateur

| Élément | Notes |
|:---|:---|
| Durée totale | |
| Étapes où le testeur a hésité plus de 30 s | |
| Clics à côté ou gestes inattendus | |
| Étapes passées sans lire le texte | |
| Problèmes techniques (lenteur, bug, affichage) | |
| FPS ressentis (fluide / saccadé) | |
| Citations marquantes | |

## G. Synthèse à reporter dans CHOIX (par testeur)

| Observation | Modification | Issue |
|:---|:---|:---|
| (ex. T1 n'a pas vu le bouton « Falsifier » à l'étape 3) | (ex. bouton plus visible, texte d'invite) | #17 |

Critère de réussite proposé : au moins 6 questions de la partie C sur 8 notées 2 par testeur, et aucun blocage de plus d'une minute sur un même écran. Tout ce qui n'est pas atteint devient une issue corrective.
