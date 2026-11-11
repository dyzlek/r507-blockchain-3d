import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { shortHash } from './chain.js';
import { COLORS, cardboard, cardboardDark, coinTexture, createStampTool, pairColor, paperMaterial, stampTexture } from './papier.js';

// Un bloc = un coffre en carton avec une fenêtre en papier calque : on devine son contenu sans l'ouvrir
// (l'ouvrir briserait le sceau). Inspecter le coffre, c'est allumer sa lampe : le calque devient lisible.
export const COFFRE_SIZE = { w: 1.6, h: 1.1, d: 1.1 };
const { w, h, d } = COFFRE_SIZE;
const T = 0.035; // épaisseur du carton
const MARGIN = 0.15; // largeur du cadre autour de la fenêtre

const hitGeometry = new THREE.BoxGeometry(w, h, d);
const hitMaterial = new THREE.MeshBasicMaterial({ visible: false });
const scrollGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.9, 24);
const coinGeometry = new THREE.CylinderGeometry(0.17, 0.17, 0.05, 40);
const sealGeometry = new THREE.PlaneGeometry(0.62, 0.62);
const parentSealGeometry = new THREE.PlaneGeometry(0.34, 0.34);

// Cadre de la face avant : un carton découpé, avec un trou pour la fenêtre.
const frameGeometry = (() => {
  const shape = new THREE.Shape();
  shape.moveTo(-w / 2, -h / 2).lineTo(w / 2, -h / 2).lineTo(w / 2, h / 2).lineTo(-w / 2, h / 2).lineTo(-w / 2, -h / 2);
  const hole = new THREE.Path();
  hole
    .moveTo(-w / 2 + MARGIN, -h / 2 + MARGIN)
    .lineTo(-w / 2 + MARGIN, h / 2 - MARGIN)
    .lineTo(w / 2 - MARGIN, h / 2 - MARGIN)
    .lineTo(w / 2 - MARGIN, -h / 2 + MARGIN)
    .lineTo(-w / 2 + MARGIN, -h / 2 + MARGIN);
  shape.holes.push(hole);
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: T, bevelEnabled: false });
  const uv = geometry.attributes.uv.array;
  for (let i = 0; i < uv.length; i++) uv[i] *= 0.55; // le grain du carton à la bonne échelle
  return geometry;
})();
const vellumGeometry = new THREE.PlaneGeometry(w - MARGIN * 2, h - MARGIN * 2);

// Traits épais (Line2) : leur épaisseur est en pixels, il faut leur donner la taille de l'écran.
const leaderMaterials = [];
export function setLeaderResolution(width, height) {
  leaderMaterials.forEach((material) => material.resolution.set(width, height));
}

// Flèche imprimée au pochoir sur le couvercle, comme sur un carton de déménagement : elle montre le sens
// de la chaîne (du bloc le plus ancien vers le plus récent, vers +x). Une seule texture pour tous les coffres.
let arrowStencil = null;
function arrowStencilTexture() {
  if (arrowStencil) return arrowStencil;
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const g = canvas.getContext('2d');
  g.fillStyle = 'rgba(74, 52, 32, 0.82)';
  // Corps de la flèche en trois tirets (les ponts du pochoir), puis la pointe.
  [[20, 62], [72, 114], [124, 160]].forEach(([from, to]) => g.fillRect(from, 50, to - from, 28));
  g.beginPath();
  g.moveTo(168, 18);
  g.lineTo(240, 64);
  g.lineTo(168, 110);
  g.closePath();
  g.fill();
  // Encre un peu irrégulière : on gratte quelques points au hasard.
  g.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 260; i++) {
    g.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.5})`;
    g.fillRect(Math.random() * 256, Math.random() * 128, 1 + Math.random() * 3, 1 + Math.random() * 3);
  }
  arrowStencil = new THREE.CanvasTexture(canvas);
  arrowStencil.colorSpace = THREE.SRGBColorSpace;
  arrowStencil.anisotropy = 4;
  return arrowStencil;
}
const lidArrowGeometry = new THREE.PlaneGeometry(1.0, 0.5);

// Le sceau est un coup de tampon encreur, tiré du vrai hash (voir papier.js).
export const sealTexture = stampTexture;

const stampMaterial = (hash, options) =>
  new THREE.MeshStandardMaterial({ map: stampTexture(hash, options), transparent: true, roughness: 0.95, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });

// Lueur de la lampe : un halo rond qui s'efface sur les bords, créé une fois pour tous les coffres.
let lampLightTextures = null;
function lampLight() {
  if (lampLightTextures) return lampLightTextures;
  const make = (width, height, paint) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    paint(canvas.getContext('2d'), width, height);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };
  const halo = make(128, 128, (g, width, height) => {
    const radial = g.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2);
    radial.addColorStop(0, 'rgba(255, 238, 195, 1)');
    radial.addColorStop(0.3, 'rgba(255, 214, 140, 0.5)');
    radial.addColorStop(1, 'rgba(255, 200, 120, 0)');
    g.fillStyle = radial;
    g.fillRect(0, 0, width, height);
  });
  lampLightTextures = { halo };
  return lampLightTextures;
}

function makeLabel(className, html) {
  const el = document.createElement('div');
  el.className = className;
  el.innerHTML = html;
  return new CSS2DObject(el);
}

export function createCoffre(block) {
  const group = new THREE.Group();

  // Boîte en carton : dos, côtés, fond, couvercle un peu plus large ; face avant = cadre + calque.
  const shadowed = (mesh) => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  };
  // La boîte est dans son propre groupe : elle peut s'écraser au coup de tampon sans toucher à l'échelle
  // du coffre entier (utilisée par les apparitions des notions 5 et 7).
  const shell = new THREE.Group();
  group.add(shell);
  const walls = cardboard().clone(); // propre à ce coffre : il s'éclaire au survol
  const panel = (width, height, depth, x, y, z, material = walls) => {
    const mesh = shadowed(new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material));
    mesh.position.set(x, y, z);
    shell.add(mesh);
    return mesh;
  };
  panel(w, h, T, 0, 0, -d / 2 + T / 2);
  panel(T, h, d, -w / 2 + T / 2, 0, 0);
  panel(T, h, d, w / 2 - T / 2, 0, 0);
  panel(w, T, d, 0, -h / 2 + T / 2, 0);
  panel(w + 0.08, T * 1.6, d + 0.08, 0, h / 2 + T * 0.8, 0, cardboardDark());
  const lidArrow = new THREE.Mesh(
    lidArrowGeometry,
    new THREE.MeshStandardMaterial({ map: arrowStencilTexture(), transparent: true, roughness: 0.95, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }),
  );
  lidArrow.rotation.x = -Math.PI / 2; // à plat sur le couvercle, la pointe vers le coffre suivant (+x)
  lidArrow.position.set(0, h / 2 + T * 1.6 + 0.002, 0);
  lidArrow.receiveShadow = true;
  shell.add(lidArrow);
  const frame = shadowed(new THREE.Mesh(frameGeometry, walls));
  frame.position.z = d / 2 - T;
  shell.add(frame);
  const vellum = new THREE.Mesh(
    vellumGeometry,
    new THREE.MeshStandardMaterial({
      map: paperMaterial(COLORS.vellum, { fibers: 220, grain: 0.05 }).map,
      transparent: true,
      opacity: 0.74,
      roughness: 0.85,
      emissive: new THREE.Color(0xffc98a),
      emissiveIntensity: 0,
      depthWrite: false,
    }),
  );
  vellum.position.z = d / 2 - T / 2;
  shell.add(vellum);
  const body = new THREE.Mesh(hitGeometry, hitMaterial); // invisible : sert seulement au clic
  group.add(body);

  // Contenu deviné à travers le calque : le rouleau de la transaction et la pièce du nonce.
  const contents = new THREE.Group();
  group.add(contents);
  const scroll = shadowed(new THREE.Mesh(scrollGeometry, paperMaterial(COLORS.scroll).clone()));
  scroll.rotation.z = Math.PI / 2;
  scroll.position.set(-0.2, -0.36, 0);
  contents.add(scroll);
  const coinFace = new THREE.MeshStandardMaterial({ map: coinTexture(block.nonce), roughness: 0.6 });
  const coinSide = new THREE.MeshStandardMaterial({ color: COLORS.gold, roughness: 0.6 });
  const coin = shadowed(new THREE.Mesh(coinGeometry, [coinSide, coinFace, coinFace]));
  coin.rotation.x = Math.PI / 2;
  coin.position.set(0.58, -0.3, 0.15);
  contents.add(coin);

  // Sceau du coffre (sa propre empreinte), sur la face avant.
  // Tamponné sur le calque, un peu de travers comme un vrai coup de tampon.
  const seal = new THREE.Mesh(sealGeometry, stampMaterial(block.hash, { color: pairColor(block.index) }));
  seal.position.set(0.18, 0.16, d / 2 + 0.003);
  seal.rotation.z = -0.08 + ((block.index * 37) % 10) / 60;
  seal.renderOrder = 2; // toujours après le calque transparent, sinon il le recouvre et le sceau paraît pâle
  group.add(seal);

  // Sceau du parent, recopié en petit dans le coin gauche (côté du coffre précédent).
  const parentSeal = new THREE.Mesh(parentSealGeometry, stampMaterial(block.parentHash, { small: true, color: pairColor(block.index - 1) }));
  parentSeal.position.set(-w / 2 + 0.26, h / 2 - 0.24, d / 2 + 0.003);
  parentSeal.rotation.z = 0.1;
  parentSeal.renderOrder = 2;
  group.add(parentSeal);

  // Cercles autour des sceaux, allumés quand on compare un sceau à sa copie chez le suivant.
  // Chaque cercle prend la couleur de son sceau (la paire reste reconnaissable), sauf bloc falsifié : rouge.
  const ownRingMaterial = new THREE.MeshBasicMaterial({ color: pairColor(block.index), transparent: true, opacity: 0, depthTest: false });
  const parentRingMaterial = new THREE.MeshBasicMaterial({ color: pairColor(block.index - 1), transparent: true, opacity: 0, depthTest: false });
  const makeRing = (inner, outer, at, ringMaterial) => {
    const ring = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 48), ringMaterial);
    ring.position.copy(at);
    ring.position.z += 0.01;
    ring.renderOrder = 9;
    group.add(ring);
    return ring;
  };
  const sealRing = makeRing(0.34, 0.4, seal.position, ownRingMaterial);
  const parentRing = makeRing(0.19, 0.23, parentSeal.position, parentRingMaterial);
  let glow = 0;
  let glowTarget = 0;
  let stampPop = 1; // repart de 0 à chaque coup de tampon (petit écrasement du coffre)

  // Le vrai tampon encreur vient s'imprimer sur le calque, avec quelques gouttes d'encre autour.
  // Créé au premier coup de tampon seulement : la plupart des coffres n'en ont jamais besoin.
  let tool = null;
  let splats = [];
  let stamping = null; // { t } pendant l'animation
  let stampedHash = null; // le minage peut redemander le même sceau : on ne retamponne pas
  function startStamp() {
    if (!tool) {
      tool = createStampTool();
      tool.rotation.x = Math.PI / 2; // le manche vers l'avant, le caoutchouc contre le calque
      tool.scale.setScalar(0.85);
      group.add(tool);
      const ink = new THREE.MeshBasicMaterial({ color: COLORS.ink, transparent: true, opacity: 0, depthWrite: false });
      splats = Array.from({ length: 12 }, () => {
        const dot = new THREE.Mesh(new THREE.CircleGeometry(0.012 + Math.random() * 0.018, 10), ink);
        const a = Math.random() * Math.PI * 2;
        const r = 0.33 + Math.random() * 0.1;
        dot.position.set(seal.position.x + Math.cos(a) * r, seal.position.y + Math.sin(a) * r, seal.position.z + 0.002);
        dot.renderOrder = 2;
        group.add(dot);
        return dot;
      });
    }
    stamping = { t: 0 };
  }
  function updateStamp(dt, instant) {
    if (!stamping) return;
    stamping.t = instant ? 1.7 : stamping.t + dt;
    const t = stamping.t;
    // 0 → 0,4 s : le tampon arrive ; 0,4 → 0,55 : il appuie ; 0,55 → 1 : il repart.
    const ease = (k) => (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2);
    const away = t < 0.4 ? 1 - ease(t / 0.4) : t < 0.55 ? 0 : ease(Math.min(1, (t - 0.55) / 0.45));
    tool.visible = t < 1;
    tool.position.set(seal.position.x, seal.position.y, seal.position.z + 0.01 + away * 2.2);
    const inked = Math.min(1, Math.max(0, (t - 0.4) / 0.1));
    seal.material.opacity = inked;
    if (t >= 0.4 && !stamping.hit) {
      stamping.hit = true;
      stampPop = 0;
    }
    // Les gouttes giclent à l'impact, puis sèchent et s'effacent : elles ne restent pas sur le coffre.
    splats[0].material.opacity = t < 0.42 ? 0 : 0.7 * Math.max(0, 1 - (t - 0.9) / 0.8);
    if (t >= 1.7) stamping = null;
  }

  const plate = makeLabel('plate plate--bloc', `Bloc n°${block.index}`);
  plate.position.set(0, h / 2 + 0.3, 0);
  group.add(plate);

  const hint = makeLabel('hint', 'Clique pour allumer la lampe');
  hint.position.set(0, -h / 2 - 0.35, 0);
  hint.visible = false;
  group.add(hint);

  // Flèche corail au-dessus du coffre visé, tant qu'on ne l'a pas encore inspecté : « ce coffre-là ».
  const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.28, 18), new THREE.MeshBasicMaterial({ color: 0xe0684b }));
  arrow.rotation.x = Math.PI; // la pointe vers le bas
  arrow.visible = false;
  group.add(arrow);

  // La lampe du coffre : une petite lampe de bureau posée au fond de la boîte, derrière le calque, entre le rouleau
  // et la pièce. Éteinte, l'ampoule est grise ; à l'inspection elle s'allume et la fenêtre s'éclaire de l'intérieur.
  const lamp = new THREE.Group();
  lamp.position.set(0.42, -h / 2 + T, -0.2);
  const brass = new THREE.MeshStandardMaterial({ color: COLORS.gold, roughness: 0.5, metalness: 0.3, side: THREE.DoubleSide });
  const lampBase = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.03, 20), brass));
  lampBase.position.y = 0.015;
  const lampArm = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.3, 8), brass));
  lampArm.position.y = 0.18;
  const lampShade = shadowed(new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.16, 20, 1, true), brass));
  lampShade.position.set(0, 0.36, 0);
  lampShade.rotation.x = -0.6; // l'ouverture regarde la fenêtre du coffre, vers l'avant
  const bulbOff = new THREE.Color(0x6b5d4a);
  const bulbOn = new THREE.Color(0xffe2a8);
  const bulbMaterial = new THREE.MeshBasicMaterial({ color: bulbOff });
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 12), bulbMaterial);
  bulb.position.set(0, 0.32, 0.03);
  const light = lampLight();
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: light.halo, blending: THREE.AdditiveBlending, transparent: true, opacity: 0, depthWrite: false }));
  halo.scale.setScalar(1.3); // la lueur remplit la fenêtre
  halo.position.copy(bulb.position);
  lamp.add(lampBase, lampArm, lampShade, bulb, halo);
  group.add(lamp);

  // Étiquettes des champs : un trait épais relie chaque étiquette à une pastille posée sur l'objet.
  // `offset` place la pastille sur la face visible de l'objet.
  const fields = [
    { key: 'Transaction', value: block.data, target: scroll, offset: [0.1, 0, 0.13], at: [-1.2, -0.85, 0.5] },
    { key: 'Nonce', value: block.nonce, target: coin, offset: [0, 0, 0.03], at: [1.3, -0.7, 0.4] },
    { key: 'Sceau', value: shortHash(block.hash), target: seal, offset: [0, 0, 0.01], at: [1.25, 0.85, 0.6] },
    { key: 'Sceau du coffre d’avant', value: shortHash(block.parentHash), target: parentSeal, offset: [0, 0, 0.01], at: [-1.35, 0.9, 0.6] },
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
    line.renderOrder = 10; // dessiné par-dessus le calque
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
    // `text` : la consigne de la bulle (par défaut, celle de la notion 1).
    setHint(value, text = 'Clique pour allumer la lampe') {
      hint.visible = value;
      if (value && hint.element.textContent !== text) hint.element.textContent = text;
    },
    // `own` / `parent` choisissent les anneaux allumés : le sceau du coffre, sa copie du sceau d'avant, ou les deux.
    // `color` : couleur forcée (bloc falsifié) ; sans, chaque cercle garde la couleur de son sceau.
    setGlow(value, color = null, { own = true, parent = true } = {}) {
      glowTarget = value ? 1 : 0;
      ownRingMaterial.color.set(color ?? pairColor(block.index));
      parentRingMaterial.color.set(color ?? pairColor(block.index - 1));
      sealRing.visible = own;
      parentRing.visible = parent;
    },
    // Affiche un contenu falsifié (ou remet l'original avec `null`) : nouveau sceau et nouvelles étiquettes.
    // `stamp` : le changement se fait sous les yeux de l'utilisateur, avec un coup de tampon.
    setShown(shown, { stamp = false } = {}) {
      const { data, hash } = shown ?? block;
      const text = (i, value) => (leaders[i].label.element.querySelector('.field-value').textContent = value);
      text(0, data);
      text(2, shortHash(hash));
      seal.material.map.dispose();
      seal.material.map = stampTexture(hash, { color: pairColor(block.index) });
      seal.material.needsUpdate = true;
      if (stamp) startStamp(); // nouveau coup de tampon
      plate.element.classList.toggle('is-broken', Boolean(shown));
      plate.element.textContent = shown ? `Bloc n°${block.index} · falsifié` : `Bloc n°${block.index}`;
    },
    // Minage (notion 5) : affiche un essai { nonce, hash }, ou aucun sceau avec `null`.
    // Un sceau qui ne respecte pas la difficulté reste pâle ; `label` remplace le texte de la plaque.
    setTrial(trial, { valid = false, label } = {}) {
      seal.visible = Boolean(trial);
      plate.element.textContent = label ?? `Bloc n°${block.index}`;
      plate.element.classList.toggle('is-sealed', valid);
      if (!valid) {
        stampedHash = null;
        if (splats.length) splats[0].material.opacity = 0; // l'encre du coup de tampon précédent
      }
      if (!trial) return;
      const text = (i, value) => (leaders[i].label.element.querySelector('.field-value').textContent = value);
      text(1, trial.nonce);
      text(2, shortHash(trial.hash));
      seal.material.map.dispose();
      seal.material.map = stampTexture(trial.hash, { color: pairColor(block.index) });
      // Un essai raté laisse un tampon pâle (pas assez d'encre) ; le bon nonce, un vrai coup de tampon.
      seal.material.opacity = valid ? 1 : 0.35;
      seal.material.needsUpdate = true;
      if (valid && trial.hash !== stampedHash) {
        stampedHash = trial.hash;
        startStamp();
      }
      coinFace.map.dispose();
      coinFace.map = coinTexture(trial.nonce);
      coinFace.needsUpdate = true;
    },
    // Double dépense (notion 7) : texte de la plaque, en rouge pour la branche du tricheur ou un bloc abandonné.
    setPlate(label, { broken = false } = {}) {
      plate.element.textContent = label ?? `Bloc n°${block.index}`;
      plate.element.classList.toggle('is-broken', broken);
    },
    setHover(value) {
      walls.emissive.setHex(value ? 0x40160a : 0);
    },
    update(dt, elapsed, instant) {
      const target = inspected ? 1 : 0;
      reveal = instant ? target : THREE.MathUtils.damp(reveal, target, 6, dt);
      // Inspection = lampe allumée : le calque s'éclaire par derrière et devient plus transparent,
      // et le contenu se soulève légèrement.
      contents.position.y = reveal * (0.1 + Math.sin(elapsed * 2) * 0.02);
      scroll.material.emissive.setRGB(0.25 * reveal, 0.2 * reveal, 0.1 * reveal);
      vellum.material.emissiveIntensity = reveal * 0.35;
      vellum.material.opacity = 0.74 - reveal * 0.44;
      // L'ampoule et la lueur de la lampe suivent l'allumage.
      bulbMaterial.color.copy(bulbOff).lerp(bulbOn, reveal);
      halo.material.opacity = reveal * (0.95 + Math.sin(elapsed * 3) * 0.05);
      arrow.visible = hint.visible;
      arrow.position.set(0, h / 2 + 0.8 + Math.sin(elapsed * 4) * 0.07, 0);
      // Coup de tampon : le coffre s'écrase un instant puis reprend sa forme, l'encre s'étale.
      updateStamp(dt, instant);
      stampPop = instant ? 1 : Math.min(1, stampPop + dt * 3.5);
      const squash = 1 - 0.12 * Math.sin(stampPop * Math.PI) * (1 - stampPop);
      shell.scale.set(1 + (1 - squash) * 0.4, squash, 1 + (1 - squash) * 0.4);
      seal.scale.setScalar(1 + 0.25 * (1 - stampPop) ** 2);
      leaderMaterial.opacity = reveal;
      glow = instant ? glowTarget : THREE.MathUtils.damp(glow, glowTarget, 6, dt);
      ownRingMaterial.opacity = parentRingMaterial.opacity = glow * (0.75 + Math.sin(elapsed * 4) * 0.2);
      if (reveal > 0.001) updateLeaders();
    },
  };
}
