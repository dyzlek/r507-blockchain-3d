import * as THREE from 'three';
import { COLORS, paperMaterial } from './papier.js';

// Un petit bateau en papier mâché qui fait le tour de l'archipel. Il ne sert qu'à faire vivre la mer.
// Coque bosselée (bandes de papier journal collées), mât en bâton, voile en papier.
// Son trajet est une boucle autour de toutes les îles, en dehors de leurs rivages : il ne traverse jamais une île
// (au plus près, il passe à environ 0,6 rayon d'île du sable).
// Coordonnées dans le repère de l'archipel.

const PATH = { rx: 5.5, rz: 5.8, cz: -0.9, wobble: 0.18 };
const LAP = 70; // secondes pour un tour

function pathPoint(t, target) {
  const a = t * Math.PI * 2;
  const w = 1 + Math.sin(a * 5) * (PATH.wobble / PATH.rx);
  return target.set(Math.cos(a) * PATH.rx * w, 0, PATH.cz + Math.sin(a) * PATH.rz * w);
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

export function createBateau(seaY) {
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
  // Liseré peint en corail sur le bord.
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1, 0.06, 6, 40), new THREE.MeshStandardMaterial({ color: 0xc2543a, roughness: 0.8 }));
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
  const index = [];
  for (let r = 0; r <= rows; r++) {
    const y = 0.04 + (r / rows) * 0.34;
    const width = 0.26 * (1 - r / rows);
    for (const u of [0, 0.5, 1]) {
      const x = u * width + 0.012;
      verts.push(x, y, Math.sin(u * Math.PI) * 0.035 * (1 - r / rows));
    }
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < 2; c++) {
      const a = r * 3 + c;
      index.push(a, a + 1, a + 3, a + 1, a + 4, a + 3);
    }
  sailGeometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  sailGeometry.setIndex(index);
  sailGeometry.computeVertexNormals();
  const sail = new THREE.Mesh(sailGeometry, paperMaterial(COLORS.paper, { fibers: 60 }, { side: THREE.DoubleSide }));
  sail.rotation.y = Math.PI; // la voile flotte vers l'arrière
  sail.castShadow = true;
  body.add(sail);

  const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 0.035), new THREE.MeshStandardMaterial({ color: 0xe0684b, side: THREE.DoubleSide }));
  flag.position.set(-0.03, 0.4, 0);
  body.add(flag);

  boat.position.y = seaY;
  const here = new THREE.Vector3();
  const ahead = new THREE.Vector3();
  let t = 0.13;

  return {
    group: boat,
    update(dt, elapsed, instant) {
      if (!instant) t = (t + dt / LAP) % 1;
      pathPoint(t, here);
      pathPoint((t + 0.003) % 1, ahead);
      boat.position.x = here.x;
      boat.position.z = here.z;
      // L'avant (x local) regarde dans le sens de la marche.
      boat.rotation.y = Math.atan2(-(ahead.z - here.z), ahead.x - here.x);
      if (instant) return;
      body.position.y = Math.sin(elapsed * 1.7) * 0.012;
      body.rotation.z = Math.sin(elapsed * 1.3) * 0.06;
      body.rotation.x = Math.sin(elapsed * 1.1 + 1) * 0.05;
      flag.rotation.y = Math.sin(elapsed * 6) * 0.4;
    },
  };
}
