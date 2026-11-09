import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { COFFRE_SIZE, sealTexture } from './coffre.js';
import { createBateau, BOAT_PATHS } from './bateau.js';
import { COLORS, cardboard, createCutout, crumpledSheet, noisyDisc, paperMaterial, paperPlaneGeometry } from './papier.js';

// Le réseau = un archipel en papier découpé, posé sur une mer de papier froissé.
// Chaque île est un nœud qui garde sa propre copie de la chaîne.
// Aucune île n'est au centre : chacune n'est reliée qu'à quelques voisines, et la transaction
// de Dylan se propage de proche en proche (gossip).
// La vraie chaîne de coffres est posée sur l'île de Dylan, une île comme les autres : on commence le parcours
// dessus, et en reculant on découvre qu'elle n'est qu'une île parmi d'autres, qui ont chacune la même chaîne.
// Dylan est devant, les autres derrière, de proche en proche jusqu'à Maxens, au fond.
// Coordonnées dans le repère de l'archipel, que l'on agrandit (ARCHIPEL_SCALE) pour qu'une île porte la chaîne.
export const ARCHIPEL_SCALE = 14;
export const CHAIN_SPACING = 2.4; // écart entre deux coffres de la vraie chaîne (repère du monde)
// Où est posée la chaîne sur une île, par rapport à son centre (repère de l'archipel) : au centre, un peu vers
// l'arrière pour laisser devant la place à la branche secrète de la notion 7.
export const CHAIN_SPOT = [0, -0.06];
export const ISLANDS = [
  { name: 'Dylan', at: [0, 2.9] },
  { name: 'Nicolas', at: [-3.3, 0.2] },
  { name: 'Pierre', at: [3.3, 0.2] },
  { name: 'Thomas', at: [0, -1.4] },
  { name: 'Julien', at: [-2.9, -3.1] },
  { name: 'Lucas', at: [2.9, -3.1] },
  { name: 'Maxens', at: [0, -4.7] },
];

// Liaisons entre îles (indices dans ISLANDS). Si on éteint n'importe quelle île (sauf Dylan),
// les autres restent reliées : le message trouve toujours un autre chemin.
const ROUTES = [
  [0, 1], [0, 2], [1, 3], [2, 3], [1, 4],
  [3, 4], [3, 5], [2, 5], [4, 6], [5, 6],
];

export const SENDER = 0; // l'île de Dylan
const RECEIVER = 6; // l'île de Maxens
const HINT_OFF = 3; // l'île du milieu, la plus tentante à éteindre

const R = 0.95; // rayon d'une île (≈ 9 unités du monde une fois agrandie)
const GROUND_Y = -COFFRE_SIZE.h / 2;
export const TOP_Y = GROUND_Y + 0.105; // trois feuilles de 0,035 : une fois agrandie, l'île a l'épaisseur d'un coffre
const SPEED = 3.2; // vitesse d'un message, en unités par seconde
const VERIFY_DELAY = 0.4; // une île vérifie la transaction avant de la faire suivre
const ACCENT = 0xe0684b;
const REJECT = 0xb3261e; // bloc refusé : rouge de la chaîne cassée (notion 3)
const ROUTE_COLOR = 0x8a7560; // pointillés au crayon
const ROCK = 0xffffff; // teinte des papiers de l'île (multiplie la texture)
const ROCK_OFF = 0x8d8d8d; // île éteinte : papier grisé

// Une île = trois feuilles découpées empilées (sable, herbe, herbe foncée) ; le dessus est à TOP_Y.
const LAYERS = [
  { r: R * 1.12, color: COLORS.sand },
  { r: R * 1.0, color: COLORS.grass },
  { r: R * 0.92, color: COLORS.grassDark },
];
const LAYER_DEPTH = 0.035;

// Décor de chaque île, en découpes de papier : un repère propre à l'île (cabane, phare ou grand arbre) et la même
// petite végétation partout, tout autour de la chaîne (derrière, et sur les côtés devant). Il ne sert qu'à rendre
// les îles vivantes et reconnaissables ; toutes jouent exactement le même rôle dans le réseau.
// [type, hauteur en unités du monde, angle autour du centre (90° = devant), distance au centre (fraction du rayon)].
const LANDMARKS = [['hut', 3.6], ['tree', 4.4], ['lighthouse', 6.2], ['hut', 3.4], ['lighthouse', 6.2], ['tree', 4.2], ['lighthouse', 6.2]];
const PLANTS = [
  ['palm', 5.2, 302, 0.84],
  ['tree', 3.8, 266, 0.86],
  ['palm', 4.2, 325, 0.8],
  ['bush', 1.7, 205, 0.84],
  ['bush', 1.5, 345, 0.84],
  ['palm', 4, 150, 0.84],
  ['bush', 1.3, 35, 0.86],
  ['bush', 1.2, 120, 0.86],
];
// Les îles impaires sont en miroir, et chaque île décale un peu ses plantes : elles ne se ressemblent pas toutes.
function decorFor(index) {
  const mirror = index % 2 ? -1 : 1;
  const jitter = ((index * 37) % 21) - 10;
  return [[...LANDMARKS[index], 236, 0.8], ...PLANTS].map(([kind, height, angle, distance], j) => {
    const a = THREE.MathUtils.degToRad(angle + (j ? jitter : 0));
    return [kind, height / ARCHIPEL_SCALE, Math.cos(a) * distance * R * mirror, Math.sin(a) * distance * R, (((index + j) * 53) % 40 - 20) / 100];
  });
}
const easeOutBack = (t) => 1 + 2.4 * (t - 1) ** 3 + 1.4 * (t - 1) ** 2;
const ringGeometry = new THREE.RingGeometry(R - 0.1, R - 0.02, 48);
const scrollGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16);
// Les copies ont la taille des vrais coffres une fois l'archipel agrandi.
const MINI = { w: COFFRE_SIZE.w / ARCHIPEL_SCALE, h: COFFRE_SIZE.h / ARCHIPEL_SCALE, d: COFFRE_SIZE.d / ARCHIPEL_SCALE };
const miniGeometry = new THREE.BoxGeometry(MINI.w, MINI.h, MINI.d);
const miniSealGeometry = new THREE.PlaneGeometry(MINI.h * 0.56, MINI.h * 0.56);
const miniLinkGeometry = new THREE.CylinderGeometry(0.004, 0.004, CHAIN_SPACING / ARCHIPEL_SCALE - MINI.w, 8).rotateZ(Math.PI / 2);
// Les messages sont des avions en papier.
const messageGeometry = paperPlaneGeometry(1.2);
const messageMaterial = paperMaterial(COLORS.paper, { fibers: 40 }, { side: THREE.DoubleSide, flatShading: true });
// Le bloc falsifié voyage dans un avion rouge : on le suit des yeux jusqu'à ce qu'il soit refusé.
const forgedMaterial = new THREE.MeshStandardMaterial({ color: REJECT, roughness: 0.8, side: THREE.DoubleSide, flatShading: true });
const miniLink = new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.75, transparent: true, opacity: 0.9 });

// Traits épais (Line2) : leur épaisseur est en pixels, il faut leur donner la taille de l'écran.
const routeMaterials = [];
export function setRouteResolution(width, height) {
  routeMaterials.forEach((material) => material.resolution.set(width, height));
}

// « l'île de Dylan », « l'île de Maxens »
const of = (name) => (/^[AEIOUÉ]/.test(name) ? `d’${name}` : `de ${name}`);

function makeLabel(className, html) {
  const el = document.createElement('div');
  el.className = className;
  el.innerHTML = html;
  return new CSS2DObject(el);
}

// Copie de la chaîne posée sur une île : mêmes coffres (à la même taille que la vraie chaîne une fois
// l'archipel agrandi), mêmes sceaux, au même endroit de l'île que la vraie chaîne sur l'île de Dylan.
function createMiniChain(sealMaterials) {
  const group = new THREE.Group();
  group.position.set(CHAIN_SPOT[0], 0, CHAIN_SPOT[1]);
  const spacing = CHAIN_SPACING / ARCHIPEL_SCALE;
  sealMaterials.forEach((sealMaterial, i) => {
    const x = (i - (sealMaterials.length - 1) / 2) * spacing;
    const box = new THREE.Mesh(miniGeometry, cardboard());
    box.position.set(x, TOP_Y + MINI.h / 2, 0);
    box.castShadow = true;
    box.receiveShadow = true;
    group.add(box);
    const seal = new THREE.Mesh(miniSealGeometry, sealMaterial);
    seal.position.set(x + MINI.w * 0.1, TOP_Y + MINI.h * 0.6, MINI.d / 2 + 0.001);
    group.add(seal);
    if (i > 0) {
      const link = new THREE.Mesh(miniLinkGeometry, miniLink);
      link.position.set(x - spacing / 2, TOP_Y + MINI.h * 0.45, 0);
      group.add(link);
    }
  });
  return group;
}

export function createArchipel(chain) {
  const group = new THREE.Group();
  group.scale.setScalar(ARCHIPEL_SCALE);
  const sealMaterials = chain.map(
    (block) => new THREE.MeshStandardMaterial({ map: sealTexture(block.hash), roughness: 0.9, transparent: true, polygonOffset: true, polygonOffsetFactor: -2 }),
  );

  // La mer : une grande feuille bleue froissée sous tout l'archipel. Elle déborde largement : elle va jusqu'à l'horizon, on ne voit pas son
  // bord, même tout au fond.
  const sea = new THREE.Mesh(
    crumpledSheet(60, 50, 200),
    new THREE.MeshStandardMaterial({ map: paperMaterial(COLORS.sea, { fibers: 120, repeat: 18 }).map, roughness: 0.95, flatShading: true }),
  );
  sea.position.set(0, GROUND_Y, 0);
  sea.rotation.y = 0.02;
  sea.receiveShadow = true;
  group.add(sea);
  // Bateaux en papier mâché : un tourne autour de l'île de Dylan (visible dès le début), deux autres font le tour
  // de l'archipel et n'apparaissent qu'au dézoom, avec les autres îles. La mer froissée monte jusqu'à ~0,1
  // au-dessus de GROUND_Y et la coque descend de 0,16 sous le pont : à + 0,14, la coque (fermée par le pont) est à moitié dans l'eau.
  const bateaux = Object.values(BOAT_PATHS).map((path) => createBateau(GROUND_Y + 0.14, path));
  bateaux.forEach((b) => group.add(b.group));

  const islands = ISLANDS.map(({ name, at }, index) => {
    const island = new THREE.Group();
    island.position.set(at[0], 0, at[1]);
    island.userData.island = index;
    group.add(island);

    const layers = LAYERS.map(({ r, color }, i) => {
      const layer = new THREE.Mesh(noisyDisc(r, index * 2.3 + i * 1.7, LAYER_DEPTH), paperMaterial(color).clone());
      layer.position.y = GROUND_Y + i * LAYER_DEPTH; // la feuille du dessus finit à TOP_Y
      layer.castShadow = true;
      layer.receiveShadow = true;
      island.add(layer);
      return layer;
    });
    const base = layers.at(-1); // la feuille du dessus : elle s'éclaire au survol

    // Anneau corail : l'île a reçu la transaction.
    const ring = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = TOP_Y + 0.006;
    island.add(ring);

    // Sur l'île de Dylan, c'est la vraie chaîne (main.js) qui est posée : pas de copie en plus.
    if (index !== SENDER) island.add(createMiniChain(sealMaterials));

    const decor = decorFor(index).map(([kind, size, x, z, rotY]) => {
      const { hinge, card } = createCutout(kind, size);
      hinge.position.set(x, TOP_Y, z);
      hinge.rotation.y = rotY;
      island.add(hinge);
      return { hinge, card };
    });

    // La transaction reçue flotte au-dessus de la copie de la chaîne : elle n'est pas encore dans un bloc.
    const scroll = new THREE.Mesh(scrollGeometry, paperMaterial(COLORS.scroll, {}, { emissive: new THREE.Color(0.3, 0.2, 0.1) }));
    scroll.castShadow = true;
    scroll.rotation.z = Math.PI / 2;
    scroll.position.y = TOP_Y + 0.62;
    scroll.scale.setScalar(0.001);
    island.add(scroll);

    const plate = makeLabel('plate', `Île ${of(name)}`);
    plate.position.set(0, GROUND_Y + 0.05, R + 0.25);
    island.add(plate);

    const hint = makeLabel('hint', '');
    hint.position.set(0, TOP_Y + 1.35, 0);
    hint.visible = false;
    island.add(hint);

    return { name, index, group: island, base, layers, decor, ring, scroll, plate, hint, neighbors: [], received: false, rejected: false, offline: false, glow: 0, lift: 0 };
  });

  const routes = ROUTES.map(([a, b]) => {
    const from = islands[a].group.position;
    const to = islands[b].group.position;
    const direction = to.clone().sub(from).normalize().multiplyScalar(R * 0.75);
    const start = from.clone().add(direction).setY(TOP_Y + 0.15);
    const end = to.clone().sub(direction).setY(TOP_Y + 0.15);
    const middle = start.clone().lerp(end, 0.5).setY(TOP_Y + 1.05);
    const curve = new THREE.QuadraticBezierCurve3(start, middle, end);

    const material = new LineMaterial({ color: ROUTE_COLOR, linewidth: 2.5, dashed: true, dashSize: 0.15, gapSize: 0.1, transparent: true });
    material.fog = true; // sinon les pointillés traversent la brume des nuages en traits sombres
    routeMaterials.push(material);
    const geometry = new LineGeometry();
    geometry.setPositions(curve.getPoints(32).flatMap((p) => [p.x, p.y, p.z]));
    const line = new Line2(geometry, material);
    line.computeLineDistances();
    group.add(line);

    const route = { a, b, curve, material, line, duration: curve.getLength() / SPEED, used: false };
    islands[a].neighbors.push({ to: b, route });
    islands[b].neighbors.push({ to: a, route });
    return route;
  });

  let clock = 0;
  let sent = false;
  let forged = false; // ce qui voyage est le bloc 1 falsifié de la notion 3
  let running = false;
  let messages = []; // { route, from, to, t, mesh }
  let relays = []; // { at, from, via }
  let hintMode = null;
  let unfold = 0; // 0 = décors à plat, 1 = relevés
  let unfoldTarget = 0;
  const api = { group, onChange: () => {} };

  function clearMessages() {
    messages.forEach(({ mesh }) => group.remove(mesh));
    messages = [];
    relays = [];
  }

  function receive(index, route) {
    islands[index].received = true;
    if (route) route.used = true;
    relays.push({ at: clock + VERIFY_DELAY, from: index, via: route });
    updateLabels();
    api.onChange();
  }

  // L'île fait suivre à toutes ses voisines allumées, sauf celle qui la lui a envoyée.
  function relay({ from, via }) {
    if (islands[from].offline) return;
    for (const { to, route } of islands[from].neighbors) {
      if (route === via || islands[to].offline) continue;
      const mesh = new THREE.Mesh(messageGeometry, forged ? forgedMaterial : messageMaterial);
      mesh.castShadow = true;
      group.add(mesh);
      messages.push({ route, from, to, t: 0, mesh });
    }
  }

  // Une île qui a déjà la transaction ignore le doublon. Le bloc falsifié, lui, est comparé à la copie de l'île :
  // le sceau ne correspond pas, elle le refuse et ne le fait pas suivre.
  function arrive({ route, to }) {
    const island = islands[to];
    if (island.offline || island.received || island.rejected) return;
    if (forged) {
      island.rejected = true;
      route.rejected = true;
      updateLabels();
      api.onChange();
      return;
    }
    receive(to, route);
  }

  function updateLabels() {
    islands.forEach((island) => {
      const { plate, name, offline, received, rejected } = island;
      plate.element.textContent = `Île ${of(name)}${offline ? ' · éteinte' : rejected ? ' · refuse le bloc ✗' : ''}`;
      plate.element.classList.toggle('is-rejected', rejected);
      plate.element.classList.toggle('is-off', offline);
      plate.element.classList.toggle('is-received', received);
      island.layers.forEach((layer) => layer.material.color.set(offline ? ROCK_OFF : ROCK));
      island.decor.forEach(({ card }) => card.material.color.set(offline ? ROCK_OFF : ROCK));
      island.hint.visible =
        (hintMode === 'send' && island.index === SENDER) || (hintMode === 'off' && island.index === HINT_OFF);
    });
    islands[SENDER].hint.element.textContent = 'Clique pour envoyer';
    islands[HINT_OFF].hint.element.textContent = 'Clique pour éteindre cette île';
  }

  Object.assign(api, {
    // Envoie la transaction de Dylan (ou la renvoie, en gardant les îles éteintes).
    // `asForged` : Dylan envoie le bloc 1 falsifié ; ses voisines le refusent.
    send(instant, asForged = false) {
      clearMessages();
      forged = asForged;
      islands.forEach((island) => {
        island.received = false;
        island.rejected = false;
      });
      routes.forEach((route) => {
        route.used = false;
        route.rejected = false;
      });
      sent = true;
      if (instant && forged) {
        islands[SENDER].received = true;
        for (const { to, route } of islands[SENDER].neighbors) {
          if (islands[to].offline) continue;
          islands[to].rejected = true;
          route.rejected = true;
        }
        running = false;
      } else if (instant) {
        // Mouvement réduit : on calcule directement qui est joint, sans animation.
        const queue = [SENDER];
        islands[SENDER].received = true;
        while (queue.length) {
          for (const { to, route } of islands[queue.shift()].neighbors) {
            if (islands[to].offline || islands[to].received) continue;
            islands[to].received = true;
            route.used = true;
            queue.push(to);
          }
        }
        running = false;
      } else {
        running = true;
        receive(SENDER, null);
      }
      updateLabels();
      api.onChange();
    },
    reset() {
      clearMessages();
      islands.forEach((island) => {
        island.received = false;
        island.rejected = false;
        island.offline = false;
      });
      routes.forEach((route) => {
        route.used = false;
        route.rejected = false;
      });
      sent = false;
      forged = false;
      running = false;
      updateLabels();
    },
    toggleOffline(index) {
      if (index === SENDER) return;
      const island = islands[index];
      island.offline = !island.offline;
      island.received = false;
      island.rejected = false;
      updateLabels();
      api.onChange();
    },
    // 'send' : bulle sur l'île de Dylan ; 'off' : bulle sur l'île du milieu ; null : aucune.
    setHint(mode) {
      if (mode === hintMode) return;
      hintMode = mode;
      updateLabels();
    },
    setHover(index) {
      islands.forEach((island) => island.base.material.emissive.setHex(island.index === index ? 0x3a1a10 : 0));
    },
    pick(raycaster) {
      const [hit] = raycaster.intersectObjects(islands.map((island) => island.group), true);
      let object = hit?.object;
      while (object && object.userData.island === undefined) object = object.parent;
      return object ? object.userData.island : -1;
    },
    summary() {
      const names = (filter) => islands.filter(filter).map(({ name }) => name);
      return {
        sent,
        running,
        total: islands.length,
        islands: islands.map(({ name, offline }) => ({ name, offline })),
        received: names((island) => island.received),
        offline: names((island) => island.offline),
        unreached: names((island) => !island.offline && !island.received && !island.rejected),
        forged,
        rejected: names((island) => island.rejected),
        bobReceived: islands[RECEIVER].received,
      };
    },
    // Arrivée sur l'archipel : les décors se relèvent un à un ; au départ, ils se replient.
    setOpen(value) {
      unfoldTarget = value ? 1 : 0;
    },
    // Les autres îles n'existent pas tant qu'on est sur la chaîne : elles apparaissent derrière les nuages, au dézoom.
    setOthersVisible(visible) {
      islands.forEach((island) => {
        if (island.index !== SENDER) island.group.visible = visible;
      });
      bateaux.slice(1).forEach((b) => (b.group.visible = visible));
    },
    // Les plaques « Île de… » ne s'affichent que sur les étapes de l'archipel : de loin, derrière la chaîne, elles gêneraient.
    setLabels(visible) {
      islands.forEach(({ plate }) => (plate.visible = visible));
    },
    update(dt, elapsed, instant) {
      clock += dt;
      bateaux.forEach((b) => b.update(dt, elapsed, instant));
      unfold = instant ? unfoldTarget : THREE.MathUtils.clamp(unfold + Math.sign(unfoldTarget - unfold) * dt * 0.8, 0, 1);
      const ready = relays.filter((r) => r.at <= clock);
      relays = relays.filter((r) => r.at > clock);
      ready.forEach(relay);

      messages = messages.filter((message) => {
        message.t += dt / message.route.duration;
        if (message.t >= 1) {
          group.remove(message.mesh);
          arrive(message);
          return false;
        }
        const forward = message.from === message.route.a;
        const t = forward ? message.t : 1 - message.t;
        message.mesh.position.copy(message.route.curve.getPoint(t));
        // L'avion regarde là où il va. `lookAt` attend un point du monde, la route est dans le repère de l'archipel.
        const ahead = message.route.curve.getPoint(THREE.MathUtils.clamp(t + (forward ? 0.04 : -0.04), 0, 1));
        message.mesh.lookAt(group.localToWorld(ahead));
        message.mesh.rotateZ(Math.sin(message.t * Math.PI * 2) * 0.25); // petit roulis
        return true;
      });
      if (running && !messages.length && !relays.length) {
        running = false;
        updateLabels();
        api.onChange();
      }

      islands.forEach((island, i) => {
        const damp = (value, target) => (instant ? target : THREE.MathUtils.damp(value, target, 6, dt));
        island.glow = damp(island.glow, island.received || island.rejected ? 1 : 0);
        island.ring.material.color.set(island.rejected ? REJECT : ACCENT);
        island.lift = damp(island.lift, island.offline ? -0.2 : 0);
        island.ring.material.opacity = island.glow * (0.75 + Math.sin(elapsed * 4) * 0.2);
        island.scroll.scale.setScalar(Math.max(0.001, island.rejected ? 0 : island.glow));
        island.scroll.position.y = TOP_Y + 0.62 + Math.sin(elapsed * 2 + i) * 0.03;
        island.group.position.y = island.lift;
        island.decor.forEach(({ hinge }, j) => {
          // L'île de Dylan (celle de la chaîne) garde toujours ses décors debout ; les autres les relèvent à l'arrivée.
          const k = i === SENDER ? 1 : THREE.MathUtils.clamp((unfold * 1.6 - i * 0.06 - j * 0.04) / 0.4, 0, 1);
          hinge.rotation.x = -Math.PI / 2 + (Math.PI / 2) * easeOutBack(k);
          hinge.visible = k > 0;
        });
      });
      routes.forEach((route) => {
        route.material.color.set(route.rejected ? REJECT : route.used ? ACCENT : ROUTE_COLOR);
        // Les liaisons n'apparaissent que sur le réseau : vues depuis la chaîne, elles barreraient le ciel.
        route.material.opacity = (islands[route.a].offline || islands[route.b].offline ? 0.2 : 1) * unfold;
        route.line.visible = unfold > 0.01;
      });
    },
  });

  updateLabels();
  return api;
}
