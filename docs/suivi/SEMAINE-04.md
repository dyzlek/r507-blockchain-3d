# BUT MMI 3e année — R507

## Projet Three.js — Visualisation pédagogique de la blockchain

### `SUIVI-HEBDO.md` — modèle des 8 fiches

Dupliquez ce modèle en `docs/suivi/SEMAINE-01.md` à `SEMAINE-08.md`. Déposez chaque fiche et envoyez-la avant l'échéance du calendrier. Elle doit refléter le board réellement mis à jour, pas une reconstitution a posteriori.

## 0. Informations générales

| Champ | Contenu |
|:---|:---|
| Groupe | Maxens, Dylan |
| Semaine | 4 |
| Dates couvertes | 24/10 – 30/10/2026 (rédigée le 27/10, à mettre à jour avant l'envoi) |
| Membres présents | |
| Lien dépôt / GitHub Projects | https://github.com/dyzlek/r507-blockchain-3d |
| Lien démo (si disponible) | https://dyzlek.github.io/r507-blockchain-3d/ |

## 1. Avancement

### 1.1 Réalisé
| Issue / tâche | Notion concernée | Statut | Preuve |
|:---|:---|:---|:---|
| #16 Charte visuelle et accessibilité : contrastes mesurés et corrigés (corail 4,0 → 5,3), `aria-current`, rôle du canvas, flèches clavier sans Alt/Ctrl, boutons « Éteindre une île », `aria-live` sur le texte seul, légende du tampon | Toutes | Fonctionnel | `5dd0a85`, `03cefc1`, PR #34 fusionnée le 27/10 ; #16 en `À vérifier` |
| #20 CHOIX §2.5 : ligne « Accessibilité et lisibilité » ; sections « f) Tests utilisateurs » des 7 notions préparées (hypothèse, questions du protocole, critère de réussite) | Toutes | En cours | `docs/MMI-R507-projet-blockchain-CHOIX-MODELISATION.md` |
| #17 Protocole de test utilisateur (consignes, questions par étape, grille d'observation) et formulaire Google avec tableur de réponses | Toutes | Fonctionnel | `docs/TEST-UTILISATEUR.md`, `docs/creer-formulaire-test.gs`, formulaire créé le 27/10 ; pas encore essayé à blanc |
| #14 Storyboard écrit du parcours complet (8 plans, prompts image) | Toutes | Fonctionnel | `docs/STORYBOARD.md` ; images à générer |
| #21 README : parcours, commandes, accessibilité, structure, technologies, tableau IA | — | Fonctionnel | `README.md` |
| Fiche de suivi semaine 3 déposée (PR #33) | — | Fonctionnel | `1958d2c`, PR #33 fusionnée le 24/10 |

### 1.2 Prévu mais non réalisé
| Tâche | Cause | Report |
|:---|:---|:---|
| Session 1 de tests utilisateurs (#17), 2 testeurs extérieurs | Protocole et formulaire prêts seulement le 27/10 ; testeurs pas encore trouvés | Avant la fin de la semaine 4 si possible, sinon semaine 5 |
| Mesure des FPS sur un poste de TP (#19) | Priorité donnée à l'accessibilité et aux documents | Semaine 5 |
| Test sur un vrai téléphone et avec un lecteur d'écran | Seule l'émulation à 375 px a été faite | Semaine 5 |

### 1.3 État des 7 notions

| Notion obligatoire | État | Remarque / preuve |
|:---|:---|:---|
| Structure d'un bloc | Fonctionnel | Légende du tampon ajoutée à l'étape 1 (`03cefc1`) ; test utilisateur à faire (#17) |
| Chaînage cryptographique | Fonctionnel | Pas de changement cette semaine ; test à faire |
| Immutabilité et détection de falsification | Fonctionnel | Pas de changement cette semaine ; test à faire |
| Réseau et décentralisation | Fonctionnel | Boutons « Éteindre une île » pour le clavier (`03cefc1`) ; test à faire |
| Validation et minage | Fonctionnel | Pas de changement cette semaine ; test à faire |
| Comparaison d'au moins deux mécanismes de consensus | Fonctionnel | Pas de changement cette semaine ; test à faire |
| Cycle de vie d'une transaction et scénario d'attaque illustré | Fonctionnel | Pas de changement cette semaine ; test à faire |

**Définitions des états :**

- `En cours` = une partie est implémentée mais incomplète ou non vérifiée ;
- `Fonctionnel` = le parcours prévu fonctionne localement au moins une fois ; 
- `Testé` = il a été vérifié par au moins un test documenté (et, pour les tests externes, par une personne extérieure au groupe). 
- `Non commencé` et `Bloqué` peuvent aussi être utilisés.

## 2. Répartition du travail

| Membre | Tâches / issues | Issues traitées | Commits |
|:---|:---|:---:|:---:|
| Maxens | Aucun commit au 27/10 ; reste à sa charge : trouver les 2 testeurs et mener la session 1 (#17), relire la PR #34, valider les fiches | #17 (à faire) | 0 |
| Dylan | Accessibilité de la charte, CHOIX §2.5 et sections tests, README, storyboard écrit, protocole de test et formulaire, fiche semaine 3 | #14 #16 #17 #20 #21 | 4 (hors fusions, au 27/10) |

L'écart de la semaine vient du fait que les tâches de la semaine étaient des tâches de documents et d'accessibilité, que Dylan a prises en charge pour préparer les tests de Maxens ; à rééquilibrer en semaine 5 avec les tests, le support et la vidéo.

## 3. GitHub Projects

| Question | Réponse |
|:---|:---|
| Issues créées | 0 |
| Issues fermées | 0 (#7 à #13 et #16 attendent la relecture de Maxens) |
| Nombre dans `Backlog` / `À faire` / `En cours` / `À vérifier` / `Terminé` | 9 / 1 / 0 / 8 / 7 (relevé du 27/10) |
| Board mis à jour pendant la semaine ? | Oui, le 27/10 : #16 passé en `À vérifier` ; #14 reste en `À faire`, à passer en `À vérifier` avec le storyboard |
| Milestone concerné et état | M2 — Livraison (15/11) : 15 issues ouvertes, 0 fermée ; M3 — Soutenance : 4 ouvertes ; M1 — Cadrage : 6/6 fermées |

## 4. Choix de modélisation

| Question | Réponse |
|:---|:---|
| Fiches de `MMI-R507-projet-blockchain-CHOIX-MODELISATION.md` complétées | 4.1 à 4.7 rédigées ; §2.5 complété avec la ligne « Accessibilité et lisibilité » (contrastes mesurés, états doublés, clavier, limites) ; les 7 sections « f) Tests utilisateurs » préparées (hypothèse, questions, critère), sans observation tant qu'aucun test n'a eu lieu |
| Choix important et justification | Texte corail assombri (`#c2543a` → `#a8442c`) : 4,0 sur la fiche ne passait pas le seuil de 4,5, 5,3 le passe, sans changer l'esprit papier ; tous les états restent doublés par du texte ou un symbole |
| Choix remis en question | L'`aria-live` sur tout le panneau relisait tout à chaque étape ; limité au texte de l'étape. L'allumage des îles à la souris seule : ajout de boutons pour le clavier |

## 5. Tests utilisateurs

| Question | Réponse |
|:---|:---|
| Nombre de testeurs extérieurs cette semaine | 0 au 27/10 (à mettre à jour avant l'envoi) |
| Compréhension ou problème observé | Aucun test extérieur. Protocole et formulaire prêts (`docs/TEST-UTILISATEUR.md`, formulaire Google avec tableur de réponses) |
| Issue corrective | — (les issues correctives seront créées après la session 1, #17) |

## 6. IA, difficultés et besoins

| Question | Réponse |
|:---|:---|
| Usage de l'IA et vérifications effectuées | Claude : audit d'accessibilité (contrastes recalculés, build, parcours testé dans le navigateur à 375 px simulés), protocole et script du formulaire, README, storyboard écrit, sections de CHOIX ; lignes ajoutées au tableau IA du README. Chiffres vérifiés dans le code et sur le board ; formulaire non essayé à blanc ; storyboard à relire par Maxens avant de générer les images |
| Blocage technique | Aucun |
| Blocage pédagogique ou organisationnel | Les testeurs extérieurs ne sont pas encore trouvés, ce qui bloque le passage des notions à `Testé` |
| Besoin d'un point enseignant | Non |

## 7. Objectifs de la semaine suivante

| Objectif | Responsable | Issue |
|:---|:---|:---|
| Session 1 de tests utilisateurs (2 testeurs), reporter les retours dans CHOIX, créer les issues correctives | Maxens | #17 #20 |
| Mesurer les FPS sur un poste de TP, tester sur un vrai téléphone | Dylan | #19 |
| Remplir la grille d'autoévaluation et fermer les issues #7 à #13 et #16 après relecture | Maxens, Dylan | #22 |
| Générer les images du storyboard, commencer le support de soutenance | Maxens, Dylan | #14 #23 |

## 8. Signaux d'alerte

- [ ] Le board n'a été mis à jour qu'aujourd'hui.
- [ ] La répartition est fortement déséquilibrée et non expliquée (écart expliqué en section 2).
- [x] Nous n'avons pas encore atteint les 2 testeurs extérieurs requis.
- [ ] Un choix de modélisation important n'est pas justifié.
- [ ] Une notion n'a pas avancé depuis 2 semaines.

**Règle vérifiable d'absence d'avancement depuis 2 semaines :** cocher cette case si, entre les deux dernières fiches hebdomadaires successives, aucune évolution visible n'est constatée pour la notion concernée dans le code, l'interface, `CHOIX-MODELISATION.md`, les issues ou les tests (aucun commit, issue déplacée/fermée, preuve ajoutée ou observation nouvelle). Nommer la notion et la preuve vérifiée : ...

## 9. Validation

| Élément | Réponse |
|:---|:---|
| Fiche relue par tous | Non (à confirmer avant l'envoi) |
| Date d'envoi | |
| Noms des membres | Maxens, Dylan |
