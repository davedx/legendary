import THREE from 'three'
import Cube from './Cube'
import Plane from './Plane'
import Player from './Player';

let scene, renderer;
let player;

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  player = new Player();
  player.addToScene(scene);

  let floor = new Plane({name: 'floor'});
  scene.add(floor.mesh);

  let cube = new Cube({name: 'cube', position: new THREE.Vector3(0, 50, -300)});
  scene.add(cube.mesh);

  window.addEventListener('resize', onWindowResize, false);
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
