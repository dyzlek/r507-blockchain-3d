# BUT MMI 3e année — R507

## Projet Three.js — Visualisation pédagogique de la blockchain

### `SUIVI-HEBDO.md` — modèle des 8 fiches

Dupliquez ce modèle en `docs/suivi/SEMAINE-01.md` à `SEMAINE-08.md`. Déposez chaque fiche et envoyez-la avant l'échéance du calendrier. Elle doit refléter le board réellement mis à jour, pas une reconstitution a posteriori.

## 0. Informations générales

| Champ | Contenu |
|:---|:---|
| Groupe | Maxens, Dylan |
| Semaine | 5 |
| Dates couvertes | 31/10 – 06/11/2026 (rédigée le 04/11, à mettre à jour avant l'envoi) |
| Membres présents | |
| Lien dépôt / GitHub Projects | https://github.com/dyzlek/r507-blockchain-3d |
| Lien démo (si disponible) | https://dyzlek.github.io/r507-blockchain-3d/ |

## 1. Avancement

### 1.1 Réalisé
| Issue / tâche | Notion concernée | Statut | Preuve |
|:---|:---|:---|:---|
| #17 et #18 Protocole de test utilisateur (consignes, questions par étape, grille d'observation), committé par Maxens | Toutes | Fonctionnel | `b71c4e9` (02/11), PR #36 fusionnée le 03/11 |
| #14, #20, #21 Storyboard, sections « f) Tests utilisateurs » de CHOIX, README finalisé : fusion de la PR #35 | Toutes | En cours | PR #35 fusionnée le 03/11 (travail de la semaine 4) |

### 1.2 Prévu mais non réalisé
| Tâche | Cause | Report |
|:---|:---|:---|
| Observations de la session 1 (#17) : le formulaire a 2 réponses (T1 le 27/10, T2 le 03/11), mais les observations de l'animateur ne sont pas saisies | Observations non saisies dans `docs/TEST-UTILISATEUR.md` | Saisie des observations, puis synthèse dans `docs/TEST-UTILISATEUR-RESULTATS.md` (à valider) |
| Mesure des FPS sur un poste de TP (#19) | Aucun commit ni trace au 04/11 | À reprendre, à confirmer par le groupe |
| Test sur un vrai téléphone et avec un lecteur d'écran | Non tracé au 04/11 | À reprendre, à confirmer par le groupe |

### 1.3 État des 7 notions

| Notion obligatoire | État | Remarque / preuve |
|:---|:---|:---|
| Structure d'un bloc | Fonctionnel | Pas de changement de code cette semaine ; test à faire (#17) |
| Chaînage cryptographique | Fonctionnel | Pas de changement de code cette semaine ; test à faire (#17) |
| Immutabilité et détection de falsification | Fonctionnel | Pas de changement de code cette semaine ; test à faire (#17) |
| Réseau et décentralisation | Fonctionnel | Pas de changement de code cette semaine ; test à faire (#17) |
| Validation et minage | Fonctionnel | Pas de changement de code cette semaine ; test à faire (#17) |
| Comparaison d'au moins deux mécanismes de consensus | Fonctionnel | Pas de changement de code cette semaine ; test à faire (#17) |
| Cycle de vie d'une transaction et scénario d'attaque illustré | Fonctionnel | Pas de changement de code cette semaine ; test à faire (#17) |

**Définitions des états :**

- `En cours` = une partie est implémentée mais incomplète ou non vérifiée ;
- `Fonctionnel` = le parcours prévu fonctionne localement au moins une fois ; 
- `Testé` = il a été vérifié par au moins un test documenté (et, pour les tests externes, par une personne extérieure au groupe). 
- `Non commencé` et `Bloqué` peuvent aussi être utilisés.

## 2. Répartition du travail

| Membre | Tâches / issues | Issues traitées | Commits |
|:---|:---|:---:|:---:|
| Maxens | Protocole de test utilisateur (#17, #18) ; session 1 de tests et recherche des 2 testeurs : non constatées au 04/11 | #17 #18 | 1 (`b71c4e9`) |
| Dylan | Fusion des PR #35 et #36 (03/11), fiche de suivi semaine 5 | — | 0 commit hors fusions |

## 3. GitHub Projects

| Question | Réponse |
|:---|:---|
| Issues créées | Non relevé au 04/11 (dernière issue numérotée : #25) |
| Issues fermées | 0 cette semaine (aucune issue fermée depuis le 12/10, vérifié sur la liste GitHub) |
| Nombre dans `Backlog` / `À faire` / `En cours` / `À vérifier` / `Terminé` | 9 / 1 / 0 / 8 / 7 (relevé sur le board le 04/11) |
| Board mis à jour pendant la semaine ? | Non constaté : aucun changement de statut depuis le 27/10 ; #14 reste en `À faire` (storyboard non illustré) |
| Milestone concerné et état | M2 — Livraison (15/11) : toujours ouvert, à relever sur le board |

## 4. Choix de modélisation

| Question | Réponse |
|:---|:---|
| Fiches de `MMI-R507-projet-blockchain-CHOIX-MODELISATION.md` complétées | 4.1 à 4.7 inchangées ; sections « f) Tests utilisateurs » préparées, fusionnées le 03/11 (PR #35), en attente des résultats de test |
| Choix important et justification | Aucun nouveau choix cette semaine (documents et protocole seulement) |
| Choix remis en question | Aucun |

## 5. Tests utilisateurs

| Question | Réponse |
|:---|:---|
| Nombre de testeurs extérieurs cette semaine | 1 cette semaine (T2, 03/11) ; 1 la semaine précédente (T1, 27/10) |
| Compréhension ou problème observé | Étapes 4 à 7 peu comprises par T2 (rythme 1/5, animations 2/5) ; vocabulaire technique (sceau, consensus, double dépense) pas compris. Synthèse anonymisée : `docs/TEST-UTILISATEUR-RESULTATS.md` |
| Issue corrective | À créer : présentation visuelle du lien entre blocs (sceaux), rythme des étapes 4 à 7 |

## 6. IA, difficultés et besoins

| Question | Réponse |
|:---|:---|
| Usage de l'IA et vérifications effectuées | Claude : rédaction de cette fiche à partir de l'historique git et des PR/issues GitHub (dates, commits, numéros vérifiés). Le formulaire Google n'a pas encore été essayé à blanc ; la fiche est à relire par le groupe |
| Blocage technique | Aucun |
| Blocage pédagogique ou organisationnel | Testeurs extérieurs toujours non trouvés : bloque le passage des notions à `Testé` |
| Besoin d'un point enseignant | Non |

## 7. Objectifs de la semaine suivante

| Objectif | Responsable | Issue |
|:---|:---|:---|
| Session 1 de tests utilisateurs (2 testeurs), reporter les retours dans CHOIX, créer les issues correctives | Maxens | #17 #20 |
| Mesurer les FPS sur un poste de TP, tester sur un vrai téléphone et avec un lecteur d'écran | Dylan | #19 |
| Générer les images du storyboard, passer #14 en `À vérifier`, commencer le support de soutenance | Maxens, Dylan | #14 #23 |
| Remplir la grille d'autoévaluation et fermer les issues #7 à #13 et #16 après relecture | Maxens, Dylan | #22 |

## 8. Signaux d'alerte

- [ ] Le board n'a été mis à jour qu'aujourd'hui.
- [ ] La répartition est fortement déséquilibrée et non expliquée.
- [ ] Nous n'avons pas encore atteint les 2 testeurs extérieurs requis (2 réponses au formulaire, mais une seule session de test est saisie).
- [ ] Un choix de modélisation important n'est pas justifié.
- [ ] Une notion n'a pas avancé depuis 2 semaines.

**Règle vérifiable d'absence d'avancement depuis 2 semaines :** non cochée. À trancher par le groupe : les notions 2, 3, 5, 6 et 7 n'ont eu aucun changement de code en semaines 4 et 5 (seuls des documents et le protocole ont été ajoutés).

## 9. Validation

| Élément | Réponse |
|:---|:---|
| Fiche relue par tous | Non (à confirmer avant l'envoi) |
| Date d'envoi | |
| Noms des membres | Maxens, Dylan |
