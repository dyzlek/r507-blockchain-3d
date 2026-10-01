import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scène de démarrage : une chaîne de blocs reliés, base du prototype.
const canvas = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d1117);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 3, 10);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.add(new THREE.AmbientLight(0xffffff, 0.4));
const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(5, 8, 5);
scene.add(light);

const BLOCK_COUNT = 4;
const SPACING = 2.5;
const blockGeometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);
const blockMaterial = new THREE.MeshStandardMaterial({ color: 0x2f81f7 });
const linkMaterial = new THREE.LineBasicMaterial({ color: 0x8b949e });

const startX = -((BLOCK_COUNT - 1) * SPACING) / 2;
for (let i = 0; i < BLOCK_COUNT; i++) {
  const block = new THREE.Mesh(blockGeometry, blockMaterial);
  block.position.x = startX + i * SPACING;
  scene.add(block);

  if (i > 0) {
    const points = [
      new THREE.Vector3(block.position.x - SPACING + 0.7, 0, 0),
      new THREE.Vector3(block.position.x - 0.7, 0, 0),
    ];
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), linkMaterial));
  }
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(() => {
  controls.update();
  renderer.render(scene, camera);
});
