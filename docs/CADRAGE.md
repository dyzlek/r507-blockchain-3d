# Document de cadrage — Blockchain 3D (R507)

> Version 1.0 — 09/10/2026 (jalon M1 — Cadrage). Le groupe est passé de 3 à 2 membres le 09/10/2026.
>
> Board : https://github.com/users/dyzlek/projects/3

## 1. Équipe

| Membre | GitHub | Rôle principal | Rôle transverse |
|:---|:---|:---|:---|
| Maxens | [@MaxX-J](https://github.com/MaxX-J) | Design, UX et contenu pédagogique (storyboard, charte, textes) | Documentation (`CHOIX-MODELISATION.md`) et tests utilisateurs |
| Dylan | [@dyzlek](https://github.com/dyzlek) | Développement 3D et intégration Three.js | Board GitHub Projects, déploiement, mesures de performance |

Chaque membre doit pouvoir expliquer l'ensemble du projet et les 7 notions en soutenance.

## 2. Objectif

Faire comprendre le fonctionnement d'une blockchain à un utilisateur non initié, grâce à une expérience web 3D interactive (Three.js). Il ne s'agit pas de coder une vraie blockchain.

## 3. Public cible

**Lycéens et étudiants hors informatique (16–25 ans)**, qui ont entendu parler de Bitcoin ou des cryptomonnaies sans savoir comment ça marche.

- Ils utilisent un navigateur au quotidien, souris ou pavé tactile, sans connaissance technique.
- Ils n'ont pas suivi le cours R507 et ne reçoivent aucune explication orale avant de commencer.
- À la fin, ils doivent pouvoir expliquer avec leurs mots : pourquoi on ne peut pas modifier un bloc en douce, pourquoi il n'y a pas de chef, et comment une transaction finit « gravée » dans la chaîne.

Durée visée du parcours : 10 à 15 minutes.

## 4. Fil rouge narratif

**Fil rouge : suivre une transaction, « Alice envoie 5 jetons à Bob », de sa création jusqu'à sa confirmation, puis voir un tricheur tenter de la défaire.**

**Métaphore principale : un registre de coffres de verre scellés, recopié dans un archipel.** Chaque bloc est un coffre transparent (on voit ses données) fermé par un sceau coloré : son empreinte. Le sceau du bloc précédent est gravé sur le suivant, ce qui forme la chaîne. Chaque île de l'archipel est un nœud qui garde sa propre copie de la chaîne. Il n'y a pas d'île centrale.

| Étape du parcours | Notion | Ce que fait l'utilisateur |
|:---|:---|:---|
| 1. Le coffre | 1 — Structure d'un bloc | Ouvre un bloc et en découvre le contenu : données, empreinte, empreinte du parent, nonce |
| 2. Les sceaux | 2 — Chaînage | Modifie une lettre : le sceau change complètement de couleur et de motif |
| 3. Le tricheur maladroit | 3 — Immutabilité | Modifie un ancien bloc : les liens suivants deviennent rouges, les autres îles le signalent |
| 4. L'archipel | 4 — Réseau | La transaction d'Alice part en messages lumineux d'île en île |
| 5. La course au sceau | 5 — Minage | Lance la recherche du nonce et voit les essais défiler jusqu'à un sceau valide |
| 6. Qui scelle ? | 6 — Consensus | Compare la course PoW (puissance de calcul) et le tirage PoS (mise en jeu) |
| 7. La double dépense | 7 — Cycle de vie et attaque | Suit les confirmations, puis voit une tentative de double dépense rejetée par la majorité |

Trois métaphores ont été comparées (registre de coffres en archipel, livre de comptes partagé, tour de briques) ; le détail et les limites sont argumentés dans [`MMI-R507-projet-blockchain-CHOIX-MODELISATION.md`](MMI-R507-projet-blockchain-CHOIX-MODELISATION.md) §2.

## 5. Les 7 notions obligatoires

1. Structure d'un bloc
2. Chaînage cryptographique
3. Immutabilité et détection de falsification
4. Réseau et décentralisation
5. Validation et minage
6. Comparaison d'au moins deux mécanismes de consensus
7. Cycle de vie d'une transaction et scénario d'attaque illustré

## 6. Choix techniques

| Élément | Choix | Raison |
|:---|:---|:---|
| Moteur 3D | Three.js | Imposé par le sujet |
| Outil de build | Vite | Démarrage rapide, rechargement à chaud, build statique |
| Hébergement | GitHub Pages via GitHub Actions | Déploiement automatique à chaque push sur `main` |
| Gestion de projet | GitHub Projects | Imposé : colonnes Backlog, À faire, En cours, À vérifier, Terminé |

## 7. Organisation

- **Branches** : `main` est déployée ; une branche par issue (`12-structure-bloc`), fusion par pull request relue par un autre membre.
- **Commits** : référencer l'issue (`#12`), ex. `feat: hash du bloc recalculé au clic (#12)`.
- **Board** : mis à jour au fil de l'eau, pas seulement le jour de la fiche hebdo.
- **Fiches hebdo** : `docs/suivi/SEMAINE-0X.md`, remplies et envoyées chaque vendredi.

## 8. Jalons

| Milestone | Date | Attendu |
|:---|:---|:---|
| M1 — Cadrage | 09/10/2026, 17h | Groupe, dépôt, GitHub Projects, premières issues |
| M2 — Livraison | 15/11/2026, 23h59 | Application en ligne, GitHub, board à jour, docs complètes |
| M3 — Soutenance | 19/11/2026 | Répétition 9h30, soutenance 20 min entre 11h et 12h30 |

⚠️ Le sujet mentionne aussi un rendu final le 18/11 à 17h : date à confirmer avec l'enseignant.

## 9. Risques identifiés

| Risque | Parade |
|:---|:---|
| Métaphore qui crée une fausse compréhension | Tests utilisateurs tôt, section « limites » par notion |
| Performances < 30 FPS sur poste de TP | Formes simples, mesure FPS régulière |
| Démo qui plante en soutenance | Version en ligne + vidéo de secours |
| Répartition déséquilibrée | Issues assignées, point hebdo |
