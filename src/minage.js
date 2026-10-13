import { sha256, blockContent } from './chain.js';

// Le minage = une course au sceau : on change le nonce et on recalcule le vrai SHA-256,
// jusqu'à tomber sur une empreinte qui commence par la difficulté demandée.
// Au ralenti pour qu'on puisse suivre les essais ; un zéro de plus = environ 16 fois plus d'essais.
// Chaque minage part d'un nonce au hasard : sinon, avec les mêmes données, on tomberait toujours sur le même
// nombre d'essais, et la chance d'un essai pourrait faire croire qu'un zéro de plus ne change rien.
export const DIFFICULTIES = ['00', '000'];
const TRIES_PER_SECOND = { '00': 60, '000': 600 };

export function createMiner(block) {
  let difficulty = DIFFICULTIES[0];
  let state = 'idle'; // 'idle' | 'running' | 'found'
  let tries = 0;
  let start = 0; // premier nonce essayé
  let last = null; // dernier essai : { nonce, hash }
  let budget = 0; // essais autorisés depuis la dernière image
  let busy = false;
  let run = 0; // change à chaque départ ou remise à zéro : un calcul en retard est ignoré
  const api = { onChange: () => {} };

  const tryNonce = async (nonce) => ({ nonce, hash: await sha256(blockContent({ ...block, nonce })) });

  async function batch(count, id) {
    busy = true;
    const results = await Promise.all(Array.from({ length: count }, (_, i) => tryNonce(start + tries + i)));
    busy = false;
    if (id !== run) return;
    const hit = results.find(({ hash }) => hash.startsWith(difficulty));
    tries += hit ? hit.nonce - start - tries + 1 : count;
    last = hit ?? results.at(-1);
    if (hit) state = 'found';
    api.onChange();
  }

  return Object.assign(api, {
    get difficulty() {
      return difficulty;
    },
    setDifficulty(value) {
      if (state === 'running' || !DIFFICULTIES.includes(value)) return;
      difficulty = value;
      api.reset();
    },
    // Mouvement réduit : on cherche le nonce d'un coup, sans faire défiler les essais.
    async start(instant) {
      run++;
      tries = 0;
      start = Math.floor(Math.random() * 10000);
      last = null;
      budget = 0;
      state = 'running';
      api.onChange();
      if (!instant) return;
      const id = run;
      while (state === 'running' && id === run) await batch(256, id);
    },
    reset() {
      run++;
      state = 'idle';
      tries = 0;
      last = null;
      api.onChange();
    },
    summary() {
      // Nombre d'essais moyen : 16 possibilités par caractère hexadécimal imposé.
      return { state, tries, last, difficulty, expected: 16 ** difficulty.length };
    },
    update(dt) {
      if (state !== 'running' || busy) return;
      budget += dt * TRIES_PER_SECOND[difficulty];
      const count = Math.floor(budget);
      if (!count) return;
      budget -= count;
      batch(count, run);
    },
  });
}
