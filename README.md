# Blockchain 3D — R507

Expérience web interactive en 3D (Three.js) pour faire comprendre une blockchain à un public non initié.
Projet du module R507, BUT MMI 3e année.

- **Démo en ligne** : https://dyzlek.github.io/r507-blockchain-3d/
- **Board GitHub Projects** : https://github.com/users/dyzlek/projects/3

## Équipe

| Membre | GitHub | Rôle |
|:---|:---|:---|
| Maxens | [@MaxX-J](https://github.com/MaxX-J) | Design, UX et contenu pédagogique · documentation et tests utilisateurs |
| Dylan | [@dyzlek](https://github.com/dyzlek) | Développement 3D et intégration Three.js · board GitHub Projects et déploiement |

## Le parcours

Une maquette en papier découpé posée sur un bureau : des coffres en carton pour les blocs, des tampons encreurs pour les empreintes, des îles et des avions en papier pour le réseau. Le fil rouge suit une transaction, « Dylan envoie 5 jetons à Maxens », de sa création jusqu'à une tentative de double dépense. Chaque étape a un encart « En vrai… » qui donne le terme technique exact et la limite de l'image.

| Étape | Notion | Titre à l'écran |
|:-:|:---|:---|
| 1 | Introduction | Une chaîne de coffres en carton |
| 2 | 1. Structure d'un bloc | Le coffre |
| 3 | 2. Chaînage cryptographique | Chaque coffre garde le sceau du précédent |
| 4 | 3. Immutabilité et détection de falsification | Trafiquer un coffre, ça se voit |
| 5 | 4. Réseau et décentralisation | L'archipel |
| 6 | 5. Validation et minage | La course au sceau |
| 7 | 6. Consensus (preuve de travail et preuve d'enjeu) | Qui scelle le bloc ? |
| 8 | 7. Cycle de vie d'une transaction et attaque | La double dépense |

Les empreintes sont de vrais SHA-256 calculés dans le navigateur.

## Utiliser l'expérience

- **Changer d'étape** : boutons « Précédent / Suivant », pastilles numérotées, ou flèches ← → du clavier.
- **Ouvrir une étape directement** : `?etape=N` (de 1 à 8), par exemple `https://dyzlek.github.io/r507-blockchain-3d/?etape=5`. Pratique pour les tests et la soutenance.
- **Regarder la scène** : glisser pour tourner, molette ou pincement pour zoomer. Sur téléphone, la fiche passe en bas de l'écran.
- **Agir** : cliquer sur le coffre ou sur le bouton du panneau (lampe, falsifier, envoyer, lancer le minage, lancer la course). À l'étape Réseau, les îles s'éteignent au clic ou avec les boutons « Éteindre une île ».

## Accessibilité

Contrastes du texte mesurés à 4,5 ou plus, états toujours doublés par du texte ou un symbole (pas de couleur seule), focus visible, parcours entièrement faisable au clavier, texte de l'étape annoncé aux lecteurs d'écran, animations réduites avec `prefers-reduced-motion`. Les chiffres et les limites (pas encore testé sur un vrai téléphone ni avec un lecteur d'écran) sont dans la section 2.5 de `CHOIX-MODELISATION.md`.

## Lancer le projet en local

Prérequis : Node.js 20 ou plus.

```bash
npm install
npm run dev
```

Puis ouvrir l'URL affichée (par défaut http://localhost:5173/r507-blockchain-3d/).

`npm run build` produit la version statique dans `dist/`, `npm run preview` la sert en local.

## Technologies

[Three.js](https://threejs.org/) (rendu 3D, étiquettes CSS2D, lignes `Line2`), [Vite](https://vite.dev/), JavaScript sans framework. Polices : Alegreya Sans et Courier Prime (Google Fonts). Aucune autre dépendance.

## Déploiement

Chaque push sur `main` déclenche le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), qui construit le site et le publie sur GitHub Pages.

## Structure

```
index.html           page unique (panneau, canvas)
apercu-papier.html   page d'aperçu de la direction papier (maquette de travail)
src/
  main.js            scène, panneau, navigation, caméra
  sequences.js       textes et réglages de chaque étape
  coffre.js          coffre, sceau et tampon encreur
  chain.js           blocs et calcul des SHA-256
  papier.js          calque, ruban, corde simulée
  archipel.js        îles, routes, avions (notion 4)
  minage.js          essais de nonce (notion 5)
  consensus.js       preuve de travail et preuve d'enjeu (notion 6)
  race.js            course entre deux branches (notion 7)
  style.css          charte visuelle
docs/
  CADRAGE.md         document de cadrage
  MMI-R507-projet-blockchain-CHOIX-MODELISATION.md   livrable officiel des choix
  MMI-R507-projet-blockchain-GRILLE-AUTOEVAL.md      auto-évaluation avant soutenance
  STORYBOARD.md      storyboard écrit du parcours complet
  TEST-UTILISATEUR.md   protocole de test utilisateur
  suivi/SEMAINE-01.md … SEMAINE-08.md                fiches hebdomadaires
```

## Tests utilisateurs

Le protocole (consignes, questions par étape, grille d'observation) est dans [`docs/TEST-UTILISATEUR.md`](docs/TEST-UTILISATEUR.md). Les retours sont reportés dans les sections « Tests utilisateurs » de chaque notion de `CHOIX-MODELISATION.md`. Au 27/10/2026, aucune session n'a encore eu lieu (issues #17 et #18).

## Notions couvertes

1. Structure d'un bloc
2. Chaînage cryptographique
3. Immutabilité et détection de falsification
4. Réseau et décentralisation
5. Validation et minage
6. Comparaison d'au moins deux mécanismes de consensus
7. Cycle de vie d'une transaction et scénario d'attaque illustré

## Usage de l'IA générative

L'IA générative (Claude) est utilisée comme assistant. Tout code ou texte généré est relu, testé et compris par le groupe. Les usages sont signalés dans les issues et commits concernés, et détaillés dans la section 6 de `CHOIX-MODELISATION.md`.

| Date | Usage | Vérification |
|:---|:---|:---|
| 01/10/2026 | Mise en place du dépôt (Vite, workflow Pages, structure docs, issues initiales) | Relu par le groupe, build et déploiement testés |
| 09/10/2026 | Création du board GitHub Projects, assignation des issues, première rédaction du cadrage (public, métaphore, fil rouge) et de la fiche semaine 1 | Relu et validé par le groupe |
| 12/10/2026 | Squelette du parcours par séquences, caméra guidée, coffre de verre de la notion 1 (#15, #7) ; brouillon des §3 et §4.1 de CHOIX-MODELISATION | Testé sur ordinateur et téléphone ; relu par Maxens |
| 13/10/2026 | Notion 4 : archipel, propagation de la transaction, îles éteignables (#10) ; fiches §4.2, §4.3 et §4.4 de CHOIX-MODELISATION (4.2 et 4.3 rédigées à partir du code) ; navigation sur deux lignes (#15) | Vérifié sur ordinateur et téléphone, relu par Maxens ; 4.2 et 4.3 à confirmer par Dylan, tests utilisateurs à faire |
| 13/10/2026 | Notion 5 : coffre n°4 à miner, essais de nonce en direct, choix de difficulté `00` / `000` (#11) ; fiche §4.5 de CHOIX-MODELISATION | Testé sur ordinateur et téléphone (navigateur automatisé) ; à relire par Maxens et Dylan, tests utilisateurs à faire |
| 13/10/2026 | Notions 6 et 7 : consensus PoW / PoS sur l'archipel (#12), cycle de vie et double dépense avec course entre deux branches (#13) ; fiches §4.6 et §4.7 de CHOIX-MODELISATION | Testé sur ordinateur et téléphone ; à relire par Maxens et Dylan, tests utilisateurs à faire |
| 13/10/2026 | Branche `styleV2` : nouvelle direction artistique « maquette en papier découpé » sur tout le parcours (coffres en carton à fenêtre de calque, tampons encreurs, ruban adhésif, îles et avions en papier, interface en fiche cartonnée) ; §2.5 de CHOIX-MODELISATION réécrit (#16) | Testé sur ordinateur dans le navigateur ; à valider par Dylan, tests utilisateurs et mesure des FPS à refaire |
| 19/10/2026 | Fiches de suivi semaines 2 et 3 pré-remplies depuis `git log`, les issues et le board ; citations de CHOIX-MODELISATION réalignées sur les textes affichés (#20) | Chiffres et citations vérifiés dans le code ; fiches à relire et compléter par le groupe |
| 19/10/2026 | Direction de l'aperçu papier étendue à tout le parcours : tampon encreur qui s'imprime au minage et à la falsification, décors pop-up des îles (phare, arbres, cabane), bureau toujours clair (#16) | Testé dans le navigateur, étapes 0 à 7 sans erreur ; à revoir par Maxens |
| 24/10/2026 | Bilan du projet (fait, manquant, rapide) ; fiche de suivi semaine 3 complétée depuis `git log`, les issues et le board (#16 #20) | Chiffres vérifiés dans le dépôt et sur le board ; fiche relue par le groupe |
| 27/10/2026 | Audit d'accessibilité de la charte (#16) : contrastes mesurés et corrigés, `aria-current`, clavier, boutons « Éteindre une île », `aria-live` ; protocole de test utilisateur, script du formulaire, sections « Tests utilisateurs » de CHOIX, storyboard écrit, README et fiches 3 et 4 | Contrastes recalculés, build OK, parcours testé dans le navigateur (ordinateur et téléphone simulé à 375 px) ; pas de test avec un vrai lecteur d'écran ; protocole et formulaire à essayer à blanc par le groupe |
