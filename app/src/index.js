import THREE from 'three'
import events from './events';
import Cube from './Cube'
import Plane from './Plane'
import Player from './Player';
import BuildMenu from './ui/Menu';

let renderer;
let ui = {};
let player;

let scene = initWorld();
initUi(scene);
animate();

function initWorld() {
  events.init();

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let scene = new THREE.Scene();

  player = new Player();
  player.addToScene(scene);

  let floor = new Plane({name: 'floor', randomColors: true});
  scene.add(floor.mesh);

  let cube = new Cube({name: 'cube', position: new THREE.Vector3(0, 50, -300), texture: 'crate.gif'});
  scene.add(cube.mesh);

  window.addEventListener('resize', onWindowResize, false);
  return scene;
}

function initUi(scene) {
  ui.buildMenu = new BuildMenu(scene);
}

function onWindowResize() {
  player.camera.aspect = window.innerWidth / window.innerHeight;
  player.camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  player.update(scene);

  renderer.render(scene, player.camera);
}
