// Le parcours, une séquence par étape. Chaque séquence fixe le point de vue de la caméra
// et le coffre mis en avant (focus = index du bloc, ou null).
// Les notions 2 à 7 viendront s'ajouter ici.

export const SEQUENCES = [
  {
    id: 'intro',
    step: 'Avant de commencer',
    title: 'Une chaîne de coffres en verre',
    text: [
      'Une blockchain, c’est un registre que tout le monde peut lire, mais que personne ne peut trafiquer en douce.',
      'Ici, chaque page de ce registre est un <strong>coffre en verre</strong> fermé par un sceau. Les coffres sont accrochés les uns aux autres, dans l’ordre où on les a ajoutés.',
      'On va suivre une seule transaction du début à la fin : <strong>Alice envoie 5 jetons à Bob</strong>.',
    ],
    enVrai:
      'Les coffres, c’est une image. Une vraie blockchain, ce sont des données numériques recopiées sur des milliers d’ordinateurs. Bitcoin ajoute un bloc toutes les 10 minutes environ, et ça dure depuis 2009 : sa chaîne dépasse les 900 000 blocs.',
    camera: { position: [0.5, 3.4, 11], target: [0, 0, 0] },
    focus: null,
  },
  {
    id: 'coffre',
    notion: 1,
    step: 'Notion 1 · Structure d’un bloc',
    title: 'Le coffre',
    text: [
      'Ce coffre, c’est un <strong>bloc</strong>. La transaction d’Alice est dedans.',
      'Pas besoin de l’ouvrir pour voir ce qu’il contient : il est en verre. Tant mieux, d’ailleurs, parce que l’ouvrir casserait le sceau.',
    ],
    textInspected: [
      'Tous les blocs contiennent ces quatre choses. Le sceau, lui, est calculé à partir de <strong>tout</strong> ce qu’il y a dans le coffre.',
    ],
    enVrai:
      'Un bloc, c’est un paquet de données. Chez Bitcoin, il contient souvent plusieurs milliers de transactions ; ici, on n’en a mis qu’une. Son empreinte est un <strong>hash SHA-256</strong> : 64 caractères calculés à partir de tout le contenu du bloc. Le sceau coloré sert juste à la rendre visible, et la vraie empreinte, calculée par ton navigateur, est écrite à côté. Le nonce sert au minage, on y revient à la notion 5. Un vrai bloc note aussi la date et l’heure ; on a laissé ça de côté.',
    camera: { position: [0.3, 0.9, 4.7], target: [0, -0.05, 0] },
    focus: 2,
  },
];
