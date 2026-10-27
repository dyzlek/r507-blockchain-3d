import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildChain, shortHash, sha256, blockContent, DIFFICULTY } from './chain.js';
import { createCoffre, COFFRE_SIZE, setLeaderResolution } from './coffre.js';
import { SEQUENCES } from './sequences.js';
import { createArchipel, setRouteResolution, SENDER } from './archipel.js';
import { createMiner, DIFFICULTIES } from './minage.js';
import { createConsensus, METHODS } from './consensus.js';
import { createRace, ATTACKS } from './race.js';
import { createRope } from './papier.js';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Rendu ---
const canvas = document.querySelector('#scene');
// Fond transparent : le bureau en papier est dessiné en CSS derrière la scène (grain, lumière de lampe).
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.className = 'labels';
document.body.appendChild(labelRenderer.domElement);

// Maquette en papier sur un bureau : la scène est posée sur le papier de la page (variable CSS --bg),
// le sol est invisible et ne garde que les ombres douces des objets.
const scene = new THREE.Scene();
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.5;

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0.5, 3.4, 11);

// Caméra mixte : chaque séquence impose un point de vue, l'utilisateur peut ensuite tourner autour.
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 2.5;
controls.maxDistance = 18;
controls.maxPolarAngle = Math.PI * 0.55;

// Lumière venant d'en haut à gauche, comme les ombres de l'interface.
// Lumière chaude de lampe de bureau, en haut à gauche.
scene.add(new THREE.HemisphereLight(0xfff4e2, 0xc9b89f, 1.6));
const light = new THREE.DirectionalLight(0xffe2b8, 2);
light.position.set(-5, 9, 6);
light.castShadow = true;
light.shadow.mapSize.set(2048, 2048);
light.shadow.radius = 8;
light.shadow.bias = -0.0005;
// Le cadre des ombres va jusqu'à la course de la notion 7, à droite de la chaîne.
Object.assign(light.shadow.camera, { left: -8, right: 16, top: 6, bottom: -5, near: 1, far: 34 });
scene.add(light);

const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShadowMaterial({ opacity: 0.22, color: 0x5a3e22 }));
ground.rotation.x = -Math.PI / 2;
ground.position.y = -COFFRE_SIZE.h / 2;
ground.receiveShadow = true;
scene.add(ground);

// --- Chaîne de coffres ---
const SPACING = 2.8;
const coffres = [];
const links = []; // une corde par lien, qu'on peut couper quand un bloc est falsifié
const LINK_COLOR = 0xe0684b;
const BROKEN_COLOR = 0xb3261e;

// L'archipel (notion 4) est construit à l'écart de la chaîne : la caméra s'y rend.
const ARCHIPEL_POSITION = new THREE.Vector3(0, 0, -22);
let archipel = null;

// Le coffre à miner (notion 5) : la transaction de Dylan, accrochée au bout de la chaîne, mais pas encore scellée.
const NEW_BLOCK_DATA = 'Dylan → Maxens : 5 jetons';
let newCoffre = null;
let miner = null;

// Notion 6 : le consensus se joue sur l'archipel. Notion 7 : la double dépense, au bout de la chaîne.
let consensus = null;
let race = null;
const onArchipel = (sequence) => Boolean(sequence.network || sequence.consensus);

async function buildScene() {
  const chain = await buildChain();
  const startX = -((chain.length - 1) * SPACING) / 2;
  chain.forEach((block, i) => {
    const coffre = createCoffre(block);
    coffre.group.position.x = startX + i * SPACING;
    scene.add(coffre.group);
    coffres.push(coffre);

    // Lien entre le coffre précédent et celui-ci : une corde nouée d'une boîte à l'autre
    // (côté du sceau du parent). C'est un repère : la preuve du lien reste le sceau recopié.
    if (i > 0) {
      const link = createRope(coffres[i - 1].group.position, coffre.group.position, LINK_COLOR);
      links[i] = link;
      scene.add(link);
    }
  });

  const pending = { index: chain.length, parentHash: chain.at(-1).hash, data: NEW_BLOCK_DATA };
  newCoffre = createCoffre({ ...pending, nonce: 0, hash: await sha256(blockContent({ ...pending, nonce: 0 })) });
  newCoffre.group.position.x = startX + chain.length * SPACING;
  scene.add(newCoffre.group);
  coffres.push(newCoffre);
  const link = createRope(coffres[chain.length - 1].group.position, newCoffre.group.position, LINK_COLOR);
  links[chain.length] = link;
  scene.add(link);
  miner = createMiner(pending);
  miner.onChange = showMining;

  archipel = createArchipel(chain);
  archipel.group.position.copy(ARCHIPEL_POSITION);
  archipel.onChange = () => {
    if (SEQUENCES[current].network) renderText();
  };
  scene.add(archipel.group);
  addPop('archipel', [archipel.group], { toward: true });
  addPop('newCoffre', [newCoffre.group, link]);

  consensus = createConsensus();
  archipel.group.add(consensus.group);
  consensus.onChange = () => {
    if (SEQUENCES[current].consensus) renderText();
  };

  race = await createRace({ fork: coffres[chain.length - 1], tip: newCoffre, data: NEW_BLOCK_DATA, spacing: SPACING });
  scene.add(race.group);
  race.onChange = () => {
    if (SEQUENCES[current].race) renderText();
  };
  addPop('race', [race.group]);
}

// Apparition douce : l'archipel et le coffre à miner grandissent (ou rétrécissent) au lieu de surgir.
const showing = { archipel: false, newCoffre: false, race: false };
const pops = [];
// `toward` : l'objet rétrécit vers le point regardé par la caméra (le centre de l'écran) plutôt que vers
// son propre centre, qui peut être loin dans un coin de l'image.
function addPop(key, objects, { toward = false } = {}) {
  const pop = { key, objects, value: 0, toward, home: objects.map((object) => object.position.clone()) };
  pops.push(pop);
  objects.forEach((object) => (object.visible = false));
}
function updatePops(dt) {
  for (const pop of pops) {
    const target = showing[pop.key] ? 1 : 0;
    pop.value = reducedMotion ? target : THREE.MathUtils.damp(pop.value, target, 4, dt);
    if (Math.abs(pop.value - target) < 0.005) pop.value = target;
    // Les étiquettes (éléments HTML) ne suivent pas l'échelle 3D : on les réduit à la main, plus vite que
    // l'objet, pour qu'elles s'effacent avant lui (et arrivent après lui à l'apparition).
    const labelScale = pop.value ** 3;
    pop.objects.forEach((object, i) => {
      object.visible = pop.value > 0;
      object.scale.setScalar(Math.max(pop.value, 0.001));
      if (pop.toward) object.position.lerpVectors(controls.target, pop.home[i], pop.value);
      object.traverse((child) => {
        if (!child.isCSS2DObject) return;
        // Seulement l'échelle : l'opacité est gérée par les classes CSS (champs cachés tant qu'on n'inspecte pas).
        child.element.style.scale = labelScale < 1 ? String(labelScale) : '';
      });
    });
  }
}

// --- Transitions de caméra ---
let visibleAspect = camera.aspect; // proportions de la zone non couverte par le panneau
const tween = { active: false, t: 0, duration: 1.4, fromPos: new THREE.Vector3(), toPos: new THREE.Vector3(), fromTarget: new THREE.Vector3(), toTarget: new THREE.Vector3() };
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

function cameraGoal(sequence) {
  const anchorIndex = sequence.cameraOn ?? sequence.focus;
  let origin = anchorIndex === null ? new THREE.Vector3() : coffres[anchorIndex].group.position.clone();
  if (onArchipel(sequence)) origin = ARCHIPEL_POSITION.clone();
  if (sequence.race) origin = race.center.clone();
  const target = origin.clone().add(new THREE.Vector3(...sequence.camera.target));
  const offset = new THREE.Vector3(...sequence.camera.position).sub(new THREE.Vector3(...sequence.camera.target));
  // Écran étroit (téléphone) : on recule pour garder les étiquettes dans le cadre.
  offset.multiplyScalar(Math.max(1, (window.innerWidth > 760 ? 1.35 : 2) / (visibleAspect || 1)));
  // L'archipel est plus large que la chaîne : en écran étroit, on recule encore pour voir Dylan et Maxens.
  if ((onArchipel(sequence) || sequence.race) && window.innerWidth <= 760) offset.multiplyScalar(1.4);
  return { position: target.clone().add(offset), target };
}

function moveCamera(sequence) {
  // L'archipel est plus large que la chaîne : on autorise à reculer davantage.
  controls.maxDistance = onArchipel(sequence) || sequence.race ? 32 : 18;
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
  panel: document.querySelector('#panel'),
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
  nav: document.querySelector('#nav'),
};

let current = 0;
let linked = false; // séquences à `chain` : sceaux comparés (ou bloc falsifié)
let tampered = null; // { index, data, hash } quand le bloc est falsifié
const focused = () => (SEQUENCES[current].focus === null ? null : coffres[SEQUENCES[current].focus]);

// Le coffre affiche le dernier essai ; le panneau suit. Appelé à chaque lot d'essais pendant le minage.
let miningState = 'idle';
function showMining() {
  const { state, tries, last } = miner.summary();
  const valid = state === 'found';
  const label = valid ? `Bloc n°${newCoffre.block.index} · scellé` : last ? `Bloc n°${newCoffre.block.index} · essai n°${tries}` : `Bloc n°${newCoffre.block.index} · sans sceau`;
  newCoffre.setTrial(last, { valid, label });
  newCoffre.setGlow(valid);
  if (!SEQUENCES[current].mining) return;
  if (state !== miningState) {
    miningState = state;
    renderText();
  } else renderMiningFields();
}

function renderMiningFields() {
  const { state, tries, last, difficulty, expected } = miner.summary();
  const running = state === 'running';
  const rows = [];
  if (state === 'found') {
    rows.push(
      ['Nonce trouvé', `<code>${last.nonce}</code>, après ${tries} essai${tries > 1 ? 's' : ''}`],
      ['Sceau', `<code>${shortHash(last.hash)}</code> : commence bien par <code>${difficulty}</code>`],
      ['Vérification', 'un seul calcul suffit : chaque île refait le sceau avec ce nonce, puis accepte le bloc'],
    );
  } else if (last) {
    rows.push(
      ['Essais', String(tries)],
      ['Nonce essayé', `<code>${last.nonce}</code>`],
      ['Sceau obtenu', `<code>${shortHash(last.hash)}</code> : ne commence pas par <code>${difficulty}</code>`],
    );
  }
  const choices = DIFFICULTIES.map(
    (d) => `<button type="button" data-difficulty="${d}" aria-pressed="${d === difficulty}"${running ? ' disabled' : ''}>${d}</button>`,
  ).join('');
  rows.push(['Difficulté', `le sceau doit commencer par <code>${difficulty}</code>, soit ${expected.toLocaleString('fr-FR')} essais en moyenne<div class="choices">${choices}</div>`]);
  ui.fields.innerHTML = rows.map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`).join('');
}

function renderText() {
  const sequence = SEQUENCES[current];
  if (sequence.mining) {
    renderMining(sequence);
    fitView();
    return;
  }
  if (sequence.consensus) {
    renderConsensus(sequence);
    fitView();
    return;
  }
  if (sequence.race) {
    renderRace(sequence);
    fitView();
    return;
  }
  const coffre = focused();
  const open = sequence.chain || sequence.network ? linked : coffre?.inspected;
  const paragraphs = open && sequence.textInspected ? sequence.textInspected : sequence.text;
  ui.text.innerHTML = paragraphs.map((p) => `<p>${p}</p>`).join('');

  ui.inspect.hidden = !coffre && !sequence.chain && !sequence.network;
  const [labelOff, labelOn] = sequence.button ?? ['Allumer la lampe du coffre', 'Éteindre la lampe'];
  ui.inspect.textContent = open ? labelOn : labelOff;
  // Sur l'archipel, le bouton (r)envoie la transaction : ce n'est pas un interrupteur.
  if (sequence.network) ui.inspect.removeAttribute('aria-pressed');
  else ui.inspect.setAttribute('aria-pressed', String(Boolean(open)));

  ui.fields.hidden = !open;
  if (sequence.tamper && tampered) {
    const original = coffres[tampered.index].block;
    const next = coffres[tampered.index + 1].block;
    const valid = tampered.hash.startsWith(DIFFICULTY);
    // Le texte reste en police normale : seules les vraies valeurs (transactions, sceaux) sont en <code>.
    ui.fields.innerHTML = [
      ['Transaction', `avant : <code>${original.data}</code><br />après : <code>${tampered.data}</code>`],
      ['Nouveau sceau', `<code>${shortHash(tampered.hash)}</code> (avant : <code>${shortHash(original.hash)}</code>)`],
      ['Difficulté', valid ? 'encore respectée, par chance' : `le sceau ne commence plus par <code>${DIFFICULTY}</code> : le bloc serait refusé`],
      [`Copie dans le bloc ${next.index}`, `<code>${shortHash(next.parentHash)}</code> ≠ <code>${shortHash(tampered.hash)}</code> : la chaîne est cassée`],
    ]
      .map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`)
      .join('');
  } else if (sequence.network && linked) {
    const { running, total, received, offline, unreached, bobReceived } = archipel.summary();
    const rows = [
      ['Ont reçu la transaction', `${received.length} île${received.length > 1 ? 's' : ''} sur ${total}${running ? ', et ça continue…' : ''}`],
      ['Maxens', bobReceived ? 'a reçu la transaction' : running ? 'attend encore' : 'pas joint'],
      ['Îles éteintes', offline.length ? offline.join(', ') : 'aucune'],
    ];
    if (!running && unreached.length) rows.push(['Pas jointes', `${unreached.join(', ')} : plus aucun chemin allumé ne mène jusqu’à elles`]);
    rows.push(['Île centrale', 'aucune : chaque île vérifie et fait suivre']);
    ui.fields.innerHTML = rows.map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`).join('');
  } else if (sequence.chain && linked) {
    ui.fields.innerHTML = sequence.chain
      .map((i) => {
        const { block } = coffres[i];
        const parent = coffres[i - 1].block;
        return `<div><dt>Bloc ${i}</dt><dd>parent <code>${shortHash(block.parentHash)}</code> = sceau du bloc ${i - 1} <code>${shortHash(parent.hash)}</code></dd></div>`;
      })
      .join('');
  } else if (coffre?.inspected) {
    const { block } = coffre;
    ui.fields.innerHTML = [
      ['Transaction', block.data, 'ce que le coffre garde en mémoire.'],
      ['Nonce', block.nonce, 'un nombre qu’on change pour obtenir un sceau valide (notion 5).'],
      ['Sceau', shortHash(block.hash), 'code unique calculé à partir de tout le contenu du coffre.'],
      ['Sceau du coffre d’avant', shortHash(block.parentHash), 'recopié en petit dans le coin gauche.'],
    ]
      .map(([key, value, help]) => `<div><dt>${key}</dt><dd><code>${value}</code> — ${help}</dd></div>`)
      .join('');
  }
  coffres.forEach((c) => c.setHint(c === coffre && !c.inspected));
  coffres.forEach((c, i) => {
    const broken = sequence.tamper && tampered && (i === tampered.index || i === tampered.index + 1);
    // Bloc falsifié : seuls son nouveau sceau et la copie gardée par le suivant passent en rouge.
    const rings = broken ? { own: i === tampered.index, parent: i === tampered.index + 1 } : undefined;
    c.setGlow(Boolean(sequence.chain?.includes(i)) && linked && (!sequence.tamper || broken), broken ? BROKEN_COLOR : LINK_COLOR, rings);
  });
  links.forEach((link, i) => link?.setBroken(Boolean(tampered && i === tampered.index + 1), BROKEN_COLOR));
  if (sequence.network) {
    const { running, offline } = archipel.summary();
    archipel.setHint(!linked ? 'send' : !running && !offline.length ? 'off' : null);
  }
  fitView();
}

function goTo(index) {
  current = THREE.MathUtils.clamp(index, 0, SEQUENCES.length - 1);
  const sequence = SEQUENCES[current];
  coffres.forEach((c) => {
    c.setInspected(false);
    c.setShown(null);
  });
  linked = false;
  tampered = null;
  archipel.reset();
  archipel.setHint(null);
  showing.archipel = onArchipel(sequence);
  archipel.setOpen(showing.archipel);
  showing.newCoffre = Boolean(sequence.mining || sequence.race);
  showing.race = Boolean(sequence.race);
  // Machines et jetons de la notion 6 : seulement sur l'archipel de cette notion, pas à la notion 4.
  consensus.group.visible = Boolean(sequence.consensus);
  ui.inspect.disabled = false;
  ui.panel.removeAttribute('aria-busy');
  miningState = 'idle';
  miner.reset();
  consensus.clear();
  // Après `miner.reset`, qui retire le sceau du bloc 4 : la notion 7 l'affiche scellé.
  if (sequence.race) race.prepare();
  else race.reset();

  ui.stepNumber.textContent = String(sequence.notion ?? 0);
  ui.nav.style.setProperty('--progress', String(current / (SEQUENCES.length - 1)));
  ui.step.textContent = sequence.step;
  ui.title.textContent = sequence.title;
  ui.enVraiText.innerHTML = sequence.enVrai;
  ui.enVrai.open = false;
  ui.prev.disabled = current === 0;
  ui.next.disabled = current === SEQUENCES.length - 1;
  [...ui.dots.children].forEach((dot, i) => {
    dot.classList.toggle('is-current', i === current);
    dot.classList.toggle('is-done', i < current);
    const button = dot.firstElementChild;
    if (i === current) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
  renderText();
  moveCamera(sequence);
}

function renderMining(sequence) {
  const { state } = miner.summary();
  const open = state !== 'idle';
  const paragraphs = state === 'found' ? sequence.textInspected : state === 'running' ? sequence.textRunning : sequence.text;
  ui.text.innerHTML = paragraphs.map((p) => `<p>${p}</p>`).join('');
  ui.inspect.hidden = false;
  ui.inspect.disabled = state === 'running';
  ui.inspect.textContent = state === 'running' ? 'Minage en cours…' : sequence.button[open ? 1 : 0];
  ui.inspect.removeAttribute('aria-pressed');
  // Le panneau est annoncé aux lecteurs d'écran : on attend la fin de la course plutôt que d'annoncer chaque essai.
  ui.panel.setAttribute('aria-busy', String(state === 'running'));
  ui.fields.hidden = false; // la difficulté se choisit avant de lancer
  renderMiningFields();
  coffres.forEach((c) => {
    c.setHint(c === newCoffre && state === 'idle');
    if (c !== newCoffre) c.setGlow(false);
  });
}

// Notion 6 : on choisit la méthode (course ou tirage), on la lance, le panneau compare.
function renderConsensus(sequence) {
  const { method, state, winner, totalTries, wins, rounds, tried } = consensus.summary();
  const paragraphs = state === 'done' ? sequence.textDone[method] : sequence.text;
  ui.text.innerHTML = paragraphs.map((p) => `<p>${p}</p>`).join('');
  const [labelIdle, labelRunning, labelDone] = sequence.buttons[method];
  ui.inspect.hidden = false;
  ui.inspect.disabled = state === 'running';
  ui.inspect.textContent = state === 'running' ? labelRunning : state === 'done' ? labelDone : labelIdle;
  ui.inspect.removeAttribute('aria-pressed');
  ui.panel.setAttribute('aria-busy', String(state === 'running'));

  const choices = Object.entries(METHODS)
    .map(([key, { name, label }]) => `<button type="button" data-method="${key}" aria-label="${name}" aria-pressed="${key === method}"${state === 'running' ? ' disabled' : ''}>${label}</button>`)
    .join('');
  const pow = method === 'pow';
  const rows = [
    ['Méthode', `<div class="choices">${choices}</div>`],
    ['Ce qui compte', pow ? 'la puissance de calcul : chaque machine fait des essais' : 'les jetons mis en jeu : un ticket par jeton'],
  ];
  if (state === 'done') {
    rows.push(['Gagnante', `l’île ${/^[AEIOUÉ]/.test(winner.name) ? 'd’' : 'de '}${winner.name} (${METHODS[method].unit(winner.weight)}, ${Math.round(winner.chance * 100)} % de chances)`]);
    rows.push(['Travail', pow ? `${totalTries.toLocaleString('fr-FR')} essais faits par tout le réseau ; un seul a servi` : 'un seul tirage : presque aucun calcul']);
  }
  rows.push(['Si elle triche', pow ? 'les autres îles refusent son bloc : son électricité est perdue' : 'les autres îles refusent son bloc et elle perd sa mise']);
  if (rounds > 1) {
    const list = wins.filter((w) => w.wins).map((w) => `${w.name} ${w.wins}`).join(', ');
    rows.push(['Victoires', `${list} (sur ${rounds} tours)`]);
  }
  if (tried.pow && tried.pos) rows.push(['Bilan', 'preuve de travail : très sûre mais gourmande en énergie (Bitcoin). Preuve d’enjeu : sobre, mais les plus riches sont tirés plus souvent (Ethereum).']);
  ui.fields.hidden = false;
  ui.fields.innerHTML = rows.map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`).join('');
  coffres.forEach((c) => {
    c.setHint(false);
    c.setGlow(false);
  });
}

// Notion 7 : cycle de vie de la transaction, puis course entre la chaîne honnête et la branche secrète de Dylan.
function renderRace(sequence) {
  const { state, power, winner, honestLength, attackLength, goal, confirmations } = race.summary();
  const paragraphs = state === 'done' ? (winner === 'attack' ? sequence.textAttack : sequence.textInspected) : state === 'running' ? sequence.textRunning : sequence.text;
  ui.text.innerHTML = paragraphs.map((p) => `<p>${p}</p>`).join('');
  ui.inspect.hidden = false;
  ui.inspect.disabled = state === 'running';
  ui.inspect.textContent = state === 'running' ? 'Course en cours…' : sequence.button[state === 'done' ? 1 : 0];
  ui.inspect.removeAttribute('aria-pressed');
  ui.panel.setAttribute('aria-busy', String(state === 'running'));

  const lost = winner === 'attack';
  const steps = [
    ['Signée par Dylan', true],
    ['Envoyée à toutes les îles (notion 4)', true],
    ['En attente dans la mempool', true],
    ['Rangée dans le bloc 4 (notion 5)', !lost],
    [lost ? 'Annulée : le bloc 4 est abandonné' : `Confirmée ${confirmations} fois`, !lost],
  ];
  const lifecycle = `<ol class="lifecycle">${steps.map(([label, ok]) => `<li class="${ok ? 'is-done' : 'is-lost'}">${label}</li>`).join('')}</ol>`;
  const choices = ATTACKS.map(
    (a) => `<button type="button" data-attack="${a}" aria-pressed="${a === power}"${state === 'running' ? ' disabled' : ''}>${Math.round(a * 100)} %</button>`,
  ).join('');
  const blocks = (n) => `${n} bloc${n > 1 ? 's' : ''}`;
  const rows = [
    ['Cycle de vie', lifecycle],
    ['Puissance de Dylan', `${Math.round(power * 100)} % du réseau, contre ${Math.round((1 - power) * 100)} % pour les îles honnêtes<div class="choices">${choices}</div>`],
  ];
  if (state !== 'idle') {
    rows.push(['Branche honnête', `${blocks(honestLength)} après le bloc 3`]);
    rows.push(['Branche de Dylan', `${blocks(attackLength)} après le bloc 3`]);
  }
  rows.push(['Règle des îles', `garder la chaîne la plus longue (course arrêtée à ${goal} blocs)`]);
  ui.fields.hidden = false;
  ui.fields.innerHTML = rows.map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`).join('');
  coffres.forEach((c) => {
    c.setHint(false);
    if (c !== newCoffre) c.setGlow(false);
  });
}

async function toggleInspect() {
  const sequence = SEQUENCES[current];
  if (sequence.consensus) {
    consensus.start(reducedMotion);
    return; // le consensus prévient via `onChange`
  }
  if (sequence.race) {
    race.start(reducedMotion);
    return; // la course prévient via `onChange`
  }
  if (sequence.mining) {
    if (miner.summary().state !== 'running') miner.start(reducedMotion);
    return; // le mineur prévient via `onChange`
  }
  if (sequence.network) {
    linked = true;
    archipel.send(reducedMotion);
    return; // `send` prévient via `onChange`, qui redessine le panneau
  }
  if (sequence.tamper) {
    const target = coffres[sequence.tamper.index];
    if (tampered) {
      tampered = null;
      linked = false;
      target.setShown(null, { stamp: true });
    } else {
      const { block } = target;
      const hash = await sha256(blockContent({ ...block, data: sequence.tamper.data }));
      tampered = { index: sequence.tamper.index, data: sequence.tamper.data, hash };
      linked = true;
      target.setShown(tampered, { stamp: true });
    }
    renderText();
    return;
  }
  if (sequence.chain) {
    linked = !linked;
    renderText();
    return;
  }
  const coffre = focused();
  if (!coffre) return;
  coffre.setInspected(!coffre.inspected);
  renderText();
}

// Barre de progression : un point par séquence, numéroté comme la notion (0 = introduction).
ui.dots.innerHTML = SEQUENCES.map(
  (s, i) => `<li><button type="button" title="${s.step}" aria-label="${s.step} : ${s.title}">${s.notion ?? 0}</button></li>`,
).join('');
[...ui.dots.querySelectorAll('button')].forEach((button, i) => button.addEventListener('click', () => goTo(i)));
ui.prev.addEventListener('click', () => goTo(current - 1));
ui.next.addEventListener('click', () => goTo(current + 1));
ui.inspect.addEventListener('click', toggleInspect);
ui.fields.addEventListener('click', (event) => {
  const choice = event.target.closest('[data-difficulty]');
  if (choice) miner.setDifficulty(choice.dataset.difficulty);
  const method = event.target.closest('[data-method]');
  if (method) consensus.setMethod(method.dataset.method);
  const attack = event.target.closest('[data-attack]');
  if (attack) race.setPower(Number(attack.dataset.attack));
});
window.addEventListener('keydown', (event) => {
  if (event.target.closest?.('input, textarea')) return;
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return; // Alt + ← = page précédente du navigateur
  if (event.key === 'ArrowRight') goTo(current + 1);
  if (event.key === 'ArrowLeft') goTo(current - 1);
});

// --- Clic sur le coffre mis en avant ---
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let downAt = null;

function aim(event) {
  pointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
}

function pickFocused(event) {
  const candidates = SEQUENCES[current].chain?.map((i) => coffres[i]) ?? [focused()];
  aim(event);
  return candidates.find((c) => c && raycaster.intersectObject(c.hitMesh).length) ?? null;
}

// Sur l'archipel : l'île de Dylan envoie la transaction, les autres s'allument ou s'éteignent.
function pickIsland(event) {
  if (!SEQUENCES[current].network) return -1;
  aim(event);
  return archipel.pick(raycaster);
}

canvas.addEventListener('pointerdown', (event) => {
  downAt = { x: event.clientX, y: event.clientY };
});
canvas.addEventListener('pointerup', (event) => {
  // Un glisser sert à tourner la caméra : seul un vrai clic inspecte.
  if (!downAt || Math.hypot(event.clientX - downAt.x, event.clientY - downAt.y) > 6) return;
  const island = pickIsland(event);
  if (island === SENDER) toggleInspect();
  else if (island >= 0) archipel.toggleOffline(island);
  else if (pickFocused(event)) toggleInspect();
});
canvas.addEventListener('pointermove', (event) => {
  if (event.pointerType !== 'mouse') return;
  const hovered = pickFocused(event);
  coffres.forEach((c) => c.setHover(c === hovered));
  const island = pickIsland(event);
  archipel?.setHover(island);
  canvas.style.cursor = hovered || island >= 0 ? 'pointer' : '';
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
  setLeaderResolution(w, h);
  setRouteResolution(w, h);
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
setLeaderResolution(window.innerWidth, window.innerHeight);
setRouteResolution(window.innerWidth, window.innerHeight);
// ?etape=2 ouvre directement la 2e séquence (tests utilisateurs, soutenance).
goTo(Number(new URLSearchParams(location.search).get('etape') ?? 1) - 1 || 0);

renderer.setAnimationLoop((time) => {
  timer.update(time);
  const dt = Math.min(timer.getDelta(), 0.1);
  updateTween(dt);
  updatePops(dt);
  coffres.forEach((c) => c.update(dt, timer.getElapsed(), reducedMotion));
  archipel.update(dt, timer.getElapsed(), reducedMotion);
  links.forEach((link) => link?.update(dt, reducedMotion));
  miner.update(dt);
  consensus.update(dt, timer.getElapsed(), reducedMotion);
  race.update(dt, timer.getElapsed(), reducedMotion);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
});

// Accès pour le débogage dans la console.
window.app = { scene, camera, controls, coffres, archipel, miner, consensus, race, goTo };
