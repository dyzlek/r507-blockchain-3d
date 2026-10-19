import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { GENESIS_PARENT, mine, shortHash } from './chain.js';

// Aperçu de la direction artistique « maquette en papier découpé » (page à part, l'application n'est pas touchée).
// Tout est dessiné dans le code : textures de papier et de carton générées sur des canvas, aucune image externe.
// Le coffre garde son idée clé : on voit dedans sans l'ouvrir, ici à travers une fenêtre en papier calque.

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const DESK = 0xe9dfcc;

// --- Rendu ---
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.prepend(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.className = 'labels';
document.body.appendChild(labelRenderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(DESK);
scene.fog = new THREE.Fog(DESK, 11, 22); // le bord du bureau se fond dans le fond

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 60);
camera.position.set(0.2, 4.6, 7);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0.1, 0.3, 0);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 14;
controls.maxPolarAngle = Math.PI * 0.45;

// Lumière chaude de lampe de bureau, en haut à gauche, et ombres douces.
scene.add(new THREE.HemisphereLight(0xfff4e2, 0xc9b89f, 2.1));
const lamp = new THREE.SpotLight(0xffe2b8, 70, 40, Math.PI / 3.2, 0.9, 1.4);
lamp.position.set(-5, 9, 5);
lamp.target.position.set(0.3, 0, 0);
lamp.castShadow = true;
lamp.shadow.mapSize.set(2048, 2048);
lamp.shadow.radius = 6;
lamp.shadow.bias = -0.0004;
scene.add(lamp, lamp.target);

// --- Textures de papier ---
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
function paper(base, { fibers = 160, grain = 0.08, stripes = false, repeat = 1 } = {}) {
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

const cardboard = new THREE.MeshStandardMaterial({ map: paper('#c49a6c', { stripes: true }), roughness: 0.95 });
const cardboardDark = new THREE.MeshStandardMaterial({ map: paper('#a97f55', { stripes: true }), roughness: 0.95 });
const whitePaper = new THREE.MeshStandardMaterial({ map: paper('#f6f0e4'), roughness: 0.9, side: THREE.DoubleSide });

// Bureau : une grande feuille posée, qui reçoit les ombres.
const desk = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshStandardMaterial({ map: paper('#e9dfcc', { repeat: 10, fibers: 90 }), roughness: 1 }));
desk.rotation.x = -Math.PI / 2;
desk.receiveShadow = true;
scene.add(desk);

// --- Sceau = coup de tampon encreur, tiré du vrai hash ---
function hashBytes(hash) {
  return hash.match(/../g).map((byte) => parseInt(byte, 16));
}

function stampTexture(hash) {
  return canvasTexture(256, (g, s) => {
    const c = s / 2;
    const bytes = hashBytes(hash);
    // Comme dans l'application : la teinte vient du dernier octet (les premiers valent 00 à cause de la difficulté).
    const hue = (bytes[31] / 256) * 360;
    const ink = hash === GENESIS_PARENT ? 'hsl(30 8% 38%)' : `hsl(${hue} 58% 36%)`;
    g.strokeStyle = g.fillStyle = ink;
    g.lineCap = 'round';
    // Double anneau tremblé, comme un tampon pas tout à fait à plat.
    for (const [r, w] of [[112, 9], [92, 4]]) {
      for (let i = 0; i < 90; i++) {
        const a0 = (i / 90) * Math.PI * 2;
        g.lineWidth = w * (0.7 + Math.random() * 0.6);
        g.beginPath();
        g.arc(c, c, r + (Math.random() - 0.5) * 2, a0, a0 + 0.09);
        g.stroke();
      }
    }
    // Rayons : leur longueur suit les octets de l'empreinte.
    g.lineWidth = 6;
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const outer = 50 + (bytes[i + 2] / 255) * 34;
      g.beginPath();
      g.moveTo(c + Math.cos(a) * 42, c + Math.sin(a) * 42);
      g.lineTo(c + Math.cos(a) * outer, c + Math.sin(a) * outer);
      g.stroke();
    }
    g.font = '700 38px "Courier Prime", monospace';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(hash.slice(0, 4), c, c + 2);
    // Encre irrégulière : on retire de petits points au hasard.
    g.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 900; i++) {
      g.fillStyle = `rgb(0 0 0 / ${0.3 + Math.random() * 0.7})`;
      g.beginPath();
      g.arc(Math.random() * s, Math.random() * s, Math.random() * 1.8, 0, Math.PI * 2);
      g.fill();
    }
  });
}

function textCard(text, { width = 256, height = 128, font = '700 44px "Courier Prime", monospace', color = '#4a3305', bg = '#d9a93a' } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const g = canvas.getContext('2d');
  g.fillStyle = bg;
  g.fillRect(0, 0, width, height);
  g.fillStyle = color;
  g.font = font;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, width / 2, height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeTag(text) {
  const el = document.createElement('div');
  el.className = 'tag';
  el.textContent = text;
  return new CSS2DObject(el);
}

// --- Coffre en carton à fenêtre de calque ---
const W = 1.5;
const H = 1;
const D = 1;
const T = 0.03; // épaisseur du carton
const LID_Y = H + T;

function createPaperCoffre(block) {
  const group = new THREE.Group();
  const shadowed = (mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  };
  const panel = (w, h, d, x, y, z, material = cardboard) => {
    const mesh = shadowed(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material));
    mesh.position.set(x, y, z);
    group.add(mesh);
    return mesh;
  };
  panel(W, H, T, 0, H / 2, -D / 2 + T / 2);
  panel(T, H, D, -W / 2 + T / 2, H / 2, 0);
  panel(T, H, D, W / 2 - T / 2, H / 2, 0);
  panel(W, T, D, 0, T / 2, 0);
  const lid = panel(W + 0.08, T * 1.6, D + 0.08, 0, LID_Y, 0, cardboardDark);

  // Face avant : un cadre de carton découpé, avec une fenêtre en calque.
  const margin = 0.16;
  const shape = new THREE.Shape();
  shape.moveTo(-W / 2, 0).lineTo(W / 2, 0).lineTo(W / 2, H).lineTo(-W / 2, H).lineTo(-W / 2, 0);
  const hole = new THREE.Path();
  hole.moveTo(-W / 2 + margin, margin).lineTo(-W / 2 + margin, H - margin).lineTo(W / 2 - margin, H - margin).lineTo(W / 2 - margin, margin).lineTo(-W / 2 + margin, margin);
  shape.holes.push(hole);
  const frameGeometry = new THREE.ExtrudeGeometry(shape, { depth: T, bevelEnabled: false });
  frameGeometry.attributes.uv.array.forEach((v, i, uv) => (uv[i] = v * 0.6)); // le grain du carton à la bonne échelle
  const frame = shadowed(new THREE.Mesh(frameGeometry, cardboard));
  frame.position.z = D / 2 - T;
  group.add(frame);

  const vellum = new THREE.Mesh(
    new THREE.PlaneGeometry(W - margin * 2, H - margin * 2),
    new THREE.MeshStandardMaterial({
      map: paper('#f4f0e6', { fibers: 220, grain: 0.05 }),
      transparent: true,
      opacity: 0.72,
      roughness: 0.85,
      emissive: new THREE.Color(0xffc98a),
      emissiveIntensity: 0,
      depthWrite: false,
    }),
  );
  vellum.position.set(0, H / 2, D / 2 - T / 2);
  group.add(vellum);

  // Contenu : le rouleau de la transaction et la pièce du nonce, en papier et carton doré.
  const scroll = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.8, 24), new THREE.MeshStandardMaterial({ map: paper('#f2e6c9'), roughness: 0.9 })));
  scroll.rotation.z = Math.PI / 2;
  scroll.position.set(-0.15, 0.16, 0.05);
  group.add(scroll);
  const coinFace = new THREE.MeshStandardMaterial({ map: textCard(String(block.nonce)), roughness: 0.6, metalness: 0.2 });
  const coinSide = new THREE.MeshStandardMaterial({ color: 0xd9a93a, roughness: 0.6 });
  const coin = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.04, 32), [coinSide, coinFace, coinFace]));
  coin.rotation.x = Math.PI / 2;
  coin.position.set(0.45, 0.2, 0.15);
  group.add(coin);

  // La « lampe du coffre » : une ampoule chaude qui rend le calque lisible.
  const bulb = new THREE.PointLight(0xffc98a, 0, 2.4, 1.5);
  bulb.position.set(0, 0.7, 0);
  group.add(bulb);

  // Tampons sur le couvercle : le sien (grand) et celui du coffre d'avant (petit), un peu de travers.
  const stampMaterial = (hash) =>
    new THREE.MeshStandardMaterial({ map: stampTexture(hash), transparent: true, roughness: 0.95, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });
  const lidTop = LID_Y + T * 0.8 + 0.002;
  const imprint = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.62), stampMaterial(block.hash));
  imprint.rotation.set(-Math.PI / 2, 0, (Math.random() - 0.5) * 0.4);
  imprint.position.set(0.22, lidTop, 0.04);
  group.add(imprint);
  const parentImprint = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), stampMaterial(block.parentHash));
  parentImprint.rotation.set(-Math.PI / 2, 0, (Math.random() - 0.5) * 0.5);
  parentImprint.position.set(-W / 2 + 0.26, lidTop, D / 2 - 0.24);
  group.add(parentImprint);

  const tag = makeTag(`bloc n°${block.index}`);
  tag.position.set(0, LID_Y + 0.35, -D / 2);
  group.add(tag);

  return { block, group, lid, vellum, bulb, imprint, lidTop, light: 0 };
}

// --- Le tampon (l'objet) qui vient s'imprimer ---
function createStampTool() {
  const tool = new THREE.Group();
  const rubber = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 40), new THREE.MeshStandardMaterial({ color: 0x5b3a33, roughness: 0.8 }));
  rubber.position.y = 0.025;
  const wood = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.12, 40), new THREE.MeshStandardMaterial({ color: 0xb07a4a, roughness: 0.7 }));
  wood.position.y = 0.11;
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.42, 20), new THREE.MeshStandardMaterial({ color: 0xc58a55, roughness: 0.6 }));
  handle.position.y = 0.38;
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.14, 24, 16), new THREE.MeshStandardMaterial({ color: 0xc2543a, roughness: 0.5 }));
  knob.position.y = 0.64;
  [rubber, wood, handle, knob].forEach((part) => {
    part.castShadow = true;
    tool.add(part);
  });
  tool.visible = false;
  scene.add(tool);
  return tool;
}

// Petites gouttes d'encre projetées autour du tampon, au moment de l'impact.
function createSplats(coffre) {
  const splats = [];
  const material = new THREE.MeshBasicMaterial({ color: 0x3a2f26, transparent: true, opacity: 0, depthWrite: false });
  for (let i = 0; i < 14; i++) {
    const dot = new THREE.Mesh(new THREE.CircleGeometry(0.012 + Math.random() * 0.02, 10), material.clone());
    dot.rotation.x = -Math.PI / 2;
    const a = Math.random() * Math.PI * 2;
    dot.userData = { a, r: 0.33 + Math.random() * 0.12 };
    dot.position.set(coffre.imprint.position.x, coffre.lidTop + 0.001, coffre.imprint.position.z);
    coffre.group.add(dot);
    splats.push(dot);
  }
  return splats;
}

// --- Île en papier qui se déplie, sur une mer de papier plissé ---
function noisyDisc(radius, seed, depth = 0.05) {
  const shape = new THREE.Shape();
  for (let i = 0; i <= 40; i++) {
    const a = (i / 40) * Math.PI * 2;
    const r = radius * (1 + 0.09 * Math.sin(a * 3 + seed) + 0.05 * Math.sin(a * 7 + seed * 2));
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false });
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

// Silhouette découpée avec une marge blanche, comme un autocollant de papier.
function cutout(draw, size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const g = canvas.getContext('2d');
  // D'abord le contour blanc épais (la marge découpée aux ciseaux), puis le dessin par-dessus.
  g.lineJoin = 'round';
  g.lineWidth = 16;
  g.strokeStyle = '#fbf7ef';
  draw(g, size, true);
  draw(g, size, false);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

const drawLighthouse = (g, s, outline) => {
  g.beginPath();
  g.moveTo(s * 0.4, s * 0.92);
  g.lineTo(s * 0.45, s * 0.3);
  g.lineTo(s * 0.55, s * 0.3);
  g.lineTo(s * 0.6, s * 0.92);
  g.closePath();
  if (outline) return g.stroke();
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
};

const drawTree = (g, s, outline) => {
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
};

function createIsland() {
  const group = new THREE.Group();
  group.position.set(2.9, 0, 0.1);
  scene.add(group);

  // Mer : une feuille bleue froissée (facettes) posée sur le bureau.
  const seaGeometry = new THREE.PlaneGeometry(4.4, 3.8, 36, 32);
  const pos = seaGeometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const edge = Math.min(1, (2.2 - Math.abs(x)) * 2, (1.9 - Math.abs(y)) * 2);
    pos.setZ(i, (Math.sin(x * 3.1 + y * 1.7) * 0.025 + Math.sin(x * 7.3 - y * 5.1) * 0.015 + (Math.random() - 0.5) * 0.02) * Math.max(0, edge) + 0.07); // toujours au-dessus du bureau
  }
  seaGeometry.computeVertexNormals();
  const sea = new THREE.Mesh(seaGeometry, new THREE.MeshStandardMaterial({ map: paper('#8db4d4', { fibers: 120 }), roughness: 0.95, flatShading: true }));
  sea.rotation.set(-Math.PI / 2, 0, 0.08);
  sea.receiveShadow = true;
  group.add(sea);

  // Couches de l'île, empilées comme des feuilles découpées.
  const layers = [
    { r: 1.05, color: '#d9c39a', y: 0.03 },
    { r: 0.82, color: '#9cbf7a', y: 0.08 },
    { r: 0.56, color: '#86ad66', y: 0.13 },
  ].map(({ r, color, y }, i) => {
    const mesh = new THREE.Mesh(noisyDisc(r, i * 1.7 + 0.5), new THREE.MeshStandardMaterial({ map: paper(color), roughness: 0.95 }));
    mesh.position.y = y;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  });

  // Découpes qui se relèvent, articulées sur leur bord bas.
  const card = (texture, w, h, x, z, rotY) => {
    const hinge = new THREE.Group();
    hinge.position.set(x, 0.18, z);
    hinge.rotation.y = rotY;
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshStandardMaterial({ map: texture, alphaTest: 0.5, side: THREE.DoubleSide, roughness: 0.9 }),
    );
    mesh.position.y = h / 2;
    mesh.castShadow = true;
    hinge.add(mesh);
    group.add(hinge);
    return hinge;
  };
  const cards = [card(cutout(drawLighthouse), 1.3, 1.3, -0.15, -0.25, 0.25), card(cutout(drawTree), 0.8, 0.8, 0.45, -0.05, -0.35), card(cutout(drawTree), 0.6, 0.6, -0.55, 0.15, 0.4)];

  // La copie de la chaîne, en trois petites boîtes de carton (chaque île garde la sienne).
  const boxes = [-0.22, 0.02, 0.26].map((x) => {
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.15, 0.15), cardboard);
    box.position.set(x, 0.26, 0.42);
    box.castShadow = true;
    group.add(box);
    return box;
  });

  const tag = makeTag('île de Maxens');
  tag.position.set(0, 0.05, 1.25);
  group.add(tag);

  return { group, layers, cards, boxes, tag, progress: 0, target: 0 };
}

// --- Avion en papier ---
function createPlane() {
  const geometry = new THREE.BufferGeometry();
  // Pointe, ailes, quille : quatre triangles pliés.
  const v = [0, 0, 0.32, -0.2, 0.02, -0.2, 0, 0, -0.2, 0, 0, 0.32, 0, 0, -0.2, 0.2, 0.02, -0.2, 0, 0, 0.32, 0, -0.07, -0.2, 0, 0, -0.2];
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
  geometry.computeVertexNormals();
  const plane = new THREE.Mesh(geometry, whitePaper);
  plane.castShadow = true;
  plane.visible = false;
  scene.add(plane);
  return plane;
}

// --- Scène ---
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const easeOutBack = (t) => 1 + 2.4 * (t - 1) ** 3 + 1.4 * (t - 1) ** 2;
const clamp01 = (t) => Math.min(1, Math.max(0, t));

await document.fonts.ready; // tampons et pièces sont écrits en Courier Prime
const genesis = await mine({ index: 0, parentHash: GENESIS_PARENT, data: 'Bloc de départ (genèse)' });
const block = await mine({ index: 1, parentHash: genesis.hash, data: 'Dylan → Maxens : 5 jetons' });

const coffres = [createPaperCoffre(genesis), createPaperCoffre(block)];
coffres[0].group.position.set(-2.9, 0, 0);
coffres[1].group.position.set(-0.7, 0, 0);
coffres.forEach((c) => scene.add(c.group));
const target = coffres[1];

// La chaîne : un ruban adhésif corail entre les deux coffres, collé sur les couvercles.
const tape = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.008, 0.16), new THREE.MeshStandardMaterial({ color: 0xe0684b, transparent: true, opacity: 0.85, roughness: 0.7 }));
tape.position.set(-1.8, LID_Y + T * 0.8 + 0.004, 0.2);
tape.rotation.y = 0.04;
tape.castShadow = true;
scene.add(tape);

const tool = createStampTool();
const splats = createSplats(target);
const island = createIsland();
const plane = createPlane();

// Au départ, le coffre n°1 n'a pas encore son grand tampon : c'est à l'utilisateur de le poser.
target.imprint.material.opacity = 0;
let stamp = null; // { t } pendant l'animation du tampon
let flight = null; // { t, curve }
let lampOn = false;

const hashText = document.querySelector('#hash');
hashText.textContent = `Sceau du coffre n°1 : ${shortHash(block.hash)} — calculé par ton navigateur (SHA-256).`;

// --- Actions ---
const ui = {
  lamp: document.querySelector('#lamp'),
  stamp: document.querySelector('#stamp'),
  island: document.querySelector('#island'),
  plane: document.querySelector('#plane'),
};

ui.lamp.addEventListener('click', () => {
  lampOn = !lampOn;
  ui.lamp.setAttribute('aria-pressed', String(lampOn));
  ui.lamp.textContent = lampOn ? 'Éteindre la lampe du coffre' : 'Allumer la lampe du coffre';
});

ui.stamp.addEventListener('click', () => {
  if (stamp) return;
  target.imprint.material.opacity = 0;
  target.imprint.scale.setScalar(1);
  splats.forEach((dot) => (dot.material.opacity = 0));
  stamp = { t: reducedMotion ? 1.2 : 0 };
});

ui.island.addEventListener('click', () => {
  island.target = island.target ? 0 : 1;
  ui.island.setAttribute('aria-pressed', String(Boolean(island.target)));
  ui.island.textContent = island.target ? 'Replier l’île' : 'Déplier l’île';
});

ui.plane.addEventListener('click', () => {
  if (flight) return;
  if (!island.target) ui.island.click(); // l'avion a besoin d'une île où se poser
  const from = target.group.position.clone().add(new THREE.Vector3(0, LID_Y + 0.4, 0));
  const to = island.group.position.clone().add(new THREE.Vector3(0.1, 0.5, 0.35));
  const curve = new THREE.CatmullRomCurve3([from, from.clone().lerp(to, 0.35).setY(2.4), from.clone().lerp(to, 0.7).setY(2.1), to]);
  flight = { t: reducedMotion ? 1 : 0, curve };
  plane.visible = true;
});

// --- Boucle ---
const clock = new THREE.Clock();
const ahead = new THREE.Vector3();

function updateStamp(dt) {
  if (!stamp) return;
  stamp.t += dt;
  const t = stamp.t;
  const top = target.lidTop;
  const at = target.group.position.clone().add(target.imprint.position);
  // 0 → 0,45 s : le tampon descend ; 0,45 → 0,6 : il appuie ; 0,6 → 1,1 : il remonte.
  let y;
  let squash = 1;
  if (t < 0.45) y = top + 2.6 * (1 - ease(t / 0.45));
  else if (t < 0.6) {
    y = top;
    squash = 1 - 0.12 * Math.sin(((t - 0.45) / 0.15) * Math.PI);
  } else y = top + 2.6 * ease(clamp01((t - 0.6) / 0.5));
  tool.visible = t < 1.1;
  tool.position.set(at.x, y, at.z);
  tool.rotation.y = -target.imprint.rotation.z;
  tool.scale.set(1, squash, 1);
  // L'empreinte apparaît à l'impact, en s'étalant un peu ; le coffre s'écrase légèrement.
  const inked = clamp01((t - 0.47) / 0.12);
  target.imprint.material.opacity = inked;
  target.imprint.scale.setScalar(0.92 + 0.08 * inked);
  target.group.scale.set(1 + (1 - squash) * 0.25, squash ** 0.3, 1 + (1 - squash) * 0.25);
  splats.forEach((dot) => {
    const k = clamp01((t - 0.5) / 0.18);
    const { a, r } = dot.userData;
    dot.position.x = target.imprint.position.x + Math.cos(a) * r * (0.75 + 0.25 * k);
    dot.position.z = target.imprint.position.z + Math.sin(a) * r * (0.75 + 0.25 * k);
    dot.material.opacity = t > 0.5 ? 0.75 : 0;
  });
  if (t >= 1.2) {
    target.group.scale.setScalar(1);
    stamp = null;
  }
}

function updateIsland(dt) {
  island.progress = reducedMotion ? island.target : THREE.MathUtils.damp(island.progress, island.target, 2.2, dt);
  const p = island.progress;
  // Les couches montent une à une, puis les découpes se relèvent avec un léger rebond.
  island.layers.forEach((layer, i) => {
    const k = clamp01((p - i * 0.1) / 0.35);
    layer.scale.set(0.6 + 0.4 * k, Math.max(0.001, k), 0.6 + 0.4 * k);
    layer.visible = k > 0.001;
  });
  island.cards.forEach((hinge, i) => {
    const k = clamp01((p - 0.35 - i * 0.12) / 0.45);
    hinge.rotation.x = -Math.PI / 2 + (Math.PI / 2) * easeOutBack(k);
    hinge.visible = p > 0.3;
  });
  island.boxes.forEach((box, i) => {
    const k = clamp01((p - 0.6 - i * 0.08) / 0.3);
    box.scale.setScalar(Math.max(0.001, easeOutBack(k)));
  });
  island.tag.visible = p > 0.5;
}

function updatePlane(dt) {
  if (!flight) return;
  flight.t = Math.min(1, flight.t + dt / 2.2);
  const t = ease(flight.t);
  plane.position.copy(flight.curve.getPoint(t));
  flight.curve.getPoint(Math.min(1, t + 0.02), ahead);
  if (t < 1) plane.lookAt(ahead);
  plane.rotation.z += Math.sin(flight.t * Math.PI * 3) * 0.15; // petit roulis
  if (flight.t >= 1) {
    flight = null;
    setTimeout(() => (plane.visible = false), 700);
  }
}

renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.1);
  const lampTarget = lampOn ? 1 : 0;
  target.light = reducedMotion ? lampTarget : THREE.MathUtils.damp(target.light, lampTarget, 5, dt);
  // Lampe allumée : le calque s'éclaire par derrière et devient plus transparent, on lit le contenu.
  target.bulb.intensity = target.light * 2.2;
  target.vellum.material.emissiveIntensity = target.light * 0.35;
  target.vellum.material.opacity = 0.72 - target.light * 0.42;
  updateStamp(dt);
  updateIsland(dt);
  updatePlane(dt);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
});

// Comme dans l'application : on décale le centre de la vue pour que la fiche ne cache pas la maquette.
function fitView() {
  const { innerWidth: w, innerHeight: h } = window;
  const panel = document.querySelector('#panel').getBoundingClientRect();
  camera.aspect = w / h;
  if (w > 760) camera.setViewOffset(w, h, -panel.right / 2, 0, w, h);
  else camera.setViewOffset(w, h, 0, (h - panel.top) / 2, w, h);
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  labelRenderer.setSize(w, h);
}
window.addEventListener('resize', fitView);
fitView();

window.apercu = { scene, camera, controls, coffres, island };
