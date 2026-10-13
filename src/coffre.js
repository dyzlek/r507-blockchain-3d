import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { GENESIS_PARENT, shortHash } from './chain.js';

// Un bloc = un coffre de verre : on voit son contenu sans l'ouvrir (l'ouvrir briserait le sceau).
export const COFFRE_SIZE = { w: 1.6, h: 1.1, d: 1.1 };
const { w, h, d } = COFFRE_SIZE;

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xd8f0ea,
  roughness: 0.06,
  transmission: 0.94,
  thickness: 0.35,
  ior: 1.45,
});
const frameMaterial = new THREE.LineBasicMaterial({ color: 0x7d8899, transparent: true, opacity: 0.9 });
const scrollMaterial = new THREE.MeshStandardMaterial({ color: 0xf2e6c9, roughness: 0.8 });
const coinSideMaterial = new THREE.MeshStandardMaterial({ color: 0xd9a93a, metalness: 0.8, roughness: 0.3 });

const bodyGeometry = new THREE.BoxGeometry(w, h, d);
const frameGeometry = new THREE.EdgesGeometry(bodyGeometry);
const scrollGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.9, 24);
const coinGeometry = new THREE.CylinderGeometry(0.17, 0.17, 0.05, 40);

// Traits épais (Line2) : leur épaisseur est en pixels, il faut leur donner la taille de l'écran.
const leaderMaterials = [];
export function setLeaderResolution(width, height) {
  leaderMaterials.forEach((material) => material.resolution.set(width, height));
}

function hashBytes(hash) {
  return hash.match(/../g).map((byte) => parseInt(byte, 16));
}

// Sceau de cire : la teinte, le bord irrégulier et les rayons gravés sont tirés des octets de l'empreinte.
// Une empreinte différente donne un sceau différent ; le bloc de genèse n'a pas de parent (cire grise).
export function sealTexture(hash) {
  const size = 256;
  const c = size / 2;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const g = canvas.getContext('2d');
  const bytes = hashBytes(hash);
  // Les premiers octets valent toujours 00 (difficulté du minage) : la teinte vient du dernier.
  const hue = (bytes[31] / 256) * 360;
  const sat = hash === GENESIS_PARENT ? 0 : 58;
  const wax = (l) => `hsl(${hue} ${sat}% ${l}%)`;

  // Bord coulé, irrégulier.
  g.beginPath();
  for (let i = 0; i <= 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    const r = c - 14 + (bytes[i % 32] / 255) * 12;
    g.lineTo(c + Math.cos(a) * r, c + Math.sin(a) * r);
  }
  g.closePath();
  g.fillStyle = wax(36);
  g.fill();

  // Empreinte pressée au centre.
  const gradient = g.createRadialGradient(c - 20, c - 20, 10, c, c, 92);
  gradient.addColorStop(0, wax(52));
  gradient.addColorStop(1, wax(32));
  g.beginPath();
  g.arc(c, c, 88, 0, Math.PI * 2);
  g.fillStyle = gradient;
  g.fill();
  g.lineWidth = 4;
  g.strokeStyle = wax(24);
  g.stroke();

  // Rayons gravés : leur longueur suit les octets suivants.
  g.strokeStyle = wax(22);
  g.lineCap = 'round';
  g.lineWidth = 5;
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const inner = 46;
    const outer = inner + 8 + (bytes[i + 2] / 255) * 30;
    g.beginPath();
    g.moveTo(c + Math.cos(a) * inner, c + Math.sin(a) * inner);
    g.lineTo(c + Math.cos(a) * outer, c + Math.sin(a) * outer);
    g.stroke();
  }

  g.fillStyle = wax(18);
  g.font = '500 34px "Fira Mono", ui-monospace, monospace';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(hash.slice(0, 4), c, c + 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function coinTexture(nonce) {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const g = canvas.getContext('2d');
  g.fillStyle = '#d9a93a';
  g.fillRect(0, 0, size, size);
  g.fillStyle = '#4a3305';
  g.font = `bold ${nonce > 999 ? 30 : 40}px system-ui, sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(String(nonce), size / 2, size / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeLabel(className, html) {
  const el = document.createElement('div');
  el.className = className;
  el.innerHTML = html;
  return new CSS2DObject(el);
}

export function createCoffre(block) {
  const group = new THREE.Group();

  const body = new THREE.Mesh(bodyGeometry, glassMaterial);
  body.castShadow = true;
  group.add(body);
  const frame = new THREE.LineSegments(frameGeometry, frameMaterial.clone());
  group.add(frame);

  // Contenu visible à travers le verre.
  const contents = new THREE.Group();
  group.add(contents);
  const scroll = new THREE.Mesh(scrollGeometry, scrollMaterial.clone());
  scroll.rotation.z = Math.PI / 2;
  scroll.position.set(-0.2, -0.36, 0);
  contents.add(scroll);
  const coinFace = new THREE.MeshStandardMaterial({ map: coinTexture(block.nonce), metalness: 0.6, roughness: 0.35 });
  const coin = new THREE.Mesh(coinGeometry, [coinSideMaterial, coinFace, coinFace]);
  coin.rotation.x = Math.PI / 2;
  coin.position.set(0.58, -0.3, 0.15);
  contents.add(coin);

  // Sceau du coffre (sa propre empreinte), sur la face avant.
  const seal = new THREE.Mesh(
    new THREE.PlaneGeometry(0.62, 0.62),
    new THREE.MeshStandardMaterial({ map: sealTexture(block.hash), roughness: 0.45, transparent: true }),
  );
  seal.position.set(0.18, 0.16, d / 2 + 0.005);
  group.add(seal);

  // Sceau du parent, gravé en petit dans le coin gauche (côté du coffre précédent).
  const parentSeal = new THREE.Mesh(
    new THREE.PlaneGeometry(0.34, 0.34),
    new THREE.MeshStandardMaterial({ map: sealTexture(block.parentHash), roughness: 0.5, transparent: true }),
  );
  parentSeal.position.set(-w / 2 + 0.26, h / 2 - 0.24, d / 2 + 0.005);
  group.add(parentSeal);

  // Anneaux corail autour des sceaux, allumés quand on compare un sceau à sa copie chez le suivant.
  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xe0684b, transparent: true, opacity: 0, depthTest: false });
  const makeRing = (inner, outer, at) => {
    const ring = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 48), ringMaterial);
    ring.position.copy(at);
    ring.position.z += 0.01;
    ring.renderOrder = 9;
    group.add(ring);
  };
  makeRing(0.34, 0.4, seal.position);
  makeRing(0.19, 0.23, parentSeal.position);
  let glow = 0;
  let glowTarget = 0;

  const plate = makeLabel('plate', `Bloc n°${block.index}`);
  plate.position.set(0, h / 2 + 0.3, 0);
  group.add(plate);

  const hint = makeLabel('hint', 'Clique sur le coffre');
  hint.position.set(0, -h / 2 - 0.35, 0);
  hint.visible = false;
  group.add(hint);

  // Étiquettes des champs : un trait épais relie chaque étiquette à une pastille posée sur l'objet.
  // `offset` place la pastille sur la face visible de l'objet.
  const fields = [
    { key: 'Données', value: block.data, target: scroll, offset: [0.1, 0, 0.13], at: [-1.2, -0.85, 0.5] },
    { key: 'Nonce', value: block.nonce, target: coin, offset: [0, 0, 0.03], at: [1.3, -0.7, 0.4] },
    { key: 'Empreinte (sceau)', value: shortHash(block.hash), target: seal, offset: [0, 0, 0.01], at: [1.25, 0.85, 0.6] },
    { key: 'Empreinte du parent', value: shortHash(block.parentHash), target: parentSeal, offset: [0, 0, 0.01], at: [-1.35, 0.9, 0.6] },
  ];
  const leaderMaterial = new LineMaterial({ color: 0xe0684b, linewidth: 3, transparent: true, opacity: 0, depthTest: false });
  leaderMaterials.push(leaderMaterial);
  const leaders = fields.map(({ key, value, target, offset, at }) => {
    const label = makeLabel('field', `<span class="field-key">${key}</span><span class="field-value">${value}</span>`);
    label.position.set(...at);
    group.add(label);
    const dot = makeLabel('anchor', '');
    group.add(dot);
    const line = new Line2(new LineGeometry(), leaderMaterial);
    line.renderOrder = 10; // dessiné par-dessus le verre
    group.add(line);
    return { label, dot, line, target, offset: new THREE.Vector3(...offset), end: new THREE.Vector3(...at) };
  });
  const anchor = new THREE.Vector3();

  // Recalcule la position des pastilles et des traits (le contenu bouge pendant l'inspection).
  function updateLeaders() {
    for (const leader of leaders) {
      anchor.copy(leader.target.position).add(leader.offset);
      if (leader.target.parent === contents) anchor.add(contents.position);
      leader.dot.position.copy(anchor);
      leader.line.geometry.setPositions([anchor.x, anchor.y, anchor.z, leader.end.x, leader.end.y, leader.end.z]);
    }
  }
  updateLeaders();

  let inspected = false;
  let reveal = 0; // 0 = fermé, 1 = champs affichés

  return {
    block,
    group,
    hitMesh: body,
    get inspected() {
      return inspected;
    },
    setInspected(value) {
      inspected = value;
      leaders.forEach(({ label, dot }) => {
        label.element.classList.toggle('is-visible', value);
        dot.element.classList.toggle('is-visible', value);
      });
    },
    setHint(value) {
      hint.visible = value;
    },
    setGlow(value, color = 0xe0684b) {
      glowTarget = value ? 1 : 0;
      ringMaterial.color.set(color);
    },
    // Affiche un contenu falsifié (ou remet l'original avec `null`) : nouveau sceau et nouvelles étiquettes.
    setShown(shown) {
      const { data, hash } = shown ?? block;
      const text = (i, value) => (leaders[i].label.element.querySelector('.field-value').textContent = value);
      text(0, data);
      text(2, shortHash(hash));
      seal.material.map.dispose();
      seal.material.map = sealTexture(hash);
      seal.material.needsUpdate = true;
      plate.element.classList.toggle('is-broken', Boolean(shown));
      plate.element.textContent = shown ? `Bloc n°${block.index} · falsifié` : `Bloc n°${block.index}`;
    },
    setHover(value) {
      frame.material.opacity = value ? 1 : 0.9;
      frame.material.color.set(value ? 0xe0684b : 0x7d8899);
    },
    update(dt, elapsed, instant) {
      const target = inspected ? 1 : 0;
      reveal = instant ? target : THREE.MathUtils.damp(reveal, target, 6, dt);
      // Le contenu se soulève légèrement et s'éclaire pendant l'inspection.
      contents.position.y = reveal * (0.1 + Math.sin(elapsed * 2) * 0.02);
      scroll.material.emissive.setRGB(0.25 * reveal, 0.2 * reveal, 0.1 * reveal);
      leaderMaterial.opacity = reveal;
      glow = instant ? glowTarget : THREE.MathUtils.damp(glow, glowTarget, 6, dt);
      ringMaterial.opacity = glow * (0.75 + Math.sin(elapsed * 4) * 0.2);
      if (reveal > 0.001) updateLeaders();
    },
  };
}
