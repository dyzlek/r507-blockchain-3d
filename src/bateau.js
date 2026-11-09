import * as THREE from 'three';
import { COLORS, paperMaterial } from './papier.js';

// Un petit bateau en papier mâché qui fait le tour de l'archipel. Il ne sert qu'à faire vivre la mer.
// Coque bosselée (bandes de papier journal collées), mât en bâton, voile en papier.
// Chaque bateau suit une boucle en dehors des rivages : il ne traverse jamais une île.
// Coordonnées dans le repère de l'archipel.

// Trajets : une boucle (ellipse un peu ondulée) autour d'un centre. `lap` : secondes pour un tour ; `dir` : sens.
export const BOAT_PATHS = {
  dylan: { cx: 0, cz: 2.9, rx: 1.65, rz: 1.55, wobble: 0.05, lap: 45, dir: 1, t0: 0.3, color: '#e0684b' }, // autour de l'île de Dylan
  large: { cx: 0, cz: -0.9, rx: 5.5, rz: 5.8, wobble: 0.18, lap: 80, dir: 1, t0: 0.13, color: '#3f7f8c' }, // autour de tout l'archipel
  large2: { cx: 0, cz: -0.9, rx: 6.1, rz: 6.4, wobble: 0.15, lap: 95, dir: -1, t0: 0.62, color: '#e2a93b' }, // plus au large, en sens inverse
};

function pathPoint(path, t, target) {
  const a = t * Math.PI * 2 * path.dir;
  const w = 1 + Math.sin(a * 5) * (path.wobble / path.rx);
  return target.set(path.cx + Math.cos(a) * path.rx * w, 0, path.cz + Math.sin(a) * path.rz * w);
}

// Le papier mâché n'est jamais lisse : on bosselle la géométrie avec un bruit déterministe.
function lumpy(geometry, amount, seed) {
  const pos = geometry.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n = Math.sin(v.x * 13 + seed) * Math.cos(v.y * 11 - seed) * Math.sin(v.z * 17 + seed * 2);
    v.multiplyScalar(1 + n * amount);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geometry.computeVertexNormals();
  return geometry;
}

// Voile en papier rayé : bandes crème et bandes de la couleur du bateau, avec un peu de grain.
const sailCache = new Map();
function stripedSail(color) {
  if (!sailCache.has(color)) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 128;
    const g = canvas.getContext('2d');
    g.fillStyle = '#fbf6ec';
    g.fillRect(0, 0, 128, 128);
    g.fillStyle = color;
    for (let i = 0; i < 4; i++) g.fillRect(0, i * 32 + 4, 128, 14);
    for (let i = 0; i < 500; i++) {
      g.fillStyle = `rgba(90,60,30,${Math.random() * 0.06})`;
      g.fillRect(Math.random() * 128, Math.random() * 128, 2, 2);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    sailCache.set(color, texture);
  }
  return sailCache.get(color);
}

// Sillage : petites pastilles d'écume en papier qui restent derrière le bateau et rétrécissent.
const WAKE = 16;
const foamGeometry = new THREE.CircleGeometry(1, 10).rotateX(-Math.PI / 2);
const foamMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.85, depthWrite: false });

export function createBateau(seaY, path) {
  const boat = new THREE.Group();
  const body = new THREE.Group(); // tangage et roulis
  boat.add(body);

  // Coque : demi-sphère allongée, ouverte en haut, retournée.
  const hullGeometry = lumpy(new THREE.SphereGeometry(1, 28, 14, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), 0.05, 3);
  const newsprint = paperMaterial(COLORS.paper, { fibers: 160, stripes: true }, { side: THREE.DoubleSide, flatShading: true });
  const hull = new THREE.Mesh(hullGeometry, newsprint);
  hull.scale.set(0.42, 0.16, 0.16);
  hull.castShadow = true;
  body.add(hull);
  // Pont en carton : ferme la coque, sinon on voit la mer à l'intérieur quand la vague monte.
  const deck = new THREE.Mesh(new THREE.CircleGeometry(1, 32).rotateX(-Math.PI / 2), paperMaterial(COLORS.kraft, { stripes: true }));
  deck.scale.set(0.41, 1, 0.155);
  deck.position.y = -0.005;
  deck.receiveShadow = true;
  body.add(deck);
  // Liseré peint en corail sur le bord.
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1, 0.035, 6, 40), new THREE.MeshStandardMaterial({ color: path.color, roughness: 0.8 }));
  rim.rotation.x = Math.PI / 2;
  rim.scale.set(0.42, 0.16, 0.3);
  body.add(rim);

  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.01, 0.42, 6), new THREE.MeshStandardMaterial({ color: 0x8a5a35, roughness: 0.9 }));
  mast.position.y = 0.21;
  mast.castShadow = true;
  body.add(mast);

  // Voile : un triangle de papier, un peu gonflé par le vent.
  const sailGeometry = new THREE.BufferGeometry();
  const rows = 6;
  const verts = [];
  const uvs = [];
  const index = [];
  for (let r = 0; r <= rows; r++) {
    const y = 0.04 + (r / rows) * 0.34;
    const width = 0.26 * (1 - r / rows);
    for (const u of [0, 0.5, 1]) {
      const x = u * width + 0.012;
      verts.push(x, y, Math.sin(u * Math.PI) * 0.035 * (1 - r / rows));
      uvs.push(u, r / rows);
    }
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < 2; c++) {
      const a = r * 3 + c;
      index.push(a, a + 1, a + 3, a + 1, a + 4, a + 3);
    }
  sailGeometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  sailGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  sailGeometry.setIndex(index);
  sailGeometry.computeVertexNormals();
  const sail = new THREE.Mesh(sailGeometry, new THREE.MeshStandardMaterial({ map: stripedSail(path.color), side: THREE.DoubleSide, roughness: 0.9 }));
  sail.rotation.y = Math.PI; // la voile flotte vers l'arrière
  sail.castShadow = true;
  body.add(sail);

  const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.035), new THREE.MeshStandardMaterial({ color: path.color, side: THREE.DoubleSide }));
  flag.position.set(-0.03, 0.4, 0);
  body.add(flag);

  boat.position.y = seaY;
  // Le sillage est posé sur la mer, à part du bateau (il ne tourne pas avec lui).
  const root = new THREE.Group();
  root.add(boat);
  const wake = new THREE.InstancedMesh(foamGeometry, foamMaterial, WAKE);
  wake.frustumCulled = false;
  root.add(wake);
  const trail = Array.from({ length: WAKE }, () => new THREE.Vector3(0, -99, 0));
  const foamMatrix = new THREE.Matrix4();
  const foamScale = new THREE.Vector3();
  const noTurn = new THREE.Quaternion();
  let dropClock = 0;
  const here = new THREE.Vector3();
  const ahead = new THREE.Vector3();
  let t = path.t0;

  return {
    group: root,
    update(dt, elapsed, instant) {
      if (!instant) t = (t + dt / path.lap) % 1;
      pathPoint(path, t, here);
      pathPoint(path, (t + 0.003) % 1, ahead);
      boat.position.x = here.x;
      boat.position.z = here.z;
      // L'avant (x local) regarde dans le sens de la marche.
      boat.rotation.y = Math.atan2(-(ahead.z - here.z), ahead.x - here.x);
      // Une pastille d'écume tous les 0,25 s, à la ligne de flottaison ; les plus vieilles rapetissent.
      dropClock += dt;
      if (dropClock > 0.25 || trail[0].y === -99) {
        dropClock = 0;
        trail.pop();
        trail.unshift(new THREE.Vector3(here.x, seaY - 0.02, here.z));
      }
      trail.forEach((p, i) => {
        const r = p.y === -99 ? 0 : 0.07 * (1 - i / WAKE) + 0.015;
        foamScale.set(r, 1, r);
        foamMatrix.compose(p, noTurn, foamScale);
        wake.setMatrixAt(i, foamMatrix);
      });
      wake.instanceMatrix.needsUpdate = true;
      if (instant) return;
      body.position.y = Math.sin(elapsed * 1.7) * 0.012;
      body.rotation.z = Math.sin(elapsed * 1.3) * 0.06;
      body.rotation.x = Math.sin(elapsed * 1.1 + 1) * 0.05;
      flag.rotation.y = Math.sin(elapsed * 6) * 0.4;
    },
  };
}
