// Le parcours, une séquence par étape. Chaque séquence fixe le point de vue de la caméra
// et le coffre mis en avant (focus = index du bloc, ou null).
// Les notions 2 à 7 viendront s'ajouter ici.

export const SEQUENCES = [
  {
    id: 'intro',
    step: 'Introduction',
    title: 'Une chaîne de coffres de verre',
    text: [
      'Une blockchain est un registre que tout le monde peut lire, mais que personne ne peut modifier en douce.',
      'Ici, chaque page du registre est un <strong>coffre de verre</strong> fermé par un sceau. Les coffres sont reliés dans l’ordre où ils ont été ajoutés.',
      'Notre fil rouge : <strong>Alice envoie 5 jetons à Bob</strong>. Suivons cette transaction.',
    ],
    enVrai:
      'Les coffres sont une image. Une vraie blockchain n’est que des données numériques, recopiées sur des milliers d’ordinateurs. Bitcoin ajoute un bloc environ toutes les 10 minutes depuis 2009 : sa chaîne compte plus de 900 000 blocs.',
    camera: { position: [0.5, 3.2, 11], target: [0, 0, 0] },
    focus: null,
  },
  {
    id: 'coffre',
    notion: 1,
    step: 'Notion 1 · Structure d’un bloc',
    title: 'Le coffre',
    text: [
      'Ce coffre est un <strong>bloc</strong>. Il contient la transaction d’Alice.',
      'Le verre permet de voir ce qu’il renferme sans l’ouvrir : ouvrir le coffre briserait son sceau.',
    ],
    textInspected: [
      'Un bloc contient toujours ces quatre éléments. Le sceau est calculé à partir de <strong>tout</strong> le contenu du coffre.',
    ],
    enVrai:
      'Un bloc est un paquet de données. Chez Bitcoin, il regroupe en général plusieurs milliers de transactions (ici, une seule). Son empreinte est un <strong>hash SHA-256</strong> : 64 caractères calculés à partir de tout le contenu du bloc. Le sceau coloré n’est qu’une façon de la rendre visible ; la vraie empreinte, calculée dans votre navigateur, est affichée à côté. Le nonce sert au minage (notion 5). Un vrai bloc contient aussi la date et l’heure, que nous avons laissées de côté.',
    camera: { position: [0.3, 0.9, 4.7], target: [0, -0.05, 0] },
    focus: 2,
  },
];
