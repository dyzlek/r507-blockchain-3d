import * as THREE from 'three';

// Nuages en volume (des boules de coton blanc collées ensemble), qui n'existent que pendant le trajet entre la
// chaîne et l'archipel :
// - une couche au-dessus de l'île de Dylan, qu'on voit arriver en montant et s'éloigner en sortant ;
// - la traversée : des nuages tout autour de la caméra, qui défilent en profondeur (avec la brume de main.js,
//   on ne voit alors plus rien d'autre).
// Tout est dessiné en deux InstancedMesh (un appel de dessin chacun), opaques : un nuage apparaît en gonflant
// plutôt qu'en devenant transparent. Pas de tri de transparence, pas d'ombres recalculées : la traversée reste fluide.

const smooth = (a, b, x) => {
  const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

// Petit générateur pseudo-aléatoire : les nuages sont toujours aux mêmes endroits.
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Un nuage = 5 à 8 boules : une grosse au centre, des plus petites autour, la base aplatie.
function makePuffs(rand) {
  const count = 5 + Math.floor(rand() * 4);
  const puffs = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + rand() * 0.6;
    const ring = i === 0 ? 0 : 0.7 + rand() * 0.5;
    const r = i === 0 ? 1 : 0.55 + rand() * 0.35;
    puffs.push({
      offset: new THREE.Vector3(Math.cos(a) * ring * 1.3, (i === 0 ? 0.25 : rand() * 0.3), Math.sin(a) * ring * 0.8),
      radius: r,
    });
  }
  return puffs;
}

const FLIGHT_CLOUDS = 30;
const FLIGHT_NEAR = 3; // profondeurs (unités du monde) entre lesquelles défilent les nuages de la traversée
const FLIGHT_FAR = 45;
const FLIGHT_SPEED = 28; // unités par seconde
const LAYER_CLOUDS = 40;

const geometry = new THREE.IcosahedronGeometry(1, 3);
const material = new THREE.MeshStandardMaterial({ color: 0xfffaf0, roughness: 1, metalness: 0, emissive: 0xe8dcc8, emissiveIntensity: 0.35 });

function instanced(clouds) {
  const total = clouds.reduce((n, c) => n + c.puffs.length, 0);
  const mesh = new THREE.InstancedMesh(geometry, material, total);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false; // les instances bougent partout : la boîte englobante ne suit pas
  mesh.renderOrder = 3; // après les sceaux des coffres (2)
  mesh.count = total;
  return mesh;
}

export function createNuages() {
  const group = new THREE.Group();
  const matrix = new THREE.Matrix4();
  const pos = new THREE.Vector3();
  const scl = new THREE.Vector3();
  const quat = new THREE.Quaternion();
  const zero = new THREE.Matrix4().makeScale(0, 0, 0);

  // La couche au-dessus de l'île de Dylan.
  const rand = seeded(11);
  const layer = Array.from({ length: LAYER_CLOUDS }, () => ({
    puffs: makePuffs(rand),
    base: new THREE.Vector3(-42 + rand() * 84, 30 + rand() * 30, -35 + rand() * 80),
    rotation: new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rand() * Math.PI),
    size: 3.2 + rand() * 2.8,
    drift: 0.12 + rand() * 0.15,
  }));
  const layerMesh = instanced(layer);
  group.add(layerMesh);

  // La traversée : des nuages répartis dans le champ de la caméra, à des profondeurs différentes, qui défilent.
  const flightRand = seeded(29);
  const flight = Array.from({ length: FLIGHT_CLOUDS }, (_, i) => ({
    puffs: makePuffs(flightRand),
    depth: FLIGHT_NEAR + (i / FLIGHT_CLOUDS) * (FLIGHT_FAR - FLIGHT_NEAR),
    x: (flightRand() * 2 - 1) * 1.1,
    y: (flightRand() * 2 - 1) * 1.1,
    spin: flightRand() * Math.PI * 2,
    order: (i * 13) % FLIGHT_CLOUDS, // ordre d'apparition, mélangé
    size: 0.09 + flightRand() * 0.07,
  }));
  const flightMesh = instanced(flight);
  group.add(flightMesh);

  const spinQuat = new THREE.Quaternion();
  const yAxis = new THREE.Vector3(0, 1, 0);
  const local = new THREE.Vector3();
  const center = new THREE.Vector3();

  // Écrit les boules d'un nuage dans l'InstancedMesh, à partir de l'indice `index`.
  function writeCloud(mesh, index, cloud, origin, rotation, size) {
    for (const puff of cloud.puffs) {
      if (size < 1e-3) {
        mesh.setMatrixAt(index++, zero);
        continue;
      }
      pos.copy(puff.offset).applyQuaternion(rotation).multiplyScalar(size).add(origin);
      const r = puff.radius * size;
      scl.set(r, r * 0.72, r); // un peu aplati
      matrix.compose(pos, rotation, scl);
      mesh.setMatrixAt(index++, matrix);
    }
    return index;
  }

  let thickness = 0; // 0 = pas dans les nuages, 1 = en plein dedans
  let flightDirection = 1; // 1 : les nuages s'éloignent (dézoom) ; -1 : ils arrivent (rezoom)
  let amount = 0; // 0 = aucun nuage de la couche, 1 = tous là
  let idle = false; // tout est déjà caché : rien à recalculer

  return {
    group,
    setFlight(direction) {
      flightDirection = direction;
    },
    setThickness(value) {
      thickness = value;
    },
    update(camera, dt, elapsed, active, instant) {
      amount = instant ? (active ? 1 : 0) : THREE.MathUtils.damp(amount, active ? 1 : 0, 3, dt);
      const hidden = amount < 0.005 && thickness < 0.005;
      group.visible = !hidden;
      if (hidden && idle) return;
      idle = hidden;

      let index = 0;
      for (const cloud of layer) {
        center.copy(cloud.base);
        center.x += Math.sin(elapsed * cloud.drift) * 4;
        // Près de la caméra, le nuage se dégonfle : jamais d'écran bouché d'un coup.
        const near = smooth(2, 9, camera.position.distanceTo(center));
        index = writeCloud(layerMesh, index, cloud, center, cloud.rotation, cloud.size * amount * near);
      }
      layerMesh.instanceMatrix.needsUpdate = true;

      const halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const halfWidth = halfHeight * camera.aspect;
      index = 0;
      for (const cloud of flight) {
        cloud.depth += flightDirection * FLIGHT_SPEED * dt;
        if (cloud.depth > FLIGHT_FAR) cloud.depth -= FLIGHT_FAR - FLIGHT_NEAR;
        if (cloud.depth < FLIGHT_NEAR) cloud.depth += FLIGHT_FAR - FLIGHT_NEAR;
        const fade = smooth(FLIGHT_NEAR, FLIGHT_NEAR + 5, cloud.depth) * (1 - smooth(FLIGHT_FAR - 12, FLIGHT_FAR, cloud.depth));
        // Les nuages gonflent un à un, au fil de l'entrée dans la couche.
        const grow = THREE.MathUtils.clamp(thickness * (FLIGHT_CLOUDS + 4) - cloud.order, 0, 1);
        const size = cloud.size * cloud.depth * smooth(0, 1, grow) * fade;
        local.set(cloud.x * halfWidth * cloud.depth, cloud.y * halfHeight * cloud.depth, -cloud.depth);
        center.copy(camera.localToWorld(local));
        quat.copy(camera.quaternion).multiply(spinQuat.setFromAxisAngle(yAxis, cloud.spin));
        index = writeCloud(flightMesh, index, cloud, center, quat, size);
      }
      flightMesh.instanceMatrix.needsUpdate = true;
    },
  };
}
