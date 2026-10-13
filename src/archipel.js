import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { COFFRE_SIZE, sealTexture } from './coffre.js';

// Le réseau = un archipel. Chaque île est un nœud qui garde sa propre copie de la chaîne.
// Aucune île n'est au centre : chacune n'est reliée qu'à quelques voisines, et la transaction
// d'Alice se propage de proche en proche (gossip).
const ISLANDS = [
  { name: 'Alice', at: [-4.8, 0.5] },
  { name: 'Carla', at: [-2.5, -2.1] },
  { name: 'David', at: [-2.3, 2.3] },
  { name: 'Emma', at: [0.1, -0.1] },
  { name: 'Farid', at: [2.4, -2.3] },
  { name: 'Gaëlle', at: [2.5, 2.2] },
  { name: 'Bob', at: [4.8, -0.1] },
];

// Liaisons entre îles (indices dans ISLANDS). Si on éteint n'importe quelle île (sauf Alice),
// les autres restent reliées : le message trouve toujours un autre chemin.
const ROUTES = [
  [0, 1], [0, 2], [1, 3], [2, 3], [1, 4],
  [3, 4], [3, 5], [2, 5], [4, 6], [5, 6],
];

export const SENDER = 0; // l'île d'Alice
const RECEIVER = 6; // l'île de Bob
const HINT_OFF = 3; // l'île du milieu, la plus tentante à éteindre

const R = 0.95; // rayon d'une île
const GROUND_Y = -COFFRE_SIZE.h / 2;
const TOP_Y = GROUND_Y + 0.3;
const SPEED = 3.2; // vitesse d'un message, en unités par seconde
const VERIFY_DELAY = 0.4; // une île vérifie la transaction avant de la faire suivre
const ACCENT = 0xe0684b;
const ROUTE_COLOR = 0x8f9aab;
const ROCK = 0xaab5c4;
const ROCK_OFF = 0x6f7885;

const baseGeometry = new THREE.CylinderGeometry(R, R * 1.1, 0.3, 48);
const ringGeometry = new THREE.RingGeometry(R - 0.1, R - 0.02, 48);
const scrollGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 16);
const miniGeometry = new THREE.BoxGeometry(0.3, 0.22, 0.22);
const miniEdges = new THREE.EdgesGeometry(miniGeometry);
const miniSealGeometry = new THREE.PlaneGeometry(0.17, 0.17);
const miniLinkGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.12, 6);
const messageGeometry = new THREE.SphereGeometry(0.11, 16, 12);
const haloGeometry = new THREE.SphereGeometry(0.2, 16, 12);

const miniGlass = new THREE.MeshStandardMaterial({ color: 0xd8f0ea, transparent: true, opacity: 0.55, roughness: 0.1 });
const miniFrame = new THREE.LineBasicMaterial({ color: 0x7d8899 });
const miniLink = new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.5 });
const messageMaterial = new THREE.MeshBasicMaterial({ color: ACCENT });
const haloMaterial = new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.3, depthWrite: false });

// Traits épais (Line2) : leur épaisseur est en pixels, il faut leur donner la taille de l'écran.
const routeMaterials = [];
export function setRouteResolution(width, height) {
  routeMaterials.forEach((material) => material.resolution.set(width, height));
}

// « l'île d'Alice », « l'île de Bob »
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
    const box = new THREE.Mesh(miniGeometry, miniGlass);
    box.position.set(x, TOP_Y + 0.11, 0);
    group.add(box);
    const frame = new THREE.LineSegments(miniEdges, miniFrame);
    frame.position.copy(box.position);
    group.add(frame);
    const seal = new THREE.Mesh(miniSealGeometry, sealMaterial);
    seal.position.set(x, TOP_Y + 0.12, 0.111);
    group.add(seal);
    if (i > 0) {
      const link = new THREE.Mesh(miniLinkGeometry, miniLink);
      link.rotation.z = Math.PI / 2;
      link.position.set(x - spacing / 2, TOP_Y + 0.12, 0);
      group.add(link);
    }
  });
  return group;
}

export function createArchipel(chain) {
  const group = new THREE.Group();
  const sealMaterials = chain.map(
    (block) => new THREE.MeshStandardMaterial({ map: sealTexture(block.hash), roughness: 0.45, transparent: true }),
  );

  const islands = ISLANDS.map(({ name, at }, index) => {
    const island = new THREE.Group();
    island.position.set(at[0], 0, at[1]);
    island.userData.island = index;
    group.add(island);

    const base = new THREE.Mesh(baseGeometry, new THREE.MeshStandardMaterial({ color: ROCK, roughness: 0.9 }));
    base.position.y = GROUND_Y + 0.15;
    island.add(base);

    // Anneau corail : l'île a reçu la transaction.
    const ring = new THREE.Mesh(ringGeometry, new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0 }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = TOP_Y + 0.006;
    island.add(ring);

    island.add(createMiniChain(sealMaterials));

    // La transaction reçue flotte au-dessus de la copie de la chaîne : elle n'est pas encore dans un bloc.
    const scroll = new THREE.Mesh(
      scrollGeometry,
      new THREE.MeshStandardMaterial({ color: 0xf2e6c9, roughness: 0.8, emissive: new THREE.Color(0.3, 0.2, 0.1) }),
    );
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

    return { name, index, group: island, base, ring, scroll, plate, hint, neighbors: [], received: false, offline: false, glow: 0, lift: 0 };
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
      mesh.add(new THREE.Mesh(haloGeometry, haloMaterial));
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
      island.base.material.color.set(offline ? ROCK_OFF : ROCK);
      island.hint.visible =
        (hintMode === 'send' && island.index === SENDER) || (hintMode === 'off' && island.index === HINT_OFF);
    });
    islands[SENDER].hint.element.textContent = 'Clique pour envoyer';
    islands[HINT_OFF].hint.element.textContent = 'Clique pour éteindre cette île';
  }

  Object.assign(api, {
    // Envoie la transaction d'Alice (ou la renvoie, en gardant les îles éteintes).
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
    // 'send' : bulle sur l'île d'Alice ; 'off' : bulle sur l'île du milieu ; null : aucune.
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
    update(dt, elapsed, instant) {
      clock += dt;
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
        const t = message.from === message.route.a ? message.t : 1 - message.t;
        message.mesh.position.copy(message.route.curve.getPoint(t));
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
