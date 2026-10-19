import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { ISLANDS, TOP_Y } from './archipel.js';
import { COLORS, cardboardDark, paperMaterial } from './papier.js';

// Notion 6 : qui a le droit de sceller le prochain bloc ? Deux façons de choisir, sans chef,
// posées sur l'archipel de la notion 4.
// - Preuve de travail (PoW) : chaque île a des machines et fait une course au sceau.
//   Plus elle a de machines, plus elle a de chances de gagner ; toutes calculent, une seule gagne.
// - Preuve d'enjeu (PoS) : chaque île met des jetons en jeu ; un tirage au sort la désigne,
//   avec autant de tickets que de jetons misés. Pas de course, presque pas de calcul.
export const METHODS = {
  pow: { name: 'Preuve de travail', label: 'Travail (PoW)', unit: (n) => `${n} machine${n > 1 ? 's' : ''}` },
  pos: { name: 'Preuve d’enjeu', label: 'Enjeu (PoS)', unit: (n) => `${n} jeton${n > 1 ? 's' : ''} misé${n > 1 ? 's' : ''}` },
};

// Une île n'a pas le même poids dans les deux méthodes : on voit que ce n'est pas la même chose qui compte.
const POWER = [1, 3, 1, 4, 2, 1, 2];
const STAKE = [4, 1, 2, 1, 3, 2, 1];

const TRIES_PER_MACHINE = 900; // essais par seconde et par machine (au ralenti par rapport au vrai)
const RACE_TIME = [1.6, 3]; // durée d'une course, en secondes (tirée au hasard dans cet intervalle)
const DRAW_TIME = 2.4; // durée de la roue du tirage
const ACCENT = 0xe0684b;

const machineGeometry = new THREE.BoxGeometry(0.26, 0.34, 0.2);
const machineMaterial = cardboardDark(); // machines en carton
const ledGeometry = new THREE.BoxGeometry(0.06, 0.04, 0.01);
const coinGeometry = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 28);
const coinMaterial = paperMaterial(COLORS.gold, { fibers: 60 }); // jetons en carton doré
const crownGeometry = new THREE.TorusGeometry(0.98, 0.05, 10, 64);

function makeLabel(className, text) {
  const el = document.createElement('div');
  el.className = className;
  el.textContent = text;
  return new CSS2DObject(el);
}

// Tirage pondéré : renvoie un indice, avec une probabilité proportionnelle au poids.
function weightedPick(weights) {
  let r = Math.random() * weights.reduce((a, b) => a + b, 0);
  return weights.findIndex((w) => (r -= w) < 0);
}

export function createConsensus() {
  const group = new THREE.Group();
  const total = { pow: POWER.reduce((a, b) => a + b, 0), pos: STAKE.reduce((a, b) => a + b, 0) };

  const islands = ISLANDS.map(({ name, at }, index) => {
    const island = new THREE.Group();
    island.position.set(at[0], 0, at[1]);
    group.add(island);

    // Machines alignées derrière la copie de la chaîne, avec un voyant qui clignote pendant la course.
    const machines = new THREE.Group();
    const leds = [];
    for (let i = 0; i < POWER[index]; i++) {
      const machine = new THREE.Mesh(machineGeometry, machineMaterial);
      machine.position.set((i - (POWER[index] - 1) / 2) * 0.32, TOP_Y + 0.17, -0.55);
      machines.add(machine);
      const led = new THREE.Mesh(ledGeometry, new THREE.MeshBasicMaterial({ color: 0x6d7a8c }));
      led.position.set(machine.position.x, TOP_Y + 0.27, -0.55 + 0.101);
      machines.add(led);
      leds.push(led);
    }
    island.add(machines);

    // Pile de jetons misés, au même endroit : sa hauteur dépasse de la copie de la chaîne.
    const coins = new THREE.Group();
    for (let i = 0; i < STAKE[index]; i++) {
      const coin = new THREE.Mesh(coinGeometry, coinMaterial);
      coin.position.set(0, TOP_Y + 0.04 + i * 0.085, -0.55);
      coins.add(coin);
    }
    island.add(coins);

    // Anneau corail au-dessus de l'île : la gagnante, ou l'île sur laquelle passe la roue du tirage.
    const crown = new THREE.Mesh(crownGeometry, new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 }));
    crown.rotation.x = -Math.PI / 2;
    crown.position.y = TOP_Y + 0.05;
    island.add(crown);

    const stat = makeLabel('stat', '');
    stat.position.set(0, TOP_Y + 1.05, -0.4);
    island.add(stat);

    return { name, index, machines, leds, coins, crown, stat, tries: 0, glow: 0, glowTarget: 0 };
  });

  let method = 'pow';
  let state = 'idle'; // 'idle' | 'running' | 'done'
  let winner = -1;
  let elapsed = 0;
  let duration = 0;
  let wheel = -1; // île sur laquelle passe la roue (PoS)
  let wheelClock = 0;
  const wins = { pow: Array(ISLANDS.length).fill(0), pos: Array(ISLANDS.length).fill(0) };
  const api = { group, onChange: () => {} };

  const weights = () => (method === 'pow' ? POWER : STAKE);

  function updateStats() {
    islands.forEach((island) => {
      const amount = weights()[island.index];
      let text = METHODS[method].unit(amount);
      if (method === 'pow' && state !== 'idle') text = `${Math.floor(island.tries).toLocaleString('fr-FR')} essais`;
      if (state === 'done' && island.index === winner) text = method === 'pow' ? 'a trouvé le sceau !' : 'tirée au sort !';
      island.stat.element.textContent = text;
      island.stat.element.classList.toggle('is-winner', state === 'done' && island.index === winner);
      island.machines.visible = method === 'pow';
      island.coins.visible = method === 'pos';
    });
  }

  Object.assign(api, {
    get method() {
      return method;
    },
    setMethod(value) {
      if (state === 'running' || !METHODS[value]) return;
      method = value;
      api.reset();
    },
    start(instant) {
      if (state === 'running') return;
      // Le résultat suit les poids ; l'animation ne fait que le montrer (course ou roue).
      winner = weightedPick(weights());
      islands.forEach((island) => (island.tries = 0));
      elapsed = 0;
      duration = method === 'pow' ? RACE_TIME[0] + Math.random() * (RACE_TIME[1] - RACE_TIME[0]) : DRAW_TIME;
      wheel = 0;
      wheelClock = 0;
      state = 'running';
      if (instant) api.update(duration, 0, true);
      updateStats();
      api.onChange();
    },
    reset() {
      state = 'idle';
      winner = -1;
      wheel = -1;
      islands.forEach((island) => (island.tries = 0));
      updateStats();
      api.onChange();
    },
    // Remet aussi les compteurs de victoires à zéro (à l'arrivée sur la séquence).
    clear() {
      method = 'pow';
      wins.pow.fill(0);
      wins.pos.fill(0);
      api.reset();
    },
    summary() {
      const ws = weights();
      const sum = total[method];
      return {
        method,
        state,
        winner: winner >= 0 ? { name: ISLANDS[winner].name, weight: ws[winner], chance: ws[winner] / sum } : null,
        totalTries: islands.reduce((acc, island) => acc + Math.floor(island.tries), 0),
        wins: ISLANDS.map(({ name }, i) => ({ name, wins: wins[method][i], weight: ws[i] })),
        rounds: wins[method].reduce((a, b) => a + b, 0),
        tried: { pow: wins.pow.some(Boolean), pos: wins.pos.some(Boolean) },
      };
    },
    update(dt, time, instant) {
      if (state === 'running') {
        elapsed += dt;
        if (method === 'pow') {
          // Toutes les îles calculent en même temps, chacune au rythme de ses machines.
          islands.forEach((island) => (island.tries += dt * POWER[island.index] * TRIES_PER_MACHINE));
        } else {
          // La roue passe d'île en île de plus en plus lentement, puis s'arrête sur la gagnante.
          const k = Math.min(1, elapsed / duration);
          wheelClock += dt;
          const step = 0.06 + 0.4 * k * k;
          if (wheelClock >= step && k < 1) {
            wheelClock = 0;
            wheel = (wheel + 1) % islands.length;
          }
        }
        if (elapsed >= duration) {
          state = 'done';
          wheel = winner;
          wins[method][winner] += 1;
          api.onChange();
        }
        updateStats();
      }

      islands.forEach((island) => {
        const lit = state === 'done' ? island.index === winner : method === 'pos' && state === 'running' && island.index === wheel;
        const target = lit ? 1 : 0;
        island.glow = instant ? target : THREE.MathUtils.damp(island.glow, target, method === 'pos' && state === 'running' ? 20 : 6, dt);
        island.crown.material.opacity = island.glow * (state === 'done' ? 0.75 + Math.sin(time * 4) * 0.2 : 1);
        // Les voyants des machines clignotent pendant la course : elles travaillent toutes.
        const working = method === 'pow' && state === 'running';
        island.leds.forEach((led, i) => led.material.color.setHex(working && Math.sin(time * 18 + i * 1.7 + island.index) > 0 ? 0x7be08a : 0x6d7a8c));
      });
    },
  });

  updateStats();
  return api;
}
