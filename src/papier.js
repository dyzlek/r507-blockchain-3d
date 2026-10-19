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

// Lien entre deux coffres : une simple corde corail, nouée au flanc de chaque coffre et un peu détendue.
// C'est un repère seulement : la preuve du lien reste le sceau recopié.
// `size` : demi-largeur et demi-profondeur d'un coffre ; `y` : hauteur des nœuds.
const ROPE_R = 0.035;
const knotGeometry = new THREE.SphereGeometry(ROPE_R * 2, 16, 12);
const ropeTexture = () =>
  canvasTexture(64, (g, s) => {
    // Brins torsadés : des rayures en biais, plus claires et plus foncées.
    g.fillStyle = '#ffffff';
    g.fillRect(0, 0, s, s);
    g.strokeStyle = 'rgb(0 0 0 / 22%)';
    g.lineWidth = 6;
    for (let x = -s; x < s * 2; x += 16) {
      g.beginPath();
      g.moveTo(x, 0);
      g.lineTo(x + s, s);
      g.stroke();
    }
  });

export function createRope(from, to, color = COLORS.accent, { y = 0.25, size = [0.8, 0.55], floor = -0.55 } = {}) {
  const direction = to.clone().sub(from).setY(0);
  const length = direction.length();
  direction.normalize();
  // Distance du centre du coffre à son bord, dans la direction du lien (marche aussi en biais, pour la fourche).
  const half = Math.min(size[0] / Math.max(Math.abs(direction.x), 1e-6), size[1] / Math.max(Math.abs(direction.z), 1e-6));
  // Corde droite : nouée vers l'avant des flancs, pour qu'on la voie bien (et la voie tomber une fois coupée).
  const normal = new THREE.Vector3(-direction.z, 0, direction.x);
  const front = Math.abs(direction.x) > 0.95 ? size[1] - 0.15 : 0;
  const middle = from.clone().lerp(to, 0.5).setY(y).addScaledVector(normal, front);
  const gap = length - 2 * half;
  const sag = Math.min(0.25, gap * 0.16);

  // La corde est une petite simulation physique (intégration de Verlet) : des points reliés par des longueurs
  // fixes, tirés vers le bas par la gravité. Les deux bouts sont noués aux coffres. Coupée, chaque moitié
  // retombe et se balance au bout de son nœud ; renouée, elle se retend.
  const COUNT = 25;
  const CUT = Math.floor(COUNT / 2); // le segment entre CUT - 1 et CUT est celui qu'on coupe
  const points = Array.from({ length: COUNT }, (_, k) => {
    const t = k / (COUNT - 1);
    return from
      .clone()
      .addScaledVector(direction, half + gap * t)
      .addScaledVector(normal, front)
      .setY(y - sag * Math.sin(t * Math.PI))
      .sub(middle);
  });
  const previous = points.map((p) => p.clone());
  const rest = points.slice(1).map((p, k) => p.distanceTo(points[k]));
  const ground = floor - y + ROPE_R; // le bureau, dans le repère de la corde
  let broken = false;
  let moving = true;

  const texture = ropeTexture();
  texture.repeat.set(Math.round(gap * 12), 1);
  const material = new THREE.MeshStandardMaterial({ map: texture, color, roughness: 0.9 });
  const group = new THREE.Group();
  group.position.copy(middle);
  const strands = [0, 1].map(() => {
    const mesh = new THREE.Mesh(new THREE.BufferGeometry(), material);
    mesh.castShadow = true;
    group.add(mesh);
    return mesh;
  });
  [0, COUNT - 1].forEach((k) => {
    const knot = new THREE.Mesh(knotGeometry, material);
    knot.position.copy(points[k]);
    knot.castShadow = true;
    group.add(knot);
  });

  function rebuild() {
    // Intacte : un seul brin de bout en bout. Coupée : deux brins, chacun pendu à son nœud.
    const parts = broken ? [points.slice(0, CUT), points.slice(CUT)] : [points, []];
    parts.forEach((part, i) => {
      strands[i].geometry.dispose();
      strands[i].visible = part.length > 1;
      if (part.length > 1) strands[i].geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(part), part.length * 3, ROPE_R, 8);
    });
  }

  const gravity = new THREE.Vector3(0, -9.8, 0);
  const velocity = new THREE.Vector3();
  const delta = new THREE.Vector3();
  function step(h) {
    let energy = 0;
    for (let k = 1; k < COUNT - 1; k++) {
      velocity.subVectors(points[k], previous[k]).multiplyScalar(0.985); // amortissement : l'air freine la corde
      energy += velocity.lengthSq();
      previous[k].copy(points[k]);
      points[k].add(velocity).addScaledVector(gravity, h * h);
    }
    // Les longueurs : plusieurs passes pour que la corde ne s'étire pas.
    for (let pass = 0; pass < 12; pass++) {
      for (let k = 0; k < COUNT - 1; k++) {
        if (broken && k === CUT - 1) continue;
        const a = points[k];
        const b = points[k + 1];
        delta.subVectors(b, a);
        const distance = delta.length() || 1e-6;
        const fix = (distance - rest[k]) / distance;
        const pinA = k === 0;
        const pinB = k + 1 === COUNT - 1;
        if (pinA && pinB) continue;
        const share = pinA || pinB ? 1 : 0.5;
        if (!pinA) a.addScaledVector(delta, fix * share);
        if (!pinB) b.addScaledVector(delta, -fix * share);
      }
      points.forEach((p) => (p.y = Math.max(p.y, ground)));
    }
    return energy;
  }

  // Laisse la corde trouver sa forme de repos dès le départ.
  for (let i = 0; i < 120; i++) step(1 / 60);
  previous.forEach((p, k) => p.copy(points[k]));
  rebuild();
  moving = false;

  group.setColor = (value) => material.color.set(value);
  group.setBroken = (value, brokenColor = 0xb3261e) => {
    material.color.set(value ? brokenColor : color);
    if (value === broken) return;
    broken = value;
    moving = true;
  };
  // `instant` (mouvements réduits) : la corde prend directement sa position finale.
  group.update = (dt, instant) => {
    if (!moving) return;
    let energy = 0;
    const steps = instant ? 240 : 2;
    for (let i = 0; i < steps; i++) energy = step(Math.min(dt, 1 / 30) / (instant ? 1 : 2) || 1 / 60);
    rebuild();
    if (instant || energy < 1e-9) moving = false;
  };
  return group;
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

// Silhouette découpée avec une marge blanche, comme un autocollant de papier (phare, arbre, cabane des îles).
const cutoutCache = new Map();
export function cutoutMaterial(kind) {
  if (!cutoutCache.has(kind)) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const g = canvas.getContext('2d');
    // D'abord le contour blanc épais (la marge découpée aux ciseaux), puis le dessin par-dessus.
    g.lineJoin = 'round';
    g.lineWidth = 16;
    g.strokeStyle = '#fbf7ef';
    DRAWINGS[kind](g, 256, true);
    DRAWINGS[kind](g, 256, false);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    cutoutCache.set(kind, new THREE.MeshStandardMaterial({ map: texture, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 0.9 }));
  }
  return cutoutCache.get(kind);
}

const DRAWINGS = {
  lighthouse(g, s, outline) {
    g.beginPath();
    g.moveTo(s * 0.4, s * 0.92);
    g.lineTo(s * 0.45, s * 0.3);
    g.lineTo(s * 0.55, s * 0.3);
    g.lineTo(s * 0.6, s * 0.92);
    g.closePath();
    if (outline) {
      g.rect(s * 0.41, s * 0.1, s * 0.18, s * 0.2);
      return g.stroke();
    }
    g.fillStyle = '#f4efe6';
    g.fill();
    g.fillStyle = '#c2543a';
    for (const y of [0.42, 0.62, 0.82]) g.fillRect(s * 0.42, s * y, s * 0.16, s * 0.07);
    g.fillStyle = '#3a2f26';
    g.fillRect(s * 0.43, s * 0.2, s * 0.14, s * 0.1);
    g.fillStyle = '#ffd27a';
    g.fillRect(s * 0.455, s * 0.215, s * 0.09, s * 0.07);
    g.beginPath();
    g.moveTo(s * 0.41, s * 0.2);
    g.lineTo(s * 0.5, s * 0.1);
    g.lineTo(s * 0.59, s * 0.2);
    g.closePath();
    g.fillStyle = '#c2543a';
    g.fill();
  },
  tree(g, s, outline) {
    g.beginPath();
    g.arc(s * 0.5, s * 0.42, s * 0.26, 0, Math.PI * 2);
    g.rect(s * 0.46, s * 0.6, s * 0.08, s * 0.32);
    if (outline) return g.stroke();
    g.fillStyle = '#7fa862';
    g.beginPath();
    g.arc(s * 0.5, s * 0.42, s * 0.26, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#6a9150';
    g.beginPath();
    g.arc(s * 0.58, s * 0.48, s * 0.14, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#8a5a35';
    g.fillRect(s * 0.46, s * 0.62, s * 0.08, s * 0.3);
  },
  hut(g, s, outline) {
    g.beginPath();
    g.moveTo(s * 0.2, s * 0.5);
    g.lineTo(s * 0.5, s * 0.22);
    g.lineTo(s * 0.8, s * 0.5);
    g.lineTo(s * 0.74, s * 0.5);
    g.lineTo(s * 0.74, s * 0.92);
    g.lineTo(s * 0.26, s * 0.92);
    g.lineTo(s * 0.26, s * 0.5);
    g.closePath();
    if (outline) return g.stroke();
    g.fillStyle = '#e8d3a8';
    g.fillRect(s * 0.26, s * 0.48, s * 0.48, s * 0.44);
    g.fillStyle = '#c2543a';
    g.beginPath();
    g.moveTo(s * 0.2, s * 0.5);
    g.lineTo(s * 0.5, s * 0.22);
    g.lineTo(s * 0.8, s * 0.5);
    g.closePath();
    g.fill();
    g.fillStyle = '#8a5a35';
    g.fillRect(s * 0.44, s * 0.66, s * 0.12, s * 0.26);
    g.fillStyle = '#ffd27a';
    g.fillRect(s * 0.31, s * 0.58, s * 0.09, s * 0.08);
  },
};

// Une découpe qui se relève, articulée sur son bord bas (rotation.x : -π/2 à plat, 0 debout).
export function createCutout(kind, size) {
  const hinge = new THREE.Group();
  const card = new THREE.Mesh(new THREE.PlaneGeometry(size, size), cutoutMaterial(kind).clone());
  card.position.y = size / 2;
  card.castShadow = true;
  hinge.add(card);
  return { hinge, card };
}

// Le tampon encreur (l'objet) : caoutchouc, socle en bois, manche et pommeau. Le caoutchouc est en y = 0.
export function createStampTool() {
  const tool = new THREE.Group();
  const parts = [
    [new THREE.CylinderGeometry(0.3, 0.3, 0.05, 40), 0x5b3a33, 0.025],
    [new THREE.CylinderGeometry(0.33, 0.33, 0.12, 40), 0xb07a4a, 0.11],
    [new THREE.CylinderGeometry(0.07, 0.09, 0.42, 20), 0xc58a55, 0.38],
    [new THREE.SphereGeometry(0.14, 24, 16), 0xc2543a, 0.64],
  ];
  for (const [geometry, color, y] of parts) {
    const part = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, roughness: 0.6 }));
    part.position.y = y;
    part.castShadow = true;
    tool.add(part);
  }
  tool.visible = false;
  return tool;
}
