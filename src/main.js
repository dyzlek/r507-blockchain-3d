import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildChain, shortHash } from './chain.js';
import { createCoffre, COFFRE_SIZE } from './coffre.js';
import { SEQUENCES } from './sequences.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Rendu ---
const canvas = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.className = 'labels';
document.body.appendChild(labelRenderer.domElement);

const scene = new THREE.Scene();
const SEA = 0x0b1619;
scene.background = new THREE.Color(SEA);
scene.fog = new THREE.Fog(SEA, 12, 34);
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.6;

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0.5, 3.2, 11);

// Caméra mixte : chaque séquence impose un point de vue, l'utilisateur peut ensuite tourner autour.
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 2.5;
controls.maxDistance = 18;
controls.maxPolarAngle = Math.PI * 0.55;

// Nuit claire : lumière froide de la lune, reflet chaud du laiton.
scene.add(new THREE.HemisphereLight(0x9fc4d6, 0x1a1408, 0.6));
const light = new THREE.DirectionalLight(0xfff1dc, 1.8);
light.position.set(5, 8, 6);
scene.add(light);

// La mer, et la première île de l'archipel sur laquelle repose la chaîne.
const sea = new THREE.Mesh(
  new THREE.CircleGeometry(40, 64),
  new THREE.MeshStandardMaterial({ color: 0x0c1d21, roughness: 0.85 }),
);
sea.rotation.x = -Math.PI / 2;
sea.position.y = -COFFRE_SIZE.h / 2 - 0.35;
scene.add(sea);

const island = new THREE.Mesh(
  new THREE.CylinderGeometry(7.2, 7.8, 0.5, 9),
  new THREE.MeshStandardMaterial({ color: 0x262b26, roughness: 1, flatShading: true }),
);
island.scale.z = 0.38;
island.position.y = -COFFRE_SIZE.h / 2 - 0.27;
scene.add(island);

// --- Chaîne de coffres ---
const SPACING = 2.8;
const coffres = [];
const linkMaterial = new THREE.MeshStandardMaterial({ color: 0xc79a4b, metalness: 0.7, roughness: 0.35 });

async function buildScene() {
  const chain = await buildChain();
  const startX = -((chain.length - 1) * SPACING) / 2;
  chain.forEach((block, i) => {
    const coffre = createCoffre(block);
    coffre.group.position.x = startX + i * SPACING;
    scene.add(coffre.group);
    coffres.push(coffre);

    // Lien entre le coffre précédent et celui-ci (le sceau du parent est gravé sur ce côté).
    if (i > 0) {
      const length = SPACING - COFFRE_SIZE.w;
      const link = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, length, 12), linkMaterial);
      link.rotation.z = Math.PI / 2;
      link.position.set(coffre.group.position.x - SPACING / 2, 0.1, 0);
      scene.add(link);
    }
  });
}

// --- Transitions de caméra ---
let visibleAspect = camera.aspect; // proportions de la zone non couverte par le panneau
const tween = { active: false, t: 0, duration: 1.4, fromPos: new THREE.Vector3(), toPos: new THREE.Vector3(), fromTarget: new THREE.Vector3(), toTarget: new THREE.Vector3() };
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

function cameraGoal(sequence) {
  const origin = sequence.focus === null ? new THREE.Vector3() : coffres[sequence.focus].group.position.clone();
  const target = origin.clone().add(new THREE.Vector3(...sequence.camera.target));
  const offset = new THREE.Vector3(...sequence.camera.position).sub(new THREE.Vector3(...sequence.camera.target));
  // Écran étroit (téléphone) : on recule pour garder les étiquettes dans le cadre.
  offset.multiplyScalar(Math.max(1, (window.innerWidth > 760 ? 1.35 : 2) / (visibleAspect || 1)));
  return { position: target.clone().add(offset), target };
}

function moveCamera(sequence) {
  const goal = cameraGoal(sequence);
  if (reducedMotion) {
    camera.position.copy(goal.position);
    controls.target.copy(goal.target);
    return;
  }
  tween.fromPos.copy(camera.position);
  tween.fromTarget.copy(controls.target);
  tween.toPos.copy(goal.position);
  tween.toTarget.copy(goal.target);
  tween.t = 0;
  tween.active = true;
  controls.enabled = false;
}

function updateTween(dt) {
  if (!tween.active) return;
  tween.t = Math.min(1, tween.t + dt / tween.duration);
  const k = easeInOut(tween.t);
  camera.position.lerpVectors(tween.fromPos, tween.toPos, k);
  controls.target.lerpVectors(tween.fromTarget, tween.toTarget, k);
  if (tween.t === 1) {
    tween.active = false;
    controls.enabled = true;
  }
}

// --- Panneau et navigation ---
const ui = {
  step: document.querySelector('#step'),
  stepNumber: document.querySelector('#step-number'),
  title: document.querySelector('#title'),
  text: document.querySelector('#text'),
  inspect: document.querySelector('#inspect'),
  fields: document.querySelector('#fields'),
  enVrai: document.querySelector('#en-vrai'),
  enVraiText: document.querySelector('#en-vrai-text'),
  prev: document.querySelector('#prev'),
  next: document.querySelector('#next'),
  dots: document.querySelector('#dots'),
};

let current = 0;
const focused = () => (SEQUENCES[current].focus === null ? null : coffres[SEQUENCES[current].focus]);

function renderText() {
  const sequence = SEQUENCES[current];
  const coffre = focused();
  const paragraphs = coffre?.inspected && sequence.textInspected ? sequence.textInspected : sequence.text;
  ui.text.innerHTML = paragraphs.map((p) => `<p>${p}</p>`).join('');

  ui.inspect.hidden = !coffre;
  ui.inspect.textContent = coffre?.inspected ? 'Refermer l’inspection' : 'Inspecter le coffre';
  ui.inspect.setAttribute('aria-pressed', String(Boolean(coffre?.inspected)));

  ui.fields.hidden = !coffre?.inspected;
  if (coffre?.inspected) {
    const { block } = coffre;
    ui.fields.innerHTML = [
      ['Données', block.data, 'ce que le bloc enregistre : ici, la transaction.'],
      ['Nonce', block.nonce, 'un nombre que l’on fait varier pour obtenir un sceau valide (notion 5).'],
      ['Empreinte (sceau)', shortHash(block.hash), 'calculée à partir de tout le contenu du coffre.'],
      ['Empreinte du parent', shortHash(block.parentHash), 'le sceau du coffre précédent, gravé en petit dans le coin gauche.'],
    ]
      .map(([key, value, help]) => `<div><dt>${key}</dt><dd><code>${value}</code> — ${help}</dd></div>`)
      .join('');
  }
  coffres.forEach((c) => c.setHint(c === coffre && !c.inspected));
  fitView();
}

function goTo(index) {
  current = THREE.MathUtils.clamp(index, 0, SEQUENCES.length - 1);
  const sequence = SEQUENCES[current];
  coffres.forEach((c) => c.setInspected(false));

  ui.stepNumber.textContent = String(current + 1);
  ui.step.textContent = sequence.step;
  ui.title.textContent = sequence.title;
  ui.enVraiText.innerHTML = sequence.enVrai;
  ui.enVrai.open = false;
  ui.prev.disabled = current === 0;
  ui.next.disabled = current === SEQUENCES.length - 1;
  [...ui.dots.children].forEach((dot, i) => {
    dot.classList.toggle('is-current', i === current);
    dot.toggleAttribute('aria-current', i === current);
  });
  renderText();
  moveCamera(sequence);
}

function toggleInspect() {
  const coffre = focused();
  if (!coffre) return;
  coffre.setInspected(!coffre.inspected);
  renderText();
}

ui.dots.innerHTML = SEQUENCES.map((s, i) => `<li><button type="button" aria-label="Étape ${i + 1} : ${s.title}">${i + 1}</button></li>`).join('');
[...ui.dots.querySelectorAll('button')].forEach((button, i) => button.addEventListener('click', () => goTo(i)));
ui.prev.addEventListener('click', () => goTo(current - 1));
ui.next.addEventListener('click', () => goTo(current + 1));
ui.inspect.addEventListener('click', toggleInspect);
window.addEventListener('keydown', (event) => {
  if (event.target.closest?.('input, textarea')) return;
  if (event.key === 'ArrowRight') goTo(current + 1);
  if (event.key === 'ArrowLeft') goTo(current - 1);
});

// --- Clic sur le coffre mis en avant ---
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let downAt = null;

function pickFocused(event) {
  const coffre = focused();
  if (!coffre) return null;
  pointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  return raycaster.intersectObject(coffre.hitMesh).length ? coffre : null;
}

canvas.addEventListener('pointerdown', (event) => {
  downAt = { x: event.clientX, y: event.clientY };
});
canvas.addEventListener('pointerup', (event) => {
  // Un glisser sert à tourner la caméra : seul un vrai clic inspecte.
  if (!downAt || Math.hypot(event.clientX - downAt.x, event.clientY - downAt.y) > 6) return;
  if (pickFocused(event)) toggleInspect();
});
canvas.addEventListener('pointermove', (event) => {
  if (event.pointerType !== 'mouse') return;
  const hovered = pickFocused(event);
  coffres.forEach((c) => c.setHover(c === hovered));
  canvas.style.cursor = hovered ? 'pointer' : '';
});

// Décale le centre de la vue pour que la scène ne soit pas cachée par le panneau
// (à droite du panneau sur ordinateur, au-dessus sur téléphone).
function fitView() {
  const { innerWidth: w, innerHeight: h } = window;
  if (!w || !h) return; // fenêtre cachée : on attendra le prochain redimensionnement
  const panel = document.querySelector('#panel').getBoundingClientRect();
  camera.aspect = w / h;
  if (w > 760) {
    camera.setViewOffset(w, h, -panel.right / 2, 0, w, h);
    visibleAspect = (w - panel.right) / h;
  } else {
    camera.setViewOffset(w, h, 0, (h - panel.top) / 2, w, h);
    visibleAspect = w / panel.top;
  }
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  labelRenderer.setSize(w, h);
}

// Après un redimensionnement (ou si la page a été chargée dans une fenêtre cachée), on recadre.
window.addEventListener('resize', () => {
  fitView();
  if (coffres.length) moveCamera(SEQUENCES[current]);
});
fitView();

// --- Boucle ---
const timer = new THREE.Timer();
timer.connect(document);

await document.fonts.ready; // les sceaux sont dessinés avec la police mono
await buildScene();
// ?etape=2 ouvre directement la 2e séquence (tests utilisateurs, soutenance).
goTo(Number(new URLSearchParams(location.search).get('etape') ?? 1) - 1 || 0);

renderer.setAnimationLoop((time) => {
  timer.update(time);
  const dt = Math.min(timer.getDelta(), 0.1);
  updateTween(dt);
  coffres.forEach((c) => c.update(dt, timer.getElapsed(), reducedMotion));
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
});

// Accès pour le débogage dans la console.
window.app = { scene, camera, controls, coffres, goTo };
