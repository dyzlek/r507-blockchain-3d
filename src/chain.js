// Données de la chaîne et calcul des empreintes (vrai SHA-256, via l'API Web Crypto du navigateur).

export const GENESIS_PARENT = '0'.repeat(64);

// Difficulté : l'empreinte d'un bloc valide doit commencer par ce préfixe (repris par la notion 5).
export const DIFFICULTY = '00';

// Le bloc 2 contient la transaction du fil rouge.
export const FIL_ROUGE_INDEX = 2;

const BLOCK_DATA = [
  'Bloc de départ (genèse)',
  'Nicolas → Pierre : 2 jetons',
  'Thomas → Julien : 3 jetons',
  'Lucas → Nicolas : 1 jeton',
];

export async function sha256(text) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Ce qui est « scellé » : tout le contenu du coffre.
export function blockContent({ index, parentHash, data, nonce }) {
  return `${index}|${parentHash}|${data}|${nonce}`;
}

// Cherche un nonce qui donne une empreinte respectant la difficulté.
async function mine(block) {
  for (let nonce = 0; ; nonce++) {
    const hash = await sha256(blockContent({ ...block, nonce }));
    if (hash.startsWith(DIFFICULTY)) return { ...block, nonce, hash };
  }
}

export async function buildChain() {
  const chain = [];
  let parentHash = GENESIS_PARENT;
  for (const [index, data] of BLOCK_DATA.entries()) {
    const block = await mine({ index, parentHash, data });
    chain.push(block);
    parentHash = block.hash;
  }
  return chain;
}

export function shortHash(hash) {
  return `${hash.slice(0, 8)}…${hash.slice(-4)}`;
}
