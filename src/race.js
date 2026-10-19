import * as THREE from 'three';
import { mine } from './chain.js';
import { createCoffre } from './coffre.js';
import { createTape } from './papier.js';

// Notion 7 : cycle de vie de la transaction de Dylan, puis tentative de double dépense.
// La transaction est dans le bloc 4 (notion 5). En secret, Dylan fabrique un autre bloc 4, à partir du bloc 3,
// où les mêmes jetons lui reviennent. Les deux branches font la course ; les îles gardent la plus longue.
// La course montre la vitesse moyenne de chaque camp (pas de hasard ici, voir l'encart « En vrai… ») :
// avec moins de la moitié de la puissance, Dylan perd toujours ; avec plus, il gagne : l'attaque des 51 %.
export const ATTACKS = [0.3, 0.6]; // part de la puissance de calcul du réseau détenue par Dylan
const BLOCK_TIME = 1.3; // secondes pour trouver un bloc avec toute la puissance du réseau
const GOAL = 3; // la course s'arrête quand une branche compte 3 blocs après le bloc 3
const FORK_Z = 2.6; // la branche de Dylan est posée devant la chaîne honnête
const LINK_COLOR = 0xe0684b;
const BROKEN_COLOR = 0xb3261e;

const HONEST_DATA = ['Pierre → Thomas : 4 jetons', 'Julien → Lucas : 2 jetons'];
export const ATTACK_DATA = ['Dylan → Dylan : 5 jetons', 'Bloc vide (Dylan)', 'Bloc vide (Dylan)'];

// Ruban adhésif entre deux coffres, comme dans la chaîne principale (en biais pour la fourche).
function makeLink(from, to, color) {
  return createTape(from, to, color);
}

// `fork` : le coffre du bloc 3 ; `tip` : le coffre du bloc 4 (celui de la notion 5), qu'on affiche scellé ici.
export async function createRace({ fork, tip, data, spacing }) {
  const group = new THREE.Group();
  const forkBlock = fork.block;
  const sealed = await mine({ index: forkBlock.index + 1, parentHash: forkBlock.hash, data });

  // Branche honnête : le bloc 4 de la notion 5, puis deux blocs d'autres transactions.
  const honest = [];
  let parent = sealed;
  for (const [i, text] of HONEST_DATA.entries()) {
    const block = await mine({ index: sealed.index + 1 + i, parentHash: parent.hash, data: text });
    const coffre = createCoffre(block);
    coffre.group.position.set(tip.group.position.x + (i + 1) * spacing, 0, 0);
    const link = makeLink(i === 0 ? tip.group.position : honest[i - 1].coffre.group.position, coffre.group.position, LINK_COLOR);
    group.add(coffre.group, link);
    honest.push({ coffre, link, shown: 0 });
    parent = block;
  }

  // Branche secrète de Dylan, accrochée au bloc 3 : son bloc 4 renvoie les jetons à Dylan.
  const attack = [];
  parent = forkBlock;
  for (const [i, text] of ATTACK_DATA.entries()) {
    const block = await mine({ index: forkBlock.index + 1 + i, parentHash: parent.hash, data: text });
    const coffre = createCoffre(block);
    coffre.group.position.set(tip.group.position.x + i * spacing, 0, FORK_Z);
    const from = i === 0 ? fork.group.position : attack[i - 1].coffre.group.position;
    const link = makeLink(from, coffre.group.position, BROKEN_COLOR);
    group.add(coffre.group, link);
    attack.push({ coffre, link, shown: 0 });
    parent = block;
  }

  const center = new THREE.Vector3(
    (fork.group.position.x + tip.group.position.x + (GOAL - 1) * spacing) / 2,
    0,
    FORK_Z / 2,
  );

  let power = ATTACKS[0];
  let state = 'idle'; // 'idle' | 'running' | 'done'
  let honestLength = 1; // le bloc 4 de Maxens est déjà là
  let attackLength = 1; // Dylan a préparé son bloc 4 en secret
  let progress = { honest: 0, attack: 0 };
  let winner = null; // 'honest' | 'attack'
  let tipSink = 0;
  const api = { group, center, onChange: () => {} };

  function updatePlates() {
    const lost = (side) => state === 'done' && winner !== side;
    tip.setPlate(lost('honest') ? 'Bloc n°4 · abandonné' : 'Bloc n°4 · scellé', { broken: lost('honest') });
    honest.forEach(({ coffre }) => coffre.setPlate(lost('honest') ? `Bloc n°${coffre.block.index} · abandonné` : null, { broken: lost('honest') }));
    attack.forEach(({ coffre }) =>
      coffre.setPlate(`Bloc n°${coffre.block.index} · ${lost('attack') ? 'rejeté' : winner === 'attack' ? 'adopté' : 'secret'}`, { broken: true }),
    );
  }

  Object.assign(api, {
    sealed,
    get power() {
      return power;
    },
    setPower(value) {
      if (state === 'running' || !ATTACKS.includes(value)) return;
      power = value;
      api.reset();
    },
    // À l'arrivée sur la séquence : le bloc 4 est scellé (la notion 5 l'a miné).
    prepare() {
      tip.setTrial(sealed, { valid: true, label: 'Bloc n°4 · scellé' });
      tip.setGlow(false);
      api.reset();
    },
    start(instant) {
      if (state === 'running') return;
      honestLength = 1;
      attackLength = 1;
      progress = { honest: 0, attack: 0 };
      winner = null;
      state = 'running';
      if (instant) while (state === 'running') api.update(0.1, 0, true);
      updatePlates();
      api.onChange();
    },
    reset() {
      state = 'idle';
      honestLength = 1;
      attackLength = 1;
      winner = null;
      updatePlates();
      api.onChange();
    },
    summary() {
      return {
        state,
        power,
        winner,
        honestLength,
        attackLength,
        goal: GOAL,
        // Le bloc qui contient la transaction compte comme première confirmation.
        confirmations: winner === 'attack' ? 0 : honestLength,
      };
    },
    update(dt, time, instant) {
      if (state === 'running') {
        // Chaque camp avance au rythme de sa part de la puissance de calcul.
        progress.honest += (dt * (1 - power)) / BLOCK_TIME;
        progress.attack += (dt * power) / BLOCK_TIME;
        let changed = false;
        if (progress.honest >= 1) {
          progress.honest -= 1;
          honestLength += 1;
          changed = true;
        }
        if (progress.attack >= 1) {
          progress.attack -= 1;
          attackLength += 1;
          changed = true;
        }
        if (honestLength >= GOAL || attackLength >= GOAL) {
          // Les îles gardent la branche la plus longue ; à égalité, celle qu'elles avaient déjà.
          winner = attackLength > honestLength ? 'attack' : 'honest';
          state = 'done';
          updatePlates();
        }
        if (changed) api.onChange();
      }

      const damp = (value, target, lambda = 6) => (instant ? target : THREE.MathUtils.damp(value, target, lambda, dt));
      // Un bloc apparaît quand son camp l'a trouvé (`count` blocs visibles) ; la branche perdante s'enfonce.
      const place = (items, count, lost) =>
        items.forEach((item, i) => {
          item.shown = damp(item.shown, i < count ? 1 : 0);
          [item.coffre.group, item.link].forEach((object) => {
            object.visible = item.shown > 0.01;
            object.scale.setScalar(Math.max(item.shown, 0.001));
          });
          item.coffre.group.position.y = damp(item.coffre.group.position.y, lost ? -0.45 : 0, 3);
          item.coffre.update(dt, time, instant);
        });
      // Branche honnête : `honestLength` compte le bloc 4, déjà posé ; les blocs 5 et 6 viennent ensuite.
      place(honest, honestLength - 1, state === 'done' && winner === 'attack');
      // Branche de Dylan : son bloc 4 apparaît au départ de la course.
      place(attack, state === 'idle' ? 0 : attackLength, state === 'done' && winner === 'honest');
      tipSink = damp(tipSink, state === 'done' && winner === 'attack' ? -0.45 : 0, 3);
      tip.group.position.y = tipSink;
    },
  });

  api.reset();
  return api;
}
