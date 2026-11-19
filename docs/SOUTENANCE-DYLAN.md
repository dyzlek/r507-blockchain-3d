# Mon texte pour la soutenance (Dylan)

Texte à dire à l'oral, écrit comme si je parlais. Les actions à faire à l'écran sont entre crochets. Les temps suivent le plan de [`SOUTENANCE.md`](SOUTENANCE.md) et du diaporama. Le même texte est dans le diaporama : touche **N** (sur la diapo) ou bouton **Notes ↗** (fenêtre à part).

Pas besoin de tout apprendre par cœur : l'important est de connaître l'idée de chaque partie et de dire les chiffres justes. Environ 130 mots par minute, donc le texte tient dans les créneaux.

**Mes parties** : diapo 5 (falsification), 6 (archipel), 9 (double dépense), 12 (gestion de projet), 13 (performance), 14 (IA), 15 (bilan, ma moitié), 16 (fin).

**Les chiffres à connaître** : 60 caractères du sceau sur 64 changent quand on change une lettre ; à 30 % de la puissance le tricheur gagne rarement, à 60 % presque toujours ; Bitcoin attend 6 confirmations ; critère de 30 images/s, moyenne au-dessus de 40 à froid dans Chrome, Edge et Firefox ; première mesure « plus de 60 » fausse, refaite.

## Diapo 5 · 4:00 – 5:30 · Falsifier un bloc

> Merci Maxens. Moi, je vais vous montrer ce qui se passe quand quelqu'un essaie de tricher.

**[Cliquer sur « Falsifier le bloc 1 »]**

> Là, je prends le bloc 1 et je change la somme. Au lieu de 2 jetons, j'en mets 200. Regardez le sceau : il a complètement changé. Et la corde entre les deux coffres vient de se casser et de passer au rouge.

> Pourquoi ? Parce que le coffre d'après avait gardé une copie de l'ancien sceau, et maintenant elle ne colle plus.

> Ce n'est pas un hasard. On l'a mesuré : quand on change une seule lettre, environ 60 caractères du sceau sur 64 changent. Donc la triche se voit tout de suite. Pour la cacher, il faudrait refaire tous les blocs d'après, un par un. C'est ça qui rend la chaîne très difficile à truquer.

## Diapo 6 · 5:30 – 7:30 · L'archipel, pourquoi il n'y a pas de chef

> Mais une question : qui vérifie tout ça ? C'est là qu'arrive le réseau.

**[Aller à l'étape 5, la caméra traverse les nuages]**

> On recule, et on découvre que la chaîne était posée sur une île, la mienne. Il y en a d'autres. Chaque île est un participant, avec sa propre copie de toute la chaîne. Personne n'est le chef.

**[Cliquer sur « Envoyer la transaction de Dylan »]**

> Quand j'envoie une transaction, elle voyage d'île en île, dans un avion en papier, et chaque île la vérifie de son côté.

**[Éteindre une île]**

> Si j'éteins une île, regardez : le réseau continue sans elle. Personne n'est gêné.

**[Choisir « Bloc 1 falsifié » puis l'envoyer]**

> Et maintenant, j'envoie mon bloc 1 truqué, dans l'avion rouge. Chaque île compare avec sa propre copie… et elle le refuse.

> Donc pour tricher, il faudrait convaincre la majorité des îles en même temps, pas une seule. Voilà pourquoi il n'y a pas besoin de chef.

## Diapo 9 · 10:30 – 12:30 · La double dépense

> Dernière notion, et la plus intéressante : la double dépense.

**[Aller à l'étape 8]**

> Imaginez que je paie quelqu'un avec mes jetons, puis que je les dépense une deuxième fois ailleurs. Dans la démo, la transaction suit tout son cycle : elle est créée, envoyée aux îles, minée, puis confirmée un peu plus à chaque nouveau bloc.

> Là, je triche. Je dépense mes jetons une deuxième fois et je mine en cachette une autre branche. C'est la chaîne la plus longue qui gagne.

**[Lancer la course à 30 %, deux ou trois fois]**

> Avec 30 % de la puissance du réseau, j'y arrive rarement. Parfois je gagne, par chance, sur une course courte. C'est pour ça qu'on attend plusieurs confirmations, six pour Bitcoin.

**[Lancer la course à 60 %]**

> Maintenant à 60 %, regardez : je gagne presque à chaque fois.

> Donc au-dessus de 50 % de la puissance, le tricheur gagne presque toujours. C'est la vraie faiblesse du système, et on préfère le dire clairement.

## Diapo 12 · 15:00 – 16:00 · Gestion de projet

> Maintenant, comment on s'est organisés. On a tout géré sur GitHub Projects.

**[Montrer le board]**

> Voilà les colonnes : à faire, en cours, à vérifier, terminé. On a trois jalons : le cadrage, la livraison, et la soutenance.

> À chaque fois qu'un testeur nous a fait un retour, on a créé une issue, puis une pull request, et on ne la fermait qu'avec la preuve. Il y a aussi huit fiches de suivi, une par semaine, dans le dépôt.

> Et pour être transparents : les commits ne montrent pas tout le travail de Maxens. Il a fait les tests, les formulaires et les relectures. C'est expliqué dans le README.

## Diapo 13 · 16:00 – 16:45 · Performance

> Côté technique, on voulait que ça tourne sur un PC de TP, donc au moins 30 images par seconde.

> On l'a mesuré avec notre propre script, qui pilote le navigateur sur les 9 étapes. On l'a fait sur un PC peu puissant pour la 3D : le portable avec sa carte graphique intégrée seulement, et même avec le processeur ralenti. Résultat : la moyenne reste au-dessus de 40 images par seconde, dans Chrome, Edge et Firefox. Quand le portable chauffe, ça peut descendre un peu, et on l'a écrit.

> Petite honnêteté : notre première mesure disait plus de 60, elle était fausse, on l'a refaite. Et on n'a pas pu tester sur un vrai poste de TP.

**[Appuyer sur R et P en même temps]**

> Si vous voulez, voilà le compteur en direct.

## Diapo 14 · 16:45 – 17:30 · Usage de l'IA

> Et il faut être clairs sur l'IA : oui, on l'a utilisée, et on le déclare dans le README.

> Claude a écrit une grande partie du code Three.js, à partir de nos consignes, et les premières versions de certains documents.

> Ce qu'on a gardé pour nous : le public visé, la métaphore, l'ordre des notions, et surtout vérifier chaque rendu à l'écran et noter les tests.

> Et on a repéré des erreurs de l'IA. Par exemple, le bloc 4 était marqué « scellé » avant même d'être miné. Ou la première course n'avait aucun hasard, donc la démo disait quelque chose de faux. On les a corrigées. On a aussi refusé certaines de ses idées, comme un thème sombre ou le style neumorphisme.

## Diapo 15 · 17:30 – 18:30 · Bilan (ma part)

**[Maxens parle d'abord de ce qui marche et de ce qui reste fragile. Moi je prends la suite.]**

> Si c'était à refaire, on testerait beaucoup plus tôt. La première session de tests est arrivée quand tout était déjà codé, et on n'a pas pu tout corriger. Avec une semaine de plus, on brancherait le vrai minage dans la course du consensus.

> Moi, ce que j'ai appris, c'est à mesurer au lieu de supposer : ma première mesure d'images par seconde était fausse, et je l'ai refaite pour avoir des vrais chiffres.

## Diapo 16 · 18:30 – 20:00 · Fin et questions

> Merci de votre attention. Le lien de la démo est à l'écran, vous pouvez l'essayer vous-mêmes. On est prêts pour vos questions.

## Si on me pose une question

Chacun doit pouvoir répondre sur les 7 notions. Réponses courtes, à dire avec mes mots.

**Les hash sont-ils réels ?**  
Oui. On utilise le vrai SHA-256 du navigateur, sur l'index, le sceau d'avant, la transaction et le nonce.

**La course de la notion 6 est-elle réelle ?**  
Non, elle est simulée : la gagnante est tirée au sort selon la puissance. Le vrai minage, c'est à la notion 5, et c'est écrit dans l'encart « En vrai ». Avec une semaine de plus, on brancherait le vrai minage.

**Pourquoi seulement 3 blocs dans la course de la notion 7 ?**  
Pour que la démo dure quelques secondes. On précise que dans la vraie vie, Bitcoin en attend 6.

**Qui a fait quoi ?**  
Moi : la 3D, l'intégration, le board et le déploiement. Maxens : le design, le contenu, les tests et les documents. Les commits ne montrent pas tout le travail de Maxens, c'est expliqué dans le README.

**Comment avez-vous mesuré les FPS ?**  
Avec notre script : il pilote le navigateur sur les 9 étapes, déclenche chaque action et compte les images pendant 5 secondes par étape. On peut aussi les voir en direct avec R et P.

**Qu'est-ce qui n'a pas marché aux tests ?**  
Le chaînage : les gens ne comprenaient pas que le sceau est copié dans le coffre suivant. Et un testeur trouvait les étapes 4 à 7 incompréhensibles. On a corrigé le rythme, le lexique et animé la copie du sceau. Un testeur reste à 0 sur 8, on le dit.

**Pourquoi des coffres en carton et pas des cubes ?**  
Parce qu'on voit le contenu par le calque sans ouvrir le coffre, et qu'un sceau ne se recolle pas.
