import THREE from 'three'
import events from './events';
import Cube from './Cube'
import Plane from './Plane'
import Player from './Player';

let renderer;
let player;

let scene = initWorld();
animate();

function initWorld() {
  events.init();

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClearColor = false;
  document.body.appendChild(renderer.domElement);

  let scene = new THREE.Scene();

  player = new Player();
  player.addToScene(scene);

  let floor = new Plane({name: 'floor', size: {w: 2000, h: 2000}, rotation: {x: -Math.PI / 2, y: 0, z: 0}, randomColors: true});
  scene.add(floor.mesh);

  let cube = new Cube({name: 'cube', position: new THREE.Vector3(0, 50, -300), texture: 'crate.gif'});
  scene.add(cube.mesh);

  window.addEventListener('resize', onWindowResize, false);
  return scene;
}

function onWindowResize() {
  player.camera.aspect = window.innerWidth / window.innerHeight;
  player.camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  player.update(scene);

  renderer.clear();
  renderer.render(scene, player.camera);
  renderer.render(player.uiScene, player.uiCamera);
}
