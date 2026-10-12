import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { GENESIS_PARENT, shortHash } from './chain.js';

// Un bloc = un coffre de verre : on voit son contenu sans l'ouvrir (l'ouvrir briserait le sceau).
export const COFFRE_SIZE = { w: 1.6, h: 1.1, d: 1.1 };
const { w, h, d } = COFFRE_SIZE;

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xe6f6ff,
  roughness: 0.06,
  transmission: 0.94,
  thickness: 0.35,
  ior: 1.45,
});
const frameMaterial = new THREE.LineBasicMaterial({ color: 0x7cc4ff, transparent: true, opacity: 0.7 });
const scrollMaterial = new THREE.MeshStandardMaterial({ color: 0xf2e6c9, roughness: 0.8 });
const coinSideMaterial = new THREE.MeshStandardMaterial({ color: 0xd9a93a, metalness: 0.8, roughness: 0.3 });

const bodyGeometry = new THREE.BoxGeometry(w, h, d);
const frameGeometry = new THREE.EdgesGeometry(bodyGeometry);
const scrollGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.9, 24);
const coinGeometry = new THREE.CylinderGeometry(0.17, 0.17, 0.05, 40);

function hashBytes(hash) {
  return hash.match(/../g).map((byte) => parseInt(byte, 16));
}

// Sceau : motif et couleurs tirés des octets de l'empreinte. Une empreinte différente donne un sceau différent.
export function sealTexture(hash) {
  const size = 256;
  const r = size / 2;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const g = canvas.getContext('2d');
  const bytes = hashBytes(hash);
  const saturation = hash === GENESIS_PARENT ? 0 : 70;
  const sectors = 12;

  for (let i = 0; i < sectors; i++) {
    g.beginPath();
    g.moveTo(r, r);
    g.arc(r, r, r - 8, (i / sectors) * Math.PI * 2, ((i + 1) / sectors) * Math.PI * 2);
    g.closePath();
    g.fillStyle = `hsl(${(bytes[i] / 256) * 360} ${saturation}% 55%)`;
    g.fill();
  }
  g.beginPath();
  g.arc(r, r, r * 0.4, 0, Math.PI * 2);
  g.fillStyle = `hsl(${(bytes[12] / 256) * 360} ${saturation}% 25%)`;
  g.fill();
  g.lineWidth = 8;
  g.strokeStyle = '#ffffff';
  g.beginPath();
  g.arc(r, r, r - 8, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = '#ffffff';
  g.font = 'bold 40px system-ui, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(hash.slice(0, 4), r, r);

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
  coin.position.set(0.5, -0.3, 0.15);
  contents.add(coin);

  // Sceau du coffre (sa propre empreinte), sur la face avant.
  const seal = new THREE.Mesh(
    new THREE.CircleGeometry(0.3, 48),
    new THREE.MeshStandardMaterial({ map: sealTexture(block.hash), roughness: 0.5 }),
  );
  seal.position.set(0.25, 0.12, d / 2 + 0.005);
  group.add(seal);

  // Sceau du parent, gravé en petit dans le coin gauche (côté du coffre précédent).
  const parentSeal = new THREE.Mesh(
    new THREE.CircleGeometry(0.16, 40),
    new THREE.MeshStandardMaterial({ map: sealTexture(block.parentHash), roughness: 0.6 }),
  );
  parentSeal.position.set(-w / 2 + 0.26, h / 2 - 0.24, d / 2 + 0.005);
  group.add(parentSeal);

  const plate = makeLabel('plate', `Bloc n°${block.index}`);
  plate.position.set(0, h / 2 + 0.3, 0);
  group.add(plate);

  const hint = makeLabel('hint', 'Cliquez sur le coffre');
  hint.position.set(0, -h / 2 - 0.35, 0);
  hint.visible = false;
  group.add(hint);

  // Étiquettes des champs, reliées à leur objet par un trait.
  const fields = [
    { key: 'Données', value: block.data, anchor: scroll.position, at: [-1.2, -0.8, 0.5] },
    { key: 'Nonce', value: block.nonce, anchor: coin.position, at: [1.25, -0.6, 0.4] },
    { key: 'Empreinte (sceau)', value: shortHash(block.hash), anchor: seal.position, at: [1.2, 0.8, 0.6] },
    { key: 'Empreinte du parent', value: shortHash(block.parentHash), anchor: parentSeal.position, at: [-1.3, 0.85, 0.6] },
  ];
  const leaderMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
  const labels = fields.map(({ key, value, anchor, at }) => {
    const label = makeLabel('field', `<span class="field-key">${key}</span><span class="field-value">${value}</span>`);
    label.position.set(...at);
    group.add(label);
    const leader = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([anchor.clone(), new THREE.Vector3(...at)]),
      leaderMaterial,
    );
    group.add(leader);
    return label;
  });

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
      labels.forEach((label) => label.element.classList.toggle('is-visible', value));
    },
    setHint(value) {
      hint.visible = value;
    },
    setHover(value) {
      frame.material.opacity = value ? 1 : 0.7;
    },
    update(dt, elapsed, instant) {
      const target = inspected ? 1 : 0;
      reveal = instant ? target : THREE.MathUtils.damp(reveal, target, 6, dt);
      // Le contenu se soulève légèrement et s'éclaire pendant l'inspection.
      contents.position.y = reveal * (0.18 + Math.sin(elapsed * 2) * 0.03);
      scroll.material.emissive.setRGB(0.25 * reveal, 0.2 * reveal, 0.1 * reveal);
      leaderMaterial.opacity = reveal * 0.6;
    },
  };
}
