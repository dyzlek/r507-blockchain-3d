import * as THREE from 'three';
import { GENESIS_PARENT } from './chain.js';

// Direction artistique : une maquette en papier découpé posée sur un bureau.
// Tout est dessiné dans le code (textures générées sur des canvas), sans image externe.

const MONO = '"Courier Prime", ui-monospace, Consolas, monospace';

export const COLORS = {
  kraft: '#c49a6c',
  kraftDark: '#a97f55',
  paper: '#f6f0e4',
  vellum: '#f4f0e6',
  scroll: '#f2e6c9',
  gold: '#d9a93a',
  sea: '#8db4d4',
  sand: '#d9c39a',
  grass: '#9cbf7a',
  grassDark: '#86ad66',
  ink: 0x3a2f26,
  accent: 0xe0684b,
  broken: 0xb3261e,
};

function canvasTexture(size, draw, repeat = 1) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  draw(canvas.getContext('2d'), size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeat, repeat);
  texture.anisotropy = 4;
  return texture;
}

// Papier : une couleur de fond, du grain et quelques fibres. `stripes` ajoute les cannelures du carton.
export function paperTexture(base, { fibers = 160, grain = 0.08, stripes = false, repeat = 1 } = {}) {
  return canvasTexture(
    256,
    (g, s) => {
      g.fillStyle = base;
      g.fillRect(0, 0, s, s);
      for (let i = 0; i < 2600; i++) {
        g.fillStyle = Math.random() < 0.5 ? `rgb(0 0 0 / ${grain * Math.random()})` : `rgb(255 255 255 / ${grain * Math.random()})`;
        g.fillRect(Math.random() * s, Math.random() * s, 1.5, 1.5);
      }
      g.lineWidth = 0.6;
      for (let i = 0; i < fibers; i++) {
        g.strokeStyle = `rgb(90 70 50 / ${0.05 + Math.random() * 0.08})`;
        const x = Math.random() * s;
        const y = Math.random() * s;
        const a = Math.random() * Math.PI;
        g.beginPath();
        g.moveTo(x, y);
        g.quadraticCurveTo(x + Math.cos(a) * 6, y + Math.sin(a) * 6 + 3, x + Math.cos(a) * 12, y + Math.sin(a) * 12);
        g.stroke();
      }
      if (stripes) {
        for (let x = 0; x < s; x += 8) {
          g.fillStyle = 'rgb(70 45 20 / 6%)';
          g.fillRect(x, 0, 3, s);
        }
      }
    },
    repeat,
  );
}

// Matériaux partagés : une seule texture par papier, réutilisée partout (peu de mémoire, rapide sur un poste de TP).
const cache = new Map();
export function paperMaterial(base, options = {}, extra = {}) {
  const key = JSON.stringify([base, options, extra]);
  if (!cache.has(key)) cache.set(key, new THREE.MeshStandardMaterial({ map: paperTexture(base, options), roughness: 0.92, ...extra }));
  return cache.get(key);
}
export const cardboard = () => paperMaterial(COLORS.kraft, { stripes: true });
export const cardboardDark = () => paperMaterial(COLORS.kraftDark, { stripes: true });

function hashBytes(hash) {
  return hash.match(/../g).map((byte) => parseInt(byte, 16));
}

// Sceau = coup de tampon encreur. La teinte, les rayons et le texte viennent des octets du vrai hash :
// une empreinte différente donne un tampon différent. Le bloc de genèse n'a pas de parent (encre grise).
export function stampTexture(hash) {
  return canvasTexture(256, (g, s) => {
    const c = s / 2;
    const bytes = hashBytes(hash);
    // Les premiers octets valent toujours 00 (difficulté du minage) : la teinte vient du dernier.
    const hue = (bytes[31] / 256) * 360;
    const ink = hash === GENESIS_PARENT ? 'hsl(30 8% 40%)' : `hsl(${hue} 62% 38%)`;
    g.strokeStyle = g.fillStyle = ink;
    g.lineCap = 'round';
    // Double anneau tremblé, comme un tampon pas tout à fait à plat.
    for (const [r, width] of [[112, 10], [92, 4]]) {
      for (let i = 0; i < 90; i++) {
        const a0 = (i / 90) * Math.PI * 2;
        g.lineWidth = width * (0.7 + Math.random() * 0.6);
        g.beginPath();
        g.arc(c, c, r + (Math.random() - 0.5) * 2, a0, a0 + 0.09);
        g.stroke();
      }
    }
    // Rayons : leur longueur suit les octets de l'empreinte.
    g.lineWidth = 7;
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const outer = 50 + (bytes[i + 2] / 255) * 34;
      g.beginPath();
      g.moveTo(c + Math.cos(a) * 42, c + Math.sin(a) * 42);
      g.lineTo(c + Math.cos(a) * outer, c + Math.sin(a) * outer);
      g.stroke();
    }
    g.font = `700 40px ${MONO}`;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(hash.slice(0, 4), c, c + 2);
    // Encre irrégulière : on retire de petits points au hasard.
    g.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 700; i++) {
      g.fillStyle = `rgb(0 0 0 / ${0.3 + Math.random() * 0.7})`;
      g.beginPath();
      g.arc(Math.random() * s, Math.random() * s, Math.random() * 1.8, 0, Math.PI * 2);
      g.fill();
    }
  });
}

// Pièce en carton doré, avec le nonce écrit à la machine.
export function coinTexture(nonce) {
  return canvasTexture(128, (g, s) => {
    g.fillStyle = COLORS.gold;
    g.fillRect(0, 0, s, s);
    g.strokeStyle = 'rgb(74 51 5 / 45%)';
    g.lineWidth = 4;
    g.beginPath();
    g.arc(s / 2, s / 2, s / 2 - 10, 0, Math.PI * 2);
    g.stroke();
    g.fillStyle = '#4a3305';
    g.font = `700 ${String(nonce).length > 3 ? 30 : 40}px ${MONO}`;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(String(nonce), s / 2, s / 2 + 2);
  });
}

// Ruban adhésif corail entre deux coffres : c'est le lien de la chaîne (un repère, la preuve reste le sceau).
// Une bande de papier verticale, tendue entre les deux points, à mi-hauteur des coffres.
const tapeTexture = () => paperTexture('#ffffff', { fibers: 60, grain: 0.12 });
export function createTape(from, to, color = COLORS.accent, { width, y = 0.1 } = {}) {
  const direction = to.clone().sub(from).setY(0);
  const length = width ?? direction.length();
  const tape = new THREE.Mesh(
    new THREE.BoxGeometry(length, 0.17, 0.012),
    new THREE.MeshStandardMaterial({ map: tapeTexture(), color, roughness: 0.75, transparent: true, opacity: 0.9 }),
  );
  tape.position.copy(from).add(to).multiplyScalar(0.5).setY(y);
  tape.rotation.y = -Math.atan2(direction.z, direction.x);
  tape.castShadow = true;
  return tape;
}

// Avion en papier : quatre triangles pliés (pointe vers +z).
export function paperPlaneGeometry(scale = 1) {
  const geometry = new THREE.BufferGeometry();
  const v = [0, 0, 0.32, -0.2, 0.02, -0.2, 0, 0, -0.2, 0, 0, 0.32, 0, 0, -0.2, 0.2, 0.02, -0.2, 0, 0, 0.32, 0, -0.07, -0.2, 0, 0, -0.2].map((n) => n * scale);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
  geometry.computeVertexNormals();
  return geometry;
}

// Disque de papier découpé aux ciseaux (bord irrégulier), posé à plat.
export function noisyDisc(radius, seed, depth = 0.1) {
  const shape = new THREE.Shape();
  for (let i = 0; i <= 40; i++) {
    const a = (i / 40) * Math.PI * 2;
    const r = radius * (1 + 0.07 * Math.sin(a * 3 + seed) + 0.04 * Math.sin(a * 7 + seed * 2));
    if (i === 0) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 4 });
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

// Feuille froissée : un plan à facettes, toujours au-dessus du bureau.
export function crumpledSheet(width, height, segments = 36) {
  const geometry = new THREE.PlaneGeometry(width, height, segments, Math.round((segments * height) / width));
  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const edge = Math.min(1, (width / 2 - Math.abs(x)) * 2, (height / 2 - Math.abs(y)) * 2);
    const bump = Math.sin(x * 3.1 + y * 1.7) * 0.025 + Math.sin(x * 7.3 - y * 5.1) * 0.015 + (Math.random() - 0.5) * 0.02;
    pos.setZ(i, bump * Math.max(0, edge) + 0.05);
  }
  geometry.computeVertexNormals();
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}
