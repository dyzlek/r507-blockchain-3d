import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { COFFRE_SIZE, sealTexture } from './coffre.js';
import { COLORS, cardboard, createCutout, crumpledSheet, noisyDisc, paperMaterial, paperPlaneGeometry } from './papier.js';

// Le réseau = un archipel en papier découpé, posé sur une mer de papier froissé.
// Chaque île est un nœud qui garde sa propre copie de la chaîne.
// Aucune île n'est au centre : chacune n'est reliée qu'à quelques voisines, et la transaction
// de Dylan se propage de proche en proche (gossip).
export const ISLANDS = [
  { name: 'Dylan', at: [-4.8, 0.5] },
  { name: 'Nicolas', at: [-2.5, -2.1] },
  { name: 'Pierre', at: [-2.3, 2.3] },
  { name: 'Thomas', at: [0.1, -0.1] },
  { name: 'Julien', at: [2.4, -2.3] },
  { name: 'Lucas', at: [2.5, 2.2] },
  { name: 'Maxens', at: [4.8, -0.1] },
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

const R = 0.95; // rayon d'une île
const GROUND_Y = -COFFRE_SIZE.h / 2;
export const TOP_Y = GROUND_Y + 0.3;
const SPEED = 3.2; // vitesse d'un message, en unités par seconde
const VERIFY_DELAY = 0.4; // une île vérifie la transaction avant de la faire suivre
const ACCENT = 0xe0684b;
const ROUTE_COLOR = 0x8a7560; // pointillés au crayon
const ROCK = 0xffffff; // teinte des papiers de l'île (multiplie la texture)
const ROCK_OFF = 0x8d8d8d; // île éteinte : papier grisé

// Une île = trois feuilles découpées empilées (sable, herbe, herbe foncée) ; le dessus est à TOP_Y.
const LAYERS = [
  { r: R * 1.12, color: COLORS.sand },
  { r: R * 1.0, color: COLORS.grass },
  { r: R * 0.92, color: COLORS.grassDark },
];
const LAYER_DEPTH = 0.1;

// Décor de chaque île, en découpes qui se relèvent à l'arrivée sur l'archipel : [type, taille, x, z, rotation].
// Il ne sert qu'à rendre les îles reconnaissables ; toutes jouent exactement le même rôle dans le réseau.
const DECOR = [
  [['hut', 0.6, -0.45, -0.5, 0.3], ['tree', 0.7, 0.5, -0.45, -0.3]],
  [['tree', 0.75, -0.4, -0.5, 0.25], ['tree', 0.55, 0.45, -0.45, -0.35]],
  [['lighthouse', 1.1, -0.45, -0.45, 0.25], ['tree', 0.6, 0.5, -0.5, -0.3]],
  [['tree', 0.7, -0.5, -0.45, 0.3], ['hut', 0.55, 0.45, -0.5, -0.25]],
  [['lighthouse', 1.1, 0.4, -0.5, -0.25]],
  [['tree', 0.6, -0.45, -0.5, 0.3], ['tree', 0.75, 0.4, -0.45, -0.2]],
  [['lighthouse', 1.1, -0.4, -0.5, 0.2], ['hut', 0.55, 0.5, -0.45, -0.3]],
];
const easeOutBack = (t) => 1 + 2.4 * (t - 1) ** 3 + 1.4 * (t - 1) ** 2;
const ringGeometry = new THREE.RingGeometry(R - 0.1, R - 0.02, 48);
const scrollGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16);
const miniGeometry = new THREE.BoxGeometry(0.3, 0.22, 0.22);
const miniSealGeometry = new THREE.PlaneGeometry(0.17, 0.17);
const miniLinkGeometry = new THREE.BoxGeometry(0.14, 0.05, 0.006);
// Les messages sont des avions en papier.
const messageGeometry = paperPlaneGeometry(1.2);
const messageMaterial = paperMaterial(COLORS.paper, { fibers: 40 }, { side: THREE.DoubleSide, flatShading: true });
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

// Copie de la chaîne posée sur une île : mêmes blocs, mêmes sceaux que la grande chaîne.
function createMiniChain(sealMaterials) {
  const group = new THREE.Group();
  const spacing = 0.42;
  sealMaterials.forEach((sealMaterial, i) => {
    const x = (i - (sealMaterials.length - 1) / 2) * spacing;
    const box = new THREE.Mesh(miniGeometry, cardboard());
    box.position.set(x, TOP_Y + 0.11, 0);
    box.castShadow = true;
    group.add(box);
    const seal = new THREE.Mesh(miniSealGeometry, sealMaterial);
    seal.position.set(x, TOP_Y + 0.12, 0.111);
    group.add(seal);
    if (i > 0) {
      const link = new THREE.Mesh(miniLinkGeometry, miniLink);
      link.position.set(x - spacing / 2, TOP_Y + 0.12, 0.08);
      group.add(link);
    }
  });
  return group;
}

export function createArchipel(chain) {
  const group = new THREE.Group();
  const sealMaterials = chain.map(
    (block) => new THREE.MeshStandardMaterial({ map: sealTexture(block.hash), roughness: 0.9, transparent: true, polygonOffset: true, polygonOffsetFactor: -2 }),
  );

  // La mer : une grande feuille bleue froissée sous tout l'archipel.
  const sea = new THREE.Mesh(
    crumpledSheet(14, 9.5, 48),
    new THREE.MeshStandardMaterial({ map: paperMaterial(COLORS.sea, { fibers: 120, repeat: 3 }).map, roughness: 0.95, flatShading: true }),
  );
  sea.position.y = GROUND_Y;
  sea.rotation.y = 0.03;
  sea.receiveShadow = true;
  group.add(sea);

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

    island.add(createMiniChain(sealMaterials));

    const decor = DECOR[index].map(([kind, size, x, z, rotY]) => {
      const { hinge, card } = createCutout(kind, size * 1.35);
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

    return { name, index, group: island, base, layers, decor, ring, scroll, plate, hint, neighbors: [], received: false, offline: false, glow: 0, lift: 0 };
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
    routeMaterials.push(material);
    const geometry = new LineGeometry();
    geometry.setPositions(curve.getPoints(32).flatMap((p) => [p.x, p.y, p.z]));
    const line = new Line2(geometry, material);
    line.computeLineDistances();
    group.add(line);

    const route = { a, b, curve, material, duration: curve.getLength() / SPEED, used: false };
    islands[a].neighbors.push({ to: b, route });
    islands[b].neighbors.push({ to: a, route });
    return route;
  });

  let clock = 0;
  let sent = false;
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
      const mesh = new THREE.Mesh(messageGeometry, messageMaterial);
      mesh.castShadow = true;
      group.add(mesh);
      messages.push({ route, from, to, t: 0, mesh });
    }
  }

  // Une île qui a déjà la transaction ignore le doublon.
  function arrive({ route, to }) {
    if (!islands[to].offline && !islands[to].received) receive(to, route);
  }

  function updateLabels() {
    islands.forEach((island) => {
      const { plate, name, offline, received } = island;
      plate.element.textContent = `Île ${of(name)}${offline ? ' · éteinte' : ''}`;
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
    send(instant) {
      clearMessages();
      islands.forEach((island) => (island.received = false));
      routes.forEach((route) => (route.used = false));
      sent = true;
      if (instant) {
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
        island.offline = false;
      });
      routes.forEach((route) => (route.used = false));
      sent = false;
      running = false;
      updateLabels();
    },
    toggleOffline(index) {
      if (index === SENDER) return;
      const island = islands[index];
      island.offline = !island.offline;
      island.received = false;
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
        received: names((island) => island.received),
        offline: names((island) => island.offline),
        unreached: names((island) => !island.offline && !island.received),
        bobReceived: islands[RECEIVER].received,
      };
    },
    // Arrivée sur l'archipel : les décors se relèvent un à un ; au départ, ils se replient.
    setOpen(value) {
      unfoldTarget = value ? 1 : 0;
    },
    update(dt, elapsed, instant) {
      clock += dt;
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
        island.glow = damp(island.glow, island.received ? 1 : 0);
        island.lift = damp(island.lift, island.offline ? -0.2 : 0);
        island.ring.material.opacity = island.glow * (0.75 + Math.sin(elapsed * 4) * 0.2);
        island.scroll.scale.setScalar(Math.max(0.001, island.glow));
        island.scroll.position.y = TOP_Y + 0.62 + Math.sin(elapsed * 2 + i) * 0.03;
        island.group.position.y = island.lift;
        island.decor.forEach(({ hinge }, j) => {
          const k = THREE.MathUtils.clamp((unfold - 0.2 - i * 0.06 - j * 0.08) / 0.35, 0, 1);
          hinge.rotation.x = -Math.PI / 2 + (Math.PI / 2) * easeOutBack(k);
          hinge.visible = k > 0;
        });
      });
      routes.forEach((route) => {
        route.material.color.set(route.used ? ACCENT : ROUTE_COLOR);
        route.material.opacity = islands[route.a].offline || islands[route.b].offline ? 0.2 : 1;
      });
    },
  });

  updateLabels();
  return api;
}
